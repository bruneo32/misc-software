<!DOCTYPE html>
<html oncontextmenu="return false;" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
<?php
function isMobile() {
	preg_match("/(mobile)/i", $_SERVER["HTTP_USER_AGENT"], $m);
	return (implode(",",$m) != "") ? true : false;
}
if(isMobile()){
	header("Location: mobileBloq.html");
}

function isChrome() {
	return preg_match("/chrome/i", $_SERVER["HTTP_USER_AGENT"]);
}
if(!isChrome()){
	header("Location: incompatible.html");
}

$desc = "Lemon Ink es un editor web de análisis sintáctico gratuito, eficiente y claro. Completamente configurable y personalizable para poder analizar como más te guste. Permite abrir y guardar oraciones desde tu ordenador sin necesidad de pasar los datos por nuestro servidor para garantizar tu seguridad. Además puedes exportar tus oraciones para imprimir o enviar.";

?>
<!-- Version: 1.1 -->
<head>
<title>Lemon Ink</title>
<link rel="shortcut icon" href="resources/icon.png" type="image/x-icon"/>
<meta name="Description" content="<?php echo $desc;?>"/>
<meta name="theme-color" content="#D0C976"/>

  <meta property="og:url"           content="retronomicon.gq/lemonink" />
  <meta property="og:type"          content="website" />
  <meta property="og:title"         content="Lemon Ink" />
  <meta property="og:description"   content="<?php echo $desc;?>" />
  <meta property="og:image"         content="resources/icon.png" />
  <meta property="og:image:alt"     content="Lemon Ink" />

<script type="text/javascript">
  var jsver = 1.0;
</script>
<script language="Javascript1.1">
  jsver = 1.1;
</script>
<script language="Javascript1.2">
  jsver = 1.2;
</script>
<script language="Javascript1.3">
  jsver = 1.3;
</script>
<script language="Javascript1.4">
  jsver = 1.4;
</script>
<script language="Javascript1.5">
  jsver = 1.5;
</script>
<script language="Javascript1.6">
  jsver = 1.6;
</script>
<script language="Javascript1.7">
  jsver = 1.7;
</script>
<script language="Javascript1.8">
  jsver = 1.8;
</script>
<script language="Javascript1.9">
  jsver = 1.9;
</script>
<script type="text/javascript">
  if(jsver<1.7){
    location="incompatible.html";
  }
</script>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="js/pace.css"/>
<script src="js/jquery-3.5.0.min.js"></script>
<script src="js/html2canvas.min.js"></script>
<script src="js/pace.min.js"></script>
<script src="theme.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="https://static.itch.io/api.js"></script>

</head>
<body>
<script type="text/javascript">
// Initial stuff

$_UseIdent = true;
$_IdentChar = "	";

function parseBool(str){
	str = str.toString();
	return (str.toLowerCase() == "true") ? true : false;
}

// Language
$_ver = 1.0;
if(!localStorage.autodwnldLang){
	localStorage.setItem("autodwnldLang", "true");
}
if(!localStorage.lilang){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$_lang_array = JSON.parse(this.responseText.toString());
			localStorage.setItem("lilang", this.responseText);
			localStorage.setItem("autodwnldLang", "true");
			location.reload();
		}
	};
	xmlhttp.open("GET", "getSpanish.php", true);
	xmlhttp.send();
}else{$_lang_array = JSON.parse(localStorage.getItem("lilang"));}

if(parseFloat($_lang_array[0]) < $_ver){
	if(parseBool(localStorage.getItem("autodwnldLang")) == true){
		ResetLang();
	}else{
		alert("The language configuration ("+parseFloat($_lang_array[0]).toPrecision(2).toString()+") is less than the Lemon Ink current version ("+parseFloat($_ver).toPrecision(2).toString()+").\nIt is very possible that some texts do not exist in your language file.\nWill display [Error].\n\nYou can click on 'Reset default language' to fix it (or download an updated version of your language file).");
	}
}

function GetFromLang(ind){
	if(typeof $_lang_array[ind - 1] === 'undefined') {
		return ("[Error]");
	}
	return ($_lang_array[ind - 1].replace(/(\r\n|\n|\r)/gm,"").replace(/¬/g,"\n"));
}

function EchoLang(ind){
	document.write(GetFromLang(ind));
}
</script>

<div class="folio">
<h1 id="sTitle" style="text-decoration:underline;float:left;" contenteditable="true"><script>EchoLang(2)</script></h1><br/>
<table id="sentence"></table>
<br/>
<div style="text-align:left;font-weight:bold;"><img style="height:48px;vertical-align:middle;" alt="icon" src="resources/icon.png"></img>&ensp;&copy; retronomicon.gq/lemonink
</div>
</div>

<!-- TAB -->
<div class="tabs">
	<div style="display:inline-flex;width:100%;">
		<button style="width:auto;padding:3px 12px;" class="tablink" onclick="openPage('StartTab', this)"><img style="max-width: unset;height:48px;vertical-align:middle;" alt="icon" src="resources/icon.png"></img></button>
		<button class="tablink" onclick="openPage('FileTab', this)" id="defaultOpen"><script>EchoLang(3)</script></button>
		<button class="tablink" onclick="openPage('EditTab', this)"><script>EchoLang(4)</script></button>
		<button class="tablink" onclick="openPage('Custom', this)"><script>EchoLang(5)</script></button>
		<button class="tablink" onclick="openPage('Code', this)"><script>EchoLang(6)</script></button>
	</div>
	<div id="StartTab" class="tabcontent">
		<table>
			<td style="width:33%;border-right:1px solid rgba(0,0,0,0.3);vertical-align:top;">
				<img style="width:98%;" alt="banner" src="resources/banner.png"></img><br/>
				<p>&copy; Retronomicon 2021</p><br/>

			</td>
			<td style="text-align:left;vertical-align:top;padding:16px;">
				<script>EchoLang(9)</script><br/>
				<ul>
					<li><a href="manual/" target="_blank"><script>EchoLang(10)</script></a></li>
					<li><a href="https://retronomicon.itch.io/lemonink" target="_blank"><script>EchoLang(11)</script></a></li>
					<li><a href="https://retronomicon.itch.io/lemonink/community" target="_blank"><script>EchoLang(12)</script></a></li>
					<li><a href="manual/Languages" target="_blank"><script>EchoLang(13)</script></a></li>
					<li><a href="https://discord.gg/2szF3hrXJh" target="_blank"><script>EchoLang(14)</script></a></li>
					<li><a href="https://itch.io/t/784418/reportar-un-bug" target="_blank"><script>EchoLang(15)</script></a></li>
				</ul>
			</td>
		</table>
	</div>

	<div id="FileTab" class="tabcontent">
		<table>
		<tr>
			<th><script>EchoLang(16)</script></th>
			<th><script>EchoLang(17)</script></th>
			<th><script>EchoLang(18)</script></th>
			<th><script>EchoLang(19)</script></th>
		</tr>
		<tr>
		<td style="width:25%;border-right:1px solid rgba(0,0,0,0.3);">
			<input autocorrect="on" spellcheck="true" type="text" id="sentNew" placeholder="Oración..."/><br>
			<input type="button" id="comensarxd" onclick="NewSent()" value="Comenzar"/>
		</td>
		<td style="width:25%;border-right:1px solid rgba(0,0,0,0.3);">
			<label for="file-upload1" class="custom-file-upload"><script>EchoLang(21)</script></label>
			<input id="file-upload1" onchange='OpenFile(event)' accept="text/xml" type="file"/><br>
		</td>
		<td style="width:25%;border-right:1px solid rgba(0,0,0,0.3);">
			<button onclick='SaveFile()' class="custom-file-upload"><script>EchoLang(22)</script></button>
		</td>
		<td style="width:25%;">
			<a target="_blank" href="manual/Exportar"><script>EchoLang(23)</script></a><br/><br/>
			<button onclick='ExportPNG()' class="custom-file-upload"><script>EchoLang(24)</script></button>
			<button onclick='ExportPDF()' class="custom-file-upload"><script>EchoLang(25)</script></button>
		</td>
		</tr>
		</table>
	</div>

	<div id="EditTab" class="tabcontent">
		<p style="margin:6px"><script>EchoLang(26)</script></p><br/>
		<table>
		<tr>
			<th><script>EchoLang(27)</script></th>
			<th><script>EchoLang(28)</script></th>
			<th><script>EchoLang(29)</script></th>
			<th><script>EchoLang(30)</script></th>
			<th><script>EchoLang(31)</script></th>
		</tr>
		<tr>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);vertical-align:top;">
			<div style="margin-top:16px;"><span style="width: fit-content;background:#FFF;" id="_mm" class=""></span></div><br/>
			<script>EchoLang(32)</script>: <input id="_mmcolor" type="color" onblur="SetColor(this)"/><br/>
			<button onclick="RemoveColor()"><script>EchoLang(33)</script></button>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);vertical-align:top;">
			<button style="width: -webkit-fill-available;" onclick="SubordinateStart()"><script>EchoLang(34)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="ExitFromGroup()"><script>EchoLang(35)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="RemoveGroup(false)"><script>EchoLang(36)</script></button>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);vertical-align:top;">
			<button style="width: -webkit-fill-available;" onclick="CreateGroup()"><script>EchoLang(37)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="SubordinateBefore()"><script>EchoLang(38)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="SubordinateAfter()"><script>EchoLang(39)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="RemoveGroup(true)"><script>EchoLang(40)</script></button>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);vertical-align:top;">
			<button style="width: -webkit-fill-available;" onclick="InsertReferenceStart()"><script>EchoLang(41)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="DelReference()"><script>EchoLang(42)</script></button>
		</td>
		<td style="width:20%;vertical-align:top;">
			<button style="width: -webkit-fill-available;" onclick="InsertWord(false)"><script>EchoLang(43)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="InsertWord(true)"><script>EchoLang(44)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="InsertWordLast(false)"><script>EchoLang(45)</script></button><br/>
			<button style="width: -webkit-fill-available;" onclick="InsertWordLast(true)"><script>EchoLang(46)</script></button>
		</td>
		</tr>
		</table>
	</div>

	<div id="Custom" class="tabcontent">
		<table>
		<tr>
			<th><script>EchoLang(47)</script></th>
			<th><script>EchoLang(48)</script></th>
			<th><script>EchoLang(49)</script></th>
			<th><script>EchoLang(50)</script></th>
			<th><script>EchoLang(51)</script></th>
		</tr>
		<tr>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);">
			<script>EchoLang(52)</script>: &ensp;<input type="text" id="cst_font" placeholder="Times New Roman"/><br/>
			<script>EchoLang(53)</script>: &ensp;<input type="number" id="cst_size" placeholder="16"/>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);">
			<script>EchoLang(54)</script>: &ensp;<input type="color" id="cst_note" value="#FF0000"/><br/>
			<script>EchoLang(55)</script>: &ensp;<input type="color" id="cst_word" value="#FF0000"/><br/>
			<script>EchoLang(56)</script>: &ensp;<input type="color" id="cst_box" value="#FF0000"/>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);">
			<script>EchoLang(57)</script>: &ensp;<input type="color" id="cst_color" value="#FF0000"/><br/>
			<script>EchoLang(58)</script>: &ensp;<input type="color" id="cst_background" value="#FF0000"/><br/>
			<script>EchoLang(59)</script>: &ensp;<input type="color" id="cst_highlight" value="#FF0000"/>
		</td>
		<td style="width:20%;border-right:1px solid rgba(0,0,0,0.3);">
			<script>EchoLang(60)</script>: &ensp;<input type="checkbox" id="cst_useident" checked/><br/>
			<script>EchoLang(61)</script>: &ensp;<input type="text" id="cst_ident" placeholder="Tabulator / Double space ..."/><br/>
		</td>
		<td style="width:20%;">
			<a target="_blank" href="manual/Languages">Change language</a><br/><br/>
			<label for="file-upload2" class="custom-file-upload"><script>EchoLang(62)</script></label>
			<input id="file-upload2" onchange='LoadLang(event)' accept="text/*" type="file"/>
			<button id="resetlangxd" onclick='ResetLang()' class="custom-file-upload">Restore default language (Spanish)</button>
		</td>
		</tr>
		</table>
		<br/>
		<input type="button" onclick="ThemeReset()" id="restableserxd" value="Restablecer"/>
		<input type="button" onclick="ThemeSave()" id="guardarcxd" value="Guardar cambios"/>
	</div>

	<div id="Code" class="tabcontent">
		<button style="margin:0px;width:calc(5% - 2px);" onclick="LineBreakTextarea()">&#8629;</button>
		<button style="margin:0px;width:calc(95% - 2px);" onclick="SetFromTextarea()"><script>EchoLang(65)</script></button><br>
		<textarea id="areaSource" onchange="AreaColorize()"></textarea>
	</div>

	<script type="text/javascript">
	function openPage(pageName,elmnt) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].style.backgroundColor = "";
		}
		document.getElementById(pageName).style.display = "block";
		elmnt.style.background = "var(--theme-background)";
	}

	// Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click();
	$(".tabs").resizable({handles: "n", containment: "document", start: function( event, ui ) {
		$(".tabs").css("height","unset");
	}, stop: function( event, ui ) {
		$(".tabs").css("height","unset");
	}});
	$(".tabs").css("height","33%");

	// Theme
	ThemeLoad();

	// Some lang things
	document.getElementById("sentNew").placeholder = GetFromLang(48)+"...";
	document.getElementById("comensarxd").value = GetFromLang(20);
	document.getElementById("restableserxd").value = GetFromLang(64);
	document.getElementById("guardarcxd").value = GetFromLang(65);
	document.getElementById("resetlangxd").title = GetFromLang(63);
	</script>
</div>

<div id="contextMenu">
	<ul>
	<li onclick="SubordinateStart()"><script>EchoLang(34)</script></li>
	<li onclick="ExitFromGroup()"><script>EchoLang(35)</script></li>
	<li onclick="RemoveGroup(false)"><script>EchoLang(36)</script></li>
	<hr/>
	<li onclick="CreateGroup()"><script>EchoLang(37)</script></li>
	<li onclick="SubordinateBefore()"><script>EchoLang(38)</script></li>
	<li onclick="SubordinateAfter()"><script>EchoLang(39)</script></li>
	<li onclick="RemoveGroup(true)"><script>EchoLang(40)</script></li>
	<hr/>
	<li onclick="InsertReferenceStart()"><script>EchoLang(41)</script></li>
	<li onclick="DelReference()"><script>EchoLang(42)</script></li>
	<hr/>
	<li onclick="InsertWord(false)"><script>EchoLang(43)</script></li>
	<li onclick="InsertWord(true)"><script>EchoLang(44)</script></li>
	</ul>
</div>

<script type="text/javascript" src="script.js"></script>
<script type="text/javascript">
window.onclick=hideContextMenu;

// Prevent Textarea TAB
var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
	textareas[i].onkeydown = function(e){
		if(e.keyCode==9 || e.which==9){
			e.preventDefault();
			var s = this.selectionStart;
			this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
			this.selectionEnd = s+1;
		}
	}
}
document.getElementById("cst_ident").onkeydown = function(e){
	if(e.keyCode==9 || e.which==9){
		e.preventDefault();
		var s = this.selectionStart;
		this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
		this.selectionEnd = s+1;
	}
}
</script>
</body>
</html>
