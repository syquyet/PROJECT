
const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
// hiển thị thông tin admin khi đăng nhập thành công
handleLoginAdmin();
function handleLoginAdmin() {
    const renderLogin = document.querySelector(".sidenav-admin");
    for (const account of accountsDB) {
      if (userLoginsDB.email === account.email && userLoginsDB.role === "admin") {
        renderLogin.innerHTML = `<span
          class="sidenav-menu"
          style="font-size: 30px; cursor: pointer"
          onclick="openNav()"
          >&#9776;</span
        >
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()"
            >&times;</a
          >
          <div class="sidenav-avatar">
            <img
              src="/image/anh sản phẩm 8.jpg"
              alt=""
              width="100px "
              height="100px"
            />
            <p>Role: Admin</p>
            <p>${account.name}</p>
            <button>Edit</button>
  
            <hr />
          </div>
  
          <div class="sidenav-content">
            <div>
              <i class="fa-solid fa-list"></i><a href="/admin/dashboard.html">Dashboard</a>
            </div>
            <div><i class="fa-solid fa-users"></i><a href="/admin/manage_users.html">User</a></div>
            <div><i class="fa-solid fa-shirt"></i>   <a href="/admin/manage_product.html">Product</a></div>
            <div>
              <i class="fa-solid fa-file-invoice"></i><a href="/admin/manage_order.html">Order</a>
            </div>
           
            <div>
              <i class="fa-solid fa-right-from-bracket"></i>
              <a href="#" onclick="handleLogOutAdmin()">Log out</a>
            </div>
          </div>
        </div>`;
      }
    }
  }
  function handleLogOutAdmin(){
    if(userLoginsDB.role==="admin"){
      localStorage.removeItem("userLogin");
      navigation("/");
    }
  
  }