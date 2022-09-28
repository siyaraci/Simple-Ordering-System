if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('addtocart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

        
    document.getElementById('id02').style.display='block';
}
 

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

/*need ito para kapag pinindot ang menu(3lines) ay lumabas ung navigation bar*/
function openNav()	{
			document.getElementById("side").style.width="250px";	/*.style.width=hanggang saan mag oopen*/
 }

/*need ito para kapag pinindot ung close(x) ay magclose ang navigation bar*/
function closeNav()	{
				document.getElementById("side").style.width="0px";
			}
function opencart()	{
			document.getElementById("sidecart").style.width="600px";	/*.style.width=hanggang saan mag oopen*/
            }
function closecart()	{
			document.getElementById("sidecart").style.width="0px";	/*.style.width=hanggang saan mag oopen*/
			}
function openhistory() {
            document.getElementById("history").style.width="600px";    /*.style.width=hanggang saan mag oopen*/
            }
function closehistory()    {
            document.getElementById("history").style.width="0px";  /*.style.width=hanggang saan mag oopen*/
            }
function closemodal()   {
            document.getElementById('id02').style.display='none';
        }
function submits()    {
            alert('Thank you for purchasing!');
            closemodal() 
            openhistory()
            }
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('mytitle')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc) {

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
   for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
     alert('Added to cart')
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
     var today = new Date();
    var date= today.getFullYear()+'-'+(today.getMonth()+1)+"-"+today.getDate();
        document.getElementsByClassName('date')[0].innerText = today

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₱', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total
}
function updateHistory()    {
    var today = new Date();
    var date= today.getFullYear()+'-'+(today.getMonth()+1)+"-"+today.getDate();
        document.getElementsByClassName('date')[0].innerText = today

   const para= document.createElement("p");
    const node= document.createTextNode("Your order is:");
    para.appendChild(node);
    const element= document.getElementById("history");
    element.appendChild(para);

        
}
