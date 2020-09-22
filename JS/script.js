
// ********Menu Dropdown For Mobile/Smaller Screens***********
let mobile_menu_dropdown = document.querySelector('.mobile_menu_dropdown')

mobile_menu_dropdown.addEventListener('click', () => {
    mobile_menu_dropdown = document.querySelector('.mobile_menu_dropdown')
    if (window.innerWidth >= 667.5) {
        document.querySelector('.main_nav ul').style = 'margin: auto;background: black;text-align: center;display: flex;align-items: center;padding: 10px 5.5%;padding-bottom: 0px;'
        mobile_menu_dropdown.src = '/images/nav_menu.png'
    } 
    else if (window.innerWidth < 667.5) {
        if (mobile_menu_dropdown.src.includes('menu.png')) {
            console.log('menu')
            document.querySelector('.main_nav ul').style = 'width: 100%; margin: auto; background: black; text-align: center; display: block; padding: 10px 5.5%; padding-bottom: 20px;'  
            mobile_menu_dropdown.src = '/images/nav_menu_x.png'
        }
        else {
            document.querySelector('.main_nav ul').style.display = 'none'
            mobile_menu_dropdown.src = '/images/nav_menu.png'
        }
        
    }
})


// *****************ACCORDION MENU DROPDOWN ARROWS ***************

let dropdown_arrows = document.querySelectorAll('#down_arrow')
let about_sub_menu_style = document.querySelector('#about_sub_menu').style
let about_sub_menu2_style = document.querySelector('#about_sub_menu .sub_menu2').style
let portfolio_sub_menu_style = document.querySelector('#portfolio_sub_menu').style


function arrow1_accordion() {
    about_sub_menu_style = document.querySelector('#about_sub_menu').style
    if (about_sub_menu_style.display == '') {
        console.log('about arrow clicked - display was none')
        document.querySelector('#about_sub_menu').style.display = 'block'
    }
    else if (about_sub_menu_style.display == 'block') {
        document.querySelector('#about_sub_menu').style.display = ''
    }
}
        
function arrow2_accordion() {
    let about_sub_menu2_style = document.querySelector('#about_sub_menu .sub_menu2').style
    if (about_sub_menu2_style.display == '') {
        document.querySelector('#about_sub_menu .sub_menu2').style.display = 'flex'
    }
    else if (about_sub_menu2_style.display == 'flex') {
        document.querySelector('#about_sub_menu .sub_menu2').style.display = ''
    }
}

function arrow3_accordion() {
    portfolio_sub_menu_style = document.querySelector('#portfolio_sub_menu').style
    if (portfolio_sub_menu_style.display == '') {
        document.querySelector('#portfolio_sub_menu').style.display = 'block'
    }
    else if (portfolio_sub_menu_style.display == 'block') {
        document.querySelector('#portfolio_sub_menu').style.display = ''
    }
}

function arrows_remove_add_listeners() {
    dropdown_arrows = document.querySelectorAll('#down_arrow')
    dropdown_arrows[0].removeEventListener('click', arrow1_accordion)
    dropdown_arrows[0].addEventListener('click', arrow1_accordion)
    dropdown_arrows[1].removeEventListener('click', arrow2_accordion)
    dropdown_arrows[1].addEventListener('click', arrow2_accordion)
    dropdown_arrows[2].removeEventListener('click', arrow3_accordion)
    dropdown_arrows[2].addEventListener('click', arrow3_accordion)
}

arrows_remove_add_listeners()

// ********Resize for Navigation Styling (mobile/desktop) *****

main_nav_lis = document.querySelectorAll('.nav_menu li')

let desktop_first_child_1 = document.createElement('a')
desktop_first_child_1.setAttribute('id', 'dropdown_link')
desktop_first_child_1.setAttribute('class', 'nav_link_highlight')
desktop_first_child_1.setAttribute('href', '/html/about/about.html')
desktop_first_child_1.innerHTML = `ABOUT`
let mobile_first_child_1 = document.createElement('div')
mobile_first_child_1.setAttribute('class', 'dropdown_flex')
mobile_first_child_1.innerHTML = `<a id="dropdown_link" class="nav_link_highlight" href="/html/about/about.html">ABOUT</a> <img id="down_arrow" src="/images/down_arrow.png" alt="">`

let desktop_first_child_2 = document.createElement('a')
desktop_first_child_2.setAttribute('id', 'dropdown_link2')
desktop_first_child_2.innerHTML = `My Passions/Hobbies`
let mobile_first_child_2 = document.createElement('div')
mobile_first_child_2.setAttribute('class', 'dropdown_flex')
mobile_first_child_2.innerHTML = `<a id="dropdown_link2" href="">My Passions/Hobbies</a>
<img id="down_arrow" src="/images/down_arrow.png" alt="">`

let desktop_first_child_3 = document.createElement('a')
desktop_first_child_3.setAttribute('id', 'dropdown_link')
desktop_first_child_3.setAttribute('class', 'nav_link_highlight')
desktop_first_child_3.setAttribute('href', '/html/portfolio/portfolio.html')
desktop_first_child_3.innerHTML = `PORTFOLIO`
let mobile_first_child_3 = document.createElement('div')
mobile_first_child_3.setAttribute('class', 'dropdown_flex')
mobile_first_child_3.innerHTML = `<a id="dropdown_link" class="nav_link_highlight" href="/html/portfolio/portfolio.html">PORTFOLIO</a><img id="down_arrow" src="/images/down_arrow.png" alt="">`


window.addEventListener("resize", () => {
    mobile_menu_dropdown = document.querySelector('.mobile_menu_dropdown')
    let dropdown_li_1 = main_nav_lis[1]
    let dropdown_li_2 = main_nav_lis[3]
    let dropdown_li_3 = main_nav_lis[7]
    if (window.innerWidth >= 667.5) {
        document.querySelector('#about_sub_menu').style.display = ''
        document.querySelector('#portfolio_sub_menu').style.display = ''
        document.querySelector('#about_sub_menu .sub_menu2').style.display = ''
        dropdown_li_1.replaceChild(desktop_first_child_1, dropdown_li_1.childNodes[1])
        dropdown_li_2.replaceChild(desktop_first_child_2, dropdown_li_2.childNodes[1])
        dropdown_li_3.replaceChild(desktop_first_child_3, dropdown_li_3.childNodes[1])
        document.querySelector('.main_nav ul').style = ' background: black;text-align: center;display: flex;align-items: center;justify-content: space-evenly;padding: 0px;margin: 0px;'
        mobile_menu_dropdown.src = '/images/nav_menu.png'
        let about_active_pages = ['about.html', 'soccer.html', 'drawing.html', 'boxing.html', 'story_goals.html']
        about_active_pages.forEach(page => {
            if (document.URL.includes(page)){
                document.querySelectorAll('.nav_link')[1].style.boxShadow =  '0 3.5px 1px -2px rgb(154, 226, 8)';
            }
        })
        if (document.URL.includes('portfolio.html')){
            document.querySelectorAll('.nav_link')[2].style.boxShadow =  '0 3.5px 1px -2px rgb(154, 226, 8)';
        }
    } else if (window.innerWidth < 667.5 && mobile_menu_dropdown.src.includes('menu.png')){
        document.querySelector('#about_sub_menu').style.display = ''
        document.querySelector('#portfolio_sub_menu').style.display = ''
        document.querySelector('#about_sub_menu .sub_menu2').style.display = ''
        dropdown_li_1.replaceChild(mobile_first_child_1, dropdown_li_1.childNodes[1])
        dropdown_li_2.replaceChild(mobile_first_child_2, dropdown_li_2.childNodes[1])
        dropdown_li_3.replaceChild(mobile_first_child_3, dropdown_li_3.childNodes[1])
        document.querySelector('.main_nav ul').style.display = ''
        mobile_menu_dropdown.src = '/images/nav_menu.png'
    }
    if (window.innerWidth < 667.5) {
        dropdown_arrows = document.querySelectorAll('#down_arrow') 
        arrows_remove_add_listeners()
    }
})



