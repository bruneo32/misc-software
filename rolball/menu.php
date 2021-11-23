<!DOCTYPE html>
<html lang="en" dir="ltr" class="notranslate" onselect="return false;" translate="no" oncontextmenu="return false;" oncopy="return false" oncut="return false" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
<head>
  <meta charset="utf-8"/>
  <title>Rol Ball</title>
  <link rel="shortcut icon" type="image/x-icon" href="res/icon.png"/>

  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="menu.css"/>

  <link id="__modCSS" rel="stylesheet" href=""/>

  <script src="core.js" charset="utf-8"></script>

  <script type="text/javascript">
    if(self==top){location="index.php";}

    // IMPORTANTE AL PRINCIPIO
    if(getConfig("autoloadmod")=="true" && getConfig("MOD") != "false"){
      document.getElementById("__modCSS").href = getConfig("MOD");
    }
    if(getConfig("TEMP_MOD") != "false"){
      document.getElementById("__modCSS").href = getConfig("TEMP_MOD");
      remConfig("TEMP_MOD");
    }

    const bbacks = <?php echo json_encode(glob("res/backs/*.jpg", GLOB_NOESCAPE),JSON_UNESCAPED_SLASHES);?>;
    var backs = [].concat(bbacks); // Clone
    const backTimeout = 1000 * 12;
    const posisv = ["top","bottom","center"];
    const posish = ["right","left","center"];

    function ChangeBack(){
      var randback = Math.floor((Math.random() * backs.length));
      var baki=backs[randback];
      backs.splice(randback,1);
      if(backs.length==0){backs=[].concat(bbacks);}

      document.body.style.backgroundPosition="center center";
      document.body.style.backgroundImage="url(\"res/backs/black.png\")";
      setTimeout(function(){
        document.body.style.backgroundImage="url(\""+baki+"\")";
      }, 1000);
      setTimeout(ChangeBack, backTimeout);
    }
    function moveBack(){
      document.body.style.backgroundPosition=posisv[Math.floor(Math.random() * posisv.length)] + " " + posish[Math.floor(Math.random() * posish.length)];
      setTimeout(moveBack, backTimeout/2);
    }

    function ShowPanel(ind){
      var paneles=document.getElementsByClassName("lpanel");
      for(var i=0;i<paneles.length;i++){
        paneles[i].style.top="100vh";
      }
      if(ind===null || ind===undefined || ind===""){return;}

      if(document.getElementById(ind.toString()).style.top != "100vh"){return;}
      setTimeout(function(){document.getElementById(ind.toString()).style.top="calc(50vh - 180px)";}, 200);
      PlaySound("page");
    }
    function LookArt(){
      if(document.getElementsByTagName("table")[0].style.opacity == "0"){
        document.getElementsByTagName("table")[0].style.opacity = "1";
      }else{
        document.getElementsByTagName("table")[0].style.opacity = "0";
      }
    }

    function ToogleMute(){
      var d = document.getElementById("_sett_mute");
      if(d.checked){
        setConfig("mute",true);
        self.parent.document.getElementsByTagName("video")[0].muted = true;
        self.parent.document.getElementById("msc").muted = true;
        self.parent.document.getElementById("sfx").muted = true;
      }else{
        setConfig("mute",false);
        self.parent.document.getElementsByTagName("video")[0].muted = false;
        self.parent.document.getElementById("msc").muted = false;
        self.parent.document.getElementById("sfx").muted = false;
      }
    }
    function ToogleALM(){
      var d = document.getElementById("_sett_alm");
      if(d.checked){
        setConfig("autoloadmod",true);
      }else{
        setConfig("autoloadmod",false);
      }
    }
    function SlideMsc(){
      var d = document.getElementById("_sett_mscvol");
      setConfig("mscvol",d.value);
      self.parent.document.getElementById("msc").volume = d.value/100;
    }
    function SlideSFX(){
      var d = document.getElementById("_sett_sfxvol");
      setConfig("sfxvol", d.value);
      self.parent.document.getElementById("sfx").volume = d.value/100;
    }

    function LoadMod(event){
      var r = confirm("The page will refresh. Continue?");
      if(!r){return;}
      
    	var input = event.target;
      var reader = new FileReader();
      reader.onload = function(){
      	setConfig("TEMP_MOD",this.result);
      	setConfig("MOD",this.result);
        location.reload();
      };
      reader.readAsDataURL(input.files[0]);
    }
    function ResetMods(){
      var r = confirm("The page will refresh. Continue?");
      if (r == true) {
        setConfig("MOD","false");
        location.reload();
      }
    }

    function PlayVideo(i){
      if(i===undefined){return;}
      self.parent.window.PlayVideom(i);
    }
  </script>
</head>
<body class="unselectable" translate="no">
  <p class="clickable" style="z-index:100;color:white;text-decoration:underline;position:fixed;top:0;right:0;" onmouseup="LookArt()">Look art</p>

  <table>
    <tr>
      <td style="width:60vw;vertical-align: top;">
        <div id="_p_notes" class="lpanel">
          <h1>Patch notes:</h1>
          <h2 style="color:#CD0000;" class="__version"></h2><br/>
          ******************************************
          <p style="white-space:pre-wrap;"><?php echo file_get_contents("pathnotes.txt"); ?></p>
          ******************************************<br/><br/>
        </div>

        <div id="_p_creds" class="lpanel">
          <h1>Credits:</h1><br/>
          <p>
            Bruno Castro [<a href="mailto:bruneo32b@gmail.com" target="_blank">bruneo32b@gmail.com</a>]
          </p><br/>
          <br/>
          <h1>Licenses:</h1><br/>
          <div style="white-space:pre-wrap;text-align:justify;"><?php echo file_get_contents("licenses.txt"); ?></div>
        </div>

        <div id="_p_settings" class="lpanel">
          <h1>Client settings</h1><br/><br/>

          <h2>Video settings</h2>
          <p>
          Fullscreen:
          	<label class="checkbox">
          	  <input onchange="goFullscreen(document.documentElement)" type="checkbox" id="_sett_fs"/>
          	  <span></span>
          	</label>
          </p>

          <h2>Audio settings</h2>
          <p>
            Mute:
          	<label class="checkbox">
          	  <input onchange="ToogleMute()" type="checkbox" id="_sett_mute"/>
          	  <span></span>
          	</label>
            <br/>
            Music volume: <input oninput="SlideMsc()" type="range" min="1" max="100" value="100" class="slider" id="_sett_mscvol"><br/>
            SFX volume: <input oninput="SlideSFX()" type="range" min="1" max="100" value="100" class="slider" id="_sett_sfxvol"><br/>
          </p>

          <h2>Mod settings</h2>
          <p>
            Auto load mod <span class="aski" data-text="The last used mod will be loaded automatically when the game starts."></span>:
          	<label class="checkbox">
          	  <input onchange="ToogleALM()" type="checkbox" id="_sett_alm"/>
          	  <span></span>
          	</label>
          </p>
        </div>

        <div id="_p_singlep" class="lpanel">
          <h1>Singleplayer</h1><br/>
          <p style="padding-bottom:0;">
            <a onmouseup="PlayVideo(1)"> &#9705; How to setup the server</a><br/>
            <a onmouseup="PlayVideo(2)"> &#9705; How to play</a>
            <br/>
            <br/>
            <a target="_blank" href="https://colab.research.google.com/drive/1O4OMLX72ojYiGzziAHbhqTOOPokC9Iqd?usp=sharing&hl=en">Start server in Google Colab&nbsp;&nbsp;&#8684;</a>
          </p>
          <p style="padding-top:0;">
            <button id="_splay" onmouseup="location='game.php'" disabled>Play</button>
          </p>
          <script type="text/javascript">
            function _ss(){
              var d=getConfig("server/running");
              document.getElementById("_splay").disabled = (d!=="Ok!") ? true:false;
              setTimeout(_ss,100);
            }
            _ss();
          </script>
        </div>

        <div id="_p_mods" class="lpanel">
          <h1>MODS</h1><br/>
          <button style="width:144px;height:31px;font-size:14px;" onmouseup="ResetMods()">Reset mod</button><br/>
          <br/><hr/><br/>
          <h2>Official mods</h2><br/>
          <div class="modcontainer">

            <div>
              <h2>Sci-fi</h2>
              <p>Descripción super mega gay</p>
              <button>Install</button>
            </div>

            <div>
              <h2>Sci-fi</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor ultrices sapien eget bibendum. Sed ut massa orci. Cras pellentesque eleifend ipsum nec aliquet. Etiam volutpat velit ut volutpat sollicitudin. Sed ex tellus, mollis ut turpis in, vulputate imperdiet tellus. Fusce viverra varius justo sit amet ornare. Sed id ante placerat dui sollicitudin imperdiet sit amet ut velit. Suspendisse potenti.
              </p>
              <button>Install</button>
            </div>

          </div><br/>
          <hr/>
          <p>
            <p>
              You can load a MOD from your computer, click the following button and seek for the main CSS file of the mod you want.
            </p>
            <label for="mod-upload" class="button">Load from computer</label>
            <input id="mod-upload" onchange='LoadMod(event)' accept="text/css" type="file"/>
          </p>
        </div>
        <div id="_p_login" class="lpanel">
          <h1>Log in</h1>
          <form action="php/login.php" method="post">
            <input type="text" placeholder="Username..." name="p_username" value="" required/><br>
            <input type="password" placeholder="Password..." name="p_password" value="" required/><br>
            <br>
            <input class="button" type="submit" value="Log in"/>
          </form>
          <hr>
          <br/>
          <h1>Sign Up</h1>
          <form action="php/login.php" method="post">
            <input type="text" placeholder="Username..." name="p_username" value="" required/><br>
            <input type="email" placeholder="Email..." name="p_email" value="" required/><br>
            <input type="password" placeholder="Password..." name="p_password" value="" required/><br>
            <input type="password" placeholder="Confirm password..." name="p_rpassword" value="" required/><br>
            <br>
            <input class="button" type="submit" value="Sign Up"/><br>
            <a target="_blank" href="#">Get premium account&nbsp;&nbsp;&#8684;</a>
          </form>
          <br/>
        </div>

      </td>
      <td style="width:40vw;">
        <h1>Rol Ball</h1><br/><br/>
        <button onmouseup="alert('a')" disabled="true">Multiplayer <span class="aski" data-text="Requires login with an account."></span></button><br/>
        <button onmouseup='ShowPanel("_p_singlep")'>Singleplayer</button><br/>
        <button onmouseup='ShowPanel("_p_mods")'>Mods</button><br/>
        <button onmouseup='ShowPanel("_p_settings")'>Settings</button><br/>
        <br/>
        <button onmouseup='ShowPanel("_p_login")'>Log in / Sign up</button>

        <a target="_blank" href="https://www.retronomicon.com"><img style="position:fixed;top:0;left:0;height:32px;" src="res/bannerComp.png" class="clickable" alt=""></a>
        <div class="clickable" onmouseup='ShowPanel("_p_creds")' style="position:fixed;bottom:0;left:0;background:#000;padding:4px 16px 4px 8px;border:1px solid #666;border-bottom: none;border-left: none;border-radius:0 16px 0 0;">
          <img style="width:24px;padding:4px;" src="res/credits.png" alt=""/>
          Licenses & Credits
        </div>
        <div class="clickable" onmouseup='ShowPanel("_p_notes")' style="position:fixed;bottom:0;right:0;background:#000;padding:4px 16px 4px 16px;border:1px solid #666;border-bottom: none;border-right: none;border-radius:16px 0 0 0;">
          <img style="width:32px;" src="res/icon.png" alt=""/>
          Patch Notes (<span style="color:#CD0000;" class="__version"></span>)
        </div>
      </td>
    </tr>
  </table>
  <script type="text/javascript">
    if(getConfig("mute") != "false"){
      self.parent.document.getElementById("msc").muted = true;
      self.parent.document.getElementById("sfx").muted = true;
      document.getElementById("_sett_mute").checked = true;
    }
    if(getConfig("mscvol") != "false"){
      document.getElementById("_sett_mscvol").value = parseInt(getConfig("mscvol"));
      self.parent.document.getElementById("msc").volume = parseInt(getConfig("mscvol"))/100;
    }
    if(getConfig("sfxvol") != "false"){
      document.getElementById("_sett_sfxvol").value = parseInt(getConfig("sfxvol"));
      self.parent.document.getElementById("sfx").volume = parseInt(getConfig("sfxvol"))/100;
    }
    if(getConfig("autoloadmod") != "false"){
      document.getElementById("_sett_alm").checked = true;
    }

    if(CheckFullscreen()) {
      document.getElementById("_sett_fs").checked="true";
    }
    document.addEventListener("fullscreenchange",function(){
      if(CheckFullscreen()) {
        document.getElementById("_sett_fs").checked="true";
      }else{
        document.getElementById("_sett_fs").checked="false";
      }
    });
    document.addEventListener("mousedown",function(){
      PlaySound("click");
    });

    ShowPanel("_p_notes");
    var _vs=document.getElementsByClassName("__version");
    for(var i=0;i<_vs.length;i++){
      _vs[i].innerHTML="v-"+getVersion();
    }

    minimsg_gen();
    ChangeBack();
    moveBack();
  </script>
</body>
</html>
