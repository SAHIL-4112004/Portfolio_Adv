import { getPortfolioData, savePortfolioData, uploadImage, getContactMessages, deleteContactMessage } from './db.js';
import { loadThemeAndAccent, applyThemeAndAccent } from './theme.js';


document.addEventListener('DOMContentLoaded', () => {
  // Load default/saved theme and accent colors
  loadThemeAndAccent();

  // --- Authentication elements ---
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  // Check login session state
  if (sessionStorage.getItem('admin_logged_in') === 'true') {
    showDashboard();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    console.log("Attempting admin login for:", email);

    // Simulated credentials
    if (email === 'sahil4112004khan@gmail.com' && password === 'Sahil#4112004') {
      try {
        sessionStorage.setItem('admin_logged_in', 'true');
      } catch (err) {
        console.warn("Could not save to sessionStorage:", err);
      }
      showDashboard();
    } else {
      loginError.classList.remove('hidden');
      console.warn("Login failed: invalid email or password.");
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('admin_logged_in');
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    showNotification('Logged out successfully.');
  });

  function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    
    // Initialize with the active tab (Hero Section by default)
    const activeTab = document.querySelector('.tab-item.active').getAttribute('data-tab');
    renderTab(activeTab);
    updateUnreadBadge();
  }

  // --- Tab Navigation Setup ---
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      const selectedTab = e.currentTarget;
      selectedTab.classList.add('active');
      const tabName = selectedTab.getAttribute('data-tab');
      renderTab(tabName);
    });
  });

  // --- Main Tab Renderer ---
  async function renderTab(tabName) {
    const loader = document.getElementById('tab-content-loader');
    const body = document.getElementById('tab-content-body');
    
    loader.classList.remove('hidden');
    body.innerHTML = '';
    
    try {
      const data = await getPortfolioData();
      loader.classList.add('hidden');

      switch (tabName) {
        case 'sections':
          renderSectionsTab(data);
          break;
        case 'hero':
          renderHeroTab(data);
          break;
        case 'about':
          renderAboutTab(data);
          break;
        case 'contact':
          renderContactTab(data);
          break;
        case 'stats':
          renderStatsTab(data);
          break;
        case 'education':
          renderEducationTab(data);
          break;
        case 'skills':
          renderSkillsTab(data);
          break;
        case 'projects':
          renderProjectsTab(data);
          break;
        case 'experience':
          renderExperienceTab(data);
          break;
        case 'certificates':
          renderCertificatesTab(data);
          break;
        case 'badges':
          renderBadgesTab(data);
          break;
        case 'extracurricular':
          renderExtracurricularTab(data);
          break;
        case 'settings':
          renderSettingsTab(data);
          break;
        case 'messages':
          renderMessagesTab();
          break;
        default:
          body.innerHTML = '<p class="error-msg">Section renderer not found.</p>';
      }
    } catch (error) {
      console.error("Error loading tab:", error);
      loader.classList.add('hidden');
      body.innerHTML = '<p class="error-msg">Error fetching portfolio data.</p>';
    }
  }

  // ==========================================
  // Custom Tab Renderers
  // ==========================================

  function renderSectionsTab(data) {
    const sections = data.sections || [];
    
    // Map section IDs to icons
    const sectionIcons = {
      hero: 'fa-solid fa-user',
      stats: 'fa-solid fa-chart-simple',
      about: 'fa-solid fa-circle-info',
      education: 'fa-solid fa-graduation-cap',
      skills: 'fa-solid fa-bolt',
      projects: 'fa-solid fa-briefcase',
      experience: 'fa-solid fa-laptop-code',
      certificates: 'fa-solid fa-award',
      badges: 'fa-solid fa-id-badge',
      extracurricular: 'fa-solid fa-icons',
      contact: 'fa-solid fa-address-book'
    };

    let listHtml = '';
    sections.forEach((sec, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === sections.length - 1;
      const icon = sectionIcons[sec.id] || 'fa-solid fa-layer-group';
      
      listHtml += `
        <div class="admin-list-item fade-in" data-id="${sec.id}">
          <div class="item-meta">
            <div class="item-icon-preview"><i class="${icon}"></i></div>
            <div class="item-details">
              <h4 style="font-weight: 700;">${escapeHtml(sec.name)}</h4>
              <p style="color: ${sec.visible !== false ? '#10b981' : '#ef4444'}; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                ${sec.visible !== false ? '<i class="fa-solid fa-eye"></i> Visible on site' : '<i class="fa-solid fa-eye-slash"></i> Hidden from site'}
              </p>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn-edit toggle-section-visibility-btn" data-id="${sec.id}" style="width: 100px; justify-content: center;">
              ${sec.visible !== false ? '<i class="fa-solid fa-eye-slash"></i> Hide' : '<i class="fa-solid fa-eye"></i> Show'}
            </button>
            <button class="btn-edit move-up-section-btn" data-id="${sec.id}" ${isFirst ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}>
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="btn-edit move-down-section-btn" data-id="${sec.id}" ${isLast ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}>
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
      `;
    });

    const html = `
      <div class="content-header">
        <h2>Manage Sections</h2>
      </div>
      <p class="section-subtitle" style="margin-bottom: 2rem;">Rearrange landing page sections and toggle their visibility.</p>
      
      <div class="admin-items-list">
        ${listHtml}
      </div>
    `;

    document.getElementById('tab-content-body').innerHTML = html;

    // Bind Toggle Visibility
    document.querySelectorAll('.toggle-section-visibility-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const sec = data.sections.find(s => s.id === id);
        if (sec) {
          sec.visible = sec.visible === false ? true : false;
          await savePortfolioData(data);
          showNotification(`${sec.name} is now ${sec.visible ? 'visible' : 'hidden'} on the site.`);
          renderSectionsTab(data);
        }
      });
    });

    // Bind Move Up
    document.querySelectorAll('.move-up-section-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const idx = data.sections.findIndex(s => s.id === id);
        if (idx > 0) {
          const temp = data.sections[idx];
          data.sections[idx] = data.sections[idx - 1];
          data.sections[idx - 1] = temp;
          await savePortfolioData(data);
          showNotification(`Moved ${temp.name} up.`);
          renderSectionsTab(data);
        }
      });
    });

    // Bind Move Down
    document.querySelectorAll('.move-down-section-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const idx = data.sections.findIndex(s => s.id === id);
        if (idx !== -1 && idx < data.sections.length - 1) {
          const temp = data.sections[idx];
          data.sections[idx] = data.sections[idx + 1];
          data.sections[idx + 1] = temp;
          await savePortfolioData(data);
          showNotification(`Moved ${temp.name} down.`);
          renderSectionsTab(data);
        }
      });
    });
  }

  function renderHeroTab(data) {
    const hero = data.hero || {};
    const html = `
      <div class="content-header">
        <h2>Hero Section</h2>
      </div>
      <form id="hero-form" class="fade-in">
        <div class="form-row">
          <div class="form-group">
            <label for="hero-greeting">Greeting Title</label>
            <input type="text" id="hero-greeting" value="${escapeHtml(hero.greeting)}" required placeholder="e.g. Hi, I'm MD Sahil Khan">
          </div>
          <div class="form-group">
            <label for="hero-image-file">Profile Image (Upload from Device)</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <input type="file" id="hero-image-file" accept="image/*" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 12px; border-radius: 8px; color: var(--text-primary); cursor: pointer; width: 100%;">
              <input type="hidden" id="hero-image" value="${escapeHtml(hero.imageUrl)}">
              <div style="display: flex; align-items: center; gap: 15px; margin-top: 5px;">
                <img id="hero-image-preview" src="${escapeHtml(hero.imageUrl)}" style="max-height: 80px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);" alt="Hero Profile Preview" onerror="this.style.display='none';">
                <span id="hero-image-status" style="font-size: 0.85rem; color: var(--text-secondary);"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="hero-name">Headline / Main Title (Use new lines for line breaks)</label>
          <textarea id="hero-name" rows="2" required placeholder="e.g. Computer Science &\nEngineering Student">${escapeHtml(hero.name)}</textarea>
        </div>
        <div class="form-group">
          <label for="hero-bio">Short Bio Description</label>
          <textarea id="hero-bio" rows="4" required placeholder="Describe yourself...">${escapeHtml(hero.bio)}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="hero-cv">Download CV Link</label>
            <input type="url" id="hero-cv" value="${escapeHtml(hero.cvLink)}" required placeholder="https://drive.google.com/...">
          </div>
          <div class="form-group">
            <label for="hero-codolio">Codolio Profile Link</label>
            <input type="url" id="hero-codolio" value="${escapeHtml(hero.codolioLink)}" placeholder="https://codolio.com/...">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="hero-linkedin">LinkedIn Profile Link</label>
            <input type="url" id="hero-linkedin" value="${escapeHtml(hero.linkedinLink)}" placeholder="https://linkedin.com/in/...">
          </div>
          <div class="form-group">
            <label for="hero-github">GitHub Profile Link</label>
            <input type="url" id="hero-github" value="${escapeHtml(hero.githubLink)}" placeholder="https://github.com/...">
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary">Save Hero Details <i class="fa-solid fa-check" style="margin-left: 8px;"></i></button>
        </div>
      </form>
    `;
    document.getElementById('tab-content-body').innerHTML = html;

    const heroImageFileInput = document.getElementById('hero-image-file');
    const heroImageInput = document.getElementById('hero-image');
    const heroImagePreview = document.getElementById('hero-image-preview');
    const heroImageStatus = document.getElementById('hero-image-status');

    heroImageFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      heroImageStatus.textContent = '⏳ Uploading image...';
      heroImageStatus.style.color = 'var(--accent-primary)';
      
      try {
        const url = await uploadImage(file);
        heroImageInput.value = url;
        heroImagePreview.src = url;
        heroImagePreview.style.display = 'block';
        heroImageStatus.textContent = '✅ Upload complete!';
        heroImageStatus.style.color = '#10b981';
      } catch (err) {
        console.error("Hero image upload error:", err);
        heroImageStatus.textContent = '❌ Upload failed';
        heroImageStatus.style.color = '#ef4444';
      }
    });

    document.getElementById('hero-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      saveBtn.disabled = true;

      data.hero = {
        greeting: document.getElementById('hero-greeting').value.trim(),
        imageUrl: document.getElementById('hero-image').value.trim(),
        name: document.getElementById('hero-name').value.trim(),
        bio: document.getElementById('hero-bio').value.trim(),
        cvLink: document.getElementById('hero-cv').value.trim(),
        codolioLink: document.getElementById('hero-codolio').value.trim(),
        linkedinLink: document.getElementById('hero-linkedin').value.trim(),
        githubLink: document.getElementById('hero-github').value.trim()
      };

      await savePortfolioData(data);
      saveBtn.innerHTML = originalText;
      saveBtn.disabled = false;
      showNotification('Hero section updated successfully!');
    });
  }

  function renderAboutTab(data) {
    const about = data.about || {};
    const html = `
      <div class="content-header">
        <h2>About Me</h2>
      </div>
      <form id="about-form" class="fade-in">
        <div class="form-row">
          <div class="form-group">
            <label for="about-title">Section Title</label>
            <input type="text" id="about-title" value="${escapeHtml(about.title)}" required placeholder="About Me">
          </div>
          <div class="form-group">
            <label for="about-image-file">About Image (Upload from Device)</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <input type="file" id="about-image-file" accept="image/*" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 12px; border-radius: 8px; color: var(--text-primary); cursor: pointer; width: 100%;">
              <input type="hidden" id="about-image" value="${escapeHtml(about.imageUrl)}">
              <div style="display: flex; align-items: center; gap: 15px; margin-top: 5px;">
                <img id="about-image-preview" src="${escapeHtml(about.imageUrl)}" style="max-height: 80px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);" alt="About Preview" onerror="this.style.display='none';">
                <span id="about-image-status" style="font-size: 0.85rem; color: var(--text-secondary);"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="about-subtitle">Introductory Subtitle</label>
          <input type="text" id="about-subtitle" value="${escapeHtml(about.subtitle)}" required placeholder="e.g. Passionate Web Developer...">
        </div>
        <div class="form-group">
          <label for="about-par1">Paragraph 1</label>
          <textarea id="about-par1" rows="4" required placeholder="My journey started...">${escapeHtml(about.par1)}</textarea>
        </div>
        <div class="form-group">
          <label for="about-par2">Paragraph 2</label>
          <textarea id="about-par2" rows="4" required placeholder="Outside of coding...">${escapeHtml(about.par2)}</textarea>
        </div>
        
        <h3 style="margin: 2rem 0 1rem; font-size: 1.25rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; color: var(--accent-primary);">Personal Details</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="about-name">Full Name</label>
            <input type="text" id="about-name" value="${escapeHtml(about.name)}" required placeholder="Sahil Khan">
          </div>
          <div class="form-group">
            <label for="about-email">Public Email</label>
            <input type="email" id="about-email" value="${escapeHtml(about.email)}" required placeholder="email@domain.com">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="about-location">Location</label>
            <input type="text" id="about-location" value="${escapeHtml(about.location)}" required placeholder="Vadodara, Gujarat">
          </div>
          <div class="form-group">
            <label for="about-availability">Availability Status</label>
            <input type="text" id="about-availability" value="${escapeHtml(about.availability)}" required placeholder="Open for work">
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary">Save About Details <i class="fa-solid fa-check" style="margin-left: 8px;"></i></button>
        </div>
      </form>
    `;
    document.getElementById('tab-content-body').innerHTML = html;

    const aboutImageFileInput = document.getElementById('about-image-file');
    const aboutImageInput = document.getElementById('about-image');
    const aboutImagePreview = document.getElementById('about-image-preview');
    const aboutImageStatus = document.getElementById('about-image-status');

    aboutImageFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      aboutImageStatus.textContent = '⏳ Uploading image...';
      aboutImageStatus.style.color = 'var(--accent-primary)';
      
      try {
        const url = await uploadImage(file);
        aboutImageInput.value = url;
        aboutImagePreview.src = url;
        aboutImagePreview.style.display = 'block';
        aboutImageStatus.textContent = '✅ Upload complete!';
        aboutImageStatus.style.color = '#10b981';
      } catch (err) {
        console.error("About image upload error:", err);
        aboutImageStatus.textContent = '❌ Upload failed';
        aboutImageStatus.style.color = '#ef4444';
      }
    });

    document.getElementById('about-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      saveBtn.disabled = true;

      data.about = {
        title: document.getElementById('about-title').value.trim(),
        imageUrl: document.getElementById('about-image').value.trim(),
        subtitle: document.getElementById('about-subtitle').value.trim(),
        par1: document.getElementById('about-par1').value.trim(),
        par2: document.getElementById('about-par2').value.trim(),
        name: document.getElementById('about-name').value.trim(),
        email: document.getElementById('about-email').value.trim(),
        location: document.getElementById('about-location').value.trim(),
        availability: document.getElementById('about-availability').value.trim()
      };

      await savePortfolioData(data);
      saveBtn.innerHTML = originalText;
      saveBtn.disabled = false;
      showNotification('About Me section saved successfully!');
    });
  }

  function renderContactTab(data) {
    const contact = data.contact || {};
    const html = `
      <div class="content-header">
        <h2>Contact Details</h2>
      </div>
      <form id="contact-form" class="fade-in">
        <div class="form-row">
          <div class="form-group">
            <label for="contact-phone">Phone Number</label>
            <input type="text" id="contact-phone" value="${escapeHtml(contact.phone)}" required placeholder="+01 123 654 8096">
          </div>
          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input type="email" id="contact-email" value="${escapeHtml(contact.email)}" required placeholder="sahil@mail.com">
          </div>
        </div>
        <div class="form-group">
          <label for="contact-address">Location Address (Use new lines for line breaks)</label>
          <textarea id="contact-address" rows="3" required placeholder="Street address, City, Country">${escapeHtml(contact.address)}</textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary">Save Contact Info <i class="fa-solid fa-check" style="margin-left: 8px;"></i></button>
        </div>
      </form>
    `;
    document.getElementById('tab-content-body').innerHTML = html;

    document.getElementById('contact-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      saveBtn.disabled = true;

      data.contact = {
        phone: document.getElementById('contact-phone').value.trim(),
        email: document.getElementById('contact-email').value.trim(),
        address: document.getElementById('contact-address').value.trim()
      };

      await savePortfolioData(data);
      saveBtn.innerHTML = originalText;
      saveBtn.disabled = false;
      showNotification('Contact information updated successfully!');
    });
  }

  // ==========================================
  // Generic List Manager Renderers
  // ==========================================

  function renderStatsTab(data) {
    renderListSection(
      'Stats Counter',
      'stats',
      data,
      [
        { name: 'number', label: 'Stat Number (e.g. 3+, 500+)', type: 'text', required: true, placeholder: 'e.g. 3+' },
        { name: 'text', label: 'Stat Details (Use new lines for breaks)', type: 'textarea', required: true, placeholder: 'e.g. Projects\nCompleted' }
      ],
      (item) => `
        <div class="item-details">
          <h4 style="font-size: 1.5rem; color: var(--accent-primary); font-weight: 800;">${escapeHtml(item.number)}</h4>
          <p style="margin-top: 4px;">${escapeHtml(item.text).replace(/\n/g, '<br>')}</p>
        </div>
      `
    );
  }

  function renderEducationTab(data) {
    renderListSection(
      'Education History',
      'education',
      data,
      [
        { name: 'date', label: 'Duration / Date Range', type: 'text', required: true, placeholder: 'e.g. Present or 2021 - 2023' },
        { name: 'title', label: 'Degree / Course Name', type: 'text', required: true, placeholder: 'e.g. B.Tech Computer Science & Engineering' },
        { name: 'subtitle', label: 'Institution & Location', type: 'text', required: true, placeholder: 'e.g. Parul University, Vadodara, Gujarat' }
      ],
      (item) => `
        <div class="item-details">
          <span class="badge" style="font-size: 0.8rem; padding: 0.15rem 0.6rem;">${escapeHtml(item.date)}</span>
          <h4 style="margin-top: 6px; font-weight: 700;">${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.subtitle)}</p>
        </div>
      `
    );
  }

  function renderSkillsTab(data) {
    renderListSection(
      'Technical Skills',
      'skills',
      data,
      [
        { name: 'icon', label: 'FontAwesome Icon Class', type: 'text', required: true, placeholder: 'e.g. fa-brands fa-js or fa-solid fa-code' },
        { name: 'name', label: 'Skill Label', type: 'text', required: true, placeholder: 'e.g. JavaScript or HTML & CSS' }
      ],
      (item) => `
        <div class="item-icon-preview"><i class="${escapeHtml(item.icon)}"></i></div>
        <div class="item-details">
          <h4>${escapeHtml(item.name)}</h4>
          <p style="font-family: monospace; font-size: 0.8rem;">class: ${escapeHtml(item.icon)}</p>
        </div>
      `
    );
  }

  function renderProjectsTab(data) {
    renderListSection(
      'Projects Portfolio',
      'projects',
      data,
      [
        { name: 'title', label: 'Project Name', type: 'text', required: true, placeholder: 'e.g. AppDost' },
        { name: 'technologies', label: 'Technologies Used (Comma separated)', type: 'text', required: true, placeholder: 'React, Spring Boot, MySQL' },
        { name: 'imageUrl', label: 'Cover Image', type: 'image', required: false, placeholder: 'https://images.unsplash.com/...' },
        { name: 'link', label: 'Repository URL (e.g. GitHub)', type: 'text', required: false, placeholder: 'https://github.com/...' },
        { name: 'liveLink', label: 'Live Project URL (Demo / Website)', type: 'text', required: false, placeholder: 'https://...' },
        { name: 'description', label: 'Detailed Description', type: 'textarea', required: true, placeholder: 'Describe the project details...' }
      ],
      (item) => {
        const defaultImg = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400';
        return `
          <img src="${escapeHtml(item.imageUrl || defaultImg)}" class="item-img" alt="${escapeHtml(item.title)}" onerror="this.src='${defaultImg}'">
          <div class="item-details">
            <h4 style="font-weight: 700;">${escapeHtml(item.title)}</h4>
            <p style="color: var(--accent-primary); font-weight: 600; font-size: 0.8rem;">${escapeHtml(item.technologies)}</p>
            <p style="margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.85rem;">${escapeHtml(item.description)}</p>
            <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary); flex-wrap: wrap;">
              ${item.link ? `<span><i class="fa-brands fa-github"></i> Repo: ${escapeHtml(item.link)}</span>` : ''}
              ${item.liveLink ? `<span><i class="fa-solid fa-globe"></i> Live: ${escapeHtml(item.liveLink)}</span>` : ''}
            </div>
          </div>
        `;
      }
    );
  }

  function renderExperienceTab(data) {
    renderListSection(
      'Work Experience',
      'experience',
      data,
      [
        { name: 'date', label: 'Employment Period', type: 'text', required: true, placeholder: 'e.g. 2025 - Present' },
        { name: 'title', label: 'Position / Job Title', type: 'text', required: true, placeholder: 'e.g. Software Engineering Intern' },
        { name: 'subtitle', label: 'Company Name & Location', type: 'text', required: true, placeholder: 'e.g. Tech Innovators Inc.' },
        { name: 'link', label: 'Company / Reference Link URL', type: 'text', required: false, placeholder: 'https://companywebsite.com' },
        { name: 'description', label: 'Key Responsibilities / Impact Summary', type: 'textarea', required: true, placeholder: 'Describe the work details...' }
      ],
      (item) => `
        <div class="item-details">
          <span class="badge" style="font-size: 0.8rem; padding: 0.15rem 0.6rem;">${escapeHtml(item.date)}</span>
          <h4 style="margin-top: 6px; font-weight: 700;">${escapeHtml(item.title)}</h4>
          <p style="font-weight: 600; color: var(--text-secondary);">${escapeHtml(item.subtitle)}</p>
          <p style="margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.85rem;">${escapeHtml(item.description)}</p>
          ${item.link ? `<p style="font-size: 0.8rem; color: var(--accent-primary); margin-top: 5px;"><i class="fa-solid fa-link"></i> ${escapeHtml(item.link)}</p>` : ''}
        </div>
      `
    );
  }

  function renderCertificatesTab(data) {
    renderListSection(
      'Professional Certificates',
      'certificates',
      data,
      [
        { name: 'title', label: 'Certificate Name', type: 'text', required: true, placeholder: 'e.g. Computer Network & Internet Protocol' },
        { name: 'issuer', label: 'Issuing Body', type: 'text', required: true, placeholder: 'e.g. Issued by NPTEL' },
        { name: 'imageUrl', label: 'Certificate Image', type: 'image', required: true, placeholder: 'https://images.unsplash.com/...' },
        { name: 'link', label: 'Verification Link URL', type: 'text', required: false, placeholder: 'https://verify.nptel.ac.in/...' }
      ],
      (item) => `
        <img src="${escapeHtml(item.imageUrl)}" class="item-img" alt="${escapeHtml(item.title)}">
        <div class="item-details">
          <h4 style="font-weight: 700;">${escapeHtml(item.title)}</h4>
          <p style="color: var(--accent-primary); font-size: 0.85rem;">${escapeHtml(item.issuer)}</p>
          ${item.link ? `<p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;"><i class="fa-solid fa-link"></i> ${escapeHtml(item.link)}</p>` : ''}
        </div>
      `
    );
  }

  function renderBadgesTab(data) {
    renderListSection(
      'Badges & Trophies',
      'badges',
      data,
      [
        { name: 'title', label: 'Badge Title', type: 'text', required: true, placeholder: 'e.g. Top Performer' },
        { name: 'imageUrl', label: 'Badge Image', type: 'image', required: true, placeholder: 'https://images.unsplash.com/...' },
        { name: 'link', label: 'Badge Verification / Info URL', type: 'text', required: false, placeholder: 'https://credly.com/...' }
      ],
      (item) => `
        <img src="${escapeHtml(item.imageUrl)}" class="item-img" alt="${escapeHtml(item.title)}">
        <div class="item-details">
          <h4 style="font-weight: 700;">${escapeHtml(item.title)}</h4>
          ${item.link ? `<p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;"><i class="fa-solid fa-link"></i> ${escapeHtml(item.link)}</p>` : ''}
        </div>
      `
    );
  }

  function renderExtracurricularTab(data) {
    renderListSection(
      'Extracurricular Activities',
      'extracurricular',
      data,
      [
        { name: 'date', label: 'Duration / Period', type: 'text', required: true, placeholder: 'e.g. 2024 - Present' },
        { name: 'title', label: 'Activity / Role Name', type: 'text', required: true, placeholder: 'e.g. Tech Club Core Member' },
        { name: 'subtitle', label: 'Short Description', type: 'text', required: true, placeholder: 'e.g. Organizing hackathons and coding workshops...' },
        { name: 'link', label: 'Activity / Organization Link URL', type: 'text', required: false, placeholder: 'https://clubwebsite.com' }
      ],
      (item) => `
        <div class="item-details">
          <span class="badge" style="font-size: 0.8rem; padding: 0.15rem 0.6rem;">${escapeHtml(item.date)}</span>
          <h4 style="margin-top: 6px; font-weight: 700;">${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.subtitle)}</p>
          ${item.link ? `<p style="font-size: 0.8rem; color: var(--accent-primary); margin-top: 5px;"><i class="fa-solid fa-link"></i> ${escapeHtml(item.link)}</p>` : ''}
        </div>
      `
    );
  }

  function renderSettingsTab(data) {
    const defaultTheme = data.defaultTheme || 'dark';
    const defaultColor = data.defaultHighlightColor || '#8750f7';

    const html = `
      <div class="content-header">
        <h2>General Settings</h2>
      </div>
      <form id="settings-form" class="fade-in">
        <div class="settings-section">
          <div class="settings-group">
            <h3>Default Theme Mode</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
              Choose the default theme mode for visitors who haven't set a personal preference.
            </p>
            <div style="display: flex; gap: 20px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
                <input type="radio" name="defaultTheme" value="dark" ${defaultTheme === 'dark' ? 'checked' : ''} style="accent-color: var(--accent-primary);"> Dark Mode (Recommended)
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
                <input type="radio" name="defaultTheme" value="light" ${defaultTheme === 'light' ? 'checked' : ''} style="accent-color: var(--accent-primary);"> Light Mode
              </label>
            </div>
          </div>
          
          <div class="settings-group">
            <h3>Default Highlight Color</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
              Choose the default accent/highlight color for your portfolio site.
            </p>
            <div class="admin-accent-picker">
              <button type="button" class="admin-color-btn" data-color="#8750f7" style="background-color: #8750f7;" title="Purple (Default)"></button>
              <button type="button" class="admin-color-btn" data-color="#2563eb" style="background-color: #2563eb;" title="Blue"></button>
              <button type="button" class="admin-color-btn" data-color="#10b981" style="background-color: #10b981;" title="Emerald"></button>
              <button type="button" class="admin-color-btn" data-color="#ef4444" style="background-color: #ef4444;" title="Sunset Red"></button>
              <button type="button" class="admin-color-btn" data-color="#f97316" style="background-color: #f97316;" title="Orange"></button>
              <div class="admin-custom-picker-wrapper" title="Choose Custom Color">
                <input type="color" id="admin-custom-color-input">
                <i class="fa-solid fa-eye-dropper admin-custom-icon"></i>
              </div>
              <input type="hidden" id="defaultHighlightColor" value="${defaultColor}">
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Save Settings <i class="fa-solid fa-check" style="margin-left: 8px;"></i></button>
          </div>
        </div>
      </form>
    `;

    document.getElementById('tab-content-body').innerHTML = html;

    const accentBtns = document.querySelectorAll('.admin-accent-picker .admin-color-btn');
    const colorInput = document.getElementById('admin-custom-color-input');
    const hiddenInput = document.getElementById('defaultHighlightColor');
    const customPickerWrapper = document.querySelector('.admin-custom-picker-wrapper');

    function updateAccentPickerUI(selectedColor) {
      let isPreset = false;
      accentBtns.forEach(btn => {
        const color = btn.getAttribute('data-color');
        if (color.toLowerCase() === selectedColor.toLowerCase()) {
          btn.classList.add('selected');
          isPreset = true;
        } else {
          btn.classList.remove('selected');
        }
      });

      if (isPreset) {
        customPickerWrapper.classList.remove('selected');
        customPickerWrapper.style.borderColor = '';
      } else {
        customPickerWrapper.classList.add('selected');
        customPickerWrapper.style.borderColor = selectedColor;
        colorInput.value = selectedColor;
      }
    }

    // Initialize UI
    updateAccentPickerUI(defaultColor);

    // Preset color buttons
    accentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        hiddenInput.value = color;
        updateAccentPickerUI(color);
      });
    });

    // Custom color picker
    colorInput.addEventListener('input', (e) => {
      const color = e.target.value;
      hiddenInput.value = color;
      updateAccentPickerUI(color);
    });

    // Form submit
    document.getElementById('settings-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = e.target.querySelector('button[type="submit"]');
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      saveBtn.disabled = true;

      const chosenTheme = document.querySelector('input[name="defaultTheme"]:checked').value;
      const chosenColor = hiddenInput.value;

      data.defaultTheme = chosenTheme;
      data.defaultHighlightColor = chosenColor;

      const success = await savePortfolioData(data);
      saveBtn.innerHTML = originalText;
      saveBtn.disabled = false;

      if (success) {
        showNotification('General settings saved successfully!');
        // Apply theme/accent immediately to the admin page for instant visual response
        applyThemeAndAccent(chosenTheme, chosenColor);
      } else {
        showNotification('Failed to save settings.', 'error');
      }
    });
  }

  // ==========================================
  // Centralized CRUD Engine
  // ==========================================

  function renderListSection(sectionTitle, itemsKey, data, fieldsConfig, itemTemplateFn) {
    const items = data[itemsKey] || [];
    
    // Generate list markup
    let itemsListHtml = '';
    if (items.length === 0) {
      itemsListHtml = `<p class="section-subtitle" style="margin-top: 1.5rem;">No ${sectionTitle.toLowerCase()} items found. Click "Add New" to add one.</p>`;
    } else {
      items.forEach((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;
        itemsListHtml += `
          <div class="admin-list-item fade-in" data-id="${item.id}">
            <div class="item-meta">
              ${itemTemplateFn(item)}
            </div>
            <div class="item-actions">
              <button class="btn-edit move-up-item-btn" data-id="${item.id}" ${isFirst ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}>
                <i class="fa-solid fa-chevron-up"></i>
              </button>
              <button class="btn-edit move-down-item-btn" data-id="${item.id}" ${isLast ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <button class="btn-edit btn-item-edit" data-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
              <button class="btn-danger btn-item-delete" data-id="${item.id}"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
          </div>
        `;
      });
    }

    const isCertificates = itemsKey === 'certificates';
    const isBadges = itemsKey === 'badges';
    const hasLayoutSettings = isCertificates || isBadges;
    const currentPerRow = isCertificates 
      ? (data.certificatesPerRow || 3) 
      : (isBadges ? (data.badgesPerRow || 3) : 3);

    const layoutSettingsHtml = hasLayoutSettings ? `
      <!-- Layout Settings Panel -->
      <div class="editor-card fade-in" style="margin-bottom: 2rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1.5rem;">
        <h3 style="font-size: 1.1rem; margin-bottom: 1rem; color: var(--accent-primary); display: flex; align-items: center; gap: 8px; font-weight: 700;">
          <i class="fa-solid fa-table-cells"></i> Layout Settings
        </h3>
        <div class="form-row" style="align-items: flex-end; gap: 1rem;">
          <div class="form-group" style="margin-bottom: 0; flex: 1;">
            <label for="row-items-count">Number of Items per Row (Desktop)</label>
            <select id="row-items-count" style="width: 100%; max-width: 250px;">
              <option value="1" ${currentPerRow === 1 ? 'selected' : ''}>1 Item</option>
              <option value="2" ${currentPerRow === 2 ? 'selected' : ''}>2 Items</option>
              <option value="3" ${currentPerRow === 3 ? 'selected' : ''}>3 Items (Default)</option>
              <option value="4" ${currentPerRow === 4 ? 'selected' : ''}>4 Items</option>
              <option value="5" ${currentPerRow === 5 ? 'selected' : ''}>5 Items</option>
              <option value="6" ${currentPerRow === 6 ? 'selected' : ''}>6 Items</option>
            </select>
          </div>
          <button id="save-layout-btn" class="btn-primary" style="height: fit-content; padding: 0.8rem 1.5rem; border-radius: 10px;">
            Save Layout <i class="fa-solid fa-floppy-disk" style="margin-left: 6px;"></i>
          </button>
        </div>
      </div>
    ` : '';

    const html = `
      <div class="content-header">
        <h2>${sectionTitle}</h2>
        <button id="add-item-btn" class="btn-primary"><i class="fa-solid fa-plus" style="margin-right: 8px;"></i> Add New Item</button>
      </div>

      ${layoutSettingsHtml}

      <!-- Add/Edit Editor Panel -->
      <div id="item-editor-container" class="editor-card hidden fade-in">
        <h3 id="editor-title">Add New Item</h3>
        <form id="item-editor-form">
          <input type="hidden" id="edit-item-id" value="">
          
          ${fieldsConfig.map(field => {
            if (field.type === 'textarea') {
              return `
                <div class="form-group">
                  <label for="field-${field.name}">${field.label}${field.required ? '*' : ''}</label>
                  <textarea id="field-${field.name}" rows="4" ${field.required ? 'required' : ''} placeholder="${field.placeholder || ''}"></textarea>
                </div>
              `;
            } else if (field.type === 'image') {
              return `
                <div class="form-group">
                  <label for="field-${field.name}-file">${field.label}${field.required ? '*' : ''} (Upload from Device)</label>
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <input type="file" id="field-${field.name}-file" accept="image/*" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 12px; border-radius: 8px; color: var(--text-primary); cursor: pointer; width: 100%;">
                    <input type="hidden" id="field-${field.name}" ${field.required ? 'required' : ''} value="">
                    <div style="display: flex; align-items: center; gap: 15px; margin-top: 5px;">
                      <img id="field-${field.name}-preview" src="" style="max-height: 80px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); display: none;" alt="Preview">
                      <span id="field-${field.name}-status" style="font-size: 0.85rem; color: var(--text-secondary);"></span>
                    </div>
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="form-group">
                  <label for="field-${field.name}">${field.label}${field.required ? '*' : ''}</label>
                  <input type="${field.type || 'text'}" id="field-${field.name}" ${field.required ? 'required' : ''} placeholder="${field.placeholder || ''}">
                </div>
              `;
            }
          }).join('')}

          <div class="form-actions">
            <button type="button" id="cancel-editor-btn" class="btn-secondary">Cancel</button>
            <button type="submit" id="save-item-btn" class="btn-primary">Save Item <i class="fa-solid fa-check" style="margin-left: 8px;"></i></button>
          </div>
        </form>
      </div>

      <div class="admin-items-list">
        ${itemsListHtml}
      </div>
    `;

    document.getElementById('tab-content-body').innerHTML = html;

    const editorContainer = document.getElementById('item-editor-container');
    const editorForm = document.getElementById('item-editor-form');
    const editorTitle = document.getElementById('editor-title');
    const editItemIdInput = document.getElementById('edit-item-id');
    const addItemBtn = document.getElementById('add-item-btn');
    const cancelEditorBtn = document.getElementById('cancel-editor-btn');

    // Setup file upload change listeners for image fields
    fieldsConfig.forEach(field => {
      if (field.type === 'image') {
        const fileInput = document.getElementById(`field-${field.name}-file`);
        const hiddenInput = document.getElementById(`field-${field.name}`);
        const previewImg = document.getElementById(`field-${field.name}-preview`);
        const statusSpan = document.getElementById(`field-${field.name}-status`);

        if (fileInput) {
          fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            statusSpan.textContent = '⏳ Uploading image...';
            statusSpan.style.color = 'var(--accent-primary)';

            try {
              const url = await uploadImage(file);
              hiddenInput.value = url;
              previewImg.src = url;
              previewImg.style.display = 'block';
              statusSpan.textContent = '✅ Upload complete!';
              statusSpan.style.color = '#10b981';
            } catch (err) {
              console.error(`Upload error for field ${field.name}:`, err);
              statusSpan.textContent = '❌ Upload failed';
              statusSpan.style.color = '#ef4444';
            }
          });
        }
      }
    });

    // Save Layout Settings Trigger
    if (hasLayoutSettings) {
      const saveLayoutBtn = document.getElementById('save-layout-btn');
      if (saveLayoutBtn) {
        saveLayoutBtn.addEventListener('click', async () => {
          const originalText = saveLayoutBtn.innerHTML;
          saveLayoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
          saveLayoutBtn.disabled = true;

          const val = parseInt(document.getElementById('row-items-count').value);
          if (isCertificates) {
            data.certificatesPerRow = val;
          } else if (isBadges) {
            data.badgesPerRow = val;
          }

          const success = await savePortfolioData(data);
          saveLayoutBtn.innerHTML = originalText;
          saveLayoutBtn.disabled = false;

          if (success) {
            showNotification('Layout settings updated successfully!');
            renderTab(itemsKey);
          } else {
            showNotification('Failed to update layout settings.', 'error');
          }
        });
      }
    }

    // Add Item Trigger
    addItemBtn.addEventListener('click', () => {
      editorForm.reset();
      editItemIdInput.value = '';
      editorTitle.textContent = `Add New ${sectionTitle.substring(0, sectionTitle.endsWith('s') ? sectionTitle.length - 1 : sectionTitle.length)}`;
      
      // Reset image previews for Add mode
      fieldsConfig.forEach(field => {
        if (field.type === 'image') {
          const previewImg = document.getElementById(`field-${field.name}-preview`);
          const statusSpan = document.getElementById(`field-${field.name}-status`);
          if (previewImg) previewImg.style.display = 'none';
          if (statusSpan) statusSpan.textContent = '';
        }
      });

      editorContainer.classList.remove('hidden');
      editorContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Cancel Trigger
    cancelEditorBtn.addEventListener('click', () => {
      editorContainer.classList.add('hidden');
      editorForm.reset();
      // Reset image previews
      fieldsConfig.forEach(field => {
        if (field.type === 'image') {
          const previewImg = document.getElementById(`field-${field.name}-preview`);
          const statusSpan = document.getElementById(`field-${field.name}-status`);
          if (previewImg) previewImg.style.display = 'none';
          if (statusSpan) statusSpan.textContent = '';
        }
      });
    });

    // Save Submit Trigger
    editorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const saveBtn = document.getElementById('save-item-btn');
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      saveBtn.disabled = true;

      const id = editItemIdInput.value;
      const itemData = {};
      fieldsConfig.forEach(field => {
        itemData[field.name] = document.getElementById(`field-${field.name}`).value.trim();
      });

      if (id) {
        // Edit mode
        const index = data[itemsKey].findIndex(item => item.id === id);
        if (index !== -1) {
          data[itemsKey][index] = { id, ...itemData };
        }
      } else {
        // Add mode
        const newItem = { id: Date.now().toString(), ...itemData };
        data[itemsKey].push(newItem);
      }

      await savePortfolioData(data);
      saveBtn.innerHTML = originalText;
      saveBtn.disabled = false;
      editorContainer.classList.add('hidden');
      editorForm.reset();
      
      showNotification('Item saved successfully!');
      
      // Reload active tab list
      renderTab(itemsKey);
    });

    // Edit Button Triggers
    document.querySelectorAll('.btn-item-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = data[itemsKey].find(i => i.id === id);
        if (item) {
          editItemIdInput.value = id;
          editorTitle.textContent = `Edit ${sectionTitle.substring(0, sectionTitle.endsWith('s') ? sectionTitle.length - 1 : sectionTitle.length)}`;
          
          fieldsConfig.forEach(field => {
            const val = item[field.name] || '';
            document.getElementById(`field-${field.name}`).value = val;
            if (field.type === 'image') {
              const previewImg = document.getElementById(`field-${field.name}-preview`);
              const statusSpan = document.getElementById(`field-${field.name}-status`);
              const fileInput = document.getElementById(`field-${field.name}-file`);
              if (fileInput) fileInput.value = ''; // Reset file input selection
              if (statusSpan) statusSpan.textContent = ''; // Reset status
              
              if (previewImg) {
                if (val) {
                  previewImg.src = val;
                  previewImg.style.display = 'block';
                } else {
                  previewImg.style.display = 'none';
                }
              }
            }
          });

          editorContainer.classList.remove('hidden');
          editorContainer.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Move Up Button Triggers
    document.querySelectorAll('.move-up-item-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const idx = data[itemsKey].findIndex(item => item.id === id);
        if (idx > 0) {
          const temp = data[itemsKey][idx];
          data[itemsKey][idx] = data[itemsKey][idx - 1];
          data[itemsKey][idx - 1] = temp;
          
          await savePortfolioData(data);
          showNotification('Item moved up successfully!');
          renderTab(itemsKey);
        }
      });
    });

    // Move Down Button Triggers
    document.querySelectorAll('.move-down-item-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const idx = data[itemsKey].findIndex(item => item.id === id);
        if (idx !== -1 && idx < data[itemsKey].length - 1) {
          const temp = data[itemsKey][idx];
          data[itemsKey][idx] = data[itemsKey][idx + 1];
          data[itemsKey][idx + 1] = temp;
          
          await savePortfolioData(data);
          showNotification('Item moved down successfully!');
          renderTab(itemsKey);
        }
      });
    });

    // Delete Button Triggers
    document.querySelectorAll('.btn-item-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const label = sectionTitle.substring(0, sectionTitle.endsWith('s') ? sectionTitle.length - 1 : sectionTitle.length).toLowerCase();
        if (confirm(`Are you sure you want to delete this ${label}?`)) {
          e.currentTarget.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          e.currentTarget.disabled = true;

          data[itemsKey] = data[itemsKey].filter(item => item.id !== id);
          await savePortfolioData(data);
          
          showNotification('Item deleted successfully!');
          renderTab(itemsKey);
        }
      });
    });
  }

  async function updateUnreadBadge() {
    const badge = document.getElementById('messages-unread-badge');
    if (!badge) return;
    
    try {
      const messages = await getContactMessages();
      const count = messages.length;
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    } catch (e) {
      console.error("Failed to update unread badge:", e);
    }
  }

  async function renderMessagesTab() {
    const body = document.getElementById('tab-content-body');
    const loader = document.getElementById('tab-content-loader');
    
    loader.classList.remove('hidden');
    body.innerHTML = '';
    
    try {
      const messages = await getContactMessages();
      loader.classList.add('hidden');
      
      let messagesHtml = '';
      
      if (messages.length === 0) {
        messagesHtml = `
          <div class="inbox-empty fade-in">
            <i class="fa-solid fa-envelope-open"></i>
            <p>Your inbox is empty. No messages yet!</p>
          </div>
        `;
      } else {
        messages.forEach(msg => {
          const serviceLabel = {
            web: 'Web Design',
            app: 'App Design',
            branding: 'Branding'
          }[msg.service] || msg.service || 'General Enquiry';

          const formattedTime = new Date(msg.timestamp).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          });

          messagesHtml += `
            <div class="message-card fade-in" data-id="${msg.id}">
              <div class="message-header">
                <div class="message-sender">
                  <h3>${escapeHtml(msg.firstName)} ${escapeHtml(msg.lastName)}</h3>
                  <span class="message-service-badge">${escapeHtml(serviceLabel)}</span>
                </div>
                <div class="message-meta-info">
                  <span class="message-time"><i class="fa-regular fa-clock"></i> ${formattedTime}</span>
                  <div class="message-contact-links">
                    <a href="mailto:${encodeURIComponent(msg.email)}"><i class="fa-solid fa-envelope"></i> ${escapeHtml(msg.email)}</a>
                    ${msg.phone ? `<a href="tel:${encodeURIComponent(msg.phone)}"><i class="fa-solid fa-phone"></i> ${escapeHtml(msg.phone)}</a>` : ''}
                  </div>
                </div>
              </div>
              <div class="message-body">${escapeHtml(msg.message)}</div>
              <div class="message-footer">
                <button class="btn-delete-msg delete-message-btn" data-id="${msg.id}">
                  <i class="fa-solid fa-trash-can"></i> Delete Message
                </button>
              </div>
            </div>
          `;
        });
      }
      
      const html = `
        <div class="content-header">
          <h2>Inbox Messages</h2>
          <button id="refresh-messages-btn" class="btn-edit" style="display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-arrows-rotate"></i> Refresh
          </button>
        </div>
        <p class="section-subtitle" style="margin-bottom: 2rem;">Read and manage messages sent from your portfolio contact form.</p>
        <div class="messages-list">
          ${messagesHtml}
        </div>
      `;
      
      body.innerHTML = html;
      
      // Wire up refresh button
      document.getElementById('refresh-messages-btn').addEventListener('click', () => {
        renderMessagesTab();
        updateUnreadBadge();
      });
      
      // Wire up delete buttons
      const deleteBtns = body.querySelectorAll('.delete-message-btn');
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this message?')) {
            const success = await deleteContactMessage(id);
            if (success) {
              showNotification('Message deleted successfully!');
              renderMessagesTab();
              updateUnreadBadge();
            } else {
              showNotification('Failed to delete message.', 'error');
            }
          }
        });
      });
      
    } catch (error) {
      console.error("Error loading messages tab:", error);
      loader.classList.add('hidden');
      body.innerHTML = '<p class="error-msg">Error loading messages. Please try again.</p>';
    }
  }

  // ==========================================
  // Helper Utilities
  // ==========================================

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = type === 'success' ? '#8750f7' : '#ef4444';
    toast.style.color = '#fff';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = "'Sora', sans-serif";
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.9rem';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.border = '1px solid rgba(255,255,255,0.1)';
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
    toast.appendChild(icon);
    
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
});
