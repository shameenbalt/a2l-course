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
