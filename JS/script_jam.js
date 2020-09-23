

// **********CUSTOMER IMAGE CAROUSEL LANDING*********

if ( document.URL.includes("landing.html") ) {

    let featured_image = document.querySelector('#featured')
    const featured_image_description = document.querySelector('.featured_description')
    let thumbnails = document.querySelectorAll('.thumbnail')
    const src_list = ['/images/god_jam/kids_jam.JPG', '/images/god_jam/woman_eating.jpg', '/images/god_jam/jam.JPG', '/images/god_jam/old_man.jpg', '/images/god_jam/jam3.jpg', '/images/god_jam/baby.JPG']
    const src_descriptions = {
        description: ['Sarah & Julia - Dallas, TX', 'Marie - Austin, TX', 'John & David - San Antonio, TX', 'Mike - Houston, TX', 'Linda - Dallas, TX', 'Shannon - Austin, TX'],
        src_includes: ['/kids_jam.JPG', '/woman_eating.jpg', '/jam.JPG', '/old_man.jpg', '/jam3.jpg', '/baby.JPG'] 
    }
    const slideshow_arrows = document.querySelectorAll('.scroll_arrow')

    thumbnails[0].style.opacity = 1

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            let thumbnails = document.querySelectorAll('.thumbnail')
            thumbnails.forEach(thumbnail => {
                if (event.target == thumbnail){
                    thumbnail.style.opacity = 1
                } else{
                    thumbnail.style.opacity = .35
                }
                document.getElementById('featured').src = event.target.src
                for (let i=0;i<src_descriptions.description.length; i++) {
                    if (featured_image.src.includes(src_descriptions.src_includes[i]) == true) {
                        featured_image_description.innerHTML = src_descriptions.description[i]
                    }
                }
            })
        })
    })

    let current_index = 0
    slideshow_arrows.forEach(arrow => {
        if (arrow.id == 'left_arrow' && thumbnails[0].src.includes('/kids_jam.JPG') === true){
            arrow.style.opacity = 0
        }
        if (arrow.id == 'right_arrow') {     
            arrow.addEventListener('click', () => {
                let active_images = document.querySelectorAll('.active')
                let thumbnails = document.querySelectorAll('.thumbnail')       
                current_index++
                for (let i=0; i<thumbnails.length; i++) {
                    if(current_index < src_list.length && thumbnails[2].src.includes('/baby.JPG') === false){
                        thumbnails[i].src = src_list[(current_index + i)]
                    }
                    let featured_src = featured_image.src
                    if (thumbnails[i].src == featured_src){
                        thumbnails[i].style.opacity = 1
                    } else if (thumbnails[i].src != featured_src){
                        thumbnails[i].style.opacity = .35
                    }
                    if (thumbnails[2].src.includes('/baby.JPG') === true){
                        arrow.style.opacity = 0
                    } else if (thumbnails[0].src.includes('/kids_jam.JPG') === false){
                        document.querySelector('#left_arrow').style.opacity = 1
                    }
                }
            })
        } else {
            arrow.addEventListener('click', () => {
                let active_images = document.querySelectorAll('.active')
                let thumbnails = document.querySelectorAll('.thumbnail')       
                current_index = current_index - 1
                for (let i=0; i<thumbnails.length; i++) {
                    if(current_index >= 0 && thumbnails[0].src.includes('/kids_jam.JPG') === false){
                        thumbnails[i].src = src_list[(current_index + i)]
                        if (current_index == 0) {
                            thumbnails[1].src = src_list[1]
                            thumbnails[2].src = src_list[2]
                        }
                    }
                    let featured_src = featured_image.src
                    if (thumbnails[i].src == featured_src){
                        thumbnails[i].style.opacity = 1
                    } else if (thumbnails[i].src != featured_src) {
                        thumbnails[i].style.opacity = .35
                    }
                    if (thumbnails[0].src.includes('/kids_jam.JPG') === true){
                        arrow.style.opacity = 0
                    } else if (thumbnails[0].src.includes('/kids_jam.JPG') === false){
                        document.querySelector('#right_arrow').style.opacity = 1
                    }
                }
            })
        }
    })
}



// ******************ADD TO CART****************

if (document.URL.includes('store.html')) {

}

const add_cart_buttons = document.querySelectorAll('.add_button')
const jam_divs = document.querySelectorAll('.jam')
const cart = document.querySelector('.checkout_total')
const item_added = document.createElement('h4')
item_added.innerHTML = 'Item Successfully Added to Cart'
const quantities = document.querySelectorAll('.quantity_select') 
const prices = document.querySelectorAll('.price_select') 
const store_error_messages = document.querySelectorAll('.store_error_message')
const item_totals = document.querySelectorAll('.item_total')
const item_titles = document.querySelectorAll('.jam h2')
const item_imgs = document.querySelectorAll('.jam img')

if (localStorage.getItem("cart_total_displayed") === null) {
    localStorage.setItem("img_list", JSON.stringify([]));
    localStorage.setItem("quantities_list", JSON.stringify([]));
    localStorage.setItem("prices_list", JSON.stringify([]));
    localStorage.setItem("cart_item_total_list", JSON.stringify([]));
    localStorage.setItem("cart_item_title_list", JSON.stringify([]));
    document.querySelector("#data3").innerHTML = 0 
} else if (localStorage.getItem("cart_total_displayed") !== null) {
    document.getElementById("data3").innerHTML=localStorage.getItem("cart_total_displayed");
}


for (let i=0; i<quantities.length; i++){
    quantities[i].addEventListener('change', () => {
        let price = Number(quantities[i].value) * Number(prices[i].value)
        item_totals[i].innerHTML = price
    }
)}

for (let i=0; i<prices.length; i++){
    prices[i].addEventListener('change', () => {
        let price = Number(quantities[i].value) * Number(prices[i].value)
        item_totals[i].innerHTML = price
    }
)}

for (let i=0; i<add_cart_buttons.length; i++) { 
    add_cart_buttons[i].addEventListener('click', () => {
        if (quantities[i].value == '' || prices[i].value == '') {
            store_error_messages[i].style.color = 'red';
        } else if (JSON.parse(localStorage.getItem("cart_item_title_list")).includes(item_titles[i].innerHTML.toString()) == true) {
            console.log('matcchhhh')
            item_index = (JSON.parse(localStorage.getItem("cart_item_title_list"))).indexOf(item_titles[i].innerHTML.toString())
            console.log(item_index)
            store_error_messages[i].style.color = 'green';
            store_error_messages[i].style.opacity = 0;
            store_error_messages[i].innerHTML = `Order Added to Cart <img id="checkmark" src="/images/god_jam/checkmark.png" alt="">`
            $(store_error_messages[i]).fadeTo(500, 1)
            $(store_error_messages[i]).delay(1250)
            $(store_error_messages[i]).fadeTo(1000, 0)

            quantity = quantities[i].value;
            quantities_list = JSON.parse(localStorage.getItem("quantities_list"))
            let previous_quantity = quantities_list[item_index]
            
            let quantity_added = Number(quantity)
            cart_total = Number(cart.innerHTML) + quantity_added
            cart.innerHTML = cart_total
            
            price = prices[i].value;
            let size = ''
            if (price == 14){
                size = '12oz'
            } else if (price == 17.50) {
                size = '16oz'
            }

            prices_list = JSON.parse(localStorage.getItem('prices_list'))
            first_size = prices_list[item_index]
            if (first_size != size && typeof(first_size) != "object") {
                quantities_list[item_index] = [('&nbsp' + previous_quantity), ('&nbsp' + quantity)]
                prices_list[item_index] = [('&nbsp' + first_size), ('&nbsp' + size)]
            } else if (first_size == size && typeof(first_size) != "object"){
                quantities_list[item_index] = Number(previous_quantity) + Number(quantity)
                prices_list[item_index] = first_size
            } else if (typeof(first_size) == "object" && size == first_size[0].slice(5)){
                quantities_list[item_index][0] = '&nbsp' + (Number(previous_quantity[0].slice(5)) + Number(quantity)).toString()
            } else if (typeof(first_size) == "object" && size == first_size[1].slice(5)){
                console.log('yoooo1')
                quantities_list[item_index][1] = '&nbsp' + (Number(previous_quantity[1].slice(5)) + Number(quantity)).toString()
            }
            cart_item_total_list = JSON.parse(localStorage.getItem('cart_item_total_list'))
            previous_item_total = Number(cart_item_total_list[item_index])
            cart_item_total_list[item_index] = previous_item_total + (quantity * price)

            localStorage.setItem("cart_total_displayed", cart_total);
            localStorage.setItem("quantities_list", JSON.stringify(quantities_list));
            localStorage.setItem("prices_list", JSON.stringify(prices_list))
            localStorage.setItem("cart_item_total_list", JSON.stringify(cart_item_total_list))
        } 
        
        else if (quantities[i].value != '' || prices[i].value != ''){
            console.log('adding shiiit')
            store_error_messages[i].style.color = 'green';
            store_error_messages[i].style.opacity = 0;
            store_error_messages[i].innerHTML = `Order Added to Cart <img id="checkmark" src="/images/god_jam/checkmark.png" alt="">`
            $(store_error_messages[i]).fadeTo(500, 1)
            $(store_error_messages[i]).delay(1250)
            $(store_error_messages[i]).fadeTo(1000, 0)

            //getting the values
            let item_img = String(item_imgs[i].src.split('/images/god_jam/')[1])
            item_img_list = JSON.parse(localStorage.getItem("img_list"))
            item_img_list.push(item_img)

            let item_title = item_titles[i].innerHTML
            item_title_list = JSON.parse(localStorage.getItem("cart_item_title_list"))
            item_title_list.push(item_title)
            
            quantity = quantities[i].value;
            quantities_list = JSON.parse(localStorage.getItem("quantities_list"))
            quantities_list.push(quantity)
            
            let quantity_added = Number(quantity)
            cart_total = Number(cart.innerHTML) + quantity_added
            cart.innerHTML = cart_total

            price = prices[i].value;
            let size = ''
            if (price == 14){
                size = '12oz'
            } else if (price == 17.50) {
                size = '16oz'
            }
            prices_list = JSON.parse(localStorage.getItem('prices_list'))
            prices_list.push(size)


            cart_item_total = Number(quantities[i].value) * Number(prices[i].value)
            cart_item_total_list = JSON.parse(localStorage.getItem('cart_item_total_list'))
            cart_item_total_list.push(cart_item_total)

            //saving the values in local storage
            localStorage.setItem("img_list", JSON.stringify(item_img_list));
            console.log(localStorage.getItem("img_list"))
            localStorage.setItem("cart_total_displayed", cart_total);
            localStorage.setItem("cart_item_title_list", JSON.stringify(item_title_list));
            localStorage.setItem("quantities_list", JSON.stringify(quantities_list));
            localStorage.setItem("prices_list", JSON.stringify(prices_list));
            localStorage.setItem("cart_item_total_list", JSON.stringify(cart_item_total_list));
        } 
    }   
)}


// ******************CUSTOM JAM REQUEST****************

const request_inputs = document.querySelectorAll('.request_form input')
const add_request_button = document.querySelector('#custom_submit')
const form_textarea = document.querySelectorAll('.request_form textarea')
const select_buttons = document.querySelectorAll('select')
let options = document.querySelectorAll('.first_option')
let select_options = document.getElementsByClassName('select_options')
let h4_error_select = document.querySelectorAll('.select_value_error')
const form_status = document.querySelector('.form_status')
let error_present = false
const quantities2 = document.querySelectorAll('.quantity_select2') 
const prices2 = document.querySelectorAll('.price_select2')
const custom_totals = document.querySelectorAll('.custom_total')
const focus_changer = event => {
    event.target.className = 'highlight'
}
const blur_changer = event => {
    event.target.className = ''
}
const blur_changer_quantity = event => {
    event.target.className = 'quantity_select2'
}
const blur_changer_price = event => {
    event.target.className = 'price_select2'
}

// Highlighting Input/Select/Textarea User is On 

for (let i=0; i<request_inputs.length; i++){   
    request_inputs[i].addEventListener('focus', focus_changer)
    request_inputs[i].addEventListener('blur', blur_changer)
}
for (let i=0; i<quantities2.length; i++){   
    quantities2[i].addEventListener('focus', focus_changer)
    quantities2[i].addEventListener('blur', blur_changer_quantity)
}
for (let i=0; i<prices2.length; i++){   
    prices2[i].addEventListener('focus', focus_changer)
    prices2[i].addEventListener('blur', blur_changer_price)
}


// -------------------------------------------------
const user_jam_name = document.querySelector('#user_jam_name')
const jam_name_error = document.querySelector('#jam_name_error')


if (document.URL.includes('request.html')) {
    user_jam_name.addEventListener('keyup', () =>{
        let name_value = user_jam_name.value
        let item_title_list = JSON.parse(localStorage.getItem("cart_item_title_list"))
        if (name_value.toString().length > 15) {
            jam_name_error.style.color = 'red'
        jam_name_error.innerText = 'Name Must Be 15 Characters Or Less (To Fit On Custom Label)'
        }
        else if(item_title_list.includes(name_value)){
            jam_name_error.style.color = 'red'
            jam_name_error.innerText = "Duplicate Jam. Max 5 Jars Per Custom Jam" 
        }
        else{
            jam_name_error.style.color = 'lightgrey'
        }
    })
}

for (let i=0; i<quantities2.length; i++){
    quantities2[i].addEventListener('change', () => {
        let price = Number(quantities2[i].value) * 15.50
        custom_totals[i].innerHTML = price
    }
)}

for (let i=0; i<prices2.length; i++){
    prices2[i].addEventListener('change', () => {
        let price = Number(quantities2[i].value) * Number(prices2[i].value)
        custom_totals[i].innerHTML = price
    }
)}

for (let i=0; i<select_options.length; i++){
    select_buttons[i].addEventListener('change', () => {
        if (h4_error_select[i].innerHTML != '') {
            h4_error_select[i].style.color = 'lightgrey'
            error_present = false
        }
}
)}

for (let i=0; i<request_inputs.length; i++){
    request_inputs[i].addEventListener('focus', () => {
        request_inputs[i].placeholder = ''
        error_present = false
    }
    )}
    

for (let i=0; i<form_textarea.length; i++){
    form_textarea[i].addEventListener('focus', () => {
        form_textarea[i].placeholder = ''
        error_present = false  
        form_textarea[i].className = "highlight"      
    })
    form_textarea[i].addEventListener('blur', () => {
        form_textarea[i].placeholder = ''
        error_present = false  
        form_textarea[i].className = ""      
    }
)}

for (let i=0; i<request_inputs.length; i++) {
    add_request_button.addEventListener('click', ()=> {
        if (request_inputs[i].value == '' || request_inputs[i].placeholder == 'Enter Value') {
            request_inputs[i].placeholder = 'Enter Value'
            request_inputs[i].style.setProperty("--c", 'red')
            error_present = true
        } 
        
        if (i == 0 && form_textarea[i].value == '') {
            form_textarea[i].placeholder = 'Please Describe Your Jam'
            form_textarea[i].style.setProperty("--c", 'red')
            error_present = true
        } 
        
        if (i == 0 && select_buttons[i].value == ''){            
            h4_error_select[i].style.color = 'red'
            error_present = true
        } 
        let name_value = document.querySelector('#user_jam_name').value
        let item_title_list = JSON.parse(localStorage.getItem("cart_item_title_list"))
        if(item_title_list.includes(name_value)){
        jam_name_error.style.color = 'red'
        jam_name_error.innerText = "Duplicate Jam. Max 5 Jars Per Custom Jam" 
        }
        if(jam_name_error.style.color == 'red'){
            error_present = true
        }
        if (error_present == true && i == (request_inputs.length - 1)) {
            form_status.innerHTML = 'Please Correct Errors on Form'
            form_status.style.color = 'red'
            form_status.style.opacity = 1
            console.log('error')
        } else if (error_present == false && i == (request_inputs.length - 1)) {
            form_status.innerHTML = 'Custom Request Added to Cart <img id="checkmark" src="/images/god_jam/checkmark.png" alt="">'
            form_status.style.color = 'green'
            form_status.style.opacity = 0
            $(form_status).fadeTo(500, 1)
            $(form_status).delay(1250)
            $(form_status).fadeTo(1000, 0)

                    //gettting the values
            item_title = document.querySelector('#user_jam_name').value.toString()
            item_title_list = JSON.parse(localStorage.getItem("cart_item_title_list"))
            item_title_list.push(item_title)
            
            quantity = quantities2[0].value;
            quantities_list = JSON.parse(localStorage.getItem("quantities_list"))
            quantities_list.push(quantity)
            
            let quantity_added = Number(quantity)
            cart_total = Number(cart.innerHTML) + quantity_added
            cart.innerHTML = cart_total

            price = 15.50
            prices_list = JSON.parse(localStorage.getItem('prices_list'))
            prices_list.push('12oz')

            img_list = JSON.parse(localStorage.getItem('img_list'))
            img_list.push('custom_jam.JPG')

            cart_item_total = custom_totals[0].innerHTML 
            cart_item_total_list = JSON.parse(localStorage.getItem('cart_item_total_list'))
            cart_item_total_list.push(cart_item_total)

            //saving the values in local storage
            localStorage.setItem("cart_total_displayed", cart_total);
            localStorage.setItem("img_list", JSON.stringify(img_list));
            localStorage.setItem("cart_item_title_list", JSON.stringify(item_title_list));
            localStorage.setItem("quantities_list", JSON.stringify(quantities_list));
            localStorage.setItem("prices_list", JSON.stringify(prices_list));
            localStorage.setItem("cart_item_total_list", JSON.stringify(cart_item_total_list));
        }
    }
)}


// ****************CHECKOUT PAGE (adding items)**********

if ( document.URL.includes("checkout.html") ) {

    if (document.getElementById("data3").innerHTML != 0){
        document.getElementById("data3").innerHTML=localStorage.getItem("cart_total_displayed");
        document.querySelector('.checkout_wrapper').innerHTML = '<h2 id="your_cart">Your Cart</h2><div class="total_checkout"><div class="total_top"><h3>Total: $<span id="cart_total"></h3><h3><span id="total_items"></span> Items</h3></div><div class="checkout_top"><button id="checkout_button">Checkout</button></div></div><div class="cart_items"></div><div class="order_summary"><div class="order_summary_row"><h3><span id="total_items"></span> Items</h3><h3>$<span id="cart_total"></span></h3></div><div class="order_summary_row"><h3>Delivery</h3><h3>FREE</h3></div><div class="order_summary_row"><h3>Sales Tax</h3><h3>-</h3></div><div class="order_summary_row"><h3 id="cart_total_big">Total</h3><h3 id="cart_total_big">$<span id="cart_total"></span></h3></div></div><button id="checkout_button">Checkout</button>'
        document.querySelectorAll('#total_items').forEach(total_items => {
            total_items.innerHTML = document.getElementById('data3').innerHTML
        })
    }
    
    if (document.getElementById("data3").innerHTML == 0) {
        document.querySelector('.checkout_wrapper').innerHTML = '<h2 id="empty_cart">Your Cart Is Empty...What Are You Waiting For? Go Get Some God Jam!!!</h2><a href="./store.html" class="go_to_store_checkout">Go To Store</a>'
    } else if (document.getElementById("data3").innerHTML != 0) {
        let cart_html = ''
        let img_srcs = JSON.parse(localStorage.getItem("img_list"))
        let cart_titles = JSON.parse(localStorage.getItem("cart_item_title_list"))
        let cart_prices = JSON.parse(localStorage.getItem("prices_list"))
        let cart_quantities = JSON.parse(localStorage.getItem("quantities_list"))
        let cart_item_totals = JSON.parse(localStorage.getItem("cart_item_total_list"))
        for (let i=0;i<cart_prices.length; i++){
            if (typeof(cart_quantities[i]) == "object") {
                let quantity_1 = cart_quantities[i][0]
                quantity_1 = quantity_1.substring(5)
                let quantity_2 = cart_quantities[i][1]
                quantity_2 = quantity_2.substring(5)
                item_html = `<div id="item${i+1}" class="item_in_cart"><div class="cart_item_img"><img src="/images/god_jam/${img_srcs[i]}"></img></div><div class="item_description"><div class="item_title_row"><h2 id="cart_item_title">${cart_titles[i]}</h2><div class="total_and_price"><h2>$${cart_item_totals[i]}</h2><img src="/images/god_jam/x.png"></img></div></div><h2>Size: ${cart_prices[i]}</h2><div class="checkout_quantities"><h2>Quantity: </h2>
                <select id="cart_quantity_select" placeholder=${quantity_1}><option value="${quantity_1}" hidden disabled selected>${quantity_1}</option>
                <option value="0">0</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><span>,</span>&nbsp
                <select id="cart_quantity_select" placeholder=${quantity_2}><option value="${quantity_2}" hidden disabled selected>${quantity_2}</option>
                <option value="0">0</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div></div></div>`
            } else {
                item_html = `<div id="item${i+1}" class="item_in_cart"><div class="cart_item_img"><img src="/images/god_jam/${img_srcs[i]}"></img></div><div class="item_description"><div class="item_title_row"><h2>${cart_titles[i]}</h2><div class="total_and_price"><h2>$${cart_item_totals[i]}</h2><img src="/images/god_jam/x.png"></img></div></div><h2>Size: ${cart_prices[i]}</h2><div class="checkout_quantities"><h2>Quantity: </h2><select id="cart_quantity_select" placeholder=${cart_quantities[i]}><option value="${cart_quantities[i]}" hidden disabled selected>${cart_quantities[i]}</option>
                <option value="0">0</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div></div></div>`
            }
            cart_html += item_html
        }
        let cart_total_price = 0
        for (let i=0; i<cart_item_totals.length; i++){
            cart_total_price += Number(cart_item_totals[i])
        }
        document.querySelectorAll('#cart_total').forEach(cart_total => cart_total.innerHTML = cart_total_price)
        document.querySelector('.cart_items').innerHTML = cart_html
    } 


    let cart_items = document.querySelectorAll('.item_in_cart')
    let cart_prices = JSON.parse(localStorage.getItem("prices_list"))
    let img_srcs = JSON.parse(localStorage.getItem("img_list")) 
    let cart_quantities = JSON.parse(localStorage.getItem("quantities_list"))
    for (let i=0;i<cart_items.length;i++) {
        cart_quantity_selectors = document.querySelectorAll('.checkout_quantities')
        for (let j=1;j<cart_quantity_selectors[i].childNodes.length;j++) {
            cart_quantity_selectors[i].childNodes[j].addEventListener('change', (event) => {
                let new_item_total = 0
                if (event.target.parentNode == cart_quantity_selectors[i] && event.target.parentNode.childNodes.length == 2) {
                    let new_quantity = Number(cart_quantity_selectors[i].childNodes[j].value)
                    let price = cart_prices[i]
                    if (price == "12oz" && img_srcs[i].includes('custom') == false){
                        price = 14
                    } else if (img_srcs[i].includes('custom')) {
                        price = 15.50
                    } 
                    else{
                        price = 17.50
                    }
                    new_item_total += new_quantity * price
                    let cart_item_totals = JSON.parse(localStorage.getItem("cart_item_total_list"))
                    cart_item_totals[i] = new_item_total
                    localStorage.setItem('cart_item_total_list', JSON.stringify(cart_item_totals)) 
                    cart_quantities[i] = new_quantity
                    localStorage.setItem('quantities_list', JSON.stringify(cart_quantities)) 
                    document.querySelectorAll('.total_and_price')[i].innerHTML = `<h2>$${new_item_total}</h2><img src="/images/god_jam/x.png">`
                } else{
                    quantity_1 = Number(cart_quantity_selectors[i].childNodes[2].value)
                    quantity_2 = Number(cart_quantity_selectors[i].childNodes[5].value)
                    let new_quantity = Number(cart_quantity_selectors[i].childNodes[1].value + cart_quantity_selectors[i][2])
                    let price_1 = cart_prices[i][0]
                    if (price_1 == "&nbsp12oz"){
                        price_1 = 14
                    } else{
                        price_1 = 17.50
                    }
                    let price_2 = cart_prices[i][1]
                    if (price_2 == "&nbsp12oz"){
                        price_2 = 14
                    } else{
                        price_2 = 17.50
                    }
                    cart_quantities[i][0] = '&nbsp' + quantity_1.toString()
                    cart_quantities[i][1] = '&nbsp' + quantity_2.toString()
                    localStorage.setItem('quantities_list', JSON.stringify(cart_quantities)) 
                    new_item_total = (quantity_1 * price_1) + (quantity_2 * price_2)
                    let cart_item_totals = JSON.parse(localStorage.getItem("cart_item_total_list"))
                    cart_item_totals[i] = new_item_total
                    localStorage.setItem('cart_item_total_list', JSON.stringify(cart_item_totals))
                    document.querySelectorAll('.total_and_price')[i].innerHTML = `<h2>$${new_item_total}</h2><img src="/images/god_jam/x.png">`
                }
                let cart_total_price = 0
                let cart_item_totals = document.querySelectorAll(".total_and_price h2")
                cart_item_totals.forEach(total => {
                    cart_total_price += Number(total.innerHTML.substring(1))
                })
                document.querySelectorAll('#cart_total').forEach(cart_total => cart_total.innerHTML = cart_total_price)

                let new_quantity = 0
                let new_quantities = document.querySelectorAll('#cart_quantity_select')
                new_quantities.forEach(quantity => {
                    new_quantity += Number(quantity.value)
                })
                document.querySelector('#data3').innerHTML = new_quantity;
                document.querySelector('#total_items').innerHTML = new_quantity;
                localStorage.setItem("cart_total_displayed", document.querySelector('#data3').innerHTML);
                remove_item_buttons = document.querySelectorAll('.item_description img')
                remove_button_checks(remove_item_buttons)
            })
        }
    }


    // ****************CHECKOUT PAGE (removing items)**********
    
    let remove_item_buttons = document.querySelectorAll('.item_description img')
    
    function removeElement(elementId) {
        // Removes an element from the document
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
    
    
    function remove_button_checks(remove_item_buttons) {
        remove_item_buttons = document.querySelectorAll('.item_description img')
        for (let i=0; i<remove_item_buttons.length; i++){
            remove_item_buttons[i].addEventListener('click', ()=> {
                if (remove_item_buttons.length == 1){
                    localStorage.setItem("img_list", JSON.stringify([]));
                    localStorage.setItem("quantities_list", JSON.stringify([]));
                    localStorage.setItem("prices_list", JSON.stringify([]));
                    localStorage.setItem("cart_item_total_list", JSON.stringify([]));
                    localStorage.setItem("cart_item_title_list", JSON.stringify([]));
                    let cart_total = document.getElementById("data3")
                    cart_total.innerHTML = 0
                    localStorage.setItem("cart_total_displayed", cart_total.innerHTML);
                } else {
                    let item_images = JSON.parse(localStorage.getItem("img_list"))
                    item_images.splice(i, 1)
                    localStorage.setItem("img_list", JSON.stringify(item_images))

                    let cart_titles = JSON.parse(localStorage.getItem("cart_item_title_list"))
                    cart_titles.splice(i, 1)
                    localStorage.setItem("cart_item_title_list", JSON.stringify(cart_titles))

                    let cart_prices = JSON.parse(localStorage.getItem("prices_list"))
                    cart_prices.splice(i, 1)
                    localStorage.setItem("prices_list", JSON.stringify(cart_prices))
        
                    let cart_quantities = JSON.parse(localStorage.getItem("quantities_list"))
                    console.log('quantities_list: ' + cart_quantities)
                    console.log('selected i: ' + i.toString())
                    console.log('quantity_removal: ' + cart_quantities[i])
                    if (typeof(cart_quantities[i]) == "object") {
                        let quant_1 = cart_quantities[i][0].toString()
                        console.log(quant_1, typeof(quant_1))
                        quant_1 = Number(quant_1.substring(5))
                        console.log(quant_1)
                        let quant_2 = cart_quantities[i][1].toString()
                        console.log(quant_2, typeof(quant_2))
                        quant_2 = Number(quant_2.substring(5))
                        cart_quantity = quant_1 + quant_2 
                        console.log(cart_quantity)
                    } else {
                        cart_quantity = Number(cart_quantities[i])
                    }
                    let cart_total = document.getElementById("data3")
                    cart_total.innerHTML = Number(cart_total.innerHTML) - cart_quantity
                    localStorage.setItem("cart_total_displayed", cart_total.innerHTML);
        
                    cart_quantities.splice(i, 1)
                    localStorage.setItem("quantities_list", JSON.stringify(cart_quantities))
        
                    let cart_item_totals = JSON.parse(localStorage.getItem("cart_item_total_list"))
                    cart_item_totals.splice(i, 1)
                    localStorage.setItem("cart_item_total_list", JSON.stringify(cart_item_totals))
                }
                removeElement(`item${i+1}`)
                remove_item_buttons = document.querySelectorAll('.item_description img')
                console.log(remove_item_buttons.length)
                let cart_item_totals = JSON.parse(localStorage.getItem("cart_item_total_list"))
                let cart_total_price = 0
                for (let i=0; i<cart_item_totals.length; i++){
                cart_total_price += Number(cart_item_totals[i])
                }
                document.querySelectorAll('#cart_total').forEach(cart_total => cart_total.innerHTML = cart_total_price)
                if (remove_item_buttons.length == 0) {
                    console.log('empty')
                    let cart_html = document.querySelector('.checkout_wrapper')
                    cart_html.innerHTML = '<h2 id="empty_cart">Your Cart Is Empty...What Are You Waiting For? Go Get Some God Jam!!!</h2><a href="./store.html" class="go_to_store_checkout">Go To Store</a>'
                    console.log(cart_html)
                } else if (remove_item_buttons.length != 0){
                    location.reload()
                    remove_button_checks(remove_item_buttons)
                }
            })
        }
    }
    remove_button_checks(remove_item_buttons)
}





// *************************CONTACT-Send Question************************

if ( document.URL.includes("contact.html") ) {
    const sub_button_contact = document.querySelector('.submit_question button')
    const textarea_contact = document.querySelector('.other_questions textarea')
    const email_input_contact = document.querySelector('.other_questions input')
    let contact_question_status = document.querySelector('#contact_question_status')
    
    sub_button_contact.addEventListener('click', () => {
        if (textarea_contact.value == '' || email_input_contact.value == '') {
            contact_question_status.innerHTML = '**Both Fields Required**'
            contact_question_status.style.color = 'red'
        } else{
            contact_question_status.innerHTML = 'Question Submitted!'
            contact_question_status.style.color = 'green'
            contact_question_status.style.opacity = 0
            $(contact_question_status).fadeTo(500, 1)
            $(contact_question_status).delay(1250)
            $(contact_question_status).fadeTo(1000, 0)
        }
    })
}
