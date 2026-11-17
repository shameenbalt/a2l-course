/* Read it to me: reads page text out loud with the phone's built-in voice (Web Speech API).
   Free, no account, nothing leaves the phone.
   Lessons: <script src="../../assets/readaloud.js" data-read="article" defer></script>
            adds a button under the first h1 that reads that container.
   Quiz:    window.RA.toggle(text, button) reads any text; RA.stop() stops. */
(function(){
  var ss=window.speechSynthesis;
  if(!ss||typeof SpeechSynthesisUtterance==="undefined")return;
  var me=document.currentScript,cur=null,id=0;

  var css=document.createElement("style");
  css.textContent=".ra-btn{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;min-height:44px;padding:8px 14px;border:2px solid currentColor;border-radius:999px;background:transparent;color:inherit;font:600 .95rem/1 inherit;font-family:inherit;cursor:pointer}"+
    ".ra-btn[aria-pressed=true]{background:currentColor}.ra-btn[aria-pressed=true] span{filter:invert(1)}"+
    ".ra-btn:focus-visible{outline:3px solid #c8322b;outline-offset:2px}";
  document.head.appendChild(css);

  function label(b,on){if(!b)return;b.setAttribute("aria-pressed",on?"true":"false");b.querySelector("span").textContent=on?"■ Stop reading":"🔊 Read it to me"}
  function stop(){id++;ss.cancel();label(cur,false);cur=null}
  function chunks(t){
    t=t.replace(/\s+/g," ").trim();
    var parts=t.match(/[^.!?]+[.!?]*\s*/g)||[t],out=[],buf="";
    parts.forEach(function(p){if((buf+p).length>220){if(buf)out.push(buf);buf=p}else buf+=p});
    if(buf)out.push(buf);return out}
  function speak(text,btn){
    stop();var run=++id,list=chunks(text),k=0;cur=btn||null;label(cur,true);
    var next=function(){
      if(run!==id)return;
      if(k>=list.length){label(cur,false);cur=null;return}
      var u=new SpeechSynthesisUtterance(list[k++]);u.lang="en-US";u.rate=0.95;
      u.onend=next;u.onerror=function(){if(run===id){label(cur,false);cur=null}};
      ss.speak(u)};
    next()}
  function toggle(text,btn){if(cur&&cur===btn)stop();else speak(text,btn)}
  function makeBtn(){var b=document.createElement("button");b.type="button";b.className="ra-btn";b.innerHTML="<span></span>";label(b,false);return b}
  /* text a person sees, skipping pictures, buttons, menus and hidden parts */
  function readable(el){
    var c=el.cloneNode(true);
    c.querySelectorAll("svg,script,style,button,nav,input,select,textarea,[aria-hidden=true],[hidden],.ra-btn,.no-read").forEach(function(n){n.remove()});
    return c.textContent}

  window.RA={speak:speak,stop:stop,toggle:toggle,makeBtn:makeBtn,readable:readable};
  window.addEventListener("pagehide",stop);

  var sel=me&&me.getAttribute("data-read");
  if(sel){var go=function(){
    var box=document.querySelector(sel);if(!box)return;
    var h=box.querySelector("h1"),b=makeBtn();
    b.onclick=function(){toggle(readable(box),b)};
    if(h&&h.parentNode)h.parentNode.insertBefore(b,h.nextSibling);else box.insertBefore(b,box.firstChild)};
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()}
})();
