import products from "./data.js";
let allProducts = products;
const productContainer = document.querySelector("#productContainer");

allProducts.forEach(product => {
    // main product div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // image container
    const imgContainer = document.createElement("div");
     imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = product.image;

    imgContainer.appendChild(img);

    //content container
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");

    // content-one
    const contentOne = document.createElement("div");
    contentOne.classList.add("content-one");

    const titleHeading = document.createElement("h2");
    const category = document.createElement("span");

    contentOne.appendChild(titleHeading);
    contentOne.appendChild(category);

    contentContainer.appendChild(contentOne);

    //content two
    const contentTwo = document.createElement("div");
    contentTwo.classList.add("content-two");

    const priceHeading = document.createElement("h3");
    const addButton = document.createElement("button");

    contentTwo.appendChild(priceHeading);
    contentTwo.appendChild(addButton);

    productDiv.appendChild(imgContainer);
    productDiv.appendChild(contentContainer);
})

