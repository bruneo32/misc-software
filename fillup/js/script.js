const VERSION = 0.9;
function getVersion(){return VERSION.toPrecision(2).toString();}
var doch = "innerHeight" in window ? window.innerHeight: document.documentElement.offsetHeight; // Altura de la pantalla

function recalcHeight(){
	doch = "innerHeight" in window ? window.innerHeight: document.documentElement.offsetHeight; // Altura de la pantalla
}
function goFullscreen() {
  var elem = document.documentElement;

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

  if(document.webkitIsFullScreen){closeFullscreen();}else{openFullscreen();}
}



/* CHECK CHROME */
const navInfo = window.navigator.appVersion.toString().toLowerCase();
function isChrome(){
	if(navInfo.indexOf('chrome') != -1){return true;}
	return false;
}
/* CHECK ANDROID */
function isMobile(){
	if(navInfo.indexOf('mobile') != -1){return true;}
	return false;
}
function isAndroid(){
	if(isMobile() && navInfo.indexOf('android') != -1){return true;}
	return false;
}
if(location.toString().indexOf("?apkey") != -1){sessionStorage.setItem("isAPK","true");sessionStorage.setItem("androidAsked","true");}

/* CONFIGURACIONES */
const CFG_PREFIX="fillup/";
function existConfig(s){
	return localStorage.getItem(CFG_PREFIX+s.toString())!==null ? true : false;
}
function getConfig(s){
	if(!existConfig(s.toString())){return null;}
	return localStorage.getItem(CFG_PREFIX+s.toString());
}
function setConfig(s,n){
	localStorage.setItem(CFG_PREFIX+s.toString(),n.toString());
}
function remConfig(s){
	if(!existConfig(s.toString())){return null;}
	return localStorage.removeItem(CFG_PREFIX+s.toString());
}

// CREAR CONFIGURACIONES
if(!existConfig("snd")){setConfig("snd","true");}
if(!existConfig("hscore")){setConfig("hscore","0");}
if(!existConfig("rscore")){setConfig("rscore","0");}
if(!existConfig("lang")){
	const browLang = (navigator.language || navigator.userLanguage).toString().replace("-","");

	const LC="enUS enGB,frFR,esES esAR esMX,deDE deCH deAT,itIT itCH,ptBR,ptPT,ruRU,elGR,trTR,daDK,noNB,svSE,nlNL,plPL,fiFI,jaJP,zhCN zhSG,zhTW zhHK zhMO,koKR,csCZ,huHU,roRO,thTH,bgBG,heIL,ar001,bsBS".split(",");

	for(var i=0;i<LC.length;i++){
		if(LC[i].indexOf(browLang)!=-1){
			setConfig("lang", i);
			break;
		}
	}
}

/* TRANSICION */
function Transition(urlTo){
	document.documentElement.style.setProperty("--boxShadow","inset 0 0 80px 80px rgba(0,0,0,0.1)");
	document.getElementById("xd").children[0].style.animationName="xd_anim2";
	document.getElementById("xd").children[1].style.animationName="xd_anim2";

	(new SoundPlayer(a)).play(640, 0.5, "triangle").setFrequency(0, 0.1).stop(0.2);
	setTimeout(function(){location=urlTo.toString();}, 1111);
}

/* CSV COPIADO Y PEGADO*/
var LANG_ARRAY = {
	"LANGUAGE_DIRECTION": "ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,ltr,rtl,rtl,ltr",
	"LANGUAGE_EN": "English,French,Spanish,German,Italian ,Portuguese (Brazil),Portuguese,Russian,Greek,Turkish,Danish,Norwegian,Swedish,Dutch,Polish,Finnish,Japanese,Simplified Chinese,Traditional Chinese,Korean,Czech,Hungarian,Romanian,Thai,Bulgarian,Hebrew,Arabic,Bosnian",
	"MENU_LABEL_LANGUAGE": "Language,Langue,Idioma,Sprache,Lingua,Idioma,Linguagem,Язык,Γλώσσα,Dil,Sprog,Språk,Språk,Taal,Jezyk,Kieli,言語,语言,語言,언어,Jazyk,Nyelv,Limbă,ภาษา,Език,שפה,اللغة,Jezik",
	"MENU_LABEL_PLAY": "Play,Jouer,Jugar,Spielen,Gioca,Jogar,Jogar,Играть,Παίξε,Oyna,Spil,Spill,Spela,Spelen,Zagraj,Pelaa,プレイ,开始,開始,플레이,Hrát,Játszás,Joacă,เล่น,Пускане,התחל,لعب,Igraj",
	"MENU_LABEL_OK": "OK,OK,Ok,OK,Ok,Ok,Ok,ОК,ΟΚ,TAMAM,OK,OK,OK,OK,OK,OK,OK,OK,OK,확인,OK,OK,OK,ตกลง,Добре,טוב,موافق,Ok",
	"MENU_LABEL_PAUSED": "Paused,En pause,Pausado,Pausiert,In pausa,Pausado,Em Pausa,Приостановлено,Σε παύση,Durduruldu,Pauset,Pauset,Pausat,Gepauzeerd,Pauza,Pysäytetty,ポーズ中,暂停中,暫停中,일시 정지됨,Pozastaveno,Szünetelve,Suspendat,หยุด,Пауза,מושהה,متوقف,Pauzirano",
	"MENU_LABEL_CONTINUE": "Continue,Continuer,Continuar,Fortsetzen,Continua,Continuar,Continuar,Продолжить игру,Συνέχεια,Devam Et,Fortsæt,Gå videre,Fortsätt,Doorgaan,Kontynuuj,Jatka,続ける,继续,繼續,계속,Pokračovat,Folytatás,Continuă,เล่นต่อ,Продължаване,המשך,متابعة,Nastaviti",
	"MENU_LABEL_RETURN_MAIN": "Return to Main Menu,Retourner au menu principal,Volver al menú principal,Zurück zum Hauptmenü,Ritorna al menù principale,Retornar ao Menu Principal,Regressar ao Menu Principal,Вернуться в главное меню,Επιστροφή στο Κεντρικό Μενού,Ana Menü'ye geri dön,Tilbage til hovedmenuen,Gå til hoved meny,Återgå till huvudmeny,Terug naar hoofdmenu,Powrót do Menu Głównego,Palaa päävalikkoon,メインメニューに戻る,返回至主界面,返回至主界面,메인 메뉴로 돌아가기,Vrátit se na hlavní menu,Vissza a főmenüre,Întoarcere către meniul principal,กลับเมนูหลัก,Обратно към главното меню,חזור למסך הראשי,عودة إلى القائمة الرئيسية,Natrag na Glavni Meni",
	"MAME_OBJECTIVE_HIGH_SCORE" : "High score,Meilleur score,Puntuación máxima,Höchstpunktzahl,Record di punti,Recorde,Pontuação Máx.,Рекорд,High Score,Yüksek Skor,Højeste point,Høyeste poeng,Poängrekord,Topscore,Rekord,Paras tulos,ハイスコア,最高评分,最高分,최고 점수,Nejvyšší úroveň,Legjobb pontszámok,Cel mai mare scor,คะแนนสูงสุด,Рекорд,שיא נקודות,النقاط العليا,Najbolji Rezultat",
	"MENU_LABEL_CREDITS": "Credits,Remerciements,Créditos,Credits,Crediti,Créditos,Créditos,Авторы,Συντελεστές,Künye,Credits,Medvirkende,Medverkande,Credits,Twórcy,Lopputekstit,クレジット,致谢,製作群,제작진,Autoři,Készítők,Credite,เครดิต,Заслуги,תודות,القائمون على اللعبة,Kediti",

	"GAME_OBJECTIVE_HIGH_SCORE": "High score,Meilleur score,Puntuación máxima,Höchstpunktzahl,Record di punti,Recorde,Pontuação Máx.,Рекорд,High Score,Yüksek Skor,Højeste point,Høyeste poeng,Poängrekord,Topscore,Rekord,Paras tulos,ハイスコア,最高评分,最高分,최고 점수,Nejvyšší úroveň,Legjobb pontszámok,Cel mai mare scor,คะแนนสูงสุด,Рекорд,שיא נקודות,النقاط العليا,Najbolji Rezultat",

	"CREDITS_DEVELOPED_BY": "Developed by,Développé par,Desarrollado por,Entwickelt von,Sviluppato da,Desenvolvido por,Desenvolvido por,Разработано,Φτιάχτηκε από:,Geliştiren,Udviklet af,Utviklet av,Utvecklat av,Ontwikkeld door,Stworzono przez,Kehittäjä,開発,游戏开发由  ,游戲開發由,개발자,Vytvořeno ,Készítette,Dezvoltat de către,พัฒนาโดย,Разработено от,פותח על-ידי,صنعت من قبل,Razvijeno od",
	"CREDITS_DIRECTOR": "Director,Directeur,Director,Regisseur,Direttore,Diretor,Diretor,Режиссёр,Διεύθυνση,Yönetmen,Spilinstruktør,Regissør,Director,Director,Kierownik projektu,Ohjaaja,監督,总监,導演,감독,Ražisér,Rendező,Director,ผู้กำกับ,Режисьор,במאי,المخرج,Režija",
	"CREDITS_LEAD_PROGRAMMER": "Lead programmer,Chef programmeur,Programador jefe,Chefprogrammierer,Programmatore capo,Programador Líder,Programador Líder,Ведущий программист,Lead programmer,Programlama Lideri,Hovedansvarlig programmør,Hovedprogrammerer,Huvudprogrammerare,Lead programmeur,Główny programista,Pääohjelmoija,リードプログラマー,程序组长,程序組長,리드 프로그래머,Vedoucí programátor,Vezető programozó,Programator principal,หัวหน้าโปรแกรมเมอร์,Главен програмист,מתכנת מוביל,كبير المبرمجين,Glavni Programer",
	"CREDITS_PROGRAMMER": "Programmer,Programmeur,Programador,Programmierer,Programmatore,Programador,Programador,Программисты,Προγραμματιστ*ς,Programcı,Programmør,Programmerer,Programmerare,Programmeur,Programista,Ohjelmoija,プログラマー,程序员,程序員,프로그래머,Programátor,Programozó,Programator,โปรแกรมเมอร์,Програмист,מתכנת,مبرمج,Programer",
	"CREDITS_ARTIST": "Artist,Artiste,Artista,Künstler,Artista,Artista,Artista,Художник,Artist,Sanatçı,Kunstner,Illustratør,Illustratör,Artist,Artysta,Taiteilija,アーティスト,美术师,美術師,아티스트,Umělec,Művész,Artist,อาร์ทติส,Художник,מעצב,فنان,Umjetnik",
	"CREDITS_POLYGLOT": "Translated by the Polyglot Project.,Traduit par le Polyglot Projet.,Traducido por el proyecto Polyglot.,Übersetzt von Polyglot Project.,Tradotto dal Polyglot Project.,Traduzido pelo projeto Polyglot.,Traduzido pelo projeto Polyglot.,Перевод от проекта Polyglot,Μεταφράστηκε από το Polyglot Project.,Polyglot Projesi ile çevrilmiştir.,Oversat af Polyglot Projektet.,Oversatt av Polyglot Prosjektet.,Översättning av Polyglot-projektet.,Vertaald door het Polyglot project.,Przetłumaczono za pomocą Polyglot Project.,Käännökset: Polyglot Project.,翻訳提供：Polyglotプロジェクト,Polyglot 项目提供翻译,翻譯由Polyglot Project 提供,번역 제공: Polyglot Project.,Překlad: Polyglot Projektu.,Fordította a Polgylot Project.,Tradus de către Polyglot Project.,คำแปลโดย Polyglot Project,Превод от проекта Полиглот.,תורגם על-ידי פרויקט פוליגלוט.,ترجمت من قبل مشروع بوليغوت,Prevedeno od Polyglot Project"
}


/* LANGUAGES */
const LANGS="English,Français,Español,Deutsch,Italiano,Português Brasileiro,Português,Pусский,Ελληνικά,Türkçe,Dansk,Norsk Bokmål,Svenska,Nederlands,Polski,Suomi,日本語,简体中文,繁體中文,한국어,Čeština,Magyar,Română,ภาษาไทย,Български,עברית,العربية,Bosanski";
const LANG=parseInt(getConfig("lang")); // 0:ENG, 1:FR, 2:ESP, ...

LANG_ARRAY["MENU_LANGUAGE_THIS"]=LANGS.toString();

function WriteLang(elm){
	var indx=elm.getAttribute("data-polyglot");
	elm.innerHTML=Translate(indx,LANG);
}
function Translate(id,lang){
	var ret=LANG_ARRAY[id.toString()].split(",")[lang];
	if(ret===undefined || ret===null){
		// Si hay un error lo devuelve en ingles
		return LANG_ARRAY[id.toString()].split(",")[0];
	}
	return ret;
}

document.getElementsByTagName("html")[0].setAttribute("dir",Translate("LANGUAGE_DIRECTION",LANG));


/* AUDIO */
var a = new AudioContext();
// Source from: https://www.the-art-of-web.com/javascript/creating-sounds/
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
function SoundPlayer(audioContext, filterNode) {
  this.audioCtx = audioContext;
  this.gainNode = this.audioCtx.createGain();
  if(filterNode) {
    // run output through extra filter (already connected to audioContext)
    this.gainNode.connect(filterNode);
  } else {
    this.gainNode.connect(this.audioCtx.destination);
  }
  this.oscillator = null;
}
SoundPlayer.prototype.setFrequency = function(val, when) {
  if(this.oscillator !== null) {
    if(when) {
      this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime + when);
    } else {
      this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime);
    }
  }
  return this;
};
SoundPlayer.prototype.setVolume = function(val, when) {
	if(getConfig("snd")!="true"){val=0.000000001;} // No se puede 0

  if(when) {
    this.gainNode.gain.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + when);
  } else {
    this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
  }

  return this;
};
SoundPlayer.prototype.setWaveType = function(waveType) {
  this.oscillator.type = waveType;
  return this;
};
SoundPlayer.prototype.play = function(freq, vol, wave, when) {
  this.oscillator = this.audioCtx.createOscillator();
  this.oscillator.connect(this.gainNode);
  this.setFrequency(freq);
  if(wave) {
    this.setWaveType(wave);
  }
  this.setVolume(1/1000);
  if(when) {
    this.setVolume(1/1000, when - 0.02);
    this.oscillator.start(when - 0.02);
    this.setVolume(vol, when);
  } else {
    this.oscillator.start();
    this.setVolume(vol, 0.02);
  }
  return this;
};
SoundPlayer.prototype.stop = function(when) {
  if(when) {
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime + when - 0.05, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + when);
  } else {
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + 0.05);
  }
  return this;
};
