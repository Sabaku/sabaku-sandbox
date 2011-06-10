<?php
   //var_dump($_POST);
    $link = mysql_connect('127.0.0.1', '', '');
	if (!$link) {
	    die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('sabakuor');
	
    print "<table>";
	foreach ($_POST as $key => $value){
		print "<tr><td><b>$key</b></td><td>$value</td></tr>";
		$$key = $value;
	}
	print "</table>";
	
	$result = mysql_query("INSERT INTO Entries (title, authors, affiliation, abstract, conference, url, eventdate) values ('$title','$authors','$affiliation', '$abstract', '$conference', '$url', '$eventdate');") ;
    if (!$result) {
	    die('Invalid query: ' . mysql_error());
	}
	$id=mysql_insert_id();
	$sabakuUrl = "http%3A%2F%2F".$_SERVER["SERVER_NAME"]."/sabakume.php?id=$id";
   print "<hr><img src=\"http://chart.apis.google.com/chart?chs=200x200&cht=qr&&chld=H&chl=$sabakuUrl\"><br>";
   print urldecode($sabakuUrl);
?>
