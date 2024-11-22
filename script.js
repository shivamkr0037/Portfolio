/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


/*========== sticky navbar ==========*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


/*========== remove menu icon navbar when click navbar link (scroll) ==========*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};


/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});


/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


/*========== scroll reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
/*========== contact form==========*/
document.addEventListener('DOMContentLoaded', function() {
    // Define your Telegram Bot token and chat ID
    const BOT_TOKEN = '7102442559:AAExfnjxG8qHtv1sL4YiUHCGSxuLWdqd9wU';
    const CHAT_ID = '-1001353709350';

    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const emailAddress = document.getElementById('emailAddress').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        const emailSubject = document.getElementById('emailSubject').value;
        const message = document.getElementById('message').value;

        const missingFields = [];

        // Check each field and collect missing ones
        if (!fullName) {
            missingFields.push('Full Name');
        }
        if (!emailAddress) {
            missingFields.push('Email Address');
        }
        if (!mobileNumber) {
            missingFields.push('Mobile Number');
        }
        if (!emailSubject) {
            missingFields.push('Email Subject');
        }
        if (!message) {
            missingFields.push('Message');
        }

        // If there are missing fields, show alert with the list
        if (missingFields.length > 0) {
            const missingFieldsList = missingFields.join(', ');
            alert(`Please fill out the following fields: ${missingFieldsList}`);
            return;
        }

        const telegramMessage = `👨‍💻 New Message from akborana.tech:
            👨 Full Name: ${fullName}
            📩 Email Address: ${emailAddress}
            📞 Mobile Number: ${mobileNumber}
            💡 Email Subject: ${emailSubject}
            🎁 Message: ${message}`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        });
    });
});

// Add after the existing window.onload code
window.addEventListener('load', () => {
    // Special effects for Anushka's Timer link
    const specialLink = document.querySelector('.special-link');
    
    // Add sparkle effect on hover
    specialLink.addEventListener('mouseover', createSparkles);
    specialLink.addEventListener('mouseout', removeSparkles);
    
    // Add heartbeat effect when scrolling near the link
    window.addEventListener('scroll', () => {
        const rect = specialLink.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            specialLink.style.animation = 'heartbeat 1.5s infinite';
        } else {
            specialLink.style.animation = 'none';
        }
    });
});

// Sparkle effect function
function createSparkles(e) {
    const link = e.target;
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1000 + 'ms';
        sparkleContainer.appendChild(sparkle);
    }
    
    link.appendChild(sparkleContainer);
}

function removeSparkles(e) {
    const sparkleContainer = e.target.querySelector('.sparkle-container');
    if (sparkleContainer) {
        sparkleContainer.remove();
    }
}

// Add special date check for Anushka
function checkSpecialDates() {
    const specialDates = {
        // Add important dates here
        '2024-05-05': 'JEE Exam Day! You\'ve got this, Anushka! 💫',
        // Add more special dates as needed
    };

    const today = new Date().toISOString().split('T')[0];
    if (specialDates[today]) {
        showSpecialMessage(specialDates[today]);
    }
}

// Show special message with animation
function showSpecialMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'special-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <div class="message-hearts">❤️✨</div>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }, 100);
}

// Check for special dates periodically
setInterval(checkSpecialDates, 3600000); // Check every hour

// Add special hover effect for the timer link
document.querySelector('.special-link').addEventListener('mouseover', (e) => {
    const link = e.target;
    link.style.transform = 'scale(1.1)';
    link.style.textShadow = '0 0 10px rgba(255,105,180,0.5)';
    
    // Create floating hearts
    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + '%';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1500);
});

document.querySelector('.special-link').addEventListener('mouseout', (e) => {
    const link = e.target;
    link.style.transform = 'scale(1)';
    link.style.textShadow = 'none';
});
