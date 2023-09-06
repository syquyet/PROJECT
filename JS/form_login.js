const userLogins = [];

const formElement = document.querySelector("form");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
formElement.addEventListener("submit", (e) => {
  // Chặn action của e
  e.preventDefault();
  // B1 lấy user từ form
  const user = getUser();
  console.log(user);
  //  B2 check lỗi user
  const error = checkError(user);
  readerError(error);
  if (error.isError) {
    return;
  }
  // B3 tải userlogin từ local

  const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
  console.log("222222", accountsDB);
  const userLoginsDB = JSON.parse(localStorage.getItem("userLogins"))||[];
  console.log("1111111", userLoginsDB);

  let isExist = false;
  for (const userDB of accountsDB) {
    if (userDB.email === user.email) {
      if (userDB.password === user.password) {
        isExist = true;
        break;
      }
    }
  }

  if (isExist) {
    let isLogin = false;
    for (const userLogin of userLoginsDB) {
      if (userLogin.email === user.email) {
        isLogin = true;
        break;
      }
    }
    if (!isLogin) {
      delete user.password;
      userLoginsDB.push(user);
      localStorage.setItem("userLogins", JSON.stringify(userLoginsDB));
      
      dieuhuong_home();
      return;
    } else {
      error.isError = true;
      error.msgEmail = "*Tài khoản đã tồn tại vui lòng đăng nhập lại";
      readerError(error);
    }
    // B3 kiểm tra email đã tồn tại
  } else {
    error.isError = true;
    error.msgPassword = "*Email ,mật khẩu sai hoặc chưa đăng ký";
    readerError(error);
  }
});
function getUser() {
  return {
    email: emailElement.value,
    password: passwordElement.value,
  };
}
function checkError(user) {
  const error = {
    isError: false,
    msgEmail: "",
    msgPassword: "",
  };
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!user.email.match(validRegex)) {
    error.isError = true;
    error.msgEmail = "*Nhập đúng định dạng email";
  }
  if (!user.password) {
    error.isError = true;
    error.msgPassword = "*Mật khẩu không được để trống";
  }
  return error;
}
function readerError(error) {
  const errorEmailElement = document.querySelector("#error-email");
  const errorPasswordElement = document.querySelector("#error-password");
  errorEmailElement.textContent = error.msgEmail;
  errorPasswordElement.textContent = error.msgPassword;
}
function dieuhuong_home(){
    window.location.href="http://127.0.0.1:5500/projec_html/accout_user/account_user.html";
}