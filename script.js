/* =========================================
   BISHAL BHATTA PORTFOLIO
   JavaScript
========================================= */


/* ================= ELEMENTS ================= */

const body = document.body;

const header = document.getElementById("header");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

const themeToggle = document.getElementById("themeToggle");

const backTop = document.getElementById("backTop");

const typingText = document.getElementById("typingText");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const year = document.getElementById("year");


/* ================= CURRENT YEAR ================= */

year.textContent = new Date().getFullYear();


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ================= DARK MODE ================= */

const savedTheme = localStorage.getItem("bishal-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    localStorage.setItem(
        "bishal-theme",
        isDark ? "dark" : "light"
    );

    themeToggle.innerHTML = isDark

        ? '<i class="fas fa-sun"></i>'

        : '<i class="fas fa-moon"></i>';

});


/* ================= HEADER SCROLL ================= */

function handleHeader() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeader);


/* ================= TYPING EFFECT ================= */

const roles = [

    "BSc CSIT Student",

    "Web Developer",

    "Programmer",

    "Tech Enthusiast"

];

let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) % roles.length;
        }
    }

    const speed = deleting ? 45 : 90;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* ================= REVEAL ON SCROLL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= SKILL BARS ================= */

const skillSection =
    document.querySelector(".skills-section");

const progressBars =
    document.querySelectorAll(".progress-bar");

let skillsAnimated = false;


const skillObserver =
    new IntersectionObserver(

        entries => {

            if (
                entries[0].isIntersecting &&
                !skillsAnimated
            ) {

                progressBars.forEach(bar => {

                    const width =
                        bar.getAttribute("data-width");

                    bar.style.width = width;

                });

                skillsAnimated = true;
            }

        },

        {
            threshold: 0.25
        }

    );


skillObserver.observe(skillSection);


/* ================= COUNTER ================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 60));

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = current;

            }, 25);

    });

}


const statsSection =
    document.querySelector(".stats-section");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                animateCounters();

            }

        },

        {
            threshold: 0.3
        }

    );


statsObserver.observe(statsSection);


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= CONTACT FORM ================= */

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        !name ||
        !email ||
        !subject ||
        !message
    ) {

        formMessage.style.color = "#ef4444";

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    formMessage.style.color = "#22c55e";

    formMessage.textContent =
        `Thanks ${name}! Your message has been received.`;


    contactForm.reset();

});


/* ================= PROJECT HOVER EFFECT ================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y - rect.height / 2) /
                rect.height) * -4;

        const rotateY =
            ((x - rect.width / 2) /
                rect.width) * 4;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%cWelcome to Bishal Bhatta's Portfolio!",
    "color:#6366f1;font-size:18px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "color:#8b5cf6;font-size:14px;"
);
