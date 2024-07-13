const citySearch = document.getElementById('citySearch');
const citySelect = document.getElementById('citySelect');
const weatherList = document.getElementById('divElement');

// List of all cities
const cities = [
    "Бургас", "София", "Варна", "Пловдив"
    // Add more cities as needed
];

// Function to filter and display cities in the select element
function filterCities() {
    const searchTerm = citySearch.value.toLowerCase();
    citySelect.innerHTML = ''; // Clear current options
    cities.forEach(city => {
        if (city.toLowerCase().includes(searchTerm)) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
    });

    // Automatically fetch weather data for the first city in the filtered list
    if (citySelect.options.length > 0) {
        fetchWeather(citySelect.options[0].value);
    }
}

// Function to fetch and display weather data
async function fetchWeather(city) {
    weatherList.innerHTML = '';

    const baseUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(city)}&days=3&lang=bulgarian`;

    try {
        const forecastResponse = await fetch(baseUrl, {
            headers: {
                'x-rapidapi-key': '2ef57e91d6msh1b06c205c21c7b9p125ae5jsn30212fd2eb40',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        });
        const forecastData = await forecastResponse.json();

        displayWeather(forecastData);
    } catch (error) {
        console.error(error);
        weatherList.innerHTML = '<p>Грешка при получаване на данни за времето.</p>';
    }
}

function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('bg-BG', options).format(date);
}

function displayWeather(forecastData) {
    const location = forecastData.location;
    const current = forecastData.current;
    const forecastDays = forecastData.forecast.forecastday;
    let currentDate = new Date().toJSON().slice(0, 10);

    // Current day
    const currentWeatherItem = document.createElement('div');
    currentWeatherItem.className = 'frame';
    currentWeatherItem.innerHTML = `
        <h3 class="heading">В момента в ${location.name}</h3>
        <p class="date element">(${currentDate})</p>
        <p class="element">${current.temp_c}°C</p>
        <p class="element">Усеща се като: ${current.feelslike_c}°C</p>
        <p class="element">${current.condition.text}</p>
        <img class="icon" src="${current.condition.icon}" alt="${current.condition.text}">
    `;
    weatherList.appendChild(currentWeatherItem);

    // Next 2 days
    forecastDays.forEach(day => {
        const dayName = getDayName(day.date);
        const forecastItem = document.createElement('div');
        forecastItem.className = 'frame';
        forecastItem.innerHTML = `
            <h3 class="heading">${dayName}</h3>
            <p class="date element">(${day.date})</p>
            <p class="element">${day.day.mintemp_c}°C</p>
            <p class="element">${day.day.maxtemp_c}°C</p>
            <p class="element">${day.day.condition.text}</p>
            <img class="icon" src="${day.day.condition.icon}" alt="${day.day.condition.text}">
        `;
        weatherList.appendChild(forecastItem);
    });
}

// Event listener for city search input
citySearch.addEventListener('input', filterCities);

// Event listener for city select change
citySelect.addEventListener('change', () => {
    const selectedCity = citySelect.value;
    fetchWeather(selectedCity);
});

// Initial call to display all cities and fetch weather for the first city
filterCities();
