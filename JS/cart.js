const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const productsDB = JSON.parse(localStorage.getItem("products")) || [];
console.log(id);