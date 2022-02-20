<?php
    require 'dbh.php';
    $scoreReflex = array();

    $query = "SELECT uidUsers, ReflexPoints FROM users WHERE ReflexPoints IS NOT NULL
              ORDER BY IFNULL(ReflexPoints,10000)";
	$result = $conn->query($query);

    $i = 0;

    while($row = $result->fetch_array())
    {
        $scoreReflex[$i] = $row['uidUsers'];
        $i++;
        $scoreReflex[$i] = $row['ReflexPoints'];
        $i++;
    }


    print json_encode($scoreReflex);

?>