function editUser() {
  const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
  for (const account of accountsDB) {
    if (userLogin.email === account.email) {
      document.querySelector("#input-name").value = account.name;
      document.querySelector("#input-email").value = account.email;
      document.querySelector("#input-password").value = account.password;
      document.querySelector("#input-phone").value = account.phone;
    }
  }
}
editUser();
function handleEdit() {
  const newAccount = {
    name: document.querySelector("#input-name").value,
    email: document.querySelector("#input-email").value,
    password: document.querySelector("#input-password").value,
    phone: document.querySelector("#input-phone").value,
  };
  const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
  for (const account of accountsDB) {
    if (newAccount.email === account.email) {
      account.name = newAccount.name;
      account.email = newAccount.email;
      account.phone = newAccount.phone;
      account.password = newAccount.password;
    }
  }
  localStorage.setItem("accounts", JSON.stringify(accountsDB));
  resetForm();
}
function resetForm() {
  document.querySelector("#input-name").value = "";
  document.querySelector("#input-email").value = "";
  document.querySelector("#input-password").value = "";
  document.querySelector("#input-phone").value = "";
}
function handleDelete() {
  const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
  accountsDB.forEach((account, index) => {
    if (userLogin.email === account.email) {
      accountsDB.splice(index, 1);
      localStorage.removeItem("userLogin");
    }
  });
  localStorage.setItem("accounts", JSON.stringify(accountsDB));
  navigation("/");
}
function handleBackOrderUser() {
  navigation("account/orderUser.html");
}