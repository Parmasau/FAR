document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide navbar when scrolling down
    if (scrollTop > lastScrollTop) {
      navbar.classList.add("hidden");
    } else {
      // Show navbar when scrolling up
      navbar.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll values
  });

  // Check login state on page load
  checkLoginState();
});

// Function to open modals and hide the navbar
function openModal(modalId) {
  const modal = document.getElementById(modalId + "Modal");
  if (modal) {
    // Add the spinning cog icon to the modal content
    const spinner = document.createElement("div");
    spinner.className = "modal-spinner";
    spinner.innerHTML =
      '<i class="fa-solid fa-cog fa-spin fa-spin-reverse"></i>';
    modal.querySelector(".modal-body").prepend(spinner);

    // Display the modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    hideNavbar(); // Hide the navbar when a modal is opened

    // Remove the spinner after a delay (e.g., 2 seconds)
    setTimeout(() => {
      spinner.remove();
    }, 2000);
  }
}

// Function to close modals and show the navbar
function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}Modal`);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
}

// Function to show the navbar
function showNavbar() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.display = "flex"; // Show the navbar
  }
}

// Function to hide the navbar
function hideNavbar() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.display = "none"; // Hide the navbar
  }
}

// Function to show specific sections in the agriculture advice modal
function showSection(sectionId) {
  // Hide all sections first
  const sections = document.querySelectorAll(".advice-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";

    // Hide the list when showing a specific section
    const modalList = document.querySelector(".modal-list");
    if (modalList) {
      modalList.style.display = "none";
    }
  }
}

// Function to hide sections and show the list again
function hideSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "none";

    // Show the list again
    const modalList = document.querySelector(".modal-list");
    if (modalList) {
      modalList.style.display = "block";
    }
  }
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  const modals = document.getElementsByClassName("modal-section");
  for (let i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
      showNavbar(); // Show navbar when modal is closed
    }
  }
};

// Add event listener for the weather button
document.addEventListener("DOMContentLoaded", function () {
  const weatherBtn = document.getElementById("weatherBtn");
  if (weatherBtn) {
    weatherBtn.addEventListener("click", function () {
      const location = document.getElementById("locationInput").value;
      if (location) {
        // This is a placeholder. In a real application, you would call a weather API
        const weatherResults = document.getElementById("weatherResults");
        weatherResults.innerHTML = `<div class="alert alert-info">
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
});

// Enable Bootstrap tooltips and popovers
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap components
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

function setActive(sectionId) {
  const links = document.querySelectorAll("#navbar .nav-link");
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });
}

// Function to redirect to the home section and set the "Home" button as active
function redirectToHome() {
  setActive("home"); // Set the "Home" link as active
  document.getElementById("home").scrollIntoView({ behavior: "smooth" }); // Scroll to the home section
  closeAllModals(); // Close any open modals
}

// Function to close all modals
function closeAllModals() {
  const modals = document.querySelectorAll(".modal-section");
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
  document.body.style.overflow = "auto"; // Re-enable scrolling
  showNavbar(); // Show the navbar when all modals are closed
}

// Add event listener to cancel buttons
document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.querySelectorAll(".close-button");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 300); // Remove active class after 300ms
      closeModal(button.getAttribute("onclick").split("'")[1]);
    });
  });
});

// Function to check login state and hide login and sign-up links if logged in
function checkLoginState() {
  const loginButton = document.querySelector(".navbar-link[href='#login']");
  const signupButton = document.querySelector(".navbar-link[href='#signup']");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    if (loginButton) loginButton.style.display = "none";
    if (signupButton) signupButton.style.display = "none";
  }
}

// Function to handle login form submission
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Perform login logic here (e.g., validate credentials, make API call)
      // For demonstration, we'll assume login is successful
      localStorage.setItem("isLoggedIn", "true");
      closeModal("login");
      checkLoginState();
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Perform sign-up logic here (e.g., validate inputs, make API call)
      // For demonstration, we'll assume sign-up is successful
      localStorage.setItem("isLoggedIn", "true");
      closeModal("signup");
      checkLoginState();
    });
  }

  // Check login state on page load
  checkLoginState();
});

// Toggle mobile menu
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("navbar-menu").classList.toggle("active");
});

// Set active link on click and scroll to the corresponding section
document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".navbar-link");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Remove active class from all links
      navbarLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to the clicked link
      this.classList.add("active");

      // Scroll to the corresponding section
      const targetId = this.getAttribute("href").substring(1); // Get the section ID
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// For a multi-slide carousel implementation
const carousel = {
  currentSlide: 0,
  slides: document.querySelectorAll(".carousel-item"),
  totalSlides: document.querySelectorAll(".carousel-item").length,

  init: function () {
    // Only set up carousel controls if there are multiple slides
    if (this.totalSlides > 1) {
      document
        .getElementById("prev-btn")
        .addEventListener("click", () => this.prevSlide());
      document
        .getElementById("next-btn")
        .addEventListener("click", () => this.nextSlide());
    }
  },

  goToSlide: function (slideIndex) {
    if (this.totalSlides <= 1) return;

    const carouselInner = document.querySelector(".carousel-inner");
    this.currentSlide = slideIndex;

    // Handle loop around
    if (this.currentSlide < 0) {
      this.currentSlide = this.totalSlides - 1;
    } else if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = 0;
    }

    // Move the carousel
    carouselInner.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  },

  nextSlide: function () {
    this.goToSlide(this.currentSlide + 1);
  },

  prevSlide: function () {
    this.goToSlide(this.currentSlide - 1);
  },
};

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  carousel.init();
});

// Function to show or hide the "Get Weather" button based on the visible section
function toggleWeatherButton() {
  const weatherSection = document.getElementById("weather");
  const weatherButton = document.getElementById("weatherBtn");

  if (!weatherSection || !weatherButton) return;

  const rect = weatherSection.getBoundingClientRect();
  const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

  // Show the button if the "Weather" section is visible, otherwise hide it
  weatherButton.style.display = isVisible ? "block" : "none";
}

// Add event listener to check visibility on scroll and resize
window.addEventListener("scroll", toggleWeatherButton);
window.addEventListener("resize", toggleWeatherButton);

// Call the function on page load to ensure the button is correctly displayed
document.addEventListener("DOMContentLoaded", toggleWeatherButton);

// Add active state to Customer Care buttons
document.addEventListener("DOMContentLoaded", function () {
  const careButtons = document.querySelectorAll("#customer .btn-primary");

  careButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      careButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      this.classList.add("active");
    });
  });
});

function displayPlainPage(title, text) {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #4caf50;
        }
        p {
          font-size: 18px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${text}</p>
    </body>
    </html>
  `);
  newWindow.document.close();
}

// Function to toggle the active state of the house icon
function toggleActive(element) {
  // Remove active class from all icons (if needed)
  const allIcons = document.querySelectorAll(".home-icon");
  allIcons.forEach((icon) => icon.classList.remove("active"));

  // Add active class to the clicked icon
  element.classList.add("active");
}

// Add active state to buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-primary, .are-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      this.classList.add("active");

      // Get the modal ID from the button's onclick attribute
      const modalId =
        this.getAttribute("onclick").match(/openModal\('(\w+)'\)/)?.[1];
      if (modalId) {
        openModal(modalId); // Open the corresponding modal
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const missionButton = document.querySelector("#missionModal .are-button");

  if (missionButton) {
    missionButton.addEventListener("click", function () {
      // Remove active class from all buttons
      const allButtons = document.querySelectorAll(".are-button");
      allButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      this.classList.add("active");

      // Display the content inside the modal
      const modalContent = document.querySelector("#missionModal .modal-body");
      if (modalContent) {
        modalContent.style.display = "block"; // Ensure the content is visible
      }
    });
  }
});

function setModalBackground(modalId, imageUrl) {
  const modalImage = document.querySelector(`#${modalId} .modal-image`);
  if (modalImage) {
    modalImage.style.backgroundImage = `url('${imageUrl}')`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const closeButtons = document.querySelectorAll(".close-button");

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add active class to the clicked close button
      this.classList.add("active");

      // Remove the active class after a short delay (e.g., 300ms)
      setTimeout(() => {
        this.classList.remove("active");
      }, 300);

      // Close the corresponding modal
      const modalId = this.closest(".modal-section").id.replace("Modal", "");
      closeModal(modalId);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutUsCloseButtons = document.querySelectorAll(
    "#missionModal .close-button, #teamModal .close-button, #valuesModal .close-button"
  );

  aboutUsCloseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add active class to the clicked close button
      this.classList.add("active");

      // Remove the active class after a short delay (e.g., 300ms)
      setTimeout(() => {
        this.classList.remove("active");
      }, 300);

      // Close the corresponding modal
      const modalId = this.closest(".modal-section").id.replace("Modal", "");
      closeModal(modalId);
    });
  });
});
