const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
const cartProduct = document.querySelector(".cart-list-product");
renderListCart(accountsDB);
function renderListCart(accountsDB) {
  let result = `<tr>
<th>SẢN PHẨM</th>
<th>GIÁ</th>
<th>SỐ LƯỢNG</th>
<th>TẠM TÍNH</th>
</tr>`;

  accountsDB.forEach((element) => {
    if (element.email === userLoginsDB.email) {
      element?.cart?.forEach((dataProduct) => {
        result += `
          <tr>
            <td class="cart-table-content">
              <p onclick="handleDeleteProduct('${dataProduct.id}','${
          dataProduct.size
        }')">&times;</p>
              <img
                src="${dataProduct.image}"
                alt=""
                width="100px"
                height="100px"
              />
              <div>
                <h6>${dataProduct.name}</h6>
                <p>sze: ${dataProduct.size}</p>
              </div>
            </td>
            <td>${dataProduct.price.toLocaleString()}VND</td>
            <td>
              <div class="btn-quantity">
                <button class="btn-quantity-reduce" onclick="changeQuantity(${
                  dataProduct.quantity
                },'-', '${dataProduct.id}','${
          dataProduct.size
        }')">-</button><span id="quantity-product">${dataProduct.quantity}</span
                ><button class="btn-quantity-add" onclick="changeQuantity(${
                  dataProduct.quantity
                },'+', '${dataProduct.id}','${dataProduct.size}')">+</button>
              </div>
            </td>
            <td>${(
              dataProduct.price * dataProduct.quantity
            ).toLocaleString()}VND</td>
          </tr>`;
      });
    }

    cartProduct.innerHTML = result;
  });
}

function changeQuantity(value, type, idProduct, sizeProduct) {
  if (type == "-") {
    value--;
  } else {
    value++;
  }
  if (value <= 0) {
    value = 0;
  }

  updateToLocalStorage(idProduct, value, sizeProduct);
}
function updateToLocalStorage(idProduct, value, sizeProduct) {
  const user = accountsDB.find(
    (account) => account.email === userLoginsDB.email
  );
  if (user) {
    const product = user.cart?.find(
      (item) => item.id === idProduct && item.size === sizeProduct
    );
    product.quantity = value;
    setDataFormLocalStorage("accounts", accountsDB);
    renderListCart(accountsDB);
    renderSumMoney(accountsDB);
  }
}
function renderSumMoney(accountsDB) {
  let sum = 0;
  accountsDB.forEach((element) => {
    if (element.email === userLoginsDB.email) {
      element?.cart?.forEach((dataProduct) => {
        sum += dataProduct.price * dataProduct.quantity;
      });
    }
  });
  const sumMoney = document.querySelector(".payment");
  sumMoney.innerHTML = `<table>
  <tr>
    <th>CỘNG GIỎ HÀNG</th>
  </tr>
  <tr >
    <td>Tạm tính</td>
    <td>${sum.toLocaleString()}VND</td>
  </tr>
  <tr>
    <td>Tổng</td>
    <td>${sum.toLocaleString()}VND</td>
  </tr>
</table>
<button class="payment-now" onclick="handlePay()">TIẾN HÀNH THANH TOÁN</button>`;
}
renderSumMoney(accountsDB);
function handleDeleteProduct(idProduct, sizeProduct) {
  accountsDB.forEach((element) => {
    if (element.email === userLoginsDB.email) {
      element?.cart?.forEach((dataProduct, index) => {
        if (dataProduct.id === idProduct && dataProduct.size === sizeProduct) {
          element.cart.splice(index, 1);
          setDataFormLocalStorage("accounts", accountsDB);
          renderListCart(accountsDB);
          renderSumMoney(accountsDB);
        }
      });
    }
  });
}
// điều hướng qua trang sản phẩm tiếp tục mua hàng
function handleBackProduct() {
  navigation("product.html");
}
// điều hướng qua trang lịch sử mua hàng của user
function handleBackOrderUser() {
  navigation("account/orderUser.html");
}
// điều hướng qua trang thanh toán
function handlePay() {
  navigation("pay.html");
}
