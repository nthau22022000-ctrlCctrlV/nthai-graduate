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
  } else {
    // Otherwise, show the link generator (Admin Screen)
    invitationScreen.classList.remove('active');
    invitationScreen.classList.add('hidden');
    adminScreen.classList.remove('hidden');
    adminScreen.classList.add('active');
  }

  setupEventListeners();
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

// Run init
init();
