/* ================= MOBILE MENU ================= */
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
        navMenu.classList.toggle("active");
    }
}

/* ================= LOADER ================= */
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-wrapper");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }
});

/* ================= TYPING EFFECT (TEXT BERJALAN) ================= */
const typingElement = document.getElementById("typing");
if (typingElement) {
    const words = ["Majdina Nublah Tamimi", "Java Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause sebelum hapus
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Loop array
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Mulai mengetik setelah delay sedikit
    setTimeout(typeEffect, 800);
}


/* ================= SCROLL EVENTS & PROGRESS ================= */
const header = document.querySelector(".header");
const scrollBar = document.querySelector(".scroll-progress");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    // Navbar Effect
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Progress Bar
    if (scrollBar) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = progress + "%";
    }

    // Active Link Highlight
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* ================= INTERSECTION OBSERVER (REVEAL ANIMATION) ================= */
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

/* ================= SMOOTH SCROLL & CLOSE MENU ================= */
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
        // Tutup menu mobile jika sedang terbuka
        const navMenu = document.getElementById("navMenu");
        if (navMenu) navMenu.classList.remove("active");
    });
});


/* ================= EMAILJS CONTACT FORM (REAL SENDING) ================= */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Cegah reload

        const btn = document.getElementById('submitBtn');
        const status = document.getElementById('formStatus');
        const originalText = btn.innerHTML;

        // Validasi Sederhana
        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;
        const msgVal = document.getElementById('message').value;

        if (!nameVal || !emailVal || !msgVal) {
            alert("Harap isi semua kolom!");
            return;
        }

        // Loading State
        btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled = true;

        // --- KONFIGURASI EMAILJS (SESUAI DATA KAMU) ---
        const serviceID = 'service_2jc5jm6';
        const templateID = 'template_sgjntn7';

        // Kirim Form
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // SUKSES
                btn.innerHTML = 'Sent! <i class="bx bx-check"></i>';
                btn.style.backgroundColor = '#28a745'; // Hijau
                
                // Tampilkan pesan sukses di bawah tombol
                if(status) {
                    status.innerHTML = `<div style="color: green; margin-top: 10px;">Terima kasih ${nameVal}, pesan berhasil terkirim!</div>`;
                }
                
                contactForm.reset();

                // Reset Tombol setelah 3 detik
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    if(status) status.innerHTML = "";
                }, 4000);

            }, (err) => {
                // GAGAL
                btn.innerHTML = 'Failed <i class="bx bx-x"></i>';
                btn.style.backgroundColor = '#dc3545'; // Merah
                console.log('FAILED...', err);
                
                if(status) {
                    status.innerHTML = `<div style="color: red; margin-top: 10px;">Gagal mengirim pesan. Cek koneksi internet.</div>`;
                }

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    if(status) status.innerHTML = "";
                }, 4000);
            });
    });

const audio = document.getElementById('mainAudio');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const spotifyIcon = document.querySelector('.spotify-logo-wrapper i');

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.className = 'bx bx-pause';
        spotifyIcon.classList.add('playing');
    } else {
        audio.pause();
        playIcon.className = 'bx bx-play';
        spotifyIcon.classList.remove('playing');
    }
}
}