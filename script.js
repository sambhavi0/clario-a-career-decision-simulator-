
function goTo(fromId, toId) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.classList.remove('active');
  from.classList.add('exit-left');
  setTimeout(() => { from.classList.remove('exit-left'); }, 800);
  to.classList.add('active');
  to.scrollTop = 0;
}


setTimeout(() => {
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('profilePage').classList.add('active');
}, 3200);


document.addEventListener('click', function(e) {
  const rc   = document.getElementById('rippleContainer');
  const size = 260;
  const r    = document.createElement('div');
  r.className  = 'ripple';
  r.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - size / 2) + 'px;top:' + (e.clientY - size / 2) + 'px';
  rc.appendChild(r);
  setTimeout(() => r.remove(), 700);
});


document.addEventListener('mousemove', function(e) {
  document.querySelectorAll('.chip, .gen-btn').forEach(function(el) {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});



function toggleChip(btn) {
  btn.classList.toggle('active');
}

function toggleSingle(btn, gid) {
  document.querySelectorAll('#' + gid + ' .chip').forEach(function(c) {
    c.classList.remove('active');
  });
  btn.classList.add('active');
}

function toggleCheck(btn) {
  btn.classList.toggle('active');
}


function showAddInput(type) {
  document.getElementById(type + '-input-wrap').classList.add('show');
  document.getElementById(type + '-add-btn').style.display = 'none';
  document.getElementById(type + '-input').focus();
}

function addOnEnter(e, type) {
  if (e.key === 'Enter')  confirmAdd(type);
  if (e.key === 'Escape') cancelAdd(type);
}

function confirmAdd(type) {
  const input = document.getElementById(type + '-input');
  const val   = input.value.trim();
  if (val) {
    const chips = document.getElementById(type + '-chips');
    const wrap  = document.getElementById(type + '-input-wrap');
    const btn   = document.getElementById(type + '-add-btn');
    const newChip = document.createElement('button');
    if (type === 'skill') {
      newChip.className = 'chip active';
      newChip.textContent = val;
      newChip.setAttribute('onclick', 'toggleChip(this)');
    } else {
      newChip.className = 'check-chip active';
      newChip.innerHTML = '<span class="check-box"><svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#e8eaf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' + val;
      newChip.setAttribute('onclick', 'toggleCheck(this)');
    }
    newChip.style.animation = 'fadeUp .3s ease both';
    chips.insertBefore(newChip, wrap);
    input.value = '';
    wrap.classList.remove('show');
    btn.style.display = '';
  } else {
    cancelAdd(type);
  }
}

function cancelAdd(type) {
  document.getElementById(type + '-input').value = '';
  document.getElementById(type + '-input-wrap').classList.remove('show');
  document.getElementById(type + '-add-btn').style.display = '';
}


function getSelectedChips(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  const active = container.querySelectorAll('.chip.active, .check-chip.active');
  return Array.from(active).map(function(el) {
    const clone = el.cloneNode(true);
    const box   = clone.querySelector('.check-box');
    if (box) box.remove();
    return clone.innerText.trim();
  });
}

function getUserData() {
  return {
    skills:    getSelectedChips('skill-chips'),
    level:     getSelectedChips('exp-chips')[0] || 'beginner',
    interests: getSelectedChips('interest-chips'),
    goals:     getSelectedChips('goal-chips')
  };
}


var careerPaths = [
  // 🔹 TECH
  { name: 'Frontend Developer', skills: ['Html', 'React'], interests: ['Web development'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '4-6 months', marketDemand: 'High', steps: ['Learn HTML/CSS/JS', 'Build projects', 'Apply for jobs'] },
  { name: 'Backend Developer', skills: ['Node.js', 'Sql'], interests: ['Web development'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'High', steps: ['Learn backend', 'Build APIs', 'Work with DB'] },
  { name: 'Full Stack Developer', skills: ['React', 'Node.js'], interests: ['Web development'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '6-9 months', marketDemand: 'High', steps: ['Learn full stack', 'Build apps', 'Apply'] },
  { name: 'Mobile App Developer', skills: ['React'], interests: ['App development'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '5-8 months', marketDemand: 'High', steps: ['Learn React Native', 'Build apps', 'Publish'] },
  { name: 'Game Developer', skills: ['Programming'], interests: ['Gaming'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'Medium', steps: ['Learn game engines', 'Build games', 'Join studios'] },
  { name: 'DevOps Engineer', skills: ['Python'], interests: ['Cloud'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'High', steps: ['Learn CI/CD', 'Use Docker', 'Deploy apps'] },
  { name: 'Cloud Engineer', skills: ['Python'], interests: ['Cloud'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '6-9 months', marketDemand: 'High', steps: ['Learn AWS', 'Deploy apps', 'Get certified'] },
  { name: 'Cybersecurity Analyst', skills: ['Python'], interests: ['Security'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '7-10 months', marketDemand: 'High', steps: ['Learn networking', 'Practice security', 'Get certified'] },

  // 🔹 DATA / AI
  { name: 'Data Scientist', skills: ['Python', 'Sql'], interests: ['Data science'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '6-8 months', marketDemand: 'High', steps: ['Learn ML', 'Analyze data', 'Build projects'] },
  { name: 'Data Analyst', skills: ['Sql'], interests: ['Data science'], goals: ['Get a job'], difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'High', steps: ['Learn SQL', 'Create dashboards', 'Apply'] },
  { name: 'AI/ML Engineer', skills: ['Python'], interests: ['AI'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '9-12 months', marketDemand: 'Very High', steps: ['Learn ML', 'Build models', 'Join AI teams'] },
  { name: 'Business Analyst', skills: ['Analytics'], interests: ['Business'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'High', steps: ['Learn business analysis', 'Work on case studies', 'Apply'] },

  // 🔹 DESIGN / CREATIVE
  { name: 'UX/UI Designer', skills: ['Design'], interests: ['Design'], goals: ['Freelance work'], difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'Medium', steps: ['Learn Figma', 'Build portfolio', 'Get clients'] },
  { name: 'Graphic Designer', skills: ['Design'], interests: ['Creativity'], goals: ['Freelance work'], difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'Medium', steps: ['Learn tools', 'Create portfolio', 'Work'] },
  { name: 'Video Editor', skills: ['Editing'], interests: ['Content creation'], goals: ['Freelance work'], difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'High', steps: ['Learn editing', 'Edit videos', 'Work with creators'] },
  { name: 'Content Creator', skills: ['Communication'], interests: ['Content creation'], goals: ['Freelance work'], difficulty: 'low', timeToGoal: '2-6 months', marketDemand: 'Very High', steps: ['Create content', 'Grow audience', 'Monetize'] },

  // 🔹 MARKETING
  { name: 'Digital Marketer', skills: ['Communication'], interests: ['Marketing'], goals: ['Get a job'], difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'High', steps: ['Learn SEO', 'Run ads', 'Work with brands'] },
  { name: 'Social Media Manager', skills: ['Communication'], interests: ['Social media'], goals: ['Freelance work'], difficulty: 'low', timeToGoal: '2-4 months', marketDemand: 'Very High', steps: ['Manage pages', 'Grow accounts', 'Work with brands'] },
  { name: 'SEO Specialist', skills: ['Analytics'], interests: ['Marketing'], goals: ['Get a job'], difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'High', steps: ['Learn SEO', 'Optimize sites', 'Get clients'] },
  { name: 'Brand Strategist', skills: ['Communication'], interests: ['Business'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '6-8 months', marketDemand: 'Medium', steps: ['Study branding', 'Work on campaigns', 'Join firms'] },

  // 🔹 FINANCE
  { name: 'Financial Analyst', skills: ['Excel'], interests: ['Finance'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '5-8 months', marketDemand: 'High', steps: ['Learn finance', 'Analyze data', 'Apply'] },
  { name: 'Investment Analyst', skills: ['Analytics'], interests: ['Finance'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'Medium', steps: ['Study markets', 'Analyze stocks', 'Join firms'] },
  { name: 'Accountant', skills: ['Excel'], interests: ['Finance'], goals: ['Get a job'], difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'High', steps: ['Learn accounting', 'Work in firms'] },
  { name: 'Banking Professional', skills: ['Communication'], interests: ['Finance'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '5-8 months', marketDemand: 'High', steps: ['Prepare exams', 'Join bank'] },
  { name: 'Tax Consultant', skills: ['Finance'], interests: ['Finance'], goals: ['Freelance work'], difficulty: 'medium', timeToGoal: '6-9 months', marketDemand: 'High', steps: ['Learn tax', 'Handle clients'] },

  // 🔹 HUMANITIES
  { name: 'Journalist', skills: ['Writing'], interests: ['Media'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '4-6 months', marketDemand: 'Medium', steps: ['Write articles', 'Build portfolio'] },
  { name: 'Lawyer', skills: ['Communication'], interests: ['Law'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '3-5 years', marketDemand: 'High', steps: ['Study law', 'Practice'] },
  { name: 'Psychologist', skills: ['Communication'], interests: ['Psychology'], goals: ['Get a job'], difficulty: 'high', timeToGoal: '2-3 years', marketDemand: 'Medium', steps: ['Study psychology', 'Practice'] },
  { name: 'Teacher', skills: ['Communication'], interests: ['Education'], goals: ['Get a job'], difficulty: 'medium', timeToGoal: '1-2 years', marketDemand: 'High', steps: ['Study subject', 'Teach students'] },
  { name: 'Civil Services Aspirant', skills: ['Communication'], interests: ['Government'], goals: ['Government job'], difficulty: 'high', timeToGoal: '1-2 years', marketDemand: 'Very High', steps: ['Prepare exams', 'Study daily'] },

  // 🔹 GENERAL / FLEXIBLE
  { name: 'Entrepreneur', skills: ['Communication'], interests: ['Business'], goals: ['Start a startup'], difficulty: 'high', timeToGoal: 'Varies', marketDemand: 'High', steps: ['Build idea', 'Launch startup'] },
  { name: 'Freelancer', skills: ['Communication'], interests: ['Independence'], goals: ['Freelance work'], difficulty: 'medium', timeToGoal: '3-6 months', marketDemand: 'High', steps: ['Learn skill', 'Find clients'] }

];
function generateRecommendations(user) {
    function calculateScore(career) {
        let score = 0;

        score += career.skills.filter(s => user.skills.includes(s)).length * 3;

        score += career.interests.filter(i => user.interests.includes(i)).length * 5;

        score += career.goals.filter(g => user.goals.includes(g)).length * 2;

        return score;
    }

    let results = careerPaths
        .map(career => {
            
            if (!career.interests.some(i => user.interests.includes(i))) {
                return null;
            }

            return {
                ...career,
                score: calculateScore(career)
            };
        })
        .filter(c => c !== null) 
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); 

    return results;
}


var ICONS = {
  chart:  '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="18" width="6" height="14" rx="1.5" fill="white" opacity="0.9"/><rect x="16" y="10" width="6" height="22" rx="1.5" fill="white" opacity="0.9"/><rect x="27" y="5" width="6" height="27" rx="1.5" fill="white" opacity="0.9"/></svg>',
  trophy: '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 24C14.03 24 10 19.97 10 15V8H28V15C28 19.97 23.97 24 19 24Z" fill="white" opacity="0.9"/><path d="M10 10H6C6 10 6 17 10 17" stroke="white" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><path d="M28 10H32C32 10 32 17 28 17" stroke="white" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><rect x="15" y="24" width="8" height="4" rx="1" fill="white" opacity="0.7"/><rect x="12" y="28" width="14" height="2.5" rx="1.2" fill="white" opacity="0.6"/></svg>',
  code:   '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="30" height="22" rx="3" stroke="white" stroke-width="1.8" opacity="0.9"/><line x1="4" y1="14" x2="34" y2="14" stroke="white" stroke-width="1.4" opacity="0.5"/><circle cx="8.5" cy="11" r="1.2" fill="white" opacity="0.5"/><circle cx="12.5" cy="11" r="1.2" fill="white" opacity="0.5"/><circle cx="16.5" cy="11" r="1.2" fill="white" opacity="0.5"/><path d="M10 20L14 23L10 26" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/><line x1="16" y1="26" x2="27" y2="26" stroke="white" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/></svg>'
};


function scorePath(path, user) {
  var score = 0;
  path.skills.forEach(function(s) {
    if (user.skills.map(function(x) { return x.toLowerCase(); }).indexOf(s.toLowerCase()) !== -1) score += 2;
  });
  path.interests.forEach(function(i) {
    if (user.interests.indexOf(i) !== -1) score += 2;
  });
  path.goals.forEach(function(g) {
    if (user.goals.indexOf(g) !== -1) score += 1;
  });
  if (user.level === 'beginner'     && path.difficulty === 'high') score -= 2;
  if (user.level === 'advanced'     && path.difficulty === 'low')  score -= 1;
  if (user.level === 'intermediate' && path.difficulty === 'high') score -= 1;
  return score;
}
const recommendations = generateRecommendations(userData);
displayRecommendations(recommendations);

var generatedResults = [];

function handleGenerate() {
  var user = getUserData();
  generatedResults = careerPaths
    .map(function(path) {
      return Object.assign({}, path, { score: scorePath(path, user) });
    })
    .sort(function(a, b) { return b.score - a.score; })
    .slice(0, 3);
  renderPathCards();
  goTo('profilePage', 'pathPage');
}

function renderPathCards() {
  var grid = document.querySelector('.path-grid');
  if (!grid) return;
  var labels = ['Path A', 'Path B', 'Path C'];
  var html = '';
  for (var i = 0; i < generatedResults.length; i++) {
    var path = generatedResults[i];
    html += '<div class="path-card" onclick="selectPath(' + i + ')">';
    html += '<div class="path-card-header">' + labels[i] + ' · ' + path.name + '</div>';
    html += '<div class="path-card-icon">' + (ICONS[path.icon] || ICONS.code) + '</div>';
    html += '<div class="path-card-lines"><div class="path-line long"></div><div class="path-line med"></div><div class="path-line short"></div></div>';
    html += '<button class="view-btn">View Details</button>';
    html += '</div>';
  }
  grid.innerHTML = html;
}


var selectedPath = null;

function selectPath(index) {
  selectedPath = generatedResults[index];
  generateOutcome();
  goTo('pathPage', 'outcomePage');
}

function generateOutcome() {
  var user = getUserData();
  var path = selectedPath;

  var matchSkills = 0;
  path.skills.forEach(function(s) {
    if (user.skills.map(function(x) { return x.toLowerCase(); }).indexOf(s.toLowerCase()) !== -1) {
      matchSkills++;
    }
  });

  var readiness = 0;
  if (user.level === 'advanced')           readiness = 70;
  else if (user.level === 'intermediate')  readiness = 45;
  else                                     readiness = 20;

  readiness += matchSkills * 12;

  readiness += user.skills.length * 4;

  if (readiness > 100) readiness = 100;

  var skillLevel = readiness >= 70 ? 'High' : readiness >= 40 ? 'Medium' : 'Low';
  updateOutcomeUI(path, readiness, skillLevel);
}

function updateOutcomeUI(path, readiness, skillLevel) {
  var rows = document.querySelectorAll('.timeline-row');
  if (rows[0]) rows[0].innerHTML = '<span class="tl-dot green"></span>In 3 months : ' + path.steps[0];
  if (rows[1]) rows[1].innerHTML = '<span class="tl-dot yellow"></span>In 6 months : ' + path.steps[1];
  if (rows[2]) rows[2].innerHTML = '<span class="tl-dot blue"></span>In 12 months : ' + path.steps[2];

  var fill = document.querySelector('.skill-gap-fill');
  if (fill) fill.style.width = readiness + '%';

  var miniVal = document.querySelector('.mini-value');
  if (miniVal) miniVal.innerHTML = skillLevel + (skillLevel === 'High' ? ' ✅' : ' <span class="warn-icon">⚠️</span>');

  var potVal = document.querySelector('.potential-value');
  if (potVal) potVal.textContent = path.name + ' Professional';

  var bestHeader = document.querySelector('.best-card-header');
  if (bestHeader) bestHeader.innerHTML = '<span class="star-icon">⭐</span> Best Path For You : ' + path.name;

  var whyDots = document.querySelectorAll('.why-dot');
  var whyTexts = [
    'Aligns with your current skill set',
    'Matches your stated goals',
    path.marketDemand + ' market demand · ' + path.timeToGoal
  ];
  whyDots.forEach(function(el, i) { if (whyTexts[i]) el.textContent = whyTexts[i]; });

  var actionDots = document.querySelectorAll('.action-dot');
  path.steps.forEach(function(step, i) {
    if (actionDots[i]) actionDots[i].innerHTML = '<span class="action-num">' + (i + 1) + '</span>' + step;
  });
}
