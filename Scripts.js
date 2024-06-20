const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach((item) => item.addEventListener('click', activeLink));

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((navLink) => navLink.classList.remove('active'));
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
                console.log(`Active section: ${section.id}`);
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);




// loding video before website and making animations work after video
document.getElementById('intro-video').addEventListener('ended', function () {
    document.getElementById('video-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    // Initialize animations after showing main content
    new WOW().init();

    // Intersection Observer to trigger animations when sections become visible
    const sections = document.querySelectorAll('.wow');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll to top of home section on page load
    window.scrollTo(0, document.getElementById('main-content').offsetTop);
});