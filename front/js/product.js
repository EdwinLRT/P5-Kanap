
//------------------------------------------------------------------------
// Get product id via URLsearchparams
//------------------------------------------------------------------------
const params = new URLSearchParams(document.location.search); 
const productId = params.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;

fetch(urlProduct)
  .then((res) => res.json())
  .then((res) => displayProductDatas(res));

//------------------------------------------------------------------------  
//Get product informations
//------------------------------------------------------------------------

function displayProductDatas(product) {
    //Changer parametre produit
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
    const title = document.querySelector("title");
    title.textContent = product.name;
    // Description
    const productDescription = document.querySelector("#description");
    productDescription.textContent = product.description;   
        // Color options
    let color = document.querySelector("#colors");
    for (let i = 0; i < product.colors.length; i++) {
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }



    //Save product in LocalStorage
    let addToCartButton = document.querySelector("#addToCart");
    addToCartButton.addEventListener('click', (e) => {
        if (document.querySelector("#quantity").value == 0 || document.querySelector("#colors").value == '' ) {
            alert("La couleur et/ou la quantitée séléctionnée est incorrecte")
        }
        else {
            let productOptions = {
                id: productId,
                name: document.querySelector("#title").textContent,
                img: product.imageUrl,
                altTxt: product.altTxt,
                color: document.querySelector("#colors").value,
                quantity: parseInt(document.querySelector("#quantity").value),
                }
            confirm("Souhaitez-vous ajouter "+ parseInt(document.querySelector("#quantity").value) +" "+ document.querySelector("#title").textContent +" de couleur "+document.querySelector("#colors").value + " à votre panier ?" ) 
            addToCart(productOptions);
        }
    })
}



//------------------------------------------------------------------------
// Add  to cart 
//------------------------------------------------------------------------



//Adding product and looking for it in LocalStorage
function addToCart(productOptions) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (productInLocalStorage === null) {
        productInLocalStorage = [];
        productInLocalStorage.push(productOptions);
        localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
    } else {
        const foundProductInLocalStorage = productInLocalStorage.find(element => element.id == productOptions.id && element.color == productOptions.color);
        
        if (foundProductInLocalStorage == undefined) {
            productInLocalStorage.push(productOptions);
            localStorage.setItem("cart", JSON.stringify(productInLocalStorage));

//To increase quantity

        } else {
            foundProductInLocalStorage.quantity += productOptions.quantity;
            localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
        }
    }   
};

