// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}
// Create Image

const imageData = {
    caption: 'Kissing Fish',
    alt: 'Kissing Fish',
    url: 'data:image/jpeg;base64,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' // Replace with your image URL/path
};

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;


    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    
    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';
        
        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    const imageElem = document.createElement('img'); imageElem.alt = imageData.alt; imageElem.src = imageData.url;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    // Create heart explosion effect
    createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
} 
