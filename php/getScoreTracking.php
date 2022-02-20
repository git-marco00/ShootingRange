<?php
    require 'dbh.php';
    $scoreTracking = array();

    $query = "SELECT uidUsers, TrackingPoints FROM users WHERE TrackingPoints IS NOT NULL
              ORDER BY TrackingPoints DESC";
	$result = $conn->query($query);

    $i = 0;

    while($row = $result->fetch_array())
    {
        $scoreTracking[$i] = $row['uidUsers'];
        $i++;
        $scoreTracking[$i] = $row['TrackingPoints'];
        $i++;
    }

    

    print json_encode($scoreTracking);

?>