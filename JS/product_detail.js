const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const productsDB = JSON.parse(localStorage.getItem("products")) || [];
let product_detail=document.querySelector(".product_detail-container");
productsDB.forEach((element) => {
    if(id===element.id){
        product_detail.innerHTML=`<section class="banner-product product_detail-banner">
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
        <h5>Giá: ${element.price}đ</h5>
        <p>Chọn size:</p>
        <div class="btn-size">
          <button>${element.size}</button>
          
        </div>
        <p>Chọn số lượng:</p>
        <div class="btn-quantity">
          <button class="btn-quantity-reduce" onclick="reduceQuantity()">-</button><span id="quantity-product">0</span
          ><button class="btn-quantity-add" onclick="increaseQuantity()">+</button>
        </div>

        <div>
          <a href=""
            ><button class="btn-add-product_detail">
              Thêm vào giỏ hàng
            </button></a
          >
          <button class="product_detail-btn-buynow">Mua ngay</button>
          <button class="product_detail-btn-delete">xóa</button>
        </div>

        <h6>Mô tả sản phẩm</h6>
        <hr />
        Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm
        thời trang cho nữ. Váy chân dài cũng mang đến một hình ảnh chỉnh chu,
        sang trọng và nữ tính quyến rũ.
      </section>`
    }
    
});
function reduceQuantity(){
   let quantityProduct=document.querySelector("#quantity-product");
   quantityProduct.textContent--;
   if (quantityProduct.textContent<=0) {
    quantityProduct.textContent=0;
     }
}
function increaseQuantity(){
    let quantityProduct=document.querySelector("#quantity-product");
   quantityProduct.textContent++;
   
}