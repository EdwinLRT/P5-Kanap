
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
        let productOptions = {
            id: `${product._id}`,
            nom: `${product.name}`,
            couleur: document.querySelector("#colors").value,
            quantite: parseInt(document.querySelector("#quantity").value),
            prix: `${product.price}`,
            image: `${product.imageUrl}`,
            alt: `${product.altTxt}`
        }
}

//------------------------------------------------------------------------
// Quantities 
//------------------------------------------------------------------------

function pushToCart() {
    let productQuantity = document.querySelector("#quantity");
    let addToCartButton = document.querySelector("#addToCart");
}
    

//------------------------------------------------------------------------
// Add  to cart button
//------------------------------------------------------------------------

 let addToCartButton = document.querySelector("#addToCart");
const productColor = document.querySelector("#price").value;
let product = {
    "name" : "",
    "id" : "",
    "color" : "",
    "quantity" : ""
}
addToCartButton.addEventListener("click", function() {
});


function saveInLocalStorage(productOptions) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    if (productInLocalStorage === null) {
        productInLocalStorage= [];
        productInLocalStorage.push(productOptions);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    } else {
        const found = productInLocalStorage.find(element => element.id == productOptions.id && element.couleur == productOptions.couleur);
        
        if (found == undefined) {
            productInLocalStorage.push(productOptions);
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));

//SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE

        } else {
            found.quantite += productOptions.quantite;
            localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        }
    }   
}

//ENREGISTRER LES DONNEES DE SELECTION DE PRODUIT EN LOCAL

        addToCartButton.addEventListener('click', (e) => {

            let productOptions = {
            id: params.get("id"),
            nom: `${product.name}`,
            couleur: document.querySelector("#colors").value,
            quantite: parseInt(document.querySelector("#quantity").value),
            prix: `${product.price}`,
            image: `${product.imageUrl}`,
            alt: `${product.altTxt}`
        }
        saveInLocalStorage(productOptions);
    })
;

