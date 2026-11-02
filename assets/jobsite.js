/* Reading gauge: a small pressure gauge whose needle follows how far you've read. Tap it to jump to the quiz. */
(function(){
  var go=document.querySelector("a.go");if(!go)return;
  var b=document.createElement("button");b.type="button";b.className="rgauge";b.setAttribute("aria-label","Reading progress. Tap to jump to the lesson quiz.");
  var t="";for(var i=0;i<=10;i++){var a=(-135+i*27)*Math.PI/180,r1=23,r2=i%5?20:17;
    t+='<line x1="'+(31+Math.sin(a)*r1).toFixed(1)+'" y1="'+(31-Math.cos(a)*r1).toFixed(1)+'" x2="'+(31+Math.sin(a)*r2).toFixed(1)+'" y2="'+(31-Math.cos(a)*r2).toFixed(1)+'" stroke="#2a2f31" stroke-width="'+(i%5?1:1.8)+'"/>'}
  b.innerHTML='<svg viewBox="0 0 62 62" aria-hidden="true"><circle cx="31" cy="31" r="30" fill="#8f9a9f"/><circle cx="31" cy="31" r="26" fill="#f3efe4"/>'+
    '<path d="M47.3 47.3A23 23 0 0 0 54 31" fill="none" stroke="#1f7a4a" stroke-width="4"/>'+t+
    '<text x="31" y="45" text-anchor="middle" font-size="6.5" font-family="IBM Plex Mono,monospace" fill="#4a5154">READ</text>'+
    '<g transform="translate(31 31)"><g class="ndl"><line x1="0" y1="5" x2="0" y2="-21" stroke="#c8322b" stroke-width="2" stroke-linecap="round"/></g><circle r="3" fill="#2a2f31"/></g></svg><span class="pct">0%</span>';
  document.body.appendChild(b);
  var n=b.querySelector(".ndl"),p=b.querySelector(".pct");
  function upd(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight,k=max>0?Math.min(1,Math.max(0,h.scrollTop/max)):1;
    n.style.transform="rotate("+(-135+270*k)+"deg)";p.textContent=k>.97?"QUIZ ▸":Math.round(k*100)+"%"}
  addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
  b.addEventListener("click",function(){go.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});go.focus({preventScroll:true})});
})();
