$_preT="";
$_last_pointer = 0;
$_focu_pointer = 0;
$_subordinating = false;
$_referencing = false;
$_subord_parent = 0;

/* xml basic functions */
function xmlToString(xmlData) {
	var xmlString;
	//IE
	if (window.ActiveXObject){
		xmlString = xmlData.xml;
	}
	// code for Mozilla, Firefox, Opera, etc.
	else{
		xmlString = (new XMLSerializer()).serializeToString(xmlData);
	}
	return xmlString;
}
function miniparseXml(xml) {
	const parser = new DOMParser();
	return parser.parseFromString(xml,"text/xml");
}


/* Sentece functions */
function ParseXML(xml) {
	var i;
	xml = xml.replace(/\n/g, "").replace(/\&amp\;amp\;empty\;/g,"∅").replace(/\&empty\;/g,"∅");
	var xmlDoc = miniparseXml(xml);
	sessionStorage.setItem("sentence", xml);
	DisplayXML(xml);

	var elm = xmlDoc.getElementsByTagName("*");
	var word = xmlDoc.getElementsByTagName("word");
	var box = xmlDoc.getElementsByTagName("box");
	var levels = 0;
	var wnl = [];

	var T_HEAD = document.createElement("TR");
	var T_SVG = document.createElement("TR");
	T_SVG.innerHTML = '<td style="border:none;"><svg xmlns="http://www.w3.org/2000/svg" id="_svg"></svg></td>';
	T_SVG.children[0].setAttribute("colspan", word.length);
	var T_NOTES = document.createElement("TR");
	T_NOTES.className = "tn";
	var T_BOXES = "";

	for(i = 0; i < word.length; i++){
		// Contar numero de <word>
		var TH = document.createElement("TH");
		TH.setAttribute("data-pointer", word[i].getAttribute("p"));
		TH.innerHTML = word[i].innerHTML;

		// Añadir anotaciones
		if(word[i].getAttribute("note") === null){word[i].setAttribute("note","");}
		var TN = document.createElement("TD");
		TN.setAttribute("data-pointer", word[i].getAttribute("p"));
		TN.setAttribute("contenteditable", "true");
		TN.innerHTML = word[i].getAttribute("note");
		TN.addEventListener("blur", function (e){
			// Establecer Puntero
			var xml = miniparseXml(sessionStorage.getItem("sentence"));
			var elm = xml.querySelectorAll('[p="'+this.getAttribute("data-pointer")+'"]');
			elm[0].setAttribute("note", this.innerHTML);

			sessionStorage.setItem("sentence", xmlToString(xml));
			ReDraw();
		});
		TN.addEventListener("keypress", function (e){
			var key = e.which || e.keyCode;
			if (key === 13) {
				// Establecer Puntero
				var xml = miniparseXml(sessionStorage.getItem("sentence"));
				var elm = xml.querySelectorAll('[p="'+this.getAttribute("data-pointer")+'"]');
				elm[0].setAttribute("note", this.innerHTML);

				sessionStorage.setItem("sentence", xmlToString(xml));
				ReDraw();
				e.preventDefault();
			}
		});
		T_NOTES.appendChild(TN);

		// Añadir referencias
		if(word[i].getAttribute("ref") != null){
			TH.setAttribute("data-ref",word[i].getAttribute("ref"));
		}

		// Establecer data-color
		if(word[i].getAttribute("color") != null){
			TH.setAttribute("data-color",word[i].getAttribute("color"));
		}

		T_HEAD.appendChild(TH);

		// Contar numero de niveles
		wnl[i] = $(word[i]).parents("box").length + 1;
		if(wnl[i] > levels){levels=wnl[i];}
	}

	// GENERAR CABEZA
	document.getElementById("sentence").innerHTML="";
	document.getElementById("sentence").appendChild(T_NOTES);
	document.getElementById("sentence").appendChild(T_SVG);
	document.getElementById("sentence").appendChild(T_HEAD);


	function RChildrenW(elem){
		var RR = 0;
		RR += $(elem).children("word").length;
		var chd = $(elem).children("box");
		for(var i=0; i < chd.length; i++){
			RR += RChildrenW(chd[i]);
		}
		return RR;
	}

	for(i = (levels - 1); i >= 0; i--){
		T_BOX = document.createElement("TR");

		var dd = 0;
		for(var j = 0; j < elm.length; j++){

			if(wnl[dd] <= i){
				// Elemento vacio
				var ELM = document.createElement("TD");
				ELM.innerHTML="";
				T_BOX.appendChild(ELM);
				dd++;
				continue;
			}

			// Verificar si está en el nivel correcto
			if($(elm[j]).parents("*").length != i){continue;}

			var ELM = document.createElement("TD");

			if(elm[j].tagName == "word"){ELM.className = "word";}

			var cspan = RChildrenW(elm[j]);
			if(cspan < 1){cspan = 1;}
			ELM.setAttribute("colspan", cspan);
			ELM.setAttribute("contenteditable", true);
			ELM.setAttribute("oncontextmenu", "return showContextMenu();");
			ELM.setAttribute("data-pointer", elm[j].getAttribute("p"));
			ELM.setAttribute("data-pre", elm[j].getAttribute("taf"));
			ELM.addEventListener("mousedown", _focusPointer);
			ELM.addEventListener("contextmenu", _focusPointer);
			ELM.addEventListener("blur", function (e){
				// Establecer Puntero
				var xml = miniparseXml(sessionStorage.getItem("sentence"));
				var elm = xml.querySelectorAll('[p="'+this.getAttribute("data-pointer")+'"]');
				elm[0].setAttribute("taf", this.innerHTML);

				sessionStorage.setItem("sentence", xmlToString(xml));
				ReDraw();
			});
			ELM.addEventListener("keypress", function (e){
				var key = e.which || e.keyCode;
				if (key === 13) {
					// Establecer Puntero
					var xml = miniparseXml(sessionStorage.getItem("sentence"));
					var elm = xml.querySelectorAll('[p="'+this.getAttribute("data-pointer")+'"]');
					elm[0].setAttribute("taf", this.innerHTML);

					sessionStorage.setItem("sentence", xmlToString(xml));
					ReDraw();
					e.preventDefault();
				}
			});

			ELM.innerHTML=elm[j].getAttribute("taf");

			if(elm[j].getAttribute("color") != null && elm[j].getAttribute("color") != ""){
				var col = elm[j].getAttribute("color");
				$(ELM).css("--element-color", col);
			}

			if(parseInt(elm[j].getAttribute("p")) > $_last_pointer){$_last_pointer = parseInt(elm[j].getAttribute("p"));}

			T_BOX.appendChild(ELM);
			dd+=parseInt(ELM.getAttribute("colspan"));
		}
		document.getElementById("sentence").appendChild(T_BOX);
	}
	// Referencias
	var th_ref = $('th[data-ref]');
	if(th_ref.length < 1){
		$(T_SVG).css("display", "none");
		return;
	}
	for(var i=0; i < th_ref.length; i++){
		var ref = ($(th_ref[i]).attr("data-ref").toString()).split(",");
		for(var j=0; j < ref.length; j++){
			if(ref[j] == null || ref[j] == ""){continue;}

			var objTo = $('th[data-pointer="'+ref[j].toString()+'"]');

			var from = (parseInt($(th_ref[i]).position().left) + (parseInt($(th_ref[i]).width()) / 2));
			var to = (parseInt($(objTo[0]).position().left) + (parseInt($(objTo[0]).width()) / 2));

			var col = $(th_ref[i]).attr("data-color");
			var clr = "";
			if(typeof col !== 'undefined'){
				var clr = "--path-color:"+col+";";
			}

			//alert(col+" - "+clr);

			var path = "<path style='fill:none;"+clr+"' d='";

			dd="M "+from+",30 C "+from+",0 "+to+",0 "+to+",30";

			path += dd+"'/>";
			path+='<path style="'+clr+'" d="M '+to+',30 L '+(to-4)+',26 L '+(to+4)+',26 Z"/>';

			document.getElementById("_svg").innerHTML += path;
		}
	}
}
function _focusPointer(){
	$_focu_pointer = this.getAttribute("data-pointer");
	_miniset(this);
	if($_subordinating){SubordinateEnd();}
	if($_referencing){InsertReferenceEnd();}
}
function SetFromTextarea(){
	var xmlDoc = document.getElementById("areaSource").value;

	sessionStorage.setItem("sentence", xmlDoc);
	ReDraw();
}
function ReDraw(){
	ParseXML(sessionStorage.getItem("sentence"));
}

/* Editar */
function CreateGroup(){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]');

	$_last_pointer++;

	var BOX = document.createElement("box");
	BOX.setAttribute("taf",GetFromLang(29));
	BOX.setAttribute("p", $_last_pointer.toString());

	elm[0].parentElement.insertBefore(BOX, elm[0]);
	BOX.appendChild(elm[0]);

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function RemoveGroup(contentToo){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]');

	var TNT = false;
	var ll = elm[0].childElementCount;
	if(!contentToo){
		for(var i=0; i < ll; i++){
			elm[0].parentElement.insertBefore(elm[0].children[0], elm[0]);
		}
	}else{
		// Eliminar contenido
		function RRR(elem){
			var chd = $(elem).children();
			for(var i=0; i < chd.length; i++){

				if($(elem).children().length < 1){TNT=true;}
				if(TNT){$(elem).remove();TNT=false;break;}

				if(elem.children[i].tagName == "word"){
					// Sacar la palabra
					elm[0].parentElement.insertBefore(elem.children[i], elm[0]);
					i--;
					continue;
				}
				RRR(elem.children[i]);
				i--;
			}
		}
		for(var i=0; i < ll; i++){

			if($(elm[0]).children().length < 1){TNT=true;}
			if(TNT){TNT=false;break;}

			if(elm[0].children[i].tagName == "word"){
				// Sacar la palabra
				elm[0].parentElement.insertBefore(elm[0].children[i], elm[0]);
				i--;
				continue;
			}
			RRR(elm[0].children[i]);
			i--;
		}
	}
	elm[0].remove();

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}

function SubordinateStart(){
	if($_subordinating){return;}
	if($_referencing){return;}
	$_subordinating = true;
	$_subord_parent = $_focu_pointer;
}

// Funciones : isAfter & isBefore
(function($) {
    $.fn.isAfter = function(sel){
        return this.prevAll().filter(sel).length !== 0;
    };

    $.fn.isBefore= function(sel){
        return this.nextAll().filter(sel).length !== 0;
    };
})(jQuery);
function SubordinateEnd(){
	if($_subord_parent == $_focu_pointer){
		//$_subordinating=false;
		return;
	}

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm_start = xml.querySelectorAll('[p="'+$_subord_parent.toString()+'"]')[0];
	var elm_end = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm_end.tagName == "word"){alert(GetFromLang(75));$_subordinating = false;return;}

	if($(elm_start).parents().length != $(elm_end).parents().length){
		alert(GetFromLang(73));
		$_subordinating = false;
		return;
	}

	if(Math.abs(($(elm_start).index()) - ($(elm_end).index())) > 1){
		alert(GetFromLang(74));
		$_subordinating = false;
		return;
	}

	if($(elm_start).isBefore(elm_end)){
		elm_end.insertBefore(elm_start, elm_end.children[0]);
	}else if($(elm_start).isAfter(elm_end)){
		elm_end.appendChild(elm_start);
	}else{
		alert(GetFromLang(73));
		$_subordinating = false;
		return;
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
	$_subordinating = false;
}
function SubordinateBefore(){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm.tagName == "word"){alert(GetFromLang(72));$_subordinating = false;return;}

	var ind = $(elm).index() - 1;

	for(var i = ind; i >=0; i--){
		$(elm.parentElement.children[i]).insertBefore(elm.children[0]);
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function SubordinateAfter(){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm.tagName == "word"){alert(GetFromLang(72));$_subordinating = false;return;}

	var ind = $(elm).index() + 1;
	var nn = elm.parentElement.childElementCount;

	for(var i = ind; i < nn; i++){
		elm.appendChild(elm.parentElement.children[ind]);
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function ExitFromGroup(){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm.parentElement.childElementCount == 1){
		var par = elm.parentElement;
		elm.parentElement.parentElement.insertBefore(elm, elm.parentElement);
		par.remove();
	}else if(($(elm).index() == 0)){
		elm.parentElement.parentElement.insertBefore(elm, elm.parentElement);
	}else if($(elm).index() == (elm.parentElement.childElementCount - 1)){
		$(elm).insertAfter(elm.parentElement);
	}else{
		alert(GetFromLang(71));
		return;
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function InsertReferenceStart(){
	if($_subordinating){return;}
	if($_referencing){return;}

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];
	if(elm.tagName != "word"){
		alert(GetFromLang(70));
		return;
	}
	$_referencing = true;
	$_subord_parent = $_focu_pointer;
}
function InsertReferenceEnd(){
	if($_subord_parent == $_focu_pointer){
		//$_subordinating=false;
		return;
	}

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm_start = xml.querySelectorAll('[p="'+$_subord_parent.toString()+'"]')[0];
	var elm_end = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm_end.tagName != "word"){
		alert(GetFromLang(69));
		$_referencing = false;
		return;
	}

	var coma = "";
	if(elm_start.getAttribute("ref") != null && elm_start.getAttribute("ref") != ""){
		coma = elm_start.getAttribute("ref")+",";
	}

	elm_start.setAttribute("ref", coma+elm_end.getAttribute("p"));

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
	$_referencing = false;
}
function DelReference(){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	if(elm.tagName != "word"){return;}

	elm.removeAttribute("ref");

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function InsertWord(insertAfter){
	var parabola = prompt(GetFromLang(68)+":","");

	if(parabola == null || parabola == ""){return;}

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	var WW = document.createElement("word");
	WW.innerHTML = parabola;
	WW.setAttribute("taf","N");
	$_last_pointer++;
	WW.setAttribute("p",$_last_pointer);

	if(insertAfter){
		$(WW).insertAfter(elm);
	}else{
		elm.parentElement.insertBefore(WW, elm);
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function InsertWordLast(atEnd){
	var parabola = prompt(GetFromLang(68)+":", "");

	if(parabola == null || parabola == ""){return;}

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="1000"]')[0];

	var WW = document.createElement("word");
	WW.innerHTML = parabola;
	WW.setAttribute("taf","N");
	$_last_pointer++;
	WW.setAttribute("p",$_last_pointer);

	if(atEnd){
		elm.appendChild(WW);
	}else{
		$(WW).insertBefore(elm.children[0]);
	}

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function SetColor(inp){
	if(inp == null){return;}
	var ccc = inp.value;

	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	elm.setAttribute("color", ccc);

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}
function RemoveColor(inp){
	var xml = miniparseXml(sessionStorage.getItem("sentence"));
	var elm = xml.querySelectorAll('[p="'+$_focu_pointer.toString()+'"]')[0];

	elm.removeAttribute("color");

	sessionStorage.setItem("sentence", xmlToString(xml));
	ReDraw();
}

function _miniset(el){
	if(el.className == "word"){
		var mC = "mmw";
	}else{
		var mC = "mmb";
	}

	document.getElementById("_mm").className = mC;
	document.getElementById("_mm").innerHTML = el.innerHTML;
	document.getElementById("_mmcolor").value = $(el).css("--element-color");
}

/* Textarea */
function DisplayXML(xmlString){
	document.getElementById('areaSource').value = _format(xmlString);
	AreaColorize();
}
function _format(str){
	if(!$_UseIdent){
		return str;
	}
	var div = document.createElement('div');
	div.innerHTML = str.trim();

	return format(div, 0).innerHTML;
}
function format(node, level){
	var indentBefore = new Array(level++ + 1).join($_IdentChar);
	var	indentAfter  = new Array(level - 1).join($_IdentChar);
	var	textNode;

	for (var i = 0; i < node.children.length; i++) {
		textNode = document.createTextNode('\n' + indentBefore);
		node.insertBefore(textNode, node.children[i]);

		format(node.children[i], level);

		if (node.lastElementChild == node.children[i]) {
			textNode = document.createTextNode('\n' + indentAfter);
			node.appendChild(textNode);
		}
	}
	return node;
}
function LineBreakTextarea(){
	if($("#areaSource").css("white-space") == "nowrap"){
		$("#areaSource").css("white-space","normal");
	}else{
		$("#areaSource").css("white-space","nowrap");
	}
}
function AreaColorize(){
}

function LoadLang(event){
	var alerta = window.confirm(GetFromLang(76));
	if(!alerta){return;}

	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		var lines = this.result.split('\n');
		localStorage.setItem("lilang", JSON.stringify(lines));
		localStorage.setItem("autodwnldLang", "false");
		location.reload();
	};
	reader.readAsText(input.files[0]);
}
function ResetLang(){
	var alerta = window.confirm(GetFromLang(77));
	if(!alerta){return;}
	localStorage.removeItem("lilang");
	location.reload();
}

/* Files */
function NewSent(){
	if(document.getElementById("sentence").innerHTML != ""){
		var alerta = window.confirm(GetFromLang(66));
	}else{alerta=true;}
	if(alerta){
		$_subordinating = false; // Cancelar la subordinacion
		var puntero = 1001;
		var words = document.querySelector("#sentNew").value.split(" ");
		var asdf = "";
		for(var x = 0; x < words.length; x++){
			asdf += '<word xmlns="http://www.w3.org/1999/xhtml" taf="N" p="'+puntero.toString()+'">'+words[x]+'</word>';
			$_last_pointer = puntero;
			puntero++;
		}
		asdf = '<box xmlns="http://www.w3.org/1999/xhtml" taf="'+GetFromLang(67)+'" p="1000">'+asdf+'</box>';
		document.getElementById("sTitle").innerHTML=GetFromLang(2);
		ParseXML(asdf);
	}
}
function OpenFile(event){
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		ParseXML(reader.result.replace('<?xml version="1.0" encoding="UTF-8"?>\n',"").replace('<!-- Made with Lemon Ink (retronomicon.gq/lemonink) -->\n',""));
	};
	$("#sTitle").text(input.files[0].name.toLowerCase().replace(".xml",""));
	reader.readAsText(input.files[0]);
}
function SaveFile(){
	var txt = document.getElementById("areaSource").value;
	txt = '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Made with Lemon Ink (retronomicon.gq/lemonink) -->\n'+txt;
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(txt));
	pom.setAttribute('download', $("#sTitle").text()+".xml");

	if(document.createEvent){
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}else {
		pom.click();
	}
}
function ExportPNG(){
	const filename  = $("#sTitle").text()+'.png';

	$(".folio").css("overflow", "unset");
	$(".folio").css("width", "fit-content");

	html2canvas(document.querySelector('.folio')).then(canvas => {
		var data = canvas.toDataURL("image/png");

		var img = document.createElement('img');
		img.src = data;

		var a = document.createElement('a');
		a.setAttribute("download", filename);
		a.setAttribute("href", data);
		a.appendChild(img);
		if(document.createEvent){
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			a.dispatchEvent(event);
		}else {
			a.click();
		}
	});

	$(".folio").css("overflow", "auto");
	$(".folio").css("width", "unset");
}
function ExportPDF(){
	const filename  = $("#sTitle").text()+'.pdf';

	$(".folio").css("overflow", "unset");
	$(".folio").css("width", "fit-content");

	var ww = parseInt($(".folio").css("width"));
	var hh = parseInt($(".folio").css("height"));

	html2canvas(document.querySelector('.folio')).then(canvas => {
		var pdf = new jsPDF({orientation: 'l', unit: 'px', format: [ww, hh]}); // 'l', 'px', [ww, hh]
		pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
		pdf.save(filename);
	});

	$(".folio").css("overflow", "auto");
	$(".folio").css("width", "unset");
}

/* Context Menu */
function showContextMenu(){
	if($_subordinating){return;}
	$("#contextMenu").css("display" , "block");
	$("#contextMenu").css("left" , event.clientX + "px");
	$("#contextMenu").css("top" , event.clientY + "px");
	return false;
}
function hideContextMenu(){
	$("#contextMenu").css("display","none");
}
