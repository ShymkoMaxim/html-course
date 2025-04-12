function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('visible');
}

// Debugging toggleMenu
console.log("Debugging toggleMenu...");
document.querySelector('.hamburger-icon')?.addEventListener('click', () => {
    console.log("Hamburger icon clicked.");
    toggleMenu();
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        console.log(`Anchor clicked: ${this.getAttribute('href')}`);
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            console.log(`Scrolling to: ${targetId}`);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Target element not found: ${targetId}`);
        }
    });
});

// Debugging smooth scrolling
console.log("Debugging smooth scrolling...");

function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Debugging filterProjects
console.log("Debugging filterProjects...");
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        console.log(`Filter button clicked: ${category}`);
        filterProjects(category);
    });
});

function openLightbox(imageSrc, altText) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';

    lightbox.appendChild(img);

    lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });

    document.body.appendChild(lightbox);
}

// Debugging openLightbox
console.log("Debugging openLightbox...");
document.querySelectorAll('#projects img').forEach(image => {
    image.addEventListener('click', () => {
        console.log(`Image clicked: ${image.src}`);
        openLightbox(image.src, image.alt);
    });
});

document.querySelectorAll('#contact input, #contact textarea').forEach(field => {
    field.addEventListener('input', function () {
        const errorSpan = this.nextElementSibling;
        if (!this.value.trim()) {
            errorSpan.textContent = `${this.name.charAt(0).toUpperCase() + this.name.slice(1)} is required.`;
        } else if (this.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            errorSpan.textContent = 'Please enter a valid email address.';
        } else {
            errorSpan.textContent = '';
        }
    });
});

// Debugging form validation
console.log("Debugging form validation...");
document.querySelector('#contact form')?.addEventListener('submit', function (e) {
    console.log("Form submitted.");
    const name = document.querySelector('#contact input[name="name"]');
    const email = document.querySelector('#contact input[name="email"]');
    const message = document.querySelector('#contact textarea[name="message"]');
    let isValid = true;

    [name, email, message].forEach(field => {
        const errorSpan = field.nextElementSibling;
        if (!field.value.trim()) {
            console.warn(`${field.name} is empty.`);
            errorSpan.textContent = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required.`;
            isValid = false;
        } else if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            console.warn(`Invalid email: ${field.value}`);
            errorSpan.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            errorSpan.textContent = '';
        }
    });

    if (!isValid) {
        console.log("Form validation failed.");
        e.preventDefault();
    } else {
        console.log("Form validation passed.");
    }
});

