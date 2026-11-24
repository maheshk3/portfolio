/**
 * KAMMARI MAHESH - PORTFOLIO INTERACTIVE SCRIPT
 * High-performance, zero-external-dependency JavaScript
 * Features:
 *  - Interactive LRU Cache Simulator (Doubly Linked List + HashMap logic)
 *  - Hero Typewriter Effect
 *  - Theme Toggle (Dark / Light with LocalStorage persistence)
 *  - Projects Category Filtering
 *  - Clipboard Copying with Custom Toast Feedback
 *  - Active Section Scrollspy & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initNavbar();
  initProjectFilters();
  initLRUCacheSimulator();
  initClipboardHelpers();
  initContactForm();
  initTerminalActions();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('km_portfolio_theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlEl.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('km_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ==========================================================================
   2. HERO TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const roles = [
    'Full Stack Java Systems',
    'Spring Boot & Microservices',
    'Strict O(1) Cache Architectures',
    'Secure RESTful APIs with JWT',
    'Computer Vision & LSTM Models'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section[id]');

  // Scroll handler for navbar elevation & back-to-top visibility
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }

    // Scrollspy for active link
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Back to top button action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE LRU CACHE SIMULATOR
   ==========================================================================
   Simulates actual Doubly Linked List + HashMap LRU cache behavior
   Capacity: 4 entries.
   Demonstrates:
     - O(1) Get: marks node as Most Recently Used (MRU)
     - O(1) Put: inserts at MRU, evicts Least Recently Used (LRU) when full
   ========================================================================== */
class LRUCacheSimulation {
  constructor(capacity = 4) {
    this.capacity = capacity;
    this.cache = new Map(); // Key -> Value (simulating HashMap + Linked order)
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    // Access moves node to MRU
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, val) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first key in iteration order)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      return { evicted: oldestKey };
    }
    this.cache.set(key, val);
    return { evicted: null };
  }

  getEntries() {
    // Array of [key, val] where index 0 is LRU, last index is MRU
    return Array.from(this.cache.entries());
  }

  reset() {
    this.cache.clear();
    this.put('UserA', '101');
    this.put('AuthToken', '992');
    this.put('Config', '400');
  }
}

function initLRUCacheSimulator() {
  const visualizer = document.getElementById('cacheVisualizer');
  const keyInput = document.getElementById('cacheKeyInput');
  const valInput = document.getElementById('cacheValInput');
  const putBtn = document.getElementById('putCacheBtn');
  const getBtn = document.getElementById('getCacheBtn');
  const resetBtn = document.getElementById('resetCacheBtn');
  const logMsg = document.getElementById('cacheLogMsg');
  const statsText = document.getElementById('cacheStatsText');

  if (!visualizer || !putBtn) return;

  const lru = new LRUCacheSimulation(4);
  lru.reset();
  renderCacheUI();

  function renderCacheUI(highlightKey = null) {
    visualizer.innerHTML = '';
    const entries = lru.getEntries(); // entries[0] = LRU, entries[last] = MRU
    statsText.textContent = `Items: ${entries.length} / ${lru.capacity}`;

    if (entries.length === 0) {
      visualizer.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;font-family:var(--font-mono);">[Cache is empty]</span>';
      return;
    }

    // Render nodes from LRU (left) to MRU (right)
    entries.forEach(([key, val], index) => {
      const isLRU = index === 0 && entries.length > 1;
      const isMRU = index === entries.length - 1;

      const nodeDiv = document.createElement('div');
      nodeDiv.className = `cache-node ${isMRU ? 'mru' : ''} ${isLRU ? 'lru' : ''}`;
      if (highlightKey && highlightKey === key) {
        nodeDiv.style.borderColor = '#38bdf8';
        nodeDiv.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
      }

      let tagLabel = 'NODE';
      if (isMRU) tagLabel = 'MRU (Head)';
      else if (isLRU) tagLabel = 'LRU (Tail)';

      nodeDiv.innerHTML = `
        <span class="node-label">${tagLabel}</span>
        <span class="node-val">${key}:${val}</span>
      `;

      visualizer.appendChild(nodeDiv);

      // Add double arrow indicator between nodes
      if (index < entries.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'cache-arrow';
        arrow.innerHTML = '<i class="fa-solid fa-arrows-left-right"></i>';
        visualizer.appendChild(arrow);
      }
    });
  }

  // Handle PUT
  putBtn.addEventListener('click', () => {
    const key = (keyInput.value || '').trim();
    const val = (valInput.value || '').trim() || '1';

    if (!key) {
      logMsg.innerHTML = '<span style="color:#ef4444;">Please specify a Key to insert!</span>';
      keyInput.focus();
      return;
    }

    const result = lru.put(key, val);
    renderCacheUI(key);

    if (result.evicted) {
      logMsg.innerHTML = `<span style="color:#f59e0b;">Capacity 4 full! Evicted LRU [${result.evicted}]. Put [${key}=${val}] into MRU (O(1)).</span>`;
    } else {
      logMsg.innerHTML = `<span style="color:#10b981;">Successfully inserted [${key}=${val}] into MRU position (O(1)).</span>`;
    }

    keyInput.value = '';
    valInput.value = '';
  });

  // Handle GET
  getBtn.addEventListener('click', () => {
    const key = (keyInput.value || '').trim();
    if (!key) {
      logMsg.innerHTML = '<span style="color:#ef4444;">Enter a Key above to execute GET(key)!</span>';
      keyInput.focus();
      return;
    }

    const val = lru.get(key);
    if (val !== null) {
      renderCacheUI(key);
      logMsg.innerHTML = `<span style="color:#38bdf8;">CACHE HIT! Key [${key}] = [${val}]. Promoted to MRU in O(1) time.</span>`;
    } else {
      logMsg.innerHTML = `<span style="color:#ef4444;">CACHE MISS! Key [${key}] not present in in-memory map.</span>`;
    }
  });

  // Handle Reset
  resetBtn.addEventListener('click', () => {
    lru.reset();
    renderCacheUI();
    logMsg.innerHTML = '<span>Simulator reset with default 3 nodes. Try adding a 5th node to see LRU eviction!</span>';
  });
}

/* ==========================================================================
   6. CLIPBOARD HELPERS & TOAST
   ========================================================================== */
function initClipboardHelpers() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const copySnippetBtn = document.getElementById('copySnippetBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('mahe3759@gmail.com', 'Email copied: mahe3759@gmail.com');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyToClipboard('+919703847338', 'Phone number copied: +91 9703847338');
    });
  }

  if (copySnippetBtn) {
    copySnippetBtn.addEventListener('click', () => {
      const codeText = `Kammari Mahesh | Full Stack Java & Spring Boot Developer\nEmail: mahe3759@gmail.com | Phone: +91 9703847338\nCollege: G. Pulla Reddy Engineering College (2026 Grad)`;
      copyToClipboard(codeText, 'Profile snippet copied to clipboard!');
    });
  }
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Failed to copy to clipboard');
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    const mailtoUrl = `mailto:mahe3759@gmail.com?subject=${encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    showToast('Opening default mail client to dispatch message...');
    window.location.href = mailtoUrl;
    form.reset();
  });
}

/* ==========================================================================
   8. TERMINAL MICRO-INTERACTIONS
   ========================================================================== */
function initTerminalActions() {
  const termCmd = document.getElementById('termCurrentCmd');
  if (!termCmd) return;

  const commands = [
    'system.checkReadiness() -> 200 OK',
    'mvn test -> ALL PASS (JUnit 5)',
    'git status -> Branch main, working tree clean',
    'spring-boot:run -> Started application in 1.42s'
  ];

  let cmdIndex = 0;
  setInterval(() => {
    cmdIndex = (cmdIndex + 1) % commands.length;
    termCmd.textContent = commands[cmdIndex];
  }, 3500);
}
