var yp=0,yinc=10,incr=0, TNT=false;
var minsp=2;maxsp=7;
var PAUSE=false;

var CANBACK=false;

const HSCORE=300;
const rec_hscore=getConfig("hscore");
var rec_rscore=getConfig("rscore"); // esta no va a ser constante
var SCORE=0;
var racha=0;

var S1="FILL",S2="UP";
var audFunc="triangle";
var sumVol = 0;

function SonidoImg(){
	// Heredado de menu.js
  if(getConfig("snd") == "true"){
    document.getElementById("btn_sonido").children[0].src="res/audiomute.png";
    setConfig("snd","false");
  }else{
    document.getElementById("btn_sonido").children[0].src="res/audio.png";
    setConfig("snd","true");
  }
}

function StartGame(){
  setTimeout(function (){
  	NextGame();
  	document.getElementById("toprect").style.top="0px"; // 256 minimo
  }, 1111); // Un poco más de la duracion de #xd
}
function NextGame(){
	TNT=false;
	yp=0;
	yinc=Math.floor((Math.random() * maxsp) + minsp); // Numero aleatorio (entero) entre 2 y 10

	if(SCORE!=0){document.getElementById("toprect").style.top=Math.floor((Math.random() * (doch-256)))+"px";} // 256 minimo
	else{yinc=3;}
	ResizeBot();
}
function ResizeBot(){
	if(TNT){NextGame();return;}
	if(PAUSE){setTimeout(ResizeBot, 10);return;}

	// Cambiar altura
	document.getElementById("botrect").style.height=(64+yp)+"px";
	yp+=yinc;

	// Comprobar si ha llegado arriba
	if(document.getElementById("botrect").offsetTop <= 0){
		NextGame();
		return;
	}

	// Siguiente ciclo
	setTimeout(ResizeBot, 10);
}

function CheckCollision(e){
	if(PAUSE){return;}
	if(e.which==3){return;}

	var topr=document.getElementById("toprect");
	var botr=document.getElementById("botrect");
	if(botr.offsetTop >= topr.offsetTop && botr.offsetTop < topr.offsetTop+topr.offsetHeight){
		Scoree(1);
	}else{
		Anim_Error();
	}
	TNT=true;
}

function Scoree(p){
  sumVol=1; // EL sonido por defecto de marcar un punto
	SCORE+=p;
	racha++;

  // Grabar records
	if(SCORE>rec_hscore){
		setConfig("hscore",SCORE);
		document.getElementById("hmsg").style.display="inline-block";
		document.getElementById("hmsg").children[1].innerHTML=SCORE;
    setTimeout(function(){document.getElementById("hmsg").style.transform="none";}, 1);
    sumVol++;
	}

	if(racha>=3){
    document.getElementById("rmsg").style.display="inline-block";
		document.getElementById("rmsg").children[1].innerHTML=racha;
    setTimeout(function(){document.getElementById("rmsg").style.transform="none";}, 1);
    sumVol++;
	}
	if(racha>rec_rscore){
		rec_rscore=racha;
		setConfig("rscore",racha);
	}

  // Mensajes
	switch(SCORE){
		case HSCORE: // Modo hardcore
			minsp=6;
			maxsp=12;
			audFunc="sawtooth";
			document.body.style.background="#999";
			document.getElementById("toprect").style.background="#FFF";
			document.getElementById("botrect").style.background="#000";
			S1="HARD";S2="CORE";
		break;
		case 13:
			S1="FRIDAY";S2="DUDES";
		break;
		case 66:
			S1="O H";S2="G G";
		break;
		case 333:
			S1="H A L F";S2="S A T A N"
		break;
		case 666:
			S1="S A T A";S2="N I C !"
		break;
		case 69:
    case 420:
			S2=S1="N I C E";
		break;
		case 96:
			S2=S1="E C I N";
		break;
		case 112:
			S1="🚨";S2="🚑";
		break;
		default:
			if(SCORE<HSCORE){
				S1="FILL";S2="UP";
			}else{
				S1="HARD";S2="CORE";
			}
		break;
	}
	if(SCORE%50===0 && SCORE!=300){
    // sonidito 50
		S1="WOW";S2="PTS";
	}
	if(SCORE>2 && (SCORE & (SCORE - 1)) === 0){// Potencia de 2
		S1="POWER";S2="OF 2!";
	}


  if(SCORE%10===0){
    // 100, 50 y 10
    sumVol++;
  }

  // Sonidos
  if(racha>=3){
    var soni=(new SoundPlayer(a)).play(220+10*racha, 1/sumVol, "triangle")
    if(racha==3){
      soni.setFrequency(880, 0.1);
    }
    soni.stop(0.2);
  }
	if(SCORE>rec_hscore){
    (new SoundPlayer(a)).play(210, 1/sumVol, "sine").setFrequency(430, 0.1).stop(0.2);
  }
  if(SCORE%100===0){
    (new SoundPlayer(a)).play(740, 1/sumVol, audFunc).stop(0.2);
  }else if(SCORE%50===0){
    (new SoundPlayer(a)).play(640, 1/sumVol, audFunc).stop(0.2);
	}else if(SCORE%10===0){
    (new SoundPlayer(a)).play(540, 1/sumVol, audFunc).stop(0.2);
  }
	(new SoundPlayer(a)).play(440, 1/sumVol, audFunc).setFrequency(880, 0.1).stop(0.2);
  sumVol=0;

	document.getElementById("scoreLabel").innerHTML=S1+" · <span class=\"HL\">"+SCORE+"</span> · "+S2;
}

function Anim_Error(){
  sumVol++; // Sonido por defecto de fallar
  if(racha>=3){
    sumVol++;
  	(new SoundPlayer(a)).play(440+10*racha, 1/sumVol, "triangle").setFrequency(220, 0.1).stop(0.2);
  }
	racha=0;
  document.getElementById("rmsg").style.transform="translate(0, calc(100% + 16px))";
	setTimeout(function(){document.getElementById("rmsg").style.display="none";}, 200);

	if(SCORE<HSCORE){
		document.body.style.background="#FF9999";
	}else{
		document.body.style.background="#666";
	}

	setTimeout(function(){
		if(SCORE<HSCORE){
			document.body.style.background="#FFF";
		}else{
			document.body.style.background="#999";
		}
	},200);
  (new SoundPlayer(a)).play(440, 1/sumVol, audFunc).setFrequency(220, 0.1).stop(0.2);
  sumVol=0;
}

function Pausa(){
	if(PAUSE){
		document.getElementById("pauseDiv").style.display="none";
  	PAUSE=false;
	}else{
		document.getElementById("pauseDiv").style.display="block";
  	PAUSE=true;
	}
}
function IrAMenu(){
  CANBACK=true;
	Transition("menu.html");
}
