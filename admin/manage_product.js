const productsDB = JSON.parse(localStorage.getItem("products")) || [];
function handleRenderProduct(dataProduct) {
  const manageListProduct = document.querySelector(".list-product");
  let resurl = `<tr>
  <th>ID</th>
  <th>Tên sản phẩm</th>
  <th>Size</th>
  <th>Giá</th>
  <th>Số lượng</th>
  <th>Hành động</th>
</tr>`;
  dataProduct.forEach((product) => {
    resurl += `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.size}</td>
         <td>${product.price.toLocaleString()}VND</td>
        <td>${product.quantity}</td>
        <td>
          <button class="btn-detail">chi tiết</button
          ><button class="btn-edit" type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal" onclick="handleEditManageProduct('${product.id}')">Sửa</button
          ><button class="btn-delete" onclick="handleDEleteProduct('${product.id}')">xóa</button>
        </td>
      </tr>`;
  });
  manageListProduct.innerHTML = resurl;
}
handleRenderProduct(productsDB);
// Tìm kiếm theo tên
function handleSeachProduct() {
  const productInputSeach = document.querySelector(
    "#manage-product-seach"
  ).value;
  const productSeach = [];
  for (const product of productsDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (product.name.toLowerCase().includes(productInputSeach.toLowerCase())) {
      productSeach.push(product);
    }
  }
  handleRenderProduct(productSeach);
}
// điều hướng qua trang thêm sản phẩm
function handleAddProduct() {
  navigation("admin/add_product.html");
}
// sửa thông tin sản phẩm
function handleEditManageProduct(id) {
  console.log(77777, id);
  productsDB.forEach((product) => {
    if (product.id === id) {
      document.querySelector("#input-id").value = product.id;
      document.querySelector("#input-name").value = product.name;
      document.querySelector("#input-describe").value = product.describe;
      document.querySelector("#input-size").value = product.size;
      document.querySelector("#input-price").value = product.price;
      document.querySelector("#input-quantity").value = product.quantity;
    }
  });
}
// lưu lại thông tin sản phẩm đã thay đổi
function handleSaveEditProduct() {
  productsDB.forEach((product) => {
    if (product.id === document.querySelector("#input-id").value) {
      product.id = document.querySelector("#input-id").value;
      product.name = document.querySelector("#input-name").value;
      product.describe = document.querySelector("#input-describe").value;
      product.size = document.querySelector("#input-size").value.split(",");
      product.price = Number(document.querySelector("#input-price").value);
      product.quantity = Number(
        document.querySelector("#input-quantity").value
      );
    }
  });
  localStorage.setItem("products", JSON.stringify(productsDB));

  handleRenderProduct(productsDB);
}
// xóa sản phẩm
function handleDEleteProduct(id) {
  productsDB.forEach((product, index) => {
    if (product.id === id) {
      productsDB.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(productsDB));
    }
  });
  handleRenderProduct(productsDB);
}
function handleSeachProduct() {
  const productsDB = JSON.parse(localStorage.getItem("products")) || [];
  const valueSeach = document.querySelector("#manage-product-seach").value;
  // console.log(valueSeach);
  const productSeach = [];
  for (const product of productsDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (product.name.toLowerCase().includes(valueSeach.toLowerCase())) {
      productSeach.push(product);
    }
  }
  handleRenderProduct(productSeach);
}

