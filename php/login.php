<?php

if(isset($_POST['login-submit'])){
    require 'dbh.php';

    $uid=$_POST['uid'];
    $password=$_POST['pwd'];

    $sql = "SELECT * FROM users WHERE uidUsers=?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("Location: ../index.php?logerror=sqlerror");
        exit();
    }
    else {
        mysqli_stmt_bind_param($stmt, "s", $uid);
        mysqli_stmt_execute($stmt);
        $result=mysqli_stmt_get_result($stmt);
        if($row=mysqli_fetch_assoc($result)){
            $pwdCheck = password_verify($password, $row['pwdUsers']);
            if($pwdCheck==false){
                header("Location: ../index.php?logerror=wrongpassword");
                exit();
            }
            else if($pwdCheck==true){
                // right password, start session
                session_start();
                $_SESSION['userId'] = $row['idUsers'];
                $_SESSION['userUId'] = $row['uidUsers'];
                header("Location: ../index.php?login=success");
                exit();
            }
            else {
                header("Location: ../index.php?logerror=wrongpassword");
                exit();
            }
        }
        else {
            header("Location: ../index.php?logerror=nouser");
            exit();
        }

    }

    
}
else {
    header("Location: ../index.php");
    exit();
}