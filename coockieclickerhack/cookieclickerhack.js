var z='\
	var a=document.createElement("div");\
	var b=document.createElement("div");\
	var c=document.createElement("div");\
	var _hkM=false;\
	var _hkR=false;\
	var _xx=0;\
	var _yy=0;\
\
	a.id="_hkp";\
	a.style.display="block";\
	a.style.zIndex="1000000";\
	a.style.boxSizing="border-box";\
	a.style.position="fixed";\
	a.style.top="50vh";\
	a.style.left="16px";\
	a.style.width="calc(30% - 32px)";\
	a.style.height="calc(50vh - 32px)";\
	a.style.minWidth="128px";\
	a.style.minHeight="128px";\
	a.style.overflowY="scroll";\
	a.style.textAlign="center";\
	a.style.cursor="all-scroll";\
	a.className="framed prompt";\
	a.addEventListener("mousedown",function(e){\
		_xx=e.clientX-a.offsetLeft;\
		_yy=e.clientY-a.offsetTop;\
		_hkM=true;\
	});\
\
\
	b.className="productButton";\
	b.addEventListener("click",function(){\
		a.style.display=(a.style.display=="block"? "none":"block");\
		c.style.display=a.style.display;\
	});\
	b.innerHTML="Toogle Hack Panel";\
\
\
	c.style.zIndex="1000001";\
	c.style.width="6px";\
	c.style.height="6px";\
	c.style.background="#875626";\
	c.style.border="3px ridge #dfbc9a";\
	c.style.position="fixed";\
	c.style.left="32px";\
	c.style.cursor="nwse-resize";\
	c.style.borderRadius="100% 0 0";\
	c.addEventListener("mousedown",function(e){\
		_hkR=true;\
	});\
	var w1=window.addEventListener("mousemove",function(e){\
		if(_hkM){\
			var xs=""+(e.clientX-_xx)+"px";\
			var ys=""+(e.clientY-_yy)+"px";\
			a.style.top=ys;\
			a.style.left=xs;\
			c.style.top=""+(a.offsetTop+a.offsetHeight-12)+"px";\
			c.style.left=""+(a.offsetLeft+a.offsetWidth-12)+"px";\
		}else if(_hkR){\
			a.style.width=""+(e.clientX-a.offsetLeft+6)+"px";\
			a.style.height=""+(e.clientY-a.offsetTop+6)+"px";\
			c.style.top=""+(a.offsetTop+a.offsetHeight-12)+"px";\
			c.style.left=""+(a.offsetLeft+a.offsetWidth-12)+"px";\
		}\
	});\
	var w2=window.addEventListener("mouseup",function(){\
		_hkM=false;\
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
		document.getElementById("_hkscr").remove();\
	}\
\
	a.innerHTML=\'<style>#_hkp *{outline:none;box-sizing:border-box;font-family:\\\'Merriweather\\\', monospace;font-size:12px;text-shadow:0 3px 6px black;}#_hkp button:hover{cursor:pointer;border:3px ridge #faebd7;}</style><h3 class="prompt" style="font-size:16px;margin:6px auto;">Hack Panel</h3><div class="line"></div><input type="number" id="_hk_val" value="999999999" onmousedown="event.stopPropagation();"onchange="document.getElementById(\\\'_hkN\\\').innerHTML=\\\'- \\\'+numberFormatters[1](this.value)+\\\' -\\\'" style="width:100%;padding:3px;margin:3px;text-align:right;border:3px ridge #999;text-shadow:none;"><br><p id="_hkN"></p><br><button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');var xx=document.getElementById(\\\'_hk_val\\\').value;Game.cookies+=parseInt(xx);Game.Popup(\\\'Cookies: +\\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Add Cookies</button> <button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');var xx=document.getElementById(\\\'_hk_val\\\').value;Game.cookies=parseInt(xx);Game.Popup(\\\'Cookies: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Cookies</button> <button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');var xx=document.getElementById(\\\'_hk_val\\\').value;Game.lumps=parseInt(xx);Game.Popup(\\\'Lumps: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Lumps</button> <button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');var xx=document.getElementById(\\\'_hk_val\\\').value;Game.heavenlyChips=parseInt(xx);Game.Popup(\\\'H. Chips: \\\'+numberFormatters[1](xx),event.clientX,event.clientY);">Set Heavenly Chips</button><div class="line"></div><button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');Game.killBuffs();Game.Popup(\\\'Buffs killed\\\',event.clientX,event.clientY);">Kill buffs</button> <button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');new Game.shimmer(\\\'golden\\\',0,1);Game.Popup(\\\'Golden Cookie summoned\\\',event.clientX,event.clientY);">Golden Cookie</button><div class="line"></div><button class="framed" onclick="PlaySound(\\\'snd/tick.mp3\\\');hks();Game.Popup(\\\'Who was hacking?\\\',event.clientX,event.clientY);Game.Notify(\\\'Humble work\\\',\\\'Hacker mod removed\\\',[20,3]);" style="background:#F00;color:#FFF;">Stop hacking (I feel bad)</button>\';\
\
\
	document.body.appendChild(a);\
	document.body.appendChild(c);\
	c.style.top=""+(a.offsetTop+a.offsetHeight-12)+"px";\
	c.style.left=""+(a.offsetLeft+a.offsetWidth-12)+"px";\
	document.getElementById("sectionLeftExtra").children[0].appendChild(b);\
\
	Game.Ticker="<q>Oh, the user has enabled the hacker mod :(</q><br>So bad...";\
	Game.TickerDraw();\
	Game.Notify(\'Hacker Mod!\',\'Hack Panel created! (v1.2)\',[1,33]);\
';


localStorage.setItem("CKH", (utf8_to_b64(z)));
localStorage.setItem("cookiehack", 'eval(\'var HKs=document.createElement("script");HKs.id="_hkscr";HKs.type="text/javascript";HKs.innerHTML=b64_to_utf8(Game.localStorageGet("CKH"));document.body.appendChild(HKs)\')');

// RUN:
// eval(Game.localStorageGet("cookiehack"));