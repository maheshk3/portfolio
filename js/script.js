/**
 * KAMMARI MAHESH - PORTFOLIO INTERACTIVE CONTROLLER
 * High-performance, zero-external-dependency JavaScript
 * Features:
 *  - Dynamic Cursor Spotlight Card Illumination (Linear / Vercel style)
 *  - Interactive LRU Cache Simulation (Doubly Linked List + HashMap logic)
 *  - Interactive Computer Vision & LSTM Gesture Simulator (21 landmarks)
 *  - Smooth Scrollspy & Mobile Navigation
 *  - Project Bento Filters
 *  - Clipboard Copy Helpers with Toast Feedback
 *  - Dark / Light Theme Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSpotlightEffect();
  initTypewriter();
  initNavbar();
  initProjectFilters();
  initLRUCacheSimulator();
  initISLGestureSimulator();
  initClipboardHelpers();
  initContactForm();
});

/* ==========================================================================
   1. CURSOR SPOTLIGHT EFFECT (High-Craft Dynamic Radial Illumination)
   ========================================================================== */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   2. THEME TOGGLE (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
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
   3. HERO TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const roles = [
    'Strict O(1) Cache Architectures',
    'Java Backend & Multithreading',
    'OpenCV & LSTM Computer Vision',
    'Summer Backend Intern @ Six Phrase',
    'React.js Dynamic Web Applications'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before typing new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. NAVBAR SCROLL & ACTIVE SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      backToTopBtn.style.display = scrollPos > 350 ? 'flex' : 'none';
    }

    // Active Section Tracking
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Back to top scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. BENTO PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.bento-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'popIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE LRU CACHE SIMULATOR
   ==========================================================================
   Simulates custom Doubly Linked List + HashMap logic with strict O(1) bounds
   ========================================================================== */
class LRUCacheSimulation {
  constructor(capacity = 4) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, val) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      this.cache.set(key, val);
      return { evicted: oldestKey };
    }
    this.cache.set(key, val);
    return { evicted: null };
  }

  getEntries() {
    return Array.from(this.cache.entries());
  }

  reset() {
    this.cache.clear();
    this.put('NodeA', '100');
    this.put('Token', '920');
    this.put('Auth', '404');
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
    const entries = lru.getEntries();
    statsText.textContent = `Items: ${entries.length} / ${lru.capacity}`;

    if (entries.length === 0) {
      visualizer.innerHTML = '<span style="color:var(--text-dim);font-size:0.75rem;font-family:var(--font-mono);">[Cache is empty]</span>';
      return;
    }

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

      if (index < entries.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'cache-arrow';
        arrow.innerHTML = '<i class="fa-solid fa-arrows-left-right"></i>';
        visualizer.appendChild(arrow);
      }
    });
  }

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
      logMsg.innerHTML = `<span style="color:#10b981;">Inserted [${key}=${val}] into MRU position (O(1)).</span>`;
    }

    keyInput.value = '';
    valInput.value = '';
  });

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
      logMsg.innerHTML = `<span style="color:#ef4444;">CACHE MISS! Key [${key}] not found in cache.</span>`;
    }
  });

  resetBtn.addEventListener('click', () => {
    lru.reset();
    renderCacheUI();
    logMsg.innerHTML = '<span>Simulator reset with default 3 nodes. Try adding a 5th node to see LRU eviction!</span>';
  });
}

/* ==========================================================================
   7. INTERACTIVE INDIAN SIGN LANGUAGE (ISL) GESTURE SIMULATOR
   ========================================================================== */
function initISLGestureSimulator() {
  const linesGroup = document.getElementById('skeletonLines');
  const nodesGroup = document.getElementById('skeletonNodes');
  const predVal = document.getElementById('islPredictionVal');
  const confNum = document.getElementById('islConfidenceNum');
  const confBar = document.getElementById('islConfidenceBar');
  const fpsBadge = document.getElementById('islFpsBadge');
  const gestureBtns = document.querySelectorAll('.btn-gesture');

  if (!linesGroup || !nodesGroup || gestureBtns.length === 0) return;

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17]
  ];

  const gestureData = {
    hello: {
      label: '👋 HELLO / GREETING',
      confidence: '98.6%',
      latency: '11ms',
      points: [
        [100, 160], [75, 140], [60, 120], [50, 105], [40, 90],
        [78, 110], [72, 80], [68, 55], [65, 30],
        [98, 105], [98, 75], [98, 50], [98, 22],
        [118, 110], [122, 80], [125, 55], [128, 32],
        [138, 120], [145, 95], [152, 75], [158, 50]
      ]
    },
    thankyou: {
      label: '🙏 THANK YOU (धन्यवाद)',
      confidence: '99.2%',
      latency: '10ms',
      points: [
        [100, 165], [80, 145], [72, 130], [68, 115], [65, 100],
        [85, 115], [84, 88], [83, 62], [82, 36],
        [98, 112], [98, 85], [98, 58], [98, 30],
        [112, 115], [113, 88], [114, 62], [115, 38],
        [125, 122], [126, 96], [127, 72], [128, 48]
      ]
    },
    yes: {
      label: '👍 YES / CONFIRMED',
      confidence: '98.1%',
      latency: '12ms',
      points: [
        [100, 160], [82, 135], [70, 105], [68, 75], [66, 42],
        [92, 125], [105, 120], [115, 125], [112, 135],
        [102, 128], [114, 124], [122, 128], [118, 138],
        [112, 132], [122, 129], [128, 133], [124, 142],
        [122, 138], [130, 135], [134, 140], [130, 148]
      ]
    },
    peace: {
      label: '✌️ PEACE / VICTORY',
      confidence: '97.5%',
      latency: '11ms',
      points: [
        [100, 160], [80, 140], [92, 128], [105, 126], [112, 132],
        [84, 110], [78, 80], [72, 52], [66, 26],
        [102, 108], [108, 78], [114, 50], [120, 24],
        [118, 125], [124, 132], [120, 140], [115, 142],
        [130, 130], [135, 138], [132, 144], [126, 148]
      ]
    },
    welcome: {
      label: '🤝 WELCOME / NAMASTE',
      confidence: '99.5%',
      latency: '9ms',
      points: [
        [100, 155], [78, 135], [66, 115], [58, 98], [54, 82],
        [84, 112], [80, 85], [82, 60], [88, 40],
        [98, 108], [98, 80], [99, 56], [102, 36],
        [114, 112], [116, 85], [115, 60], [112, 42],
        [128, 120], [130, 95], [127, 72], [120, 52]
      ]
    }
  };

  function renderGesture(gestureKey) {
    const data = gestureData[gestureKey];
    if (!data) return;

    linesGroup.innerHTML = '';
    connections.forEach(([i, j]) => {
      const p1 = data.points[i];
      const p2 = data.points[j];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1[0]);
      line.setAttribute('y1', p1[1]);
      line.setAttribute('x2', p2[0]);
      line.setAttribute('y2', p2[1]);
      linesGroup.appendChild(line);
    });

    nodesGroup.innerHTML = '';
    data.points.forEach(([x, y], idx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', idx === 0 ? '5' : (idx % 4 === 0 ? '4' : '3'));
      if (idx % 4 === 0) circle.style.fill = '#38bdf8';
      nodesGroup.appendChild(circle);
    });

    predVal.textContent = data.label;
    confNum.textContent = data.confidence;
    confBar.style.width = data.confidence;
    if (fpsBadge) {
      fpsBadge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${data.latency} &bull; 60 FPS`;
    }
  }

  gestureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gestureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gesture = btn.getAttribute('data-gesture');
      renderGesture(gesture);
    });
  });

  renderGesture('hello');
}

/* ==========================================================================
   8. CLIPBOARD HELPERS & TOAST
   ========================================================================== */
function initClipboardHelpers() {
  const heroEmail = document.getElementById('copyHeroEmail');
  const heroPhone = document.getElementById('copyHeroPhone');
  const contactEmail = document.getElementById('copyContactEmail');
  const contactPhone = document.getElementById('copyContactPhone');

  const copyEmail = () => copyToClipboard('mahe3759@gmail.com', 'Email copied: mahe3759@gmail.com');
  const copyPhone = () => copyToClipboard('+919703847338', 'Phone copied: +91 9703847338');

  if (heroEmail) heroEmail.addEventListener('click', copyEmail);
  if (contactEmail) contactEmail.addEventListener('click', copyEmail);

  if (heroPhone) heroPhone.addEventListener('click', copyPhone);
  if (contactPhone) contactPhone.addEventListener('click', copyPhone);
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => fallbackCopy(text, successMsg));
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
  }, 2600);
}

/* ==========================================================================
   9. CONTACT FORM DISPATCHER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    const mailtoUrl = `mailto:mahe3759@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    showToast('Opening default email client...');
    window.location.href = mailtoUrl;
    form.reset();
  });
}
