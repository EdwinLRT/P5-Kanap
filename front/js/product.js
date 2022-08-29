
//------------------------------------------------------------------------
// Get product id via URLsearchparams
//------------------------------------------------------------------------
const params = new URLSearchParams(document.location.search); 
const productId = params.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((res) => displayProductDatas(res));

//------------------------------------------------------------------------  
//Get product informations
//------------------------------------------------------------------------
function displayProductDatas(product) {
    // Get product content via productId
        // Image
        const productImage = document.createElement('img');
        productImage.src = product.imageUrl;
        productImage.alt = product.altTxt;
        document.querySelector(".item__img").appendChild(productImage);   
        // Price
        const productPrice = document.querySelector("#price");
        productPrice.textContent = product.price;   
       // Name
        const productName = document.querySelector("#title");
        productName.textContent = product.name;   
        // Description
        const productDescription = document.querySelector("#description");
        productDescription.textContent = product.description;   
         // Color options
        let color = document.querySelector("#colors");
        for (let i = 0; i < product.colors.length; i++) {
            color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        }

}


//------------------------------------------------------------------------
// Add  to cart 
//------------------------------------------------------------------------

let addToCartButton = document.querySelector("#addToCart");

let productQuantity = document.querySelector("#quantity");
const productColor = document.querySelector("#price").value;
 let product = {
     "name" : "",
     "id" : "",
     "color" : "",
     "quantity" : ""
 }
//Adding product and looking for it in LocalStorage
function saveInLocalStorage(productOptions) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    if (productInLocalStorage === null) {
        productInLocalStorage= [];
        productInLocalStorage.push(productOptions);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    } else {
        const foundProductInLocalStorage = productInLocalStorage.find(element => element.id == productOptions.id && element.couleur == productOptions.couleur);
        
        if (foundProductInLocalStorage == undefined) {
            productInLocalStorage.push(productOptions);
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));

//To increase quantity

        } else {
            foundProductInLocalStorage.quantity += productOptions.quantity;
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        }
    }   
}

//Save product in LocalStorage

        addToCartButton.addEventListener('click', (e) => {

            let productOptions = {
            id: params.get("id"),
            name: `${product.name}`,
            color: document.querySelector("#colors").value,
            quantity: parseInt(document.querySelector("#quantity").value),
            price: `${product.price}`,
            image: `${product.imageUrl}`,
            alt: `${product.altTxt}`
        }
        saveInLocalStorage(productOptions);
    })
;

