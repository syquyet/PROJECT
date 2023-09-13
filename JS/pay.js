const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
const payProduct = document.querySelector(".pay-product-list");

function renderListCart(accountsDB) {
  let result = `<tr>
    <th>SẢN PHẨM</th>
    <th>TẠM TÍNH</th>
  </tr>`;
  let sumMoney = 0;
  accountsDB.forEach((element) => {
    if (element.email === userLoginsDB.email) {
      document.querySelector("#pay-input-name").value = element.name;
      document.querySelector("#pay-input-phone").value = element.phone;
      document.querySelector("#pay-input-email").value = element.email;
      element?.cart?.forEach((dataProduct) => {
        sumMoney += dataProduct.quantity * dataProduct.price;
        result += `<tr>
          <td class="pay-table-content">
            <img
              src="${dataProduct.image}"
              alt=""
              width="100px"
              height="100px"
            />
            <div>x <span>${dataProduct.quantity}</span></div>
            <div>
              <h6>${dataProduct.name}</h6>
              <p>sze:${dataProduct.size}</p>
            </div>
          </td>
          <td>${(dataProduct.quantity * dataProduct.price).toLocaleString()}VND</td>
        </tr>
           `;
      });
    }
    payProduct.innerHTML =
      result +
      `<td>TẠM TÍNH</td>
    <td >${sumMoney.toLocaleString()}VND</td><tr>
    <td>TỔNG</td>
    <td >${sumMoney.toLocaleString()}VND</td>
  </tr>`;
  });
}
renderListCart(accountsDB);
// dặt hàng
const listOrderDB = JSON.parse(localStorage.getItem("listOrder")) || [];
function handleOrderProduct() {
  let listOrderUser = {};
  accountsDB.forEach((account) => {
    if (
      account.email === userLoginsDB.email &&
      account.role === userLoginsDB.role
    ) {
      if (listOrderDB.length == 0) {
        listOrderUser.id = "ORDER_1";
      }else{
        listOrderUser.id = createIdauto("ORDER", listOrderDB);
      }
      listOrderUser.name = account.name;
      listOrderUser.phone = account.phone;
      listOrderUser.email = account.email;
      listOrderUser.status = "Đã đặt hàng";
      listOrderUser.date =
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear();
      listOrderUser.adress =
        document.querySelector("#pay-input-adress4").value +
        "-" +
        document.querySelector("#pay-input-adress3").value +
        "-" +
        document.querySelector("#pay-input-adress2").value +
        "-" +
        document.querySelector("#pay-input-adress1").value;
      listOrderUser.note = document.querySelector("#pay-input-note").value;
      listOrderUser.cart = account.cart;
      // xóa cart trong user
      delete account.cart;
      localStorage.setItem("accounts", JSON.stringify(accountsDB));
    }
  });
  // đẩy order user lên listorder, thông báo đặt hàng thành công điều hướng về trang sản phẩm
  listOrderDB.push(listOrderUser);
  localStorage.setItem("listOrder", JSON.stringify(listOrderDB));
  alert("Đặt hàng thàng công!!!!!");
  navigation("/product.html");
}
