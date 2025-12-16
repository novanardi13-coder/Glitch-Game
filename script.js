const timeEl = document.getElementById('time');
const integrityEl = document.getElementById('integrity');
const target = document.getElementById('target');
const arena = document.getElementById('arena');
const title = document.getElementById('title');
const hint = document.getElementById('hint');
const stabilizeBtn = document.getElementById('stabilize');
const overlay = document.getElementById('overlay');
const result = document.getElementById('result');
const beep = document.getElementById('beep');

let time = 60;
let integrity = 100;
let difficulty = 1;
let alive = true;

function rand(min,max){ return Math.random()*(max-min)+min; }

function moveTarget() {
  const r = arena.getBoundingClientRect();
  const x = rand(8, r.width-56);
  const y = rand(8, r.height-56);
  target.style.left = x+'px';
  target.style.top = y+'px';
}

function tick() {
  if(!alive) return;
  time--; timeEl.textContent = time;
  integrity -= Math.ceil(difficulty * 1.2);
  integrity = Math.max(0, integrity);
  integrityEl.textContent = integrity;

  applyGlitch();

  if (time <= 0) win();
  if (integrity <= 0) lose();
}

function applyGlitch() {
  difficulty += .15;

  if (difficulty > 2) title.classList.add('glitch-text');
  if (difficulty > 3) arena.classList.add('shake');
  if (difficulty > 4 && Math.random()<.3) document.body.classList.toggle('invert');
  if (difficulty > 5 && Math.random()<.25) document.body.classList.toggle('blur');
  if (difficulty > 6) {
    target.style.transform = `translate(-50%,-50%) scale(${rand(.8,1.4)})`;
  }
  if (difficulty > 7 && Math.random()<.2) {
    stabilizeBtn.classList.remove('hidden');
    hint.textContent = 'SEKARANG!';
  }
}

function win(){
  alive=false;
  overlay.classList.remove('hidden');
  result.textContent = 'KAMU MENANG. Sistem distabilkan.';
}
function lose(){
  alive=false;
  overlay.classList.remove('hidden');
  result.textContent = 'SISTEM RUNTUH.';
}

// Interactions
target.addEventListener('click', ()=>{
  if(!alive) return;
  integrity = Math.min(100, integrity + 6);
  beep.currentTime = 0; beep.play().catch(()=>{});
  moveTarget();
});

stabilizeBtn.addEventListener('click', ()=>{
  difficulty = Math.max(1, difficulty - 2.5);
  stabilizeBtn.classList.add('hidden');
  hint.textContent = 'Stabil sementara…';
});

setInterval(tick, 1000);
moveTarget();