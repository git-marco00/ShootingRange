function salvaPunteggio(score){
    $.ajax({
        type: 'POST',
        url: '../php/updateScoreTracking.php',
        data: {
            score_saved:score,
        },
        dataType:'json',
        success: function(output){
            if(output==1){
                var newRecord=document.createElement("img");
                var stats0=document.getElementById("stats0");
                newRecord.src="../others/newRecord.png"
                newRecord.setAttribute('class','newRecord');
                stats0.appendChild(newRecord);
            }
        } 
    })
}

