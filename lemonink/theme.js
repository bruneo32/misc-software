/* THEME */
function ThemeSave(){
	localStorage.setItem("theme", (document.getElementById("cst_font").value+","+document.getElementById("cst_size").value+"px"+","+document.getElementById("cst_note").value+","+document.getElementById("cst_word").value+","+document.getElementById("cst_box").value+","+document.getElementById("cst_color").value+","+document.getElementById("cst_background").value+","+document.getElementById("cst_highlight").value)+","+(document.getElementById("cst_useident").checked)+","+(document.getElementById("cst_ident").value));
	ThemeLoad();
}
function ThemeLoad(){
	if(!localStorage.theme){
		localStorage.setItem("theme", ($(":root").css("--font-family")+","+$(":root").css("--font-size")+","+$(":root").css("--note-color")+","+$(":root").css("--word-color")+","+$(":root").css("--box-color")+","+$(":root").css("--theme-color")+","+$(":root").css("--theme-background")+","+$(":root").css("--theme-highlight"))+",true,	");
	}

	var theme = localStorage.getItem("theme").split(",");
	$(":root").css("--font-family", theme[0]);
	$(":root").css("--font-size", theme[1]);
	$(":root").css("--note-color", theme[2]);
	$(":root").css("--word-color", theme[3]);
	$(":root").css("--box-color", theme[4]);
	$(":root").css("--theme-color", theme[5]);
	$(":root").css("--theme-background", theme[6]);
	$(":root").css("--theme-highlight", theme[7]);
	$_UseIdent = parseBool(theme[8]);
	$_IdentChar = theme[9];

	document.getElementById("cst_font").value = $(":root").css("--font-family");
	document.getElementById("cst_size").value = parseInt($(":root").css("--font-size"));
	document.getElementById("cst_note").value = $(":root").css("--note-color");
	document.getElementById("cst_word").value = $(":root").css("--word-color");
	document.getElementById("cst_box").value = $(":root").css("--box-color");
	document.getElementById("cst_color").value = $(":root").css("--theme-color");
	document.getElementById("cst_background").value = $(":root").css("--theme-background");
	$('meta[name="theme-color"]').attr("content", $(":root").css("--theme-background"));
	document.getElementById("cst_highlight").value = $(":root").css("--theme-highlight");
	document.getElementById("cst_useident").checked = $_UseIdent;
	document.getElementById("cst_ident").value = $_IdentChar;
}
function ThemeReset(){
	localStorage.removeItem("theme","");

	$(":root").css("--font-family", "Crimson Text");
	$(":root").css("--font-size", "16px");
	$(":root").css("--note-color", "#00A9DD");
	$(":root").css("--word-color", "#FF0000");
	$(":root").css("--box-color", "#000");
	$(":root").css("--theme-color", "#000");
	$(":root").css("--theme-background", "#D0C976");
	$(":root").css("--theme-highlight", "#E48AFF");
	$_UseIdent = true;
	$_IdentChar = "	";

	ThemeLoad();
}
