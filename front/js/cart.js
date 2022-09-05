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
                    productQuantity.setAttribute('Type', 'Number')
                    productQuantity.setAttribute("type", "number");
                    productQuantity.setAttribute("min", "1");
                    productQuantity.setAttribute("max", "100");
                    productQuantity.setAttribute("name", "itemQuantity");
                
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

 
    // // to delete product in cart 
    // let deleteButtonSection = document.querySelector('.cart__item__content__settings__delete')
    // let deleteButton = document.createElement('p')
    //     deleteButton.innerHTML = "Supprimer "
    // let deleteId = productInLocalStorage[i].id;
    // let deleteColor = productInLocalStorage[i].color;

    // deleteButtonSection.appendChild(deleteButton)
    //  deleteButton.addEventListener("click",()=> {
    //      console.log("click")
 
    //      console.log(deleteId)
    //      console.log(deleteColor)
    //      productInLocalStorage = productInLocalStorage.filter( product => product.id !== deleteId || product.color !== deleteColor);
    //      localStorage.setItem('cart', JSON.stringify(productInLocalStorage));
    //      alert("L'article a bien été supprimé de votre panier." )
    //      location.reload();
    //  })

    // Total price and quantity calculation

     let totalPriceCalculation = parseInt(productInLocalStorage[i].price) * parseInt(productInLocalStorage[i].quantity);
     totalPriceArray.push(totalPriceCalculation);
     totalQuantityArray.push(parseInt(productInLocalStorage[i].quantity));
     let totalPrice=0;
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