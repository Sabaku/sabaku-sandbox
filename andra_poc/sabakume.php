<center>
<?php
   $link = mysql_connect('127.0.0.1', 'sabakuor', '3kkdzoe#');
	if (!$link) {
	    die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('sabakuor');
	$result = mysql_query("SELECT * FROM Entries WHERE id=".$_GET["id"]);
	if (!$result) {
	    die('Invalid query: ' . mysql_error());
	}
	for ($i=0; $i< mysql_num_fields($result); $i++){
		$fieldnames[]= mysql_field_name($result, $i);
	}
	while ($row = mysql_fetch_assoc($result)) {
		foreach ($fieldnames as $fieldname){
			$$fieldname=$row[$fieldname];
		}
	}

   print "<span
   class=\"Z3988\" 
   title=\"ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rfr_id=info%3Asid%2Focoins.info%3Agenerator&amp;rft.genre=article&amp;rft.atitle=Article&amp;rft.title=$title&amp;rft.date=$eventdate&amp;rft.aulast=Waagmeester&amp;rft.aufirst=Andra&amp;rft.au=Andra+Waagmeester&amp;rft.au=Bhagat+Jits\">
</span>";



$sabakuUrl = "http%3A%2F%2F".$_SERVER["SERVER_NAME"].$_SERVER['PHP_SELF']."?".$_SERVER['QUERY_STRING'];
print "<img src=\"http://chart.apis.google.com/chart?chs=200x200&cht=qr&&chld=H&chl=$sabakuUrl\"><br>";
print urldecode($sabakuUrl);
print "<hr>";

print "<table>";
foreach ($fieldnames as $fieldname){
	print "<tr><td>".$fieldname."</td><td>".$$fieldname."</td></tr>";
}
print "</table><hr>";

   $mendeleyUrl = "http://www.mendeley.com/import/";
   $bitlyUrl = file_get_contents( "http://api.bit.ly/v3/shorten?login=citedin&apiKey=R_f5897d878d1f52b72a57bdd3e380c4a2&longUrl=$url&format=txt");
   print "<a href=\"$mendeleyUrl?url=$url\"><img src = \"importMendeley.gif\"></a><br><hr>";
   print "<a href=\"http://twitter.com/share\" class=\"twitter-share-button\" data-count=\"horizontal\" data-via=\"sabaku\">Tweet</a><script type=\"text/javascript\" src=\"http://platform.twitter.com/widgets.js\"></script>";

   print "<hr>";

?>
</pre>
