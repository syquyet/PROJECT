const listOrderDB = JSON.parse(localStorage.getItem("listOrder")) || [];
console.log(listOrderDB);
function renderListOrder(data) {
  let resurl = `<tr>
    <th>#</th>
    <th>Order ID</th>
    <th>Ngày</th>
    <th>Tên order</th>
    <th>Tổng giá</th>
    <th>Trạng thái</th>
    <th>Hành động</th>
  </tr>`;
  data.forEach((element, index) => {
    let sumMoney = 0;
    element.cart.forEach((item) => {
      sumMoney += item.price * item.quantity;
    });
    resurl += `<tr>
        <td>${index + 1}</td>
        <td>${element.id}</td>
        <td>${element.date}</td>
        <td>${element.name}</td>
        <td>${sumMoney.toLocaleString()}VND</td>
        <td>${element.status}</td>
        <td>
          <button class="btn-detail">chi tiết</button
          ><button type="button" class="btn-edit" onclick="editListOrder('${
            element.id
          }')" >Sửa</button>
        </td>
      </tr>`;
    console.log(element.cart);
  });
  document.querySelector(".list-order").innerHTML = resurl;
}
renderListOrder(listOrderDB);
function handleSeachOrder() {
  const valueSeach = document.querySelector("#manage-order-seach").value;
  // console.log(valueSeach);
  const orderSeach = [];
  for (const order of listOrderDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (order.name.toLowerCase().includes(valueSeach.toLowerCase())) {
      orderSeach.push(order);
    }
  }
  renderListOrder(orderSeach);
}
function editListOrder(id) {
  listOrderDB.forEach((element) => {
    if (element.id === id) {
      if (element.status === "Đã đặt hàng") {
        element.status = "Đã giao";
      } else {
        element.status = "Đã đặt hàng";
      }
    }
  });
  localStorage.setItem("listOrder", JSON.stringify(listOrderDB));
  renderListOrder(listOrderDB);
}
