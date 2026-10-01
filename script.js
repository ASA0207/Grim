const intro=document.querySelector('#intro'),enter=document.querySelector('#enter');
const bgm=document.querySelector('#bgm'),musicPlayer=document.querySelector('#musicPlayer'),musicToggle=document.querySelector('#musicToggle'),volume=document.querySelector('#volume'),volumeIcon=document.querySelector('#volumeIcon');
document.body.classList.add('lock');
bgm.volume=.28;

function updateMusicUI(){
  const playing=!bgm.paused;
  musicToggle.textContent=playing?'Ⅱ':'▶';
  musicToggle.setAttribute('aria-label',playing?'BGM 일시정지':'BGM 재생');
  musicPlayer.classList.toggle('paused',!playing);
  volumeIcon.textContent=bgm.volume===0?'×':'♪';
}

function startMusic(){
  const playPromise=bgm.play();
  if(playPromise!==undefined) playPromise.then(updateMusicUI).catch(()=>updateMusicUI());
}

function enterSite(){
  intro.classList.add('hide');
  document.body.classList.remove('lock');
  musicPlayer.classList.add('show');
  startMusic();
  setTimeout(()=>intro.remove(),1100);
}

enter.addEventListener('click',enterSite);
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.body.classList.contains('lock'))enterSite()});
musicToggle.addEventListener('click',()=>{bgm.paused?startMusic():bgm.pause();updateMusicUI()});
volume.addEventListener('input',()=>{bgm.volume=Number(volume.value);updateMusicUI()});
volumeIcon.addEventListener('click',()=>{if(bgm.volume>0){bgm.dataset.previousVolume=bgm.volume;bgm.volume=0;volume.value=0}else{const v=Number(bgm.dataset.previousVolume||.28);bgm.volume=v;volume.value=v}updateMusicUI()});
bgm.addEventListener('play',updateMusicUI);bgm.addEventListener('pause',updateMusicUI);

window.addEventListener('scroll',()=>document.querySelector('header').classList.toggle('scrolled',scrollY>30));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelector('.menu').onclick=()=>document.querySelector('header').classList.toggle('mobile');
document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('header').classList.remove('mobile'));
