const dice = document.getElementById("dice");
const adviceNum = document.getElementById("advice-number");
const adviceText = document.querySelector(".advice-text");

window.onload = () => {
    showQuote();
    createParticles();
    createHearts();
};

dice.addEventListener("click", showQuote);

// Add IIT-specific motivational quotes
const iitQuotes = [
    "Every problem solved brings you closer to IIT! Rooting for you always ❤️",
    "You're the smartest person I know, Anushka! You've got this! 💫",
    "Your dedication inspires me every single day! 🌟",
    "Physics, Chemistry, Maths - You're mastering them all beautifully! ✨",
    "Your JEE preparation journey makes me so proud! 💝",
    "Keep shining bright like you always do! 🌟",
    "Your determination is what makes you special! ❤️",
    "Watching you work so hard makes my heart smile! 💫",
    "You're not just preparing for IIT, you're preparing to conquer the world! 🌎",
    "Every minute of study brings you closer to your dreams, and I'm here for all of it! 💕"
];

// Modify showQuote function to sometimes show IIT-specific quotes
function showQuote() {
    if(Math.random() < 0.3) { // 30% chance to show IIT quote
        adviceNum.textContent = "JEE";
        adviceText.textContent = iitQuotes[Math.floor(Math.random() * iitQuotes.length)];
    } else {
        fetch("https://api.adviceslip.com/advice")
            .then(response => response.json())
            .then((data) => data.slip)
            .then((data) => {
                adviceNum.textContent = data.id;
                adviceText.textContent = data.advice;
            })
            .catch((error) => {
                console.error(`Error fetching advice: ${error}`); // Log error for debugging
                alert("Failed to retrieve advice. Please check your internet connection."); // User-friendly message
            });
    }
}

setInterval(() => {
    // Target date
    const targetDate = new Date(2024, 4, 5); // Month is 0-indexed, so 4 for May

    // Calculate time difference
    const now = new Date();
    const difference = targetDate - now;

    // Get time components in a user-friendly format
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Set time and labels (using correct IDs from the HTML)
    document.getElementById('days').innerHTML = days + ' Days';
    document.getElementById('hours').innerHTML = hours + ' Hours';
    document.getElementById('minutes').innerHTML = minutes + ' Minutes';
    document.getElementById('seconds').innerHTML = seconds + ' Seconds';

    // Update circular indicators and dots (using correct IDs from the HTML)
    const dd = document.getElementById('dd');
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    const dotD = document.querySelector('.h_dot');
    const dotH = document.querySelector('.h_dot:nth-child(2)');
    const dotM = document.querySelector('.m_dot');
    const dotS = document.querySelector('.s_dot');

    dd.style.strokeDashoffset = 440 - (440 * days) / 30; // Adjust for 30 days in a month
    hh.style.strokeDashoffset = 440 - (440 * hours) / 12;
    mm.style.strokeDashoffset = 440 - (440 * minutes) / 60;
    ss.style.strokeDashoffset = 440 - (440 * seconds) / 60;

    dotD.style.transform = `rotate(${days * 12}deg)`;
    dotH.style.transform = `rotate(${hours * 30}deg)`;
    dotM.style.transform = `rotate(${minutes * 6}deg)`;
    dotS.style.transform = `rotate(${seconds * 6}deg)`;
}, 1000);

// Add at the beginning of your script
function createParticles() {
    const container = document.querySelector('.container');
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2 and 6 pixels
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10 and 30 seconds
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite`;
        
        container.appendChild(particle);
    }
}

// Add this function
function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['❤️', '💖', '💕', '💝', '💗'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        document.querySelector('.container').appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 300);
}

// Add sweet periodic messages
const sweetMessages = [
    "Just wanted to remind you how special you are! 💝",
    "Taking a break? Know that I'm thinking of you! 💫",
    "Your smile brightens my world! 🌟",
    "You make every moment beautiful! ✨",
    "So proud to be part of your journey! 💖",
    "Your determination amazes me every day! 🌹",
    "Remember, I believe in you always! 💕",
    "You're the most wonderful person I know! 🦋",
    "Keep going, my amazing Anushka! ⭐",
    "Your success is my happiness! 🎀"
];

function showSweetMessage() {
    const message = document.createElement('div');
    message.className = 'sweet-message';
    message.textContent = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 500);
        }, 4000);
    }, 100);
}

// Show sweet message every 2 minutes
setInterval(showSweetMessage, 120000);

// Add special date celebrations
function checkSpecialDates() {
    const now = new Date();
    const specialDates = {
        // Add your special dates here
        '2024-01-01': 'New Year, New Milestones Together! 🎊',
        // Add more special dates
    };

    const dateString = now.toISOString().split('T')[0];
    if (specialDates[dateString]) {
        showSpecialMessage(specialDates[dateString]);
    }
}

function showSpecialMessage(message) {
    // Create a special celebration effect
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = message;
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 5000);
}

// Check for special dates every day
setInterval(checkSpecialDates, 86400000);
