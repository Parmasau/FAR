document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll behavior
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  if (navbar) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      navbar.classList.toggle("hidden", scrollTop > lastScrollTop);
      lastScrollTop = Math.max(0, scrollTop); // Prevent negative scroll values
    });
  }

  // Initialize modals as hidden
  const modals = document.querySelectorAll(".modal-section");
  modals.forEach((modal) => (modal.style.display = "none"));

  // Add event listeners to buttons for opening modals
  document.querySelectorAll(".btn-primary, .are-button").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("onclick")?.match(/openModal\('(\w+)'\)/)?.[1];
      if (modalId) openModal(modalId);
    });
  });

  // Add event listeners to close buttons
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal-section");
      if (modal) closeModal(modal.id.replace("Modal", ""));
    });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) closeModal(modal.id.replace("Modal", ""));
    });
  });

  // Add active state to footer links
  const footerLinks = document.querySelectorAll(".footer-link");
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      footerLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      // Scroll to the corresponding section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Weather button functionality (if applicable)
  const weatherBtn = document.getElementById("weatherBtn");
  if (weatherBtn) {
    weatherBtn.addEventListener("click", function () {
      const location = document.getElementById("locationInput").value.trim();
      const weatherResults = document.getElementById("weatherResults");

      if (location) {
        weatherResults.innerHTML = `
          <div class="alert alert-info">
            <h4>Weather for ${location}</h4>
            <p>Temperature: 25°C</p>
            <p>Condition: Partly Cloudy</p>
            <p>Humidity: 65%</p>
          </div>`;
      } else {
        alert("Please enter a location");
      }
    });
  }

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      alert("Thank you for your message. The Farm Nest team will get back to you soon!");
      contactForm.reset();
    });
  }

  // WhatsApp button functionality
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function () {
      window.open("https://wa.me/254722334455", "_blank");
    });
  }

  // Carousel functionality for Agronomic Advisory
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let currentSlide = 0;

  if (prevBtn && nextBtn && dots.length > 0) {
    const updateDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    };

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + dots.length) % dots.length;
      updateDots();
      // Add logic to change slide content if more slides are added
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % dots.length;
      updateDots();
      // Add logic to change slide content if more slides are added
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateDots();
        // Add logic to change slide content if more slides are added
      });
    });
  }

  // Function to open a modal
  function openModal(modalId) {
    // Close all modals
    const modals = document.querySelectorAll(".modal-section");
    modals.forEach((modal) => (modal.style.display = "none"));

    // Show the selected modal
    const modal = document.getElementById(modalId + "Modal");
    if (modal) {
      modal.style.display = "flex";
      document.body.classList.add("modal-active"); // Add class to hide navbar
    }
  }

  // Function to close a modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId + "Modal");
    if (modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-active"); // Remove class to show navbar
    }
  }

  // Expose functions globally
  window.openModal = openModal;
  window.closeModal = closeModal;
});