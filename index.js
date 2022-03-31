let food = { x: 5, y: 6 }     //staring food position
let key_input = { x: 0, y: 0 }     //key input direction
let snake_arr = [{ x: 10, y: 12 }]          //sanke body with staring head postion
let speed = 15;                //speed of snake 
let prevTimeStamp = 0;      //time in millisecond
let score = 0;


//different sounds for dutning playing
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');




//main method for creating callbacks / gnearating frames
function main(timeStamp) {
    window.requestAnimationFrame(main)
    if ((timeStamp - prevTimeStamp) / 1000 < 1 / speed)
        return;         //executes next line of code when above conditon is false
    console.log(timeStamp)
    prevTimeStamp = timeStamp;
    game();

}


function game() {

    if (collide(snake_arr)) {
        musicSound.pause();
        gameOverSound.play();
        key_input = { x: 0, y: 0 }

        alert("game over.To start a new game press OK")

        snake_arr = [{ x: 10, y: 12 }];     //snake body intialised again
        musicSound.play();
        score = 0;
    }

    //incrementing snake length when eaten food
    if (snake_arr[0].x === food.x && snake_arr[0].y === food.y) {
        foodSound.play();
        snake_arr.unshift({
            x: snake_arr[0].x + key_input.x
            , y: snake_arr[0].y + key_input.y
        }); //adds element at snake top

        //min and max food location values food location
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }       //gives random food location

    }


    //moving the snake 
    //whole body traverse in direction of head and takes place of head's walked positions
    for (let i = snake_arr.length - 1; i >= 1; i--) {
        snake_arr[i].x = snake_arr[i - 1].x;
        snake_arr[i].y = snake_arr[i - 1].y;

    }
    //position of snake head
    snake_arr[0].x += key_input.x;
    snake_arr[0].y += key_input.y;

    //displaying snake body and food
    board.innerHTML = ""; //to init snake
    //creating snake ele box for each new created element
    snake_arr.forEach((ele, ind) => {
        snake_ele = document.createElement("div"); //creating html element
        snake_ele.style.gridRowStart = ele.y;     //grid location
        snake_ele.style.gridColumnStart = ele.x;

        if (ind === 0)
            snake_ele.classList.add("head")     //adding class head to snake 0th element
        else
            snake_ele.classList.add("snake")    //adding class snake to all snake element except 0th element
        board.appendChild(snake_ele)            //adds it inside board div 
    })

    //displaying food
    food_ele = document.createElement("div"); //creating html element
    food_ele.style.gridRowStart = food.y;     //styling that element with the help of snakebody object
    food_ele.style.gridColumnStart = food.x;    //he CSS grid-row-start property defines the start of the item inside of the grid row, adding a span, a line or nothing to its grid location and specifies the inline-start side of the grid are of the item
    food_ele.classList.add("food")
    board.appendChild(food_ele)




}



//function to check collision
function collide(snake_arr) {

    //if collide with itself
    for (let i = 1; i < snake_arr.length; i++) {
        if (snake_arr[0].x == snake_arr[i].x && snake_arr[0].y == snake_arr[i].y)
            return true;
    }

    //if collide with walls
    if (snake_arr[0].x >= 18 || snake_arr[0].x <= 0 || snake_arr[0].y <= 0 || snake_arr[0].y >= 20)     //x limit =no. of columns,y limit =no. of rows
        return true;


    return false;
}






window.requestAnimationFrame(main); //calls the main function before the next repaint usally refer rate matches display refresh rate


//setting turn direction for snake
window.addEventListener("keydown", function (ele) {
    key_input = { x: 0, y: 0 }
    moveSound.play();
    switch (ele.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            key_input.x = 0;
            key_input.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            key_input.x = 0;
            key_input.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            key_input.x = -1;
            key_input.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            key_input.x = 1;
            key_input.y = 0;
            break;
        default:
            key_input.x = 0;        //default direct when wrong key is pressed
            key_input.y = -1;
            break;
    }


})


















