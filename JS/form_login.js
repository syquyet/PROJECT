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
  const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
  console.log("1111111", userLoginsDB);

  let isExist = false;
  for (const userDB of accountsDB) {
    if (userDB.email === user.email && userDB.role === "user") {
      if (userDB.password === user.password) {
        user.role = "user";
        isExist = true;
        break;
      }
    } else {
      if (userDB.email === user.email && userDB.role === "admin") {
        if (userDB.password === user.password) {
          user.role = "admin";
          isExist = true;
          break;
        }
      }
    }
  }

  if (isExist) {
    let isLogin = false;

    if (userLoginsDB.email === user.email) {
      isLogin = true;
    }

    if (!isLogin) {
      delete user.password;
      // userLoginsDB.push(user);
      localStorage.setItem("userLogin", JSON.stringify(user));
      if (user.role === "user") {
        navigation("/");
      }if(user.role==="admin"){
        navigation("admin/dashboard.html");
      }

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

function handleRegisert() {
  navigation("/regisert.html");
}
