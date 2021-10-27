<?php
	$myfile = fopen("ESP.txt", "r") or die("Unable to open file!");
	$ret = array();
	while(!feof($myfile)) {
		array_push($ret, fgets($myfile));
	}
	fclose($myfile);
	echo json_encode($ret);
?>