var initialCountDown = 3;
var Time=30;
var playground = null;
var playground_WIDTH;
var playground_HEIGHT;
var punteggio=0;
var ball=null;
var startTimer;
var startTimer0;
var ballTime=5;
var clickInterval;
var clickTime=0;
var apparitionsNumber=0;
var wrapperTimer;
var ballAppearsTimer;
var missShots=0;
var colpiASegno=0;
var totShots=0;
var ballClicked=0;
var apparitionTimeout;
/**
 * Funzione per ritornare il parametro di style quando questo è stato impostato da un foglio di stile css
 * Link: https://www.webdeveloper.com/d/211075-stylewidth-returning-nan/2
 */
function ReturnObjectStyle(obj, par) {
    if (obj.currentStyle) return obj.currentStyle[par.replace(/-/g, '')];
    return document.defaultView.getComputedStyle(obj, null).getPropertyValue(par.toLowerCase());
}

function beginScript2(){
    playground=document.getElementById("gameWrapper");
    report=document.getElementById("report");
    playground_WIDTH = parseInt(ReturnObjectStyle(playground, 'width'));
    playground_HEIGHT = parseInt(ReturnObjectStyle(playground,'height'));
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById("termina").addEventListener("click", endGame);  
    // penalità se non si clicka la ball
    playground.addEventListener("click", function(){
        if(ballClicked==0 && ball!=null){
            document.getElementById("failSound").volume=0.5;
            document.getElementById("failSound").play();
            missShots++;
            clickTime+=100; 
        }
        ballClicked=0;
        totShots++;
    });
    beginGioco2();
}

function beginGioco2() {
    // inizializzazione
    report.style.visibility="hidden";
    punteggio=0;
    clickTime=0;
    ballClicked=0;
    apparitionsNumber=0;
    colpiASegno=0;
    totShots=0;
    missShots=0;
    document.getElementById("points").innerText=punteggio;
    document.getElementById("timer").innerText=Time;
    document.getElementById("timer").style.color="black";


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
            ball= document.createElement("div");
            ball.setAttribute('class', 'ball');
            playground.appendChild(ball);
            ball.addEventListener("click", ballDisappears);
            ball.style.display="none";  // all'inizio la ball è invisibile
            var ballRadius=parseInt(ReturnObjectStyle(ball,'height'));
            

            // timer per il wrapper del punteggio
            wrapperTimer=setInterval(function(){
               if(apparitionsNumber==0){
                punteggio=clickTime;
                }
                else{
                punteggio=Math.round(clickTime/(apparitionsNumber));
                }
                document.getElementById("points").innerText=punteggio;
            },50);

            // il cerchio da colpire viene piazzato al centro
            var x,y;
            x= playground_WIDTH/2-ballRadius/2;
            y= playground_HEIGHT/2-ballRadius/2;
            ball.style.left = x+'px';
            ball.style.top = y+'px';

            ballAppears(); 
        }
    }, 1000);
};

function ballAppears(){
    var random=Math.random()*ballTime*1000;

    apparitionTimeout=setTimeout(function(){
        ball.style.display="";
        apparitionsNumber++;

        // devo iniziare a contare il tempo in ms fino al click dell'utente
        clickInterval = setInterval(function(){
            clickTime+=1;
        },10);

    }, random);
}

function ballDisappears(){
    document.getElementById("clickSound").volume=0.5;
    document.getElementById("clickSound").play();
    ballClicked=1;
    colpiASegno++;
    clearInterval(clickInterval);
    ball.style.display="none";
    ballAppears();
}

function endGame(){
    clearTimeout(apparitionTimeout);
    clearInterval(clickInterval);
    clearInterval(startTimer0);
    clearInterval(startTimer);
    clearInterval(wrapperTimer);
    clearInterval(ballAppearsTimer);
    countDownWrapper.style.display="none";
    if(ball!=null){
    ball.style.display="none";
    }
    ball=null;
    if(apparitionsNumber==0){
        document.getElementById("stats0").innerText="Punteggio: null";
    }
    else {
    document.getElementById("stats0").innerText="Punteggio: "+punteggio;
    }
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
    if(apparitionsNumber!=0){
    salvaPunteggio(punteggio);
    }
}

function restart(){
    countDownWrapper.style.display="";

    clearTimeout(apparitionTimeout);
    clearInterval(clickInterval);
    clearInterval(wrapperTimer);
    clearInterval(ballAppearsTimer);
    clearInterval(startTimer);
    clearInterval(startTimer0);
    if(ball!=null){
    ball.style.display="none";
    }
    ball=null;
    beginGioco2();
}


