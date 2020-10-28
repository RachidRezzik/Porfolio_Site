
import {last_render_time, time_before_starting} from './script_game.js'

export const snake_speed = 10
let snake_body = [
    {x:9, y:9},
    {x:9, y:10},
    {x:9, y:11}
]
let first_possible_x_choices = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17]
let first_possible_y_choices = [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17]
let food_body = {
    x:first_possible_x_choices[Math.floor(Math.random() * first_possible_x_choices.length)],
    y:first_possible_y_choices[Math.floor(Math.random() * first_possible_y_choices.length)]
}
let food_count = 0

export let game_over = false

function find_food_coordinates(positions) {
    food_count ++
    let random_position_x  = Math.floor(Math.random() * (17 - 1 + 1)) + 1         
    let random_position_y = Math.floor(Math.random() * (17 - 1 + 1)) + 1
    let position_overlap = 0
    positions.forEach(position => {
        let position_x = position[0]
        let position_y = position[1]
        if(position_x == random_position_x && position_y == random_position_y){
            position_overlap ++
        }
    })
    if (position_overlap == 0) {
        food_body.x = random_position_x
        food_body.y = random_position_y
    } else{
        find_food_coordinates(positions)
    }
}

function game_over_screen() {
    game_over = true
    const game_board = document.querySelector('#game_board')
    game_board.innerHTML = ""
    game_board.style.cssText = `background-image:url(/images/spurs_celebrating.jpg);width:100vmin;height:100vmin;background:'black';display:flex;justify-content:center;align-items:center;color:'red'`
    const game_over_text = document.createElement('h1')
    let time = Math.round(((last_render_time/1000) - (time_before_starting/1000)))
    if (time > 60){
        let minutes = Math.floor(time/60)
        let seconds = time - (60 * minutes)
        time = `${minutes}m ${seconds}s`
    } else{
        time = `${time} seconds`
    }
    game_over_text.innerHTML = `GAME OVER. Spurs Defeat the Gunners in ${time}..<div class="score_div"><img src="/images/spurs.png"><h2>${food_count}</h2></div><a id="play_again" href="/index.html">Play Again</a><a class="portfolio" href="/html/work.html">Back to Porfolio Home</a>`
    game_over_text.style.color = 'red'
    game_board.appendChild(game_over_text)    
}



export function update(previous_direction, new_direction) {
    if (snake_body[snake_body.length - 1].x != 18 && snake_body[snake_body.length - 1].x != 0 && snake_body[snake_body.length - 1].y != 18 && snake_body[snake_body.length - 1].y != 0 && (previous_direction != new_direction)) {
        // *******DOWN*******
        if ((new_direction == "down" && previous_direction != "up") || (new_direction == "up" && previous_direction == "down") || (new_direction == "up" && previous_direction == "up")){
            snake_body.push({x:snake_body[snake_body.length - 1].x, y:snake_body[snake_body.length - 1].y + 1})
        } 
        // *******UP*******
        else if ((new_direction == "up" && previous_direction != "down")  || (new_direction == "down" && previous_direction == "up") || new_direction == "") {
            snake_body.push({x:snake_body[snake_body.length - 1].x, y:snake_body[snake_body.length - 1].y - 1})
        } 
        // *******LEFT*******
        else if (new_direction == "left" && previous_direction != "right" || new_direction == "right" && previous_direction == "left") {
            snake_body.push({x:snake_body[snake_body.length - 1].x - 1, y:snake_body[snake_body.length - 1].y})
        } 
        // *******RIGHT*******
        else if (new_direction == "right" && previous_direction != "left" || new_direction == "left" && previous_direction == "right"){
            snake_body.push({x:snake_body[snake_body.length - 1].x + 1, y:snake_body[snake_body.length - 1].y})
        }
        let no_head = snake_body.slice(0, -1)
        let snake_head_x = snake_body[snake_body.length - 1].x 
        let snake_head_y = snake_body[snake_body.length - 1].y
        no_head.forEach(segment => {
            let segment_position_x = segment.x
            let segment_position_y = segment.y
            if (snake_head_x == segment_position_x && snake_head_y == segment_position_y && snake_head_x != 9 && snake_head_y != 10){
                game_over = true
            }
        })
        if (snake_head_x == food_body.x && snake_head_y == food_body.y){
            let positions_taken = []
            snake_body.forEach(segment => {
                positions_taken.push([segment.x, segment.y])
            })
            find_food_coordinates(positions_taken)
        } else{
            snake_body.shift()
        }
    } 
}





export function draw(game_board) {
    if (snake_body[snake_body.length - 1].x == 18 || snake_body[snake_body.length - 1].x == 0 || snake_body[snake_body.length - 1].y == 18 || snake_body[snake_body.length - 1].y == 0 || game_over == true) {
        game_over_screen()
    } else {
        snake_body.forEach(segment => {
            const snake_element = document.createElement('div')
            const game_board = document.querySelector('#game_board')
            snake_element.innerHTML = `<img class="club_logo" src="/images/arsenal.png">`
            snake_element.style.gridRowStart = segment.y
            snake_element.style.gridColumnStart = segment.x
            snake_element.classList.add('snake')
            game_board.appendChild(snake_element)
        })
            const game_board = document.querySelector('#game_board')
            const food_element = document.createElement('div')
            food_element.innerHTML = `<img class="club_logo" id="spurs_food" src="/images/spurs.png">`
            food_element.style.gridRowStart = food_body.y
            food_element.style.gridColumnStart = food_body.x
            food_element.classList.add('food')
            game_board.appendChild(food_element)    
    }
}
