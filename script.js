// ── Page navigation
function goTo(fromId, toId){
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.classList.remove('active');
  from.classList.add('exit-left');
  setTimeout(()=>{ from.classList.remove('exit-left') }, 800);
  to.classList.add('active');
  to.scrollTop = 0;
}

// ── Loader → Profile
setTimeout(()=>{
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('profilePage').classList.add('active');
}, 3200);

// ── Global ripple
document.addEventListener('click', e => {
  const rc = document.getElementById('rippleContainer');
  const size = 260;
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-size/2}px;top:${e.clientY-size/2}px`;
  rc.appendChild(r);
  setTimeout(()=>r.remove(), 700);
});

// ── Mouse glow on chips
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.chip,.gen-btn').forEach(el => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    el.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

// ── Chip interactions
function toggleChip(btn){ btn.classList.toggle('active') }
function toggleSingle(btn, gid){ document.querySelectorAll('#'+gid+' .chip').forEach(c=>c.classList.remove('active')); btn.classList.add('active') }
function toggleCheck(btn){ btn.classList.toggle('active') }

// ── Add skill/interest
function showAddInput(type){
  document.getElementById(type+'-input-wrap').classList.add('show');
  document.getElementById(type+'-add-btn').style.display='none';
  document.getElementById(type+'-input').focus();
}
function addOnEnter(e,type){ if(e.key==='Enter') confirmAdd(type); if(e.key==='Escape') cancelAdd(type) }
function confirmAdd(type){
  const input = document.getElementById(type+'-input');
  const val = input.value.trim();
  if(val){
    const chips = document.getElementById(type+'-chips');
    const wrap  = document.getElementById(type+'-input-wrap');
    const btn   = document.getElementById(type+'-add-btn');
    let newChip = document.createElement('button');
    if(type==='skill'){
      newChip.className='chip active'; newChip.textContent=val; newChip.onclick=function(){toggleChip(this)};
    } else {
      newChip.className='check-chip active';
      newChip.innerHTML=`<span class="check-box"><svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#e8eaf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${val}`;
      newChip.onclick=function(){toggleCheck(this)};
    }
    newChip.style.animation='fadeUp .3s ease both';
    chips.insertBefore(newChip, wrap);
    input.value=''; wrap.classList.remove('show'); btn.style.display='';
  } else cancelAdd(type);
}
function cancelAdd(type){
  document.getElementById(type+'-input').value='';
  document.getElementById(type+'-input-wrap').classList.remove('show');
  document.getElementById(type+'-add-btn').style.display='';
}

// ── Data collection
function getSelectedChips(containerId) {
  const container = document.getElementById(containerId);
  const selected  = container.querySelectorAll('.chip.active, .check-chip.active');
  return Array.from(selected).map(el => el.innerText.trim());
}
function getUserData() {
  return {
    skills:    getSelectedChips('skill-chips'),
    level:     getSelectedChips('exp-chips')[0] || 'beginner',
    interests: getSelectedChips('interest-chips'),
    goals:     getSelectedChips('goal-chips')
  };
}

// ══════════════════════════════════════════
//  CAREER PATH DEFINITIONS
// ══════════════════════════════════════════

const careerPaths = [
  {
    name: 'Frontend Developer', icon: 'chart',
    skills: ['Html', 'React'], interests: ['Web development'],
    goals: ['Get a job', 'Find a Internship'],
    difficulty: 'medium', timeToGoal: '4-6 months', marketDemand: 'High',
    steps: ['Master HTML, CSS & React', 'Build a strong portfolio', 'Land a frontend role']
  },
  {
    name: 'Full Stack Developer', icon: 'trophy',
    skills: ['React', 'Sql', 'Html'], interests: ['Web development', 'AI'],
    goals: ['Get a job', 'Start a startup'],
    difficulty: 'high', timeToGoal: '6-9 months', marketDemand: 'High',
    steps: ['Learn frontend & backend', 'Build full stack projects', 'Join a product company']
  },
  {
    name: 'AI/ML Engineer', icon: 'code',
    skills: ['Python'], interests: ['AI', 'Data science'],
    goals: ['Get a job', 'Start a startup'],
    difficulty: 'high', timeToGoal: '9-12 months', marketDemand: 'Very High',
    steps: ['Learn Python & ML fundamentals', 'Build AI projects', 'Join an AI team']
  },
  {
    name: 'Data Scientist', icon: 'chart',
    skills: ['Python', 'Sql'], interests: ['Data science', 'Finance'],
    goals: ['Get a job', 'Find a Internship'],
    difficulty: 'medium', timeToGoal: '6-8 months', marketDemand: 'High',
    steps: ['Learn data analysis & SQL', 'Work on real datasets', 'Get a data analyst role']
  },
  {
    name: 'Cybersecurity Analyst', icon: 'trophy',
    skills: ['Python', 'Sql'], interests: ['AI', 'Web development'],
    goals: ['Get a job', 'Find a Internship'],
    difficulty: 'high', timeToGoal: '7-10 months', marketDemand: 'High',
    steps: ['Study networking & security', 'Earn certifications', 'Work at a tech firm']
  },
  {
    name: 'UX/UI Designer', icon: 'code',
    skills: ['Html'], interests: ['Web development'],
    goals: ['Freelance work', 'Get a job'],
    difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'Medium',
    steps: ['Learn Figma & design basics', 'Build a design portfolio', 'Get freelance or full-time work']
  },
  {
  name: 'Backend Developer', icon: 'code',
  skills: ['Node.js', 'Sql'], interests: ['Web development'],
  goals: ['Get a job', 'Find a Internship'],
  difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'High',
  steps: ['Learn Node.js & APIs', 'Work with databases', 'Build backend systems']
},
{
  name: 'DevOps Engineer', icon: 'trophy',
  skills: ['Python', 'Linux'], interests: ['Cloud', 'Automation'],
  goals: ['Get a job', 'Start a startup'],
  difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'High',
  steps: ['Learn CI/CD pipelines', 'Work with Docker & Kubernetes', 'Deploy real apps']
},
{
  name: 'Cloud Engineer', icon: 'chart',
  skills: ['Python'], interests: ['Cloud', 'Web development'],
  goals: ['Get a job'],
  difficulty: 'medium', timeToGoal: '6-9 months', marketDemand: 'High',
  steps: ['Learn AWS/GCP basics', 'Deploy applications', 'Get certified']
},
{
  name: 'Software Engineer', icon: 'code',
  skills: ['C++', 'Python'], interests: ['Problem solving'],
  goals: ['Get a job', 'Crack product companies'],
  difficulty: 'high', timeToGoal: '6-10 months', marketDemand: 'Very High',
  steps: ['Learn DSA', 'Practice coding', 'Apply to product companies']
},
{
  name: 'Data Analyst', icon: 'chart',
  skills: ['Sql', 'Python'], interests: ['Data science'],
  goals: ['Get a job'],
  difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'High',
  steps: ['Learn Excel & SQL', 'Work on datasets', 'Build dashboards']
},
{
  name: 'Business Analyst', icon: 'trophy',
  skills: ['Sql'], interests: ['Finance', 'Business'],
  goals: ['Get a job'],
  difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'High',
  steps: ['Learn business analysis', 'Work on case studies', 'Apply for analyst roles']
},
{
  name: 'Quantitative Analyst', icon: 'code',
  skills: ['Python'], interests: ['Finance', 'Data science'],
  goals: ['Get a job'],
  difficulty: 'high', timeToGoal: '9-12 months', marketDemand: 'Medium',
  steps: ['Learn statistics & finance', 'Work on trading models', 'Apply to fintech firms']
},
{
  name: 'Product Designer', icon: 'chart',
  skills: ['Figma', 'Html'], interests: ['Design', 'Web development'],
  goals: ['Freelance work', 'Get a job'],
  difficulty: 'medium', timeToGoal: '4-6 months', marketDemand: 'High',
  steps: ['Learn UX principles', 'Design case studies', 'Build portfolio']
},
{
  name: 'Frontend + UX Specialist', icon: 'code',
  skills: ['React', 'Html'], interests: ['Web development', 'Design'],
  goals: ['Get a job'],
  difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'High',
  steps: ['Master React', 'Learn UX basics', 'Build polished UI projects']
},
{
  name: 'Web3 Developer', icon: 'trophy',
  skills: ['JavaScript'], interests: ['Blockchain'],
  goals: ['Start a startup', 'Get a job'],
  difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'Growing',
  steps: ['Learn blockchain basics', 'Work with smart contracts', 'Build dApps']
},
{
  name: 'AI Product Manager', icon: 'chart',
  skills: ['Python'], interests: ['AI', 'Business'],
  goals: ['Get a job'],
  difficulty: 'high', timeToGoal: '8-10 months', marketDemand: 'Growing',
  steps: ['Learn product management', 'Understand AI systems', 'Work on case studies']
},
{
  name: 'Technical Content Creator', icon: 'code',
  skills: ['Python', 'Html'], interests: ['Teaching', 'Tech'],
  goals: ['Freelance work', 'Build personal brand'],
  difficulty: 'low', timeToGoal: '2-4 months', marketDemand: 'High',
  steps: ['Start writing/blogging', 'Create tutorials', 'Grow audience']
},
{
  name: 'Product Manager', icon: 'trophy',
  skills: ['Communication', 'Analytics'], interests: ['Business', 'Tech'],
  goals: ['Get a job', 'Start a startup'],
  difficulty: 'high', timeToGoal: '8-12 months', marketDemand: 'High',
  steps: ['Learn product thinking', 'Work on case studies', 'Apply for PM roles']
},
{
  name: 'Marketing Specialist', icon: 'chart',
  skills: ['Communication'], interests: ['Marketing', 'Social media'],
  goals: ['Freelance work', 'Get a job'],
  difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'High',
  steps: ['Learn digital marketing', 'Run campaigns', 'Work with brands']
},
{
  name: 'Sales Executive', icon: 'trophy',
  skills: ['Communication'], interests: ['Business'],
  goals: ['Get a job'],
  difficulty: 'low', timeToGoal: '2-4 months', marketDemand: 'High',
  steps: ['Learn sales techniques', 'Practice pitching', 'Join a company']
},
{
  name: 'Graphic Designer', icon: 'code',
  skills: ['Design'], interests: ['Creativity'],
  goals: ['Freelance work', 'Get a job'],
  difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'Medium',
  steps: ['Learn design tools', 'Create portfolio', 'Work with clients']
},
{
  name: 'Content Writer', icon: 'chart',
  skills: ['Writing'], interests: ['Blogging', 'Storytelling'],
  goals: ['Freelance work'],
  difficulty: 'low', timeToGoal: '2-4 months', marketDemand: 'High',
  steps: ['Start writing blogs', 'Build portfolio', 'Get freelance gigs']
},
{
  name: 'Video Editor', icon: 'code',
  skills: ['Editing'], interests: ['Content creation'],
  goals: ['Freelance work', 'YouTube'],
  difficulty: 'low', timeToGoal: '3-5 months', marketDemand: 'High',
  steps: ['Learn editing tools', 'Edit sample videos', 'Work with creators']
},
{
  name: 'Financial Analyst', icon: 'chart',
  skills: ['Excel', 'Analytics'], interests: ['Finance'],
  goals: ['Get a job'],
  difficulty: 'medium', timeToGoal: '5-8 months', marketDemand: 'High',
  steps: ['Learn financial modeling', 'Analyze reports', 'Apply to firms']
},
{
  name: 'Investment Banker', icon: 'trophy',
  skills: ['Finance', 'Communication'], interests: ['Finance'],
  goals: ['Get a job'],
  difficulty: 'high', timeToGoal: '10-12 months', marketDemand: 'Medium',
  steps: ['Study finance concepts', 'Prepare for interviews', 'Join firms']
},
{
  name: 'Teacher / Educator', icon: 'code',
  skills: ['Communication'], interests: ['Teaching'],
  goals: ['Get a job'],
  difficulty: 'low', timeToGoal: '3-6 months', marketDemand: 'High',
  steps: ['Develop subject knowledge', 'Practice teaching', 'Join institutions']
},
{
  name: 'Career Counselor', icon: 'chart',
  skills: ['Communication'], interests: ['Helping others'],
  goals: ['Freelance work'],
  difficulty: 'medium', timeToGoal: '5-7 months', marketDemand: 'Medium',
  steps: ['Learn counseling skills', 'Work with students', 'Build trust']
},
{
  name: 'Social Media Manager', icon: 'trophy',
  skills: ['Communication'], interests: ['Social media'],
  goals: ['Freelance work', 'Get a job'],
  difficulty: 'low', timeToGoal: '2-4 months', marketDemand: 'Very High',
  steps: ['Learn content strategy', 'Manage accounts', 'Grow brands']
},
{
  name: 'Influencer / Content Creator', icon: 'code',
  skills: ['Communication'], interests: ['Content creation'],
  goals: ['Build personal brand'],
  difficulty: 'medium', timeToGoal: '6-12 months', marketDemand: 'Growing',
  steps: ['Choose niche', 'Post consistently', 'Grow audience']
},
{
  name: 'Freelancer (Multi-skill)', icon: 'chart',
  skills: ['Communication'], interests: ['Independence'],
  goals: ['Freelance work'],
  difficulty: 'medium', timeToGoal: '4-8 months', marketDemand: 'High',
  steps: ['Learn a skill', 'Build portfolio', 'Get clients']
}
];

const ICONS = {
  chart: '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="18" width="6" height="14" rx="1.5" fill="white" opacity="0.9"/><rect x="16" y="10" width="6" height="22" rx="1.5" fill="white" opacity="0.9"/><rect x="27" y="5" width="6" height="27" rx="1.5" fill="white" opacity="0.9"/></svg>',
  trophy: '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 24C14.03 24 10 19.97 10 15V8H28V15C28 19.97 23.97 24 19 24Z" fill="white" opacity="0.9"/><path d="M10 10H6C6 10 6 17 10 17" stroke="white" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><path d="M28 10H32C32 10 32 17 28 17" stroke="white" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/><rect x="15" y="24" width="8" height="4" rx="1" fill="white" opacity="0.7"/><rect x="12" y="28" width="14" height="2.5" rx="1.2" fill="white" opacity="0.6"/></svg>',
  code: '<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="30" height="22" rx="3" stroke="white" stroke-width="1.8" opacity="0.9"/><line x1="4" y1="14" x2="34" y2="14" stroke="white" stroke-width="1.4" opacity="0.5"/><circle cx="8.5" cy="11" r="1.2" fill="white" opacity="0.5"/><circle cx="12.5" cy="11" r="1.2" fill="white" opacity="0.5"/><circle cx="16.5" cy="11" r="1.2" fill="white" opacity="0.5"/><path d="M10 20L14 23L10 26" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/><line x1="16" y1="26" x2="27" y2="26" stroke="white" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/></svg>'
};

// ── Scoring
function scorePath(path, user) {
  let score = 0;
  path.skills.forEach(s => { if (user.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())) score += 2; });
  path.interests.forEach(i => { if (user.interests.includes(i)) score += 2; });
  path.goals.forEach(g => { if (user.goals.includes(g)) score += 1; });
  if (user.level === 'beginner'     && path.difficulty === 'high') score -= 2;
  if (user.level === 'advanced'     && path.difficulty === 'low')  score -= 1;
  if (user.level === 'intermediate' && path.difficulty === 'high') score -= 1;
  return score;
}

// ── Generate & render path cards
let generatedResults = [];

function handleGenerate() {
  const user = getUserData();
  generatedResults = careerPaths
    .map(path => ({ ...path, score: scorePath(path, user) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  renderPathCards();
  goTo('profilePage', 'pathPage');
}

function renderPathCards() {
  const grid = document.querySelector('.path-grid');
  if (!grid) return;
  const labels = ['Path A', 'Path B', 'Path C'];
  grid.innerHTML = generatedResults.map((path, i) => `
    <div class="path-card" onclick="selectPath(${i})">
      <div class="path-card-header">${labels[i]} - ${path.name}</div>
      <div class="path-card-icon">${ICONS[path.icon] || ICONS.code}</div>
      <div class="path-card-lines">
        <div class="path-line long"></div>
        <div class="path-line med"></div>
        <div class="path-line short"></div>
      </div>
      <button class="view-btn">View Details</button>
    </div>
  `).join('');
}

// ── Select path → outcome page
let selectedPath = null;

function selectPath(index) {
  selectedPath = generatedResults[index];
  generateOutcome();
  goTo('pathPage', 'outcomePage');
}

function generateOutcome() {
  const user = getUserData();
  const path = selectedPath;
  const matchSkills = path.skills.filter(s =>
    user.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())
  ).length;
  const readiness  = Math.min(100, Math.floor((matchSkills / Math.max(path.skills.length, 1)) * 100));
  const skillLevel = readiness > 70 ? 'High' : readiness > 40 ? 'Medium' : 'Low';
  updateOutcomeUI(path, readiness, skillLevel);
}

function updateOutcomeUI(path, readiness, skillLevel) {
  // Timeline
  const timelineRows = document.querySelectorAll('.timeline-row');
  if (timelineRows[0]) timelineRows[0].innerHTML = '<span class="tl-dot green"></span>In 3 months : ' + path.steps[0];
  if (timelineRows[1]) timelineRows[1].innerHTML = '<span class="tl-dot yellow"></span>In 6 months : ' + path.steps[1];
  if (timelineRows[2]) timelineRows[2].innerHTML = '<span class="tl-dot blue"></span>In 12 months : ' + path.steps[2];

  // Skill gap bar
  const fill = document.querySelector('.skill-gap-fill');
  if (fill) fill.style.width = readiness + '%';

  // Skill level
  const miniVal = document.querySelector('.mini-value');
  if (miniVal) miniVal.innerHTML = skillLevel + (skillLevel === 'High' ? ' ✅' : ' <span class="warn-icon">⚠️</span>');

  // Potential outcome
  const potVal = document.querySelector('.potential-value');
  if (potVal) potVal.textContent = path.name + ' Professional';

  // Best path header
  const bestHeader = document.querySelector('.best-card-header');
  if (bestHeader) bestHeader.innerHTML = '<span class="star-icon">⭐</span> Best Path For You : ' + path.name;

  // Why this path
  const whyDots = document.querySelectorAll('.why-dot');
  const whyTexts = [
    'Aligns with your current skill set',
    'Matches your stated goals',
    path.marketDemand + ' market demand - ' + path.timeToGoal
  ];
  whyDots.forEach((el, i) => { if (whyTexts[i]) el.textContent = whyTexts[i]; });

  // Action plan
  const actionDots = document.querySelectorAll('.action-dot');
  path.steps.forEach((step, i) => {
    if (actionDots[i]) actionDots[i].innerHTML = '<span class="action-num">' + (i+1) + '</span>' + step;
  });
}