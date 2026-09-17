// Constants
const EVENT_DATE = new Date('2026-09-27T08:00:00+07:00'); // Event is Sept 27, 2026 at 08:00 AM (Vietnam Time)

// Elements
const guestNameEl = document.getElementById('guestName');
const invitationScreen = document.getElementById('invitation-screen');
const adminScreen = document.getElementById('admin-screen');
const generateLinkBtn = document.getElementById('generateLinkBtn');
const newGuestNameInput = document.getElementById('newGuestName');
const resultContainer = document.getElementById('resultContainer');
const generatedLinkInput = document.getElementById('generatedLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpError = document.getElementById('rsvpError');
const rsvpResponse = document.getElementById('rsvpResponse');
const rsvpResponseTitle = document.getElementById('rsvpResponseTitle');
const rsvpResponseMessage = document.getElementById('rsvpResponseMessage');
const momoGift = document.getElementById('momoGift');
const changeRsvpBtn = document.getElementById('changeRsvpBtn');

const RSVP_RESPONSES = {
  yes: {
    title: 'Hải vui muốn xỉu luôn!',
    message: 'Cảm ơn bạn thật nhiều vì đã dành thời gian đến chung vui. Có bạn ở đó, ngày đặc biệt này chắc chắn sẽ trọn vẹn hơn rất nhiều. Hẹn gặp bạn nhé!'
  },
  maybe: {
    title: 'Cố gắng đến với Hải nhaaa!',
    message: 'Hải năn nỉ một xíu thôi đó. Sắp xếp được thì ghé chung vui và chụp với Hải thật nhiều ảnh nhé. Hải vẫn để dành một chỗ và mong tin vui từ bạn!'
  },
  no: {
    title: 'Hải hơi buồn một xíu...',
    message: 'Tiếc là ngày vui này thiếu bạn, nhưng Hải hiểu mà. Cảm ơn bạn đã dành thời gian hồi âm và gửi lời chúc từ xa. Tình cảm của bạn vẫn đáng quý thật nhiều!'
  }
};

// Music Elements
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
const musicSlash = document.querySelector('.music-off-slash');

// Countdown Elements
const daysEl = document.getElementById('cd-days');
const hoursEl = document.getElementById('cd-hours');
const minutesEl = document.getElementById('cd-minutes');
const secondsEl = document.getElementById('cd-seconds');

// Initialize App
function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const inviteName = urlParams.get('invite');

  if (inviteName) {
    // If there is an invite parameter, show the invitation
    guestNameEl.textContent = inviteName;
    adminScreen.classList.add('hidden');
    adminScreen.classList.remove('active');
    invitationScreen.classList.remove('hidden');
    invitationScreen.classList.add('active');
    startCountdown();
    
    // Shoot fireworks
    setTimeout(shootFireworks, 500);

    // Music Player Setup
    musicBtn.classList.remove('hidden');
    const tryPlayMusic = () => {
      bgm.play().then(() => {
        musicBtn.classList.add('playing');
        musicSlash.classList.add('hidden');
        document.removeEventListener('touchstart', tryPlayMusic);
        document.removeEventListener('click', tryPlayMusic);
        document.removeEventListener('scroll', tryPlayMusic);
      }).catch(e => console.log("Autoplay prevented pending interaction"));
    };
    
    // Attempt to play on first interaction
    document.addEventListener('touchstart', tryPlayMusic, { once: true });
    document.addEventListener('click', tryPlayMusic, { once: true });
    document.addEventListener('scroll', tryPlayMusic, { once: true });
    
    // Initialize Scroll Animations
    setupScrollAnimations();

  } else {
    // Otherwise, show the link generator (Admin Screen)
    invitationScreen.classList.remove('active');
    invitationScreen.classList.add('hidden');
    adminScreen.classList.remove('hidden');
    adminScreen.classList.add('active');
  }

  setupEventListeners();
}

// Fireworks Logic
function shootFireworks() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    // Bắn từng đợt chậm hơn (waves) ở nửa trên màn hình
    confetti({
      particleCount: 60,
      startVelocity: 22,
      spread: 360,
      ticks: 120,
      gravity: 0.6,
      origin: { 
        x: randomInRange(0.2, 0.8), // Random theo chiều ngang
        y: randomInRange(0.1, 0.3)  // Chỉ nằm ở phần đầu màn hình
      },
      zIndex: 100,
      colors: ['#721c24', '#cba365', '#ffffff', '#ffdb58', '#ff3800']
    });
  }, 1200); // Bắn mỗi 1.2s để tạo cảm giác chậm rãi, thong thả
}

// Event Listeners
function setupEventListeners() {
  // Generator
  generateLinkBtn.addEventListener('click', () => {
    const name = newGuestNameInput.value.trim();
    if (!name) {
      alert('Vui lòng nhập tên khách mời!');
      return;
    }
    
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?invite=${encodeURIComponent(name)}`;
    
    generatedLinkInput.value = link;
    resultContainer.classList.remove('hidden');
  });

  // Music Button Toggle
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgm.paused) {
      bgm.play();
      musicBtn.classList.add('playing');
      musicSlash.classList.add('hidden');
    } else {
      bgm.pause();
      musicBtn.classList.remove('playing');
      musicSlash.classList.remove('hidden');
    }
  });

  // Copy Link
  copyLinkBtn.addEventListener('click', () => {
    generatedLinkInput.select();
    generatedLinkInput.setSelectionRange(0, 99999); /* For mobile devices */
    
    try {
      navigator.clipboard.writeText(generatedLinkInput.value).then(() => {
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'Đã Copy!';
        setTimeout(() => {
          copyLinkBtn.textContent = originalText;
        }, 2000);
      });
    } catch (err) {
      // Fallback
      document.execCommand('copy');
      copyLinkBtn.textContent = 'Đã Copy!';
      setTimeout(() => {
        copyLinkBtn.textContent = 'Copy Link';
      }, 2000);
    }
  });

  // RSVP is intentionally local-only and does not submit or persist data.
  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const selection = rsvpForm.querySelector('input[name="attendance"]:checked');
    if (!selection) {
      rsvpError.classList.remove('hidden');
      return;
    }

    const response = RSVP_RESPONSES[selection.value];
    rsvpError.classList.add('hidden');
    rsvpResponseTitle.textContent = response.title;
    rsvpResponseMessage.textContent = response.message;
    rsvpResponse.dataset.answer = selection.value;
    momoGift.classList.toggle('hidden', selection.value !== 'no');
    rsvpForm.classList.add('hidden');
    rsvpResponse.classList.remove('hidden');

    if (selection.value === 'yes' && typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 75,
        startVelocity: 28,
        gravity: 0.8,
        origin: { y: 0.72 },
        colors: ['#721c24', '#cba365', '#fffaf2']
      });
    }

    rsvpResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  rsvpForm.addEventListener('change', () => {
    rsvpError.classList.add('hidden');
  });

  changeRsvpBtn.addEventListener('click', () => {
    rsvpResponse.classList.add('hidden');
    rsvpForm.classList.remove('hidden');
    rsvpForm.querySelector('input[name="attendance"]:checked')?.focus();
  });
}

// Countdown logic
function startCountdown() {
  function updateTimer() {
    const now = new Date().getTime();
    const distance = EVENT_DATE.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  // Initial call
  updateTimer();
  // Update every second
  setInterval(updateTimer, 1000);
}

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once visible to prevent scroll jitter
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Start
init();
