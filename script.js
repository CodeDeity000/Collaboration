// Scroll to top on page load/refresh for index and testimonials pages
(function() {
  // Disable browser's automatic scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Get current page name
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Check if we're on index.html or testimonials.html
  if (currentPage === 'index.html' || currentPage === 'testimonials.html' || currentPage === '') {
    // Detect if this is a page refresh/reload
    const isPageRefresh = performance.navigation && performance.navigation.type === 1 || 
                         (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type === 'reload');
    
    // On refresh, remove hash from URL to prevent browser from scrolling to anchor
    if (isPageRefresh && window.location.hash) {
      // Replace the URL without the hash, without triggering scroll
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Force scroll to top immediately (runs as soon as script loads)
    (function scrollToTop() {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    })();
    
    // Also scroll to top on DOMContentLoaded (before images load)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      });
    } else {
      // DOM already loaded, scroll immediately
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
    
    // Also scroll to top after page is fully loaded (handles late scrolling)
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 0);
    }, { once: true });
  }
})();

// Basic smooth scroll for same-page anchors
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href');
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// No form backend: prevent default submit and show a basic notice
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thanks! Your information has been recorded locally. Configure email or backend to receive submissions.');
  });
}

// Theme toggle functionality
(function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const html = document.documentElement;
  
  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });
  }
  
  function updateIcon(theme) {
    if (themeIcon) {
      // Show moon when light (to switch to dark), sun when dark (to switch to light)
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
})();

// Mobile menu toggle
(function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
})();

// Scroll-triggered floating appearing effect for sections
(function() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(function(section) {
    observer.observe(section);
  });
})();

// Quick Links Dropdown functionality
(function() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(function(dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    
    if (toggle && menu) {
      // Toggle on click
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        const isActive = dropdown.classList.contains('active');
        toggle.setAttribute('aria-expanded', isActive);
      });
      
      // Close when clicking on a link
      const links = menu.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          dropdown.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    dropdowns.forEach(function(dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
})();

// Testimonials data
const testimonialsData = [
  {
    "stars": "★★★★★",
    "text": "This opportunity has been truly life-changing for me. When I first heard about it, I was looking for ways to generate some additional income without taking on another full-time job. The setup process was remarkably straightforward—the team provided clear instructions and support throughout. I've been earning consistent monthly income for over a year now, and what I appreciate most is how reliable and transparent everything has been. The payments arrive on time every month, and I can track everything through their system. This has allowed me to save more, pay off some debts, and even plan for future investments. I would absolutely recommend this to anyone who's looking for a legitimate passive income opportunity that doesn't require constant attention or technical expertise.",
    "name": "James M.",
    "role": "Partner since 2024 · United States"
  },
  {
    "stars": "★★★★★",
    "text": "I have to admit, I was quite skeptical at first. I'd seen many online opportunities that turned out to be scams or required too much work to be worth it. But after doing some research and reading about the technical setup, I decided to give this a try. To my pleasant surprise, the passive income is absolutely real and consistent. My laptop runs quietly in the background most of the time, barely noticeable, and I receive payments reliably every month. The initial setup took just a few hours, and since then it's been completely hands-off. Now, months later, I barely think about it except when I check my account and see the regular payments coming in. It's been a game-changer for my financial situation, providing a steady stream of additional income that I can rely on. For anyone who wants to earn passive income but doesn't want to deal with the technical complexity or constant monitoring, this is exactly what you're looking for. It's legitimate, reliable, and truly passive.",
    "name": "Simon K.",
    "role": "Partner since 2025 · Philippines"
  },
  {
    "stars": "★★★★★",
    "text": "As a software engineer, I was pretty skeptical at first, honestly. But I'd heard some folks I know were working on similar contracts and making some decent passive income. So I reached out to the team to chat about it, and honestly, it seemed like a solid opportunity to level up my skills and expand my network. Fast forward to now—I've got a couple of full-time gigs, but I'm still sharing my Upwork account with them and pulling in that passive income. Don't get me wrong, it's not life-changing money for me, but it's a nice bonus. What keeps me in the partnership though is the experience and connections I'm building. The network I've grown through this has been pretty awesome. If you're looking to boost both your income and your professional network at the same time, this is definitely worth checking out. It's a pretty sweet deal when you think about it—you're getting paid while you're building relationships and gaining experience.",
    "name": "Darren M.",
    "role": "Partner since 2024 · Canada"
  },
  {
    "stars": "★★★★★",
    "text": "So I've been doing this for about six months now and honestly, it's been amazing. The setup was super straightforward, just followed their docs and had everything up and running within a week. The more friends I invited here, the higher my income became. The team is super responsive whenever I have questions, which is really nice. Really happy with how simple they made everything. It's exactly what I was looking for.",
    "name": "Sarah L.",
    "role": "Partner since 2024 · United Kingdom"
  },
  {
    "stars": "★★★★★",
    "text": "Okay, so I was pretty skeptical at first—you know how it goes with online opportunities. But after doing my homework and chatting with some people who were already in, I decided to give it a shot. Best call I've made. The whole process is super transparent, and the team is really on top of things. What I love is how flexible it is—doesn't mess with my day job at all. Everything runs smoothly, and honestly, the whole thing has been way better than I expected. If you're on the fence, definitely worth checking out.",
    "name": "Michael R.",
    "role": "Partner since 2024 · Australia"
  },
  {
    "stars": "★★★★★",
    "text": "This has been way better than expected, honestly. I was a bit concerned about security and privacy at first, but the team was super helpful and answered all my questions. Setup took maybe a couple of days, and then I was all set. The income stream is consistent and predictable, which makes planning way easier. Everything is really well organized—from the initial setup to the day-to-day, it just works. The process is smooth and they handle everything professionally. Really glad I found this.",
    "name": "Emma W.",
    "role": "Partner since 2024 · Germany"
  },
  {
    "stars": "★★★★★",
    "text": "Working from home, this was a perfect fit. I already had the space and solid internet, so it made total sense to put it to work. The extra income has been great for upgrading my setup and getting better gear for my own projects. The coolest thing is how simple they made it—literally just let the laptop run and it handles everything. The team is always responsive when I need anything, and they're quick to help out. Honestly, this is the easiest passive income thing I've tried. Super straightforward.",
    "name": "David T.",
    "role": "Partner since 2025 · United States"
  },
  {
    "stars": "★★★★★",
    "text": "I was looking to diversify my income and this showed up at the perfect time. What really stood out was how transparent and professional everything is. From the initial application process to now, they've been super clear about everything and kept it simple. The income stream is consistent, which has been great for paying down some debt. Setup was really easy—just followed their instructions and haven't had any issues since. If you're looking for a legit way to earn passive income without all the usual headaches, this is definitely worth a look.",
    "name": "Lisa P.",
    "role": "Partner since 2024 · Canada"
  },
  {
    "stars": "★★★★★",
    "text": "This has been a solid addition to my income. As a retiree, I wanted something truly passive that didn't need much maintenance, and this fits the bill perfectly. It's super simple to manage, requires almost no oversight, and everything runs reliably. The team is great—they keep me updated and are always quick to answer questions. I've actually recommended this to a few friends who are now doing it too. Really happy with how it's working out and planning to stick with it long-term.",
    "name": "Robert K.",
    "role": "Partner since 2024 · United States"
  }
];

// Load and render testimonials
(function() {
  function renderTestimonial(testimonial) {
    return `
      <div class="testimonial">
        <div class="testimonial-content">
          <div class="testimonial-stars">${testimonial.stars}</div>
          <p class="testimonial-text">"${testimonial.text}"</p>
        </div>
        <div class="testimonial-author">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
          </div>
        </div>
      </div>
    `;
  }
  
  function loadTestimonials() {
    // Load testimonials for index.html (first 3 only)
    const indexContainer = document.getElementById('testimonials-container');
    if (indexContainer && testimonialsData && testimonialsData.length > 0) {
      const firstThree = testimonialsData.slice(0, 3);
      indexContainer.innerHTML = firstThree.map(renderTestimonial).join('');
    }
    
    // Load all testimonials for testimonials.html
    const testimonialsContainer = document.getElementById('testimonials-full-container') || document.querySelector('.testimonials-grid-full');
    if (testimonialsContainer && testimonialsData && testimonialsData.length > 0) {
      testimonialsContainer.innerHTML = testimonialsData.map(renderTestimonial).join('');
    }
  }
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTestimonials);
  } else {
    // DOM already loaded
    loadTestimonials();
  }
})();


