
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
        // Description
        const productDescription = document.querySelector("#description");
        productDescription.textContent = product.description;   
         // Color options
        let color = document.querySelector("#colors");
        for (let i = 0; i < product.colors.length; i++) {
            color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        }

        //Save product in LocalStorage

        addToCartButton.addEventListener('click', (e) => {
            if (document.querySelector("#quantity").value == 0 || document.querySelector("#colors").value == '' ) {
                alert("La couleur et/ou la quantitée séléctionnée est incorrecte")
            }
            else {

            let productOptions = {
                id: productId,
                name: document.querySelector("#title").textContent,
                img : product.imageUrl,
                altTxt: product.altTxt,
                color: document.querySelector("#colors").value,
                quantity: parseInt(document.querySelector("#quantity").value),
                price : parseInt(document.querySelector("#price").textContent)
                }
        saveInLocalStorage(productOptions);
    }
    })
        

}


//------------------------------------------------------------------------
// Add  to cart 
//------------------------------------------------------------------------

let addToCartButton = document.querySelector("#addToCart");

//Adding product and looking for it in LocalStorage
function saveInLocalStorage(productOptions) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("productOptions"));
    if (productInLocalStorage === null) {
        productInLocalStorage= [];
        productInLocalStorage.push(productOptions);
        localStorage.setItem("productOptions", JSON.stringify(productInLocalStorage));
    } else {
        const foundProductInLocalStorage = productInLocalStorage.find(element => element.id == productOptions.id && element.color == productOptions.color);
        
        if (foundProductInLocalStorage == undefined) {
            productInLocalStorage.push(productOptions);
            localStorage.setItem("productOptions", JSON.stringify(productInLocalStorage));

//To increase quantity

        } else {
            foundProductInLocalStorage.quantity += productOptions.quantity;
            localStorage.setItem("productOptions", JSON.stringify(productInLocalStorage));
        }
    }   
}
;

