const config = {
  valentineName: "Leticia",
  pageTitle: "Will You Be My Valentine? 💝",
  floatingEmojis: { hearts:['❤️','💖','💝','💗','💓'], bears:['🧸','🐻'] },
  questions: {
    first:{ text:"Do you like me?", yesBtn:"Yes", noBtn:"No", secretAnswer:"I don't like you, I love you! ❤️" },
    second:{ text:"How much do you love me?", startText:"This much!", nextBtn:"Next ❤️" },
    third:{ text:"Will you be my Valentine...?", yesBtn:"Yes!", noBtn:"No" }
  },
  loveMessages:{ extreme:"WOOOOW You love me that much?? 🥰🚀💝", high:"To infinity and beyond! 🚀💝", normal:"And beyond! 🥰" },
  celebration:{ title:"Yay! I'm the luckiest person...", message:"Cadeau : 1 week-end ici : https://www.staycation.co/fr/hotels/chateau-de-bourron-2523?coords=48.853495%2C2.348392", emojis:"🎁💖🤗💝💋❤️💕" },
  colors:{ backgroundStart:"#ffafbd", backgroundEnd:"#ffc3a0", buttonBackground:"#ff6b6b", buttonHover:"#ff8787", textColor:"#ff4757" },
  animations:{ floatDuration:"15s", floatDistance:"50px", bounceSpeed:"0.5s", heartExplosionSize:1.5 },
  music:{ enabled:true, autoplay:true, musicUrl:"https://rr2---sn-a5mlrnes.googlevideo.com/videoplayback?expire=1739557200&ei=H1XuZ4GEN5CAsfIP94KqmA0&ip=0.0.0.0&id=o-AB2_gZ8YV7Y3TL0v5hx8I4xr6lc_2b7dxQ7cUVIz6p7u&itag=251&source=youtube&requiressl=yes&rn=gH8fGqOHUHYg&rbuf=10000&vprv=1&svpuc=1&mime=audio/webm&rqh=1&gir=yes&clen=2245643&dur=154.060&lmt=1727906897&mt=1739535452&fvip=1&keepalive=yes&fexp=24007246,51273022&c=WEB&txp=4318224&n=G5ZkQmGk5TpJKf0&sparams=expire,ei,ip,id,itag,source,requiressl,rn,rbuf,vprv,svpuc,mime,rqh,gir,clen,dur,lmt&sig=ACtQSFxwRQIhAM4h5N1-q7zLrJ5aZxqEGLEZLI8PUVD3CsGgwLPIgpvyAiBZGJe9tKdJZLfFqjpB2R2qzLCWFhX7iL9t6cZGEMR2Mw%3D%3D&lsparams=rqh,svpuc&lsig=AGluJ3MwRAIhAKe5AULfMrN4pGGLDV7_lQwRpYZCuGKFv08vb_YBpqwjAh_cR8qRDsUFCKr4dswP7vIJKVvmOTAK0VPwf5SgOaD2", startText:"🎵 Play Music", stopText:"🔇 Stop Music", volume:0.5 }
}

// Apply titles
document.title = config.pageTitle
document.getElementById('page-title').textContent = config.pageTitle

// Start music immediately
const audio = document.getElementById('bg-music')
if(config.music.enabled){ 
  audio.src = config.music.musicUrl
  audio.volume = config.music.volume
  audio.loop = true
  if(config.music.autoplay){ audio.play().catch(()=>{}) }
}

// Floating emojis
function createFloating(){
  const root = document.getElementById('floating')
  const pool = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears]
  for(let i=0;i<22;i++){
    const el=document.createElement('div')
    el.className='float-emoji'
    el.textContent=pool[Math.floor(Math.random()*pool.length)]
    el.style.left = Math.random()*100+'%'
    el.style.fontSize = (18+Math.random()*36)+'px'
    el.style.animationDuration = (10+Math.random()*10)+'s'
    el.style.setProperty('--dx', (Math.random()*parseInt(config.animations.floatDistance)* (Math.random()<0.5?-1:1))+'px')
    root.appendChild(el)
  }
}
createFloating()

// Helper to show/hide
function show(id){ document.querySelectorAll('.question').forEach(s=>s.hidden=true); document.getElementById(id).hidden=false }

// Evasive buttons behavior
function makeEvasive(btn){
  btn.addEventListener('mouseenter', ()=>{
    const parent = document.querySelector('.card')
    const w = parent.clientWidth-90
    const h = parent.clientHeight-40
    btn.style.transform = `translate(${Math.random()*w - w/2}px, ${Math.random()*h - h/2}px)`
  })
  btn.addEventListener('mouseleave', ()=>{btn.style.transform='translate(0)'} )
}

// Move button only on click
function moveOnClick(btn, callback){
  let moved = false
  btn.onclick = function(e){
    e.preventDefault()
    if(!moved){
      moved = true
      const parent = document.querySelector('.card')
      const w = parent.clientWidth-90
      const h = parent.clientHeight-40
      const x = Math.random()*w - w/2
      const y = Math.random()*h - h/2
      btn.style.transform = `translate(${x}px, ${y}px)`
    } else {
      btn.style.transform = 'translate(0)'
      callback()
    }
  }
}

// Q1
show('q1')
const q1yes = document.getElementById('q1-yes')
const q1no = document.getElementById('q1-no')
moveOnClick(q1yes, ()=>{ 
  const s=document.getElementById('q1-secret')
  s.hidden=false
  setTimeout(()=>show('q2'),1200) 
})
makeEvasive(q1no)
q1no.addEventListener('mouseenter', ()=>{ q1no.textContent = "No, I LOOOOOVE U" })
q1no.addEventListener('mouseleave', ()=>{ q1no.textContent = "No" })
q1no.onclick = ()=> show('q2')

// Q2 love meter with slider
const slider = document.getElementById('love-slider')
const percentEl = document.getElementById('percent')
const loveMsg = document.getElementById('love-msg')
const q2next = document.getElementById('q2-next')

if(slider){
  slider.addEventListener('input', function(){
    const pct = parseInt(this.value)
    percentEl.textContent = pct+"%"
    
    if(pct > 5000) { loveMsg.textContent = config.loveMessages.extreme; loveMsg.hidden=false }
    else if(pct > 1000){ loveMsg.textContent = config.loveMessages.high; loveMsg.hidden=false }
    else if(pct > 100){ loveMsg.textContent = config.loveMessages.normal; loveMsg.hidden=false }
    else { loveMsg.hidden=true }
  })
}

q2next.onclick = ()=> show('q3')

// Q3
const q3yes = document.getElementById('q3-yes')
const q3no = document.getElementById('q3-no')
makeEvasive(q3no)
q3yes.onclick = ()=> celebrate()
q3no.onclick = ()=>{ const c = document.getElementById('q1-secret'); c.hidden=false; setTimeout(()=>celebrate(),900) }

// Celebration
const musicToggle = document.getElementById('music-toggle')
function celebrate(){
  show('celebrate')
  document.getElementById('cele-title').textContent = config.celebration.title
  document.getElementById('cele-msg').textContent = "Cadeau : 1 week-end ici :"
  const cele = document.getElementById('cele-emojis')
  cele.textContent = config.celebration.emojis
  explodeHearts(14)
  if(config.music.enabled && config.music.autoplay){ audio.play().catch(()=>{}) }
}
function explodeHearts(n){
  const root = document.querySelector('.card')
  for(let i=0;i<n;i++){
    const el = document.createElement('div')
    el.className='heart-explode'
    el.textContent = config.floatingEmojis.hearts[Math.floor(Math.random()*config.floatingEmojis.hearts.length)]
    el.style.left = (30 + Math.random()*60)+'%'
    el.style.top = (40 + Math.random()*20)+'%'
    el.style.fontSize = (18 + Math.random()*38)+'px'
    root.appendChild(el)
    setTimeout(()=>el.remove(),900)
  }
}

musicToggle.onclick = async ()=>{
  if(!config.music.enabled) return
  if(audio.paused){ await audio.play().catch(()=>{}); musicToggle.textContent = config.music.stopText } else { audio.pause(); musicToggle.textContent = config.music.startText }
}

// small polish: set button labels from config
q1yes.textContent = config.questions.first.yesBtn
q1no.textContent = config.questions.first.noBtn
q2next.textContent = config.questions.second.nextBtn
q3yes.textContent = config.questions.third.yesBtn
q3no.textContent = config.questions.third.noBtn
musicToggle.textContent = config.music.startText

// personalize title
const title = document.getElementById('page-title')
title.textContent = `${config.pageTitle.replace('Will You Be My Valentine? 💝','')} ${config.valentineName}`
