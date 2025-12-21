<?php
 
if($_POST['submit']){ //if submit is hit continue...
 
$spoof = (stripslashes(trim($_POST['spoof']))); //sanitizes all the user input.
$target = (stripslashes(trim($_POST['target'])));
$reply =  (stripslashes(trim($_POST['reply'])));
$title = str_replace(array("\n", "\r"), '', stripslashes(trim($_POST['title'])));
$body  = (stripslashes(trim($_POST['body'])));
 
$headers  = "From: $spoof\r\n";
$headers .= "Reply-To: $reply\r\n";
$headers .= 'MIME-Version: 1.0' . "\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
$regex="/^[a-zA-Z][\w \.\-]+[a-zA-Z0-9]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,4}$/"; //Compares input email to this pattern to make sure it is a valid email.
if($spoof == "" || !preg_match($regex, $spoof)){
 
echo "<font color='red'><b> Error: No Spoof Email Provided or Email Invalid!
</font></b>"; //error checking
exit;
}
elseif($target == "" || !preg_match($regex, $target)){
echo "<font color='red'><b> Error: No Target Email Provided or Email Invalid!
</font></b>";
exit;
}
elseif($reply == ""){
echo "<font color='red'><b> Error: No Reply Email Provided! </font></b>";
exit;
}
elseif($title == ""){
echo "<font color='red'><b> Error: No Email Title Provided! </font></b>";
exit;
}
elseif($body == ""){
echo "<font color='red'><b> Error: No Email Body Provided! </font></b>";
exit;
}
else{
mail($target, $title, $body, $headers); //if there are no errors, send the email
echo "Mail Was Sent!";
}
}
else{ //if submit wasn't hit, show the HTML form
?>
<!-- This is the CSS which makes the form look the way it does. -->
<html>
<title> TheUnknown1's E-mail spoofer </title>
<body>
<style type="text/css">
body {
font-family: Arial;
font-size: .9em;
}
input {
background: #ECFDCE;
border: 1px solid green;
}
textarea {
background: #ECFDCE;
border: 1px solid green;
}
legend {
border: 1px solid #048DB4;
background: #F0F8FF;
}
 
fieldset {
border: 1px solid #048DB4;
width: 18.7em;
padding-left: 11px;
padding-bottom: 20px;
background: #F0F8FF;
}
<!-- This is the HTML form -->
</style>
<fieldset>
<legend>TheUnknown1's E-mail spoofer</legend>
<form action="" method="POST">
Spoofed Email:<br>
<input type="text" size="40" name="spoof"><br>
Targets Email:<br>
<input type="text" size="40" name="target"><br>
Reply Email:<br>
<input type="text" size="40" name="reply"><br>
Message Title:<br>
<input type="text"size="40" name="title"><br>
Message Body:<br>
<textarea rows="20" cols="42" name="body">
</textarea><br>
<input type="submit" value="Submit" name="submit">
<input type="reset" value="Clear">
</form>
</fieldset>
</body>
</html>
<?php
}


?>
</pre>