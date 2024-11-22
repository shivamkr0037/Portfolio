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
