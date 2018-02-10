<?php
date_default_timezone_set('America/Chicago');

echo format("Hello from the ", 20);
echo format("internet!", 20);
echo format("Time: " . date("h:i m.d.y"), 20);
echo format("IP: " . $_SERVER['REMOTE_ADDR'], 20);

function format($input, $amount) {
	$paddedStr = $input;
	
	while (strlen($paddedStr) < $amount) {
		$paddedStr = $paddedStr . " ";
	}
	
	return subStr($paddedStr, 0, $amount);
}
?>
<!DOCTYPE html>
<head>
<meta charset="utf-8"/>
<title>My Web Page</title>
<style type="text/css">
body{
	width: 760px; /* how wide to make your web page */
	background-color: teal; /* what color to make the background */
	margin: 0 auto;
	padding: 0;
	font:12px/16px Verdana, sans-serif; /* default font */
}
div#main{
	background-color: #FFF;
	margin: 0;
	padding: 10px;
}
</style>
</head>
<body><div id="main">

<!-- CONTENT HERE -->

</div></body>
</html>
