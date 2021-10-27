<!DOCTYPE html>
<html lang="en" dir="ltr" class="notranslate" onselect="return false;" translate="no" oncontextmenu="return false;" oncopy="return false" oncut="return false" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
<head>
  <meta charset="utf-8"/>
  <title>Rol Ball</title>
  <link rel="shortcut icon" type="image/x-icon" href="res/icon.png"/>

  <link rel="stylesheet" href="style.css"/>
  <style>
    .k{
      position:fixed;
      top:0;left:0;
      width:100vw;
      height:100vh;
    }
    #start_panel{
      text-align: center;
    }
    #start_panel h1{
      position:fixed;
      top:50%;left:50%;
      transform: translate(-50%,-50%);
    }
    video,iframe{
      display:none;
    }
    video{z-index:1000;background: #000;}
  </style>

  <script src="core.js" charset="utf-8"></script>

  <script type="text/javascript">
    setConfig("server/running","false");
    function PreStart(){
      document.removeEventListener("click",PreStart);
      document.getElementById("start_panel").style.display="none";
      document.getElementById("msc").play();
      document.getElementsByTagName("video")[0].style.display="block";
      document.getElementsByTagName("video")[0].play();
    }
    function TruStart(){
      document.getElementsByTagName("video")[0].pause();
      document.getElementsByTagName("video")[0].currentTime=0;
      document.getElementsByTagName("video")[0].controls="true";
      document.getElementsByTagName("video")[0].style.display="none";

      document.getElementsByTagName("iframe")[0].style.display="block";
    }
    function PlayVideom(i){
      document.getElementsByTagName("video")[0].style.display="block";
      document.getElementsByTagName("video")[0].play();
      switch (i) {
        case 0:
          document.getElementsByTagName("video")[0].children[0].src="res/video/init.mp4";
        break;
        case 1:
          document.getElementsByTagName("video")[0].children[0].src="res/video/howto_server.mp4";
        break;
        case 2:
          document.getElementsByTagName("video")[0].children[0].src="res/video/howto_play.mp4";
        break;
        default:
          document.getElementsByTagName("video")[0].style.display="none";
          document.getElementsByTagName("video")[0].pause();
          document.getElementsByTagName("video")[0].currentTime=0;
        break;
      }
    }
  </script>
</head>
<body class="unselectable" translate="no">
  <div class="k" id="start_panel">
    <h1 style="font-family:monospace;">Click to start the game</h1>
  </div>

  <video class="k" onclick="TruStart()">
    <source src="res/video/init.mp4" type="video/mp4">
  </video>
  <iframe class="k" src="menu.php"></iframe>

  <audio id="msc" src="res/audio/dansemacabre.mp3" type="audio/mp3" hidden="true" loop></audio>
  <audio id="sfx" src="" type="audio/mp3" hidden="true"></audio>

  <script type="text/javascript">
    if(getConfig("mute") != "false"){
      document.getElementsByTagName("video")[0].muted = true;
    }
    document.addEventListener("click",PreStart);
  </script>
</body>
</html>
