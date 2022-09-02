//Call API to get product list
fetch("http://localhost:3000/api/products")
    // if result is ok - turn into Json
    .then(function(res){
        if (res.ok){
            return res.json();
    }})

let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));


// -----------
// Cart
//------------


//Empty cart
if (productInLocalStorage == null || productInLocalStorage.length == 0) {

    document.querySelector("h1").innerHTML = `Votre panier est vide`;
    
}

//creating array for cart totals
let totalPriceArray = [];
let totalQuantityArray = [];

//load LocalStorage in cart

for (i = 0 ; i < productInLocalStorage.length ; i += 1) {
    document.querySelector("#cart__items").innerHTML +=    
  `<article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].img}" alt="${productInLocalStorage[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[i].quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-productId="${productInLocalStorage[i].id}" data-productColor="${productInLocalStorage[i].color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

    
    let totalPriceCalculation = parseInt(productInLocalStorage[i].price) * parseInt(productInLocalStorage[i].quantity)
    totalPriceArray.push(totalPriceCalculation);
    totalQuantityArray.push(parseInt(productInLocalStorage[i].quantity));
    let totalPrice=0
 
    // to delete product in cart 
    let deleteButton = 

}

// Total Price
//fonction
let totalPrice=0
for (let i = 0; i < totalPriceArray.length; i++) {
    totalPrice += totalPriceArray[i];
}
document.querySelector("#totalPrice").textContent = totalPrice;

// Total Quantity
//fonction
let totalQuantity=0
for (let i = 0; i < totalQuantityArray.length; i++) {
    totalQuantity += totalQuantityArray[i];
}
document.querySelector("#totalQuantity").textContent = totalQuantity;



// Delete produt from cart





// -----------
// Form
//------------

// let regexLastName = /^[a-z ,.'-]{0,35}$/i

// <input type="text" pattern="[0-9]{,3}" />