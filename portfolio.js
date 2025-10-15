// scrollAnimation.js

// Select all elements with the fade-in class
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,  // trigger when 20% of the element is visible
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // trigger animation
    }
    
    
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const sandwich = document.querySelector('.sandwich-icon');
const navLinks = document.querySelector('.nav-links');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay')

sandwich.addEventListener('click', () => {
  overlay.classList.add('active');
  navLinks.classList.toggle('active');
  sandwich.classList.toggle('active')
});

closeBtn.addEventListener('click',() => {
  overlay.classList.remove('active');
  navLinks.classList.remove('active');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
  overlay.classList.remove('active');
  navLinks.classList.remove('active');
  }
});

document.addEventListener('click', (e) => {
if(navLinks.classList.contains('active')) {
  if(!navLinks.contains(e.target) && e.target !== sandwich) {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
  }
}
});

// Select the form and the success message
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact-form'); // using class selector
  const successMsg = document.getElementById('success-msg');

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚫 stops redirect
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successMsg.classList.add('show'); // ✅ show success message
        form.reset(); // clear fields

        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 5000);
      } else {
        alert("Oops! There was a problem sending your message.");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  });
});





const text = document.querySelector('.sliding-text');
const  box = text.parentElement;
let position = (box.offsetWidth - text.offsetWidth) / 2; // start just outside the box
const speed = 1.2; // pixels per frame

function animate() {
  position += speed; // move left
  if (position > box.offsetWidth) {
    position = -text.offsetWidth; // reset to start
  }
  text.style.left = position + 'px';
  requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', () => {
  const projectsWrapper = document.getElementById('dynamic-projects-wrapper');

  fetch(window.location.origin + '/projects')
    .then(res => res.json())
    .then(projects => {
     // projectsWrapper.innerHTML = ''; // Clear existing content
     console.log("Fetched projects:", projects);
      projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card', 'fade-in');

        card.innerHTML = `
          <div class="project-image">
            <img src="${project.imageUrl}" alt="${project.title}">
          </div>
          <h2 class="project-title">${project.title}</h2>
          <p class="project-desc">${project.description}</p>
          <a href="${project.link}" class="project-btn" target="_blank">View this project →</a>
        `;
        projectsWrapper.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading projects:', err));
});
