document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll behavior
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  if (navbar) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      navbar.classList.toggle("hidden", scrollTop > lastScrollTop);
      lastScrollTop = Math.max(0, scrollTop);
    });
  }

  // Initialize all modals as hidden
  document.querySelectorAll(".modal-section").forEach(modal => {
    modal.style.display = "none";
  });

  // Enhanced modal handling
  function openModal(modalId) {
    console.log(`Opening modal: ${modalId}`);
    const modal = document.getElementById(modalId + "Modal");

    if (!modal) {
      console.error(`Modal not found: ${modalId}`);
      return;
    }

    // Close all modals first
    document.querySelectorAll(".modal-section").forEach(m => {
      m.style.display = "none";
    });

    // Show requested modal
    modal.style.display = "flex";
    document.body.classList.add("modal-active");

    // Focus first focusable element
    const focusable = modal.querySelector('button, [href], input, select, textarea');
    if (focusable) focusable.focus();
  }

  function closeModal(modalId) {
    console.log(`Closing modal: ${modalId}`);
    const modal = document.getElementById(modalId + "Modal");
    if (modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-active");
      // Remove active class from all buttons when a modal is closed
      document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove('active');
      });
    }
  }

  // Set up event listeners with active state for modal trigger buttons
  document.querySelectorAll("[onclick^='openModal']").forEach(button => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons that open modals
      document.querySelectorAll("[onclick^='openModal']").forEach(btn => {
        btn.classList.remove('active');
      });

      // Add active class to clicked button
      this.classList.add('active');

      const modalId = this.getAttribute("onclick").match(/openModal\('(\w+)'\)/)[1];
      openModal(modalId);
    });
  });

  // Add active state for all other buttons
  document.querySelectorAll("button:not([onclick^='openModal'])").forEach(button => {
    button.addEventListener("click", function() {
      this.classList.add('active');
      // Optional: Remove active class after a short delay for visual feedback
      // setTimeout(() => {
      //   this.classList.remove('active');
      // }, 200);
    });
  });

  document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", function() {
      const modalId = this.closest(".modal-section").id.replace("Modal", "");
      closeModal(modalId);
    });
  });

  // Close modal when clicking outside content
  window.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal-section")) {
      const modalId = event.target.id.replace("Modal", "");
      closeModal(modalId);
    }
  });

  // Expose functions globally
  window.openModal = openModal;
  window.closeModal = closeModal;
});