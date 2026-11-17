(function(){
'use strict';

/* ---------- data: muscle groups and exercises ---------- */
var GROUPS = [
  {id:'chest', n:'Στήθος', c:'#D9432F'},
  {id:'back', n:'Πλάτη', c:'#2F5FD0'},
  {id:'shoulders', n:'Ώμοι', c:'#E08A00'},
  {id:'biceps', n:'Δικέφαλα', c:'#2E9A5B'},
  {id:'triceps', n:'Τρικέφαλα', c:'#8A54D6'},
  {id:'forearms', n:'Πήχεις', c:'#0C97A6'},
  {id:'quads', n:'Τετρακέφαλοι', c:'#D6337F'},
  {id:'hams', n:'Οπίσθιοι και γλουτοί', c:'#7E9B12'},
  {id:'calves', n:'Γάμπες', c:'#A8641F'},
  {id:'abs', n:'Κοιλιακοί', c:'#5E6AD2'},
  {id:'full', n:'Ολόσωμα', c:'#6B7780'}
];
var GMAP = {}; GROUPS.forEach(function(g){ GMAP[g.id]=g; });

/* [id, ελληνικό όνομα, αγγλικό όνομα, ομάδα, flags: b = σωματικό βάρος, t = χρόνος] */
var EX_RAW = [
  ['bench-press','Πάγκος με μπάρα','Barbell Bench Press','chest'],
  ['incline-bench','Κεκλιμένος πάγκος με μπάρα','Incline Barbell Bench Press','chest'],
  ['decline-bench','Κατηφορικός πάγκος με μπάρα','Decline Barbell Bench Press','chest'],
  ['db-bench','Πάγκος με αλτήρες','Dumbbell Bench Press','chest'],
  ['db-incline','Κεκλιμένος πάγκος με αλτήρες','Incline Dumbbell Press','chest'],
  ['smith-bench','Πάγκος στο Smith','Smith Machine Bench Press','chest'],
  ['chest-press-machine','Πίεση στήθους σε μηχάνημα','Machine Chest Press','chest'],
  ['pec-deck','Πεταλούδα','Pec Deck Fly','chest'],
  ['db-fly','Ανοίγματα με αλτήρες','Dumbbell Fly','chest'],
  ['incline-fly','Κεκλιμένα ανοίγματα με αλτήρες','Incline Dumbbell Fly','chest'],
  ['cable-crossover','Σταυρωτά σε κάβους','Cable Crossover','chest'],
  ['pushup','Κάμψεις','Push-up','chest','b'],
  ['chest-dips','Παράλληλες για στήθος','Chest Dips','chest','b'],
  ['pullover','Pullover με αλτήρα','Dumbbell Pullover','chest'],

  ['pullup','Έλξεις με πρηνή λαβή','Pull-up','back','b'],
  ['chinup','Έλξεις με υπτία λαβή','Chin-up','back','b'],
  ['lat-pulldown','Κάθετη έλξη','Lat Pulldown','back'],
  ['close-pulldown','Κάθετη έλξη με στενή λαβή','Close-Grip Lat Pulldown','back'],
  ['straight-arm-pulldown','Έλξη με τεντωμένα χέρια','Straight-Arm Pulldown','back'],
  ['barbell-row','Κωπηλασία με μπάρα','Barbell Row','back'],
  ['pendlay-row','Pendlay Row','Pendlay Row','back'],
  ['db-row','Κωπηλασία με αλτήρα','One-Arm Dumbbell Row','back'],
  ['seated-cable-row','Καθιστή κωπηλασία σε κάβο','Seated Cable Row','back'],
  ['tbar-row','T-Bar Row','T-Bar Row','back'],
  ['machine-row','Κωπηλασία σε μηχάνημα','Machine Row','back'],
  ['chest-supported-row','Κωπηλασία με στήριξη στήθους','Chest-Supported Row','back'],
  ['deadlift','Άρση νεκρού βάρους','Deadlift','back'],
  ['rack-pull','Rack Pull','Rack Pull','back'],
  ['back-extension','Εκτάσεις πλάτης','Back Extension','back','b'],
  ['shrug-bb','Ανασηκώσεις ώμων με μπάρα','Barbell Shrug','back'],
  ['shrug-db','Ανασηκώσεις ώμων με αλτήρες','Dumbbell Shrug','back'],

  ['ohp','Πίεση ώμων με μπάρα','Overhead Press','shoulders'],
  ['db-shoulder-press','Πίεση ώμων με αλτήρες','Dumbbell Shoulder Press','shoulders'],
  ['arnold-press','Arnold Press','Arnold Press','shoulders'],
  ['machine-shoulder-press','Πίεση ώμων σε μηχάνημα','Machine Shoulder Press','shoulders'],
  ['push-press','Push Press','Push Press','shoulders'],
  ['lateral-raise','Πλάγιες ανυψώσεις','Dumbbell Lateral Raise','shoulders'],
  ['cable-lateral','Πλάγιες ανυψώσεις σε κάβο','Cable Lateral Raise','shoulders'],
  ['front-raise','Μπροστινές ανυψώσεις','Front Raise','shoulders'],
  ['rear-delt-fly','Οπίσθιες ανυψώσεις','Rear Delt Fly','shoulders'],
  ['reverse-pec-deck','Αντίστροφη πεταλούδα','Reverse Pec Deck','shoulders'],
  ['face-pull','Face Pull','Face Pull','shoulders'],
  ['upright-row','Όρθια κωπηλασία','Upright Row','shoulders'],

  ['bb-curl','Λύγισμα με μπάρα','Barbell Curl','biceps'],
  ['ez-curl','Λύγισμα με EZ μπάρα','EZ-Bar Curl','biceps'],
  ['db-curl','Λύγισμα με αλτήρες','Dumbbell Curl','biceps'],
  ['hammer-curl','Hammer Curl','Hammer Curl','biceps'],
  ['incline-curl','Λύγισμα σε κεκλιμένο πάγκο','Incline Dumbbell Curl','biceps'],
  ['preacher-curl','Λύγισμα σε πάγκο Scott','Preacher Curl','biceps'],
  ['concentration-curl','Concentration Curl','Concentration Curl','biceps'],
  ['cable-curl','Λύγισμα σε κάβο','Cable Curl','biceps'],

  ['close-grip-bench','Πάγκος με στενή λαβή','Close-Grip Bench Press','triceps'],
  ['skull-crusher','Γαλλική πίεση ξαπλωτός','Skull Crusher','triceps'],
  ['pushdown','Έκταση τρικεφάλων σε κάβο','Triceps Pushdown','triceps'],
  ['rope-pushdown','Έκταση τρικεφάλων με σχοινί','Rope Pushdown','triceps'],
  ['overhead-db-ext','Έκταση πάνω από το κεφάλι με αλτήρα','Overhead Dumbbell Extension','triceps'],
  ['overhead-cable-ext','Έκταση πάνω από το κεφάλι σε κάβο','Overhead Cable Extension','triceps'],
  ['triceps-dips','Παράλληλες για τρικέφαλα','Triceps Dips','triceps','b'],
  ['bench-dips','Βυθίσεις σε πάγκο','Bench Dips','triceps','b'],
  ['kickback','Kickback με αλτήρα','Triceps Kickback','triceps'],
  ['machine-triceps','Έκταση τρικεφάλων σε μηχάνημα','Machine Triceps Extension','triceps'],

  ['wrist-curl','Λύγισμα καρπών','Wrist Curl','forearms'],
  ['reverse-wrist-curl','Αντίστροφο λύγισμα καρπών','Reverse Wrist Curl','forearms'],
  ['reverse-curl','Αντίστροφο λύγισμα με μπάρα','Reverse Curl','forearms'],
  ['dead-hang','Ανάρτηση σε μπάρα','Dead Hang','forearms','bt'],

  ['back-squat','Squat με μπάρα','Barbell Back Squat','quads'],
  ['front-squat','Front Squat','Front Squat','quads'],
  ['smith-squat','Squat στο Smith','Smith Machine Squat','quads'],
  ['goblet-squat','Goblet Squat','Goblet Squat','quads'],
  ['hack-squat','Hack Squat','Hack Squat','quads'],
  ['leg-press','Πρέσα ποδιών','Leg Press','quads'],
  ['leg-extension','Έκταση ποδιών σε μηχάνημα','Leg Extension','quads'],
  ['bulgarian','Βουλγαρικό split squat','Bulgarian Split Squat','quads'],
  ['db-lunge','Προβολές με αλτήρες','Dumbbell Lunge','quads'],
  ['walking-lunge','Περπατητές προβολές','Walking Lunge','quads'],
  ['step-up','Ανεβάσματα σε πάγκο','Step-up','quads'],

  ['rdl','Ρουμανική άρση νεκρού','Romanian Deadlift','hams'],
  ['stiff-deadlift','Stiff-Leg Deadlift','Stiff-Leg Deadlift','hams'],
  ['sumo-deadlift','Sumo Deadlift','Sumo Deadlift','hams'],
  ['lying-leg-curl','Λύγισμα ποδιών ξαπλωτός','Lying Leg Curl','hams'],
  ['seated-leg-curl','Λύγισμα ποδιών καθιστός','Seated Leg Curl','hams'],
  ['good-morning','Good Morning','Good Morning','hams'],
  ['hip-thrust','Hip Thrust','Barbell Hip Thrust','hams'],
  ['glute-bridge','Γέφυρα γλουτών','Glute Bridge','hams'],
  ['cable-glute-kickback','Kickback γλουτών σε κάβο','Cable Glute Kickback','hams'],
  ['abductor','Απαγωγείς σε μηχάνημα','Hip Abductor Machine','hams'],
  ['adductor','Προσαγωγείς σε μηχάνημα','Hip Adductor Machine','hams'],

  ['standing-calf','Γάμπες όρθιος','Standing Calf Raise','calves'],
  ['seated-calf','Γάμπες καθιστός','Seated Calf Raise','calves'],
  ['leg-press-calf','Γάμπες στην πρέσα','Calf Press on Leg Press','calves'],
  ['donkey-calf','Donkey Calf Raise','Donkey Calf Raise','calves'],

  ['crunch','Κοιλιακοί crunch','Crunch','abs','b'],
  ['cable-crunch','Crunch σε κάβο','Cable Crunch','abs'],
  ['machine-crunch','Κοιλιακοί σε μηχάνημα','Ab Machine','abs'],
  ['decline-crunch','Crunch σε κατηφορικό πάγκο','Decline Crunch','abs','b'],
  ['hanging-leg-raise','Ανυψώσεις ποδιών σε μπάρα','Hanging Leg Raise','abs','b'],
  ['lying-leg-raise','Ανυψώσεις ποδιών ξαπλωτός','Lying Leg Raise','abs','b'],
  ['ab-wheel','Ρόδα κοιλιακών','Ab Wheel Rollout','abs','b'],
  ['russian-twist','Russian Twist','Russian Twist','abs'],
  ['woodchopper','Woodchopper σε κάβο','Cable Woodchopper','abs'],
  ['plank','Σανίδα','Plank','abs','bt'],
  ['side-plank','Πλάγια σανίδα','Side Plank','abs','bt'],

  ['power-clean','Power Clean','Power Clean','full'],
  ['kb-swing','Kettlebell Swing','Kettlebell Swing','full'],
  ['thruster','Thruster','Thruster','full'],
  ['farmers-walk','Περπάτημα αγρότη','Farmer’s Walk','full','t']
];
var BASE = EX_RAW.map(function(r){
  var f = r[4] || '';
  return {id:r[0], n:r[2], e:r[1], g:r[3], b:f.indexOf('b')>-1, t:f.indexOf('t')>-1};
});

/* ---------- program (push / pull / upper / lower) ---------- */
var PROGRAM = [
  {id:'push', name:'Push Day', tint:'chest', items:[
    {ex:'chest-press-machine', sets:4, lo:8, hi:10},
    {ex:'pec-deck', sets:4, lo:10, hi:12},
    {ex:'db-incline', sets:3, lo:10, hi:12},
    {ex:'db-shoulder-press', sets:3, lo:10, hi:12},
    {ex:'lateral-raise', sets:4, lo:12, hi:15},
    {ex:'overhead-cable-ext', sets:3, lo:12, hi:15}
  ]},
  {id:'pull', name:'Pull Day', tint:'back', items:[
    {ex:'lat-pulldown', sets:4, lo:8, hi:10},
    {ex:'tbar-row', sets:4, lo:8, hi:10},
    {ex:'pullover', sets:3, lo:10, hi:12},
    {ex:'rear-delt-fly', sets:3, lo:12, hi:15},
    {ex:'preacher-curl', sets:3, lo:10, hi:12},
    {ex:'hammer-curl', sets:3, lo:10, hi:12}
  ]},
  {id:'upper', name:'Upper Body', tint:'shoulders', items:[
    {ex:'incline-bench', sets:3, lo:8, hi:10},
    {ex:'lat-pulldown', sets:3, lo:8, hi:10},
    {ex:'pec-deck', sets:3, lo:8, hi:12},
    {ex:'chest-supported-row', sets:3, lo:8, hi:12},
    {ex:'lateral-raise', sets:3, lo:12, hi:15},
    {ex:'rear-delt-fly', sets:3, lo:12, hi:15},
    {ex:'preacher-curl', sets:3, lo:12, hi:15},
    {ex:'overhead-cable-ext', sets:3, lo:12, hi:15}
  ]},
  {id:'lower', name:'Lower Body', tint:'quads', items:[
    {ex:'hack-squat', sets:3, lo:8, hi:10},
    {ex:'rdl', sets:3, lo:8, hi:10},
    {ex:'bulgarian', sets:3, lo:10, hi:12},
    {ex:'lying-leg-curl', sets:3, lo:12, hi:15},
    {ex:'leg-extension', sets:3, lo:12, hi:15},
    {ex:'standing-calf', sets:4, lo:12, hi:15}
  ]}
];
function getDay(id){ return PROGRAM.filter(function(d){ return d.id===id; })[0]; }
function isDayDoneToday(dayId){ return (state.programDone[dayId]||[]).indexOf(todayStr())>-1; }

/* ---------- helpers ---------- */
var $ = function(s, r){ return (r||document).querySelector(s); };
var esc = function(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
var norm = function(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ς/g,'σ'); };
var pad = function(n){ return String(n).padStart(2,'0'); };
var dateStr = function(dt){ return dt.getFullYear()+'-'+pad(dt.getMonth()+1)+'-'+pad(dt.getDate()); };
var todayStr = function(){ return dateStr(new Date()); };
var parseD = function(s){ var p=s.split('-').map(Number); return new Date(p[0],p[1]-1,p[2]); };
var daysBetween = function(a,b){ return Math.round((parseD(b)-parseD(a))/86400000); };
var shortDate = function(s){ return parseD(s).toLocaleDateString('el-GR',{weekday:'short',day:'numeric',month:'short'}); };
var longDate = function(s){ return parseD(s).toLocaleDateString('el-GR',{weekday:'long',day:'numeric',month:'long'}); };
function dayLabel(s){
  var n = daysBetween(s, todayStr());
  if(n===0) return 'Σήμερα';
  if(n===1) return 'Χθες';
  return longDate(s);
}
function rel(s){
  var n = daysBetween(s, todayStr());
  if(n<=0) return 'σήμερα';
  if(n===1) return 'χθες';
  if(n<14) return 'πριν '+n+' μέρες';
  if(n<60) return 'πριν '+Math.round(n/7)+' εβδομάδες';
  return 'πριν '+Math.round(n/30)+' μήνες';
}
var fmtNum = function(n){ return String(Math.round(n*100)/100).replace('.',','); };
function parseKg(v){ var s=String(v).trim(); if(!/^\d+([.,]\d{1,2})?$/.test(s)) return NaN; return parseFloat(s.replace(',','.')); }
function parseReps(v){ var s=String(v).trim(); if(!/^\d+$/.test(s)) return NaN; return parseInt(s,10); }

function setPlain(ex,s){
  if(ex.t) return s.kg>0 ? fmtNum(s.kg)+' kg, '+s.r+' δευτ.' : s.r+' δευτ.';
  return s.kg>0 ? fmtNum(s.kg)+' kg × '+s.r : s.r+' επαν.';
}
function setShort(ex,s){
  if(ex.t) return s.kg>0 ? fmtNum(s.kg)+' kg, '+s.r+' δευτ.' : s.r+' δευτ.';
  return s.kg>0 ? fmtNum(s.kg)+'×'+s.r : s.r+' επαν.';
}
function setHtml(ex,s){
  if(ex.t) return (s.kg>0 ? '<b>'+fmtNum(s.kg)+'</b> kg, ' : '') + '<b>'+s.r+'</b> δευτ.';
  return s.kg>0 ? '<b>'+fmtNum(s.kg)+'</b> kg × <b>'+s.r+'</b>' : '<b>'+s.r+'</b> επαν.';
}

/* ---------- state and storage (this device only) ---------- */
var LS_KEY = 'gymlog:v1';
var state = {
  logs:{}, custom:[], programDone:{}, lastBackup:0, restDur:90, view:'program', from:'program', group:'all', query:'',
  currentEx:null, currentDay:null, ready:false, flash:null,
  pastLimit:8, histLimit:30, scrollY:0
};
var store = { warnedLS:false };
var screen = $('#screen');

function customEx(){ return state.custom.map(function(c){ return {id:c.id,n:c.name,e:'Custom exercise',g:c.g,b:false,t:!!c.t,custom:true}; }); }
function allEx(){ return BASE.concat(customEx()); }
function getEx(id){ return allEx().filter(function(x){ return x.id===id; })[0]; }
function recOf(id){ return state.logs[id] || {sessions:[]}; }
function getRec(id){ return state.logs[id] || (state.logs[id]={sessions:[]}); }
function sessionsOf(id){ return recOf(id).sessions.filter(function(s){ return s.sets && s.sets.length; }); }
function lastSession(id){ var s=sessionsOf(id); return s.length ? s[s.length-1] : null; }
function lastSet(id){ var s=lastSession(id); return s ? s.sets[s.sets.length-1] : null; }
function prevSession(id){ var s=sessionsOf(id).filter(function(x){ return x.d!==todayStr(); }); return s.length ? s[s.length-1] : null; }
function setKey(ex,x,anyW){ return ex.t ? x.r*10000 + x.kg : (anyW ? x.kg*10000 + x.r : x.r); }
function topSet(ex,session){
  var anyW = session.sets.some(function(x){ return x.kg>0; }), best=null, bk=-1;
  session.sets.forEach(function(x){ var k=setKey(ex,x,anyW); if(k>bk){ bk=k; best=x; } });
  return best;
}

function persist(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify({logs:state.logs, custom:state.custom, programDone:state.programDone, lastBackup:state.lastBackup, restDur:state.restDur})); }
  catch(e){
    if(!store.warnedLS){ store.warnedLS=true; toast('Η αποθήκευση απέτυχε. Ο χώρος της συσκευής μπορεί να είναι γεμάτος.'); }
  }
  return Promise.resolve();
}
function persistLog(){ return persist(); }
function persistCustom(){ return persist(); }
function persistProgramDone(){ return persist(); }

function loadLocal(){
  try{
    var raw = localStorage.getItem(LS_KEY);
    if(raw){ var o=JSON.parse(raw); state.logs=o.logs||{}; state.custom=o.custom||[]; state.programDone=o.programDone||{}; state.lastBackup=o.lastBackup||0; state.restDur=o.restDur||90; }
  }catch(e){}
  state.ready=true;
}
function boot(){
  loadLocal();
  renderProgram();
  if(rest.end && rest.end<=Date.now()) rest.done=true;
  renderRest();
  if(navigator.storage && navigator.storage.persist){ navigator.storage.persist().catch(function(){}); }
  if('serviceWorker' in navigator && location.protocol==='https:'){
    window.addEventListener('load', function(){ navigator.serviceWorker.register('./sw.js').catch(function(){}); });
  }
}

/* ---------- data operations ---------- */
function addSet(id,kg,r){
  var rec=getRec(id), d=todayStr();
  var s = rec.sessions.filter(function(x){ return x.d===d; })[0];
  if(!s){
    s={d:d,sets:[]}; rec.sessions.push(s);
    rec.sessions.sort(function(a,b){ return a.d<b.d?-1:a.d>b.d?1:0; });
  }
  s.sets.push({kg:kg,r:r});
  state.flash={id:id,d:d,i:s.sets.length-1};
  persistLog(id);
}
function undoable(id,msg,mutate){
  var snap = JSON.parse(JSON.stringify(recOf(id)));
  mutate();
  var rec=getRec(id);
  rec.sessions = rec.sessions.filter(function(s){ return s.sets.length; });
  persistLog(id); refresh();
  toast(msg, function(){ state.logs[id]=snap; persistLog(id); refresh(); });
}
function deleteCustom(id){
  var ex=getEx(id); if(!ex || !ex.custom) return;
  var snapC = JSON.parse(JSON.stringify(state.custom));
  var snapL = state.logs[id] ? JSON.parse(JSON.stringify(state.logs[id])) : null;
  state.custom = state.custom.filter(function(c){ return c.id!==id; });
  delete state.logs[id];
  persist();
  goBack();
  toast('Η άσκηση διαγράφηκε.', function(){
    state.custom=snapC; if(snapL) state.logs[id]=snapL;
    persist();
    refresh();
  });
}

/* ---------- toast ---------- */
var toastTimer;
function hideToast(){ $('#toast').hidden=true; }
function toast(msg, undo){
  $('#toastMsg').textContent=msg;
  var ub=$('#toastUndo'); ub.hidden=!undo;
  ub.onclick = undo ? function(){ hideToast(); undo(); } : null;
  $('#toast').hidden=false;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(hideToast, undo ? 6500 : 3800);
}

/* ---------- tabs ---------- */
function setTab(t){
  document.querySelectorAll('.tab').forEach(function(b){
    if(b.dataset.tab===t) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
  });
}
function goTab(t){
  if(t==='history') renderHistory();
  else if(t==='program') renderProgram();
  else renderLibrary();
  window.scrollTo(0,0);
}

/* ---------- library ---------- */
var ICON_SEARCH = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
function renderLibrary(){
  state.view='library'; setTab('library');
  screen.innerHTML =
    '<header class="top"><h1>Ημερολόγιο προπόνησης</h1><p class="sub" id="todayLine"></p></header>'+
    '<div class="finder">'+
      '<label class="search">'+ICON_SEARCH+'<input id="q" type="search" placeholder="Αναζήτηση άσκησης" aria-label="Αναζήτηση άσκησης" autocomplete="off" autocapitalize="off" spellcheck="false"></label>'+
      '<div class="chips" id="chips">'+
        '<button class="chip" data-act="group" data-g="all">Όλες</button>'+
        GROUPS.map(function(g){ return '<button class="chip" style="--gc:'+g.c+'" data-act="group" data-g="'+g.id+'"><span class="dot"></span>'+g.n+'</button>'; }).join('')+
      '</div>'+
    '</div>'+
    '<div id="exlist"></div>'+
    '<div class="addbar"><button class="secondary" data-act="new-ex">Δεν βρίσκεις μια άσκηση; Πρόσθεσε τη δική σου</button></div>';
  $('#q').value = state.query;
  updateChips(); renderList(); renderTodayLine();
}
function updateChips(){
  document.querySelectorAll('#chips .chip').forEach(function(b){
    b.setAttribute('aria-pressed', String(b.dataset.g===state.group));
  });
}
function renderTodayLine(){
  var el=$('#todayLine'); if(!el) return;
  var d=todayStr(), n=0, sets=0;
  Object.keys(state.logs).forEach(function(id){
    var s=(state.logs[id].sessions||[]).filter(function(x){ return x.d===d; })[0];
    if(s && s.sets.length){ n++; sets+=s.sets.length; }
  });
  var line = longDate(d)+'. ';
  if(n) line += 'Σήμερα έχεις '+n+' '+(n===1?'άσκηση':'ασκήσεις')+' και '+sets+' σετ.';
  else line += 'Σήμερα δεν έχεις καταγράψει τίποτα ακόμα.';
  el.textContent=line;
}
function rowHtml(ex,today){
  var ls=lastSession(ex.id), right='';
  if(ls){
    right='<span class="ex-last"><b>'+esc(setPlain(ex,topSet(ex,ls)))+'</b>'+(ls.d===today?'<span class="tag-today">σήμερα</span>':'<span>'+rel(ls.d)+'</span>')+'</span>';
  }
  return '<button class="ex" data-act="open" data-id="'+esc(ex.id)+'"><span class="ex-main"><span class="ex-name">'+esc(ex.n)+'</span>'+
    (ex.e && ex.e!==ex.n ? '<span class="ex-en">'+esc(ex.e)+'</span>' : '')+'</span>'+right+'</button>';
}
function renderList(){
  var el=$('#exlist'); if(!el) return;
  var q=norm(state.query.trim()), today=todayStr();
  var items=allEx().filter(function(ex){
    return (state.group==='all' || ex.g===state.group) && (!q || norm(ex.n+' '+ex.e).indexOf(q)>-1);
  });
  if(!items.length){
    var t=state.query.trim();
    el.innerHTML = t
      ? '<div class="none"><p>Δεν βρέθηκε άσκηση για «'+esc(t)+'».</p><button class="secondary" data-act="new-ex" data-name="'+esc(t)+'">Πρόσθεσε την ως δική σου άσκηση</button></div>'
      : '<div class="none"><p>Δεν υπάρχουν ασκήσεις σε αυτή την ομάδα ακόμα.</p></div>';
    return;
  }
  var byG={}; items.forEach(function(ex){ (byG[ex.g]=byG[ex.g]||[]).push(ex); });
  el.innerHTML = GROUPS.filter(function(g){ return byG[g.id]; }).map(function(g){
    return '<section aria-labelledby="gh-'+g.id+'" style="--gc:'+g.c+'">'+
      '<div class="gh"><span class="dot"></span><h2 id="gh-'+g.id+'">'+g.n+'</h2><span class="cnt">'+byG[g.id].length+'</span></div>'+
      '<div class="rows">'+byG[g.id].map(function(ex){ return rowHtml(ex,today); }).join('')+'</div></section>';
  }).join('');
}

/* ---------- history ---------- */
function buildDays(){
  var map={};
  Object.keys(state.logs).forEach(function(id){
    var ex=getEx(id); if(!ex) return;
    (state.logs[id].sessions||[]).forEach(function(s){
      if(!s.sets || !s.sets.length) return;
      (map[s.d]=map[s.d]||[]).push({ex:ex,sets:s.sets});
    });
  });
  return Object.keys(map).sort().reverse().map(function(d){ return {d:d, items:map[d]}; });
}
function dayHtml(day){
  var sets=0, vol=0;
  day.items.forEach(function(it){ it.sets.forEach(function(s){ sets++; if(!it.ex.t) vol+=s.kg*s.r; }); });
  var n=day.items.length;
  var sum=n+' '+(n===1?'άσκηση':'ασκήσεις')+', '+sets+' σετ'+(vol>0 ? ', '+Math.round(vol).toLocaleString('el-GR')+' kg συνολικός όγκος' : '');
  return '<section class="day"><div class="dayh"><h2>'+dayLabel(day.d)+'</h2><p class="muted">'+sum+'</p></div><div class="rows">'+
    day.items.map(function(it){
      return '<button class="ex" style="--gc:'+GMAP[it.ex.g].c+'" data-act="open" data-id="'+esc(it.ex.id)+'"><span class="ex-main"><span class="ex-name">'+esc(it.ex.n)+'</span><span class="ex-en">'+
        esc(it.sets.map(function(s){ return setShort(it.ex,s); }).join(', '))+'</span></span></button>';
    }).join('')+'</div></section>';
}
function backupHtml(hasData){
  var lb=state.lastBackup, old=!lb || (Date.now()-lb) > 7*864e5;
  var info = lb
    ? 'Τελευταίο αντίγραφο: '+new Date(lb).toLocaleDateString('el-GR')+'.'+(old && hasData ? ' Πάρε καινούριο, έχει περάσει πάνω από μία εβδομάδα.' : '')
    : 'Οι προπονήσεις σου μένουν μόνο σε αυτό το κινητό. Αποθήκευε αντίγραφο κάθε λίγες μέρες, π.χ. στα Αρχεία ή στο iCloud Drive.';
  return '<section class="backup" aria-labelledby="bk-h"><h2 id="bk-h">Αντίγραφο ασφαλείας</h2>'+
    '<p'+(old && hasData ? ' class="nudge"' : '')+'>'+esc(info)+'</p>'+
    '<div class="bk-btns"><button class="secondary" data-act="backup">Αποθήκευση αντιγράφου</button>'+
    '<input type="file" id="importFile" class="sr" accept=".json,.csv,application/json,text/csv"><label for="importFile">Επαναφορά ή εισαγωγή</label></div>'+
    '<p style="margin:12px 0 0">Η «Επαναφορά ή εισαγωγή» δέχεται αντίγραφο αυτής της εφαρμογής ή το CSV από την έκδοση του claude.ai.</p></section>';
}
function renderHistory(){
  state.view='history'; setTab('history');
  var days=buildDays();
  var html='<header class="top"><div class="toprow"><h1>Ιστορικό</h1>'+(days.length ? '<button class="text-btn" data-act="export">Εξαγωγή CSV</button>' : '')+'</div><p class="sub">Οι προπονήσεις σου, από την πιο πρόσφατη.</p></header>';
  if(!days.length){
    html+='<div class="none"><p>Δεν έχεις καταγράψει προπόνηση ακόμα. Διάλεξε μια άσκηση και γράψε το πρώτο σου σετ.</p><button class="secondary" data-act="tab" data-tab="library">Δες τις ασκήσεις</button></div>';
  } else {
    var shown=days.slice(0,state.histLimit);
    html+=shown.map(dayHtml).join('');
    if(days.length>shown.length) html+='<button class="secondary wide" data-act="more-days">Εμφάνιση παλαιότερων</button>';
  }
  html+=backupHtml(days.length>0);
  screen.innerHTML=html;
}

/* ---------- files: CSV export, backup, restore, import ---------- */
function plainDownload(blob, name){
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 2000);
}
function downloadFile(name, text, type){
  var blob = new Blob([text], {type: type});
  var file = null;
  try { file = new File([blob], name, {type: type}); } catch (e) {}
  if (file && navigator.canShare && navigator.canShare({files: [file]}) && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
    return navigator.share({files: [file], title: name}).then(function(){ return true; }, function(e){
      if (e && e.name === 'AbortError') return false;
      plainDownload(blob, name); return true;
    });
  }
  plainDownload(blob, name);
  return Promise.resolve(true);
}
function exportCsv(){
  var flat=[];
  Object.keys(state.logs).forEach(function(id){
    var ex=getEx(id); if(!ex) return;
    (state.logs[id].sessions||[]).forEach(function(s){
      s.sets.forEach(function(x,i){ flat.push([s.d, ex.n, GMAP[ex.g].n, i+1, fmtNum(x.kg), x.r]); });
    });
  });
  flat.sort(function(a,b){ return a[0]<b[0]?-1:a[0]>b[0]?1:(a[1]<b[1]?-1:a[1]>b[1]?1:a[3]-b[3]); });
  var rows=[['Ημερομηνία','Άσκηση','Μυϊκή ομάδα','Σετ','Κιλά','Επαναλήψεις ή δευτερόλεπτα']].concat(flat);
  var csv='﻿'+rows.map(function(r){
    return r.map(function(c){ var s=String(c); return /[";\r\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; }).join(';');
  }).join('\r\n');
  downloadFile('gym-log-'+todayStr()+'.csv', csv, 'text/csv;charset=utf-8');
}
function saveBackup(){
  var data={app:'gymlog', version:1, exported:new Date().toISOString(), logs:state.logs, custom:state.custom, programDone:state.programDone};
  downloadFile('gym-backup-'+todayStr()+'.json', JSON.stringify(data), 'application/json').then(function(done){
    if(!done) return;
    state.lastBackup=Date.now(); persist();
    if(state.view==='history') renderHistory();
    toast('Το αντίγραφο αποθηκεύτηκε.');
  });
}
/* Adds sessions for days this exercise has no record of yet, so importing twice never duplicates. */
function mergeSessions(id, sessions){
  var rec=getRec(id), have={}, added=0;
  rec.sessions.forEach(function(s){ have[s.d]=1; });
  sessions.forEach(function(s){
    if(!s || !/^\d{4}-\d{2}-\d{2}$/.test(s.d||'') || have[s.d] || !Array.isArray(s.sets)) return;
    var sets=s.sets.filter(function(x){ return x && typeof x.kg==='number' && x.kg>=0 && typeof x.r==='number' && x.r>0; })
      .map(function(x){ return {kg:x.kg, r:Math.round(x.r)}; });
    if(!sets.length) return;
    rec.sessions.push({d:s.d, sets:sets}); have[s.d]=1; added+=sets.length;
  });
  rec.sessions.sort(function(a,b){ return a.d<b.d?-1:a.d>b.d?1:0; });
  return added;
}
function importBackup(p){
  var added=0;
  (Array.isArray(p.custom)?p.custom:[]).forEach(function(c){
    if(!c || !c.id || !c.name) return;
    if(state.custom.some(function(x){ return x.id===c.id; })) return;
    state.custom.push({id:String(c.id), name:String(c.name).slice(0,60), g:GMAP[c.g]?c.g:'full', t:!!c.t});
  });
  Object.keys(p.logs||{}).forEach(function(id){
    var r=p.logs[id]; if(r && Array.isArray(r.sessions)) added+=mergeSessions(id, r.sessions);
  });
  Object.keys(p.programDone||{}).forEach(function(k){
    if(!getDay(k) || !Array.isArray(p.programDone[k])) return;
    var list=state.programDone[k]||(state.programDone[k]=[]);
    p.programDone[k].forEach(function(d){ if(list.indexOf(d)<0) list.push(d); });
  });
  return added;
}
function parseCsv(text){
  text=text.replace(/^﻿/,'');
  var rows=[], row=[], cell='', q=false;
  for(var i=0;i<text.length;i++){
    var ch=text[i];
    if(q){
      if(ch==='"'){ if(text[i+1]==='"'){ cell+='"'; i++; } else q=false; }
      else cell+=ch;
    } else if(ch==='"') q=true;
    else if(ch===';'){ row.push(cell); cell=''; }
    else if(ch==='\n'){ row.push(cell); rows.push(row); row=[]; cell=''; }
    else if(ch!=='\r') cell+=ch;
  }
  if(cell || row.length){ row.push(cell); rows.push(row); }
  return rows;
}
function importCsv(text){
  var rows=parseCsv(text);
  if(!rows.length || !/Ημερομηνία/.test(rows[0][0]||'')) throw new Error('bad');
  var byName={};
  allEx().forEach(function(ex){ byName[norm(ex.n)]=ex.id; byName[norm(ex.e)]=byName[norm(ex.e)]||ex.id; });
  var groupByName={}; GROUPS.forEach(function(g){ groupByName[norm(g.n)]=g.id; });
  var collected={};
  rows.slice(1).forEach(function(r){
    if(r.length<6) return;
    var d=r[0].trim(), name=r[1].trim(), kg=parseKg(r[4]), reps=parseInt(r[5],10), setNo=parseInt(r[3],10)||0;
    if(!/^\d{4}-\d{2}-\d{2}$/.test(d) || !name || isNaN(kg) || !(reps>0)) return;
    var id=byName[norm(name)];
    if(!id){
      id='c_'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
      state.custom.push({id:id, name:name.slice(0,60), g:groupByName[norm(r[2]||'')]||'full', t:false});
      byName[norm(name)]=id;
    }
    var key=id+'|'+d;
    (collected[key]=collected[key]||{id:id,d:d,sets:[]}).sets.push({n:setNo,kg:kg,r:reps});
  });
  var perEx={};
  Object.keys(collected).forEach(function(k){
    var c=collected[k];
    c.sets.sort(function(a,b){ return a.n-b.n; });
    (perEx[c.id]=perEx[c.id]||[]).push({d:c.d, sets:c.sets.map(function(x){ return {kg:x.kg, r:x.r}; })});
  });
  var added=0;
  Object.keys(perEx).forEach(function(id){ added+=mergeSessions(id, perEx[id]); });
  return added;
}
function onImportFile(f){
  f.text().then(function(txt){
    var added;
    var t=txt.replace(/^﻿/,'').trim();
    if(t.charAt(0)==='{'){
      var p=JSON.parse(t);
      if(!p || p.app!=='gymlog') throw new Error('bad');
      added=importBackup(p);
    } else {
      added=importCsv(txt);
    }
    persist(); refresh();
    toast(added ? (added===1 ? 'Προστέθηκε 1 σετ.' : 'Προστέθηκαν '+added+' σετ.') : 'Όλα τα σετ του αρχείου υπάρχουν ήδη.');
  }).catch(function(){ toast('Αυτό το αρχείο δεν είναι αντίγραφο ή CSV της εφαρμογής.'); });
}

/* ---------- program ---------- */
function renderProgram(){
  state.view='program'; setTab('program');
  var html='<header class="top"><h1>Πρόγραμμα</h1><p class="sub">Οι προπονήσεις σου. Διάλεξε ποια κάνεις σήμερα.</p></header>'+
    '<div class="rows" style="margin-top:14px">'+PROGRAM.map(function(day){
      var c=(GMAP[day.tint]||{}).c || '#6B7780', done=isDayDoneToday(day.id);
      return '<button class="ex" style="--gc:'+c+'" data-act="open-day" data-day="'+day.id+'"><span class="ex-main"><span class="ex-name">'+esc(day.name)+'</span><span class="ex-en">'+day.items.length+' ασκήσεις</span></span>'+
        (done ? '<span class="badge-done">σήμερα ✓</span>' : '')+'</button>';
    }).join('')+'</div>';
  screen.innerHTML=html;
}
function renderProgramDay(dayId){
  var day=getDay(dayId); if(!day){ renderProgram(); return; }
  state.view='program-day'; state.currentDay=dayId; setTab('program');
  var done=isDayDoneToday(dayId), d=todayStr();
  var html='<div class="xhead"><button class="back" data-act="back-to-program" aria-label="Πίσω">'+ICON_BACK+'</button>'+
    '<div class="xtitle" style="padding-top:6px"><h1 tabindex="-1">'+esc(day.name)+'</h1><p>'+day.items.length+' ασκήσεις</p></div></div>'+
    '<button class="primary done-btn'+(done?' done':'')+'" data-act="toggle-day-done" data-day="'+dayId+'" aria-pressed="'+done+'">'+
      (done ? 'Ολοκληρώθηκε σήμερα ✓ (πάτα για αναίρεση)' : 'Σήμανση ως ολοκληρωμένη')+'</button>'+
    '<div class="rows" style="margin-top:16px">'+day.items.map(function(it){
      var ex=getEx(it.ex); if(!ex) return '';
      var target=it.sets+' σετ × '+it.lo+'-'+it.hi+' επαν.';
      var today=sessionsOf(ex.id).filter(function(s){ return s.d===d; })[0];
      var right = today ? '<span class="ex-last"><b>'+today.sets.length+'</b><span>σετ σήμερα</span></span>' : '';
      return '<button class="ex" style="--gc:'+GMAP[ex.g].c+'" data-act="open-day-ex" data-id="'+esc(ex.id)+'"><span class="ex-main"><span class="ex-name">'+esc(ex.n)+'</span><span class="ex-en">'+esc(target)+'</span></span>'+right+'</button>';
    }).join('')+'</div>';
  screen.innerHTML=html;
  window.scrollTo(0,0);
}
function toggleDayDone(dayId){
  var d=todayStr();
  var list = state.programDone[dayId] || (state.programDone[dayId]=[]);
  var i=list.indexOf(d);
  if(i>-1){ list.splice(i,1); } else { list.push(d); }
  persistProgramDone();
  renderProgramDay(dayId);
  if(i===-1) toast('Μπράβο! Ολοκληρώθηκε η προπόνηση.');
}

/* ---------- exercise screen ---------- */
var ICON_BACK='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
var ICON_MINUS='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
var ICON_PLUS='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
var ICON_X='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var ICON_YT='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10.5 9.3v5.4l5-2.7-5-2.7z" fill="currentColor" stroke="none"/></svg>';

function prevLineHtml(ex){
  var prev = prevSession(ex.id);
  if(!prev) return '<p class="prev-time prev-empty" id="prevLine">Πρώτη φορά που καταγράφεις αυτή την άσκηση.</p>';
  return '<p class="prev-time" id="prevLine"><span class="prev-label">Την προηγούμενη φορά ('+esc(rel(prev.d))+')</span><span class="prev-sets">'+esc(prev.sets.map(function(s){ return setShort(ex,s); }).join(' · '))+'</span></p>';
}
function openExercise(id){
  var ex=getEx(id); if(!ex) return;
  if(state.view!=='exercise'){ state.from=state.view; state.scrollY=window.scrollY; }
  state.view='exercise'; state.currentEx=id; state.pastLimit=8; state.flash=null;
  setTab(state.from==='program-day' ? 'program' : state.from);
  var g=GMAP[ex.g], l=lastSet(id);
  var kg = ex.b ? 0 : 20, r = ex.t ? 30 : 10;
  if(l){ kg=l.kg; r=l.r; }
  var kgLabel = ex.b ? 'Πρόσθετα κιλά' : 'Κιλά';
  var rLabel = ex.t ? 'Δευτερόλεπτα' : 'Επαναλήψεις';
  var rStep = ex.t ? '5' : '1';
  var prevLine = prevLineHtml(ex);
  screen.innerHTML =
    '<div class="xhead"><button class="back" data-act="back" aria-label="Πίσω">'+ICON_BACK+'</button>'+
      '<div class="xtitle"><h1 id="xh" tabindex="-1">'+esc(ex.n)+'</h1>'+(ex.e && ex.e!==ex.n ? '<p>'+esc(ex.e)+'</p>' : '')+'</div></div>'+
    '<div class="gtag-row"><p class="gtag" style="--gc:'+g.c+'"><span class="dot"></span>'+g.n+'</p>'+
      '<a class="yt-link" href="https://www.youtube.com/results?search_query='+encodeURIComponent(ex.n+' exercise')+'" target="_blank" rel="noopener noreferrer">'+ICON_YT+'Βίντεο</a></div>'+
    prevLine+
    '<section class="logger" aria-label="Νέο σετ">'+
      '<div class="steps">'+
        '<div class="step"><label for="kg">'+kgLabel+'</label>'+
          '<input id="kg" type="text" inputmode="decimal" autocomplete="off" value="'+fmtNum(kg)+'">'+
          '<div class="pm"><button data-act="bump" data-f="kg" data-d="-1" aria-label="Μείωση κιλών κατά 2,5">'+ICON_MINUS+'</button><button data-act="bump" data-f="kg" data-d="1" aria-label="Αύξηση κιλών κατά 2,5">'+ICON_PLUS+'</button></div></div>'+
        '<div class="step"><label for="reps">'+rLabel+'</label>'+
          '<input id="reps" type="text" inputmode="numeric" autocomplete="off" value="'+r+'">'+
          '<div class="pm"><button data-act="bump" data-f="reps" data-d="-1" aria-label="Μείωση κατά '+rStep+'">'+ICON_MINUS+'</button><button data-act="bump" data-f="reps" data-d="1" aria-label="Αύξηση κατά '+rStep+'">'+ICON_PLUS+'</button></div></div>'+
      '</div>'+
      (ex.b ? '<p class="hint">Το 0 σημαίνει μόνο το σωματικό βάρος.</p>' : '')+
      '<button class="primary" id="addSet" data-act="add-set">Καταγραφή σετ</button>'+
      '<p class="err" id="err" role="alert"></p>'+
    '</section>'+
    '<div id="exdata"></div>';
  renderExerciseData();
  window.scrollTo(0,0);
  var h=$('#xh'); if(h) h.focus({preventScroll:true});
}
function bump(field,dir){
  var ex=getEx(state.currentEx); if(!ex) return;
  var inp=$(field==='kg' ? '#kg' : '#reps');
  var cur = field==='kg' ? parseKg(inp.value) : parseReps(inp.value);
  if(isNaN(cur)) cur=0;
  var step = field==='kg' ? 2.5 : (ex.t ? 5 : 1);
  var next = Math.round((cur+dir*step)*100)/100;
  if(next<0) next=0;
  inp.value = fmtNum(next);
  inp.removeAttribute('aria-invalid'); $('#err').textContent='';
}
function onAddSet(){
  var ex=getEx(state.currentEx); if(!ex) return;
  var kgI=$('#kg'), rI=$('#reps'), err=$('#err');
  var kg=parseKg(kgI.value), r=parseReps(rI.value);
  kgI.removeAttribute('aria-invalid'); rI.removeAttribute('aria-invalid');
  if(isNaN(kg) || kg>1000){
    kgI.setAttribute('aria-invalid','true');
    err.textContent='Γράψε τα κιλά ως αριθμό, π.χ. 60 ή 62,5. Γράψε 0 αν δεν έχει βάρος.';
    kgI.focus(); return;
  }
  if(isNaN(r) || r<1 || r>999){
    rI.setAttribute('aria-invalid','true');
    err.textContent = ex.t ? 'Γράψε τη διάρκεια σε δευτερόλεπτα, τουλάχιστον 1.' : 'Γράψε τις επαναλήψεις ως ακέραιο αριθμό, τουλάχιστον 1.';
    rI.focus(); return;
  }
  err.textContent='';
  var before=sessionsOf(ex.id), prior=before.length ? statsOf(ex,before).best : null;
  addSet(ex.id,kg,r);
  renderExerciseData();
  var after=sessionsOf(ex.id), anyW=after.some(function(s){ return s.sets.some(function(x){ return x.kg>0; }); });
  if(prior && setKey(ex,{kg:kg,r:r},anyW) > setKey(ex,prior,anyW)) toast('Νέο ρεκόρ! '+setPlain(ex,{kg:kg,r:r})+' (πριν: '+setPlain(ex,prior)+')');
  startRest();
}

/* ---------- rest timer ----------
   Counts from the moment the set was logged, so it is right even after the phone was locked.
   iPhone web apps cannot ring while the screen is off; with the app open it beeps (and vibrates on Android). */
var REST_KEY='gymlog:rest', rest={end:0, done:false}, restTick=null, audioCtx=null;
try{ var rs=JSON.parse(localStorage.getItem(REST_KEY)||'null'); if(rs && rs.end) rest.end=rs.end; }catch(e){}
function unlockAudio(){
  try{
    if(!audioCtx){ var AC=window.AudioContext||window.webkitAudioContext; if(AC) audioCtx=new AC(); }
    if(audioCtx && audioCtx.state==='suspended') audioCtx.resume();
  }catch(e){}
}
function beep(){
  try{
    if(!audioCtx) return;
    [0,0.25,0.5].forEach(function(t){
      var o=audioCtx.createOscillator(), g=audioCtx.createGain(), at=audioCtx.currentTime+t;
      o.frequency.value=880; g.gain.setValueAtTime(0.0001,at); g.gain.exponentialRampToValueAtTime(0.3,at+0.02); g.gain.exponentialRampToValueAtTime(0.0001,at+0.18);
      o.connect(g); g.connect(audioCtx.destination); o.start(at); o.stop(at+0.2);
    });
  }catch(e){}
  try{ if(navigator.vibrate) navigator.vibrate([200,100,200]); }catch(e){}
}
function saveRest(){ try{ localStorage.setItem(REST_KEY, JSON.stringify({end:rest.end})); }catch(e){} }
function startRest(){
  unlockAudio();
  rest.end=Date.now()+state.restDur*1000; rest.done=false; saveRest();
  renderRest();
}
function stopRest(){ rest.end=0; rest.done=false; saveRest(); renderRest(); }
function adjustRest(sec){
  state.restDur=Math.max(15,Math.min(600,state.restDur+sec)); persist();
  if(rest.end && !rest.done) rest.end=Math.max(Date.now()+1000, rest.end+sec*1000);
  saveRest(); renderRest();
}
function mmss(sec){ sec=Math.max(0,Math.ceil(sec)); return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0'); }
function renderRest(){
  var bar=$('#rest');
  clearInterval(restTick); restTick=null;
  if(!rest.end){ bar.hidden=true; document.body.classList.remove('resting'); return; }
  var left=(rest.end-Date.now())/1000;
  if(left<=-120){ stopRest(); return; }
  bar.hidden=false; document.body.classList.add('resting');
  if(left>0){
    bar.classList.remove('rest-done');
    $('#restLbl').textContent='Ανάπαυση';
    $('#restTime').textContent=mmss(left);
    var pct=Math.max(0,Math.min(100,100*left/state.restDur));
    $('#restFill').style.width=pct+'%';
  } else {
    if(!rest.done){ rest.done=true; beep(); }
    bar.classList.add('rest-done');
    $('#restLbl').textContent='Ώρα για το επόμενο σετ';
    $('#restTime').textContent='0:00';
    $('#restFill').style.width='0%';
  }
  $('#restDur').textContent='Διάρκεια: '+mmss(state.restDur);
  restTick=setTimeout(renderRest, 250);
}
document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible'){ if(rest.end && rest.end<=Date.now()) rest.done=true; renderRest(); } });

function statsOf(ex,sessions){
  var best=null, bk=-1, e1=0, sets=0;
  var anyW = sessions.some(function(s){ return s.sets.some(function(x){ return x.kg>0; }); });
  sessions.forEach(function(s){ s.sets.forEach(function(x){
    sets++;
    var k=setKey(ex,x,anyW); if(k>bk){ bk=k; best=x; }
    if(!ex.t && x.kg>0 && x.r<=12){ var v=x.kg*(1+x.r/30); if(v>e1) e1=v; }
  }); });
  return {best:best, e1:e1 ? Math.round(e1*2)/2 : 0, count:sessions.length, sets:sets};
}
function metricOf(ex,sessions){
  var anyW = sessions.some(function(s){ return s.sets.some(function(x){ return x.kg>0; }); });
  if(ex.t) return {label:'Μέγιστη διάρκεια ανά προπόνηση (δευτερόλεπτα)', f:function(x){ return x.r; }};
  if(anyW) return {label:'Μέγιστο βάρος ανά προπόνηση (kg)', f:function(x){ return x.kg; }};
  return {label:'Μέγιστες επαναλήψεις ανά προπόνηση', f:function(x){ return x.r; }};
}
function chartHtml(ex,sessions){
  var m=metricOf(ex,sessions);
  var pts=sessions.slice(-16).map(function(s){ return {d:s.d, v:Math.max.apply(null, s.sets.map(m.f))}; });
  if(pts.length<2) return '<p class="muted" style="margin-top:10px">Το γράφημα εμφανίζεται μετά τη δεύτερη προπόνηση.</p>';
  var W=340,H=160,L=38,R=12,T=14,B=28;
  var vs=pts.map(function(p){ return p.v; });
  var lo=Math.min.apply(null,vs), hi=Math.max.apply(null,vs);
  if(lo===hi){ lo=Math.max(0,lo-1); hi=hi+1; }
  var pd=(hi-lo)*0.12; lo=Math.max(0,lo-pd); hi=hi+pd;
  var x=function(i){ return L+(W-L-R)*i/(pts.length-1); };
  var y=function(v){ return T+(H-T-B)*(1-(v-lo)/(hi-lo)); };
  var grid=[lo,(lo+hi)/2,hi].map(function(v){
    return '<line class="ch-grid" x1="'+L+'" x2="'+(W-R)+'" y1="'+y(v).toFixed(1)+'" y2="'+y(v).toFixed(1)+'"/>'+
      '<text class="ch-txt" x="'+(L-6)+'" y="'+(y(v)+4).toFixed(1)+'" text-anchor="end">'+fmtNum(Math.round(v*2)/2)+'</text>';
  }).join('');
  var line=pts.map(function(p,i){ return (i?'L':'M')+x(i).toFixed(1)+' '+y(p.v).toFixed(1); }).join(' ');
  var dots=pts.map(function(p,i){ return '<circle class="ch-pt" cx="'+x(i).toFixed(1)+'" cy="'+y(p.v).toFixed(1)+'" r="5"/>'; }).join('');
  var dm=function(s){ var d=parseD(s); return d.getDate()+'/'+(d.getMonth()+1); };
  var first=pts[0], last=pts[pts.length-1];
  var label=m.label+': από '+fmtNum(first.v)+' στις '+dm(first.d)+' σε '+fmtNum(last.v)+' στις '+dm(last.d);
  return '<div class="chart"><h3>'+esc(m.label)+'</h3><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(label)+'">'+grid+
    '<path class="ch-line" d="'+line+'"/>'+dots+
    '<text class="ch-txt" x="'+L+'" y="'+(H-6)+'">'+dm(first.d)+'</text>'+
    '<text class="ch-txt" x="'+(W-R)+'" y="'+(H-6)+'" text-anchor="end">'+dm(last.d)+'</text></svg></div>';
}
function renderExerciseData(){
  var el=$('#exdata'); if(!el) return;
  var ex=getEx(state.currentEx); if(!ex) return;
  var pv=$('#prevLine'); if(pv) pv.outerHTML=prevLineHtml(ex);
  var all=sessionsOf(ex.id), d=todayStr();
  var today=all.filter(function(s){ return s.d===d; })[0];
  var past=all.filter(function(s){ return s.d!==d; }).reverse();
  var html='';

  html+='<section class="block"><div class="bh"><h2>Σήμερα</h2><span class="muted">'+(today ? today.sets.length+' σετ' : '')+'</span></div>';
  if(today){
    html+='<ol class="sets">'+today.sets.map(function(s,i){
      var fl = state.flash && state.flash.id===ex.id && state.flash.d===d && state.flash.i===i;
      return '<li class="set'+(fl?' flash':'')+'"><span class="n">'+(i+1)+'</span><span class="v">'+setHtml(ex,s)+'</span>'+
        '<button class="icon-btn" data-act="del-set" data-d="'+d+'" data-i="'+i+'" aria-label="Διαγραφή σετ '+(i+1)+'">'+ICON_X+'</button></li>';
    }).join('')+'</ol>';
  } else {
    html+='<p class="empty">Δεν έχεις καταγράψει σετ σήμερα. Διάλεξε κιλά και επαναλήψεις και πάτησε «Καταγραφή σετ».</p>';
  }
  html+='</section>';
  state.flash=null;

  if(all.length){
    var st=statsOf(ex,all);
    html+='<section class="block"><div class="bh"><h2>Πρόοδος</h2></div><div class="stats">'+
      '<div class="stat"><b>'+(st.best ? esc(setPlain(ex,st.best)) : '-')+'</b><span>Ρεκόρ</span></div>'+
      '<div class="stat"><b>'+(st.e1 ? fmtNum(st.e1)+' kg' : '-')+'</b><span>Εκτιμώμενο 1RM</span></div>'+
      '<div class="stat"><b>'+st.count+'</b><span>Προπονήσεις</span></div></div>'+
      chartHtml(ex,all)+'</section>';
  }

  if(past.length){
    var shown=past.slice(0,state.pastLimit);
    html+='<section class="block"><div class="bh"><h2>Προηγούμενες φορές</h2></div><ul class="hist">'+shown.map(function(s){
      return '<li><div class="hh"><span class="date">'+shortDate(s.d)+'</span><span class="muted">'+rel(s.d)+'</span>'+
        '<button class="text-btn del" data-act="del-session" data-d="'+s.d+'">Διαγραφή</button></div>'+
        '<div class="pills">'+s.sets.map(function(x){ return '<span class="pill">'+esc(setShort(ex,x))+'</span>'; }).join('')+'</div></li>';
    }).join('')+'</ul>'+(past.length>shown.length ? '<button class="secondary wide" data-act="more-past">Εμφάνιση περισσότερων</button>' : '')+'</section>';
  }

  if(!all.length){
    html+='<p class="empty" style="margin-top:22px">Το ιστορικό αυτής της άσκησης θα εμφανιστεί εδώ μόλις καταγράψεις το πρώτο σου σετ.</p>';
  }
  if(ex.custom){
    html+='<div class="danger-zone"><button class="text-btn" data-act="del-custom">Διαγραφή άσκησης</button></div>';
  }
  el.innerHTML=html;
}
function goBack(){
  var id=state.currentEx;
  if(state.from==='history') renderHistory();
  else if(state.from==='program-day') renderProgramDay(state.currentDay);
  else renderLibrary();
  window.scrollTo(0,state.scrollY||0);
  var btn=[].slice.call(screen.querySelectorAll('[data-id]')).filter(function(b){ return b.dataset.id===id; })[0];
  if(btn) btn.focus({preventScroll:true});
}

function refresh(){
  if(state.view==='library'){ renderTodayLine(); renderList(); }
  else if(state.view==='history'){ renderHistory(); }
  else if(state.view==='program'){ renderProgram(); }
  else if(state.view==='program-day'){ renderProgramDay(state.currentDay); }
  else if(state.view==='exercise'){
    if(!getEx(state.currentEx)){ goBack(); return; }
    renderExerciseData();
  }
}

/* ---------- custom exercise dialog ---------- */
var dlg=$('#dlg');
$('#dlgGroup').innerHTML=GROUPS.map(function(g){ return '<option value="'+g.id+'">'+g.n+'</option>'; }).join('');
function openAddDialog(prefill){
  $('#dlgName').value=prefill||'';
  $('#dlgGroup').value = state.group!=='all' ? state.group : 'chest';
  $('#dlgTime').checked=false; $('#dlgErr').textContent='';
  if(typeof dlg.showModal==='function') dlg.showModal(); else dlg.setAttribute('open','');
  $('#dlgName').focus();
}
function closeDialog(){ if(typeof dlg.close==='function') dlg.close(); else dlg.removeAttribute('open'); }
function saveCustom(){
  var name=$('#dlgName').value.trim(), err=$('#dlgErr');
  if(!name){ err.textContent='Γράψε ένα όνομα για την άσκηση.'; return; }
  var dup=allEx().filter(function(e){ return norm(e.n)===norm(name); })[0];
  if(dup){ err.textContent='Υπάρχει ήδη άσκηση με αυτό το όνομα.'; return; }
  var id='c_'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
  state.custom.push({id:id, name:name, g:$('#dlgGroup').value, t:$('#dlgTime').checked});
  persistCustom();
  closeDialog();
  toast('Η άσκηση προστέθηκε.');
  openExercise(id);
}
$('#dlgSave').addEventListener('click', saveCustom);
$('#dlgCancel').addEventListener('click', closeDialog);
$('#dlgName').addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); saveCustom(); } });
dlg.addEventListener('click', function(e){ if(e.target===dlg) closeDialog(); });

/* ---------- events ---------- */
$('#rest').addEventListener('click', function(e){
  var t=e.target.closest('[data-rest]'); if(!t) return;
  var a=t.dataset.rest;
  if(a==='stop') stopRest(); else adjustRest(Number(a));
});
screen.addEventListener('click', function(e){
  var t=e.target.closest('[data-act]'); if(!t) return;
  var id, d;
  switch(t.dataset.act){
    case 'open': openExercise(t.dataset.id); break;
    case 'back': goBack(); break;
    case 'group': state.group=t.dataset.g; updateChips(); renderList(); break;
    case 'bump': bump(t.dataset.f, Number(t.dataset.d)); break;
    case 'add-set': onAddSet(); break;
    case 'del-set':
      id=state.currentEx; d=t.dataset.d; var i=Number(t.dataset.i);
      undoable(id,'Το σετ διαγράφηκε.',function(){
        var s=getRec(id).sessions.filter(function(x){ return x.d===d; })[0];
        if(s) s.sets.splice(i,1);
      });
      break;
    case 'del-session':
      id=state.currentEx; d=t.dataset.d;
      undoable(id,'Η προπόνηση διαγράφηκε.',function(){
        getRec(id).sessions = getRec(id).sessions.filter(function(x){ return x.d!==d; });
      });
      break;
    case 'more-past': state.pastLimit+=8; renderExerciseData(); break;
    case 'more-days': state.histLimit+=30; renderHistory(); break;
    case 'new-ex': openAddDialog(t.dataset.name||''); break;
    case 'del-custom': deleteCustom(state.currentEx); break;
    case 'export': exportCsv(); break;
    case 'backup': saveBackup(); break;
    case 'tab': goTab(t.dataset.tab); break;
    case 'open-day': renderProgramDay(t.dataset.day); window.scrollTo(0,0); break;
    case 'back-to-program': renderProgram(); window.scrollTo(0,0); break;
    case 'open-day-ex': openExercise(t.dataset.id); break;
    case 'toggle-day-done': toggleDayDone(t.dataset.day); break;
  }
});
screen.addEventListener('change', function(e){
  if(e.target.id!=='importFile') return;
  var f=e.target.files && e.target.files[0];
  e.target.value='';
  if(f) onImportFile(f);
});
screen.addEventListener('input', function(e){
  if(e.target.id==='q'){ state.query=e.target.value; renderList(); }
  else if(e.target.matches && e.target.matches('.step input')){
    e.target.removeAttribute('aria-invalid');
    var er=$('#err'); if(er) er.textContent='';
  }
});
screen.addEventListener('keydown', function(e){
  if(e.key==='Enter' && e.target.matches && e.target.matches('.step input')){ e.preventDefault(); onAddSet(); }
});
screen.addEventListener('focusin', function(e){
  if(e.target.matches && e.target.matches('.step input')){ try{ e.target.select(); }catch(x){} }
});
document.querySelector('.tabs').addEventListener('click', function(e){
  var b=e.target.closest('[data-tab]'); if(b) goTab(b.dataset.tab);
});

boot();
})();
