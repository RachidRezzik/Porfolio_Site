// *********************************
// Navigation to Certain Pills from Main Navbar
// *********************************
var url = document.location.toString();
console.log(url, url.match('#'))
if (url.match('#')) {
    console.log('aaa')
    $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
} 
window.scrollTo(0, 0);

window.addEventListener('popstate', function (event) {
	var url = document.location.toString();
    console.log(url, url.match('#'))
    if (url.match('#')) {
        console.log('aaa')
        $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
    } 
    window.scrollTo(0, 0);
}); 


// *********************************
// Creating AbsoluteGooners Account
// *********************************


const home_create_account_button = document.querySelector('.home_create_account')
const create_account_button = document.querySelector('.create_account')
const account_create_error = document.querySelector('#account_create_error')
const profile_inputs = document.querySelectorAll('#create_profile_modal_body form .form-group .form-control')
const email = document.querySelector('#email')
const email_error = document.querySelector('#email_error')
const password = document.querySelector('#password')
const password_confirm = document.querySelector('#password_confirm')
const password_match = document.querySelector('#password_match_error')
const user_icon_switch = document.querySelector('#user_icon_switch')
const user_modal_title = document.querySelector('#user_modal_title')
let error_present = false

create_account_button.addEventListener("click", () => {
    error_present = false
    profile_inputs.forEach(input => {
        if (input.value == ""){
            input.placeholder = "Enter Value"
            error_present = true
        } else {
            input.placeholder = ""
        }
    })

    if (email.value != '' && (email.value.includes('@') == false || email.value.includes('.') == false)){
        email_error.style.color='red'
        error_present = true
    } else {
        email_error.style.color='white'
    }

    if (password.value != '' && password_confirm != '' && password.value != password_confirm.value) {
        password_match.style.color = 'red'
        error_present = true
    } else{
        password_match.style.color = 'white'
    }
    let signed_in = localStorage.getItem("signed_in")  
    if (error_present == false){
        profile_inputs.forEach(input => {
            localStorage.setItem(input.id, input.value)
        })
        localStorage.setItem('signed_in', 'yes')
        user_icon_switch.innerHTML = `<img src="/images/arsenal_fansite/user_icon.png" id="user_icon" data-toggle="modal" data-target="#user_modal">`
        account_create_error.style.color = 'white'
        let user_name = localStorage.getItem('user_name')
        user_modal_title.innerHTML = `Account: ${user_name}`
        home_create_account_button.setAttribute("data-target", '#already_signed_in_modal')   
    } else {
        account_create_error.style.color = 'red'
    } 
    
    if (signed_in != "yes" && error_present == false) {
        account_create_error.style.color = 'green'
        account_create_error.innerHTML = 'Account Successfully Created!'
    } else if (signed_in == "yes" && error_present == false) {
        account_create_error.style.color = 'green'
        account_create_error.innerHTML = 'Info Successfully Updated'
    }
})

// *********************************
//  Resetting Error Notice on Create Account Modal Open 
// *********************************

if (document.URL.includes('index.html')){
    home_create_account_button.addEventListener('click', () => {
        account_create_error.style.color = "white"
        profile_inputs.forEach(input => {
            input.placeholder = ""
        })
    })
}

// *********************************
// Signing Into AbsoluteGooners Account
// *********************************

const modal_sign_in = document.querySelector('#sign_in_modal')
const modal_sign_in_button = document.querySelector('#modal_sign_in_button')
const invalid_email_password = document.querySelector('#invalid_email_password')
const modal_sign_in_inputs = document.querySelectorAll('#modal_sign_in_body form .form-group input')
error_present = false

$("#sign_in_modal").on("hidden.bs.modal", function () {
    modal_sign_in_inputs.forEach(input => {
        input.value = ""
        input.placeholder = ""
    })
    invalid_email_password.style.color = 'white'
});


modal_sign_in_button.addEventListener('click', () => {
    error_present = false
    let email_login = document.querySelector('#email_login')
    let password_login = document.querySelector('#password_login')
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    modal_sign_in_inputs.forEach(input => {
        if (input.value == ""){
            input.placeholder = "Enter Value"
            error_present = true
        } else {
            input.placeholder = ""
        }   
    })
    if ((email != email_login.value || password != password_login.value) && email_login.value != "" && password_login.value != ""){
        invalid_email_password.style.color = 'red'
        error_present = true
    } 
    else if (email_login.value == "" || password_login == ""){
        modal_sign_in_inputs.forEach(input => {
            if (input.value == ""){
                input.placeholder = "Enter Value"
                error_present = true
            } else {
                input.placeholder = ""
            }   
        })
        invalid_email_password.style.color = 'white'
    }
    else {
        invalid_email_password.style.color = 'white'
    } 
    
    
    if (error_present == false) {
        $("#sign_in_modal .close").click()
        user_icon_switch.innerHTML = `<img src="/images/arsenal_fansite/user_icon.png" id="user_icon" data-toggle="modal" data-target="#user_modal">`
        account_create_error.style.color = 'white'
        let user_name = localStorage.getItem('user_name')
        user_modal_title.innerHTML = `Account: ${user_name}`
        localStorage.setItem("signed_in", "yes")   
        modal_sign_in_inputs.forEach(input => {
            input.value = ""
        })
        if (document.URL.includes('index.html')){
            home_create_account_button.setAttribute("data-target", '#already_signed_in_modal')
        }
    } 
})


// Checking if user is already signed in to AbsoluteGooners Account

let signed_in = localStorage.getItem("signed_in") 
const create_account_modal_title = document.querySelector('#create_account_modal_title')

if (signed_in == "yes") {
    user_icon_switch.innerHTML = `<img src="/images/arsenal_fansite/user_icon.png" id="user_icon" data-toggle="modal" data-target="#user_modal">`
    account_create_error.style.color = 'white'
    let user_name = localStorage.getItem('user_name')
    user_modal_title.innerHTML = `Account: ${user_name}`
    create_account_modal_title.innerHTML = `Edit Account Info`
    profile_inputs.forEach(input => {
        let user_value = localStorage.getItem(input.id)
        input.value = user_value
    })
    create_account_button.innerHTML = `Save Changes`
    if (document.URL.includes('index.html')){
        home_create_account_button.setAttribute("data-target", '#already_signed_in_modal')
    }
} else {
    user_icon_switch.innerHTML = `<a id="login" class="nav-link" data-toggle="modal" data-target="#sign_in_modal" href="#">Sign-In</a>`
    create_account_modal_title.innerHTML = `Create Your AbsoluteGooners Account:`
    profile_inputs.forEach(input => {
        input.value = ""
    })
    create_account_button.innerHTML = `Create Account!`
    if (document.URL.includes('index.html'))
    home_create_account_button.setAttribute("data-target", '#sign_up_modal')
}

// User Signing Out of Created Account

const logouts = document.querySelectorAll('.logout')

logouts.forEach(logout => {
    logout.addEventListener('click', () => {
        localStorage.setItem('signed_in', 'no')
        user_icon_switch.innerHTML = `<a id="login" class="nav-link" data-toggle="modal" data-target="#sign_in_modal" href="#">Sign-In</a>`
        create_account_modal_title.innerHTML = `Create Your AbsoluteGooners Account:`
        profile_inputs.forEach(input => {
            input.value = ""
        })
        create_account_button.innerHTML = `Create Account!`
        if (document.URL.includes('index.html')) {
            home_create_account_button.setAttribute("data-target",'#sign_up_modal')
        }
    })
})


// *********************************
// Adding a Comment to Article
// *********************************

if (document.URL.includes('news.html')){
    const comment_textareas = document.querySelectorAll('.news_modal_footer textarea')
    const add_comment_buttons = document.querySelectorAll('.add_comment')
    const add_comment_errors = document.querySelectorAll('#login_comment_error')
    const modal_bodies = document.querySelectorAll('.modal-body')
    const news_articles = document.querySelectorAll('.news_article')

    for (let i=0; i < news_articles.length; i++) {
        news_articles[i].addEventListener('click', () => {
            add_comment_errors[i].style.color = 'white'
            comment_textareas[i].value = ""
        })
        if (localStorage.getItem(`comment${i}`) != null) {
            let comment_div = document.createElement('div')
            comment_div.setAttribute("class", "comments")
            comment_div.innerHTML = localStorage.getItem(`comment${i}`)
            modal_bodies[i].appendChild(comment_div)
        }
    }

    for (let i=0; i < add_comment_buttons.length; i++) {
        add_comment_buttons[i].addEventListener('click', () => {
            // ***** check if user already commented ****
            let user_name = localStorage.getItem("user_name")
            let signed_in = localStorage.getItem("signed_in")
            let article_comments = []
            let already_commented = false
            modal_bodies[i].childNodes.forEach(child => {
                if (child.className == "comments"){
                    article_comments.push(child)
                }
            })
            if (article_comments[article_comments.length -1].innerHTML.includes(`<h5>${user_name}</h5>`)){
                already_commented = true
            }
            let user_comment = document.querySelectorAll('.news_modal_footer textarea')
            if (user_comment[i].value != "" && already_commented == false && signed_in == 'yes'){
                let comment_div = document.createElement('div')
                comment_div.setAttribute("class", "comments")
                comment_div.innerHTML = `<h5>${user_name}</h5>
                <p>${user_comment[i].value}</p>`
                modal_bodies[i].appendChild(comment_div)
                add_comment_errors[i].style.color = 'white'
                localStorage.setItem(`comment${i}`, comment_div.innerHTML)
            } else if (user_comment[i].value != "" && already_commented == true && signed_in == 'yes'){
                add_comment_errors[i].innerHTML = `Already Added Comment`
                add_comment_errors[i].style.color = 'red'
            } else if (user_comment[i].value == '' && signed_in == 'yes'){
                add_comment_errors[i].innerHTML = `No Comment Typed`
                add_comment_errors[i].style.color = 'red'
            } else if (signed_in != "yes"){
                add_comment_errors[i].innerHTML = `Must Be Signed In to Comment`
                add_comment_errors[i].style.color = 'red'
            }
        })
    }
}


