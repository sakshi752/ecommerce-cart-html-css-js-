import products from "./data.js";
let allProducts = products;
const productContainer = document.querySelector("#productContainer");
const cartItemsContainer = document.querySelector("#cart")
let cartItems = [];
const price = document.querySelector("#price");

allProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = product.image;

    imgContainer.appendChild(img);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");

    const contentOne = document.createElement("div");
    contentOne.classList.add("content-one");

    const titleHeading = document.createElement("h2");
    titleHeading.textContent = product.title;

    const category = document.createElement("span");
    category.textContent = product.category;

    contentOne.appendChild(titleHeading);
    contentOne.appendChild(category);

    const contentTwo = document.createElement("div");
    contentTwo.classList.add("content-two");

    const priceHeading = document.createElement("h3");
    priceHeading.textContent = product.price;

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.dataset.id = product.id;
    addButton.classList.add("add-btn");

    contentTwo.appendChild(priceHeading);
    contentTwo.appendChild(addButton);

    contentContainer.appendChild(contentOne);
    contentContainer.appendChild(contentTwo);

    productDiv.appendChild(imgContainer);
    productDiv.appendChild(contentContainer);

    productContainer.appendChild(productDiv);
});

document.addEventListener("DOMContentLoaded", () => {
    // check if cart is present in local storage
    cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length == 0) {
        cartItemsContainer.innerHTML = "<h2>The cart is empty!</h2>"
    } else {
        cartItems.forEach(item => renderCartItem(item));
    }
});

productContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-btn");
    if (!addBtn) return;
    const id = Number(addBtn.dataset.id);
    if (cartItems.length == 0) {
        cartItemsContainer.innerHTML = ""
    }

    const isProductPresent = cartItems.find((item) => item.id === id);
    if (isProductPresent) {

    } else {
        // take the product from actual product list
        const selectedProduct = allProducts.find(
            (product) => product.id === id
        );
        cartItems.push({
            ...selectedProduct,
            quantity: 1
        });

        renderCartItem(selectedProduct);
        saveToLocalStorage();
        updatePrice();
    }
});

const renderCartItem = (cartItemData) => {

    const item = cartItems.find((data) => cartItemData.id == data.id);

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const cartItemImgContainer = document.createElement("div");
    cartItemImgContainer.classList.add("cart-image");

    const cartItemImg = document.createElement("img");
    cartItemImg.src = item.image;

    cartItemImgContainer.appendChild(cartItemImg);

    const cartItemInfo = document.createElement("div");
    cartItemInfo.classList.add("cart-info");

    //info one
    const cartItemInfoOne = document.createElement("div");
    cartItemInfoOne.classList.add("infoOne");
    cartItemInfoOne.dataset.id = item.id;

    cartItemInfoOne.innerHTML = `
    <span>
        <i class="fa-solid fa-x"></i>
    </span>
`;

    const cartItemInfoTwo = document.createElement("div");
    cartItemInfoTwo.classList.add("infoTwo");
    cartItemInfoTwo.innerHTML = cartItemInfoTwo.innerHTML = `
    <h2>${item.title}</h2>
    <h3>$${item.price * item.quantity}</h3>
`;

    const cartItemInfoThere = document.createElement("div");
    cartItemInfoThere.classList.add("infoThree");

    cartItemInfoThere.innerHTML = `
    <button class ="decrease-btn" data-id="${item.id}">-</button>
    <span>${item.quantity}</span>
    <button class ="increase-btn" data-id="${item.id}">+</button>
`;

    cartItemInfo.appendChild(cartItemInfoOne);
    cartItemInfo.appendChild(cartItemInfoTwo);
    cartItemInfo.appendChild(cartItemInfoThere);


    cartItem.appendChild(cartItemImgContainer);
    cartItem.appendChild(cartItemInfo);

    cartItemsContainer.appendChild(cartItem);

}

cartItemsContainer.addEventListener("click", (e) => {

    // Delete logic
    const closeBtn = e.target.closest(".infoOne");
    if (closeBtn) {
        const id = Number(closeBtn.dataset.id);
        cartItems = cartItems.filter((item) => item.id != id);

        saveToLocalStorage();

        cartItemsContainer.innerHTML = "";
        if (cartItems.length == 0) {
            cartItemsContainer.innerHTML =
                "<h2>The cart is empty!</h2>";
        } else {
            cartItems.forEach(item => {
                renderCartItem(item);
            })
        }
        updatePrice()
        return;
    }

    // Increase quantity logic
    const incQuantityBtn = e.target.closest(".increase-btn");
    console.log("incQuantityBtn ", incQuantityBtn);
    if (incQuantityBtn) {
        const id = Number(incQuantityBtn.dataset.id);
        const requiredItem = cartItems.find(item => item.id == id);
        requiredItem.quantity++;

        saveToLocalStorage();

        cartItemsContainer.innerHTML = "";

        cartItems.forEach(item => {
            renderCartItem(item);
        });
          updatePrice()
        return
    }

    // Decrease quantity logic
    const decQuantityBtn = e.target.closest(".decrease-btn");
    if (decQuantityBtn) {
        const id = Number(decQuantityBtn.dataset.id);
        const requiredItem = cartItems.find(item => item.id == id);
        if (requiredItem.quantity === 1) {
            cartItems = cartItems.filter(item => item.id != id);
        } else {
            requiredItem.quantity--;
        }
        saveToLocalStorage();
        if (cartItems.length == 0) {
            cartItemsContainer.innerHTML = "<h2>The cart is empty!</h2>"
        } else {
            cartItemsContainer.innerHTML = "";

            cartItems.forEach(item => {
                renderCartItem(item);
            });
        }
        updatePrice();
        return;
    }

  
})

const updatePrice = () => {
    const priceAmt = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    price.textContent = `$${priceAmt}`
}

const saveToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}