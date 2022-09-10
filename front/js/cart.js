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





// -----------
// Display items in cart from localStorage
//------------

//creating array for cart totals
let totalPriceArray = [];
let totalQuantityArray = [];


        // --
        //Create items in cart
        // --

        for (i = 0 ; i < productInLocalStorage.length ; i += 1) {
            //create article and section
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
                priceAndQuantityCalculation()
}

// -----------
// Quantity Modification and Price/quantity calculation fuctions 
//------------

    // Total price and quantity calculation
    function priceAndQuantityCalculation() {
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
// Form Verification 
//------------

    //Regex setup
    const regexEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
    const regexStandard = new RegExp("^[a-zA-Z ,.'-]{3,20}$");
    const regexAddress = new RegExp("^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


// -----------
// Send order using order button
//------------

    function orderValidation() {

        //event listener on order button
        const order = document.getElementById('order');
        order.addEventListener('click', (event) => {
        event.preventDefault();
    
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
        for (let i = 0; i<productInLocalStorage.length;i++) {
            products.push(productInLocalStorage[i].id);
        }
        //Objet with contact infos and products id
        const orderData = {
            contact,
            products  //: productInLocalStorage
        }

        //Store ordered productId in local storage
        localStorage.setItem('order', JSON.stringify(orderData))
        
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
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id='+ data.orderId;
        });


    
    }); 
    } 
    orderValidation();
        