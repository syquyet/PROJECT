const params = new URLSearchParams(document.location.search);
const id = params.get("id");
function handleProductDetail() {
  const productsDB = JSON.parse(localStorage.getItem("products")) || [];
  let product_detail = document.querySelector(".product_detail-container");
  productsDB.forEach((element) => {
    if (id === element.id) {
      product_detail.innerHTML = `<section class="banner-product product_detail-banner">
          <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="${element.image}"
                  class="d-block"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="${element.image}"
                  class="d-block"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="${element.image}"
                  class="d-block"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <section class="product_detail-content">
          <h4>${element.name}</h4>
          <h5>Giá: ${element.price.toLocaleString()}VND</h5>
          <p>Chọn size:</p>
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox1" autocomplete="off" value="${element.size[0]}">
          <label class="btn btn-outline-primary" for="btncheckbox1">${element.size[0]}</label>

          <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox2" autocomplete="off" value="${element.size[1]}">
           <label class="btn btn-outline-primary" for="btncheckbox2">${element.size[1]}</label>

           <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox3" autocomplete="off" value="${element.size[2]}">
            <label class="btn btn-outline-primary" for="btncheckbox3">${element.size[2]}</label>
            </div>
          <p>Chọn số lượng:</p>
          <div class="btn-quantity">
            <button class="btn-quantity-reduce" onclick="reduceQuantity()">-</button><span id="quantity-product">1</span
            ><button class="btn-quantity-add" onclick="increaseQuantity()">+</button>
          </div>
  
          <div>
          
          <button class="btn-add-product_detail"  onclick="handleAddToCart('${element.id}')">
          Thêm vào giỏ hàng
          </button>
            <button class="product_detail-btn-buynow">Mua ngay</button>
            <button class="product_detail-btn-delete">xóa</button>
          </div>
  
          <h6>Mô tả sản phẩm</h6>
          <hr />
          ${element.describe}
        </section>`;
    }
  });
}
handleProductDetail();
// giảm số lượng sản phẩm
function reduceQuantity() {
  let quantityProduct = document.querySelector("#quantity-product");
  quantityProduct.textContent--;
  if (quantityProduct.textContent <= 0) {
    quantityProduct.textContent = 0;
  }
}
// tăng số lượn sản phẩm
function increaseQuantity() {
  let quantityProduct = document.querySelector("#quantity-product");
  quantityProduct.textContent++;
}
// lấy size từ input checkbox
const inputElement = document.querySelectorAll(".btn-group .btn-check");
console.log(111, inputElement);
let isChecked = false;
let inputSize = "";
inputElement.forEach((input) => {
  input.addEventListener("click", () => {
    if (input.checked) {
      isChecked = true;
      inputSize = input.value;
    }
  });
});
function handleAddToCart(id) {
  // nếu chưa chọn size yêu cầu chọn size
  if (!isChecked) {
    alert("bạn chọn SIZE sản phẩm");
    return;
  }

  const userLoginsDB = JSON.parse(localStorage.getItem("userLogin")) || {};

  if (userLoginsDB.email === undefined) {
    // Khi chưa đăng nhập
    alert("Đăng nhập để thêm sản phẩm vào giỏ hàng");
    navigation("/login.html");
    return;
    // Đăng nhập rồi
  } else {
    const productsDB = JSON.parse(localStorage.getItem("products"));
    // dặt biến lấy số lượng nhập vào

    const valueQuantity = document.getElementById("quantity-product");
    const productBuy = {
      size: inputSize,
      quantity: Number(valueQuantity.textContent),
    };
    // hàm find

    const product = productsDB.filter((element) => {
      return element.id === id;
    });
    if (!product) {
      return;
    } else {
      productBuy.name = product[0].name;
      productBuy.price = product[0].price;
      productBuy.id = product[0].id;
      productBuy.image = product[0].image;
    }

    // Hàm find ---> giống filter --> 1 phần tử đầu tiên thỏa điều kiện của callback function
    const accountsDB = JSON.parse(localStorage.getItem("accounts")) || [];
    for (const account of accountsDB) {
      if (account.email === userLoginsDB.email) {
        // account chưa có cart thì gán bằng cart mới
        if (!account.cart) {
          account.cart = [productBuy];

          localStorage.setItem("accounts", JSON.stringify(accountsDB));
          // đã có cart kiểm tra xem id sản phẩm có trong cart chưa
        } else {
          const result = account.cart.filter((element) => {
            if (
              element.id == productBuy.id &&
              element.size === productBuy.size
            ) {
              element.quantity =
                element.quantity + Number(valueQuantity.textContent);

              localStorage.setItem("accounts", JSON.stringify(accountsDB));
            }
            return (
              element.id === productBuy.id && element.size === productBuy.size
            );
          });
          if (result.length < 1) {
            account.cart.push(productBuy);
            localStorage.setItem("accounts", JSON.stringify(accountsDB));
          }
        }
      }
    }
  }
  navigation("/cart.html");
}
