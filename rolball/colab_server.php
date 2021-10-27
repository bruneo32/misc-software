<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      *{
        margin: 0 auto;
        background:white;
        color:black;
        vertical-align: middle;
        max-width: 100%;
        width:fit-content;
        text-align: center;
      }
      html,body{
        padding:0;
        overflow-x:hidden;
      }
      div{
        padding:16px;
      }
      p{
        text-align: justify;
      }
      input{
        text-align: left;
        background:white;
        color:black;
        border:1px solid #000;
        padding: 4px 8px;
      }
      input[type="number"]{
        float:right;
      }
      button{
        cursor:pointer;
        background: #74a8d0;
        border: 1px solid #000;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 18px;
        margin: 13px;
      }
      .nomargin{margin:0;}

      .c-inline-spinner,
      .c-inline-spinner:before {
        display: inline-block;
        width: 11px;
        height: 11px;
        transform-origin: 50%;
        border: 2px solid transparent;
        border-color: #74a8d0 #74a8d0 transparent transparent;
        border-radius: 50%;
        content: "";
        animation-timing-function: linear;
        animation-name:c_spinner;
        animation-duration: 0.4s;
        animation-iteration-count: infinite;
        position: relative;
        vertical-align: inherit;
        line-height: inherit;
      }
      .c-inline-spinner {
        top: 3px;
        margin: 0 3px;
      }
      .c-inline-spinner:before {
        border-color: #74a8d0 #74a8d0 transparent transparent;
        position: absolute;
        left: -2px;
        top: -2px;
        border-style: solid;
      }
      @keyframes c_spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <br/>
    <h1>AI Server Config</h1>
    <br/>
    <p>You have currently loaded <strong>GPT-2 <span id="__model"></span></strong> model</p>
    <br/>
    <div>
        <p>
          <b>Seed:</b>
            <input type="number" min="0" max="999" step="0.01" id="seed" value="0"/>
            <br/><br/>
          <b>Temperature:</b>
            <input type="number" min="0.00" max="999.99" step="0.01" id="temp" value="0.70"/>
            <br/><br/>
          <b>top_k:</b>
            <input type="number" min="0" max="9999" id="top_k" value="0"/>
            <br/><br/>
          <b>Generate how much:</b>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="length" min="1" max="1023" value="60"/>
            <br/><br/>
        </p>

        <button id="st_button" onclick="start_serv()">Start AI Server</button><br/>
        <span class="c-inline-spinner" style="visibility: hidden;" id="spinner"></span><br/>
        <b><i id="timeElapsed"></i></b>
    </div>
    <br/>
    <h3>- Rol Ball -</h3>
    <br/>
    <div>
      <h2 style="text-decoration: underline dotted;">Help</h2>
      <p class="nomargin">
        <b>Seed</b>: <i>Integer</i> seed for random number generators, fix seed to reproduce<br/>
         results. <b>0</b> (default) is a special setting meaning <b>random seed</b>.
      </p><br/>
      <p class="nomargin">
        <b>Temperature</b>: <i>Float value</i> controlling randomness in boltzmann<br/>
         distribution. Lower temperature results in less random completions. As the<br/>
         temperature approaches zero, the model will become deterministic and<br/>
         repetitive. Higher temperature results in more random completions.
      </p><br/>
      <p class="nomargin">
        <b>top_k</b>: <i>Integer value</i> controlling diversity. 1 means only 1 word is<br/>
         considered for each step (token), resulting in deterministic completions,<br/>
         while 40 means 40 words are considered at each step. <b>0</b> (default) is a<br/>
         special setting meaning <b>no restrictions</b>.
      </p><br/>
      <p class="nomargin">
        <b>Generate how much</b>: <i>Integer value</i> controlling the number of tokens<br/>
        in generated text. If <b>0</b>, is determined by model hyperparameters.
      </p><br/>
    </p>

    <!-- script -->
    <script type="text/Javascript">
      const urlParams = new URLSearchParams(window.location.search.toString());
      document.getElementById("__model").innerHTML=urlParams.get("model_name");
      localStorage.setItem("rolball/server/"+"gptext","false");
      var CANCEL=false;
      var startTime, endTime;
      function start() {
        startTime = new Date();
        document.getElementById("spinner").style.visibility="visible";
      }
      function end() {
        endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;
        document.getElementById("spinner").style.visibility="hidden";

        // get seconds
        var seconds = Math.round(timeDiff);
        document.getElementById("timeElapsed").innerHTML="Last interference time: "+seconds+" seconds";
        return seconds;
      }

      function desanitize(text) {
        return text.slice(1,-1).replace(/\\n/g, "\n").replace(/\\\\n/g, "\\n").replace(/\\'/g, "'").replace(/\\\\'/g, "'");
      }

      function start_serv(){
        document.getElementById("st_button").innerHTML="Server Running...";
        localStorage.setItem("rolball/server/"+"running","Ok!");
      }

      function GEN(prefix){
        var seed = parseInt(document.getElementById('seed').value);
        var temp = parseFloat(document.getElementById('temp').value);
        var top_k = parseInt(document.getElementById('top_k').value);
        var length = parseInt(document.getElementById('length').value);

        start();
        self.parent.postMessage([prefix.toString(),seed,temp,top_k,length], '*');
      }
      function GREC(b){
        end();
        if(CANCEL){return;}
        localStorage.setItem("rolball/server/"+"rec",desanitize(b.toString()));
        localStorage.setItem("rolball/server/"+"running","Ok!");
      }
      window.onmessage = function(e){
        GREC(e.data);
      };

      function REC(){
        if(localStorage.getItem("rolball/server/"+"running") == "false"){setTimeout(REC,100);return;}

        var a=localStorage.getItem("rolball/server/"+"gptext");
        if(a===null){localStorage.setItem("rolball/server/"+"gptext","false");a="false";}
        if(a==="<|cancel|>"){
          localStorage.setItem("rolball/server/"+"running","Ok!");
          document.getElementById("spinner").style.visibility="hidden";
          CANCEL=true;
          setTimeout(REC,100);
          return;
        }

        CANCEL=false;
        if(a !== "false"){
          GEN(a);
          localStorage.setItem("rolball/server/"+"running","Generating...");
          localStorage.setItem("rolball/server/"+"gptext","false");
        }
        setTimeout(REC,100);
      }
      REC();
    </script>
  </body>
</html>
