//Call API to get product list
fetch("http://localhost:3000/api/products")
    // if result is ok - turn into Json
    .then(function(res){
        if (res.ok){
            return res.json();
    }})
    //display product array in console
    .then((value)=>{
        console.table(value)
        displayProducts(value)
    });

//display product function
function displayProducts(products) {
    let productDisplayZone = document.querySelector("#items");

    for (let product of products) {
            productDisplayZone.innerHTML += `<a href="./product.html?id=${product._id}"> 
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
            </a>`;
            }
};

