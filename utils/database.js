const products = [
  {
    id: "SP_001",
    name: "tên sản phẩm 1",
    price: 100000,
    size: ["M", "L", "XL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_002",
    name: "tên sản phẩm 2",
    price: 200000,
    size: ["S", "L", "XXL"],
    quantity: 10,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_003",
    name: "tên sản phẩm 3",
    price: 300000,
    size: ["S", "M", "XXL"],
    quantity: 50,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_004",
    name: "tên sản phẩm 4",
    price: 400000,
    size: ["M", "L", "XL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_005",
    name: "tên sản phẩm 5",
    price: 500000,
    size: ["M", "L", "XL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_006",
    name: "tên sản phẩm 6",
    price: 600000,
    size: ["L", "XL", "XXL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_007",
    name: "tên sản phẩm 7",
    price: 700000,
    size: ["M", "L", "XL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_008",
    name: "tên sản phẩm 8",
    price: 800000,
    size: ["S", "M", "XXL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
  {
    id: "SP_009",
    name: "tên sản phẩm 9",
    price: 900000,
    size: ["M", "L", "XL"],
    quantity: 20,
    image: "/image/anh sản phẩm 1.jpg",
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  },
];

localStorage.setItem("products", JSON.stringify(products));
const listOrderProduct = [
  {
    name: "tên khách hàng",
    phone: "số điện thoại",
    email: "email",
    adress: "địa chỉ",
    note: "ghi chú",
    cart: [
      {
        id: "id sản phẩm",
        name: "tên sảm phẩm",
        size: "size",
        quantity: "số lượng",
        price: "giá",
      },
    ],
  },
];
localStorage.setItem("listOrder", JSON.stringify(listOrderProduct));
