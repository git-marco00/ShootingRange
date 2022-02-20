<?php
    require 'dbh.php';
    session_start();
    $score = $_POST['score_saved'];
    $newRecordFlag=0;
    
    if(isset($_SESSION['userId'])){
        $sql = 'UPDATE users SET PrecisionPoints=? WHERE idUsers=? AND (PrecisionPoints<? OR PrecisionPoints IS NULL)';
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header('Location: ../index.php?error=sqlerror');
            exit();
        }
        else {
            $uid=$_SESSION['userId'];
            mysqli_stmt_bind_param($stmt, 'isi',$score, $uid, $score);
            mysqli_stmt_execute($stmt);
            if(mysqli_error($conn)){
            echo 'Error: ' . mysqli_error($conn);
            }
            
            if(mysqli_affected_rows($conn) >0 ){
                $newRecordFlag=1;
            }
        }
    }
    echo $newRecordFlag;
?>


