if(self==top){location="index.html";}

// Reemplazar textos con traducción
const lang_elms = document.querySelectorAll("[data-polyglot]");
lang_elms.forEach(el=>{
   WriteLang(el);
});


/* PACE CONTROL */
var cont=0;
var prevprog=0;
function changeTextLoad(){
	var pacepr = document.getElementsByClassName("pace-progress")[0];
  if(pacepr===null){changeTextLoad();return;}
	document.getElementById("paceH1").innerHTML = pacepr.getAttribute("data-progress-text");

	// FIN
	var prog = parseInt(pacepr.getAttribute("data-progress"));

  if(prog===prevprog){cont++;}
  if(cont>6){
    // Si se peta
    prog=99;
  }

	if(prog == 99){
  	document.getElementById("paceH1").style.display="none";
		document.getElementById("xd").children[0].style.animationName="xd_anim";
		document.getElementById("xd").children[1].style.animationName="xd_anim";
    setTimeout(function (){
        document.documentElement.style.setProperty("--boxShadow","none");
    }, 100);

    if(CLOC.toString().indexOf("index") != -1){document.getElementById("animbk").style.animation="0.6s ease 1s forwards menu_anim";} else if(CLOC.toString().indexOf("game") != -1){StartGame();}

		return;
	}
  prevprog=prog;
	setTimeout(changeTextLoad, 64);
}
changeTextLoad();
