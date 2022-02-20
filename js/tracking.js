// tracking
var initialCountDown = 3;
var Time=30;
var maxSecondsSpeedSwitch=2;
var maxSpeed=2;
var timeSpeedChange=1000;
var playground = null;
var playground_WIDTH;
var playground_HEIGHT;
var punteggio=0;
var ball=null;
var ballRadius;
var missShots=0;
var colpiASegno=0;
var totShots=0;

var ballClicked=0;
var startTimer;
var startTimer0;
var visualTimer;
var speedTimer;
var timeTimer;

/**
 * Funzione per ritornare il parametro di style quando questo è stato impostato da un foglio di stile css
 * Link: https://www.webdeveloper.com/d/211075-stylewidth-returning-nan/2
 */
function ReturnObjectStyle(obj, par) {
    if (obj.currentStyle) return obj.currentStyle[par.replace(/-/g, '')];
    return document.defaultView.getComputedStyle(obj, null).getPropertyValue(par.toLowerCase());
}

function beginScript3(){
    playground=document.getElementById("gameWrapper");
    report=document.getElementById("report");
    playground_WIDTH = parseInt(ReturnObjectStyle(playground, 'width'));
    playground_HEIGHT = parseInt(ReturnObjectStyle(playground,'height'));
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById("termina").addEventListener("click", endGame); 

    // penalità se non si clicka la ball
    playground.addEventListener("click", function(){
        if(ball!=null && ballClicked==0){
        document.getElementById("failSound").volume=0.5;
        document.getElementById("failSound").play();
        punteggio-=1;
        missShots++;
        document.getElementById("points").innerText=punteggio;
        }
        ballClicked=0;
        totShots++;
    })
    beginGioco3();
}

function beginGioco3(){
    report.style.visibility="hidden";
    punteggio=0;
    ballClicked=0;
    colpiASegno=0;
    totShots=0;
    missShots=0;
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

            // timer per la visualizzazione del tempo a disposizione
            var timeLeft=Time;
            document.getElementById("timer").style.color="black";
            startTimer=setInterval(function(){
                timeLeft-=1;
                document.getElementById("timer").innerText=timeLeft;
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

            createBall();
        }
    },1000);
}

function createBall(){
    // funzione per la crezione del cerchio
    ball= document.createElement("div");
    ball.setAttribute('class', 'ball');
    playground.appendChild(ball);
    ball.addEventListener("click", function(){
        document.getElementById("clickSound").volume=0.5;
        document.getElementById("clickSound").play();
        ballClicked=1;
        punteggio++;
        document.getElementById("points").innerText=punteggio;
        colpiASegno++;
    });
    var ballRadius=parseInt(ReturnObjectStyle(ball,'height'));

    // variabili della ball
    var x,y;
    var speedX, speedY;

    // all'inizio la ball viene piazzata nel centro
    x= playground_WIDTH/2-ballRadius/2;
    y= playground_HEIGHT/2-ballRadius/2;
    ball.style.left = x+'px';
    ball.style.top = y+'px';

    //prima esecuzione
    speedX=2*(Math.random()-0.5)*maxSpeed;
    speedY=2*(Math.random()-0.5)*maxSpeed;

    speedTimer=setInterval(function(){
        // speedX,Y deve essere un valore random tra -maxSpeed e +maxSpeed
        speedX=2*(Math.random()-0.5)*maxSpeed;
        speedY=2*(Math.random()-0.5)*maxSpeed;
    },timeSpeedChange);

    visualTimer=setInterval(function(){
        if(parseFloat(ball.style.left)<=0 || parseFloat(ball.style.left)>=(playground_WIDTH-ballRadius)){
            speedX=-speedX;
        }
        if(parseFloat(ball.style.top)<=0 || parseFloat(ball.style.top)>=(playground_HEIGHT-ballRadius)){
            speedY=-speedY;
        }
        ball.style.left=(parseFloat(ball.style.left)+speedX)+'px';
        ball.style.top=(parseFloat(ball.style.top)+speedY)+'px';
    },10);
}

function endGame(){
    clearInterval(speedTimer);
    clearInterval(visualTimer);
    clearInterval(startTimer);
    clearInterval(startTimer0);
    if(ball!=null){
        ball.style.display="none";
        }
    ball=null;
    countDownWrapper.style.display="none";
    document.getElementById("stats0").innerText="Punteggio: "+punteggio;
    document.getElementById("stats1").innerText="Colpi a segno: "+colpiASegno;
    document.getElementById("stats2").innerText="Colpi mancati: "+missShots;
    
    if(totShots==0){
        document.getElementById("stats3").innerText="Precisione: 0%";
    }
    else {
        document.getElementById("stats3").innerText="Precisione: "+Math.round(((totShots-missShots)/totShots*100))+"%";
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
    countDownWrapper.style.display="";
    clearInterval(speedTimer);
    clearInterval(visualTimer);
    clearInterval(startTimer);
    clearInterval(startTimer0);
    if(ball!=null){
        ball.style.display="none";
        }
    ball=null;
    beginGioco3();
}


