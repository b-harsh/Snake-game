let inputdir= {x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let score=0;
let speed=10;
let lastPaintTime = 0;



let snakeArr = [
    {x:13,y : 15}
];

food ={x:6 , y:7};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function iscollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if(snake[0].x >= 18  || snake[0].x <= 0 || snake[0].y >=18 ||snake[0].y <=0 ){
        return true;
    }
    return false;
}


function gameEngine(){
    //updating the snake and food 

    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        // now we have to reset the game
        inputdir= {x:0,y:0};
        alert("GAME OVER !  Press any key to REstart # ");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //if you have eaten the food
    
    if(snakeArr[0].y === food.y  && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score > hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore: " +hiscoreval;
        }
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x , y:snakeArr[0].y + inputdir.y});
        let a=2;
        let b=16;
        food = {x:Math.round(a + (b-a) * Math.random()),y:Math.round(a + (b-a) * Math.random())}
    }

   for(let i=snakeArr.length - 2; i >=0;i--){
     snakeArr[i+1]={...snakeArr[i]};
   }

   snakeArr[0].x += inputdir.x;
   snakeArr[0].y += inputdir.y;



    //display the snake and food
    board.innerHTML="";
    snakeArr.forEach((e, index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}

musicSound.play();
let hiscore=localStorage.getItem("hiscore");

if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: " + hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown' , e=>{
    
})






//all functionalities of the game // logics
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputdir = {x :0 , y:1}
    moveSound.play();
    switch( e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;

        default :
         break; 
    }
});
