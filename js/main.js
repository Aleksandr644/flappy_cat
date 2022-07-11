let cvs = document.getElementById("game");
let ctx = cvs.getContext("2d");

let cat = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let fly = new Audio();
let score_sound = new Audio();

cat.src = "img/blackCatWithWings.png";
bg.src = "img/bg.webp";
fg.src = "img/ground.webp";
pipeBottom.src = "img/pipeDown.png";
pipeUp.src = "img/pipeTop.png";

fly.src = "sound/fly.mp3";
score_sound.src = "sound/score.mp3";

let gap = 150;

document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);

function moveUp(){
    yPos -= 20;
}
let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : -300
}

let score = 0;
let xPos = 10;
let yPos = cvs.height/2;
let grav = 1;

function draw(){
    ctx.drawImage(bg, 0, 0);
    fly.play();
    

    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        
        pipe[i].x -= 1;

        if(pipe[i].x == 600){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * (pipeUp.height- fg.height) - pipeUp.height)
            })
        }
        
        if(xPos + cat.width >= pipe[i].x && (yPos <= pipe[i].y + pipeUp.height || yPos + cat.height >= pipe[i].y + pipeUp.height + gap) || yPos + cat.height - 25 >= cvs.height - fg.height){
            location.reload();
        }

	if(xPos == pipe[i].x + pipeUp.width){
	    score++;
	    score_sound.play();
	}        

        if(pipe[i].x + pipeUp.width == 0){
            pipe.shift();
        }
    }
    
    ctx.drawImage(cat, xPos, yPos);
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    yPos += grav;

    ctx.fillStyle = "#FFF";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);
}
bg.onload = draw;
