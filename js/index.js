var img1=document.getElementById("img1");
var img2=document.getElementById("img2");
var img3=document.getElementById("img3");
var img4=document.getElementById("img4");
var wrapper=document.getElementById("wrapper");
var wrapper1=document.getElementById("wrapper1");
var wrapper2=document.getElementById("wrapper2");
var charts=document.getElementById("charts");
var infoPrecision=document.getElementById("infoPrecision");
var infoReflex=document.getElementById("infoReflex");
var infoTracking=document.getElementById("infoTracking");
var infoMoving=document.getElementById("infoMoving");
var infoDiv=document.getElementById("infoDiv");
var imgClose=document.getElementById("imgClose");
var imgCloseLogin=document.getElementById("imgCloseLogin");
var imgCloseSignUp=document.getElementById("imgCloseSignUp");
var infoText=document.getElementById("infoText");
var login=document.getElementById("login");
var signUp=document.getElementById("signUp");
var loginDiv=document.getElementById("loginDiv");
var signUpDiv=document.getElementById("signUpDiv");
var imgTimer1;
var imgTimer2;
var imgTimer3;
var imgTimer4;

var chartRows=10;

if(login!=null && signUp!=null){
login.addEventListener("click", function(){
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    loginDiv.style.visibility="visible";
});

signUp.addEventListener("click", function(){
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    signUpDiv.style.visibility="visible";
});
}

infoPrecision.addEventListener("click", function(){
    infoText.innerText="\n \n \n \n GAME'S RULES \n \n Click as fast as you can on the ball. \n \n Time: 30 seconds \n Penalty: if you miss the ball you'll lose a point. "
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    // da chiedere
    imgClose.style.visibilty="visible";
    infoDiv.style.visibility="visible";
    
});
infoReflex.addEventListener("click", function(){
    infoText.innerText="\n \n \n \n GAME'S RULES \n \n Click as fast as you can on the ball when it appears. The apparition time is random. \n \n Time: 30 seconds \n Penalty: if you miss the ball you'll lose time. \n Points: lower is better."
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    imgClose.style.visibilty="visible";
    infoDiv.style.visibility="visible";
    
});
infoTracking.addEventListener("click", function(){
    infoText.innerText="\n \n \n \n GAME'S RULES \n \n Click as fast as you can on the ball which is moving at random speeds and in random directions. \n \n Time: 30 seconds \n Penalty: if you miss the ball you'll lose a point. "
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    imgClose.style.visibilty="visible";
    infoDiv.style.visibility="visible";
    
});
infoMoving.addEventListener("click", function(){
    infoText.innerText="\n \n \n \n GAME'S RULES \n \n Click as fast as you can on the balls that appear on your screen. \n \n Time: 30 seconds \n Penalty: if you miss the ball you'll lose a point. "
    wrapper2.style.filter="blur(5px)";
    wrapper1.style.filter="blur(5px)";
    charts.style.filter="blur(5px)";
    imgClose.style.visibilty="visible";
    infoDiv.style.visibility="visible";
    
});

imgClose.addEventListener("click",function(){
    wrapper2.style.filter="";
    wrapper1.style.filter="";
    charts.style.filter="";
    infoDiv.style.visibility="hidden";
});

imgCloseLogin.addEventListener("click",function(){
    wrapper2.style.filter="";
    wrapper2.style.filter="";
    wrapper1.style.filter="";
    charts.style.filter="";
    loginDiv.style.visibility="hidden";
});
imgCloseSignUp.addEventListener("click",function(){
    wrapper2.style.filter="";
    wrapper2.style.filter="";
    wrapper1.style.filter="";
    charts.style.filter="";
    signUpDiv.style.visibility="hidden";
});

img1.addEventListener("mouseover",function(){
    var i=1;
    imgTimer1=setInterval(function(){
        if(i==3){
            i=0;
        }   
        img1.src="others/gameImg/Immagine"+i+".png";
        i++;
    },
    500);
});
img1.addEventListener("mouseleave", function(){
    clearInterval(imgTimer1);
})
img2.addEventListener("mouseover",function(){
    var i=3;
    imgTimer2=setInterval(function(){
        if(i==5){
            i=3;
        }   
        img2.src="others/gameImg/Immagine"+i+".png";
        i++;
    },500);
})
img2.addEventListener("mouseleave", function(){
    clearInterval(imgTimer2);
})
img3.addEventListener("mouseover",function(){
    var i=5;
    imgTimer3=setInterval(function(){
        if(i==8){
            i=5;
        }   
        img3.src="others/gameImg/Immagine"+i+".png";
        i++;
    },500);
})
img3.addEventListener("mouseleave", function(){
    clearInterval(imgTimer3);
})
img4.addEventListener("mouseover",function(){
    var i=8;
    imgTimer4=setInterval(function(){
        if(i==11){
            i=8;
        }   
        img4.src="others/gameImg/Immagine"+i+".png";
        i++;
    },500);
})
img4.addEventListener("mouseleave", function(){
    clearInterval(imgTimer4);
})

function createCharts(){
    precisionChart();
    reflexChart();
    movingChart();
    trackingChart();
}

function precisionChart()
{  
    $.getJSON("php/getScorePrecision.php", function(scorePrecision){
        var tabella = document.getElementById("precisionTable");

        var quanti = 0;
        while(scorePrecision[quanti] != undefined)
            quanti++;
        var pos=1;
        for(var i = 0; i<chartRows && i<quanti; i+=2)
        {
            var riga = document.createElement("tr");
            var position=document.createElement("td");
            position.innerText=pos;
            riga.appendChild(position);
            var user_td = document.createElement("td");
            user_td.innerText = scorePrecision[i];
            riga.appendChild(user_td);
            var score_td=document.createElement("td");
            score_td.innerText=scorePrecision[i+1];
            riga.appendChild(score_td);
            tabella.appendChild(riga);
            pos++;
        }
    });
}
function reflexChart(){
    $.getJSON("php/getScoreReflex.php", function(scoreReflex){
        var tabella = document.getElementById("reflexTable");

        var quanti = 0;
        while(scoreReflex[quanti] !== undefined)
            quanti++;
        var pos=1;
        for(var i = 0; i<chartRows && i<quanti; i+=2)
        {
            var riga = document.createElement("tr");
            var position=document.createElement("td");
            position.innerText=pos;
            riga.appendChild(position);
            var user_td = document.createElement("td");
            user_td.innerText = scoreReflex[i];
            riga.appendChild(user_td);
            var score_td=document.createElement("td");
            if(scoreReflex[i+1]==null){
                scoreReflex[i+1]="null";
            }
            score_td.innerText=scoreReflex[i+1];
            riga.appendChild(score_td);
            tabella.appendChild(riga);
            pos++;
        }
    });
}
function movingChart(){
    $.getJSON("php/getScoreMoving.php", function(scoreMoving){
        var tabella = document.getElementById("movingTable");

        var quanti = 0;
        while(scoreMoving[quanti] != undefined)
            quanti++;
        
        var pos=1;
        for(var i = 0; i<chartRows && i<quanti; i+=2)
        {
            var riga = document.createElement("tr");
            var position=document.createElement("td");
            position.innerText=pos;
            riga.appendChild(position);
            var user_td = document.createElement("td");
            user_td.innerText = scoreMoving[i];
            riga.appendChild(user_td);
            var score_td=document.createElement("td");
            score_td.innerText=scoreMoving[i+1];
            riga.appendChild(score_td);
            tabella.appendChild(riga);
            pos++;
        }
    });
}
function trackingChart(){
    $.getJSON("php/getScoreTracking.php", function(scoreTracking){
        var tabella = document.getElementById("trackingTable");

        var quanti = 0;
        while(scoreTracking[quanti] != undefined)
            quanti++;

        var pos=1;
        for(var i = 0; i<chartRows && i<quanti; i+=2)
        {
            var riga = document.createElement("tr");
            var position=document.createElement("td");
            position.innerText=pos;
            riga.appendChild(position);
            var user_td = document.createElement("td");
            user_td.innerText = scoreTracking[i];
            riga.appendChild(user_td);
            var score_td=document.createElement("td");
            score_td.innerText=scoreTracking[i+1];
            riga.appendChild(score_td);
            tabella.appendChild(riga);
            pos++;
        }
    });
}
window.onload=createCharts;


