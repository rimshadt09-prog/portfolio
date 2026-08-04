document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Real-time clock update ---
  const timeElement = document.getElementById("local-time");

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Format 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Add leading zeros
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  // Update clock immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);

  // --- 2. Black & White vs. Color Image Toggle ---
  const btnBw = document.getElementById("btn-bw");
  const btnColor = document.getElementById("btn-color");
  const heroImg = document.getElementById("hero-img");

  btnBw.addEventListener("click", () => {
    heroImg.classList.add("grayscale");
    btnBw.classList.add("active");
    btnColor.classList.remove("active");
  });

  btnColor.addEventListener("click", () => {
    heroImg.classList.remove("grayscale");
    btnColor.classList.add("active");
    btnBw.classList.remove("active");
  });

  // --- 3. Magnetic Hover Effect on Floating Badge ---
  const photoFrame = document.getElementById("photo-frame");
  const magneticBadge = document.getElementById("magnetic-badge");

  // Track cursor coordinates on the photo section
  photoFrame.addEventListener("mousemove", (e) => {
    const frameRect = photoFrame.getBoundingClientRect();
    
    // Cursor position relative to the photo frame
    const mouseX = e.clientX - frameRect.left;
    const mouseY = e.clientY - frameRect.top;
    
    // Badge center position relative to the photo frame (badge is positioned absolute bottom/right)
    const badgeRect = magneticBadge.getBoundingClientRect();
    const badgeCenterX = (badgeRect.left - frameRect.left) + (badgeRect.width / 2);
    const badgeCenterY = (badgeRect.top - frameRect.top) + (badgeRect.height / 2);
    
    // Calculate distance from cursor to badge center
    const dx = mouseX - badgeCenterX;
    const dy = mouseY - badgeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Attraction radius of 150px
    if (distance < 150) {
      // Pull strength factor based on distance
      const strength = (150 - distance) / 150;
      
      // Pull badge towards mouse by max 25px
      const targetX = dx * 0.25 * strength;
      const targetY = dy * 0.25 * strength;
      
      magneticBadge.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1.1)`;
    } else {
      // Return to original position
      magneticBadge.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  });

  // Reset badge position when mouse leaves the frame
  photoFrame.addEventListener("mouseleave", () => {
    magneticBadge.style.transform = "translate3d(0, 0, 0) scale(1)";
  });

  // --- 4. Intersection Observer for Scroll Reveal ---
  const scrollElements = document.querySelectorAll(".scroll-reveal");

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        elementObserver.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15
  });

  scrollElements.forEach(el => {
    elementObserver.observe(el);
  });
});
