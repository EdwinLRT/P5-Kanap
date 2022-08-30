//Call API to get product list
fetch("http://localhost:3000/api/products")
    // if result is ok - turn into Json
    .then(function(res){
        if (res.ok){
            return res.json();
    }})

let productInLocalStorage = JSON.parse(localStorage.getItem("productOptions"));

//Empty cart
if (productInLocalStorage == null || productInLocalStorage.length == 0) {

    document.querySelector("h1").innerHTML = `Votre panier est vide`
    
}
//Price multiplicator for each item




//load LocalStorage in cart

for (i = 0 ; i < productInLocalStorage.length ; i += 1) {
    document.querySelector("#cart__items").innerHTML +=    
     `<article class="cart__item" data-id="${productInLocalStorage[i].id}">
        <article class="cart__item" data-id="${productInLocalStorage[i].id}">
            <div class="cart__item__img">
                 <img src="${productInLocalStorage[i].img}" alt="${productInLocalStorage[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                     <h2>${productInLocalStorage[i].name}</h2>
                     <p>${productInLocalStorage[i].price * productInLocalStorage[i].quantity}€</p>
                </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Couleur : ${productInLocalStorage[i].color}</p>
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].color}" value="${productInLocalStorage[i].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                     <p class="deleteItem" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].color}">Supprimer</p>
                </div>
            </div>
            </div>
        </article>
    </article>`;

    
    let totalPrice = [];
    let totalQuantity = [];
    totalPrice.push(parseInt(productInLocalStorage[i].price));
    totalQuantity.push(parseInt(productInLocalStorage[i].quantity));
    console.log(totalPrice)
    console.log(totalQuantity)

}

