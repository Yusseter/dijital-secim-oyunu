const valueMeta = {
  respect: {
    label: 'Saygı',
    badge: 'Saygılı Kullanıcı',
    mark: 'S',
    advice: 'Tepki vermeden önce karşıdaki kişinin onurunu ve mahremiyetini düşün.'
  },
  truth: {
    label: 'Doğruluk',
    badge: 'Doğruluk Dedektifi',
    mark: 'D',
    advice: 'Paylaşmadan önce kaynağı, tarihi ve güvenilirliği kontrol et.'
  },
  responsibility: {
    label: 'Sorumluluk',
    badge: 'Sorumlu Dijital Yurttaş',
    mark: 'SO',
    advice: 'Etkileşimlerinin başkalarına ve kendi zamanına etkisini hesaba kat.'
  },
  kindness: {
    label: 'Dijital Nezaket',
    badge: 'Nezaket Elçisi',
    mark: 'N',
    advice: 'Fikir ayrılığında bile dili yumuşak, açık ve kırmadan kullan.'
  }
};

const themeStorageKey = 'dijital-secim-theme';
const colorModeStorageKey = 'dijital-secim-color-mode';
const textSizeStorageKey = 'dijital-secim-text-size';
const soundStorageKey = 'dijital-secim-sound';
const wheelStorageKey = 'dijital-denge-wheel';
const themeLabels = {
  modern: 'Modern görünüm',
  formal: 'Pano görünümü'
};
const colorModeOrder = ['auto', 'dark', 'light'];
const colorModeLabels = {
  auto: 'Renk: Otomatik',
  dark: 'Renk: Koyu',
  light: 'Renk: Aydınlık'
};
const colorModeSelectLabels = {
  auto: 'Otomatik',
  dark: 'Koyu',
  light: 'Aydınlık'
};
const textSizeMin = 95;
const textSizeMax = 120;
const defaultTextSize = 100;
const soundMin = 0;
const soundMax = 100;
const defaultSoundLevel = 100;
const wheelMinFlickSpeed = 0.38;
const wheelMaxFlickSpeed = 1.35;
const wheelMinFlickDistance = 18;
const routeTargets = new Set(['deger_farkindaligi_oyunu', 'dijital_denge_carki', 'github']);
const cleanRoutePaths = {
  deger_farkindaligi_oyunu: 'Değer_Farkındalığı_Oyunu',
  dijital_denge_carki: 'Dijital_Denge_Çarkı',
  github: 'GitHub'
};
const repositoryUrl = 'https://github.com/Yusseter/dijital-cagda-deger-erozyonu';

let soundLevel = defaultSoundLevel / 100;
let audioContext = null;
let wheelRotation = 0;
let wheelIsSpinning = false;
let selectedWheelTask = null;
let wheelSpinTimer = null;
let wheelDragState = {
  active: false,
  pointerId: null,
  lastAngle: 0,
  lastTime: 0,
  velocity: 0,
  totalDistance: 0
};
let wheelParticipation = {
  date: '',
  count: 0,
  lastTask: 'Henüz yok'
};

const balanceWheelTasks = [
  {
    text: '1 saat telefonsuz kal',
    note: 'Telefonu görünür bir yerden uzaklaştır ve bu süreyi gerçek bir uğraşa ayır.'
  },
  {
    text: 'Bugün filtresiz fotoğraf paylaş',
    note: 'Kendini olduğundan farklı göstermeden, doğal bir anı paylaşmayı dene.'
  },
  {
    text: 'Ailenle telefonsuz yemek ye',
    note: 'Yemek boyunca telefonu masadan uzak tut ve konuşmaya alan aç.'
  },
  {
    text: '30 dakika sosyal medya molası ver',
    note: 'Kısa bir ara ver, bildirimleri beklet ve zihnini dinlendir.'
  },
  {
    text: 'Bir arkadaşınla yüz yüze sohbet et',
    note: 'Mesaj yerine gerçek bir sohbet başlat; kısa bile olsa daha kalıcıdır.'
  },
  {
    text: 'Bildirimlerini kapat',
    note: 'En çok dikkatini bölen uygulamadan başlayarak bildirimleri sessize al.'
  }
];

function setTheme(theme) {
  const activeTheme = theme === 'formal' ? 'formal' : 'modern';
  document.body.dataset.theme = activeTheme;

  const value = document.getElementById('themeSelectValue');
  const button = document.getElementById('themeSelectButton');

  if (value) {
    value.textContent = themeLabels[activeTheme];
  }

  if (button) {
    button.setAttribute('aria-label', `Görünüm: ${themeLabels[activeTheme]}. Değiştirmek için tıkla.`);
  }

  document.querySelectorAll('[data-setting-option="theme"]').forEach(option => {
    option.setAttribute('aria-selected', option.dataset.value === activeTheme ? 'true' : 'false');
  });

  try {
    localStorage.setItem(themeStorageKey, activeTheme);
  } catch (error) {
    // Tema seçimi saklanamazsa oyun yine çalışmaya devam eder.
  }
}

function selectTheme(theme) {
  setTheme(theme);
  closeSettingSelects();
}

function toggleTheme() {
  setTheme(document.body.dataset.theme === 'formal' ? 'modern' : 'formal');
}

function getSystemColorScheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  return 'dark';
}

function applyColorMode(mode) {
  const activeMode = colorModeOrder.includes(mode) ? mode : 'auto';
  const activeScheme = activeMode === 'auto' ? getSystemColorScheme() : activeMode;
  document.body.dataset.colorMode = activeMode;
  document.body.dataset.colorScheme = activeScheme;

  const value = document.getElementById('colorModeSelectValue');
  const button = document.getElementById('colorModeSelectButton');

  if (value) {
    value.textContent = colorModeSelectLabels[activeMode];
  }

  if (button) {
    button.setAttribute('aria-label', `${colorModeLabels[activeMode]}. Değiştirmek için tıkla.`);
  }

  document.querySelectorAll('[data-setting-option="color"]').forEach(option => {
    option.setAttribute('aria-selected', option.dataset.value === activeMode ? 'true' : 'false');
  });

  try {
    localStorage.setItem(colorModeStorageKey, activeMode);
  } catch (error) {
    // Renk seçimi saklanamazsa sistem ayarıyla devam edilir.
  }
}

function selectColorMode(mode) {
  applyColorMode(mode);
  closeSettingSelects();
}

function clampSetting(value, min, max) {
  const numeric = Number(value);
  const safeValue = Number.isFinite(numeric) ? numeric : min;
  return Math.max(min, Math.min(max, safeValue));
}

function setTextSize(size) {
  const activeSize = clampSetting(size, textSizeMin, textSizeMax);
  document.body.dataset.textSize = String(activeSize);
  document.body.style.setProperty('--text-scale', String(activeSize / 100));

  const value = document.getElementById('textSizeValue');
  const range = document.getElementById('textSizeRange');

  if (value) {
    value.textContent = `${activeSize}%`;
  }

  if (range) {
    range.value = String(activeSize);
    range.setAttribute('aria-valuetext', `${activeSize}%`);
  }

  try {
    localStorage.setItem(textSizeStorageKey, String(activeSize));
  } catch (error) {
    // Yazı boyutu saklanamazsa varsayılan görünüm kullanılır.
  }
}

function setSoundLevel(level) {
  const activeLevel = clampSetting(level, soundMin, soundMax);
  document.body.dataset.sound = String(activeLevel);
  soundLevel = activeLevel / 100;

  const value = document.getElementById('soundLevelValue');
  const range = document.getElementById('soundLevelRange');

  if (value) {
    value.textContent = `${activeLevel}%`;
  }

  if (range) {
    range.value = String(activeLevel);
    range.setAttribute('aria-valuetext', activeLevel === 0 ? 'Kapalı' : `${activeLevel}%`);
  }

  try {
    localStorage.setItem(soundStorageKey, String(activeLevel));
  } catch (error) {
    // Ses tercihi saklanamazsa varsayılan kapalı kalır.
  }
}

function previewSoundSetting() {
  if (soundLevel > 0) {
    playSound('toggle');
  }
}

function setSoundMode(mode, preview = false) {
  setSoundLevel(mode === 'on' ? defaultSoundLevel : 0);

  if (preview) {
    previewSoundSetting();
  }
}

function selectTextSize(size) {
  setTextSize(size);
}

function selectSoundMode(mode) {
  setSoundMode(mode, true);
}

function cycleColorMode() {
  const currentMode = document.body.dataset.colorMode || 'auto';
  const currentIndex = colorModeOrder.indexOf(currentMode);
  const nextMode = colorModeOrder[(currentIndex + 1) % colorModeOrder.length];
  applyColorMode(nextMode);
}

function closeSettingSelects(exceptType) {
  document.querySelectorAll('.setting-select').forEach(select => {
    if (exceptType && select.dataset.select === exceptType) {
      return;
    }

    select.classList.remove('open');
    const button = select.querySelector('.setting-select-button');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

function toggleSettingSelect(type) {
  const select = document.querySelector(`.setting-select[data-select="${type}"]`);
  if (!select) {
    return;
  }

  const willOpen = !select.classList.contains('open');
  closeSettingSelects(type);
  select.classList.toggle('open', willOpen);

  const button = select.querySelector('.setting-select-button');
  if (button) {
    button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  }
}

function playSound(type) {
  if (soundLevel <= 0 || typeof window === 'undefined') {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  try {
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const tones = {
      toggle: [560, 0.06],
      start: [660, 0.08],
      select: [520, 0.07],
      positive: [760, 0.09],
      warning: [220, 0.10],
      next: [610, 0.05],
      finish: [880, 0.12],
      wheel: [700, 0.08],
      complete: [920, 0.10]
    };
    const [frequency, duration] = tones[type] || tones.select;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08 * soundLevel, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  } catch (error) {
    // Tarayıcı ses üretimine izin vermezse oyun sessiz devam eder.
  }
}

function playChoiceSound(choice) {
  const totalEffect = Object.values(choice.effect).reduce((sum, value) => sum + value, 0);

  if (totalEffect >= 12) {
    playSound('positive');
  } else if (totalEffect < 0) {
    playSound('warning');
  } else {
    playSound('select');
  }
}

function updateFullscreenButton() {
  const button = document.getElementById('fullscreenButton');
  if (button) {
    button.textContent = document.fullscreenElement ? 'Tam Ekrandan Çık' : 'Tam Ekran';
    button.disabled = !document.fullscreenEnabled;
  }
}

function toggleFullscreen() {
  if (!document.fullscreenEnabled) {
    return;
  }

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  } else {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  closeSettingsMenu();
}

function toggleHowTo() {
  const panel = document.getElementById('howToPanel');
  const button = document.getElementById('howToToggle');
  if (!panel || !button) {
    return;
  }

  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

function resetGameState() {
  index = 0;
  scenarios = [];
  scores = { respect: 50, truth: 50, responsibility: 50, kindness: 50 };
  updateMeters();

  const insight = document.getElementById('currentInsight');
  if (insight) {
    insight.textContent = 'Oyuna başlayınca her seçimin hangi değeri etkilediği burada görünecek.';
  }
}

function setSettingsMenu(open) {
  document.body.classList.toggle('settings-open', open);

  const toggle = document.getElementById('settingsMenuToggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Görünüm ayarlarını kapat' : 'Görünüm ayarlarını aç');
  }
}

function toggleSettingsMenu() {
  setSettingsMenu(!document.body.classList.contains('settings-open'));
}

function closeSettingsMenu() {
  setSettingsMenu(false);
  closeSettingSelects();
}

function getLocalDateStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateWheelDisplay() {
  const count = document.getElementById('wheelCompletionCount');
  const lastTask = document.getElementById('lastWheelTask');

  if (count) {
    count.textContent = wheelParticipation.count;
  }

  if (lastTask) {
    lastTask.textContent = wheelParticipation.lastTask;
  }
}

function normalizeWheelAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function getWheelPointerAngle(event, wheelShell) {
  const rect = wheelShell.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return normalizeWheelAngle(Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90);
}

function getWheelAngleDelta(nextAngle, previousAngle) {
  return ((nextAngle - previousAngle + 540) % 360) - 180;
}

function getRandomWheelOffset() {
  const offset = 8 + Math.random() * 18;
  return Math.random() < 0.5 ? -offset : offset;
}

function getWheelTaskIndex(rotation) {
  const segmentAngle = 360 / balanceWheelTasks.length;
  const pointerAngleOnWheel = normalizeWheelAngle(-rotation + segmentAngle / 2);
  return Math.floor(pointerAngleOnWheel / segmentAngle) % balanceWheelTasks.length;
}

function getWheelDeltaToTarget(targetAngle, direction, rounds) {
  const currentAngle = normalizeWheelAngle(wheelRotation);

  if (direction < 0) {
    return -(rounds * 360 + normalizeWheelAngle(currentAngle - targetAngle));
  }

  return rounds * 360 + normalizeWheelAngle(targetAngle - currentAngle);
}

function getWheelSpinDuration(speedRatio = 0.55) {
  const normalizedSpeed = Math.min(Math.max(speedRatio, 0), 1);
  return Math.round(1300 + normalizedSpeed * 1800);
}

function getWheelFlickRatio(speed) {
  if (speed < wheelMinFlickSpeed) {
    return 0;
  }

  return Math.min((speed - wheelMinFlickSpeed) / (wheelMaxFlickSpeed - wheelMinFlickSpeed), 1);
}

function setWheelRotation(rotation, duration = null) {
  const wheelShell = document.getElementById('wheelShell');
  if (!wheelShell) {
    return;
  }

  if (duration !== null) {
    wheelShell.style.setProperty('--wheel-spin-duration', `${duration}ms`);
  }

  wheelRotation = rotation;
  wheelShell.style.setProperty('--wheel-rotation', `${wheelRotation}deg`);
  wheelShell.style.setProperty('--wheel-counter-rotation', `${-wheelRotation}deg`);
}

function showWheelFlickHint() {
  const completeButton = document.getElementById('wheelCompleteButton');
  const task = document.getElementById('wheelTask');
  const note = document.getElementById('wheelNote');

  selectedWheelTask = null;

  if (completeButton) {
    completeButton.disabled = true;
  }

  if (task && note) {
    task.textContent = 'Biraz daha hızlı savur.';
    note.textContent = 'Görev seçilmesi için çarkı kısa ve net bir hareketle bırakmalısın. İstersen ortadaki butonu da kullanabilirsin.';
  }

  playSound('warning');
}

function saveWheelParticipation() {
  try {
    localStorage.setItem(wheelStorageKey, JSON.stringify(wheelParticipation));
  } catch (error) {
    // Katılım sayacı saklanamazsa çark yine çalışmaya devam eder.
  }
}

function initWheelParticipation() {
  const today = getLocalDateStamp();
  let savedParticipation = null;

  try {
    savedParticipation = JSON.parse(localStorage.getItem(wheelStorageKey));
  } catch (error) {
    savedParticipation = null;
  }

  if (savedParticipation && savedParticipation.date === today) {
    wheelParticipation = {
      date: today,
      count: Number(savedParticipation.count) || 0,
      lastTask: savedParticipation.lastTask || 'Henüz yok'
    };
  } else {
    wheelParticipation = { date: today, count: 0, lastTask: 'Henüz yok' };
  }

  updateWheelDisplay();
}

function openBalanceWheel(confirmIfActive = true, updateRoute = true) {
  if (confirmIfActive && isActiveGameScreen()) {
    const shouldLeave = window.confirm('Aktif oyunu bırakıp Dijital Denge Çarkı etkinliğine geçmek istiyor musun? Puanların sıfırlanacak.');

    if (!shouldLeave) {
      return;
    }

    resetGameState();
  }

  closeSettingsMenu();
  if (updateRoute) {
    setRoutePath('dijital_denge_carki');
  }
  updateWheelDisplay();

  const insight = document.getElementById('currentInsight');
  if (insight) {
    insight.textContent = 'Dijital Denge Çarkı, ziyaretçilere kısa ve uygulanabilir sosyal medya denge görevleri verir.';
  }

  showScreen('balance-wheel');
}

function spinBalanceWheel() {
  if (wheelIsSpinning) {
    return;
  }

  const taskIndex = Math.floor(Math.random() * balanceWheelTasks.length);
  const segmentAngle = 360 / balanceWheelTasks.length;
  const targetAngle = normalizeWheelAngle(360 - taskIndex * segmentAngle + getRandomWheelOffset());
  const spinRounds = 4 + Math.floor(Math.random() * 3);
  const delta = getWheelDeltaToTarget(targetAngle, 1, spinRounds);
  animateWheelTo(wheelRotation + delta, taskIndex, getWheelSpinDuration(0.7));
}

function animateWheelTo(targetRotation, taskIndex, duration = getWheelSpinDuration()) {
  const spinButton = document.getElementById('wheelSpinButton');
  const completeButton = document.getElementById('wheelCompleteButton');
  const task = document.getElementById('wheelTask');
  const note = document.getElementById('wheelNote');
  const wheelShell = document.getElementById('wheelShell');

  if (!spinButton || !completeButton || !task || !note || !wheelShell) {
    return;
  }

  window.clearTimeout(wheelSpinTimer);
  wheelShell.classList.remove('wheel-dragging');
  wheelIsSpinning = true;
  selectedWheelTask = null;
  spinButton.disabled = true;
  spinButton.textContent = 'Dönüyor...';
  completeButton.disabled = true;
  task.textContent = 'Çark dönüyor...';
  note.textContent = 'Görev birazdan seçilecek.';
  setWheelRotation(targetRotation, duration);
  playSound('wheel');

  wheelSpinTimer = window.setTimeout(() => {
    selectedWheelTask = balanceWheelTasks[taskIndex];
    task.textContent = selectedWheelTask.text;
    note.textContent = selectedWheelTask.note;
    completeButton.disabled = false;
    spinButton.disabled = false;
    spinButton.textContent = 'Tekrar Çevir';
    wheelIsSpinning = false;

    const insight = document.getElementById('currentInsight');
    if (insight) {
      insight.textContent = `Çark görevi: ${selectedWheelTask.text}`;
    }

    playSound('finish');
  }, duration + 120);
}

function startWheelDrag(event) {
  const wheelShell = document.getElementById('wheelShell');

  if (!wheelShell || wheelIsSpinning || (event.target.closest && event.target.closest('button'))) {
    return;
  }

  const angle = getWheelPointerAngle(event, wheelShell);
  wheelDragState = {
    active: true,
    pointerId: event.pointerId,
    lastAngle: angle,
    lastTime: Date.now(),
    velocity: 0,
    totalDistance: 0
  };

  selectedWheelTask = null;
  wheelShell.classList.add('wheel-dragging');
  if (wheelShell.setPointerCapture) {
    wheelShell.setPointerCapture(event.pointerId);
  }

  const completeButton = document.getElementById('wheelCompleteButton');
  const task = document.getElementById('wheelTask');
  const note = document.getElementById('wheelNote');

  if (completeButton) {
    completeButton.disabled = true;
  }

  if (task && note) {
    task.textContent = 'Çarkı bırakınca görev seçilecek.';
    note.textContent = 'İstersen hızlıca savur, istersen yavaşça çevir.';
  }
}

function moveWheelDrag(event) {
  const wheelShell = document.getElementById('wheelShell');

  if (!wheelShell || !wheelDragState.active || event.pointerId !== wheelDragState.pointerId) {
    return;
  }

  const now = Date.now();
  const nextAngle = getWheelPointerAngle(event, wheelShell);
  const delta = getWheelAngleDelta(nextAngle, wheelDragState.lastAngle);
  const elapsed = Math.max(now - wheelDragState.lastTime, 16);
  const instantVelocity = delta / elapsed;

  wheelDragState.velocity = wheelDragState.velocity === 0
    ? instantVelocity
    : wheelDragState.velocity * 0.45 + instantVelocity * 0.55;
  wheelDragState.totalDistance += Math.abs(delta);
  wheelDragState.lastAngle = nextAngle;
  wheelDragState.lastTime = now;
  setWheelRotation(wheelRotation + delta);
}

function finishWheelDrag(event) {
  const wheelShell = document.getElementById('wheelShell');

  if (!wheelShell || !wheelDragState.active || event.pointerId !== wheelDragState.pointerId) {
    return;
  }

  if (wheelShell.hasPointerCapture && wheelShell.hasPointerCapture(event.pointerId)) {
    wheelShell.releasePointerCapture(event.pointerId);
  }
  wheelShell.classList.remove('wheel-dragging');

  const releaseDelay = Date.now() - wheelDragState.lastTime;
  const speedDecay = Math.max(0, 1 - releaseDelay / 180);
  const direction = wheelDragState.velocity < 0 ? -1 : 1;
  const speed = Math.min(Math.abs(wheelDragState.velocity) * speedDecay, wheelMaxFlickSpeed);
  const speedRatio = getWheelFlickRatio(speed);

  wheelDragState.active = false;

  if (speedRatio === 0 || wheelDragState.totalDistance < wheelMinFlickDistance) {
    showWheelFlickHint();
    return;
  }

  const projectedRotation = wheelRotation + direction * (120 + speedRatio * 1200 + Math.random() * (80 + speedRatio * 240));
  const taskIndex = getWheelTaskIndex(projectedRotation);
  const segmentAngle = 360 / balanceWheelTasks.length;
  const targetAngle = normalizeWheelAngle(360 - taskIndex * segmentAngle + getRandomWheelOffset());
  const spinRounds = Math.floor(speedRatio * 5) + (speedRatio > 0.35 ? Math.floor(Math.random() * 2) : 0);
  const delta = getWheelDeltaToTarget(targetAngle, direction, spinRounds);
  const duration = getWheelSpinDuration(speedRatio);

  animateWheelTo(wheelRotation + delta, taskIndex, duration);
}

function cancelWheelDrag(event) {
  const wheelShell = document.getElementById('wheelShell');

  if (!wheelShell || !wheelDragState.active || event.pointerId !== wheelDragState.pointerId) {
    return;
  }

  wheelDragState.active = false;
  if (wheelShell.hasPointerCapture && wheelShell.hasPointerCapture(event.pointerId)) {
    wheelShell.releasePointerCapture(event.pointerId);
  }
  wheelShell.classList.remove('wheel-dragging');
}

function initWheelDrag() {
  const wheelShell = document.getElementById('wheelShell');

  if (!wheelShell) {
    return;
  }

  wheelShell.addEventListener('pointerdown', startWheelDrag);
  wheelShell.addEventListener('pointermove', moveWheelDrag);
  wheelShell.addEventListener('pointerup', finishWheelDrag);
  wheelShell.addEventListener('pointercancel', cancelWheelDrag);
}

function completeWheelTask() {
  const completeButton = document.getElementById('wheelCompleteButton');
  const task = document.getElementById('wheelTask');
  const note = document.getElementById('wheelNote');

  if (!selectedWheelTask || !completeButton || !task || !note) {
    return;
  }

  wheelParticipation.date = getLocalDateStamp();
  wheelParticipation.count += 1;
  wheelParticipation.lastTask = selectedWheelTask.text;
  saveWheelParticipation();
  updateWheelDisplay();

  task.textContent = `Görev alındı: ${selectedWheelTask.text}`;
  note.textContent = 'Harika. Şimdi görevi gerçek hayatta uygulama zamanı.';
  selectedWheelTask = null;
  completeButton.disabled = true;
  playSound('complete');
}

function getCurrentScreen() {
  const app = document.querySelector('.app');
  return app ? app.dataset.screen : 'start';
}

function isActiveGameScreen() {
  const screen = getCurrentScreen();
  return screen === 'game' || screen === 'feedback';
}

function updateMenuActions() {
  const screen = getCurrentScreen();
  const hasStartedGame = scenarios.length > 0;
  const homeButton = document.getElementById('homeMenuButton');
  const sideFinishButton = document.getElementById('sideFinishButton');
  const gameControlStatus = document.getElementById('gameControlStatus');
  const canFinish = hasStartedGame && isActiveGameScreen();

  if (homeButton) {
    homeButton.disabled = screen === 'start';
  }

  if (sideFinishButton) {
    sideFinishButton.hidden = !canFinish;
    sideFinishButton.disabled = !canFinish;
  }

  if (gameControlStatus) {
    if (canFinish) {
      gameControlStatus.textContent = `Senaryo ${Math.min(index + 1, scenarios.length)} / ${scenarios.length}. İstersen oyunu mevcut puanlarınla bitirebilirsin.`;
    } else if (screen === 'result') {
      gameControlStatus.textContent = 'Oyun tamamlandı. Sonucunu inceleyebilir veya yeni oyun başlatabilirsin.';
    } else if (screen === 'balance-wheel') {
      gameControlStatus.textContent = 'Dijital denge çarkı açık. Oyuna dönmek için ana menüyü kullanabilirsin.';
    } else {
      gameControlStatus.textContent = 'Oyuna başlayınca kalan senaryo ve bitirme seçeneği burada görünür.';
    }
  }
}

function scrollPanelIntoView() {
  if (typeof window === 'undefined' || !window.matchMedia('(max-width: 860px)').matches) {
    return;
  }

  const panel = document.querySelector('.panel');
  if (!panel) {
    return;
  }

  window.requestAnimationFrame(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function getAppBasePathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  let pathname = window.location.pathname || '/';

  if (!pathname.endsWith('/')) {
    pathname = pathname.replace(/\/[^/]*$/, '/');
  }

  const parts = pathname.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];

  if (normalizeRouteSegment(lastPart)) {
    parts.pop();
  }

  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}

function normalizeRouteSegment(segment) {
  if (!segment) {
    return '';
  }

  let value = segment;

  try {
    value = decodeURIComponent(value);
  } catch (error) {
    value = segment;
  }

  const slug = value
    .trim()
    .toLocaleLowerCase('tr')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[\s-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  return routeTargets.has(slug) ? slug : '';
}

function getRouteFromPath() {
  if (typeof window === 'undefined') {
    return '';
  }

  const parts = (window.location.pathname || '').split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1] || '';

  return normalizeRouteSegment(lastPart);
}

function getRequestedRoute() {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const queryRoute = normalizeRouteSegment(params.get('route'));

  if (queryRoute) {
    return { target: queryRoute, source: 'query' };
  }

  const pathRoute = getRouteFromPath();

  if (pathRoute) {
    return { target: pathRoute, source: 'path' };
  }

  const hashRoute = normalizeRouteSegment(window.location.hash.replace('#', ''));

  if (hashRoute) {
    return { target: hashRoute, source: 'hash' };
  }

  return null;
}

function setRoutePath(target) {
  if (typeof window === 'undefined' || !window.history || !window.location) {
    return;
  }

  if (window.location.protocol === 'file:') {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash === target || (!target && !routeTargets.has(currentHash))) {
      return;
    }

    const fileUrl = new URL(window.location.href);
    fileUrl.search = '';
    fileUrl.hash = target || '';
    window.history.replaceState(null, '', fileUrl);
    return;
  }

  const url = new URL(window.location.href);
  const basePathname = getAppBasePathname();

  if (target) {
    url.pathname = `${basePathname}${cleanRoutePaths[target] || ''}`;
  } else {
    url.pathname = basePathname;
  }

  url.search = '';
  url.hash = '';

  if (url.href === window.location.href) {
    return;
  }

  window.history.replaceState(null, '', url);
}

function focusGithubLink() {
  const githubLink = document.getElementById('github');
  if (!githubLink) {
    return;
  }

  githubLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
  try {
    githubLink.focus({ preventScroll: true });
  } catch (error) {
    githubLink.focus();
  }
}

function handleRoute() {
  if (typeof window === 'undefined') {
    return;
  }

  const route = getRequestedRoute();

  if (!route) {
    return;
  }

  const { target, source } = route;

  if (target === 'github') {
    if (source === 'hash') {
      focusGithubLink();
    } else {
      window.location.replace(repositoryUrl);
    }
    return;
  }

  if (target === 'deger_farkindaligi_oyunu') {
    startGame(false);
  } else if (target === 'dijital_denge_carki') {
    openBalanceWheel(false, false);
  }

  setRoutePath(target);
}

function goToMainMenu(confirmIfActive = true) {
  if (confirmIfActive && isActiveGameScreen()) {
    const shouldLeave = window.confirm('Aktif oyunu bırakıp ana menüye dönmek istiyor musun? Puanların sıfırlanacak.');

    if (!shouldLeave) {
      return;
    }
  }

  closeSettingsMenu();
  resetGameState();
  setRoutePath('');
  showScreen('start');
}

function finishFromMenu() {
  if (!scenarios.length || !isActiveGameScreen()) {
    updateMenuActions();
    return;
  }

  const shouldFinish = window.confirm('Oyunu mevcut puanlarınla bitirmek istiyor musun?');

  if (!shouldFinish) {
    return;
  }

  closeSettingsMenu();
  finishGame();
}

function initSettingsMenu() {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeSettingSelects();
      closeSettingsMenu();
    }
  });

  window.addEventListener('click', event => {
    if (!event.target.closest('.setting-select')) {
      closeSettingSelects();
    }
  });

  document.addEventListener('fullscreenchange', updateFullscreenButton);
  updateFullscreenButton();
}

function initRouting() {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('popstate', handleRoute);
  window.requestAnimationFrame(handleRoute);
}

function initColorMode() {
  let savedMode = 'auto';

  try {
    savedMode = localStorage.getItem(colorModeStorageKey) || 'auto';
  } catch (error) {
    savedMode = 'auto';
  }

  applyColorMode(savedMode);

  if (typeof window !== 'undefined' && window.matchMedia) {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = () => {
      if (document.body.dataset.colorMode === 'auto') {
        applyColorMode('auto');
      }
    };

    if (media.addEventListener) {
      media.addEventListener('change', handleSystemChange);
    } else if (media.addListener) {
      media.addListener(handleSystemChange);
    }
  }
}

function initTextSize() {
  let savedSize = String(defaultTextSize);

  try {
    savedSize = localStorage.getItem(textSizeStorageKey) || String(defaultTextSize);
  } catch (error) {
    savedSize = String(defaultTextSize);
  }

  if (savedSize === 'large') {
    savedSize = '115';
  } else if (savedSize === 'normal') {
    savedSize = String(defaultTextSize);
  }

  setTextSize(savedSize);
}

function initSoundMode() {
  let savedSound = String(defaultSoundLevel);

  try {
    savedSound = localStorage.getItem(soundStorageKey) || String(defaultSoundLevel);
  } catch (error) {
    savedSound = String(defaultSoundLevel);
  }

  if (savedSound === 'on') {
    savedSound = String(defaultSoundLevel);
  } else if (savedSound === 'off') {
    savedSound = '0';
  }

  setSoundLevel(savedSound);
}

function initTheme() {
  let savedTheme = 'modern';

  try {
    savedTheme = localStorage.getItem(themeStorageKey) || 'modern';
  } catch (error) {
    savedTheme = 'modern';
  }

  setTheme(savedTheme);
}

const questionCount = 6;
let scenarios = [];
let index = 0;
let scores = {
  respect: 50,
  truth: 50,
  responsibility: 50,
  kindness: 50
};

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector('.app').dataset.screen = id;
  updateMenuActions();

  if (id !== 'start') {
    scrollPanelIntoView();
  }
}

function scoreStatus(value) {
  if (value < 40) {
    return { text: 'düşük', className: 'status low' };
  }

  if (value < 70) {
    return { text: 'dengeli', className: 'status balanced' };
  }

  return { text: 'güçlü', className: 'status strong' };
}

function formatEffect(effect) {
  return Object.entries(effect)
    .map(([key, value]) => `${valueMeta[key].label} ${value > 0 ? '+' : ''}${value}`)
    .join(', ');
}

function updateMeters() {
  const pairs = [
    ['respect', 'respectValue', 'respectBar', 'respectStatus'],
    ['truth', 'truthValue', 'truthBar', 'truthStatus'],
    ['responsibility', 'responsibilityValue', 'responsibilityBar', 'responsibilityStatus'],
    ['kindness', 'kindnessValue', 'kindnessBar', 'kindnessStatus']
  ];

  pairs.forEach(([key, valueId, barId, statusId]) => {
    const status = scoreStatus(scores[key]);
    document.getElementById(valueId).textContent = scores[key];
    document.getElementById(barId).style.width = scores[key] + '%';
    document.getElementById(statusId).textContent = status.text;
    document.getElementById(statusId).className = status.className;
  });
}

function shuffle(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function selectScenarios() {
  const groups = scenarioPool.reduce((acc, scenario) => {
    if (!acc[scenario.category]) {
      acc[scenario.category] = [];
    }

    acc[scenario.category].push(scenario);
    return acc;
  }, {});

  const selected = shuffle(Object.keys(groups))
    .slice(0, questionCount)
    .map(category => shuffle(groups[category])[0]);

  if (selected.length < questionCount) {
    const remaining = shuffle(scenarioPool.filter(scenario => !selected.includes(scenario)));
    selected.push(...remaining.slice(0, questionCount - selected.length));
  }

  return shuffle(selected).slice(0, questionCount);
}

function startGame(updateRoute = true) {
  playSound('start');
  if (updateRoute) {
    setRoutePath('deger_farkindaligi_oyunu');
  }
  index = 0;
  scenarios = selectScenarios();
  scores = { respect: 50, truth: 50, responsibility: 50, kindness: 50 };
  updateMeters();
  renderScenario();
  showScreen('game');
}

function renderScenario() {
  const scenario = scenarios[index];
  document.getElementById('progressTag').textContent = `Senaryo ${index + 1} / ${scenarios.length}`;
  document.getElementById('categoryIcon').textContent = scenario.icon;
  document.getElementById('categoryName').textContent = scenario.category;
  document.getElementById('scenarioTitle').textContent = scenario.title;
  document.getElementById('scenarioText').textContent = scenario.text;
  document.getElementById('postCategory').textContent = scenario.category;
  document.getElementById('postTitle').textContent = scenario.postTitle;
  document.getElementById('postText').textContent = scenario.postText;
  document.getElementById('currentInsight').textContent = scenario.tip;

  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  shuffle(scenario.choices).forEach(choice => {
    const button = document.createElement('button');
    const title = document.createElement('span');

    button.className = 'choice-button';
    title.className = 'choice-title';
    title.textContent = choice.text;
    button.onclick = () => choose(choice);

    button.appendChild(title);
    choices.appendChild(button);
  });
}

function choose(choice) {
  playChoiceSound(choice);
  Object.keys(choice.effect).forEach(key => {
    scores[key] = clamp(scores[key] + choice.effect[key]);
  });
  updateMeters();

  document.getElementById('feedbackTitle').textContent = choice.title;
  document.getElementById('feedbackWhat').textContent = choice.what;
  document.getElementById('feedbackImpact').textContent = formatEffect(choice.effect);
  document.getElementById('feedbackBetter').textContent = choice.better;
  document.getElementById('feedbackNotice').textContent = choice.notice;
  document.getElementById('currentInsight').textContent = `${choice.title}: ${formatEffect(choice.effect)}`;
  showScreen('feedback');
}

function nextScenario() {
  index += 1;
  if (index >= scenarios.length) {
    finishGame();
  } else {
    playSound('next');
    renderScenario();
    showScreen('game');
  }
}

function getAverage() {
  const total = scores.respect + scores.truth + scores.responsibility + scores.kindness;
  return Math.round(total / 4);
}

function getValueByScore(direction) {
  const entries = Object.entries(scores).map(([key, score]) => ({
    key,
    score,
    label: valueMeta[key].label
  }));

  entries.sort((a, b) => direction === 'max' ? b.score - a.score : a.score - b.score);
  return entries[0];
}

function getProfile(average) {
  if (average >= 80) {
    return {
      title: 'Değerlerini Korumayı Bilen Dijital Rehber',
      text: 'Seçimlerin, sosyal medyada hem kendini hem çevreni koruyan güçlü bir farkındalık gösteriyor.'
    };
  }

  if (average >= 65) {
    return {
      title: 'Bilinçli Dijital Kullanıcı',
      text: 'Seçimlerin genel olarak saygı, doğruluk ve sorumluluk dengesini koruyan bir yaklaşım gösteriyor.'
    };
  }

  if (average >= 50) {
    return {
      title: 'Farkındalığı Gelişen Kullanıcı',
      text: 'Bazı seçimlerin olumlu, bazıları riskli. Paylaşmadan ve tepki vermeden önce kısa bir duraklama faydalı olur.'
    };
  }

  return {
    title: 'Dikkat Gerektiren Dijital Alışkanlık',
    text: 'Seçimlerin, sosyal medyada değerleri korumak için daha bilinçli kararlar gerektiğini gösteriyor.'
  };
}

function renderBadges(average) {
  const badgeList = document.getElementById('badgeList');
  const earned = Object.entries(valueMeta)
    .filter(([key]) => scores[key] >= 70)
    .map(([key, meta]) => ({ title: meta.badge, mark: meta.mark }));

  if (average >= 80) {
    earned.unshift({ title: 'Dijital Rehber', mark: 'DR' });
  }

  if (earned.length === 0) {
    earned.push({ title: 'Farkındalık Yolcusu', mark: 'FY' });
  }

  badgeList.innerHTML = '';
  earned.forEach(badge => {
    const item = document.createElement('span');
    const mark = document.createElement('span');
    const text = document.createElement('span');

    item.className = 'badge';
    mark.className = 'badge-mark';
    mark.textContent = badge.mark;
    text.textContent = badge.title;

    item.appendChild(mark);
    item.appendChild(text);
    badgeList.appendChild(item);
  });
}

function finishGame() {
  playSound('finish');
  const average = getAverage();
  const profile = getProfile(average);
  const strongest = getValueByScore('max');
  const weakest = getValueByScore('min');

  document.getElementById('resultTitle').textContent = profile.title;
  document.getElementById('resultText').textContent = profile.text;
  document.getElementById('finalAverage').textContent = average;
  document.getElementById('strongestValue').textContent = `${strongest.label} (${strongest.score})`;
  document.getElementById('weakestValue').textContent = `${weakest.label} (${weakest.score})`;
  document.getElementById('finalRespect').textContent = scores.respect;
  document.getElementById('finalTruth').textContent = scores.truth;
  document.getElementById('finalResponsibility').textContent = scores.responsibility;
  document.getElementById('finalKindness').textContent = scores.kindness;
  document.getElementById('resultAdvice').textContent =
    `Güçlü tarafın ${strongest.label}. Geliştirmek için: ${valueMeta[weakest.key].advice}`;
  document.getElementById('currentInsight').textContent =
    `Son profil: ${profile.title}. Ortalama puanın ${average}.`;

  renderBadges(average);
  showScreen('result');
}

function restartGame() {
  startGame();
}

initTheme();
initColorMode();
initTextSize();
initSoundMode();
initSettingsMenu();
initWheelParticipation();
initWheelDrag();
updateMeters();
updateMenuActions();
initRouting();
