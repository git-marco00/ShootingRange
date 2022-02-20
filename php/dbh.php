<?php
$servername="localhost";
$dBUsername="root";
$dBPassword="";
$dBName="loginsystem";

$conn = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn){
    die("connection failed: " .mysqli_connnect_error());
}
