
//------------------------------------------------------------------------
// Get product id via URLsearchparams
//------------------------------------------------------------------------
const params = new URLSearchParams(document.location.search); 
const productId = params.get("id");
console.log(productId); 

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((res) => getProductDatas(res));

//------------------------------------------------------------------------  
//Get product informations
//------------------------------------------------------------------------
function getProductDatas(product) {
    getProductImage()
    getProductPrice()
    getProductName()
    getProductdescription()
    getProductColorOptions()
    getProductQuantity()

    // Get product content via productId

        // Image
    function getProductImage(imageUrl, altTxt) {
        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        productImage.alt = product.altTxt;
        document.querySelector(".item__img").appendChild(productImage);   
    }

        // Price
    function getProductPrice(price) {
        const productPrice = document.querySelector("#price");
        productPrice.textContent = product.price;   
    }

        // Name
    function getProductName(name) {
        const productName = document.querySelector("#title");
        productName.textContent = product.name;   
    }

        // Description
    function getProductdescription(description) {
        const productDescription = document.querySelector("#description");
        productDescription.textContent = product.description;   
    }

         // Color options
    function getProductColorOptions() {
        let color = document.querySelector("#colors");
        for (let i = 0; i < product.colors.length; i++) {
            color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        }
    }  
}

//------------------------------------------------------------------------
// Quantities 
//------------------------------------------------------------------------

function pushToCart() {
    let xxxxxxxxxxxxxxxxxx = [
        product.imageUrl,
        product.altTxt,
        product.name,
        product.price,
        product.description,
        getProductColorOptions()
        getProductQuantity()
    ]

    let productQuantity = document.querySelector("#quantity");
    let addToCartButton = document.querySelector("#addToCart");
    addToCartButton.addEventListener("click", function() {
    console.log('clicked')
    localStorage.setItem("productQuantity", JSON.stringify(productQuantity.value))
    console.log(productQuantity.value)
    console.log(getProductColorOptions.value)
});
 
}
    

//------------------------------------------------------------------------
// Add  to cart button
//------------------------------------------------------------------------




