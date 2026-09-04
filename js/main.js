// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
    document.querySelector(".menu-btn");

const hamburger =
    document.querySelector(".menu-btn_burger");

const nav =
    document.querySelector(".nav");

const menuNav =
    document.querySelector(".menu-nav");

const navItems =
    document.querySelectorAll(".menu-nav_item");

let showMenu = false;


// Open / close mobile menu
if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        toggleMenu
    );

}


function toggleMenu() {

    if (!showMenu) {

        if (hamburger) {
            hamburger.classList.add("open");
        }

        if (nav) {
            nav.classList.add("open");
        }

        if (menuNav) {
            menuNav.classList.add("open");
        }

        navItems.forEach(item => {
            item.classList.add("open");
        });

        showMenu = true;

    } else {

        closeMenu();

    }

}


// Close mobile menu
function closeMenu() {

    if (hamburger) {
        hamburger.classList.remove("open");
    }

    if (nav) {
        nav.classList.remove("open");
    }

    if (menuNav) {
        menuNav.classList.remove("open");
    }

    navItems.forEach(item => {
        item.classList.remove("open");
    });

    showMenu = false;

}


// Close mobile menu after clicking link
navItems.forEach(item => {

    item.addEventListener(
        "click",
        closeMenu
    );

});





// ==========================================
// DARK / LIGHT THEME
// ==========================================

const themeToggle =
    document.querySelector("#themeToggle");


// Check previously selected theme
const savedTheme =
    localStorage.getItem("portfolioTheme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}


// Theme button click
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );


    // Save selected theme
    if (
        document.body.classList.contains(
            "light-theme"
        )
    ) {

        localStorage.setItem(
            "portfolioTheme",
            "light"
        );

    } else {

        localStorage.setItem(
            "portfolioTheme",
            "dark"
        );

    }

}





// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".menu-nav_link");


window.addEventListener(
    "scroll",
    activeMenu
);


function activeMenu() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;


        if (
            window.scrollY >=
            sectionTop - 200
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.parentElement
            .classList
            .remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.parentElement
                .classList
                .add("active");

        }

    });

}





// ==========================================
// SKILLS CIRCLE ANIMATION
// ==========================================

const percentages = [

    80, // Programming Languages

    85, // Front-end Development

    80, // Mobile Development

    75, // Back-end Development

    80, // Database & Cloud

    85  // Development Tools

];


const skillsSection =
    document.querySelector("#skills");

let skillsAnimated = false;


window.addEventListener(
    "scroll",
    checkSkills
);


function checkSkills() {

    if (!skillsSection) {
        return;
    }


    if (skillsAnimated) {
        return;
    }


    const skillsPosition =
        skillsSection
            .getBoundingClientRect()
            .top;


    const screenPosition =
        window.innerHeight - 100;


    if (
        skillsPosition <
        screenPosition
    ) {

        animateSkills();

        skillsAnimated = true;

    }

}


function animateSkills() {

    percentages.forEach(
        (percent, index) => {


            const valueSpan =
                document.querySelector(
                    `#value${index + 1}`
                );


            const circle =
                document.querySelector(
                    `#circle${index + 1}`
                );


            if (
                !valueSpan ||
                !circle
            ) {

                return;

            }


            let currentPercent = 0;


            // Reset percentage
            valueSpan.textContent = "0";


            // Reset circle
            circle.style.strokeDasharray =
                "440";

            circle.style.strokeDashoffset =
                "440";


            // Small delay for each circle
            setTimeout(() => {


                const interval =
                    setInterval(() => {


                        currentPercent++;


                        // Show percentage number
                        valueSpan.textContent =
                            currentPercent;


                        // Circle calculation
                        const circleLength =
                            440;


                        const offset =
                            circleLength -
                            (
                                circleLength *
                                currentPercent /
                                100
                            );


                        circle.style.strokeDashoffset =
                            offset;


                        // Stop animation
                        if (
                            currentPercent >=
                            percent
                        ) {

                            clearInterval(
                                interval
                            );

                        }


                    }, 20);


            }, index * 150);


        }
    );

}





// ==========================================
// PORTFOLIO FADE-IN ANIMATION
// ==========================================

const portfolioItems =
    document.querySelectorAll(
        ".portfolio_item"
    );


window.addEventListener(
    "scroll",
    showPortfolio
);


function showPortfolio() {

    portfolioItems.forEach(item => {


        const itemPosition =
            item
                .getBoundingClientRect()
                .top;


        const screenPosition =
            window.innerHeight - 100;


        if (
            itemPosition <
            screenPosition
        ) {

            item.classList.add(
                "show-overlay"
            );

        }

    });

}





// ==========================================
// DEVELOPER NETWORK BACKGROUND
// ==========================================

const networkCanvas =
    document.querySelector(
        "#developerNetwork"
    );


if (networkCanvas) {

    const ctx =
        networkCanvas.getContext("2d");


    let networkWidth = 0;

    let networkHeight = 0;

    let particles = [];

    let particleCount = 65;


    // Distance between connected nodes
    const connectionDistance = 140;



    // ======================================
    // NETWORK PARTICLE
    // ======================================

    class NetworkParticle {

        constructor() {

            this.x =
                Math.random() *
                networkWidth;


            this.y =
                Math.random() *
                networkHeight;


            this.size =
                Math.random() * 2 + 1;


            this.speedX =
                Math.random() * 0.6 -
                0.3;


            this.speedY =
                Math.random() * 0.6 -
                0.3;


            // Some nodes glow more
            this.glow =
                Math.random() > 0.88;

        }



        // Move particle
        update() {

            this.x +=
                this.speedX;


            this.y +=
                this.speedY;


            // Bounce from left/right
            if (
                this.x <= 0 ||
                this.x >= networkWidth
            ) {

                this.speedX *= -1;

            }


            // Bounce from top/bottom
            if (
                this.y <= 0 ||
                this.y >= networkHeight
            ) {

                this.speedY *= -1;

            }

        }



        // Draw particle
        draw() {

            const lightMode =
                document.body
                    .classList
                    .contains(
                        "light-theme"
                    );


            // Glow behind some nodes
            if (this.glow) {

                ctx.beginPath();


                ctx.arc(
                    this.x,
                    this.y,
                    this.size + 5,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    lightMode
                        ? "rgba(255, 101, 47, 0.18)"
                        : "rgba(255, 101, 47, 0.30)";


                ctx.fill();

            }


            // Main orange node
            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.glow
                    ? this.size + 1
                    : this.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                lightMode
                    ? "rgba(255, 101, 47, 0.80)"
                    : "rgba(255, 101, 47, 0.95)";


            ctx.fill();

        }

    }





    // ======================================
    // CREATE NETWORK PARTICLES
    // ======================================

    function createParticles() {

        particles = [];


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new NetworkParticle()
            );

        }

    }





    // ======================================
    // RESIZE NETWORK
    // ======================================

    function resizeNetwork() {

        const homeSection =
            document.querySelector(".home");


        if (!homeSection) {
            return;
        }


        networkWidth =
            homeSection.offsetWidth;


        networkHeight =
            homeSection.offsetHeight;


        networkCanvas.width =
            networkWidth;


        networkCanvas.height =
            networkHeight;


        // Number of nodes depending
        // on screen size

        if (
            window.innerWidth <
            540
        ) {

            particleCount = 30;

        }

        else if (
            window.innerWidth <
            960
        ) {

            particleCount = 45;

        }

        else {

            particleCount = 65;

        }


        createParticles();

    }





    // ======================================
    // CONNECT NETWORK PARTICLES
    // ======================================

    function connectParticles() {

        const lightMode =
            document.body
                .classList
                .contains(
                    "light-theme"
                );


        for (
            let a = 0;
            a < particles.length;
            a++
        ) {


            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {


                const dx =
                    particles[a].x -
                    particles[b].x;


                const dy =
                    particles[a].y -
                    particles[b].y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    connectionDistance
                ) {


                    const opacity =
                        1 -
                        distance /
                        connectionDistance;


                    ctx.beginPath();


                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );


                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );


                    if (lightMode) {

                        ctx.strokeStyle =
                            `rgba(
                                255,
                                101,
                                47,
                                ${opacity * 0.32}
                            )`;

                    } else {

                        ctx.strokeStyle =
                            `rgba(
                                255,
                                101,
                                47,
                                ${opacity * 0.55}
                            )`;

                    }


                    ctx.lineWidth =
                        1;


                    ctx.stroke();

                }

            }

        }

    }





    // ======================================
    // NETWORK ANIMATION
    // ======================================

    function animateNetwork() {

        ctx.clearRect(
            0,
            0,
            networkWidth,
            networkHeight
        );


        // Draw connecting lines first
        connectParticles();


        // Then draw nodes
        particles.forEach(
            particle => {

                particle.update();

                particle.draw();

            }
        );


        requestAnimationFrame(
            animateNetwork
        );

    }





    // ======================================
    // START NETWORK
    // ======================================

    resizeNetwork();


    animateNetwork();


    window.addEventListener(
        "resize",
        resizeNetwork
    );

}





// ==========================================
// CLOSE MOBILE MENU WHEN WINDOW IS RESIZED
// ==========================================

window.addEventListener(
    "resize",
    function () {


        if (
            window.innerWidth > 960 &&
            showMenu
        ) {

            closeMenu();

        }


    }
);





// ==========================================
// RUN WHEN PAGE FIRST LOADS
// ==========================================

checkSkills();

showPortfolio();

activeMenu();