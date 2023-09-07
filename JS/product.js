const productsDB = JSON.parse(localStorage.getItem("products")) || [];
// console.log("222222", productsDB);
function renderProduct(data) {
  const productElement = document.querySelector(".row");
  // console.log("3333",productElement);
  let resurl = "";
  for (const product of data) {
    resurl += `<div class="col-sm-12 col-md-4 col-xl-2">
        <div class="card">
          <div class="card-img">
            <img
              src="${product.image}"
              class="card-img-top"
              alt="..."
            />

            <div class="btn-img">
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                href=""
                class="buy-now" onclick="handleBuyNow('${product.id}')"
                >Mua ngay</span
              >
              <i class="fa-regular fa-eye"></i
              ><span
                class="view-now" onclick="handleViewNow('${product.id}')"
                >xem nhanh</span
              >
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text"> size: ${product.size}</p>
            <p class="card-text" >${product.price}đ</p>
          </div>
        </div>
      </div>`;
  }
  productElement.innerHTML = resurl;
}
renderProduct(productsDB);
function handleSeach() {
  const productsDB = JSON.parse(localStorage.getItem("products")) || [];
  const valueSeach = document.querySelector("#input-seach").value;
  // console.log(valueSeach);
  const productSeach = [];
  for (const product of productsDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (product.name.toLowerCase().includes(valueSeach.toLowerCase())) {
      productSeach.push(product);
    }
  }
  renderProduct(productSeach);
}

const inputElement = document.querySelectorAll(
  ".filter-product .filter-group input"
);

inputElement.forEach((element) => {
  element.addEventListener("click", () => {
    const filterPrice = [];
    const filterSize = [];
    let isCheckedPrice = false;
    let isCheckedSize = false;
    inputElement.forEach((input) => {
      const dataType = input.dataset.filter;
      if (input.checked && dataType === "price") {
        isCheckedPrice = true;
        const convertValue = input.value.split(",");
        filterPrice.push({
          min: Number(convertValue[0]),
          max: Number(convertValue[1]),
        });
      } else if (input.checked && dataType === "size") {
        isCheckedSize = true;
        filterSize.push(input.value);
      }
    });

    let dataPrice = productsDB;
    if (isCheckedPrice) {
      dataPrice = productsDB.filter((product) =>
        filterPrice.find(
          (item) => item.min <= product.price && item.max > product.price
        )
      );
    }
    
    let dataFilter = dataPrice;
    if (isCheckedSize) {
      dataFilter = dataPrice.filter((product) =>
        filterSize.find((item) => item === product.size)
      );
    }
    
    if (dataFilter.length == 0) {
      renderProduct(productsDB);
    } else {
      renderProduct(dataFilter);
    }
  });
});
function handleViewNow(id){
  navigationParam("product_detail.html",`id=${id}`);
  
}
function handleBuyNow(id){
  navigationParam("cart.html",`id=${id}`);
}