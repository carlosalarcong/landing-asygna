var industries = [
  {id:'salud',label:'Salud',heroWord:'caos de turnos.',sub:'Gestiona turnos de enfermeras, técnicos y médicos cumpliendo normativas de descanso y cobertura mínima por turno.',previewTitle:'Cobertura garantizada en clínicas y hospitales',previewDesc:'Control de turnos 4x4, guardias de urgencia, descansos compensatorios y alertas de dotación mínima por servicio.',badge:'Salud'},
  {id:'seguridad',label:'Seguridad',heroWord:'descontrol de rondas.',sub:'Organiza guardias, relevos y puntos de cobertura para empresas de seguridad privada con múltiples clientes y sitios.',previewTitle:'Planificación de guardias y sitios de cobertura',previewDesc:'Asignación por sitio, control de relevos, registro de rondas y reportes de incidencias por turno.',badge:'Seguridad'},
  {id:'mineria',label:'Minería',heroWord:'desorden de faenas.',sub:'Administra esquemas de rotación 7x7, 14x7 o personalizados con control de fatiga, traslados y faenas en terreno.',previewTitle:'Rotaciones complejas en faenas mineras',previewDesc:'Soporte para esquemas 7x7 y 14x7, control de horas de fatiga, gestión de traslados y costos de faena.',badge:'Minería'},
  {id:'gastronomia',label:'Gastronomía',heroWord:'caos del servicio.',sub:'Coordina brigadas de cocina, mozos y baristas considerando afluencia, eventos y temporada alta sin fricciones.',previewTitle:'Brigadas de cocina y sala coordinadas',previewDesc:'Turnos variables por día, gestión de part-time, control de horas extra y planificación para eventos especiales.',badge:'Gastro'},
  {id:'logistica',label:'Logística',heroWord:'desorden de la flota.',sub:'Sincroniza turnos de conductores, operadores de bodega y despachadores respetando tiempos de descanso legales.',previewTitle:'Coordinación de conductores y operadores de bodega',previewDesc:'Control de jornadas de conducción, descansos obligatorios, asignación por ruta y reportes de productividad.',badge:'Logística'},
  {id:'limpieza',label:'Limpieza',heroWord:'descontrol de cuadrillas.',sub:'Organiza cuadrillas por cliente y edificio, controla asistencia en terreno y gestiona reemplazos de última hora.',previewTitle:'Gestión de cuadrillas por cliente y edificio',previewDesc:'Asignación por sitio, control de check-in en terreno, reemplazos automáticos y costos por contrato.',badge:'Limpieza'},
  {id:'construccion',label:'Construcción',heroWord:'caos de la obra.',sub:'Coordina maestros, operadores y subcontratistas por obra con control de avance, horas y costos en tiempo real.',previewTitle:'Control de personal por obra y frente de trabajo',previewDesc:'Turnos por obra, control de subcontratistas, registro de horas por partida y proyección de costo de mano de obra.',badge:'Construcción'}
];

var activeId = null;

function renderPills() {
  var container = document.getElementById('pills-container');
  industries.forEach(function(ind) {
    var pill = document.createElement('button');
    pill.className = 'pill';
    pill.id = 'pill-' + ind.id;
    pill.textContent = ind.label;
    pill.onclick = function() { selectIndustry(ind.id); };
    container.appendChild(pill);
  });
}

function selectIndustry(id) {
  var ind = industries.filter(function(i){ return i.id === id; })[0];
  if (!ind) return;
  var preview = document.getElementById('industry-preview');
  if (activeId === id) {
    activeId = null;
    document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
    document.getElementById('hero-industry').textContent = 'caos.';
    document.getElementById('hero-sub').textContent = 'Asygna simplifica la planificación de equipos rotativos y la gestión financiera de tu organización, desde una sola plataforma. Sé de los primeros en probarla.';
    document.getElementById('preview-title').textContent = 'Selecciona un rubro para ver cómo Asygna se adapta';
    document.getElementById('preview-desc').textContent = 'Cada industria tiene sus propios desafíos de turno. Asygna viene preconfigurado para los más comunes.';
    document.getElementById('preview-badge').style.visibility = 'hidden';
    preview.classList.remove('has-selection');
    return;
  }
  activeId = id;
  document.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('pill-' + id).classList.add('active');
  var heroEl = document.getElementById('hero-industry');
  heroEl.style.opacity = '0';
  setTimeout(function(){ heroEl.textContent = ind.heroWord; heroEl.style.opacity = '1'; }, 150);
  var subEl = document.getElementById('hero-sub');
  subEl.style.opacity = '0';
  setTimeout(function(){ subEl.textContent = ind.sub; subEl.style.opacity = '1'; }, 180);
  preview.classList.remove('fade'); void preview.offsetWidth; preview.classList.add('fade');
  preview.classList.add('has-selection');
  document.getElementById('preview-title').textContent = ind.previewTitle;
  document.getElementById('preview-desc').textContent = ind.previewDesc;
  var badge = document.getElementById('preview-badge');
  badge.textContent = ind.badge;
  badge.style.visibility = 'visible';
}

var isAnnual = false;
function toggleBilling() {
  isAnnual = !isAnnual;
  document.getElementById('toggle-thumb').className = 'toggle-thumb' + (isAnnual ? ' annual' : '');
  document.getElementById('lbl-monthly').className = 'toggle-label' + (isAnnual ? '' : ' active');
  document.getElementById('lbl-annual').className = 'toggle-label' + (isAnnual ? ' active' : '');
}

function toggleFaq(btn) {
  var answer = btn.nextElementSibling;
  var isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(function(b){ b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
  if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
}

if(document.getElementById("pills-container")){renderPills();}

// Formulario Web3Forms
function submitForm(e) {
  e.preventDefault();
  var btn = document.getElementById('form-btn');
  var msg = document.getElementById('form-msg');
  var form = document.getElementById('contact-form');

  var nombre = form.querySelector('[name="nombre"]').value.trim();
  var email = form.querySelector('[name="email"]').value.trim();
  if (!nombre || !email) {
    msg.style.display = 'block';
    msg.style.background = 'rgba(226,75,74,0.1)';
    msg.style.color = '#A32D2D';
    msg.textContent = 'Por favor completa nombre y correo.';
    return;
  }

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  var data = {
    access_key: 'c2ec01fe-72f5-439d-8c7a-2777e86e1159',
    subject: 'Nuevo founding member — Asygna',
    from_name: 'Landing Asygna',
    nombre: nombre,
    apellido: form.querySelector('[name="apellido"]').value.trim(),
    email: email,
    industria: form.querySelector('[name="industria"]').value,
    botcheck: ''
  };

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function(res) { return res.json(); })
  .then(function(json) {
    msg.style.display = 'block';
    if (json.success) {
      msg.style.background = 'rgba(29,158,117,0.1)';
      msg.style.color = '#085041';
      msg.textContent = '¡Listo! Te contactaremos pronto con los beneficios de founding member.';
      form.querySelector('[name="nombre"]').value = '';
      form.querySelector('[name="apellido"]').value = '';
      form.querySelector('[name="email"]').value = '';
      form.querySelector('[name="industria"]').value = '';
      btn.textContent = 'Cupo reservado ✓';
      btn.style.background = '#085041';
    } else {
      msg.style.background = 'rgba(226,75,74,0.1)';
      msg.style.color = '#A32D2D';
      msg.textContent = 'Hubo un error. Escríbenos a contacto@asygna.cl';
      btn.textContent = 'Reservar mi cupo gratis';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  })
  .catch(function() {
    msg.style.display = 'block';
    msg.style.background = 'rgba(226,75,74,0.1)';
    msg.style.color = '#A32D2D';
    msg.textContent = 'Error de conexión. Escríbenos a contacto@asygna.cl';
    btn.textContent = 'Reservar mi cupo gratis';
    btn.disabled = false;
    btn.style.opacity = '1';
  });
}

// Nav border
window.addEventListener('scroll', function() {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Scroll reveal
var srObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('sr-visible'); srObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.sr').forEach(function(el) { srObs.observe(el); });

// Gantt bars animadas
setTimeout(function() {
  var bars = [{id:'gbar1',w:'60%'},{id:'gbar2',w:'40%'},{id:'gbar3',w:'70%'},{id:'gbar4',w:'50%'}];
  bars.forEach(function(b) { var el=document.getElementById(b.id); if(el) el.style.width=b.w; });
}, 400);

// Contadores animados
function animateCounter(el) {
  var target=parseInt(el.getAttribute('data-target'));
  var divisor=parseInt(el.getAttribute('data-divisor')||'1');
  var suffix=el.getAttribute('data-suffix')||'';
  var duration=1800; var startTime=null;
  function step(ts) {
    if(!startTime) startTime=ts;
    var prog=Math.min((ts-startTime)/duration,1);
    var ease=1-Math.pow(1-prog,3);
    var val=Math.round(ease*target);
    el.textContent=divisor>1?(val/divisor).toFixed(0)+suffix:val+suffix;
    if(prog<1) requestAnimationFrame(step);
    else el.textContent=divisor>1?(target/divisor)+suffix:target+suffix;
  }
  requestAnimationFrame(step);
}
var statsObs=new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if(e.isIntersecting) {
      ['cnt-1','cnt-2','cnt-3'].forEach(function(id){ var el=document.getElementById(id); if(el) animateCounter(el); });
      statsObs.disconnect();
    }
  });
},{threshold:0.5});
var statsEl=document.querySelector('.stats');
if(statsEl) statsObs.observe(statsEl);

// Narrativa controlada por scroll
(function(){
  var story=document.getElementById('shift-story');if(!story)return;
  var copies=[].slice.call(document.querySelectorAll('.shift-step')),dots=[].slice.call(document.querySelectorAll('.story-dot')),scenes=[].slice.call(document.querySelectorAll('.story-scene'));
  var workers=[].slice.call(document.querySelectorAll('.shift-worker')),metrics=[].slice.call(document.querySelectorAll('.shift-metric')),calendar=document.getElementById('shift-calendar'),workspaceEl=document.querySelector('.stage-workspace'),finalLogo=document.getElementById('stage-final'),progressBar=document.getElementById('scroll-progress'),status=document.getElementById('stage-status');
  var starts=[{x:15,y:20},{x:50,y:18},{x:85,y:22},{x:30,y:70},{x:70,y:72}],targets=[{x:10,y:31},{x:30,y:52},{x:50,y:31},{x:70,y:52},{x:90,y:31}];
  var labels=['Planificación activa','Turnos organizados','Reemplazo en curso','Cumplimiento validado','Documentos generados','Empresas protegidas','Operación bajo control','Todo funcionando'];
  function clamp(n,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return Math.min(Math.max(n,a),b)}function lerp(a,b,t){return a+(b-a)*t}function ease(t){t=clamp(t);return 1-Math.pow(1-t,3)}
  function showScene(active){scenes.forEach(function(el){var n=Number(el.getAttribute('data-scene'));el.classList.toggle('scene-active',n===active || (active===1&&n===0))})}
  function updateStory(){
    var docMax=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.width=(docMax>0?clamp(window.scrollY/docMax)*100:0)+'%';
    var rect=story.getBoundingClientRect(),max=story.offsetHeight-window.innerHeight,raw=max>0?clamp((-rect.top)/max):1,active=Math.min(7,Math.floor(raw*8));
    copies.forEach(function(el,i){el.classList.toggle('is-active',i===active)});dots.forEach(function(el,i){el.classList.toggle('active',i===active)});status.textContent=labels[active];showScene(active);finalLogo.style.opacity=0;
    var segment=1/8,local=clamp((raw-active*segment)/segment);
    if(active<=1){var organize=active===0?ease(local*.45):ease(.45+local*.55);var wW=workspaceEl?workspaceEl.clientWidth:0;workers.forEach(function(el,i){var x=lerp(starts[i].x,targets[i].x,organize),y=lerp(starts[i].y,targets[i].y,organize);if(wW){var halfW=el.offsetWidth/2,margin=6,xPx=clamp(wW*x/100,halfW+margin,wW-halfW-margin);el.style.left=xPx+'px'}else{el.style.left=x+'%'}el.style.top=y+'%';el.style.transform='translate(-50%,-50%) rotate('+lerp(i%2?5:-5,0,organize)+'deg)';el.style.opacity=1});calendar.style.opacity=lerp(.24,1,organize);calendar.style.transform='scale('+lerp(.965,1,organize)+')';metrics.forEach(function(el,i){var t=clamp((organize-.58)*3-i*.12);el.style.opacity=t;el.style.transform='translateY('+lerp(24,0,ease(t))+'px)'})}
    if(active===2){var line=document.querySelector('.replacement-line'),check=document.querySelector('.resolve-check');line.style.transform='scaleX('+ease(local)+')';check.style.opacity=clamp((local-.62)*3);check.style.transform='translate(-50%,-50%) scale('+lerp(.4,1,ease((local-.55)*2.2))+')'}
    if(active===3){var fill=document.querySelector('.timeline-fill'),pill=document.querySelector('.validation-pill');if(window.innerWidth<=900){fill.style.width='100%';fill.style.height=(ease(local)*100)+'%'}else{fill.style.height='100%';fill.style.width=(ease(local)*100)+'%'};pill.style.opacity=clamp((local-.62)*3);pill.style.transform='translateY('+lerp(8,0,ease((local-.55)*2.2))+'px)'}
    if(active===4){var docs=[].slice.call(document.querySelectorAll('.doc'));docs.forEach(function(d,i){var t=clamp(local*1.4-i*.15);d.style.transform='rotate('+lerp((2-i)*4,0,ease(t))+'deg) translate('+lerp((2-i)*8,0,ease(t))+'px,'+lerp((2-i)*3,0,ease(t))+'px)'})}
    if(active===5){var cards=[].slice.call(document.querySelectorAll('.tenant-card'));cards.forEach(function(c,i){var t=clamp(local*1.5-i*.12);c.style.opacity=t;c.style.transform='translateY('+lerp(18,0,ease(t))+'px)'})}
    if(active===6){var dash=document.querySelector('.dashboard-card'),bars=[].slice.call(document.querySelectorAll('.dash-bar'));dash.style.opacity=ease(local);dash.style.transform='translateY('+lerp(18,0,ease(local))+'px) scale('+lerp(.97,1,ease(local))+')';bars.forEach(function(b,i){var t=clamp(local*1.5-i*.1);b.style.transform='scaleY('+lerp(.05,1,ease(t))+')';b.style.opacity=lerp(.25,1,ease(t))})}
    if(active===7){scenes.forEach(function(el){el.classList.remove('scene-active')});finalLogo.style.opacity=ease(local);finalLogo.style.transform='scale('+lerp(.78,1,ease(local))+')'}
  }
  var ticking=false;function requestUpdate(){if(!ticking){requestAnimationFrame(function(){updateStory();ticking=false});ticking=true}}window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate);updateStory();
})();

// Progreso y microinteracción del formulario, sin alterar el envío
(function(){
  var form=document.getElementById('contact-form'),card=document.querySelector('.contact-card'),contact=document.getElementById('contact');
  if(!form||!card) return;
  var fields=[].slice.call(form.querySelectorAll('input[type=text],input[type=email],select'));
  function updateFormProgress(){var completed=fields.filter(function(f){return String(f.value||'').trim().length>0}).length;card.style.setProperty('--form-progress',(completed/fields.length*100)+'%');card.setAttribute('data-complete',completed)}
  fields.forEach(function(f){f.addEventListener('input',updateFormProgress);f.addEventListener('change',updateFormProgress)});updateFormProgress();
  card.addEventListener('mousemove',function(e){if(window.innerWidth<900)return;var r=card.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-2.2,ry=((e.clientX-r.left)/r.width-.5)*2.2;card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-2px)'});
  card.addEventListener('mouseleave',function(){card.style.transform=''});
  window.addEventListener('scroll',function(){if(!contact)return;var r=contact.getBoundingClientRect(),p=Math.max(-1,Math.min(1,(window.innerHeight/2-(r.top+r.height/2))/window.innerHeight));contact.style.setProperty('--contact-shift',(p*18)+'px')},{passive:true});
})();
