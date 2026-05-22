import { getPortfolioData, getLocalPortfolioDataSync, subscribeToPortfolioUpdates, sendContactMessage } from './db.js';
import { loadThemeAndAccent, initThemeSwitcher } from './theme.js';


let lastRenderedHash = '';

function renderPortfolio(data) {
  if (!data) return;
  const currentHash = JSON.stringify(data);
  if (currentHash === lastRenderedHash) {
    return;
  }
  lastRenderedHash = currentHash;

  // Dynamic Section & Navigation Link Visibility Toggles
  if (data.sections) {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes('#')) {
        const hashIdx = href.indexOf('#');
        const targetId = href.substring(hashIdx + 1);
        
        let secId = targetId;
        if (targetId === 'home') secId = 'hero';
        
        const secConfig = data.sections.find(s => s.id === secId);
        if (secConfig) {
          if (secConfig.visible === false) {
            link.classList.add('hidden');
          } else {
            link.classList.remove('hidden');
          }
        }
      }
    });

    const hireBtn = document.querySelector('.btn-hire');
    if (hireBtn) {
      const contactConfig = data.sections.find(s => s.id === 'contact');
      if (contactConfig && contactConfig.visible === false) {
        hireBtn.classList.add('hidden');
      } else {
        hireBtn.classList.remove('hidden');
      }
    }
  }

  // Dynamic Section Reordering (Landing Page only)
  const homeSection = document.getElementById('home');
  if (homeSection && data.sections) {
    const footer = document.querySelector('footer.footer') || document.querySelector('footer');
    const body = document.body;
    
    const sectionElementMap = {
      hero: document.getElementById('home'),
      stats: document.getElementById('stats-container'),
      about: document.getElementById('about'),
      education: document.getElementById('education'),
      skills: document.getElementById('skills'),
      projects: document.getElementById('projects'),
      experience: document.getElementById('experience'),
      certificates: document.getElementById('certificates'),
      badges: document.getElementById('badges'),
      extracurricular: document.getElementById('extracurricular'),
      contact: document.getElementById('contact')
    };

    data.sections.forEach(sec => {
      const el = sectionElementMap[sec.id];
      if (el) {
        // Toggle section visibility
        if (sec.visible === false) {
          el.classList.add('hidden');
        } else {
          el.classList.remove('hidden');
        }
        // Reorder in DOM
        if (footer) {
          body.insertBefore(el, footer);
        }
      }
    });
  }

  // 1. Hero Section
  if (document.getElementById('hero-greeting')) {
    const hero = data.hero;
    document.getElementById('hero-greeting').textContent = hero.greeting;
    document.getElementById('hero-name').innerHTML = hero.name.replace(/\n/g, '<br>');
    document.getElementById('hero-bio').textContent = hero.bio;
    
    const cvLink = document.getElementById('hero-cv-link');
    if (cvLink) cvLink.href = hero.cvLink;
    
    const codolio = document.getElementById('hero-codolio-link');
    if (codolio) codolio.href = hero.codolioLink;
    
    const linkedin = document.getElementById('hero-linkedin-link');
    if (linkedin) linkedin.href = hero.linkedinLink;
    
    const github = document.getElementById('hero-github-link');
    if (github) github.href = hero.githubLink;
    
    const profileImg = document.getElementById('hero-profile-img');
    if (profileImg) profileImg.src = hero.imageUrl;
  }

  // 2. Stats Section
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = '';
    (data.stats || []).forEach(stat => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      item.innerHTML = `
        <div class="stat-number">${stat.number}</div>
        <div class="stat-text">${stat.text.replace(/\n/g, '<br>')}</div>
      `;
      statsContainer.appendChild(item);
    });
  }

  // 3. About Section
  if (document.getElementById('about-title')) {
    const about = data.about;
    const aboutImg = document.getElementById('about-img');
    if (aboutImg) aboutImg.src = about.imageUrl;
    document.getElementById('about-title').textContent = about.title;
    document.getElementById('about-subtitle').textContent = about.subtitle;
    document.getElementById('about-par1').textContent = about.par1;
    document.getElementById('about-par2').textContent = about.par2;
    
    const nameEl = document.getElementById('about-name');
    if (nameEl) nameEl.textContent = about.name;
    const emailEl = document.getElementById('about-email');
    if (emailEl) emailEl.textContent = about.email;
    const locEl = document.getElementById('about-location');
    if (locEl) locEl.textContent = about.location;
    const availEl = document.getElementById('about-availability');
    if (availEl) {
      availEl.textContent = about.availability;
    }
  }

  // 4. Education Section
  const eduTimeline = document.getElementById('education-timeline');
  if (eduTimeline) {
    eduTimeline.innerHTML = '';
    (data.education || []).forEach(edu => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-date">${edu.date}</div>
        <h3 class="timeline-title">${edu.title}</h3>
        <p class="timeline-subtitle">${edu.subtitle}</p>
      `;
      eduTimeline.appendChild(item);
    });
  }

  // 5. Skills Section
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    (data.skills || []).forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-item';
      item.innerHTML = `
        <div class="skill-icon"><i class="${skill.icon}"></i></div>
        <div class="skill-percentage">${skill.name}</div>
      `;
      skillsGrid.appendChild(item);
    });
  }

  // 6. Projects Section
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    projectsContainer.innerHTML = '';
    const isSubpage = window.location.pathname.includes('projects.html');
    let projects = data.projects || [];
    if (!isSubpage) {
      projects = projects.slice(0, 4);
    }
    if (projects.length === 0) {
      projectsContainer.innerHTML = '<p class="section-subtitle" style="text-align: center; width: 100%; grid-column: 1/-1;">No projects found. Add some from the Admin panel!</p>';
    } else {
      projects.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'work-card';
        
        const defaultImg = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800';
        const imgSrc = project.imageUrl || defaultImg;
        const isLinked = project.link && project.link.trim() !== '';
        const isLiveLinked = project.liveLink && project.liveLink.trim() !== '';
        
        card.innerHTML = `
          <img src="${imgSrc}" alt="${project.title}" loading="lazy">
          <div class="work-info">
            <h3>${project.title}</h3>
            <p>${project.technologies || 'Various Technologies'}</p>
            ${project.description ? `<p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${project.description}</p>` : ''}
            <div class="project-actions">
              ${isLinked ? `
                <a href="${project.link}" target="_blank" class="project-btn repo-btn">
                  <i class="fa-brands fa-github"></i> Repository
                </a>` : ''}
              ${isLiveLinked ? `
                <a href="${project.liveLink}" target="_blank" class="project-btn live-btn">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                </a>` : ''}
            </div>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    }
  }

  // 7. Experience Section
  const expTimeline = document.getElementById('experience-timeline');
  if (expTimeline) {
    expTimeline.innerHTML = '';
    const experiences = data.experience || [];
    if (experiences.length === 0) {
      const expSection = document.getElementById('experience');
      if (expSection) expSection.style.display = 'none';
    } else {
      const expSection = document.getElementById('experience');
      if (expSection) expSection.style.display = 'block';
      experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        const isLinked = exp.link && exp.link.trim() !== '';
        
        item.innerHTML = `
          <div class="timeline-date">${exp.date}</div>
          <h3 class="timeline-title">${exp.title}</h3>
          <p class="timeline-subtitle">${exp.subtitle}</p>
          <p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">${exp.description}</p>
          ${isLinked ? `
            <a href="${exp.link}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; color: var(--accent-primary); font-weight: 600; font-size: 0.85rem; text-decoration: none;">
              View Credentials / Website <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
            </a>` : ''}
        `;
        expTimeline.appendChild(item);
      });
    }
  }

  // 8. Certificates Section
  const certsGrid = document.getElementById('certificates-grid');
  if (certsGrid) {
    certsGrid.innerHTML = '';
    certsGrid.style.setProperty('--certificates-per-row', data.certificatesPerRow || 3);
    const isSubpage = window.location.pathname.includes('certificate.html');
    let certs = data.certificates || [];
    if (!isSubpage) {
      certs = certs.slice(0, 6);
    }
    certs.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'work-card';
      const isLinked = cert.link && cert.link.trim() !== '';
      
      card.innerHTML = `
        ${isLinked ? `<a href="${cert.link}" target="_blank" style="text-decoration: none; color: inherit; display: block;">` : ''}
          <img src="${cert.imageUrl}" alt="${cert.title}" loading="lazy">
          <div class="work-info">
            <h3>${cert.title}</h3>
            <p>${cert.issuer}</p>
          </div>
        ${isLinked ? `</a>` : ''}
      `;
      certsGrid.appendChild(card);
    });
  }

  // 9. Badges Section
  const badgesGrid = document.getElementById('badges-grid');
  if (badgesGrid) {
    badgesGrid.innerHTML = '';
    badgesGrid.style.setProperty('--badges-per-row', data.badgesPerRow || 3);
    const isSubpage = window.location.pathname.includes('badges.html');
    let badges = data.badges || [];
    if (!isSubpage) {
      badges = badges.slice(0, 4);
    }
    badges.forEach(badge => {
      const card = document.createElement('div');
      card.className = 'badge-item';
      const isLinked = badge.link && badge.link.trim() !== '';
      
      card.innerHTML = `
        ${isLinked ? `<a href="${badge.link}" target="_blank" style="text-decoration: none; color: inherit; display: block; width: 100%;">` : ''}
          <img src="${badge.imageUrl}" alt="${badge.title}" loading="lazy">
          <p>${badge.title}</p>
        ${isLinked ? `</a>` : ''}
      `;
      badgesGrid.appendChild(card);
    });
  }

  // 10. Extracurricular Section
  const extraGrid = document.getElementById('extracurricular-grid');
  if (extraGrid) {
    extraGrid.innerHTML = '';
    const isSubpage = window.location.pathname.includes('extracurricular.html');
    let items = data.extracurricular || [];
    if (!isSubpage) {
      items = items.slice(0, 4);
    }
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      const isLinked = item.link && item.link.trim() !== '';
      
      el.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-subtitle">${item.subtitle}</p>
        ${isLinked ? `
          <a href="${item.link}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; color: var(--accent-primary); font-weight: 600; font-size: 0.85rem; text-decoration: none;">
            Learn More <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
          </a>` : ''}
      `;
      extraGrid.appendChild(el);
    });
  }

  // 11. Contact Info Section
  if (document.getElementById('contact-phone')) {
    const contact = data.contact;
    document.getElementById('contact-phone').textContent = contact.phone;
    document.getElementById('contact-email').textContent = contact.email;
    document.getElementById('contact-address').innerHTML = contact.address.replace(/\n/g, '<br>');
  }
}

function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.add('fade-out');
  }
  document.body.classList.remove('loading-active');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Collect data
    const formData = {
      firstName: document.getElementById('contact-first-name').value.trim(),
      lastName: document.getElementById('contact-last-name').value.trim(),
      email: document.getElementById('contact-email-input').value.trim(),
      phone: document.getElementById('contact-phone-input').value.trim(),
      service: document.getElementById('contact-service').value,
      message: document.getElementById('contact-message-input').value.trim()
    };

    // UI Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    // Disable all inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.disabled = true);

    try {
      const success = await sendContactMessage(formData);
      if (success) {
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        form.reset();
      } else {
        showNotification('Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      showNotification('An unexpected error occurred. Please try again later.', 'error');
    } finally {
      // Restore form state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      inputs.forEach(input => input.disabled = false);
    }
  });
}

function showNotification(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('role', 'status');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} fade-in`;
  
  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
  
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto dismiss
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load default/saved theme and accent colors
  loadThemeAndAccent();
  initThemeSwitcher();
  initContactForm();

  // Set current year in footer if element exists
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 1. Render immediately from synchronous cached data
  const hasCache = localStorage.getItem('portfolio_data') !== null;
  const cachedData = getLocalPortfolioDataSync();
  if (cachedData) {
    renderPortfolio(cachedData);
    if (hasCache) {
      hideLoader();
    }
  }

  // 2. Fetch database data asynchronously (SWR pattern)
  try {
    const data = await getPortfolioData();
    renderPortfolio(data);
  } catch (error) {
    console.error("Error dynamically loading portfolio data:", error);
  } finally {
    hideLoader();
  }

  // 3. Subscribe to real-time updates (Supabase + localStorage storage events)
  subscribeToPortfolioUpdates((newData) => {
    if (newData) {
      renderPortfolio(newData);
      loadThemeAndAccent(newData);
    }
  });
});
