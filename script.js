// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        const colors = ['255,45,149', '0,212,255', '177,77,255', '57,255,20'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
    '.about-card, .achievement-item, .testimonial-card, .venue-card, .rider-item, .booking-card'
);
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
// Add revealed class styles
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== RANDOM FUNNY PAGE TITLES =====
const titles = [
    "DJ DEEPFACE — Loading Greatness...",
    "DJ DEEPFACE — Your Ears Are Not Ready",
    "DJ DEEPFACE — Buffering the Bass...",
    "DJ DEEPFACE — 212 Followers Can't Be Wrong",
    "DJ DEEPFACE — Now With 30% More Face",
    "DJ DEEPFACE — Please Hire Him",
    "DJ DEEPFACE — Mom Said He's Talented",
    "DJ DEEPFACE — Accept No Substitutes",
    "DJ DEEPFACE — The Website He Didn't Ask For",
    "DJ DEEPFACE — Still Better Than Your Spotify Playlist",
];
let titleIndex = 0;
setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    document.title = titles[titleIndex];
}, 4000);

// ===== CONSOLE EASTER EGG =====
console.log('%c🎧 DJ DEEPFACE 🎧', 'font-size:40px; font-weight:bold; color:#ff2d95; text-shadow: 2px 2px #b14dff;');
console.log('%cYou found the secret console!', 'font-size:16px; color:#00d4ff;');
console.log('%cFun fact: DEEPFACE once dropped a beat so hard, the WiFi router restarted.', 'font-size:12px; color:#39ff14;');
console.log('%cAnother fact: He has more USB sticks than friends. And that\'s okay.', 'font-size:12px; color:#b14dff;');

// ===== CURSOR TRAIL (subtle neon dots) =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
            width: 6px; height: 6px; border-radius: 50%;
            background: ${['#ff2d95','#00d4ff','#b14dff','#39ff14'][Math.floor(Math.random()*4)]};
            pointer-events: none; z-index: 9999;
            transition: all 0.8s ease;
        `;
        document.body.appendChild(dot);
        requestAnimationFrame(() => {
            dot.style.opacity = '0';
            dot.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px) scale(0)`;
        });
        setTimeout(() => dot.remove(), 800);
    }
});

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            activateDeepfaceMode();
        }
    } else {
        konamiIndex = 0;
    }
});

function activateDeepfaceMode() {
    document.body.style.animation = 'rainbow 0.5s linear infinite';
    const s = document.createElement('style');
    s.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(s);

    const msg = document.createElement('div');
    msg.innerHTML = '🎧 DEEPFACE MODE ACTIVATED 🎧<br>YOUR SCREEN IS NOW 420% DEEPER';
    msg.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
        font-family: 'Orbitron', monospace; font-size: 2rem; font-weight: 900;
        color: #fff; text-align: center; z-index: 99999;
        text-shadow: 0 0 30px #ff2d95, 0 0 60px #b14dff;
        animation: fadeUp 0.5s ease;
        pointer-events: none;
    `;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.remove();
        document.body.style.animation = '';
    }, 3000);
}

// ===== CLICK COUNTER ON PHOTO =====
let clickCount = 0;
const photoEl = document.getElementById('djPhoto');
const clickMessages = [
    "Yes, that's really him.",
    "Stop clicking, he's shy.",
    "He charges per click, you know.",
    "You've now clicked more than his monthly streams.",
    "This counts as a fan interaction. Screenshot it.",
    "OK you're obsessed.",
    "He's filing a restraining order.",
    "Just follow him on Instagram already.",
    "STOP. THE FACE. IS DEEP ENOUGH.",
    "🎧🎧🎧 MAXIMUM DEEPFACE REACHED 🎧🎧🎧",
];
if (photoEl) {
    photoEl.style.cursor = 'pointer';
    photoEl.addEventListener('click', () => {
        if (clickCount < clickMessages.length) {
            const toast = document.createElement('div');
            toast.textContent = clickMessages[clickCount];
            toast.style.cssText = `
                position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                background: linear-gradient(135deg, #ff2d95, #b14dff);
                color: #fff; padding: 14px 28px; border-radius: 50px;
                font-family: 'Inter', sans-serif; font-size: .9rem; font-weight: 600;
                z-index: 9999; white-space: nowrap;
                box-shadow: 0 8px 30px rgba(255,45,149,.4);
                animation: toastIn .4s ease;
            `;
            const ts = document.createElement('style');
            ts.textContent = `
                @keyframes toastIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `;
            document.head.appendChild(ts);
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
            clickCount++;
        }
    });
}

// ===== FLYING DONKEYS =====
function spawnDonkey() {
    const donkey = document.createElement('img');
    donkey.src = 'donkey-isolated-transparent-background-donkey-transparent-background-360937628.webp';
    donkey.style.position = 'fixed';
    donkey.style.width = (Math.random() * 200 + 150) + 'px'; // 150px to 350px (Bigger donkeys)
    donkey.style.zIndex = '9999';
    donkey.style.pointerEvents = 'none';
    donkey.style.transition = 'transform 8s linear, opacity 8s linear';
    // Add neon glow to the donkey
    donkey.style.filter = `drop-shadow(0 0 20px ${['#ff2d95','#00d4ff','#b14dff','#39ff14'][Math.floor(Math.random()*4)]})`;
    
    const startY = Math.random() * window.innerHeight;
    const direction = Math.random() > 0.5 ? 1 : -1; // 1 for left-to-right, -1 for right-to-left
    const startX = direction === 1 ? -100 : window.innerWidth + 100;
    
    donkey.style.left = '0px';
    donkey.style.top = '0px';
    donkey.style.transform = `translate(${startX}px, ${startY}px) ${direction === -1 ? 'scaleX(-1)' : ''}`;
    
    document.body.appendChild(donkey);
    
    setTimeout(() => {
        const endY = startY + (Math.random() * 400 - 200);
        const endX = direction === 1 ? window.innerWidth + 100 : -100;
        const rotation = (Math.random() * 720 - 360);
        donkey.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotation}deg) ${direction === -1 ? 'scaleX(-1)' : ''}`;
    }, 50);
    
    setTimeout(() => {
        donkey.remove();
    }, 8050);
}

setInterval(spawnDonkey, 2500);

