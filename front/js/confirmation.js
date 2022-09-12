//Get id number form URL
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Display order id
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

//Clean local storage
localStorage.clear();