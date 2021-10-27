const VERSION = 0.1;
function getVersion(){return VERSION.toPrecision(2).toString();}

const CFG_PREFIX="rolball/";
function existConfig(s,type_session){
  var e;
  if(type_session===undefined){e=window.localStorage;}else{e=window.sessionStorage;}

	return e.getItem(CFG_PREFIX+s.toString())!==null ? true : false;
}
function setConfig(s,n,type_session){
  var e;
  if(type_session===undefined){e=window.localStorage;}else{e=window.sessionStorage;}

	e.setItem(CFG_PREFIX+s.toString(),n.toString());
}
function getConfig(s,type_session){
  var e;
  if(type_session===undefined){e=window.localStorage;}else{e=window.sessionStorage;}

	if(!existConfig(s.toString(),type_session)){setConfig(s.toString(),"false",type_session);return "false";}
	return e.getItem(CFG_PREFIX+s.toString());
}
function remConfig(s,type_session){
  var e;
  if(type_session===undefined){e=window.localStorage;}else{e=window.sessionStorage;}

	if(!existConfig(s.toString(),type_session)){return null;}
	return e.removeItem(CFG_PREFIX+s.toString());
}

if(!existConfig("mute")){setConfig("mute","false");}
if(!existConfig("mscvol")){setConfig("mscvol","100");}
if(!existConfig("sfxvol")){setConfig("sfxvol","100");}
if(!existConfig("MOD")){setConfig("MOD","false");}
if(!existConfig("autoloadmod")){setConfig("autoloadmod","false");}

function cssRootGet(s){
  return getComputedStyle(document.documentElement).getPropertyValue(s.toString()).toString().replace(/\\\\n/g,"\n");
}

function CheckFullscreen(){
  return (window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height);
}
function goFullscreen(elem){
  /* View in fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  if(CheckFullscreen()){closeFullscreen();}else{openFullscreen();}
}

function PlaySound(s){
  var doc;
  if(self==top){doc=document.documentElement;}else{doc=self.parent.document}
  doc.getElementById("sfx").src="res/audio/"+s.toString()+".mp3";
  doc.getElementById("sfx").currentTime=0;
  doc.getElementById("sfx").play();
}

function minimsg_gen(){
  var minimsg = document.getElementsByClassName("aski");
  for(var i=0;i<minimsg.length;i++){
    minimsg[i].innerHTML+="&#10068;";
    minimsg[i].innerHTML+="<div>"+minimsg[i].getAttribute("data-text")+"</div>";
    minimsg[i].addEventListener("mouseenter",function(event){
      this.children[0].style.display="block";
      this.children[0].style.top=event.clientY-8+"px";
      this.children[0].style.left=event.clientX+"px";
      this.children[0].style.transform="translate(-50%,-100%)";
    });
    minimsg[i].addEventListener("mouseleave",function(){
      this.children[0].style.display="none";
    });
  }
}

function desanitize(text) {
  return text.slice(1,-1).replace(/\\\\n/g, "\\n").replace(/\\\\'/g, "'");
}
function anitize(text) {
  return text.replace(/\n/g, "\\n").replace(/\'/g, "'");
}
