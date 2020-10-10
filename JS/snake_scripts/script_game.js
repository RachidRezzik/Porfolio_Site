import {update as updateSnake, draw as drawSnake, snake_speed, game_over} from '/script_snake.js'
import {input_direction} from "./script_input.js"

export let last_render_time = 0
export let time_before_starting = 0
let game_board = document.querySelector('#game_board')
let ready_modal = document.querySelector('.ready_modal')
ready_modal.style.display = 'flex'
let animation_frame_count = 0

function main(current_time){
    if (animation_frame_count == 0){
        time_before_starting = current_time
        animation_frame_count ++
    }
    if (game_over != true){
        window.requestAnimationFrame(main)
    }
    const seconds_since_last_render = (current_time - last_render_time) / 1000
    if (seconds_since_last_render < 1 / snake_speed) return
    
    last_render_time = current_time
    
    update()
    
    draw()  
}

document.querySelector('body').addEventListener('keydown', () => {
    if (ready_modal.style.display == "flex" && event.keyCode == 13) {
        ready_modal.style.display = 'none'
        ready_modal.pointerEvents = 'none'
        game_board.style.display = 'grid'
        window.requestAnimationFrame(main)
    } else if (game_board.innerHTML.includes('GAME OVER') && event.keyCode == 13){
        location.reload()
    }
})




function update() {
    updateSnake(previous_direction, new_direction)
}

function draw() {
    game_board.innerHTML = ""
    drawSnake()
}


let new_direction = ""
let previous_direction = "down"

document.addEventListener('keydown', () => {
    if ((event.keyCode == 38 && new_direction != "up") || (event.keyCode == 40 && new_direction != "down") || (event.keyCode == 39 && new_direction != "right") || (event.keyCode == 37 && new_direction != "left")){
        if (new_direction != ""){
            previous_direction = new_direction.slice(0)
        }
        new_direction = input_direction(event.keyCode)
    }   
})
