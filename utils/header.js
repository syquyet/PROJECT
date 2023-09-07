function renderLogin(){
    const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
    const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
    const renderLogin = document.querySelector("#nav-right");
    for (const account of accountsDB) {
      if (userLoginsDB.email === account.email) {
        renderLogin.innerHTML = `<li><i class="fa-solid fa-cart-shopping"></i></li>
    
            <li>
              <a
                id="account_user"
                href="/account/manage_account.html" onclick="editUser()"
                >${account.name}
                <img id="img-account" src="/image/anh sản phẩm 6.jpg" alt=""
              /></a>
            </li>
    
            <li>
              <button onclick="handleLogout()">Đăng xuất</button>
            </li>`;
      }
    }
}
renderLogin();
function handleLogout(){
    localStorage.removeItem("userLogin");
    navigation("/");
}