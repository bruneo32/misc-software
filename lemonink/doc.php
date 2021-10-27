<!DOCTYPE html>
<html>
<?php
if(!isset($_GET["n"]) || $_GET["n"] == ""){
	$si = "Comenzando";
}else{
	$si = $_GET["n"];
}
?>
<head>
<title>Documentación · Lemon Ink</title>
<meta charset="utf-8"/>
<link rel="shortcut icon" href="../resources/icon.png" type="image/x-icon"/>
<link rel="stylesheet" href="../docs/doc.css"/>
<meta name="theme-color" content="#8394B2"/>
<style>
*{
	outline:none;
	margin:0px;
	padding:0px;
}
html, body, table, iframe{width:100%;height:100%;}
body{
	overflow:hidden;
}
img{
	max-width:100%;
	user-drag: none; 
	user-select: none;
	-moz-user-select: none;
	-webkit-user-drag: none;
	-webkit-user-select: none;
	-ms-user-select: none;
}
td{vertical-align:top;}
ul{
	width:100%;
	height:calc(100% - 136px);
	overflow:auto;
	background:rgba(255,255,255,0.666);
	border:1px dotted #000;
}
li{
	cursor:pointer;
	list-style:none;
	color:#000;
	border:1px solid transparent;
	background:transparent;
}
</style>
<script type="text/javascript">
function foca(n){
	var m = document.getElementsByTagName("li");
	for(var i=0; i < m.length; i++){
		m[i].style.color="#000";
		m[i].style.border="1px solid transparent";
		m[i].style.background="transparent";
	}
	n.style.color="#FFF";
	n.style.border="1px dotted #FFF";
	n.style.background="#0078D7";
}
function LoadDoc(u){
	document.getElementById("f1").src = u.toString();
}
function SearchDoc(e){
	var sText = document.getElementById("searchText");
	var str = sText.value;
	
	// filtrar
	var F2 = document.getElementById("f2");
	for(var i=0; i < F2.childElementCount; i++){
		if(str == ""){F2.children[i].style.display = "block";continue;}
		if(F2.children[i].innerHTML.match(new RegExp(str,"i")) == null){
			F2.children[i].style.display = "none";
		}else{
			F2.children[i].style.display = "block";
		}
	}
}
</script>
</head>
<body>
<table>
<tr>
<td style="vertical-align:top;width:256px;border:1px solid #000;padding:6px;">
<img style="margin:16px 0px;" src="../resources/banner.png" alt="Banner"></img>
<b>Índice:</b><br/>
<input id="searchText" autocomplete="off" onkeyup="SearchDoc(event)" type="text" placeholder="Buscar..."/><br/><br/>
<ul id="f2">
<?php
$files = glob("docs/*.html");
for($i = 0; $i < count($files); $i++){
	$file_type = pathinfo($files[$i], PATHINFO_EXTENSION);
	$file_name = basename($files[$i]);
	
	echo '<li onclick="foca(this);LoadDoc(&apos;../docs/'.$file_name.'&apos;)">'.str_replace(".html","",$file_name)."</li>";
}
?>
</ul>
</td>
<td>
	<iframe id="f1" frameborder="0" src="../docs/<?php echo $si;?>.html"/>
</td>
</tr>
</table>
</body>
</html>