var z = '\
	var a = document.createElement("div");\
	var b = document.createElement("div");\
	var c = document.createElement("div");\
\
	a.id = "_hkp";\
	a.style.display = "block";\
	a.style.zIndex = "1000000";\
	a.style.boxSizing="border-box";\
	a.style.position="fixed";\
	a.style.bottom="32px";\
	a.style.left="16px";\
	a.style.width="calc(30% - 32px)";\
	a.style.height="128px";\
	a.style.minHeight="128px";\
	a.style.overflowY="scroll";\
	a.style.textAlign="center";\
	a.className="framed prompt";\
\
\
	b.className = "productButton";\
	b.addEventListener("click",function(){\
		a.style.display = (a.style.display=="block"? "none":"block");\
		c.style.display = a.style.display;\
	});\
	b.innerHTML="Toogle Hack Panel";\
\
\
	var _hkR=false;\
	c.id = "_hkV";\
	c.style.zIndex = "1000001";\
	c.style.width="32px";\
	c.style.height="6px";\
	c.style.border="3px ridge #faebd7";\
	c.style.position="fixed";\
	c.style.left="32px";\
	c.style.cursor="ns-resize";\
	c.addEventListener("mousedown",function(){\
		_hkR=true;\
	});\
	var w1=window.addEventListener("mousemove",function(e){\
		if(_hkR){\
			var ys=""+e.clientY+"px";\
			c.style.top = ys;\
			a.style.top = ys;\
			a.style.height = "calc(100vh - "+ ys +" - 32px)";\
		}\
	});\
	var w2=window.addEventListener("mouseup",function(){\
		_hkR=false;\
	});\
\
	function hks(){\
		a.remove();\
		b.remove();\
		c.remove();\
		window.removeEventListener(\'mousemove\',w1);\
		window.removeEventListener(\'mouseup\',w2);\
		Game.vanilla=1;\
	}\
\
	a.innerHTML = \'<style>#_hkp *{outline:none;box-sizing:border-box;font-family:\\\'Merriweather\\\', monospace;font-size:12px;text-shadow:0 3px 6px black;}#_hkp button:hover{cursor:pointer;border:3px ridge #faebd7;}</style><h3 class="prompt" style="font-size:16px;margin:6px auto;">Hack Panel</h3><hr><input type="number" id="_hk_val" value="999999999" style="width:100%;padding:3px;margin:3px;text-align:right;border:3px ridge #999;text-shadow:none;"><br><button class="framed" onclick="var xx=document.getElementById(\\\'_hk_val\\\').value;Game.cookies+=parseInt(xx);Game.Popup(\\\'Cookies: +\\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Add Cookies</button> <button class="framed" onclick="var xx=document.getElementById(\\\'_hk_val\\\').value;Game.cookies=parseInt(xx);Game.Popup(\\\'Cookies: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Cookies</button> <button class="framed" onclick="var xx=document.getElementById(\\\'_hk_val\\\').value;Game.lumps=parseInt(xx);Game.Popup(\\\'Lumps: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Lumps</button> <button class="framed" onclick="var xx=document.getElementById(\\\'_hk_val\\\').value;Game.heavenlyChips=parseInt(xx);Game.Popup(\\\'H. Chips: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Heavenly Chips</button><hr><button class="framed" onclick="Game.killBuffs();Game.Popup(\\\'Buffs killed\\\',event.clientX,event.clientY);">Kill buffs</button> <button class="framed" onclick="new Game.shimmer(\\\'golden\\\',0,1);Game.Popup(\\\'Golden Cookie summoned\\\',event.clientX,event.clientY);">Golden Cookie</button><hr><button class="framed" onclick="hks();Game.Popup(\\\'Who was hacking?\\\',event.clientX,event.clientY);Game.Notify(\\\'Humble work\\\',\\\'Hacker mod removed\\\',[20,3]);" style="background:#F00;color:#FFF;">Stop hacking (I feel bad)</button>\';\
\
\
	document.body.appendChild(a);\
	document.body.appendChild(c);\
	c.style.top=""+a.offsetTop-4+"px";\
	document.getElementById("sectionLeftExtra").children[0].appendChild(b);\
\
	Game.Ticker="<q>Oh, the user has enabled the hacker mod :(</q><br>So bad...";\
	Game.TickerDraw();\
	Game.Notify(\'Hacker Mod!\',\'Hack Panel created! (v1.1)\',[1,33]);\
';


localStorage.setItem("CKH", (utf8_to_b64(z)));
localStorage.setItem("cookiehack", 'eval(\'var HKs = document.createElement("script");HKs.type="text/javascript";HKs.innerHTML=b64_to_utf8(Game.localStorageGet("CKH"));document.body.appendChild(HKs)\')');

// RUN:
// eval(Game.localStorageGet("cookiehack"));