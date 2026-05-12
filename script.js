import products from "./data.js";
let allProducts = products;
const productContainer = document.querySelector("#productContainer");
const cartItemsContainer = document.querySelector("#cart")
let cartItems = [];

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
    console.log("Page loaded");

    // check something
    const token = localStorage.getItem("token");

    if (cartItems.length==0) {
        cartItemsContainer.innerHTML = "<h2>The cart is empty!</h2>"
    } else {
        console.log("No token");
    }
});

productContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-btn");
    if (!addBtn) return;
    const id = Number(addBtn.dataset.id);

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

        renderCartItems();
    }
});

const renderCartItems = () => {
    console.log(cartItems);
    cartItems.forEach(item => {
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

        cartItemInfoOne.innerHTML = `
    <span>
        <i class="fa-solid fa-x"></i>
    </span>
`;

        const cartItemInfoTwo = document.createElement("div");
        cartItemInfoTwo.classList.add("infoTwo");
        cartItemInfoTwo.innerHTML = cartItemInfoTwo.innerHTML = `
    <h2>${item.title}</h2>
    <h3>${item.price}</h3>
`;
        
        const cartItemInfoThere = document.createElement("div");
        cartItemInfoThere.classList.add("infoThree");

        cartItemInfoThere.innerHTML = `
    <button>-</button>
    <span>${item.quantity}</span>
    <button>+</button>
`;

       cartItemInfo.appendChild(cartItemInfoOne);
       cartItemInfo.appendChild(cartItemInfoTwo);
       cartItemInfo.appendChild(cartItemInfoThere);


       cartItem.appendChild(cartItemImgContainer);
       cartItem.appendChild(cartItemInfo);

       cartItemsContainer.appendChild(cartItem);


        //     [
        //     {
        //         "id": 1,
        //         "title": "Wireless Headphones",
        //         "price": 1999,
        //         "image": "images/img1.jpg",
        //         "description": "High quality wireless headphones with noise cancellation",
        //         "category": "electronics",
        //         "quantity": 1
        //     }
        // ]
    })
}
