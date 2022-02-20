// extreme
var initialCountDown = 3;
var Time=30;
var maxSecondsSpeedSwitch=2;
var maxSpeed=1;
var timeSpeed=1000;
var timeBallCreation=500;
var playground = null;
var playground_WIDTH;
var playground_HEIGHT;
var punteggio=0;
var ballRadius=60;
var missShots=0;
var minRadius=10;
var maxRadius=60;
var colpiASegno=0;
var totShots=0;
var missTargets=0;
var gameStarted=0;

var ballClicked=0;
var startTimer;
var startTimer0;
var ballTimer;

//var visualTimer;
//var dimensionTimer;
var balls = new Array();
var timers = [];

/**
 * Funzione per ritornare il parametro di style quando questo è stato impostato da un foglio di stile css
 * Link: https://www.webdeveloper.com/d/211075-stylewidth-returning-nan/2
 */
function ReturnObjectStyle(obj, par) {
    if (obj.currentStyle) return obj.currentStyle[par.replace(/-/g, '')];
    return document.defaultView.getComputedStyle(obj, null).getPropertyValue(par.toLowerCase());
}

function beginScript4(){
    playground=document.getElementById("gameWrapper");
    report=document.getElementById("report");
    playground_WIDTH = parseInt(ReturnObjectStyle(playground, 'width'));
    playground_HEIGHT = parseInt(ReturnObjectStyle(playground,'height'));
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById("termina").addEventListener("click", endGame); 

    // penalità se non si clicka la ball
    playground.addEventListener("click", clickMiss);
    beginGioco4();
}

function clickMiss(){
    if(gameStarted==0){
        return;
    }
    if(ballClicked==0){
        document.getElementById("failSound").volume=0.5;
        document.getElementById("failSound").play();
        punteggio-=1;
        missShots++;
        document.getElementById("points").innerText=punteggio;
        }
    ballClicked=0;
    totShots++;
}

function beginGioco4(){
    // inizializzazione variabili
    report.style.visibility="hidden";
    punteggio=0;
    colpiASegno=0;
    totShots=0;
    missTargets=0;
    ballClicked=0;
    missShots=0;
    balls=new Array();

    document.getElementById("points").innerText=0;
    document.getElementById("timer").innerText=Time;

    // countdown 3,2,1
    var timeLeft0 = initialCountDown;
    document.getElementById("countDownWrapper").innerText = timeLeft0;
    startTimer0 = setInterval(function () {
        timeLeft0 -= 1;
        document.getElementById("countDownWrapper").innerText = timeLeft0;
        if (timeLeft0 <= 0) {
            clearInterval(startTimer0);

            // rimuovo il countdown
            var countDownWrapper=document.getElementById("countDownWrapper");
            countDownWrapper.style.display="none";

            gameStarted=1;

            // timer per la visualizzazione del tempo a disposizione
            var timeLeft=Time;
            startTimer=setInterval(function(){
                timeLeft-=1;
                document.getElementById("timer").innerText=timeLeft;
                document.getElementById("timer").style.color="black";
                if(timeLeft <=0){
                    document.getElementById("timer").innerText=timeLeft;
                    endGame();
                }
                if(timeLeft<=10 && timeLeft%2==0){
                    document.getElementById("timer").style.color="red";
                }
                if(timeLeft<=10 && timeLeft%2==1){
                    document.getElementById("timer").style.color="black";
                }
            },1000);

            var index=0;
            ballTimer=setInterval(function(){
                createBall(index);
                index++;
            },timeBallCreation);
            timers.push(ballTimer);

            drawBalls();
        }
    },1000);
}  

function createBall(index){
    var tempBall={
        x:0,
        y:0,
        speedX:0,
        speedY:0,
        shot:0,
        div:0,
        bigger:1, // flag per la fase di ingrandimento e di rimpicciolimento
        speedXChanged:0,
        speedYChanged:0 // flag per vedere se hanno già cambiato direzione
         // data la durata di vita di una pallina, non è possibile che debba cambiare direzione più di una volta.
         // mi servono questi flag perchè altrimenti in alcuni casi le palline potrebbero incastrarsi nei bordi del div
    }

    tempBall.x=Math.round((Math.random() * (playground_WIDTH-ballRadius*4))+ballRadius);
    tempBall.y=Math.round((Math.random() * (playground_HEIGHT-ballRadius*4))+ballRadius);
    tempBall.speedX=2*(Math.random()-0.5)*maxSpeed;
    tempBall.speedY=2*(Math.random()-0.5)*maxSpeed;
    tempBall.div=document.createElement("div");
    tempBall.div.id="ball"+index;
    tempBall.div.setAttribute('class', 'ball');
    playground.appendChild(tempBall.div);
    tempBall.div.addEventListener("click", function(){
        document.getElementById("clickSound").volume=0.5;
        document.getElementById("clickSound").play();
        playground.removeChild(tempBall.div);
        tempBall.shot=1;
        ballClicked=1;
        colpiASegno++;
        punteggio++;
        document.getElementById("points").innerText=punteggio;
    })
    tempBall.div.style.left = (tempBall.x) + 'px';
    tempBall.div.style.top = (tempBall.y) + 'px';
    
    tempBall.div.style.height=minRadius + 'px';
    tempBall.div.style.width=minRadius + 'px';
    balls.push(tempBall);
}

function drawBalls(){
    var dimensionTimer=setInterval(function(){
        balls.forEach(function(x, index){
            if(parseInt(ReturnObjectStyle(balls[index].div,'height'))>=maxRadius || balls[index].bigger==0){
                balls[index].bigger=0;
            }
            if(balls[index].bigger==1){
             balls[index].div.style.height=(parseInt(ReturnObjectStyle(balls[index].div,'height')))+1+'px';
             balls[index].div.style.width=(parseInt(ReturnObjectStyle(balls[index].div,'width')))+1+'px';
            }
            if(balls[index].bigger==0){
             balls[index].div.style.height=(parseInt(ReturnObjectStyle(balls[index].div,'height')))-1+'px';
             balls[index].div.style.width=(parseInt(ReturnObjectStyle(balls[index].div,'width')))-1+'px';
            }
            if(parseInt(ReturnObjectStyle(balls[index].div,'height'))<=0){
                punteggio--;
                pointsDecreased=1;
                document.getElementById("points").innerText=punteggio;
                missTargets++;
                playground.removeChild(balls[index].div);
                // rimuovo l'elemento dall'array
                balls.splice(index,1);
            }
            });
        },30)
    timers.push(dimensionTimer);

    var visualTimer=setInterval(function(){
        balls.forEach(function(x,index){
            var ballNodeRadius=parseInt(ReturnObjectStyle(balls[index].div,'height'));
            if((parseFloat(balls[index].div.style.left)<=0 || parseFloat(balls[index].div.style.left)>=(playground_WIDTH-ballNodeRadius))&& balls[index].speedXChanged==0){
                balls[index].speedX=-balls[index].speedX;
                balls[index].speedXChanged=1;
            }
            if((parseFloat(balls[index].div.style.top)<=0 || parseFloat(balls[index].div.style.top)>=(playground_HEIGHT-ballNodeRadius))&& balls[index].speedYChanged==0){
                balls[index].speedY=-balls[index].speedY;
                balls[index].speedYChanged=1;
            }
            balls[index].div.style.left=(parseFloat(balls[index].div.style.left)+balls[index].speedX)+'px';
            balls[index].div.style.top=(parseFloat(balls[index].div.style.top)+balls[index].speedY)+'px';
            })
        },10);
    timers.push(visualTimer);
}

function endGame(){
    clearInterval(ballTimer);
    clearInterval(startTimer);
    clearInterval(startTimer0);
    countDownWrapper.style.display="none";
    gameStarted=0;

    // cancello tutte le ball
    var elements = document.getElementsByClassName("ball");
    while(elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
    }
    balls=null;
    for (var i = 0; i < timers.length; i++) {
        clearInterval(timers[i]);
    }
    document.getElementById("stats0").innerText="Punteggio: "+punteggio;
    document.getElementById("stats1").innerText="Colpi a segno: "+colpiASegno;
    document.getElementById("stats2").innerText="Colpi mancati: "+missShots;
    document.getElementById("stats3").innerText="Bersagli mancati: "+missTargets;
    if(totShots==0){
        document.getElementById("stats4").innerText="Precisione: 0%";
    }
    else {
        document.getElementById("stats4").innerText="Precisione: "+Math.round(((totShots-missShots)/totShots*100))+"%";
    }
    report.style.visibility="visible";
    report.style.opacity=0;
    var reportTimer=setInterval(function(){
        report.style.opacity=parseFloat(ReturnObjectStyle(report, 'opacity'))+0.01;
        if(ReturnObjectStyle(report, 'opacity')==1){
            clearInterval(reportTimer);
        }
    },5);
    // passing "punteggio" to php
    salvaPunteggio(punteggio);
}

function restart(){
    for (var i = 0; i < timers.length; i++) {
        clearInterval(timers[i]);
    }
    countDownWrapper.style.display="";
    clearInterval(ballTimer);
    clearInterval(startTimer);
    clearInterval(startTimer0);

    // cancello tutte le ball
    var elements=document.getElementsByClassName('ball');
    while(elements[0]){
        playground.removeChild(elements[0]);
    }
    balls=null;
    beginGioco4();
}

