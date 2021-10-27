<!DOCTYPE html>
<html lang="en" dir="ltr" class="notranslate" translate="no">
<head>
  <meta charset="utf-8"/>
  <title>Rol Ball</title>
  <link rel="shortcut icon" type="image/x-icon" href="res/icon.png"/>

  <link rel="stylesheet" href="style.css"/>
  <link rel="stylesheet" href="game.css"/>

  <link id="__modCSS" rel="stylesheet" href=""/>

  <script src="core.js" charset="utf-8"></script>

  <script type="text/javascript">
    if(self==top){location="index.html";}
    var IAturn=false;

    function ScrollBot(){
      document.getElementById("textarea").scrollTop = document.getElementById("textarea").scrollHeight + 32;
    }
    function TACheckScroll(){
      var ta=document.getElementById("textarea");
      if(ta.scrollTop < ta.scrollHeight - ta.offsetHeight){
        document.getElementById("_rebot").style.display="block";
      }else{
        document.getElementById("_rebot").style.display="none";
      }
    }
    function ShowPanel(ind){
      var paneles=document.getElementsByClassName("lpanel");
      for(var i=0;i<paneles.length;i++){
        paneles[i].style.top="100vh";
      }
      if(ind===null || ind===undefined || ind===""){document.getElementById("__phand").style.display="none";return;}

      document.getElementById("__phand").style.display="block";
      if(document.getElementById(ind.toString()).style.top != "100vh"){return;}
      setTimeout(function(){document.getElementById(ind.toString()).style.top="calc(50vh - 180px)";}, 200);
      PlaySound("page");
    }
    function ToogleDisplay(e,n){
      if(e === undefined){return;}
      if(n === undefined){n="block";}

      var elem = document.getElementById(e.toString());
      if(elem.style.display.toString().trim() != "none"){
        document.getElementById(e.toString()).style.display="none";
      }else{
        document.getElementById(e.toString()).style.display=n.toString();
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

    function _Speak(){
      if(IAturn){return;}
      var name=document.getElementById("__ip_name").value;
      var text=document.getElementById("__ip_text").value;
      if(name=="" || text==""){return;}

      document.getElementById("textarea").value+="\n"+name+": "+text+"\n";
      document.getElementById("__ip_text").value="";
      ScrollBot();
    }
    function _Action(){
      if(IAturn){return;}
      var name=document.getElementById("__ip_name").value;
      var text=document.getElementById("__ip_text").value;
      if(name=="" || text==""){return;}

      document.getElementById("textarea").value+="\n*"+name+" "+text+"*\n";
      document.getElementById("__ip_text").value="";
      ScrollBot();
    }

    function CANCEL(){
      if(!IAturn){return;}
      setConfig("server/gptext","<|cancel|>");
      setConfig("server/rec",""); // Ver RECIEVE
    }
    function SEND(){
      if(IAturn){return;}
      var a=document.getElementById("textarea").value;
      if(a !== ""){
        setConfig("server/rec","false");
        setConfig("server/gptext",a);
        IAturn=true;
        document.getElementById("textarea").disabled=IAturn;
        document.getElementById("__ip_name").disabled=IAturn;
        document.getElementById("__ip_text").disabled=IAturn;
        document.getElementById("__btn_spk").disabled=IAturn;
        document.getElementById("__btn_act").disabled=IAturn;
        document.getElementById("__btn_gen").style.display="none";
        // document.getElementById("__btn_gen").innerHTML="Cancel";
        // document.getElementById("__btn_gen").onmouseup=CANCEL;

        document.getElementById("spinner").style.display="inline-block";
        ScrollBot();
      }
    }
    function RECIEVE(){
      var a=getConfig("server/rec");
      if(a !== "false"){
        setConfig("server/rec","false");
        document.getElementById("textarea").value+=a;
        IAturn=false;
        document.getElementById("textarea").disabled=IAturn;
        document.getElementById("__ip_name").disabled=IAturn;
        document.getElementById("__ip_text").disabled=IAturn;
        document.getElementById("__btn_spk").disabled=IAturn;
        document.getElementById("__btn_act").disabled=IAturn;
        document.getElementById("__btn_gen").style.display="inline-block";
        // document.getElementById("__btn_gen").innerHTML="GENERATE";
        // document.getElementById("__btn_gen").onmouseup=SEND;

        document.getElementById("spinner").style.display="none";
        ScrollBot();
      }
      setTimeout(RECIEVE,100);
    }
    function SST(){
      document.getElementById("_serverState").innerHTML="AI Server State: "+getConfig("server/running");
      setTimeout(SST,100);
    }

    function GotoMenu(){
      location="menu.php";
    }
    function savegame(){
      var filename=prompt("Filename to save:","myrolgame");
      if (filename === null) {return;}
      if(filename.substr(-4, 5)!=".rol"){filename+=".rol";}
      var text=document.getElementById("textarea").value;

    	var element = document.createElement('a');
    	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    	element.setAttribute('download', filename);

    	element.style.display = 'none';
    	document.body.appendChild(element);

    	element.click();

    	document.body.removeChild(element);
      ShowPanel();
    }
    function loadgame(){
    	var input = event.target;
      var reader = new FileReader();
      reader.onload = function(){
        document.getElementById("textarea").value=this.result;
      };
      reader.readAsText(input.files[0]);
      ShowPanel();
    }
    var _gs_s="";
    function loadgameserver(){
      if(document.getElementById("_loadserverbtn").innerHTML==="Select one above"){return;}

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("textarea").value = this.responseText;
          ShowPanel();
          _gs_s="";
          document.getElementById("_loadserverbtn").innerHTML="Select one above";
        }
      };
      xmlhttp.open("GET", "roles/"+_gs_s, true);
      xmlhttp.send();
    }
    function _gs(s){
      document.getElementById("_loadserverbtn").innerHTML="Load "+s.toString();
      _gs_s=s.toString();
    }
  </script>
</head>
<body class="unselectable" translate="no">
  <div class="bodyback"></div>

  <span id="_serverState" style="color:white;font-size:12px;margin-left:8px;" class="df"></span>
  <textarea id="textarea" onscroll="TACheckScroll()" autocomplete="off" autocorrect="off" spellcheck="false" autofocus></textarea>
  <div id="_rebot" onmouseup="ScrollBot()"></div>

  <table id="inpute">
    <tr>
      <td style="width:1px;padding:16px 0 16px 16px;">
        <div class="gridi">
          <div>
            <img onmouseup="ShowPanel('_p_save')" style="width:32px;height:32px;" class="clickable" src="res/gui/icons/save.png" alt=""/>
          </div>
          <div>
            <img onmouseup="ShowPanel('_p_load')" style="width:32px;height:32px;" class="clickable" src="res/gui/icons/load.png" alt=""/>
          </div>
          <div>
            <img onmouseup="ShowPanel('_p_settings')" style="width:32px;height:32px;" class="clickable" src="res/gui/icons/config.png" alt=""/>
          </div>
          <div>
            <img onmouseup="ShowPanel('_p_exit')" style="width:32px;height:32px;" class="clickable" src="res/gui/icons/exit.png" alt=""/>
          </div>
        </div>
      </td>
      <td>
        <div id="__ip_speak">
          <input style="color:var(--gb-back);" id="__ip_name" type="text" maxlength="20" placeholder="Name..." value="Link"/autocomplete="off" autocorrect="on">
          <input style="width: calc(100% - 64px - 16px - 4px);border:none;" id="__ip_text" type="text" maxlength="999" placeholder="Say..." autocomplete="off" autocorrect="on" spellcheck="true"/>
        </div>

        <button id="__btn_spk" onmouseup="_Speak()">Speak</button>
        <button id="__btn_act" onmouseup="_Action()">Action</button>

        <div style="float:right;">
          <button id="__btn_gen" onmouseup="SEND()">GENERATE</button>
          <span class="c-spinner" style="display: none;" id="spinner"></span>
        </div>
      </td>
      <td style="width: 227px;">
        <img class="clickable" onmouseup="goFullscreen(this);" id="__ai_img" src="res/backs/story9_14_full.jpg" alt=""/>
      </td>
    </tr>
  </table>


  <div id="__phand" onmouseup="ShowPanel()"></div>
  <div id="_p_save" class="lpanel">
    <h2>Do you want to download the current game to your computer?</h2><br/><br/>
    <button onmouseup="savegame()">YES</button><br/>
    <button onmouseup="ShowPanel()">NO</button>
  </div>
  <div id="_p_load" class="lpanel">
    <h2>Load a game (.rol) from your computer</h2><br/><br/>
    <label for="load_game" class="button">Load from computer</label>
    <input id="load_game" onchange='loadgame(event)' accept=".rol,.txt" type="file"/>
    <br/><hr><br/>
    <h3>Or load an example to start a new adventure</h3><br/>
    <ul>
      <?php
        $files = glob("roles/*.rol");
        for($i = 0; $i < count($files); $i++){
          $file_name = basename($files[$i]);
          echo "<li onmouseup=\"_gs(this.innerHTML)\">".$file_name."</li>";
        }
      ?>
    </ul>
    <button onmouseup="loadgameserver()" id="_loadserverbtn">Select one above</button>
  </div>
  <div id="_p_settings" class="lpanel">
    <h1>Client settings</h1><br/><br/>

    <h2>Video settings</h2>
    <p>
    Fullscreen:
      <label class="checkbox">
        <input onchange="ChangeFullScreen()" type="checkbox" id="_sett_fs"/>
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
      Music volume: <input onchange="SlideMsc()" type="range" min="1" max="100" value="100" class="slider" id="_sett_mscvol"><br/>
      SFX volume: <input onchange="SlideSFX()" type="range" min="1" max="100" value="100" class="slider" id="_sett_sfxvol"><br/>
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
  <div id="_p_exit" class="lpanel">
    <h2>Do you want to exit to the main menu?</h2>
    <h3>You should save the game first.</h3><br><br>
    <button onmouseup="GotoMenu()">YES</button><br/>
    <button onmouseup="ShowPanel()">NO</button>
  </div>


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
      // cosas de mods
    }
    if(getConfig("MOD") != "false"){
      document.getElementById("__modCSS").href = getConfig("MOD");
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
    document.getElementById("__ip_text").addEventListener("keypress",function(e){
      var key = e.keyCode;
      if(key === 13){ // ENTER
        if(e.shiftKey){_Action();return;}
        _Speak();
      }
    });

    ScrollBot();
    ShowPanel();
    minimsg_gen();
    RECIEVE();
    SST();
  </script>
</body>
</html>
