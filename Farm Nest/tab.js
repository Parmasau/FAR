// Button and Content Management
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Active State
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Button Content Display
    const contentButtons = document.querySelectorAll('[data-content]');
    contentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            contentButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show associated content
            const targetId = this.getAttribute('data-content');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
});

// Simple Weather API Integration
document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value || 'Nairobi';
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>Error fetching weather data</p>`;
            }
        })
        .catch(() => {
            document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data</p>`;
        });
});
