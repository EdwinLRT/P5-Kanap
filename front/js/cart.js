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
    //creater article and section
    let productArticle = document.createElement('article')
    document.querySelector("#cart__items").appendChild(productArticle)
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", productInLocalStorage[i].id)

            // create and diplay product image
            let productDivImage = document.createElement('div')
            productArticle.appendChild(productDivImage)
            productDivImage.className = 'cart__item__img'
            let productImg = document.createElement('img')
            productDivImage.appendChild(productImg)
            productImg.src = productInLocalStorage[i].img

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
                productTitle.innerHTML = productInLocalStorage[i].name

                // Color
                let productColor = document.createElement('p')
                cartItemContentDescription.appendChild(productColor)
                productColor.innerHTML = productInLocalStorage[i].color

                //Price
                let productPrice = document.createElement('p')
                cartItemContentDescription.appendChild(productPrice)
                productPrice.innerHTML = productInLocalStorage[i].price + "€"


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
                    productQuantity.value = productInLocalStorage[i].quantity
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
                    let idToDelete = productInLocalStorage[i].id 
                    let colorToDelete = productInLocalStorage[i].color
                    deleteButton.addEventListener('click', (e) => {

            // filter local storage to delete the element and save the remaining items
            productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== idToDelete || elt.color !== colorToDelete);
            localStorage.setItem('cart', JSON.stringify(productInLocalStorage));               
            alert('Votre article a été supprimé.');
            // reload the content
            location.reload();
                    })

   
    // Total price and quantity calculation

     let totalPriceCalculation = parseInt(productInLocalStorage[i].price) * parseInt(productInLocalStorage[i].quantity);
     totalPriceArray.push(totalPriceCalculation);
     totalQuantityArray.push(parseInt(productInLocalStorage[i].quantity));
     let totalPrice=0;
}



// Total Price
function totalPriceCalculation() {
    let totalPrice=0
    for (let i = 0; i < totalPriceArray.length; i++) {
        totalPrice += totalPriceArray[i];
    }
    document.querySelector("#totalPrice").textContent = totalPrice;
}
totalPriceCalculation()



// Total Quantity
function totalQuantityCalculation(params) {
    let totalQuantity=0
    for (let i = 0; i < totalQuantityArray.length; i++) {
        totalQuantity += totalQuantityArray[i];
    }
    document.querySelector("#totalQuantity").textContent = totalQuantity;
}
totalQuantityCalculation()



// Quantity modifications 



function modifyQtt() {
    let quantityToModify = document.querySelectorAll(".itemQuantity");

    for (let k= 0; k < quantityToModify.length; k++){
        quantityToModify[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Select id and color 
            let currentQuantity = productInLocalStorage[k].quantity;
            let QuantityRequested = quantityToModify[k].valueAsNumber;
            
            const resultFind = productInLocalStorage.find((el) => el.QuantityRequested !== currentQuantity);

            resultFind.quantity = QuantityRequested;
            productInLocalStorage[k].quantity = resultFind.quantity;

            //Store new values
            localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
            location.reload();
        })
    }
}
modifyQtt();


// -----------
// Form
//------------



//check if field is empty or not
// function isNotEmpty(value) {
//     if (value == null || value == undefined) return false;
//     else (
//         return (value.length>0)
//         );
    
// }
// used for names / city / adress
// function isLongEnough(char) {
//     let regexChar = new RegExp("^[a-zA-Z ,.'-]+$");
//     return regexChar.test(String(char));
// }
//used for email only
// function isEmail(email) {
//     let regexEmail = new RegExp(/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i);
//     return regexEmail.test(String(email).toLowerCase());
//    }

const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
const regexStandard = new RegExp("^[a-zA-Z ,.'-]{3,20}$");
const regexAddress = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// check if cart is empty
function isCartEmpty() {
    if (cart.length === 0) {
      alert(
        "Votre panier ne contient aucun article"
      );
      return true;
    } else {
      return false;
    }
  }

function getForm() {


        let form = document.querySelector(".cart__order__form")
        form.firstName.addEventListener('change', function() {
            isValidFirstName(this)
            console.log('something happened')
        })
        form.lastName.addEventListener('change', function() {
            isValidLastName(this)
        })
        form.address.addEventListener('change', function() {
            isValidAddress(this)
        })
        form.city.addEventListener('change', function() {
            isValidCity(this)
        })
        form.email.addEventListener('change', function() {
            isValidEmail(this)
        })



        //Firstname validation
        const isValidFirstName = function(inputFirstName) {
            let firstNameErrorMsg = inputFirstName.nextElementSibling;
    
            if (regexStandard.test(inputFirstName.value)) {
                firstNameErrorMsg.innerHTML = '';
            } else {
                firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
            }
        };
    
        //Lastname validation
        const isValidLastName = function(inputLastName) {
            let lastNameErrorMsg = inputLastName.nextElementSibling;
    
            if (regexStandard.test(inputLastName.value)) {
                lastNameErrorMsg.innerHTML = '';
            } else {
                lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
            }
        };
    
        //Address validation
        const isValidAddress = function(inputAddress) {
            let addressErrorMsg = inputAddress.nextElementSibling;
    
            if (regexAddress.test(inputAddress.value)) {
                addressErrorMsg.innerHTML = '';
            } else {
                addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
            }
        };
    
        //city validation
        const isValidCity = function(inputCity) {
            let cityErrorMsg = inputCity.nextElementSibling;
    
            if (regexStandard.test(inputCity.value)) {
                cityErrorMsg.innerHTML = '';
            } else {
                cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
            }
        };
    
        //email validation
        const isValidEmail = function(inputEmail) {
            let emailErrorMsg = inputEmail.nextElementSibling;
    
            if (regexEmail.test(inputEmail.value)) {
                emailErrorMsg.innerHTML = '';
            } else {
                emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
            }
        };
}





getForm()

function sendForm(){

    //let orderButton = document.querySelector('#order')
    //orderButton.addEventListener('click', (e) => {

        const orderCustomerInformations = {

            firstName: "Edwin",//document.getElementById('firstname').value,
            lastName:"Edwin", //document.getElementById('lastname').value,
            adress: "Edwin",//document.getElementById('adress').value,
            city: "Edwin",//document.getElementById('city').value,
            email: "laurent.edwin@outlook.com"//document.getElementById('email').value
        }
        console.log(orderCustomerInformations)



        // let orderArray = []
        // for (let i = 0; i < productInLocalStorage.length; i++) {
        //     orderArray.push(productInLocalStorage[i])
        // }

        // //order number based on time
        // const d = new Date();
        // let ms = d.valueOf();
        // console.log(ms)
        // const firstNameToShorten = document.getElementById('firstname').value;
        // const firstNameShortened = firstNameToShorten.slice(0, 3);
        // const lastNameToShorten = document.getElementById('lastname').value;
        // const lastNameShortened = lastNameToShorten.slice(0, 3);

        //let orderNumber = firstNameShortened+lastNameShortened+ms

        let productInCart = productInLocalStorage //JSON.stringify(productInLocalStorage)
        let customerInformations = orderCustomerInformations
        const orderData = [ 
            customerInformations,
            productInCart
        ]
          

        localStorage.setItem('order', JSON.stringify(orderData))


    }//)
//}
sendForm()

