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
  initISLGestureSimulator();
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
    'Java Backend Engineering',
    'Strict O(1) Cache Architectures',
    'Indian Sign Language (OpenCV + LSTM)',
    'Summer Backend Intern @ Six Phrase',
    'React.js Dynamic Web Apps'
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
   5B. INTERACTIVE INDIAN SIGN LANGUAGE (ISL) GESTURE SIMULATOR
   ==========================================================================
   Simulates 21-point spatial hand coordinate extraction & LSTM model inference
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

  // Standard bone connections across 21 landmarks
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8],       // Index
    [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
    [9, 13], [13, 14], [14, 15], [15, 16],// Ring
    [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
    [0, 17]                               // Palm base
  ];

  // 21 (x, y) coordinates for each gesture (normalized within 200x180 viewBox)
  const gestureData = {
    hello: {
      label: '👋 HELLO / GREETING',
      confidence: '98.6%',
      latency: '11ms',
      points: [
        [100, 160], // 0: Wrist
        [75, 140], [60, 120], [50, 105], [40, 90],   // Thumb
        [78, 110], [72, 80], [68, 55], [65, 30],     // Index
        [98, 105], [98, 75], [98, 50], [98, 22],     // Middle
        [118, 110], [122, 80], [125, 55], [128, 32], // Ring
        [138, 120], [145, 95], [152, 75], [158, 50]  // Pinky
      ]
    },
    thankyou: {
      label: '🙏 THANK YOU (धन्यवाद)',
      confidence: '99.2%',
      latency: '10ms',
      points: [
        [100, 165], // 0: Wrist
        [80, 145], [72, 130], [68, 115], [65, 100],  // Thumb
        [85, 115], [84, 88], [83, 62], [82, 36],     // Index
        [98, 112], [98, 85], [98, 58], [98, 30],     // Middle
        [112, 115], [113, 88], [114, 62], [115, 38], // Ring
        [125, 122], [126, 96], [127, 72], [128, 48]  // Pinky
      ]
    },
    yes: {
      label: '👍 YES / CONFIRMED',
      confidence: '98.1%',
      latency: '12ms',
      points: [
        [100, 160], // 0: Wrist
        [82, 135], [70, 105], [68, 75], [66, 42],    // Thumb UP!
        [92, 125], [105, 120], [115, 125], [112, 135], // Index Curled
        [102, 128], [114, 124], [122, 128], [118, 138], // Middle Curled
        [112, 132], [122, 129], [128, 133], [124, 142], // Ring Curled
        [122, 138], [130, 135], [134, 140], [130, 148]  // Pinky Curled
      ]
    },
    peace: {
      label: '✌️ PEACE / VICTORY',
      confidence: '97.5%',
      latency: '11ms',
      points: [
        [100, 160], // 0: Wrist
        [80, 140], [92, 128], [105, 126], [112, 132], // Thumb holding ring
        [84, 110], [78, 80], [72, 52], [66, 26],      // Index EXTENDED V
        [102, 108], [108, 78], [114, 50], [120, 24],  // Middle EXTENDED V
        [118, 125], [124, 132], [120, 140], [115, 142], // Ring Curled
        [130, 130], [135, 138], [132, 144], [126, 148]  // Pinky Curled
      ]
    },
    welcome: {
      label: '🤝 WELCOME / NAMASTE',
      confidence: '99.5%',
      latency: '9ms',
      points: [
        [100, 155], // 0: Wrist
        [78, 135], [66, 115], [58, 98], [54, 82],    // Thumb
        [84, 112], [80, 85], [82, 60], [88, 40],     // Index curved
        [98, 108], [98, 80], [99, 56], [102, 36],    // Middle curved
        [114, 112], [116, 85], [115, 60], [112, 42], // Ring curved
        [128, 120], [130, 95], [127, 72], [120, 52]  // Pinky curved
      ]
    }
  };

  function renderGesture(gestureKey) {
    const data = gestureData[gestureKey];
    if (!data) return;

    // Update lines
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

    // Update nodes
    nodesGroup.innerHTML = '';
    data.points.forEach(([x, y], idx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', idx === 0 ? '5' : (idx % 4 === 0 ? '4' : '3.2'));
      if (idx % 4 === 0) {
        circle.style.fill = '#38bdf8'; // fingertip accent
      }
      nodesGroup.appendChild(circle);
    });

    // Update text & gauges
    predVal.textContent = data.label;
    confNum.textContent = data.confidence;
    confBar.style.width = data.confidence;
    if (fpsBadge) {
      fpsBadge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${data.latency} Latency &bull; 60 FPS`;
    }
  }

  // Bind click listeners
  gestureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gestureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gesture = btn.getAttribute('data-gesture');
      renderGesture(gesture);
    });
  });

  // Initial render
  renderGesture('hello');
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
