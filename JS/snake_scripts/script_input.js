export function input_direction(key_code){
    if (key_code == 38){
        return "up"
    }
    else if (key_code == 40){
        return "down"
    }
    else if (key_code == 37){
        return "left"
    }
    else if (key_code == 39){
        return "right"
    }
}