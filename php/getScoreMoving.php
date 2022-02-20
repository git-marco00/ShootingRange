<?php
    require 'dbh.php';
    $scoreMoving = array();

    $query = "SELECT uidUsers, MovingPoints FROM users WHERE MovingPoints IS NOT NULL
              ORDER BY MovingPoints DESC";
	$result = $conn->query($query);

    $i = 0;

    while($row = $result->fetch_array())
    {
        $scoreMoving[$i] = $row['uidUsers'];
        $i++;
        $scoreMoving[$i] = $row['MovingPoints'];
        $i++;
    }

  

    print json_encode($scoreMoving);

?>