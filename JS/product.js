const productsDB = JSON.parse(localStorage.getItem("products")) || [];

function renderProduct(data) {
  const productElement = document.querySelector(".row");

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
                >Mua hàng</span
              >
              <i class="fa-regular fa-eye"></i
              ><span
                class="view-now" onclick="handleViewNow('${product.id}')"
                class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >xem nhanh</span
              >
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text"> size: ${product.size}</p>
            <p class="card-text" >${product.price.toLocaleString()}VND</p>
          </div>
        </div>
      </div> `;
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
      dataFilter = dataPrice.filter((product) => {
        return product.size.find((size) => filterSize.includes(size));
      });
      console.log(33333, dataFilter);
    }

    renderProduct(dataFilter);
  });
});
function handleViewNow(id) {
  console.log(1111, id);
  const productsDB = JSON.parse(localStorage.getItem("products")) || [];
  let product_detail = document.querySelector(".modal-body");
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
          <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox1" autocomplete="off" value="${
            element.size[0]
          }">
          <label class="btn btn-outline-primary" for="btncheckbox1">${
            element.size[0]
          }</label>
           <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox2" autocomplete="off" value="${
             element.size[1]
           }">
           <label class="btn btn-outline-primary" for="btncheckbox2">${
             element.size[1]
           }</label>
           <input type="checkbox" class="btn-check" name="btncheckbox" id="btncheckbox3" autocomplete="off" value="${
             element.size[2]
           }">
            <label class="btn btn-outline-primary" for="btncheckbox3">${
              element.size[2]
            }</label>
            </div>
          <p>Chọn số lượng:</p>
          <div class="btn-quantity">
            <button class="btn-quantity-reduce" onclick="reduceQuantity()">-</button><span id="quantity-product">1</span
            ><button class="btn-quantity-add" onclick="increaseQuantity()">+</button>
          </div>
           <div>
            <button class="btn-add-product_detail"  onclick="handleAddToCart('${
              element.id
            }')">
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
  // lấy size từ input checkbox
  const inputElementSize = document.querySelectorAll(".btn-check");
  inputElementSize.forEach((input) => {
    input.addEventListener("click", () => {
      if (input.checked) {
        isChecked = true;
        inputSize = input.value;
      }
    });
  });
}
// Đặt biến check input checkbox và lấy giá trị input
let isChecked = false;
let inputSize = "";
// thêm giỏ hàng cho user
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
    // hàm filter trả về mảng
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
// giảm số lượng sản phẩm
function reduceQuantity() {
  let quantityProduct = document.querySelector("#quantity-product");
  quantityProduct.textContent--;
  if (quantityProduct.textContent <= 0) {
    quantityProduct.textContent = 0;
  }
}
// tăng số lượng sản phẩm
function increaseQuantity() {
  let quantityProduct = document.querySelector("#quantity-product");
  quantityProduct.textContent++;
}
// điều hướng qua chi tiết sản phẩm
function handleBuyNow(id) {
  navigationParam("product_detail.html", `id=${id}`);
}
