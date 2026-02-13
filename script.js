// ===========================
// GLOBAL VARIABLES
// ===========================

const questionScreen = document.getElementById('questionScreen');
const mainContent = document.getElementById('mainContent');
const noBtn = document.getElementById('noBtn');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
let noBtnClicks = 0;
let musicPlaying = false;

// ===========================
// MUSIC CONTROL FUNCTIONS
// ===========================

// Toggle music on/off when button is clicked
musicControl.addEventListener('click', function() {
    if (musicPlaying) {
        bgMusic.pause();
        musicControl.textContent = '🎵';
        musicControl.classList.remove('playing');
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicControl.textContent = '🎶';
        musicControl.classList.add('playing');
        musicPlaying = true;
    }
});

// Auto-play music after first user interaction
document.addEventListener('click', function autoPlayMusic() {
    if (!musicPlaying) {
        bgMusic.play();
        musicControl.textContent = '🎶';
        musicControl.classList.add('playing');
        musicPlaying = true;
    }
    document.removeEventListener('click', autoPlayMusic);
}, { once: true });

// ===========================
// QUESTION SCREEN FUNCTIONS
// ===========================

// Handle "Yes" button click
function answerYes() {
    questionScreen.classList.add('hidden');
    mainContent.style.display = 'block';
    createConfetti();
    
    // Start music if not already playing
    if (!musicPlaying) {
        bgMusic.play();
        musicControl.textContent = '🎶';
        musicControl.classList.add('playing');
        musicPlaying = true;
    }
}

// Handle "No" button click - make it playful!
function moveNoButton() {
    noBtnClicks++;
    
    // Array of funny messages
    const messages = [
        "Are you sure? 🥺",
        "Please? 💕",
        "Think again! 💖",
        "Really? 😢",
        "Come on! ❤️",
        "Just say yes! 💗"
    ];
    
    // Change button text
    if (noBtnClicks < messages.length) {
        noBtn.textContent = messages[noBtnClicks - 1];
    }
    
    // Make "Yes" button bigger and "No" button smaller
    const yesBtn = document.querySelector('.btn-yes');
    const currentYesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentYesSize + 2) + 'px';
    yesBtn.style.padding = '18px 45px';
    
    const currentNoSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    if (currentNoSize > 10) {
        noBtn.style.fontSize = (currentNoSize - 2) + 'px';
        noBtn.style.padding = '12px 30px';
    }
    
    // Move "No" button to a random position
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    
    noBtn.style.position = 'relative';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // After 6 clicks, automatically say yes (they tried!)
    if (noBtnClicks >= 6) {
        setTimeout(answerYes, 1000);
    }
}

// ===========================
// CONFETTI ANIMATION
// ===========================

function createConfetti() {
    const colors = ['#ff6b9d', '#c2185b', '#ff4081', '#ffc0cb', '#ffb6c1'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            // Create confetti element
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const duration = Math.random() * 3 + 2;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(100vh) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 30);
    }
}

// ===========================
// FLOATING HEARTS BACKGROUND
// ===========================

const floatingHeartsContainer = document.getElementById('floatingHearts');
const hearts = ['💕', '💖', '💗', '💝', '❤️'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    floatingHeartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create floating hearts continuously
setInterval(createFloatingHeart, 800);

// Create initial hearts on page load
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 300);
}