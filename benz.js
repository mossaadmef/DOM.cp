//open and close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// start when the decoment is ready 
if(document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}
// START
function start(){
    addEvents();

}
// update & rerender
function update() {
    addEvents();
    updateTotal();

}
// add enents
function addEvents(){



    // cancel items from cart
    let cartRemove_btns = document.querySelectorAll(".cancel");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });


    // change item quantity
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });
    //add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
       btn.addEventListener("click", handle_addCartItem);
    });
} 




// handle events functions
let itemsAdded = []

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".image-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd ={
        title,
        price,
        imgSrc,
    };

    // item is already in cart
    if(itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("this car is already exist");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    // add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
} 


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        el => el.title != 
        this.parentElement.querySelector(".cart-product-title").innerHTML);

    update();
}




function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 0) {
        this.value = 0;
    }
   this.value = Math.floor(this.value);  //to keep as a integer
   update();
}

// update & rerender functions
function updateTotal() {
let cartBoxes = document.querySelectorAll(".cart-box");
const totalElement = cart.querySelector(".total-price");
let total = 0;
cartBoxes.forEach(cartBox => {
let priceElement = cartBox.querySelector(".cart-price");
let price = parseFloat(priceElement.innerHTML.replace("¥", ""));
let quantity = cartBox.querySelector(".cart-quantity").value;
total += price * quantity;
});

// keep 2 digits after the decimal point
total = total.toFixed (2);

totalElement.innerHTML = "¥" + total;
}



//--------------HTML components Cart-------

function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-content">
    <div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>  
    <i class='bx bxs-trash cancel'></i>  
    </div>
</div>`;

}
                