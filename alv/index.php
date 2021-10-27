<!-- Hecho por Bruno para la clase de TIC -->
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Alv :v</title>
<link rel="icon" href="pacman.png" type="image/x-icon">

<meta name="Description" content="Forma parte de una pequeña comunidad de todos y de nadie."/>

  <meta property="og:url" content="neomegasoft.com/alv" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ALV :v" />
  <meta property="og:description" content="Forma parte de una pequeña comunidad de todos y de nadie." />
  <meta property="og:image" content="pacman.png" />
  <meta property="og:image:alt" content="PACMAN" />

<meta name="theme-color" content="#FF00FF"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<style type="text/css">
*{
  overflow:hidden;
  margin:0px;
  padding:0px;
  outline:none;
}
body{
  background:#FF00FF;
  color:#000;
}
h1{
  color:#000;
  text-align:center;
  font-family:monospace;
  font-style:normal;
  font-weight:bold;
  width:90%;
  height:90%;
  
  overflow:auto;
  
  padding:0px 5%;
  display:flex;
  justify-content:center;
  align-content:center;
  flex-direction:column;
}
#crt{
  text-align:center;
  text-decoration:none;
  font-family:monospace;
  font-size:2vh;
  background:#AEAEAE;
  color:#000;
  border-radius:10px 0px 0px 0px;
  border:1px solid #666;
  padding:8px 16px;
  position:absolute;
  right:0px;
  bottom:0px;
}
#formpac{
  height:100%;
  cursor:pointer;
}
#formcrpac{
  cursor:default;
  display:none;
  background:#666 url("back1.jpg"); 
  text-align:center;
  width:100%;
  height:100%;
  position:absolute;
  top:100%;
}
h2{
  color:#FFF;
  font-family:monospace;
  font-style:normal;
  font-weight:normal;
  margin:4% 2% 2% 2%;
}
h3{
  color:#000;
  font-family:serif;
  font-style:italic;
  font-weight:normal;
  font-size:1em;
  margin:6px;
}
input[type=text]{
  text-align:center;
  text-decoration:none;
  background:#000;
  color:#FFF;
  font-family:monospace;
  font-size:2.71em;
  border:1px solid #FFF;
  border-radius:5px;
  width:80%;
  padding:1%;
  margin:2%;
}
input[type=submit]{
  cursor:pointer;
  text-align:center;
  background:#FF00FF;
  color:#FFF;
  font-family:monospace;
  padding:2% 4% 2% 4%;
  margin:1%;
  border-radius:10px;
  border:1px solid #FFF;
}
.clsbtn{
  float:right;
  margin:16px;
  cursor:pointer;
  text-align:center;
  color:#FFF;
  border:1px solid #FFF;
  padding: 8px 14px;
  background:#666;
  border-radius:50%;
  font-size:1.17em;
}
.cgf{
  background: #000;
  padding:1%;
  margin:0px;
  width:100%;
  color:#FFF;
  position:absolute;
  font-size:2.3vh;
  bottom:0px;
  left:0px;
}
.cgf a{
  color:#009A00;
  text-decoration:underline;
  font-family:_times, times new roman;
}
.cgf a:hover{
  cursor:pointer;
  text-decoration:none;
}
.center{
  background:#e7a61a;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  text-align:center;
  
  max-width:90%;
  width:364px;
  position:absolute;
  top:46%;
  left:50%;
  transform: translate(-50%,-60%);
  padding:16px;
}
#exp_adv{
  z-index:222;
  background:rgba(0,0,0,0.777);
  position:fixed;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  text-align:center;
}
#exp_adv h2{
  margin:32px;
}
.continuebtn{
  background:#00FF00;
  padding:6px 12px;
  border:3px solid #666;
  color:#000;
  border-radius:8px;
  margin:32px;
  font-family:monospace;
  font-size:1.5em;
  cursor:pointer;
}
</style>
<?php
$fpacs=array();
$myfile = fopen("pacs.txt", "r") or die("Unable to open file!");
while(!feof($myfile)){
	array_push($fpacs,fgets($myfile));
}
fclose($myfile);
?>
<script type="text/javascript">
var pacs = <?php echo json_encode($fpacs);?>;
function CambiarTexto(){
  var randpac=Math.floor((Math.random() * pacs.length));
  document.getElementById("pcmn").innerHTML=pacs[randpac];
  pacs.splice(randpac,1);
  if(pacs.length==0){document.location.reload();}
}
function FPV(vis){
  if(vis){
    document.getElementById("formcrpac").style.display="block";
  }else{
    document.getElementById("formcrpac").style.display="none";
  }
}
</script>
</head>
<body>
<div id="formpac" unselectable="on" onselectstart="return false;" onmousedown="return false;" onclick="CambiarTexto()">
<h1 id="pcmn">Click</h1>
<a id="crt" href="#formcrpac" onclick="FPV(true)">Crear pacman :v</a>
</div>

<form id="formcrpac" autocomplete="off" method="post" action="sendpac.php">

<input class="clsbtn" type="button" value="x" onclick="FPV(false)"/>

<div class="cgf">Página desarrollada por <a href="https://www.neomegasoft.com">Neo-OmegaSoft</a></div>

<div class="center">
<h2>Crea un pacman :v</h2>
<input type="text"  name="npac" id="inputpac" placeholder=":v"/><br/>
<h3 style="font-size:0.81em;">* Neo-OmegaSoft no se responsabilizará de nada de lo que publiques y no tomará ninguno de tus datos.</h3><br/>
<input type="submit" value="Enviar :v"/>
<h3 id="ntp">0</h3>
</div>

<script type="text/javascript">
document.getElementById("ntp").innerHTML="Número total de pacmans : "+pacs.length;
</script>
</form>

<div id="exp_adv">
<br/>
<br/>
<h2 style="font-size:2em;">· Aviso ·</h2><br/>
<h2>Esta página puede contener material audiovisual explícito</h2>
<input type="button" class="continuebtn" value="Aceptar y continuar" onclick="document.getElementById('exp_adv').style.display='none';"/>
</div>
</body>
</html>