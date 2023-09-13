const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};
const listOrderDB = JSON.parse(localStorage.getItem("listOrder")) || [];
function renderOrderUser(data) {
  
  let resurl = `<tr>
    <th>stt</th>
    <th>Ngày</th>
    <th>tên sản phẩm</th>
    <th>số lượng</th>
    <th>size</th>
    <th>Giá</th>
    <th>Trạng thái</th>
    <th>Hành động</th>
  </tr>`;
  accountsDB.forEach((account) => {
    if (
      account.email === userLoginsDB.email &&
      account.role === userLoginsDB.role
    ) {
      data.forEach((orderUser,) => {
        if (orderUser.email === userLoginsDB.email) {
          orderUser.cart.forEach((item,index ) => {
            resurl += `<tr>
                  <td>${index + 1}</td>
                  <td>${orderUser.date}</td>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.size}</td>
                  <td>${(item.price * item.quantity).toLocaleString()}VND</td>
                  <td>${orderUser.status}</td>
                   <td>
                  <button class="btn-detail">chi tiết</button
                  >
                  </td>
                  </tr>`;
          });
        }
      });
    }
  });
  document.querySelector(".list-orderUser").innerHTML = resurl;
}
renderOrderUser(listOrderDB);
function handleSeachOrderUser() {
  const valueSeach = document.querySelector("#manage-orderUser-seach").value;
  const orderSeach = [];
  for (const order of listOrderDB) {
    if (order.date === valueSeach) {
      orderSeach.push(order);
    }
  }
  renderListOrder(orderSeach);
}
