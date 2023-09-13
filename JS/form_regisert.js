const accounts = [];
// tuy vấn đến form và input
const formElement = document.querySelector("form");
const fullNameElement = document.querySelector("#fullname");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const repeatPasswordElement = document.querySelector("#repeat-password");
const phoneElement = document.querySelector("#phone");
// chặn gủi form lên url
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  // đặt biến lấy thông tin từ form
  const user = getUser();
  // kiểm tra lỗi từ form
  const error = checkError(user);
  // hiển thị lỗi
  readerError(error);
  //   nếu có lỗi quay lại nhập dữ liệu form
  if (error.isError) {
    return;
  }
  console.log(accounts);
  //  lấy dữ liệu từ local storage định dạng kiểu mảng
  const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
  console.log(accountsDB);
  //   kiểm tra email đã tồn tại trong dữ liệu chưa
  let isExist = false;
  for (const account of accountsDB) {
    if (account.email === user.email) {
      isExist = true;
      break;
    }
  }
  //   nếu chưa tồn tại thì thêm user vào mảng và lưu lại
  if (!isExist) {
    delete user.repeatPassword;
    accountsDB.push(user);
    localStorage.setItem("accounts", JSON.stringify(accountsDB));
    navigation("/login.html");
  } else {
    error.isError = true;
    error.msgEmail =
      "*email đã tồn tại vui lòng đăng nhập hoặc đăng ký email mới";
    readerError(error);
  }
});
// hàm lấy user tử form
function getUser() {
  return {
    name: fullNameElement.value,
    email: emailElement.value,
    phone: phoneElement.value,
    password: passwordElement.value,
    repeatPassword: repeatPasswordElement.value,
    status: "active",
    role:"user",
  };
}
// hàm kiểm tra lỗi user
function checkError(user) {
  const error = {
    isError: false,
    msgName: "",
    msgEmail: "",
    msgPhone: "",
    msgPassword: "",
    msgRepeatPassword: "",
  };
  if (!user.name) {
    error.isError = true;
    error.msgName = "*Tên người dùng không đc để trống";
  }
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!user.email.match(validRegex)) {
    error.isError = true;
    error.msgEmail = "*nhập đúng định dạng email";
  }
  if (!user.phone) {
    error.isError = true;
    error.msgPhone = "*số điện thoại ko đc để trống";
    
  }
  const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if(vnf_regex.test(user.phone) == false){
    error.isError = true;
    error.msgPhone = "*Định dạng số đt sai, vui lòng nhập lại";
  }
  if (!user.password) {
    error.isError = true;
    error.msgPassword = "*mật khẩu không đc để trống";
  }
  if(user.password.length<8){
    error.isError = true;
    error.msgPassword = "*mật khẩu 8 ký tự trở lên";
  }
  if (user.password !== user.repeatPassword) {
    error.isError = true;
    error.msgRepeatPassword = "*nhập mật khẩu trùng khớp";
  }
  return error;
}
// hàm hiển thị lỗi
function readerError(error) {
  const errorNamelElememt = document.querySelector("#error-fullname");
  const errorEmailElememt = document.querySelector("#error-email");
  const errorPaswordlElememt = document.querySelector("#error-password");
  const errorRepeatPassworddlElememt = document.querySelector(
    "#error-repeat-password"
  );
  const errorPhoneElement = document.querySelector("#error-phone");
  errorNamelElememt.textContent = error.msgName;
  errorEmailElememt.textContent = error.msgEmail;
  errorPhoneElement.textContent = error.msgPhone;
  errorPaswordlElememt.textContent = error.msgPassword;
  errorRepeatPassworddlElememt.textContent = error.msgRepeatPassword;
}
function handleLogin() {
  navigation("/login.html");
}