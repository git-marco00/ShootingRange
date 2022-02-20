<?php
    require 'dbh.php';
    $scorePrecision = array();

    $query = "SELECT uidUsers, PrecisionPoints FROM users WHERE PrecisionPoints IS NOT NULL
              ORDER BY PrecisionPoints DESC";
	$result = $conn->query($query);

    $i = 0;

    while($row = $result->fetch_array())
    {
        $scorePrecision[$i] = $row['uidUsers'];
        $i++;
        $scorePrecision[$i] = $row['PrecisionPoints'];
        $i++;
    }

 

    print json_encode($scorePrecision);

?>