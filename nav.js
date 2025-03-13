// Function to open modals
function openModal(modalId) {
  document.getElementById(modalId + "Modal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

// Function to close modals
function closeModal(modalId) {
  document.getElementById(modalId + "Modal").style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
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
