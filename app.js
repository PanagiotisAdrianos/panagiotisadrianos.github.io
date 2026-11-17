(function(){
  'use strict';

  // ---------- data that never changes ----------
  var LS = 'ta-exoda-mou-pwa';
  var CAT_KEYS = ['food', 'coffee', 'super', 'transport', 'bills', 'fun', 'shop', 'other'];
  var CAT_COLORS = {food:'#e07a2f', coffee:'#9a6440', super:'#3f8f4f', transport:'#2f6fbf', bills:'#7b4fc4', fun:'#d0457a', shop:'#c49a1a', other:'#6f7d79'};

  // ---------- translations ----------
  var STR = {
    el: {
      locale: 'el-GR', dec: ',',
      cats: {food:'Φαγητό', coffee:'Καφές', super:'Σούπερ μάρκετ', transport:'Μετακίνηση', bills:'Λογαριασμοί', fun:'Διασκέδαση', shop:'Ψώνια', other:'Άλλο'},
      langBtn: 'EN', langBtnLabel: 'Switch to English',
      periodsAria: 'Τα έξοδά σου τώρα', pToday: 'Σήμερα', pWeek: 'Αυτή την εβδομάδα', pMonth: 'Αυτόν τον μήνα',
      monthSummary: 'Σύνοψη μήνα', prevMonth: 'Προηγούμενος μήνας', nextMonth: 'Επόμενος μήνας',
      spent: 'Ξόδεψες', loading: 'Φόρτωση…', count: function(n){ return n === 1 ? '1 έξοδο' : n + ' έξοδα'; }, noneMonth: 'Κανένα έξοδο αυτόν τον μήνα',
      budgetLabel: 'Μηνιαίος προϋπολογισμός σε ευρώ', budgetPh: 'π.χ. 400', save: 'Αποθήκευση', cancel: 'Άκυρο',
      budget: 'Προϋπολογισμός', left: 'Απομένουν', over: 'Ξεπέρασες κατά', changeBudget: 'Αλλαγή προϋπολογισμού', setBudget: 'Όρισε μηνιαίο προϋπολογισμό',
      newExp: 'Νέο έξοδο', editExp: 'Επεξεργασία εξόδου', recentAria: 'Πρόσφατα έξοδα για γρήγορη καταχώριση',
      amountLabel: 'Ποσό σε ευρώ', amountPh: '0,00', catAria: 'Κατηγορία',
      note: 'Περιγραφή (προαιρετικά)', notePh: 'π.χ. Καφές με παρέα', date: 'Ημερομηνία',
      add: 'Προσθήκη εξόδου', saveChanges: 'Αποθήκευση αλλαγών',
      listAria: 'Έξοδα του μήνα',
      firstHint: function(m){ return 'Γράψε το πρώτο σου έξοδο για ' + m + ' στη φόρμα από πάνω.'; },
      noneFor: function(m){ return 'Δεν υπάρχουν έξοδα για ' + m + '.'; },
      today: 'Σήμερα', yesterday: 'Χθες', edit: 'Επεξεργασία', del: 'Διαγραφή', sure: 'Σίγουρα;', confirmDel: 'Επιβεβαίωση διαγραφής',
      csv: 'Λήψη του μήνα ως CSV', csvHead: 'Ημερομηνία;Κατηγορία;Περιγραφή;Ποσό',
      backupTitle: 'Αντίγραφο ασφαλείας', backupSave: 'Αποθήκευση αντιγράφου', restore: 'Επαναφορά από αρχείο',
      lastBackup: function(d){ return 'Τελευταίο αντίγραφο: ' + d + '.'; },
      backupOld: ' Πάρε καινούριο, έχουν περάσει πάνω από δύο εβδομάδες.',
      backupNever: 'Τα έξοδα μένουν μόνο σε αυτό το κινητό. Αν το αλλάξεις ή σβήσεις τα δεδομένα του browser, χάνονται. Αποθήκευε αντίγραφο κάθε λίγες μέρες (π.χ. στο Google Drive).',
      errAmount: 'Γράψε ένα ποσό μεγαλύτερο από το μηδέν, π.χ. 3,50.', errBig: 'Το ποσό είναι πολύ μεγάλο. Έλεγξε τα ψηφία.',
      added: function(a){ return 'Προστέθηκε ' + a; }, saved: 'Οι αλλαγές αποθηκεύτηκαν', deleted: 'Το έξοδο διαγράφηκε',
      backupDone: 'Το αντίγραφο αποθηκεύτηκε',
      restored: function(n){ return n === 1 ? 'Επαναφέρθηκε 1 έξοδο' : 'Επαναφέρθηκαν ' + n + ' έξοδα'; },
      restoredNone: 'Όλα τα έξοδα του αρχείου υπάρχουν ήδη', badFile: 'Αυτό το αρχείο δεν είναι αντίγραφο της εφαρμογής.',
      storageFail: 'Η αποθήκευση απέτυχε: ο χώρος του κινητού μπορεί να είναι γεμάτος.',
      installText: 'Βάλε την εφαρμογή στο κινητό σου για να ανοίγει με ένα πάτημα, και χωρίς internet.', install: 'Εγκατάσταση',
      iosInstall: 'Για εγκατάσταση: πάτα <b>Κοινοποίηση</b> και μετά <b>Προσθήκη στην οθόνη Αφετηρίας</b>.'
    },
    en: {
      locale: 'en-IE', dec: '.',
      cats: {food:'Food', coffee:'Coffee', super:'Groceries', transport:'Transport', bills:'Bills', fun:'Going out', shop:'Shopping', other:'Other'},
      langBtn: 'ΕΛ', langBtnLabel: 'Αλλαγή σε Ελληνικά',
      periodsAria: 'Your spending right now', pToday: 'Today', pWeek: 'This week', pMonth: 'This month',
      monthSummary: 'Month summary', prevMonth: 'Previous month', nextMonth: 'Next month',
      spent: 'You spent', loading: 'Loading…', count: function(n){ return n === 1 ? '1 expense' : n + ' expenses'; }, noneMonth: 'No expenses this month',
      budgetLabel: 'Monthly budget in euros', budgetPh: 'e.g. 400', save: 'Save', cancel: 'Cancel',
      budget: 'Budget', left: 'Left', over: 'Over by', changeBudget: 'Change budget', setBudget: 'Set a monthly budget',
      newExp: 'New expense', editExp: 'Edit expense', recentAria: 'Recent expenses for quick entry',
      amountLabel: 'Amount in euros', amountPh: '0.00', catAria: 'Category',
      note: 'Description (optional)', notePh: 'e.g. Coffee with friends', date: 'Date',
      add: 'Add expense', saveChanges: 'Save changes',
      listAria: 'This month’s expenses',
      firstHint: function(m){ return 'Add your first expense for ' + m + ' using the form above.'; },
      noneFor: function(m){ return 'No expenses in ' + m + '.'; },
      today: 'Today', yesterday: 'Yesterday', edit: 'Edit', del: 'Delete', sure: 'Sure?', confirmDel: 'Confirm delete',
      csv: 'Download this month as CSV', csvHead: 'Date;Category;Description;Amount',
      backupTitle: 'Backup', backupSave: 'Save a backup', restore: 'Restore from file',
      lastBackup: function(d){ return 'Last backup: ' + d + '.'; },
      backupOld: ' Make a new one — it’s been more than two weeks.',
      backupNever: 'Your expenses live only on this phone. If you switch phones or clear the browser’s data, they’re gone. Save a backup every few days (e.g. to Google Drive).',
      errAmount: 'Enter an amount greater than zero, e.g. 3.50.', errBig: 'That amount is too large. Check the digits.',
      added: function(a){ return 'Added ' + a; }, saved: 'Changes saved', deleted: 'Expense deleted',
      backupDone: 'Backup saved',
      restored: function(n){ return n === 1 ? 'Restored 1 expense' : 'Restored ' + n + ' expenses'; },
      restoredNone: 'Every expense in that file is already here', badFile: 'That file isn’t a Pocketfold backup.',
      storageFail: 'Saving failed: your phone’s storage may be full.',
      installText: 'Install the app so it opens with one tap, even offline.', install: 'Install',
      iosInstall: 'To install: tap <b>Share</b>, then <b>Add to Home Screen</b>.'
    }
  };

  // ---------- helpers ----------
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]; }); }
  function pad(n){ return String(n).padStart(2, '0'); }
  function ymd(d){ return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today(){ return ymd(new Date()); }
  function dateOf(s){ var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2] || 1); }
  function catOf(k){ return CAT_KEYS.indexOf(k) > -1 ? k : 'other'; }

  var LOCAL = {budget: 0, items: [], lang: null};
  try { var raw = localStorage.getItem(LS); if (raw) { var p0 = JSON.parse(raw); if (p0 && Array.isArray(p0.items)) LOCAL = p0; } } catch (e) {}

  var lang = LOCAL.lang === 'en' || LOCAL.lang === 'el' ? LOCAL.lang : null;
  var T = STR[lang || 'el'];
  var fmt;
  function setLang(l){
    lang = l; T = STR[l];
    fmt = new Intl.NumberFormat(T.locale, {style: 'currency', currency: 'EUR'});
    document.documentElement.lang = l;
  }
  function money(c){ return fmt.format(c / 100); }
  function amtText(c){ return (c / 100).toFixed(2).replace('.', T.dec); }
  function monthName(ym){ return new Intl.DateTimeFormat(T.locale, {month: 'long', year: 'numeric'}).format(dateOf(ym)); }
  function monthOnly(ym){ return new Intl.DateTimeFormat(T.locale, {month: 'long'}).format(dateOf(ym)); }
  function catName(k){ return T.cats[catOf(k)]; }

  // ---------- state ----------
  var view = today().slice(0, 7);
  var selCat = 'food';
  var D = {budget: 0, month: [], recent: []};
  var pendingDel = null, editingBudget = false, editingId = null, flash = '', flashTimer = null;

  function saveLocal(){
    try { localStorage.setItem(LS, JSON.stringify(LOCAL)); } catch (e) { say(T.storageFail); }
  }
  function refresh(){
    D.budget = LOCAL.budget || 0;
    D.month = LOCAL.items.filter(function(i){ return i.ym === view; });
    D.recent = LOCAL.items.slice().sort(function(a, z){ return z.created - a.created; }).slice(0, 30);
    render();
  }

  // ---------- first launch: choose a language ----------
  function showLangPicker(){
    var guess = /^el\b/i.test(navigator.language || '') ? 'el' : 'en';
    $('root').innerHTML =
      '<section class="card langpick" aria-labelledby="lp-t">' +
        '<div class="lp-icon" aria-hidden="true">€</div>' +
        '<h1 id="lp-t">Pocketfold</h1>' +
        '<p>Διάλεξε γλώσσα<br>Choose your language</p>' +
        '<div class="lp-btns">' +
          '<button type="button" class="' + (guess === 'el' ? 'primary' : 'ghostbtn') + '" data-lang="el">Ελληνικά</button>' +
          '<button type="button" class="' + (guess === 'en' ? 'primary' : 'ghostbtn') + '" data-lang="en">English</button>' +
        '</div>' +
        '<p class="lp-note">Μπορείς να την αλλάξεις όποτε θες · You can change it any time</p>' +
      '</section>';
  }

  // ---------- main screen ----------
  function buildShell(){
    $('root').innerHTML =
      '<div class="installbar" id="installbar" hidden></div>' +
      '<header class="top"><div class="brand">Pocketfold</div><div class="topright"><div class="status" id="status" role="status"></div>' +
        '<button type="button" class="langsw" data-act="lang" aria-label="' + T.langBtnLabel + '">' + T.langBtn + '</button></div></header>' +
      '<section class="periods" aria-label="' + T.periodsAria + '">' +
        '<div class="ptile"><span>' + T.pToday + '</span><b id="p-day"></b></div>' +
        '<div class="ptile"><span>' + T.pWeek + '</span><b id="p-week"></b></div>' +
        '<div class="ptile"><span>' + T.pMonth + '</span><b id="p-month"></b></div>' +
      '</section>' +
      '<section class="card" aria-label="' + T.monthSummary + '">' +
        '<div class="mnav"><button class="icon" id="prev" type="button" aria-label="' + T.prevMonth + '">‹</button><h1 id="mlabel"></h1><button class="icon" id="next" type="button" aria-label="' + T.nextMonth + '">›</button></div>' +
        '<div class="total"><span class="lbl">' + T.spent + '</span><span id="total" class="big"></span><span id="count" class="sub"></span></div>' +
        '<div id="budget" class="budget"></div>' +
        '<div id="stack" class="stack" aria-hidden="true"></div>' +
        '<ul id="cats" class="cats"></ul>' +
      '</section>' +
      '<section class="card" id="formcard">' +
        '<h2 id="ftitle"></h2>' +
        '<form id="form" novalidate>' +
          '<div id="recent" class="recent" aria-label="' + T.recentAria + '"></div>' +
          '<div class="amtrow"><label for="amt" class="sr">' + T.amountLabel + '</label><input id="amt" inputmode="decimal" placeholder="' + T.amountPh + '" autocomplete="off"><span class="eur" aria-hidden="true">€</span></div>' +
          '<div id="chips" class="chips" role="radiogroup" aria-label="' + T.catAria + '">' +
            CAT_KEYS.map(function(k){ return '<button type="button" class="chip" role="radio" data-cat="' + k + '" aria-checked="false"><i class="dot" style="background:' + CAT_COLORS[k] + '"></i>' + T.cats[k] + '</button>'; }).join('') +
          '</div>' +
          '<div class="row2"><div><label for="note">' + T.note + '</label><input id="note" placeholder="' + T.notePh + '" maxlength="80" autocomplete="off"></div>' +
          '<div><label for="date">' + T.date + '</label><input id="date" type="date"></div></div>' +
          '<p id="err" class="err" role="alert"></p>' +
          '<div class="formfoot"><button class="primary" id="submit" type="submit"></button><button type="button" class="link" id="cancelEdit" data-act="cancelEdit" hidden>' + T.cancel + '</button></div>' +
        '</form>' +
      '</section>' +
      '<section id="list" aria-label="' + T.listAria + '"></section>' +
      '<section class="card" aria-labelledby="bkt"><h2 id="bkt">' + T.backupTitle + '</h2><p class="hint" id="bkinfo"></p>' +
        '<div class="bkbtns"><button type="button" class="small" data-act="export">' + T.backupSave + '</button>' +
        '<input type="file" id="importFile" accept="application/json,.json" class="sr"><label class="ghost" for="importFile">' + T.restore + '</label></div></section>';
    $('date').value = today();
    editingId = null; editingBudget = false; pendingDel = null;
    updateInstallBar();
  }

  function showStatus(){ var s = $('status'); if (s) s.textContent = flash; }
  function say(msg){ flash = msg; showStatus(); clearTimeout(flashTimer); flashTimer = setTimeout(function(){ flash = ''; showStatus(); }, 3500); }

  function dayLabel(d){
    if (d === today()) return T.today;
    var y = new Date(); y.setDate(y.getDate() - 1);
    if (d === ymd(y)) return T.yesterday;
    return new Intl.DateTimeFormat(T.locale, {weekday: 'long', day: 'numeric', month: 'long'}).format(dateOf(d));
  }

  function recentChoices(){
    var seen = {}, out = [];
    for (var i = 0; i < D.recent.length && out.length < 4; i++) {
      var r = D.recent[i], key = r.cat + '|' + (r.note || '').toLowerCase() + '|' + r.amt;
      if (seen[key]) continue;
      seen[key] = 1; out.push(r);
    }
    return out;
  }

  function render(){
    if (!lang || !$('mlabel')) return;
    var cur = today().slice(0, 7);

    // today / this week (from Monday) / this month, always counted from today
    var td = today(), ws = new Date(); ws.setDate(ws.getDate() - (ws.getDay() + 6) % 7);
    var wk = ymd(ws), sDay = 0, sWeek = 0, sMonth = 0;
    LOCAL.items.forEach(function(i){
      if (i.date > td) return;
      if (i.date === td) sDay += i.amt;
      if (i.date >= wk) sWeek += i.amt;
      if (i.ym === cur) sMonth += i.amt;
    });
    $('p-day').textContent = money(sDay);
    $('p-week').textContent = money(sWeek);
    $('p-month').textContent = money(sMonth);
    $('mlabel').textContent = monthName(view);
    $('next').disabled = view >= cur;

    var items = D.month.slice();
    var total = items.reduce(function(s, i){ return s + i.amt; }, 0);
    $('total').textContent = money(total);
    $('count').textContent = items.length ? T.count(items.length) : T.noneMonth;

    // budget
    var b = D.budget || 0, bh;
    if (editingBudget) {
      bh = '<div class="bedit"><label for="bud" class="sr">' + T.budgetLabel + '</label><input id="bud" inputmode="decimal" placeholder="' + T.budgetPh + '" value="' + (b ? amtText(b) : '') + '"><button type="button" class="small" data-act="bsave">' + T.save + '</button><button type="button" class="link" data-act="bcancel">' + T.cancel + '</button></div>';
    } else if (b > 0) {
      var ratio = total / b, left = b - total;
      var cls = ratio > 1 ? 'over' : (ratio > 0.85 ? 'warn' : '');
      bh = '<div class="bar ' + cls + '"><span style="width:' + Math.min(100, ratio * 100).toFixed(1) + '%"></span></div>' +
        '<div class="bline"><span>' + T.budget + ' <strong>' + money(b) + '</strong></span>' +
        (left >= 0 ? '<span>' + T.left + ' <strong>' + money(left) + '</strong></span>' : '<span class="neg">' + T.over + ' <strong class="neg">' + money(-left) + '</strong></span>') +
        '</div><div><button type="button" class="link" data-act="bedit">' + T.changeBudget + '</button></div>';
    } else {
      bh = '<div><button type="button" class="link" data-act="bedit">' + T.setBudget + '</button></div>';
    }
    if (!(document.activeElement && document.activeElement.id === 'bud')) {
      $('budget').innerHTML = bh;
      if (editingBudget) $('bud').focus();
    }

    // categories
    var by = {};
    items.forEach(function(i){ by[i.cat] = (by[i.cat] || 0) + i.amt; });
    var rows = CAT_KEYS.filter(function(k){ return by[k]; }).sort(function(a, z){ return by[z] - by[a]; });
    $('stack').innerHTML = rows.map(function(k){ return '<span style="flex:' + by[k] + ';background:' + CAT_COLORS[k] + '"></span>'; }).join('');
    $('cats').innerHTML = rows.map(function(k){
      return '<li><i style="background:' + CAT_COLORS[k] + '"></i><span>' + T.cats[k] + '</span><b>' + money(by[k]) + '</b><em>' + Math.round(by[k] * 100 / total) + '%</em></li>';
    }).join('');

    // quick picks
    $('recent').innerHTML = editingId ? '' : recentChoices().map(function(r, idx){
      return '<button type="button" class="rchip" data-act="recent" data-idx="' + idx + '"><i class="dot" style="background:' + CAT_COLORS[catOf(r.cat)] + '"></i>' + esc(r.note || catName(r.cat)) + ' <b>' + money(r.amt) + '</b></button>';
    }).join('');

    // list
    var days = {};
    items.forEach(function(i){ (days[i.date] = days[i.date] || []).push(i); });
    var keys = Object.keys(days).sort().reverse();
    if (!keys.length) {
      $('list').innerHTML = '<p class="none">' + (view === cur ? T.firstHint(monthOnly(view)) : T.noneFor(monthName(view))) + '</p>';
    } else {
      $('list').innerHTML = keys.map(function(d){
        var arr = days[d].sort(function(a, z){ return (z.created || 0) - (a.created || 0); });
        var sum = arr.reduce(function(s, i){ return s + i.amt; }, 0);
        return '<div class="dayh"><span>' + dayLabel(d) + '</span><span>' + money(sum) + '</span></div><div class="rows">' +
          arr.map(function(i){
            var k = catOf(i.cat), sure = pendingDel === i.id;
            return '<div class="item' + (editingId === i.id ? ' editing' : '') + '"><i class="dot" style="background:' + CAT_COLORS[k] + '"></i>' +
              '<button type="button" class="t" data-act="edit" data-id="' + esc(i.id) + '" aria-label="' + T.edit + ': ' + T.cats[k] + ' ' + money(i.amt) + '"><span>' + T.cats[k] + '</span>' + (i.note ? '<small>' + esc(i.note) + '</small>' : '') + '</button>' +
              '<span class="amount">' + money(i.amt) + '</span>' +
              '<button type="button" class="del' + (sure ? ' sure' : '') + '" data-act="del" data-id="' + esc(i.id) + '" aria-label="' + (sure ? T.confirmDel : T.del) + ' ' + T.cats[k] + ' ' + money(i.amt) + '">' + (sure ? T.sure : T.del) + '</button></div>';
          }).join('') + '</div>';
      }).join('') + '<div class="tools"><button type="button" class="link" data-act="csv">' + T.csv + '</button></div>';
    }

    $('ftitle').textContent = editingId ? T.editExp : T.newExp;
    $('submit').textContent = editingId ? T.saveChanges : T.add;
    $('cancelEdit').hidden = !editingId;
    Array.prototype.forEach.call($('chips').children, function(btn){
      btn.setAttribute('aria-checked', btn.getAttribute('data-cat') === selCat ? 'true' : 'false');
    });
    renderBackup();
    showStatus();
  }

  function renderBackup(){
    var el = $('bkinfo');
    if (!el) return;
    var n = LOCAL.items.length, lb = LOCAL.lastBackup;
    var old = !lb || (Date.now() - lb) > 14 * 864e5;
    el.textContent = lb ? T.lastBackup(new Intl.DateTimeFormat(T.locale, {day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(lb))) + (old && n ? T.backupOld : '') : T.backupNever;
    el.classList.toggle('nudge', !!(old && n));
  }

  // Accepts 3,50 · 3.50 · 1.234,50 · 1,234.50 — the last separator is the decimal one.
  function parseAmount(raw){
    var s = String(raw).trim().replace(/\s|€/g, '');
    var lc = s.lastIndexOf(','), ld = s.lastIndexOf('.');
    if (lc > -1 && ld > -1) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
    else if (lc > -1) s = s.replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
    return Math.round(parseFloat(s) * 100);
  }

  // ---------- operations ----------
  function findItem(id){
    for (var i = 0; i < LOCAL.items.length; i++) if (LOCAL.items[i].id === id) return LOCAL.items[i];
    return null;
  }
  function resetForm(){
    editingId = null;
    $('amt').value = ''; $('note').value = ''; $('date').value = today(); $('err').textContent = '';
  }

  function onSubmit(){
    var err = $('err');
    var amt = parseAmount($('amt').value);
    if (!amt || isNaN(amt) || amt <= 0) { err.textContent = T.errAmount; $('amt').focus(); return; }
    if (amt > 100000000) { err.textContent = T.errBig; return; }
    var d = $('date').value || today();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) d = today();
    var id = editingId, old = id ? findItem(id) : null;
    var data = {amt: amt, cat: selCat, note: $('note').value.trim().slice(0, 80), date: d, ym: d.slice(0, 7), created: old ? old.created : Date.now()};
    if (old) LOCAL.items = LOCAL.items.map(function(i){ return i.id === id ? Object.assign({id: id}, data) : i; });
    else LOCAL.items.push(Object.assign({id: 'l' + Date.now()}, data));
    saveLocal();
    say(id ? T.saved : T.added(money(amt)));
    resetForm();
    view = data.ym;
    refresh();
    if (!id) $('amt').focus();
  }

  function onClick(t){
    if (t.hasAttribute('data-lang')) {
      LOCAL.lang = t.getAttribute('data-lang'); saveLocal();
      setLang(LOCAL.lang); buildShell(); refresh(); return;
    }
    if (t.id === 'prev' || t.id === 'next') {
      var dt = dateOf(view); dt.setMonth(dt.getMonth() + (t.id === 'prev' ? -1 : 1));
      view = dt.getFullYear() + '-' + pad(dt.getMonth() + 1);
      pendingDel = null; refresh(); return;
    }
    if (t.hasAttribute('data-cat')) { selCat = t.getAttribute('data-cat'); render(); return; }
    var act = t.getAttribute('data-act');
    if (act === 'lang') {
      LOCAL.lang = lang === 'el' ? 'en' : 'el'; saveLocal();
      setLang(LOCAL.lang); buildShell(); refresh();
    } else if (act === 'del') {
      var id = t.getAttribute('data-id');
      if (pendingDel === id) {
        pendingDel = null;
        if (editingId === id) resetForm();
        LOCAL.items = LOCAL.items.filter(function(i){ return i.id !== id; });
        saveLocal(); say(T.deleted); refresh();
      } else { pendingDel = id; render(); }
    } else if (act === 'edit') {
      var it = findItem(t.getAttribute('data-id'));
      if (!it) return;
      editingId = it.id; pendingDel = null;
      $('amt').value = amtText(it.amt); selCat = catOf(it.cat); $('note').value = it.note; $('date').value = it.date; $('err').textContent = '';
      render();
      $('formcard').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
      $('amt').focus({preventScroll: true});
    } else if (act === 'cancelEdit') {
      resetForm(); render();
    } else if (act === 'recent') {
      var r = recentChoices()[Number(t.getAttribute('data-idx'))];
      if (!r) return;
      $('amt').value = amtText(r.amt); selCat = catOf(r.cat); $('note').value = r.note; $('date').value = today();
      render(); $('submit').focus();
    } else if (act === 'csv') {
      var lines = [T.csvHead];
      D.month.slice().sort(function(a, z){ return a.date < z.date ? -1 : a.date > z.date ? 1 : a.created - z.created; }).forEach(function(i){
        lines.push([i.date, catName(i.cat), '"' + i.note.replace(/"/g, '""') + '"', amtText(i.amt)].join(';'));
      });
      downloadFile('pocketfold-' + view + '.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
    } else if (act === 'export') { exportBackup(); }
    else if (act === 'install') { doInstall(); }
    else if (act === 'bedit') { editingBudget = true; render(); }
    else if (act === 'bcancel') { editingBudget = false; render(); }
    else if (act === 'bsave') {
      var v = $('bud').value.trim();
      var c = v ? parseAmount(v) : 0;
      if (isNaN(c) || c < 0) { $('bud').setAttribute('aria-invalid', 'true'); $('bud').focus(); return; }
      editingBudget = false;
      if (document.activeElement) document.activeElement.blur();
      LOCAL.budget = c; saveLocal(); refresh();
    }
  }

  // ---------- files: backup, restore, CSV ----------
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
  function plainDownload(blob, name){
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 2000);
  }

  function exportBackup(){
    var data = {app: 'pocketfold', version: 1, exported: new Date().toISOString(), budget: LOCAL.budget || 0, items: LOCAL.items};
    downloadFile('pocketfold-backup-' + today() + '.json', JSON.stringify(data), 'application/json').then(function(done){
      if (!done) return;
      LOCAL.lastBackup = Date.now(); saveLocal(); renderBackup();
      say(T.backupDone);
    });
  }

  function importBackup(f){
    f.text().then(function(txt){
      var p = JSON.parse(txt);
      if (!p || (p.app !== 'pocketfold' && p.app !== 'ta-exoda-mou') || !Array.isArray(p.items)) throw new Error('bad');
      var have = {};
      LOCAL.items.forEach(function(i){ have[i.id] = 1; });
      var added = 0;
      p.items.forEach(function(i){
        if (!i || have[i.id] || typeof i.amt !== 'number' || i.amt <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(i.date || '')) return;
        LOCAL.items.push({id: String(i.id), amt: Math.round(i.amt), cat: catOf(i.cat), note: String(i.note || '').slice(0, 80), date: i.date, ym: i.date.slice(0, 7), created: Number(i.created) || 0});
        have[i.id] = 1; added++;
      });
      if (!LOCAL.budget && p.budget > 0) LOCAL.budget = Math.round(p.budget);
      saveLocal(); refresh();
      say(added ? T.restored(added) : T.restoredNone);
    }).catch(function(){ say(T.badFile); });
  }

  // ---------- install ----------
  var installEvt = null;
  var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  function updateInstallBar(){
    var b = $('installbar');
    if (!b) return;
    if (installEvt) { b.innerHTML = '<span>' + T.installText + '</span><button type="button" class="small" data-act="install">' + T.install + '</button>'; b.hidden = false; }
    else if (!standalone && /iPhone|iPad/i.test(navigator.userAgent)) { b.innerHTML = '<span>' + T.iosInstall + '</span>'; b.hidden = false; }
    else b.hidden = true;
  }
  window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); installEvt = e; updateInstallBar(); });
  window.addEventListener('appinstalled', function(){ installEvt = null; standalone = true; updateInstallBar(); });
  function doInstall(){
    if (!installEvt) return;
    installEvt.prompt();
    installEvt.userChoice.then(function(){ installEvt = null; updateInstallBar(); });
  }

  // ---------- events (delegated, so they survive a language switch) ----------
  var root = $('root');
  root.addEventListener('click', function(ev){ var t = ev.target.closest('button'); if (t) onClick(t); });
  root.addEventListener('submit', function(ev){ ev.preventDefault(); if (ev.target.id === 'form') onSubmit(); });
  root.addEventListener('change', function(ev){
    if (ev.target.id !== 'importFile') return;
    var f = ev.target.files && ev.target.files[0];
    ev.target.value = '';
    if (f) importBackup(f);
  });
  root.addEventListener('keydown', function(ev){
    if (ev.key === 'Enter' && ev.target.id === 'bud') { ev.preventDefault(); var b = document.querySelector('[data-act="bsave"]'); if (b) b.click(); }
  });

  // ---------- start ----------
  if (lang) { setLang(lang); buildShell(); refresh(); }
  else showLangPicker();
  if (navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(function(){}); }
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function(){ navigator.serviceWorker.register('./sw.js').catch(function(){}); });
  }
})();
