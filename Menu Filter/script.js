const products = [
  {
    name: "Laptop",
    category: "electronics",
    price: 80000,
  },
  {
    name: "Shirt",
    category: "fashion",
    price: 3000,
  },
  {
    name: "Phone",
    category: "electronics",
    price: 60000,
  },
  {
    name: "Shoes",
    category: "fashion",
    price: 3500,
  },
  {
    name: "Pizza",
    category: "food",
    price: 1000,
  },
  {
    name: "Burger",
    category: "food",
    price: 300,
  },
];

const productList = document.querySelector("#productList");
const filterButtons = document.querySelectorAll("#filterButtons button");
const searchInput = document.querySelector("#searchInput");

// Display products
function displayProducts(productArray) {
  productList.innerHTML = "";

  productArray.map(function (product) {
    const productDiv = document.createElement("div");
    productDiv.className = "productCard";

    const productName = document.createElement("h3");
    const categoryName = document.createElement("p");
    const productPrice = document.createElement("p");

    productName.textContent = product.name;
    categoryName.textContent = product.category;
    productPrice.textContent = `Rs. ${product.price}`;

    productDiv.append(productName, categoryName, productPrice);
    productList.append(productDiv);
  });
}

displayProducts(products);


filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    const category = button.textContent.toLowerCase();
    if (category === "all") {
      displayProducts(products);
      return;
    }
    const filteredProducts = products.filter(function (product) {
      return product.category === category;
    });
    displayProducts(filteredProducts);
  });
});

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  const searchedProducts = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchValue);
  });

  displayProducts(searchedProducts);
});
