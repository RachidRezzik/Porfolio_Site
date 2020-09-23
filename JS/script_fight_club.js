// -----------------------------------------------------
// ******Landing Page******
//  -----------------------------------------------------
if (document.URL.includes('landing.html')){
    console.log('yoo')
    const login_button = document.querySelector('.login_button')
    const login_error = document.querySelector('#login_error')
    login_button.addEventListener('click', () => {
        login_error.style.color = 'red'
    })
}




// -----------------------------------------------------
// ******Creating Profile******
//  -----------------------------------------------------

if (document.URL.includes('create_profile.html')) {
    const profile_fields = document.querySelectorAll('.create_section input')
    const profile_selects = document.querySelectorAll('.profile_select')
    const create_profile_button = document.querySelector('.create_profile')
    const form_error = document.querySelector('#form_error')
    const select_error_1 = document.querySelector('#select_error_1')
    const select_error_2 = document.querySelector('#select_error_2')
    const email = document.querySelector('#email')
    const email_error = document.querySelector('#email_error')
    const password = document.querySelector('#password_1')
    const password_error = document.querySelector('#password_error')
    const password_confirm = document.querySelector('#password_2')
    const password_match = document.querySelector('#password_match_error')
    let error_present = false
    
    profile_fields.forEach(field => {
        field.addEventListener('focus', () => {
            field.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.377)'
            field.placeholder = ''
            error_present = false
        })
        field.addEventListener('blur', () => {
            field.style.boxShadow = ''
        })
    })
    
    
    profile_selects.forEach(select => {
        select.addEventListener('focus', () => {
            select.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.377)'
        })
        select.addEventListener('blur', () => {
            select.style.boxShadow = ''
        }) 
        select.addEventListener('change', () => {
            if (select.innerHTML != '' && select.id == 'profile_type_select') {
                select_error_1.style.color = 'rgb(209, 206, 206)'
                error_present = false
            } else {
                select_error_2.style.color = 'rgb(209, 206, 206)'
                error_present = false
            }
        })
        
    })
    
    create_profile_button.addEventListener('click', () => {
        console.log(error_present)
        profile_fields.forEach(field => {
            if (field.value == '') {
                field.placeholder = 'Enter Value'
                field.style.setProperty("--c", 'red')
                error_present = true 
            }
        })
        profile_selects.forEach(select => {
            if (select.value == '' && select.id == "profile_type_select") {
                select_error_1.style.color = 'red'
                error_present = true
            } 
        })
        if (password.value != '' && password.value.toString().length < 9) {
            password_error.style.color = 'red'
            error_present = true
        }
        if (email.value != '' && (email.value.includes('@') == false || email.value.includes('.') == false)){
            email_error.style.color='red'
            error_present = true
        }
        if (password.value != '' && password_confirm != '' && password.value != password_confirm.value) {
            password_match.style.color = 'red'
            error_present = true
        }
        console.log(error_present)
        if (error_present == true) {
            form_error.style.color = 'red'
        } else if (error_present == false) {
            document.cookie = `first_name=${profile_fields[0].value}`
            document.cookie = `last_name=${profile_fields[1].value}`
            document.cookie = `email=${profile_fields[2].value}`
            document.cookie = `password=${profile_fields[3].value}`
            document.cookie = `profile_type=${profile_selects[0].value}`
            window.location.href = '/html/portfolio/fight_club/profile_completed_login.html'
        }    
    })
}


// -----------------------------------------------------
// ******LOGIN TO PROFILE AFTER COMPLETING FORM******
//  -----------------------------------------------------

if (document.URL.includes('profile_completed_login.html')) {
    const cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    let username = cookies_object.email
    let password = cookies_object.password
    const login_fields = document.querySelectorAll('.login_input input')
    const login_button = document.querySelector('.login_button')
    const login_error = document.querySelector('#login_error')
    let error_present = false

    login_fields.forEach(field => {
        field.addEventListener('focus', () => {
            field.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.377)'
            field.placeholder = ''
            error_present = false
        })
        field.addEventListener('blur', () => {
            field.style.boxShadow = ''
        })
    })

    login_button.addEventListener('click', () => {
        login_fields.forEach(field => {
            if (field.value == '') {
                field.placeholder = 'Enter Value'
                field.style.setProperty("--c", 'red')
                error_present = true
            }
        })
        if (username != login_fields[0].value || password != login_fields[1].value) {
            login_error.style.color = 'red'
            error_present = true
        }
        if (error_present == false) {
            window.location.href = '/html/portfolio/fight_club/more_info.html'        }
    })
    login_fields.forEach(field => {
        field.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {
                login_fields.forEach(field => {
                    if (field.value == '') {
                        field.placeholder = 'Enter Value'
                        field.style.setProperty("--c", 'red')
                        error_present = true
                    }
                })
                if (username != login_fields[0].value || password != login_fields[1].value) {
                    login_error.style.color = 'red'
                    error_present = true
                } else {
                    error_present = false
                }
                if (error_present == false) {
                    window.location.href = '/html/portfolio/fight_club/more_info.html'        
                }
            }
        })
    })
}


if (document.URL.includes('more_info.html')) {
    let error_present = false
    let cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    const profile_type = cookies_object.profile_type
    const go_to_profile = document.querySelector('.go_to_profile')
    const additional_info_section = document.querySelector('.additional_info_section')
    
    if (profile_type == 'athlete') {
        additional_info_section.innerHTML = `<h2>Age:</h2>
        <input id="age" type="text" placeholder="">
        <h2>Height:</h2><h4>(Feet)</h4><select id="feet"><option class="first_option" hidden disabled selected value></option><option value="5">5</option><option value="6">6</option></select><h4>(Inches)</h4><select id="inches"><option class="first_option" hidden disabled selected value></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><h2>Weight Class</h2><select id="weight_class"><option class="first_option" hidden disabled selected value></option><option value="105 lb">105 lb</option><option value="108 lb">108 lb</option><option value="112 lb">112 lb</option><option value="115 lb">115 lb</option><option value="118 lb">118 lb</option><option value="122 lb">122 lb</option><option value="126 lb">126 lb</option><option value="130 lb">130 lb</option><option value="135 lb">135 lb</option><option value="140 lb">140 lb</option><option value="147 lb">147 lb</option><option value="154 lb">154 lb</option><option value="160 lb">160 lb</option><option value="168 lb">168 lb</option><option value="175 lb">175 lb</option><option value="200 lb">200 lb</option><option value="215 lb">215 lb</option></select>
        <h2>Boxing Stance</h2><select id="stance"><option class="first_option" hidden disabled selected value></option><option value="Orthodox">Orthodox</option><option value="Southpaw">Southpaw</option></select><h2>Gym:</h2><select id="gym"><option class="first_option" hidden disabled selected value></option><option value="El Jefe">El Jefe</option><option value="R&R">R&R</option><option value="no gym">No Gym</select>
        <div id="coach_select_div" style="display:none;">
        <h2>Coach:</h2>
        <select id="coach_select"><option class="first_option" hidden disabled selected value></option><option value="Eddie Reynoso">Eddie Reynoso</option><option value="Derrick James">Derrick James</option><option value="no coach">No Coach</option></select></div>
        <div id="open_to_coaching_div" style="display:none;"><h2>Want Coaching?</h2><select id="open_to_coaching"><option class="first_option" hidden disabled selected value></option><option value="yes">Yes</option><option value="no">No</option></select></div>`

        const gym_select = document.querySelector('#gym')
        let coach_select_div = document.querySelector('#coach_select_div')
        let coach_select = document.querySelector('#coach_select')
        const open_to_coaching_div = document.querySelector('#open_to_coaching_div')
        
        gym_select.addEventListener('change', () => {
            if (gym_select.value == 'R&R') {
                coach_select_div.style.display = 'block'
                coach_select.innerHTML = `<option value="Derrick James">Derrick James</option><option value="no coach">No Coach</option>`
            } else if (gym_select.value == 'El Jefe') {
                coach_select_div.style.display = 'block'
                coach_select.innerHTML = `<option value="Eddie Reynoso">Eddie Reynoso</option><option value="no coach">No Coach</option>`
            } else if (gym_select.value == "no gym") {
                console.log('hello')
                coach_select_div.style.display = "none"
                open_to_coaching_div.style.display = "none"
            }
            coach_select_div = document.querySelector('#coach_select_div')
            coach_select = document.querySelector('#coach_select')
        })

        coach_select.addEventListener('change', () => {
            if (coach_select.value == 'no coach') {
                open_to_coaching_div.style.display = 'block'
            } 
            if (coach_select.value != 'no coach'){
                console.log('hello')
                open_to_coaching_div.style.display = "none"
            }
        })
    } else if (profile_type == 'coach') {
        additional_info_section.innerHTML = `<h2>Age:</h2><input id="age" type="text" placeholder=""><h2>Seeking New Athletes?</h2>
        <select id="seeking_new_athletes"><option class="first_option" hidden disabled selected value></option><option value="yes">Yes</option><option value="no">No</option></select><h2>Gym:</h2><select id="gym"><option class="first_option" hidden disabled selected value></option><option value="El Jefe">El Jefe</option><option value="R&R">R&R</option><option value="no gym">No Gym</option></select><div style="display:none;" class="travel_training"><h4>NOTE: Given Current Selections, It Is Assumed Coach is Willing to Travel to Athlete's Gym/Park/Garage.<br><br> Please Select Which Location You Are Willing to Travel Within to Meet Athlete</h4><br><h2>Location</h2><select id="travel_location"><option class="first_option" hidden disabled selected value></option><option value="San Diego, CA">San Diego, CA</option><option value="Dallas, TX">Dallas, TX</option></select></div>`
        const gym_select = document.querySelector('#gym')
        const seeking_new_athletes = document.querySelector('#seeking_new_athletes')
        const travel_training = document.querySelector('.travel_training')
        const travel_location = document.querySelector('#travel_location')
        const coach_info_selectors = [seeking_new_athletes, gym_select]
        coach_info_selectors.forEach((select)=>{
            select.addEventListener('change', () => {
                if (gym_select.value == "no gym" && seeking_new_athletes.value == "yes") {
                    travel_training.style.display = "block"
                }else{
                    travel_training.style.display = "none"
                }
                if (gym_select.value == 'El Jefe') {
                    document.cookie = `location=San Diego, CA`
                } else if (gym_select.value == 'R&R') {
                    document.cookie = `location=Dallas, TX`
                }
            })   
        })
        travel_location.addEventListener('change', () => {
            if (travel_location.value == 'Dallas, TX') {
                document.cookie = `location=Dallas, TX`
            } else {
                document.cookie = `location=San Diego, CA`
            }
        })
        } else {
            const optional = document.querySelector('.login p')
            optional.style.display = 'none'
            additional_info_section.innerHTML = `<h2>Gym Name:</h2><input id="gym_name" type="text" placeholder=""><h2 style="margin-bottom:20px;"><h2>Address:</h2><input id="street" type="text" placeholder="Street"><select id="state">
            <option value="" selected="selected">Select a State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
            </select>
            <h4 id="state_select_error">*Must Select State*</h4>
            <input id="city" type="text" placeholder="City"><h2>Phone #:</h2>
            <h2 style="font-size:17.5px;"><i>(No Dashes Required)</i></h2><input id="phone"><h2 style="text-align:left;">Gym Hours: <br> <h2 style="font-size:17.5px;text-align:left;margin-bottom:35px;"><i>(Leave Blank if Closed)</h2></i></h2>
            
            <h2 class="day_of_week">Monday</h2><div class="day_of_week_div"><input id="monday_start" type="time" placeholder="Open"><input id="monday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Tuesday</h2><div class="day_of_week_div"><input id="tuesday_start" type="time" placeholder="Open"><input id="tuesday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Wednesday</h2><div class="day_of_week_div"><input id="wednesday_start" type="time" placeholder="Open"><input id="wednesday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Thursday</h2><div class="day_of_week_div"><input id="thursday_start" type="time" placeholder="Open"><input id="thursday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Friday</h2><div class="day_of_week_div"><input id="friday_start" type="time" placeholder="Open"><input id="friday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Saturday</h2><div class="day_of_week_div"><input id="saturday_start" type="time" placeholder="Open"><input id="saturday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>
            
            <h2 class="day_of_week">Sunday</h2><div class="day_of_week_div"><input id="sunday_start" type="time" placeholder="Open"><input id="sunday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>
            `
        }  
    go_to_profile.addEventListener('click', () => {
        let additional_info_inputs = document.querySelectorAll('.additional_info_section input')
        let additional_info_selects = document.querySelectorAll('.additional_info_section select')
        const state_select_error = document.querySelector('#state_select_error')
        if (profile_type == 'gym'){
            if (additional_info_selects[0].value == ''){
                state_select_error.style.color = 'red'
                document.querySelector('#error_gym_info').style.color = 'red'
            } else {
                document.querySelector('#error_gym_info').style.color = 'white'
            }
            additional_info_inputs = Array.from(additional_info_inputs).slice(0, 4)
            additional_info_inputs.forEach(input => {
                if (input.value == '') {
                    document.querySelector('#error_gym_info').style.color = 'red'
                    input.placeholder = 'Enter Value'
                    input.style.setProperty("--c", 'red')
                } else {
                    document.querySelector('#error_gym_info').style.color = 'white'
                    input.placeholder = ''
                }
            })
            additional_info_inputs = document.querySelectorAll('.additional_info_section input')
            let additional_info_inputs_time = Array.from(additional_info_inputs).slice(4)
            additional_info_inputs_time.forEach(time => {
                if (time.value != '') {
                    console.log('yoo')
                    let time_value = ''
                    let hour = Number(time.value.split(':')[0])
                    let minutes = time.value.split
                    (':')[1]
                    let time_of_day = 'AM'
                    if (hour < 12) {
                    } else {
                        time_of_day = 'PM'
                        if (hour != 12){
                            hour = hour - 12
                        }
                    }
                    if (hour == "00"){
                        time_value = `12:${minutes} ${time_of_day}`
                    } else {
                        time_value = `${hour}:${minutes} ${time_of_day}`
                    }
                    document.cookie = `${time.id}=${time_value}`
                } else {
                    document.cookie = `${time.id}=CLOSED`
                }
            })
            cookies_object = document.cookie.split('; ').reduce((prev, current) => {
                const [name, value] = current.split('=');
                prev[name] = value;
                return prev
            }, {});
            console.log(cookies_object.monday_start)
            console.log(cookies_object.monday_end)
            const day_of_week_divs = document.querySelectorAll('.day_of_week_div')
            day_of_week_divs.forEach(day => {
                let open = day.childNodes[0].value
                let close = day.childNodes[1].value
                if (open != "") {
                    open = Number(open.replace(':', ''))
                }
                if (close != "") {
                    close = Number(close.replace(':', ''))
                }
                if((open >= close) && open != '' && close != ''){
                    day.childNodes[3].style.color = 'red'
                    document.querySelector('#error_gym_info').style.color = 'red'
                } 
                else if ((open == "" && close != "") || (open != "" && close == "")){
                    day.childNodes[3].style.color = 'red'
                    document.querySelector('#error_gym_info').style.color = 'red' 
                }
                else if ((open == "" && close == "") || close > open) {
                    day.childNodes[3].style.color = 'rgb(209, 206, 206)'
                    let open_id = day.childNodes[0].id
                    let open_value = cookies_object[open_id]
                    document.cookie = `${day.childNodes[0].id}=${open_value} - `
                    
                }
                if (open == "" && close == "") {
                    document.cookie = `${day.childNodes[0].id}=CLOSED`
                    document.cookie = `${day.childNodes[1].id}=`
                }
            })
        }
        additional_info_inputs.forEach(input => {
            if (input.value != '' && input.type != "time") {
                document.cookie = `${input.id}=${input.value}`
            }
        })
        additional_info_selects.forEach(select => {
            if (select.value != '') {
                document.cookie = `${select.id}=${select.value}`
            }
        })
        if (document.querySelector('#error_gym_info').style.color != 'red') {
            window.location.href = '/html/portfolio/fight_club/user_profile.html'
        }
    })  
}



if (document.URL.includes('user_profile.html')) {
    const cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    const profile_type = cookies_object.profile_type
    const full_name = cookies_object.first_name + '&nbsp' + cookies_object.last_name
    const gym_name = cookies_object.gym_name
    const state = cookies_object.state
    const city = cookies_object.city
    const street = cookies_object.street
    const user_profile_pic_src = localStorage.getItem("profile_pic")

    if (profile_type == 'athlete') {
        document.querySelector('.profile_wrapper').innerHTML = `<section class="athlete_info">
        <h1 id="athlete_profile_title">Athlete: <span id="profile_name">${full_name}</span></h1>
        <div class="bio">
            <div class="pro_pic">
                <img class="profile_pic" src="/images/fight_club/generic_athlete.JPG" alt="">
                <button id="edit_profile_pic">Edit Profile Picture</button>
            </div>
            <div class="stats">
                <h3>Age: <span id="profile_age">N/A</span></h3><h3>Height: <span id="profile_height">N/A</span></h3> 
                <h3>Weight Class: <span id="profile_weight_class">N/A</span></h3> 
                <h3>Stance: <span id="profile_stance">N/A</span></h3> 
                <h3>Gym: <span id="profile_gym">N/A</span></h3> 
                <h3>Location: <span id="profile_location">N/A</span></h3>
                <a id="edit_info" href="./edit_user_info.html">Edit Info</a>
            </div>
        </div>
    </section>
    <section class="side_info">
        <div class="bio">
            <div class="coach_info">
                <div class="coach">
                    <h2>
                        Coach
                    </h2>
                    <h4 id="coaching_situation">No Current Coach</h4>
                </div>
                <div class="teammates">
                    <h2>
                        Teammates
                    </h2>
                    <h4>No Current Teammates</h4>
                </div>
            </div>
        </div>
    </section>
    <section class="posts">
        <h2>
            Posts
        </h2>
        <h4 id="no_posts" style="margin:15px;">(No Posts Available)</h4>
        <div style="display:none;" class="athlete_posts"></div>
        <button style="margin-top:10px" id="add_post">Add Post</button>
    </section>`
        const age = cookies_object.age
        let weight_class = cookies_object.weight_class
        const stance = cookies_object.stance
        const feet = cookies_object.feet
        const inches = cookies_object.inches
        const open_to_coaching = cookies_object.open_to_coaching
        const coach = cookies_object.coach_select
        if (age != undefined && age != ""){
            let profile_age = document.querySelector('#profile_age')
            profile_age.innerHTML = `${age}`
        }
        if (feet != undefined & inches != undefined) {
            let profile_height = document.querySelector('#profile_height')
            profile_height.innerHTML = `${feet}'${inches}"`
        }
        if (stance != undefined){
            let profile_stance = document.querySelector('#profile_stance')
            profile_stance.innerHTML = `${stance}`
        }
        const gym = cookies_object.gym
        if (gym == 'El Jefe') {
            let profile_gym = document.querySelector('#profile_gym')
            profile_gym.innerHTML = `<a class="athlete_gym" href="/html/portfolio/fight_club/gyms/el_jefe/el_jefe.html">${gym} Boxing Club</a>`
            let profile_location = document.querySelector('#profile_location')
            profile_location.innerHTML = 'San Diego, CA'
        } else if (gym == 'R&R') {
            let profile_gym = document.querySelector('#profile_gym')
            profile_gym.innerHTML = `<a class="athlete_gym" href="/html/portfolio/fight_club/gyms/R&R/R&R.html">${gym} Boxing Club</a>`
            let profile_location = document.querySelector('#profile_location')
            profile_location.innerHTML = 'Dallas, TX'
        } else if (gym != 'R&R' || gym != 'El Jefe'){
            console.log('yoo')
            coaching_situation = document.querySelector('#coaching_situation')
            coaching_situation.innerHTML = `No Current Coach`
        }
        
        if (weight_class != undefined) {
            profile_weight = document.querySelector('#profile_weight_class')
            profile_weight.innerHTML = `${weight_class}`
        }
        if (coach == 'Eddie Reynoso') {
            coach_info = document.querySelector('.side_info')
            coach_info.innerHTML = `
        <h2>
            Coach
        </h2>
        <div class="bio">
            <div class="coach_info">
                <div class="coach">
                    <a href="/html/portfolio/fight_club/coaches/reynoso/reynoso.html"><img src="/html/portfolio/fight_club/coaches/reynoso/images/profile.jpg" alt=""></a>
                    <a id="coach_name" href="/html/portfolio/fight_club/coach_reynoso.html">Eddie Reynoso</a>
                </div>
            </div>
        </div>
        <div class="teammates">
            <h2>
                Teammates
            </h2>
            <div class="teammates_grid">
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/canelo/canelo.html">  <img src="/html/portfolio/fight_club/athletes/canelo/images/profile.jpg" alt=""></a>
                    <a href="">Canelo Alvarez</a>
                </div>
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/garcia/garcia.html">  <img src="/html/portfolio/fight_club/athletes/garcia/images/profile.jpg" alt=""></a>
                    <a href="">Ryan Garcia</a>
                </div>
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/valdez/valdez.html">  <img src="/html/portfolio/fight_club/athletes/valdez/images/profile.jpg" alt=""></a>
                    <a href="">Oscar Valdez</a>
                </div>
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/ruiz/ruiz.html">  <img src="/html/portfolio/fight_club/athletes/ruiz/images/profile.jpg" alt=""></a>
                    <a href="">Andy Ruiz</a>
                </div>      
            </div>
        </div>
            `
        } else if (coach == 'Derrick James'){
            coach_info = document.querySelector('.side_info')
            coach_info.innerHTML = `<h2>
            Coach
        </h2>
        <div class="bio">
            <div class="coach_info">
                <div class="coach">
                    <a href="/html/portfolio/fight_club/coaches/james/james.html"><img src="/html/portfolio/fight_club/coaches/james/images/profile.jpg" alt=""></a>
                    <a id="coach_name" href="/html/portfolio/fight_club/coaches/james/james.html">Derrick James</a>
                </div>
            </div>
        </div>
        <div class="teammates">
            <h2>
                Teammates
            </h2>
            <div class="teammates_grid">
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/spence/spence.html">  <img src="/html/portfolio/fight_club/athletes/spence/images/profile.jpg" alt=""></a>
                    <a href="">Errol Spence Jr.</a>
                </div>
                <div class='team_member'>
                    <a href="/html/portfolio/fight_club/athletes/charlo/charlo.html">  <img src="/html/portfolio/fight_club/athletes/charlo/images/profile.jpg" alt=""></a>
                    <a href="">Jermell Charlo</a>
                </div> 
            </div>
        </div>`
        } 
        if (open_to_coaching == 'yes' && coach == 'no coach' && gym != 'no gym') {
            coaching_situation = document.querySelector('#coaching_situation')
            coaching_situation.innerHTML = `No Current Coach: Open to Coaching<img id="green_checkmark" src="/images/fight_club/checkmark.png">`
        } else if (open_to_coaching == 'no' && coach =='no coach' && gym != 'no gym'){
            coaching_situation = document.querySelector('#coaching_situation')
            coaching_situation.innerHTML = `No Current Coach: Not Open to Coaching<img id="red_x" src="/images/fight_club/red_x.png">`
        }
    }  
    else if (profile_type == 'coach') {
        document.querySelector('.profile_wrapper').innerHTML = `<section class="athlete_info">
        <h1 id="athlete_profile_title">Coach: <span id="profile_name">${full_name}</span></h1>
        <div class="bio">
            <div class="pro_pic">
                <img class="profile_pic" src="/images/fight_club/generic_coach.JPG" alt="">
                <button id="edit_profile_pic">Edit Profile Picture</button>
            </div>
            <div class="stats">
                <h3>Age: <span id="profile_age">N/A</span> 
                <h3>Gym: <span id="profile_gym">N/A</span></h3> 
                <h3>Location: <span id="profile_location">N/A</span></h3>
                <a id="edit_info" href="./edit_user_info.html">Edit Info</a> 
            </div>
        </div>
    </section>
    <section class="side_info">
        <h2>
            Athletes
        </h2>
        <h4 id="athlete_status">No Current Athletes</h4>
        <div class="teammates_grid">
        </div>
    </section>
    <section class="posts">
        <h2>
            Posts
        </h2>
        <h4 id="no_posts" style="margin:15px;">(No Posts Available)</h4>
        <div style="display:none;" class="athlete_posts"></div>
        <button style="margin-top:10px" id="add_post">Add Post</button>
    </section>`
        const age = cookies_object.age
        const gym = cookies_object.gym
        const location = cookies_object.location
        const seeking_athletes = cookies_object.seeking_new_athletes
        const travel_location = cookies_object.travel_location
        if (age != undefined){
            let profile_age = document.querySelector('#profile_age')
            profile_age.innerHTML = `${age}`
        }
        if (gym == 'El Jefe') {
            let profile_gym = document.querySelector('#profile_gym')
            profile_gym.innerHTML = `<a class="athlete_gym" href="/html/portfolio/fight_club/gyms/el_jefe/el_jefe.html">${gym} Boxing Club</a>`
            let profile_location = document.querySelector('#profile_location')
            profile_location.innerHTML = 'San Diego, CA'
        } else if (gym == 'R&R') {
            let profile_gym = document.querySelector('#profile_gym')
            profile_gym.innerHTML = `<a class="athlete_gym" href="/html/portfolio/fight_club/gyms/R&R/R&R.html">${gym} Boxing Club</a>`
            let profile_location = document.querySelector('#profile_location')
            profile_location.innerHTML = 'Dallas, TX'
        }
        const athlete_status = document.querySelector('#athlete_status')
        if (gym == 'no gym' && seeking_athletes == 'yes') {
            athlete_status.innerHTML = `No Current Athletes. <br> Open to Meet at Athlete's Gym/Park/Garage for Training <img id="green_checkmark" src="/images/fight_club/checkmark.png">`
            let profile_location = document.querySelector('#profile_location')
            profile_location.innerHTML = `${travel_location}`
        } else if(gym != 'no gym' && seeking_athletes == 'yes'){
            athlete_status.innerHTML = `No Current Athletes. <br> Currently Seeking Athletes to Train <img id="green_checkmark" src="/images/fight_club/checkmark.png">`
        } else {
            athlete_status.innerHTML = `No Current Athletes. <br> Not Currently Seeking Athletes to Train <img id="red_x" src="/images/fight_club/red_x.png">`
        }
    }
    else if (profile_type == 'gym') {
        const phone = cookies_object.phone
        let phone_1 = phone.slice(0,3)
        let phone_2 = phone.slice(3,6)
        let phone_3 = phone.slice(6,10)
        const monday_start = cookies_object.monday_start
        const monday_end = cookies_object.monday_end
        const tuesday_start = cookies_object.tuesday_start
        const tuesday_end = cookies_object.tuesday_end
        const wednesday_start = cookies_object.wednesday_start
        const wednesday_end = cookies_object.wednesday_end
        const thursday_start = cookies_object.thursday_start
        const thursday_end = cookies_object.thursday_end
        const friday_start = cookies_object.friday_start
        const friday_end = cookies_object.friday_end
        const saturday_start = cookies_object.saturday_start
        const saturday_end = cookies_object.saturday_end
        const sunday_start = cookies_object.sunday_start
        const sunday_end = cookies_object.sunday_end
        document.querySelector('.profile_wrapper').innerHTML = `<section class="athlete_info">
        <h1>Gym Profile: ${gym_name}</h1>
        <div class="bio">
            <div class="pro_pic">
                <img class="profile_pic" src="/images/fight_club/generic_boxing_gym.JPG" alt="">
                <button id="edit_profile_pic">Edit Profile Picture</button>
            </div>
            <div class="stats">
                <h3>Address: ${street}, ${city}, ${state}</h3>
                <h3>Phone: ${phone_1}-${phone_2}-${phone_3}</h3>
                <a id="edit_info" href="./edit_user_info.html">Edit Gym Info/Hours</a> 
            </div>
        </div>
        </section>
        <section class="gym_hours_section">
            <h1>Gym Hours</h1> 
            <table id="gym_hours">
            <tr><td>Monday</td><td>${monday_start} ${monday_end}</td></tr>
            <tr><td>Tuesday</td><td>${tuesday_start}  ${tuesday_end}</td></tr>
            <tr><td>Wednesday</td><td>${wednesday_start} ${wednesday_end}</td></tr>
            <tr><td>Thursday</td><td>${thursday_start} ${thursday_end}</td></tr>
            <tr><td>Friday</td><td>${friday_start} ${friday_end}</td></tr>
            <tr><td>Saturday</td><td>${saturday_start} ${saturday_end}</td></tr>
            <tr><td>Sunday</td><td>${sunday_start} ${sunday_end}</td></tr>
            </table>
        </section>
        <section class="side_info">
        <h2>
            Coaches
        </h2>
        <h4 style="margin-bottom:50px;"id="athlete_status">No Current Coaches</h4>
        <h2>
            Athletes
        </h2>
        <h4 id="athlete_status">No Current Athletes</h4>
        <div class="teammates_grid">
        </div>
    </section>
    <section class="posts">
        <h2>
            Posts
        </h2>
        <h4 id="no_posts" style="margin:15px;">(No Posts Available)</h4>
        <div style="display:none;" class="athlete_posts"></div>
        <button style="margin-top:10px" id="add_post">Add Post</button>
    </section>`
    }
    profile_pic_src = localStorage.getItem("profile_pic")
    if (profile_pic_src != null){
        document.querySelector('.profile_pic').src = profile_pic_src
    }
    localStorage.setItem("profile_pic", document.querySelector('.profile_pic').src)

    let number_of_posts = Number(localStorage.getItem("number_of_posts"))
    let posts_html = ''
    for (i=0; i<number_of_posts;i++){
        let post_src = localStorage.getItem(`post_${i+1}`)
        posts_html += `<div class="picture">
        <img src=${post_src} alt="" class="photo">
        </div>`
    }
    let posts = document.querySelector('.athlete_posts')
    if (posts_html != ""){
        posts.innerHTML = posts_html
        posts.style.display = "grid"
        document.querySelector("#no_posts").style.display = "none"
    }
}


// ------------------------------------------
// ******User Profile Pic In Navigation &&& Search Bar for Athletes/Coaches/Gyms************************
// ---------------------------------------------------

if (document.URL.includes('landing.html') == false && document.URL.includes('create_profile.html') == false && document.URL.includes('profile_completed_login.html') == false && document.URL.includes('more_info.html') == false) {
    let cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    profile_pic_src = localStorage.getItem("profile_pic")
    nav_profile_pics = document.querySelectorAll('#header_profile_pic')
    nav_profile_pics.forEach(nav_profile_pic => {
        if (profile_pic_src != null){
            nav_profile_pic.src = profile_pic_src
        }
    })

    const profiles = {
        name: ['errol spence jr.', 'jermell charlo', 'canelo alvarez', 'ryan garcia', 'oscar valdez', 'andy ruiz', 'eddie reynoso', 'derrick james', 'el jefe boxing club', 'r&r boxing club'],
        href: ['/html/portfolio/fight_club/athletes/spence/spence.html', '/html/portfolio/fight_club/athletes/charlo/charlo.html', '/html/portfolio/fight_club/athletes/canelo/canelo.html', '/html/portfolio/fight_club/athletes/garcia/garcia.html', '/html/portfolio/fight_club/athletes/valdez/valdez.html', '/html/portfolio/fight_club/athletes/ruiz/ruiz.html', '/html/portfolio/fight_club/coaches/reynoso/reynoso.html', '/html/portfolio/fight_club/coaches/james/james.html', '/html/portfolio/fight_club/gyms/el_jefe/el_jefe.html','/html/portfolio/fight_club/gyms/R&R/R&R.html']
    }
    const nav_search = document.querySelector('.search_nav')
    let search_bar = document.querySelector('#search_bar')
    const body = document.querySelector('body')
    search_bar.addEventListener('keyup', (event) => {
        console.log(event.keyCode)
        let search_bar_input = search_bar.value.toLowerCase()
        let suggestions = profiles.name.filter((name) => {
            return name.startsWith(search_bar_input)
        })
        if (event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13){
            nav_search.innerHTML = ''
            suggestions.forEach(suggestion => {
                let suggestion_index = profiles.name.indexOf(suggestion)
                let suggestion_link = profiles.href[suggestion_index]
                let suggestion_li = document.createElement('li')
                suggestion_li.innerHTML = `<a href=${suggestion_link}>${suggestion}</a>`
                nav_search.appendChild(suggestion_li)
            })
        }
        if (search_bar_input == ''){
            nav_search.innerHTML = ''
        }
        let suggestion_links = document.querySelectorAll('.search_nav li a')
        console.log(suggestion_links)
        suggestion_links.forEach((suggestion_link) => {
            suggestion_link.addEventListener('mouseover', () => {
                suggestion_link.style.backgroundColor = 'rgb(170, 169, 169)'
            })
            suggestion_link.addEventListener('mouseout', () => {
                suggestion_link.style.backgroundColor = null
            })
        })
        if (event.keyCode == 40 && nav_search.innerHTML != '' && nav_search.style.opacity != 0) {
            console.log('down key pressed')
            suggestion_links = document.querySelectorAll('.search_nav li a')
            let suggestion_highlighted = 0
            for (let i=0;i < suggestion_links.length; i++) {
                if (suggestion_links[i].id != '') {
                    suggestion_highlighted += 1
                }
            }
            let highlight_count = 0
            for (let i=0;i < suggestion_links.length; i++) {
                if (suggestion_highlighted == 1 &&suggestion_links[i].id == 'highlighted_suggestion' && i != (suggestion_links.length - 1) && highlight_count != 1) {
                    suggestion_links[i].id = ''
                    suggestion_links[i + 1].id = 'highlighted_suggestion'
                    search_bar.value = suggestion_links[i + 1].innerHTML.replace('amp;','').toUpperCase()
                    highlight_count ++
                }
                else if (suggestion_highlighted==0){
                    suggestion_links[0].id = 'highlighted_suggestion'
                    search_bar.value = suggestion_links[0].innerHTML.replace('amp;','').toUpperCase()
                }
            }
        }
        if (event.keyCode == 38 && nav_search.innerHTML != '' && nav_search.style.opacity != 0) {
            suggestion_links = document.querySelectorAll('.search_nav li a')
            let suggestion_highlighted = 0
            for (let i=0;i < suggestion_links.length; i++) {
                if (suggestion_links[i].id != '') {
                    suggestion_highlighted += 1
                }
            }
            let highlight_count = 0
            for (let i=0;i < suggestion_links.length; i++) {
                if (suggestion_highlighted == 1 &&suggestion_links[i].id == 'highlighted_suggestion' && i != 0 && highlight_count != 1) {
                    suggestion_links[i].id = ''
                    suggestion_links[i - 1].id = 'highlighted_suggestion'
                    search_bar.value = suggestion_links[i - 1].innerHTML.replace('amp;','').toUpperCase()
                    highlight_count ++
                }
                else if (suggestion_highlighted==0){
                    suggestion_links[0].id = 'highlighted_suggestion'
                    search_bar.value = suggestion_links[0].innerHTML.replace('amp;','').toUpperCase()
                }
            }
        }
        if (event.keyCode == 13) {
            search_bar_input = search_bar.value.toLowerCase()
            suggestion_links = document.querySelectorAll('.search_nav li a')
            console.log('enter')
            let match = false
            suggestion_links.forEach(suggestion_link => {
                console.log(suggestion_link.innerHTML)
                if (suggestion_link.innerHTML.replace('amp;','').toLowerCase() == search_bar_input) {
                    match = true
                    console.log(suggestion_link.href)
                    window.location.href = suggestion_link.href
                }
                else if (match == false) {
                    search_bar_value = document.querySelector('#search_bar').value
                    localStorage.setItem('user_search', search_bar_value)
                    window.location.href = '/html/portfolio/fight_club/no_results_found.html'
                }
            })
            if (suggestion_links.length == 0) {
                search_bar_value = document.querySelector('#search_bar').value
                localStorage.setItem('user_search', search_bar_value)
                window.location.href = '/html/portfolio/fight_club/no_results_found.html'
            }
        }
    })

    const search_button = document.querySelector('.search_bar_container button')

    search_button.addEventListener('click', () =>  {
        let match = false
        let name_index = 0
        let profile_link = ""
        search_bar_input = search_bar.value.toLowerCase()
        profiles.name.forEach((name) => {
            if (search_bar_input == name.toLowerCase()){
                name_index = profiles.name.indexOf(name)
                profile_link = profiles.href[name_index]
                match = true
            }
        })
        if (match == true) {
            window.location.href = profile_link
        } else{
            search_bar_value = document.querySelector('#search_bar').value
            localStorage.setItem('user_search', search_bar_value)
            window.location.href = '/html/portfolio/fight_club/no_results_found.html'
        }
    })

    body.addEventListener('click', (event) => {
        if (event.target.id != 'search_bar' && nav_search.innerHTML != ''){
            nav_search.style.opacity = 0
            nav_search.style.pointerEvents = 'none'
        } else {
            nav_search.style.opacity = 1
            nav_search.style.pointerEvents = 'all'
        }
    })

    body.addEventListener('keyup', (event) => {
        if (event.keyCode == 9 && nav_search.innerHTML != '' && nav_search.style.opacity != 0){
            console.log('works')
            let suggestion_links = document.querySelectorAll('.search_nav li a')
            console.log(suggestion_links)
            suggestion_links.forEach(suggestion => {
                if (suggestion.style.backgroundColor == "rgb(170, 169, 169)"){
                    let new_search_value = suggestion.innerHTML.replace("amp;", "").toUpperCase()
                    document.querySelector('#search_bar').value = new_search_value 
                    search_bar.focus()            
                    nav_search.innerHTML = ""              
                }
            })
            let search_bar_input = search_bar.value.toLowerCase()
            let suggestions = profiles.name.filter((name) => {
                return name.startsWith(search_bar_input)
            })
            nav_search.innerHTML = ''
            suggestions.forEach(suggestion => {
                let suggestion_index = profiles.name.indexOf(suggestion)
                let suggestion_link = profiles.href[suggestion_index]
                let suggestion_li = document.createElement('li')
                suggestion_li.innerHTML = `<a href=${suggestion_link}>${suggestion}</a>`
                nav_search.appendChild(suggestion_li)
            })
            if (search_bar_input == ''){
                nav_search.innerHTML = ''
            }
            suggestion_links = document.querySelectorAll('.search_nav li a')
            console.log(suggestion_links)
            suggestion_links.forEach((suggestion_link) => {
                suggestion_link.addEventListener('mouseover', () => {
                    suggestion_link.style.backgroundColor = 'rgb(170, 169, 169)'
                })
                suggestion_link.addEventListener('mouseout', () => {
                    suggestion_link.style.backgroundColor = null
                })
            })                         
        }
    })    
}

if (document.URL.includes('no_results_found.html')){
    const profiles = {
        name: ['errol spence jr.', 'jermell charlo', 'canelo alvarez', 'ryan garcia', 'oscar valdez', 'andy ruiz', 'eddie reynoso', 'derrick james', 'el jefe boxing club', 'r&r boxing club'],
        href: ['/html/portfolio/fight_club/athletes/spence/spence.html', '/html/portfolio/fight_club/athletes/charlo/charlo.html', '/html/portfolio/fight_club/athletes/canelo/canelo.html', '/html/portfolio/fight_club/athletes/garcia/garcia.html', '/html/portfolio/fight_club/athletes/valdez/valdez.html', '/html/portfolio/fight_club/athletes/ruiz/ruiz.html', '/html/portfolio/fight_club/coaches/reynoso/reynoso.html', '/html/portfolio/fight_club/coaches/james/james.html', '/html/portfolio/fight_club/gyms/el_jefe/el_jefe.html','/html/portfolio/fight_club/gyms/R&R/R&R.html']
    }
    const user_search = localStorage.getItem('user_search')
    console.log(user_search)
    const results_div = document.querySelector('.results')
    let result_found = false
    profiles.name.forEach(name => {
        if (name.startsWith(user_search) && user_search != ""){
            let name_index = profiles.name.indexOf(name)
            let link = profiles.href[name_index]
            result_found = true
            let result_link = document.createElement('div')
            result_link.setAttribute("class", "result_link_div")
            result_link.innerHTML = `<a href=${link}>${name.toUpperCase()}</a>`
            result_link.style.marginTop = "15px"
            result_link.style.display = "block"
            result_link.style.fontSize = "27.5px"
            result_link.style.color = "rgb(76, 181, 247)"
            results_div.appendChild(result_link)
        }
    })
    if (result_found == false) {
        let no_result = document.createElement('h2')
        if (user_search == "") {
            no_result.innerHTML = `We're Sorry, No Results for " " Were Found`
        }
        else{
            no_result.innerHTML = `We're Sorry, No Results for "${user_search}" Were Found`
        }
        no_result.style.marginTop = "15px"
        results_div.appendChild(no_result)
    }
}

// ------------------------------------------
// ******Enlarging Athlete/Gym/Coach Post When User Clicks On Thumbnail************************
// ---------------------------------------------------

if (document.URL.includes('user_profile.html') ||document.URL.includes('athletes') || document.URL.includes('coaches') || document.URL.includes('gyms')){
    const profile_posts = document.querySelectorAll('.posts img')
    const modal_wrapper = document.querySelector('.modal_wrapper')
    const enlarged_image = document.querySelector('#enlarged_image')
    const close_image_x = document.querySelector('#close_image_x')

    profile_posts.forEach(post => {
        post.addEventListener('click', () => {
            let post_src = post.src
            modal_wrapper.style.opacity = 1
            modal_wrapper.style.pointerEvents = 'all'
            enlarged_image.src = post_src
        })
    })

    close_image_x.addEventListener('click', () => {
        modal_wrapper.style.opacity = 0
        modal_wrapper.style.pointerEvents = 'none'
    })
}

// ------------------------------------------
// ******EDITING PROFILE PIC************************
// ---------------------------------------------------

if (document.URL.includes('user_profile.html')){
    const profile_pic = document.querySelector('.profile_pic')
    const header_profile_pics = document.querySelectorAll("#header_profile_pic")
    const edit_profile_pic_button = document.querySelector('#edit_profile_pic')
    const add_post_button = document.querySelector('#add_post')
    const change_confirmations = document.querySelectorAll('.change_confirmation')
    const change_status = document.querySelectorAll('.successful_change')
    const modal_wrapper = document.querySelector('.modal_wrapper')
    const enlarged_image = document.querySelector('#enlarged_image')
    const modal_image_preview = document.querySelector('.modal_image_preview')
    const modal_post_preview = document.querySelector('.modal_post_preview')
    const posts = document.querySelector('.athlete_posts')
    const no_posts = document.querySelector('#no_posts')
    let profile_posts = document.querySelectorAll('.posts img')
    const file_inputs = document.querySelectorAll('.image_preview_background input')
    const preview_images = document.querySelectorAll('.image_preview img')
    const preview_default_texts = document.querySelectorAll('.image_preview span')
    const close_image_x = document.querySelectorAll('#close_image_x')

    edit_profile_pic_button.addEventListener('click', () => {
        modal_image_preview.style.opacity = 1
        modal_image_preview.style.pointerEvents = "all"
    })

    add_post_button.addEventListener('click', () => {
        modal_post_preview.style.opacity = 1
        modal_post_preview.style.pointerEvents = "all"
    })

    for (let i=0;i<file_inputs.length;i++) {
        file_inputs[i].addEventListener('change', () => {
            if (file_inputs[i].files[0]){
                let reader = new FileReader()
    
                preview_images[i].style.display = 'block'
                preview_default_texts[i].style.display = 'none'
    
                reader.addEventListener("load", () => {
                    preview_images[i].setAttribute("src", reader.result)
                })
    
                reader.readAsDataURL(file_inputs[i].files[0])
            }
    
            else{
                preview_images[i].style.display = null
                preview_default_texts[i].style.display = null
            }
        })
    }

    for (let i=0;i<change_confirmations.length; i++){
        change_confirmations[i].addEventListener('click', () => { 
            if (file_inputs[i].files[0]){
                let reader = new FileReader()
                reader.addEventListener("load", () => {
                    if (modal_image_preview.style.opacity == 1){
                        profile_pic.setAttribute("src", reader.result)
                        header_profile_pics.forEach(header_profile_pic => {
                            header_profile_pic.setAttribute("src", reader.result)
                        })
                        localStorage.setItem("profile_pic", reader.result)
                        change_status[i].style.display = 'block'
                        change_status[i].style.color = 'green'
                        change_status[i].innerHTML = 'Picture Successfully Updated!'
                    }
                    else if (posts.innerHTML == "") {
                        posts.innerHTML = `<div class="picture">
                        <img src="./images/pic1.jpg" alt="" class="photo">
                        </div>`
                        posts.style.display = 'grid'
                        no_posts.style.display = 'none'
                        let post_img = document.querySelector('.picture img')
                        post_img.setAttribute('src', reader.result)
                        change_status[i].style.display = 'block'
                        change_status[i].style.color = 'green'
                        change_status[i].innerHTML = 'Picture Successfully Posted!'
                        let profile_posts = document.querySelectorAll('.posts img')
                        console.log(profile_posts)
                        profile_posts.forEach(post => {
                            console.log('image_clicked')
                            post.addEventListener('click', () => {
                                let post_src = post.src
                                modal_wrapper.style.opacity = 1
                                modal_wrapper.style.pointerEvents = 'all'
                                enlarged_image.src = post_src
                            })
                        })
                    }
                    else if (posts.innerHTML != ""){
                        let all_posts = document.querySelectorAll(".picture img")
                        let post_match = 0
                        all_posts.forEach(post => {
                            if (post.src == reader.result) {
                                post_match ++
                            }
                        })
                        if (post_match > 0){
                            change_status[i].style.display = 'block'
                            change_status[i].style.color = 'red'
                            change_status[i].innerHTML = 'Picture Has Already Been Uploaded'
                        }
                        else {
                            new_post = document.createElement("div")
                            new_post.innerHTML = `<img src=${reader.result} alt="" class="photo">`
                            new_post.setAttribute("class", "picture")
                            posts.appendChild(new_post)
                            change_status[i].style.display = 'block'
                            change_status[i].style.color = 'green'
                            change_status[i].innerHTML = 'Picture Successfully Posted!'
                            let profile_posts = document.querySelectorAll('.posts img')
                            console.log(profile_posts)
                            profile_posts.forEach(post => {
                                console.log('image_clicked')
                                post.addEventListener('click', () => {
                                    let post_src = post.src
                                    modal_wrapper.style.opacity = 1
                                    modal_wrapper.style.pointerEvents = 'all'
                                    enlarged_image.src = post_src
                                })
                            })
                        }
                        let profile_posts = document.querySelectorAll('.posts img')
                        for (let i=0;i<profile_posts.length;i++){
                            localStorage.setItem(`post_${i+1}`, document.querySelectorAll('.posts img')[i].src)
                        }
                        localStorage.setItem("number_of_posts", profile_posts.length)
                    }
                })
                reader.readAsDataURL(file_inputs[i].files[0])
            }
            else{
                change_status[i].style.display = 'block'
                change_status[i].style.color = 'red'
                change_status[i].innerHTML = 'Must Upload Image'
            }
        })
    }

    close_image_x.forEach(close_image_x => {
        close_image_x.addEventListener('click', () => {
            console.log('click')
            modal_image_preview.style.opacity = 0
            modal_image_preview.style.pointerEvents = 'none'
            modal_wrapper.style.opacity = 0
            modal_wrapper.style.pointerEvents = 'none'
            modal_post_preview.style.opacity = 0
            modal_post_preview.style.pointerEvents = 'none'
            preview_images.forEach(preview_image => {
                preview_image.style.display = ""
                preview_image.src = ""
            })
            change_status.forEach(change_status =>{
                change_status.style.display = "none"
            })
            preview_default_texts.forEach(preview_default_text => {
                preview_default_text.style.display = null
            })
            file_inputs.forEach(file_input =>{
                file_input.value = ""
            })
        })
    })
}




// ------------------------------------------
// ******EDITING USER INFO************************
// ---------------------------------------------------

if (document.URL.includes('edit_user_info.html')) {
    let cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    const edit_info_wrapper = document.querySelector('.additional_info_section')
    profile_type = cookies_object.profile_type
    if (profile_type == "athlete") {
        edit_info_wrapper.innerHTML = `<h2>First Name:</h2>
        <input id="first_name" type="text" placeholder=""><h2>Last Name:</h2>
        <input id="last_name" type="text" placeholder=""><h2>Age:</h2>
        <input id="age" type="text" placeholder="">
        <h2>Height:</h2><h4>(Feet)</h4><select id="feet"><option class="first_option" hidden disabled selected value></option><option value="5">5</option><option value="6">6</option></select><h4>(Inches)</h4><select id="inches"><option class="first_option" hidden disabled selected value></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><h2>Weight Class</h2><select id="weight_class"><option class="first_option" hidden disabled selected value></option><option value="105 lb">105 lb</option><option value="108 lb">108 lb</option><option value="112 lb">112 lb</option><option value="115 lb">115 lb</option><option value="118 lb">118 lb</option><option value="122 lb">122 lb</option><option value="126 lb">126 lb</option><option value="130 lb">130 lb</option><option value="135 lb">135 lb</option><option value="140 lb">140 lb</option><option value="147 lb">147 lb</option><option value="154 lb">154 lb</option><option value="160 lb">160 lb</option><option value="168 lb">168 lb</option><option value="175 lb">175 lb</option><option value="200 lb">200 lb</option><option value="215 lb">215 lb</option></select>
        <h2>Boxing Stance:</h2><select id="stance"><option class="first_option" hidden disabled selected value></option><option value="Orthodox">Orthodox</option><option value="Southpaw">Southpaw</option></select><h2>Gym:</h2><select id="gym"><option class="first_option" hidden disabled selected value></option><option value="El Jefe">El Jefe</option><option value="R&R">R&R</option><option value="no gym">No Gym</select>
        <div id="coach_select_div" style="display:none;">
        <h2>Coach:</h2>
        <select id="coach_select"><option class="first_option" hidden disabled selected value></option><option value="Eddie Reynoso">Eddie Reynoso</option><option value="Derrick James">Derrick James</option><option value="no coach">No Coach</option></select></div>
        <div id="open_to_coaching_div" style="display:none;"><h2>Want Coaching?</h2><select id="open_to_coaching"><option class="first_option" hidden disabled selected value></option><option value="yes">Yes</option><option value="no">No</option></select></div>`
        const gym_select = document.querySelector('#gym')
        let coach_select_div = document.querySelector('#coach_select_div')
        let coach_select = document.querySelector('#coach_select')
        const open_to_coaching_div = document.querySelector('#open_to_coaching_div')
        const edit_info_selects = document.querySelectorAll('.additional_info_section select')
        const edit_info_inputs = document.querySelectorAll('.additional_info_section input')
        edit_info_inputs.forEach(input => {
            input_id = input.id
            if (cookies_object[input_id] == "undefined"){
                input.value = ""
            }
            else{
                input.value = cookies_object[input_id]
            }
        })
        edit_info_selects.forEach(select => {
            select_id = select.id
            select.value = cookies_object[select_id]
        })
        gym_select.addEventListener('change', () => {
            if (gym_select.value == 'R&R') {
                coach_select_div.style.display = 'block'
                coach_select.innerHTML = `<option value="Derrick James">Derrick James</option><option value="no coach">No Coach</option>`
            } else if (gym_select.value == 'El Jefe') {
                coach_select_div.style.display = 'block'
                coach_select.innerHTML = `<option value="Eddie Reynoso">Eddie Reynoso</option><option value="no coach">No Coach</option>`
            } else if (gym_select.value == "no gym") {
                console.log('hello')
                coach_select_div.style.display = "none"
                open_to_coaching_div.style.display = "none"
            }
            coach_select_div = document.querySelector('#coach_select_div')
            coach_select = document.querySelector('#coach_select')
        })

        coach_select.addEventListener('change', () => {
            if (coach_select.value == 'no coach') {
                open_to_coaching_div.style.display = 'block'
            } 
            if (coach_select.value != 'no coach'){
                console.log('hello')
                open_to_coaching_div.style.display = "none"
            }
        })
    }
    else if (profile_type == "coach"){
        edit_info_wrapper.innerHTML = `<h2>First Name:</h2>
        <input id="first_name" type="text" placeholder=""><h2>Last Name:</h2>
        <input id="last_name" type="text" placeholder=""><h2>Age:</h2><input id="age" type="text" placeholder=""><h2>Seeking New Athletes?</h2>
        <select id="seeking_new_athletes"><option class="first_option" hidden disabled selected value></option><option value="yes">Yes</option><option value="no">No</option></select><h2>Gym:</h2><select id="gym"><option class="first_option" hidden disabled selected value></option><option value="El Jefe">El Jefe</option><option value="R&R">R&R</option><option value="no gym">No Gym</option></select><div style="display:none;" class="travel_training"><h4>NOTE: Given Current Selections, It Is Assumed Coach is Willing to Travel to Athlete's Gym/Park/Garage.<br><br> Please Select Which Location You Are Willing to Travel Within to Meet Athlete</h4><br><h2>Location</h2><select id="travel_location"><option class="first_option" hidden disabled selected value></option><option value="San Diego, CA">San Diego, CA</option><option value="Dallas, TX">Dallas, TX</option></select></div>`
        const gym_select = document.querySelector('#gym')
        const seeking_new_athletes = document.querySelector('#seeking_new_athletes')
        const travel_training = document.querySelector('.travel_training')
        const travel_location = document.querySelector('#travel_location')
        const coach_info_selectors = [seeking_new_athletes, gym_select]
        const edit_info_selects = document.querySelectorAll('.additional_info_section select')
        const edit_info_inputs = document.querySelectorAll('.additional_info_section input')
        edit_info_inputs.forEach(input => {
            input_id = input.id
            input.value = cookies_object[input_id]
        })
        edit_info_selects.forEach(select => {
            select_id = select.id
            select.value = cookies_object[select_id]
        })
        if (gym_select.value == "no gym") {
            console.log('no gym')
            travel_training.style.display = 'block'
        }
        coach_info_selectors.forEach((select)=>{
            select.addEventListener('change', () => {
                if (gym_select.value == "no gym" && seeking_new_athletes.value == "yes") {
                    travel_training.style.display = "block"
                }else{
                    travel_training.style.display = "none"
                }
                if (gym_select.value == 'El Jefe') {
                    document.cookie = `location=San Diego, CA`
                } else if (gym_select.value == 'R&R') {
                    document.cookie = `location=Dallas, TX`
                }
            })   
        })
        travel_location.addEventListener('change', () => {
            if (travel_location.value == 'Dallas, TX') {
                document.cookie = `location=Dallas, TX`
            } else {
                document.cookie = `location=San Diego, CA`
            }
        })
    }
    else if (profile_type == "gym"){
        edit_info_wrapper.innerHTML = `
        <h2>Gym Name:</h2><input id="gym_name" type="text" placeholder=""><h2 style="margin-bottom:20px;"><h2>Address:</h2><input id="street" type="text" placeholder="Street"><select id="state">
            <option value="" selected="selected">Select a State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
            </select>
            <h4 id="state_select_error">Must Select State</h4>
            <input id="city" type="text" placeholder="City"><h2>Phone #:</h2>
            <h2 style="font-size:17.5px;"><i>(No Dashes Required)</i></h2><input id="phone"><h2 style="text-align:left;">Gym Hours: <br> <h2 style="font-size:17.5px;text-align:left;margin-bottom:35px;"><i>(Leave Blank if Closed)</h2></i></h2>
            
            <h2 class="day_of_week">Monday</h2><div class="day_of_week_div"><input id="monday_start" type="time" placeholder="Open"><input id="monday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Tuesday</h2><div class="day_of_week_div"><input id="tuesday_start" type="time" placeholder="Open"><input id="tuesday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Wednesday</h2><div class="day_of_week_div"><input id="wednesday_start" type="time" placeholder="Open"><input id="wednesday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Thursday</h2><div class="day_of_week_div"><input id="thursday_start" type="time" placeholder="Open"><input id="thursday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Friday</h2><div class="day_of_week_div"><input id="friday_start" type="time" placeholder="Open"><input id="friday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>

            <h2 class="day_of_week">Saturday</h2><div class="day_of_week_div"><input id="saturday_start" type="time" placeholder="Open"><input id="saturday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>
            
            <h2 class="day_of_week">Sunday</h2><div class="day_of_week_div"><input id="sunday_start" type="time" placeholder="Open"><input id="sunday_end" type="time" placeholder="Close">
            <h4 id="gym_time_error">Close Must Be Later Than Open<h4></div>
            `
        const edit_info_inputs = document.querySelectorAll('.additional_info_section input') 
        const edit_info_select = document.querySelector('.additional_info_section select')
        edit_info_inputs.forEach(input => {
            if (input.type != 'time') {
                input_id = input.id
                input.value = cookies_object[input_id]
            } else {
                input_id = input.id
                let time = cookies_object[input_id]
                let time_length = time.length
                if ((time_length == 8 ||time_length == 9 || time_length == 10 || time_length == 7) && time.includes('PM')){
                    time = time.slice(0,5)
                    time = time.replace(':', '')
                    if (time[3] == " "){
                        hour = Number(time.slice(0,1)) + 12
                        minutes = time.slice(1,3)
                    } else if (time[0] == 1 && time[1] == 2) {
                        hour = 12
                        minutes = time.slice(2)
                    }
                    else {
                        hour = Number(time.slice(0,2)) + 12
                        minutes = time.slice(1,3)
                    }
                    time = `${hour}:${minutes}`
                    input.value = time
                } 
                else if((time_length == 8 ||time_length == 9 || time_length == 10 || time_length == 7) && time.includes('AM')){
                    time = time.slice(0,5)
                    time = time.replace(':', '')
                    if (time[3] == " ") {
                        hour = time.slice(0,1)
                        minutes = time.slice(1,3)
                        if (time[0] == 0){
                            time = `00:${minutes}`
                        }
                        else{
                            time = `0${hour}:${minutes}`
                        }
                    } 
                    else if (time[0] == 1 && time[1] == 2) {
                        hour = 12
                        minutes = time.slice(2)
                    }
                    else {
                        hour = time.slice(0,2)
                        minutes = time.slice(2,4)
                        time = `${hour}:${minutes}`
                    }
                    input.value = time
                } 
                else if (time_length == 0 || time_length == 6) {
                    time = ""
                    input.value = time
                }
            }
        }) 
        edit_info_select_id = edit_info_select.id
        edit_info_select.value = cookies_object[edit_info_select_id]
        const go_to_profile = document.querySelector('.go_to_profile')
        go_to_profile.addEventListener('click', () => {
            let additional_info_inputs = document.querySelectorAll('.additional_info_section input')
            let additional_info_selects = document.querySelectorAll('.additional_info_section select')
            const state_select_error = document.querySelector('#state_select_error')
            if (profile_type == 'gym'){
                if (additional_info_selects[0].value == ''){
                    state_select_error.style.color = 'red'
                    document.querySelector('#error_gym_info').style.color = 'red'
                } else {
                    document.querySelector('#error_gym_info').style.color = 'white'
                }
                additional_info_inputs = Array.from(additional_info_inputs).slice(0, 3)
                additional_info_inputs.forEach(input => {
                    if (input.value == '') {
                        document.querySelector('#error_gym_info').style.color = 'red'
                        input.placeholder = 'Enter Value'
                        input.style.setProperty("--c", 'red')
                    } else {
                        document.querySelector('#error_gym_info').style.color = 'white'
                        input.placeholder = ''
                    }
                })
                additional_info_inputs = document.querySelectorAll('.additional_info_section input')
                let additional_info_inputs_time = Array.from(additional_info_inputs).slice(4)
                additional_info_inputs_time.forEach(time => {
                    if (time.value != '') {
                        console.log('yoo')
                        let time_value = ''
                        let hour = Number(time.value.split(':')[0])
                        let minutes = time.value.split
                        (':')[1]
                        let time_of_day = 'AM'
                        if (hour < 12) {
                        } else {
                            time_of_day = 'PM'
                            if (hour != 12){
                                hour = hour - 12
                            }
                        }
                        if (hour == "00"){
                            time_value = `12:${minutes} ${time_of_day}`
                        } else {
                            time_value = `${hour}:${minutes} ${time_of_day}`
                        }
                        console.log(time_value, time.id)
                        document.cookie = `${time.id}=${time_value}`
                    } else {
                        document.cookie = `${time.id}=CLOSED`
                    }
                })
                cookies_object = document.cookie.split('; ').reduce((prev, current) => {
                    const [name, value] = current.split('=');
                    prev[name] = value;
                    return prev
                }, {});
                console.log(cookies_object.monday_start)
                console.log(cookies_object.monday_end)
                const day_of_week_divs = document.querySelectorAll('.day_of_week_div')
                day_of_week_divs.forEach(day => {
                    let open = day.childNodes[0].value
                    let close = day.childNodes[1].value
                    if (open != "") {
                        open = Number(open.replace(':', ''))
                    }
                    if (close != "") {
                        close = Number(close.replace(':', ''))
                    }
                    if((open >= close) && open != '' && close != ''){
                        day.childNodes[3].style.color = 'red'
                        document.querySelector('#error_gym_info').style.color = 'red'
                    } 
                    else if ((open == "" && close != "") || (open != "" && close == "")){
                        day.childNodes[3].style.color = 'red'
                        document.querySelector('#error_gym_info').style.color = 'red' 
                    }
                    else if ((open == "" && close == "") || close > open) {
                        day.childNodes[3].style.color = 'rgb(209, 206, 206)'
                        let open_id = day.childNodes[0].id
                        let open_value = cookies_object[open_id]
                        document.cookie = `${day.childNodes[0].id}=${open_value} - `
                        
                    }
                    if (open == "" && close == "") {
                        document.cookie = `${day.childNodes[0].id}=CLOSED`
                        document.cookie = `${day.childNodes[1].id}=`
                    }
                })
            }
        })  
    }
    const additional_info_inputs = document.querySelectorAll('.additional_info_section input')
    const additional_info_selects = document.querySelectorAll('.additional_info_section select')
    const go_to_profile = document.querySelector('.go_to_profile')
    go_to_profile.addEventListener('click', () => {
        console.log('yoo')
        console.log(additional_info_inputs)
        console.log(additional_info_selects)
        additional_info_inputs.forEach(input => {
            console.log(input.id, input.value)
            if (input.value != '' && input.type != "time" && input.value != "undefined") {
                document.cookie = `${input.id}=${input.value}`
            } else if (input.value == "undefined" || (input.value == "" && input.id.includes('end'))) {
                document.cookie = `${input.id}=`
            }
        })
        additional_info_selects.forEach(select => {
            if (select.value != '') {
                document.cookie = `${select.id}=${select.value}`
            } 
        })
        if (document.querySelector('#error_gym_info').style.color != 'red') {
            window.location.href = '/html/portfolio/fight_club/user_profile.html'
        }
    })
}


// -----------------------------------------------------
// ******Adding More Info/Editing Info Box Shadow on Tabbing******
//  -----------------------------------------------------

if (document.URL.includes('more_info.html') || document.URL.includes('edit_user_info.html')){
    const profile_fields = document.querySelectorAll('.additional_info_section input')
    const profile_selects = document.querySelectorAll('.additional_info_section select')
    profile_fields.forEach(field => {
        field.addEventListener('focus', () => {
            field.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.377)'
            field.placeholder = ''
            error_present = false
        })
        field.addEventListener('blur', () => {
            field.style.boxShadow = ''
        })
    })
    
    
    profile_selects.forEach(select => {
        select.addEventListener('focus', () => {
            select.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.377)'
        })
        select.addEventListener('blur', () => {
            select.style.boxShadow = ''
        }) 
        select.addEventListener('change', () => {
            if (select.innerHTML != '' && select.id == 'profile_type_select') {
                select_error_1.style.color = 'rgb(209, 206, 206)'
                error_present = false
            } else {
                select_error_2.style.color = 'rgb(209, 206, 206)'
                error_present = false
            }
        })
        
    })
}






// ------------------------------------------
// ******Updating Athlete & Coaches Profiles to Reflect New User Profile Data************************
// ---------------------------------------------------

if (document.URL.includes('fight_club/')){
    const cookies_object = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev
    }, {});
    user_profile_type = cookies_object.profile_type
    user_name = `${cookies_object.first_name} ${cookies_object.last_name}`
    user_coach = cookies_object.coach_select
    user_gym = cookies_object.gym
    user_profile_pic_src = localStorage.getItem("profile_pic")
    if (document.URL.includes('athletes')){
        athlete_coach = document.querySelector('#coach_name').innerHTML
        if (user_coach == athlete_coach) {
            user_profile_pic_src.split('/images')[1]
            user_teammate_info = document.createElement('div')
            user_teammate_info.setAttribute("class", "team_member")
            user_teammate_info.innerHTML = `<a href="/html/portfolio/fight_club/user_profile.html">  <img src="${user_profile_pic_src}" alt=""></a>
            <a href="/html/portfolio/fight_club/user_profile.html">${user_name}</a>`
            teammates = document.querySelector('.teammates_grid')
            teammates.appendChild(user_teammate_info)
        }
    } else if (document.URL.includes('coaches')){
        coach = document.querySelector('.coach_name').innerHTML.substring(15)
        if (user_coach == coach) {
            user_profile_pic_src.split('/images')[1]
            user_teammate_info = document.createElement('div')
            user_teammate_info.setAttribute("class", "team_member")
            user_teammate_info.innerHTML = `<a href="/html/portfolio/fight_club/user_profile.html">  <img src="${user_profile_pic_src}" alt=""></a>
            <a href="/html/portfolio/fight_club/user_profile.html">${user_name}</a>`
            teammates = document.querySelector('.teammates_grid')
            teammates.appendChild(user_teammate_info)
        }
    } else if (document.URL.includes('gyms')) {
        gym = document.querySelector('.gym_name').innerHTML.split(': ')[1].split(' Boxing Gym')[0]
        if (gym.includes('amp;')){
            gym = gym.replace('amp;', '')
        }
        if (user_gym == gym && user_profile_type == 'athlete') {
            user_profile_pic_src.split('/images')[1]
            user_teammate_info = document.createElement('div')
            user_teammate_info.setAttribute("class", "team_member")
            user_teammate_info.innerHTML = `<a href="/html/portfolio/fight_club/user_profile.html">  <img src="${user_profile_pic_src}" alt=""></a>
            <a href="/html/portfolio/fight_club/user_profile.html">${user_name}</a>`
            teammates = document.querySelector('.teammates_grid')
            teammates.appendChild(user_teammate_info)
        } else if (user_gym == gym && user_profile_type == 'coach'){
            user_profile_pic_src.split('/images')[1]
            user_coaches_info = document.createElement('div')
            user_coaches_info.setAttribute("class", "team_member")
            user_coaches_info.innerHTML = `<a href="/html/portfolio/fight_club/user_profile.html">  <img src="${user_profile_pic_src}" alt=""></a>
            <a href="/html/portfolio/fight_club/user_profile.html">${user_name}</a>`
            coaches = document.querySelector('.coaches_grid')
            coaches.appendChild(user_coaches_info)
        }
    }
}