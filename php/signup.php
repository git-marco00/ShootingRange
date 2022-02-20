<?php
if(isset($_POST['signup-submit'])){
    require 'dbh.php';

    $username=$_POST['uid'];
    $email=$_POST['mail'];
    $password=$_POST['pwd'];
    $passwordRepeat=$_POST['pwd-repeat'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)&&(!preg_match("/^[a-zA-Z0-9]*$/",$username))){
        header("Location: ../index.php?error=invalidemailuid");
        exit();
    }
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        header("Location: ../index.php?error=invalidemail&uid=".$username);
        exit();
    }
    else if (!preg_match("/^[a-zA-Z0-9]*$/",$username)){
        header("Location: ../index.php?error=invaliduid&mail=".$email);
        exit();
    }
    else if($password !== $passwordRepeat){
        header("Location: ../index.php?error=passwordcheck&uid=".$username."&email=".$email);
        exit();
    }   
    else {
        // matching of other users with same name
        $sql="SELECT uidUsers FROM users WHERE uidUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../index.php?error=sqlerror");
            exit();
        }
        else {
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if($resultCheck > 0){
                header("Location: ../index.php?error=usertaken&mail=".$email);
                exit();
            }
            else {
                // insert of new account
                $sql="INSERT INTO users (uidUsers, emailUsers, pwdUsers) VALUES (?,?,?)";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    header("Location: ../index.php?error=sqlerror");
                    exit();
                }
                else {
                    $hashedpwd=password_hash($password, PASSWORD_DEFAULT);
                    mysqli_stmt_bind_param($stmt,"sss", $username, $email, $hashedpwd);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../index.php?signup=success");
                    exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
else {
    header("Location: ../index.php");
    exit();
}