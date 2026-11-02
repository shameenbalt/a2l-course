/* Motion and depth: cards flip up as you scroll, tilt toward the mouse, press in on touch, and the home scene moves in layers. */
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var Q=function(s){return [].slice.call(document.querySelectorAll(s))};
  var CARDS=".tools a,.why div,.panel,.mock,.steps li,.ls li,.board li,.ign span,.nums .num,.tl li,.leds,.dd>div,figure,.box,.term,.test,.lessons li,.how div,.me,.schools,.final,.tbl,.grid,.label,.story";
  /* 1. reveal: only things below the first screen, so nothing blinks at the top */
  if(!document.body.hasAttribute("data-no-reveal")&&"IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px"});
    Q(CARDS).forEach(function(el){
      if(el.closest(".rv"))return;
      var r=el.getBoundingClientRect();if(r.top<innerHeight*.9)return;
      var sib=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;
      el.style.setProperty("--d",Math.min(sib%4,3)*0.08+"s");el.classList.add("rv");io.observe(el)});
  }
  /* 1b. headings slide in; drawings below the fold draw their lines as they come into view */
  if(!document.body.hasAttribute("data-no-reveal")&&"IntersectionObserver" in window){
    Q("article h2").forEach(function(h){if(h.getBoundingClientRect().top<innerHeight*.9)return;h.classList.add("rvh");io.observe(h)});
    Q("figure svg").forEach(function(svg){
      if(svg.getBoundingClientRect().top<innerHeight*.9)return;var k=0;
      [].slice.call(svg.querySelectorAll("path,line,rect,circle,ellipse,polyline,polygon")).forEach(function(el){
        var cs=getComputedStyle(el);if(cs.stroke==="none"||cs.fill!=="none"||cs.strokeDasharray!=="none"||!el.getTotalLength)return;
        var L;try{L=el.getTotalLength()}catch(e){return}if(!L||L<8)return;
        el.style.strokeDasharray=L;el.style.strokeDashoffset=L;el.classList.add("draw");el.style.setProperty("--dd",Math.min(k++,8)*0.07+"s")});
      var fig=svg.closest("figure");
      var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
        [].slice.call(svg.querySelectorAll(".draw")).forEach(function(el){el.style.strokeDashoffset=0});o.disconnect()})},{rootMargin:"0px 0px -15% 0px"});
      o.observe(fig||svg)});
  }
  /* 2. tilt toward the mouse, press in on touch */
  Q(".tools a,.why div,.panel b,.steps li,.board .card,.ign span,.nums .num,.dd>div,.mock,.how div,.me,.lessons .card").forEach(function(el){
    el.classList.add("tilt");var base=null;
    el.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse")return;
      if(base===null){var t=getComputedStyle(el).transform;base=t==="none"?"":t}
      var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.classList.add("tilting");
      el.style.transform="perspective(700px) rotateX("+(-y*10).toFixed(2)+"deg) rotateY("+(x*12).toFixed(2)+"deg) translateZ(8px) "+base;
      el.style.boxShadow=(-x*14).toFixed(1)+"px "+(10-y*8).toFixed(1)+"px 22px rgba(0,0,0,.22)"});
    el.addEventListener("pointerleave",function(){el.classList.remove("tilting","press");el.style.transform="";el.style.boxShadow="";base=null});
    el.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")el.classList.add("press")});
    ["pointerup","pointercancel"].forEach(function(n){el.addEventListener(n,function(){el.classList.remove("press")})});
  });
  /* 2b. pressure bar along the top fills as you scroll; lesson header wall drifts slower than the page */
  var bar=document.createElement("div");bar.className="pbar";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);
  var hero=document.querySelector(".lhero"),scn=document.querySelector(".scene"),ndl=scn?[].slice.call(scn.querySelectorAll(".ndl")):[],
      base=ndl.map(function(n){return parseFloat(n.style.getPropertyValue("--a"))||0});
  if(scn)setTimeout(function(){scn.classList.add("live")},1800);
  var ticking=false;
  function onScroll(){ticking=false;var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=h.scrollTop,k=max>0?Math.min(1,y/max):0;
    bar.style.transform="scaleX("+k+")";
    if(hero)hero.style.backgroundPositionY=(y*0.35)+"px";
    if(scn&&scn.classList.contains("live")){var r=scn.getBoundingClientRect();if(r.bottom>0){var t=Math.min(1,y/600);
      /* scroll down: low side pulls down, high side and nitrogen climb */
      ndl.forEach(function(n,i){n.style.setProperty("--a",(base[i]+[-60,70,50][i%3]*t)+"deg")})}}}
  addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
  /* 3. home scene in layers: wall moves one way, tools the other (mouse, or phone tilt where allowed) */
  var sc=document.querySelector(".scene");
  if(sc){
    var wall=sc.querySelector(".wall"),objs=[].slice.call(sc.querySelectorAll("a")),depth=[5,8,11];
    function move(x,y){if(wall)wall.style.transform="translate("+(-x*6)+"px,"+(-y*4)+"px)";
      objs.forEach(function(a,i){a.style.transform="translate("+(x*depth[i%3])+"px,"+(y*depth[i%3]*.6)+"px)"})}
    sc.addEventListener("pointermove",function(e){if(e.pointerType!=="mouse")return;var r=sc.getBoundingClientRect();move((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5)});
    sc.addEventListener("pointerleave",function(){move(0,0)});
    addEventListener("deviceorientation",function(e){if(e.gamma==null)return;move(Math.max(-1,Math.min(1,e.gamma/30))*.5,Math.max(-1,Math.min(1,(e.beta-45)/30))*.5)});
  }
})();
