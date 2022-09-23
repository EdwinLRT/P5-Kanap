let myCart = JSON.parse(localStorage.getItem("cart"));

// -----------
// Cart
//------------

// check if cart is empty
function isCartEmpty() {
    if (myCart == null || myCart.length == 0) {
        // alert('Votre panier est vide') 
        document.querySelector("h1").innerHTML = `Votre panier est vide`;
        //Hide form if cart is empty
        document.querySelector("#cartAndFormContainer > section > div.cart__order > form").innerHTML =('')
      return true;
    } else {
      return false;
    }
}
isCartEmpty()

// -----------
// Display items in cart from localStorage
//------------

    // --
    //Create items in cart
    // --
function displayCartItems() {
    for (i = 0 ; i < myCart.length ; i += 1) {
        //create article and section
        let productArticle = document.createElement('article')
        document.querySelector("#cart__items").appendChild(productArticle)
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", myCart[i].id)

        // create and diplay product image
        let productDivImage = document.createElement('div')
        productArticle.appendChild(productDivImage)
        productDivImage.className = 'cart__item__img'
        let productImg = document.createElement('img')
        productDivImage.appendChild(productImg)
        productImg.src = myCart[i].img

        //Create div for cart item content 
        let cartItemContent = document.createElement('div')
        productArticle.appendChild(cartItemContent)
        cartItemContent.className = 'cart__item__content'
            
        // create div for cart item description
        let cartItemContentDescription = document.createElement('div')
        cartItemContent.appendChild(cartItemContentDescription)
        cartItemContentDescription.className = 'cart__item__content__description'

        //H2 
        let productTitle = document.createElement('h2')
        cartItemContentDescription.appendChild(productTitle)
        productTitle.innerHTML = myCart[i].name

        // Color
        let productColor = document.createElement('p')
        cartItemContentDescription.appendChild(productColor)
        productColor.innerHTML = myCart[i].color

        //Price
        var productPricePerUnit = "";
        fetch("http://localhost:3000/api/products/" + myCart[i].id)
        .then(response => response.json())
        .then(async function (resultAPI) {
            productUnit = await resultAPI;
            let productPrice = document.createElement('p')
            cartItemContentDescription.appendChild(productPrice)
            productPrice.textContent = "Prix : " + productUnit.price + " €/Unité";
        })
        .catch(error => alert("Erreur : " + error));


    // --
    //Quantity and Delete Options
    // --

        //Create div for Quantity and Remove from cart options 
        let cartItemContentSettings = document.createElement('div')
        cartItemContent.appendChild(cartItemContentSettings)
        cartItemContentSettings.className = 'cart__item__content__settings'

        // Create Div for quantity
        let cartItemContentSettingsQuantity= document.createElement('div')
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)
        cartItemContentSettingsQuantity.className = 'cart__item__content__settings__quantity'
        
        // Text before input
        let productQtyText = document.createElement('p')
        cartItemContentSettingsQuantity.appendChild(productQtyText)
        productQtyText.innerHTML = 'Qté : '

        //Quantity
        let productQuantity = document.createElement('input')
        cartItemContentSettingsQuantity.appendChild(productQuantity)
        productQuantity.value = myCart[i].quantity
        productQuantity.className = 'itemQuantity'
        productQuantity.setAttribute("type", "number")
        productQuantity.setAttribute("min", "1")
        productQuantity.setAttribute("max", "100")
        productQuantity.setAttribute("name", "itemQuantity")
            
        // create div for delete option 
        let cartItemContentSettingsDelete= document.createElement('div')
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete)
        cartItemContentSettingsDelete.className = 'cart__item__content__settings__delete'

        // p for delete button
        let deleteButton = document.createElement('p')
        cartItemContentSettingsDelete.appendChild(deleteButton)
        deleteButton.className = 'deleteItem'
        deleteButton.innerHTML = 'Supprimer'
        let idToDelete = myCart[i].id 
        let colorToDelete = myCart[i].color
        deleteButton.addEventListener('click', (e) => {

            // filter local storage to delete the element and save the remaining items
            myCart = myCart.filter( elt => elt.id !== idToDelete || elt.color !== colorToDelete);
            localStorage.setItem('cart', JSON.stringify(myCart));               
            alert('Votre article a été supprimé.');
            // reload the content
            location.reload();
        })
        // priceAndQuantityCalculation()
    }    
}
displayCartItems()


// -----------
// Quantity Modification and Price/quantity calculation fuctions 
//------------

function totalPriceCalculation() {
    let totalPriceArray = []
    for (let t = 0; t < myCart.length; t += 1 ) {
        fetch("http://localhost:3000/api/products/" + myCart[t].id)
        .then(response => response.json())
        .then(async function (resultAPI) {
            productUnit = await resultAPI;
            let totalPricePerLine = ((productUnit.price)*(myCart[t].quantity))
            totalPriceArray.push(totalPricePerLine)
            //reducer to calculate sum of totalPrice array 
            const reducer = (accumulator, curr) => accumulator + curr;
            let totalPrice = totalPriceArray.reduce(reducer); 
            let totalPriceDisplay = document.querySelector("#totalPrice")
            totalPriceDisplay.textContent = totalPrice;
        })
        .catch(error => alert("Erreur : " + error));
    }
}
totalPriceCalculation()

function totalQuantityCalculation() {
    let totalQuantityArray=[]
    for (let i = 0; i < myCart.length; i += 1) {
        let quantityToInteger = parseInt(myCart[i].quantity)
        totalQuantityArray.push(quantityToInteger)
        console.log(totalQuantityArray)
        const reducer = (accumulator, curr) => accumulator + curr;
        let totalQuantity = totalQuantityArray.reduce(reducer); 
        let totalQuantityDisplay = document.querySelector("#totalQuantity")
        totalQuantityDisplay.textContent = totalQuantity
    }
    
}
totalQuantityCalculation()

// Quantity modifications 

function modifyQuantity() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < itemQuantity.length; k++){
        itemQuantity[k].addEventListener("change" , (event) => {
            event.preventDefault();
            //Select id and color 
            
            let QuantityRequested = itemQuantity[k].valueAsNumber;
            
            const resultFind = myCart[k]
            
            resultFind.quantity = QuantityRequested;
            myCart[k].quantity = resultFind.quantity;

            //Store new values
            localStorage.setItem("cart", JSON.stringify(myCart));
            location.reload();
        })
    }
}
modifyQuantity();

// -----------
// Form Verification 
//------------

//Regex setup
const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
const regexStandard = new RegExp("^[a-zA-Z ,.'-]{2,20}$");
const regexAddress = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//for firstName
function firstNameVerif(inputFirstName) {
    const isFirstNameValid = document.querySelector("#firstNameErrorMsg");
    if (regexStandard.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = "";
        return true;
    } else {
        firstNameErrorMsg.innerHTML = "Votre saisie n'est pas valide";
        return false;
    }
}    
//for lastName
function lastNameVerif(inputLastName) {
    const isLastNameValid = document.querySelector("#lastNameErrorMsg");
        if (regexStandard.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = "";
        return true;
        } else {
        lastNameErrorMsg.innerHTML = "Votre saisie n'est pas valide";
        return false;
        }
}
//for adress
function addressVerif(inputAdress) {
    const isAdressValid = document.querySelector("#addressErrorMsg");
        if (regexAddress.test(inputAdress.value)) {
        addressErrorMsg.innerHTML = "";
        return true;
        } else {
        addressErrorMsg.innerHTML = "Cette adresse n'est pas valide. Un numéro de rue est nécessaire.";
        return false;
        }
}
//for city
function cityVerif(inputCity) {
    const isCityValid = document.querySelector("#cityErrorMsg");
        if (regexStandard.test(inputCity.value)) {
        cityErrorMsg.innerHTML = "";
        return true;
        } else {
        cityErrorMsg.innerHTML = "Votre saisie n'est pas valide";
        return false;
        }
}    
//for email
function emailVerif(inputEmail) {
    const isEmailValid = document.querySelector("#emailErrorMsg");
        if (regexEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = "";
        return true;
        } else {
        emailErrorMsg.innerHTML = "L'adresse e-mail renseignée n'est pas valide.";
        return false;
        }
}


//-----
//Listening on fields 
//-----

const form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("change", function () {
    firstNameVerif(this);
    });
form.lastName.addEventListener("change", function () {
    lastNameVerif(this);
    });
form.address.addEventListener("change", function () {
    addressVerif(this);
    });      
form.city.addEventListener("change", function () {
    cityVerif(this);
    });
form.email.addEventListener("change", function () {
    emailVerif(this);
    });

//-----
//Check if form is valid
//-----
function formVerification() {
    if (
        isCartEmpty() ||
        !firstNameVerif(form.firstName) ||
        !lastNameVerif(form.lastName) ||
        !addressVerif(form.address) || 
        !cityVerif(form.city) || 
        !emailVerif(form.email)
    ) {
        alert('Le formulaire n\'est pas complet et/ou n\'est pas correct.')
    } else {
        console.log('Form verification ok ')
        orderValidation()
        return true
    }
    
}
// -----------
// Send order using order button
//------------
//event listener on order button
const order = document.getElementById('order');
order.addEventListener('click', (event) => {
event.preventDefault();
formVerification()
})


function orderValidation() {

    //contact object 
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value   
    }
    // Array for productId storage
    let products = [];
    for (let i = 0; i<myCart.length;i++) {
        products.push(myCart[i].id);
    }
    //Objet with contact infos and products id
    const orderData = {
        contact,
        products  
    }
    
    //Send order and contact to API
    const sendToApi = {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: { 
            'Content-Type': 'application/json',
        }
    }
    // get order id from api and redirect on confirmation page
    fetch("http://localhost:3000/api/products/order", sendToApi)
    .then(response => response.json())
    .then(data => {
    document.location.href = 'confirmation.html?id='+ data.orderId;
    });


};