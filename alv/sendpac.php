<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Alv :v</title>
<link rel="icon" href="pacman.png" type="image/x-icon">
<meta name="theme-color" content="#FF00FF"/>
<?php
$txt=$_POST["npac"];
$yaexistia=0;
if($txt==""){$yaexistia=2;}
if($yaexistia!=2){
	$fpacs=array(":v");
	$myfile = fopen("pacs.txt", "r") or die("Unable to open file!");
	while(!feof($myfile)){
		array_push($fpacs,fgets($myfile));
	}
	fclose($myfile);
	if(in_array($txt,$fpacs)){
		$yaexistia=1;
	}else{
		$yaexistia=0;
		$myfile = fopen("pacs.txt", "a") or die("Unable to open file!");
		fwrite($myfile, "\n".$txt);
		fclose($myfile);
	}
}
?>
<style type="text/css">
*{
  margin:0px;
  padding:0px;
}
body{
  background:#FF00FF;
  color:#000;
  text-align:center;
}
h1{
  color:#000;
  text-align:center;
  font-size:5vh;
  font-family:monospace;
  font-style:normal;
  font-weight:bold;
  margin:16px;
  padding:25px;
  display:flex;
  justify-content:center;
  align-content:center;
  flex-direction:column;
}
a{
  cursor:pointer;
  text-decoration:none;
  text-align:center;
  background:#FF00FF;
  color:#FFF;
  font-family:monospace;
  font-size:3em;
  padding:16px 32px;
  margin:32px;
  border-radius:10px;
  border:2px solid #FFF;
}
</style>
</head>
<body>
<br/><br/>
<?php
if($yaexistia==1){
	echo '<h1>El pacman</h1><h1 style="white-space:nowrap;">'.$txt.'</h1><h1>ya existe en nuestra base de datos. <br/> Inténtalo con otro :D</h1>';
}
if($yaexistia==0){
	echo '<h1>Tu pacman <br/> '.$txt.' <br/> ha sido añadido a nuestra base de datos</h1>';
}
if($yaexistia==2){
	echo '<h1>No has escrito ningún pacman alv :v</h1>';
}
?>
<br/><br/>
<a href="index.php">Volver</a>
</body>
</html>