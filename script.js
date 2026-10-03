'use strict';
const recipes={
 "omelete": {
  "number": "001 / 120",
  "title": "Omelete de tomate e queijo",
  "meta": "15 min estimados · 2 porções",
  "ingredients": [
   "4 ovos",
   "1 tomate pequeno picado",
   "4 colheres (sopa) de queijo ralado",
   "1 colher (chá) de óleo",
   "sal e orégano a gosto"
  ],
  "steps": [
   "Bata os ovos e misture tomate, queijo, sal e orégano.",
   "Aqueça o óleo em frigideira antiaderente. Despeje a mistura, tampe e cozinhe em fogo baixo por 5 a 7 minutos.",
   "Vire com a ajuda de um prato e cozinhe até o centro ficar firme e os ovos totalmente cozidos."
  ],
  "tip": "Retire as sementes do tomate se ele estiver muito úmido. Sirva com pão ou salada."
 },
 "arroz": {
  "number": "048 / 120",
  "title": "Arroz de frigideira com legumes",
  "meta": "15 min estimados · 2 porções",
  "ingredients": [
   "2 xícaras de arroz cozido",
   "1 cenoura pequena ralada",
   "1/2 xícara de ervilha escorrida",
   "1/2 cebola picada",
   "1 colher (sopa) de óleo",
   "2 colheres (sopa) de água",
   "sal a gosto"
  ],
  "steps": [
   "Refogue a cebola no óleo. Junte a cenoura e mexa por 3 minutos.",
   "Acrescente arroz, ervilha e água. Misture, tampe e aqueça em fogo baixo.",
   "Mexa novamente e sirva quando tudo estiver bem quente; para reaquecimento, confira 74 °C no centro. Ajuste o sal."
  ],
  "tip": "Use arroz previamente cozido e conservado adequadamente."
 },
 "pao": {
  "number": "016 / 120",
  "title": "Sanduíche quente de frigideira",
  "meta": "15 min estimados · 2 sanduíches",
  "ingredients": [
   "4 fatias de pão",
   "4 fatias de queijo",
   "1 tomate em fatias finas",
   "2 colheres (chá) de manteiga",
   "orégano a gosto"
  ],
  "steps": [
   "Monte os sanduíches com queijo, tomate e orégano. Passe manteiga do lado de fora dos pães.",
   "Coloque em frigideira, em fogo baixo, e tampe por 2 a 3 minutos.",
   "Vire, doure o outro lado e sirva quando o queijo estiver derretido."
  ],
  "tip": "Seque as fatias de tomate para o pão não ficar encharcado."
 }
};
recipes.doce={"number":"115 / 120","title":"Mousse de maracujá","meta":"10 min + 4 h de geladeira estimados · 6 porções","ingredients":["1 lata ou caixa de leite condensado (395 g)","1 caixa de creme de leite (200 g)","1/2 xícara de suco concentrado de maracujá sem açúcar"],"steps":["Bata leite condensado, creme de leite e suco no liquidificador até ficar uniforme.","Distribua em um recipiente ou seis taças e cubra.","Leve à geladeira por pelo menos 4 horas antes de servir."],"tip":"Use suco concentrado próprio para preparo, não refresco diluído."};
const tabs=Array.from(document.querySelectorAll('[role="tab"]'));
function setRecipe(tab){
 const r=recipes[tab.dataset.recipe];
 tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
 document.getElementById('recipe-panel').setAttribute('aria-labelledby',tab.id);
 for(const key of ['number','title','meta','tip'])document.getElementById('recipe-'+key).textContent=r[key];
 for(const key of ['ingredients','steps']){const list=document.getElementById('recipe-'+key);list.replaceChildren(...r[key].map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>setRecipe(tab));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();tabs[n].focus();setRecipe(tabs[n]);});});
if('IntersectionObserver' in window){
 const visibility=new Map([['hero-buy',true],['oferta',false],['footer',false]]);
 const sticky=document.getElementById('sticky-buy');
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)visibility.set(entry.target.id||'footer',entry.isIntersecting);sticky.hidden=Array.from(visibility.values()).some(Boolean);},{threshold:0});
 observer.observe(document.getElementById('hero-buy'));observer.observe(document.getElementById('oferta'));observer.observe(document.querySelector('footer'));
}

setRecipe(tabs[0]);

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=document.querySelectorAll('.section-heading,.sample-copy,.recipe-paper,.bonus-copy,.offer,.faq>div,.categories-grid,.use-steps>div,.guarantee-section>div');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
 document.documentElement.classList.add('motion-ready');
 const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');entry.target.classList.remove('reveal-pending');observer.unobserve(entry.target);}});},{threshold:0,rootMargin:'0px 0px -40px 0px'});
 revealTargets.forEach(el=>{el.setAttribute('data-reveal','');if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('reveal-pending');revealObserver.observe(el);}});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){document.documentElement.classList.remove('motion-ready');revealObserver.disconnect();}});
}
tabs.forEach(tab=>tab.addEventListener('click',()=>{if(!reducedMotion.matches)document.getElementById('recipe-panel').animate([{opacity:.65,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});}));
if(!reducedMotion.matches&&window.matchMedia('(min-width: 761px)').matches){
 const image=document.querySelector('.photo-frame>img');let queued=false;
 const move=()=>{const rect=image.parentElement.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const offset=Math.max(-12,Math.min(12,(innerHeight/2-rect.top-rect.height/2)*.035));image.style.transform='translateY('+offset+'px) scale(1.055)';}queued=false;};
 window.addEventListener('scroll',()=>{if(!queued&&!reducedMotion.matches){queued=true;requestAnimationFrame(move);}},{passive:true});move();
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)image.style.transform='none';});
}
