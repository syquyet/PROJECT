const productsDB = JSON.parse(localStorage.getItem("products")) || [];
function handleAddProduct() {
  console.log(productsDB);
  let newProduct = {
    id: document.querySelector("#input-add-id").value,
    name: document.querySelector("#input-add-name").value,
    price: Number(document.querySelector("#input-add-price").value),
    size: document.querySelector("#input-add-size").value.split(","),
    quantity: Number(document.querySelector("#input-add-quantity").value),
    image:
      "/image/" + document.querySelector("#input-add-image").value.slice(12),
    describe: document.querySelector("#input-add-describe").value,
  };
  let isCheckProduct = false;
  productsDB.forEach((product) => {
    if (
      newProduct.id === product.id ||
      document.querySelector("#input-add-name").value === "" ||
      document.querySelector("#input-add-price").value === "" ||
      document.querySelector("#input-add-size").value === "" ||
      document.querySelector("#input-add-quantity").value === "" ||
      document.querySelector("#input-add-describe").value === "" ||
      document.querySelector("#input-add-id").value === ""
    ) {
      isCheckProduct = true;
    }
  });
  if (isCheckProduct) {
    alert("id sản phẩm ko trùng nhau. nhập đầy đủ thông tin sản phẩm");
  } else {
    productsDB.push(newProduct);
    localStorage.setItem("products", JSON.stringify(productsDB));
  }
}
// xóa dữ liệu trên form
function handleDeleteForm() {
  document.querySelector("#input-add-id").value = "";
  document.querySelector("#input-add-name").value = "";
  document.querySelector("#input-add-price").value = "";
  document.querySelector("#input-add-size").value = "";
  document.querySelector("#input-add-quantity").value = "";
  document.querySelector("#input-add-describe").value = "";
}
