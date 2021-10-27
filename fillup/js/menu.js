function Play(){
  Transition("game.html");
}
function ShowPanel(ind){
  if(ind=="menu"){
    document.getElementById("animbk").style.background="#00FFFF";
    Sonidito(1);
  }else{
    document.getElementById("animbk").style.background="#FF00FF";
    Sonidito();
  }

  var paneles=document.getElementsByClassName("panel");
  for(var i=0;i<paneles.length;i++){
    if(paneles[i].id=="menu"){continue;}
    paneles[i].style.left="100vw";
  }
  document.getElementById(ind.toString()).style.left="0px";
}
function SonidoImg(){
  if(getConfig("snd") == "true"){
    document.getElementById("btn_sonido").children[0].src="res/audiomute.png";
    setConfig("snd","false");
  }else{
    document.getElementById("btn_sonido").children[0].src="res/audio.png";
    setConfig("snd","true");
  }
  Sonidito();
}

function Sonidito(n){
  switch(n){
    case 1:
      (new SoundPlayer(a)).play(480, 0.5, "triangle").setFrequency(0, 0.1).stop(0.2);
    break;
    default:
      (new SoundPlayer(a)).play(640, 0.5, "triangle").setFrequency(0, 0.1).stop(0.2);
    break;
  }
}
