// Theme & Accent Color Customizer Engine
import { getPortfolioData } from './db.js';

let dbTheme = 'dark';
let dbAccent = '#8750f7';

// --- Color Conversion Helpers ---
export function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function getDarkerHex(hex, targetLightness = 15) {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#140c1c';
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hslToHex(hsl.h, hsl.s, targetLightness);
}

// --- Theme Application ---
export function applyThemeAndAccent(theme, accentColor) {
  // 1. Theme
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = 'light dark';
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;
  }

  // 2. Accent
  if (accentColor) {
    document.documentElement.style.setProperty('--accent-primary', accentColor);
    const rgb = hexToRgb(accentColor);
    if (rgb) {
      document.documentElement.style.setProperty('--accent-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      const secondaryHex = getDarkerHex(accentColor, 15);
      document.documentElement.style.setProperty('--accent-secondary', secondaryHex);
    }
  } else {
    document.documentElement.style.removeProperty('--accent-primary');
    document.documentElement.style.removeProperty('--accent-primary-rgb');
    document.documentElement.style.removeProperty('--accent-secondary');
  }
}

// --- Sync System Preference Changes ---
const systemPrefMedia = window.matchMedia('(prefers-color-scheme: dark)');
systemPrefMedia.addEventListener('change', () => {
  const currentTheme = localStorage.getItem('portfolio_user_theme') || 'system';
  if (currentTheme === 'system') {
    const savedAccent = localStorage.getItem('portfolio_user_accent') || dbAccent;
    applyThemeAndAccent('system', savedAccent);
  }
});

// --- Theme Customizer Loader ---
export async function loadThemeAndAccent(portfolioData = null) {
  let data = portfolioData;
  if (!data) {
    try {
      data = await getPortfolioData();
    } catch (e) {
      console.warn("Failed to get portfolio data for theme initialization:", e);
    }
  }

  if (data) {
    dbTheme = data.defaultTheme || 'dark';
    dbAccent = data.defaultHighlightColor || '#8750f7';
  }

  // Read overrides
  const userTheme = localStorage.getItem('portfolio_user_theme') || 'system';
  const userAccent = localStorage.getItem('portfolio_user_accent') || dbAccent;

  const activeTheme = userTheme === 'system' ? dbTheme : userTheme;
  applyThemeAndAccent(userTheme, userAccent);
}

// --- Floating Configurator Injected UI ---
export function initThemeSwitcher() {
  // Do not inject switcher in admin dashboard or if already injected
  if (window.location.pathname.includes('admin.html') || document.getElementById('theme-customizer-container')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'theme-customizer-container';
  container.innerHTML = `
    <button id="theme-customizer-trigger" title="Customize Theme" aria-label="Customize Theme">
      <i class="fa-solid fa-palette"></i>
    </button>
    <div id="theme-customizer-panel" class="glass-card">
      <div class="panel-header">
        <h3>Theme Settings</h3>
        <button id="theme-customizer-close" aria-label="Close Panel">&times;</button>
      </div>
      <div class="panel-section">
        <label>Mode</label>
        <div class="theme-toggle-group">
          <button data-theme-val="light" title="Light Theme"><i class="fa-solid fa-sun"></i> Light</button>
          <button data-theme-val="dark" title="Dark Theme"><i class="fa-solid fa-moon"></i> Dark</button>
          <button data-theme-val="system" title="System Preference"><i class="fa-solid fa-desktop"></i> System</button>
        </div>
      </div>
      <div class="panel-section">
        <label>Highlight Accent</label>
        <div class="accent-palette-group">
          <button class="accent-color-btn" data-color="#8750f7" style="background-color: #8750f7;" title="Purple (Default)"></button>
          <button class="accent-color-btn" data-color="#2563eb" style="background-color: #2563eb;" title="Blue"></button>
          <button class="accent-color-btn" data-color="#10b981" style="background-color: #10b981;" title="Emerald"></button>
          <button class="accent-color-btn" data-color="#ef4444" style="background-color: #ef4444;" title="Sunset Red"></button>
          <button class="accent-color-btn" data-color="#f97316" style="background-color: #f97316;" title="Orange"></button>
          <div class="custom-color-picker-wrapper" title="Choose Custom Color">
            <input type="color" id="custom-color-picker-input">
            <div class="custom-color-icon"><i class="fa-solid fa-eye-dropper"></i></div>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <button id="theme-customizer-reset" class="btn-outline" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px;">Reset to Defaults</button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const trigger = document.getElementById('theme-customizer-trigger');
  const panel = document.getElementById('theme-customizer-panel');
  const closeBtn = document.getElementById('theme-customizer-close');
  const resetBtn = document.getElementById('theme-customizer-reset');
  const themeBtns = document.querySelectorAll('.theme-toggle-group button');
  const accentBtns = document.querySelectorAll('.accent-palette-group .accent-color-btn');
  const colorInput = document.getElementById('custom-color-picker-input');

  // Open/Close toggle
  trigger.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Highlight active controls
  function updateActiveUI() {
    const currentTheme = localStorage.getItem('portfolio_user_theme') || 'system';
    const currentAccent = localStorage.getItem('portfolio_user_accent') || dbAccent;

    // 1. Theme Button active highlight
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Accent Button active highlight
    let matchesPreset = false;
    accentBtns.forEach(btn => {
      const color = btn.getAttribute('data-color');
      if (color.toLowerCase() === currentAccent.toLowerCase()) {
        btn.classList.add('selected');
        matchesPreset = true;
      } else {
        btn.classList.remove('selected');
      }
    });

    // Handle Custom Picker Highlight
    const pickerWrapper = document.querySelector('.custom-color-picker-wrapper');
    if (!matchesPreset) {
      pickerWrapper.classList.add('selected');
      pickerWrapper.style.borderColor = currentAccent;
      colorInput.value = currentAccent;
    } else {
      pickerWrapper.classList.remove('selected');
      pickerWrapper.style.borderColor = '';
    }
  }

  // --- Controls Handlers ---
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-theme-val');
      localStorage.setItem('portfolio_user_theme', val);
      const currentAccent = localStorage.getItem('portfolio_user_accent') || dbAccent;
      applyThemeAndAccent(val, currentAccent);
      updateActiveUI();
    });
  });

  accentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-color');
      localStorage.setItem('portfolio_user_accent', val);
      const currentTheme = localStorage.getItem('portfolio_user_theme') || 'system';
      applyThemeAndAccent(currentTheme, val);
      updateActiveUI();
    });
  });

  colorInput.addEventListener('input', (e) => {
    const val = e.target.value;
    localStorage.setItem('portfolio_user_accent', val);
    const currentTheme = localStorage.getItem('portfolio_user_theme') || 'system';
    applyThemeAndAccent(currentTheme, val);
    updateActiveUI();
  });

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('portfolio_user_theme');
    localStorage.removeItem('portfolio_user_accent');
    loadThemeAndAccent();
    updateActiveUI();
  });

  // Initial Sync
  updateActiveUI();
}
