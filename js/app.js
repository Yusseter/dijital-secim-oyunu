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

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 861px)').matches) {
      closeSettingsMenu();
    }
  });
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

function startGame() {
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
initSettingsMenu();
updateMeters();
