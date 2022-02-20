var initialCountDown = 3;
var Time=30;
var playground = null;
var report=null;
var playground_WIDTH;
var playground_HEIGHT;
var punteggio=0;
var ball=null;
var ballRadius=10;
var startTimer;
var startTimer0;
var missShots=0;
var colpiASegno=0;
var totShots=0;
var ballClicked=0;
/**
 * Funzione per ritornare il parametro di style quando questo è stato impostato da un foglio di stile css
 * Link: https://www.webdeveloper.com/d/211075-stylewidth-returning-nan/2
 */
function ReturnObjectStyle(obj, par) {
    if (obj.currentStyle) return obj.currentStyle[par.replace(/-/g, '')];
    return document.defaultView.getComputedStyle(obj, null).getPropertyValue(par.toLowerCase());
}

function beginScript1(){
    playground=document.getElementById("gameWrapper");
    report=document.getElementById("report");
    scoreSQL=document.getElementById("scoreSQL");
    playground_WIDTH = parseInt(ReturnObjectStyle(playground, 'width'));
    playground_HEIGHT = parseInt(ReturnObjectStyle(playground,'height'));
    playground.addEventListener("click", function(){
    // penalità se non si clicka la ball
        if(ball!=null && ballClicked==0){
        document.getElementById("failSound").volume=0.5;
        document.getElementById("failSound").play();

        punteggio-=1;
        missShots++;

        document.getElementById("points").innerText=punteggio;
        }
        totShots++;
        ballClicked=0;
    })
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById("termina").addEventListener("click", endGame);
    beginGioco1();

}


function beginGioco1() {
    // inizializzazione
    report.style.visibility="hidden";
    punteggio=0;
    totShots=0;
    colpiASegno=0;
    ballClicked=0;
    missShots=0;
    document.getElementById("points").innerText=0;
    document.getElementById("timer").innerText=Time;

    // countdown 3,2,1
    var timeLeft0 = initialCountDown;
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
            startTimer=setInterval(function(){
                timeLeft-=1;
                document.getElementById("timer").innerText=timeLeft;
                document.getElementById("timer").style.color="black";
                if(timeLeft <=0){
                    document.getElementById("timer").innerText=timeLeft;
                    clearInterval(startTimer);
                    endGame();
                }
                if(timeLeft<=10 && timeLeft%2==0){
                    document.getElementById("timer").style.color="red";
                }
                if(timeLeft<=10 && timeLeft%2==1){
                    document.getElementById("timer").style.color="black";
                }
            },1000);

            // funzione per la crezione del cerchio
            createBall();
        }
    }, 1000);
};
    
function createBall(){
    ball= document.createElement("div");
    ball.setAttribute('class', 'ball')
    playGround=document.getElementById("gameWrapper");
    playGround.appendChild(ball);
    
    var x,y;

    x= Math.round(Math.random() * (playground_WIDTH-ballRadius*2));
    y= Math.round(Math.random() * (playground_HEIGHT-ballRadius*2));

    ball.style.left = x+'px';
    ball.style.top = y+'px';

    ball.addEventListener("click", function(){
        document.getElementById("clickSound").volume=0.5;
        document.getElementById("clickSound").play();
        var point=document.getElementById("points");
        punteggio+=1;
        colpiASegno++;
        ballClicked=1;
        point.innerText=punteggio;
        var x,y;
        x= Math.round(Math.random() * (playground_WIDTH-ballRadius*2));
        y= Math.round(Math.random() * (playground_HEIGHT-ballRadius*2));

        ball.style.left = x+'px';
        ball.style.top = y+'px';

    });
}

function endGame(){
    clearInterval(startTimer);
    clearInterval(startTimer0);
    if(ball!=null){
        ball.parentNode.removeChild(ball);
        }
    ball=null;
    countDownWrapper.style.display="none";
    document.getElementById("stats0").innerText="Punteggio: "+punteggio;
    document.getElementById("stats1").innerText="Colpi a segno: "+colpiASegno;
    document.getElementById("stats2").innerText="Colpi mancati: "+missShots;
    report.style.visibility="visible";
    report.style.opacity=0;
    var reportTimer=setInterval(function(){
        report.style.opacity=parseFloat(ReturnObjectStyle(report, 'opacity'))+0.01;
        if(ReturnObjectStyle(report, 'opacity')==1){
            clearInterval(reportTimer);

        }
    },5);
    if(totShots==0){
        document.getElementById("stats3").innerText="Precisione: 0%";
    }
    else {
        document.getElementById("stats3").innerText="Precisione: "+Math.round(((totShots-missShots)/totShots*100))+"%";
    }
    // passing "punteggio" to php
    salvaPunteggio(punteggio);
}

function restart(){
    clearInterval(startTimer);
    clearInterval(startTimer0);
    var countDownWrapper=document.getElementById("countDownWrapper");
    countDownWrapper.style.display=""
    document.getElementById("countDownWrapper").innerText = initialCountDown;

    if(ball!=null){
    ball.parentNode.removeChild(ball);
    }
    ball=null;
    beginGioco1();
}





