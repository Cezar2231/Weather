const citySearch = document.getElementById('citySearch');
const citySelect = document.getElementById('citySelect');
const weatherList = document.getElementById('divElement');
const detailsTable = document.getElementById('detailsTable');
const sunElement = document.querySelector('.sun');
const cloudElement = document.querySelector('.cloud');
const starsBg = document.querySelector('.bg');

const API_KEY = '2ef57e91d6msh1b06c205c21c7b9p125ae5jsn30212fd2eb40';
const API_HOST = 'weatherapi-com.p.rapidapi.com';

// List of all cities
const cities = [
    "София", "Пловдив", "Варна", "Бургас", "Русе", "Стара Загора", "Плевен", "Добрич", "Сливен", "Шумен",
    "Перник", "Пазарджик", "Ямбол", "Хасково", "Благоевград", "Велико Търново", "Враца", "Габрово", "Асеновград", "Видин",
    "Казанлък", "Кърджали", "Кюстендил", "Монтана", "Търговище", "Димитровград", "Силистра", "Ловеч", "Дупница", "Разград",
    "Горна Оряховица", "Свищов", "Петрич", "Смолян", "Сандански", "Самоков", "Велинград", "Севлиево", "Лом", "Нова Загора",
    "Карлово", "Айтос", "Троян", "Ботевград", "Харманли", "Пещера", "Гоце Делчев", "Свиленград", "Карнобат", "Панагюрище",
    "Чирпан", "Попово", "Раковски", "Радомир", "Първомай", "Нови Искър", "Поморие", "Несебър", "Червен бряг", "Козлодуй",
    "Ихтиман", "Нови пазар", "Берковица", "Раднево", "Провадия", "Разлог", "Балчик", "Бяла Слатина", "Каварна", "Костинброд",
    "Банкя", "Стамболийски", "Етрополе", "Кнежа", "Левски", "Павликени", "Мездра", "Елхово", "Тетевен", "Луковит",
    "Тутракан", "Трявна", "Девня", "Средец", "Омуртаг", "Сопот", "Исперих", "Велики Преслав", "Бяла (Област Русе)", "Ракитово",
    "Гълъбово", "Кричим", "Лясковец", "Септември", "Момчилград", "Банско", "Белене", "Аксаково", "Белослав", "Своге",
    "Дряново", "Любимец", "Кубрат", "Пирдоп", "Елин Пелин", "Симитли", "Сливница", "Златоград", "Хисаря", "Дулово",
    "Долни чифлик", "Симеоновград", "Генерал Тошево", "Тервел", "Костенец", "Девин", "Мадан", "Стралджа", "Царево",
    "Вършец", "Твърдица", "Куклен", "Бобов дол", "Котел", "Съединение", "Елена", "Оряхово", "Якоруда", "Божурище",
    "Тополовград", "Белоградчик", "Стражица", "Камено", "Чепеларе", "Созопол", "Перущица", "Суворово", "Златица", "Крумовград",
    "Долна баня", "Дългопол", "Ветово", "Полски Тръмбеш", "Тръстеник", "Койнаре", "Долни Дъбник", "Славяново", "Годеч", "Правец",
    "Игнатиево", "Костандово", "Брацигово", "Две могили", "Стрелча", "Неделино", "Свети Влас", "Сапарева баня", "Брезник",
    "Смядово", "Ардино", "Дебелец", "Никопол", "Шивачево", "Белово", "Цар Калоян", "Мартен", "Ивайловград", "Кресна",
    "Върбица", "Рудозем", "Вълчедръм", "Приморско", "Глоджево", "Летница", "Мъглиж", "Искър", "Шабла", "Гулянци",
    "Долна Митрополия", "Крън", "Вълчи дол", "Сливо поле", "Баня", "Драгоман", "Сунгурларе", "Батак", "Джебел", "Завет",
    "Криводол", "Мизия", "Белица", "Каспичан", "Кула", "Николаево", "Ветрен", "Гурково", "Роман", "Калофер",
    "Каблешково", "Априлци", "Бухово", "Долна Оряховица", "Павел баня", "Ябланица", "Рила", "Опака", "Угърчин", "Златарица",
    "Хаджидимово", "Добринище", "Обзор", "Бяла черква", "Дунавци", "Брегово", "Трън", "Садово", "Килифарево", "Лъки",
    "Малко Търново", "Доспат", "Копривщица", "Кочериново", "Лозница", "Бяла (Област Варна)", "Борово", "Черноморец", "Батановци", "Пордим",
    "Ахелой", "Сухиндол", "Българово", "Брезово", "Главиница", "Каолиново", "Чипровци", "Меричлери", "Земен", "Плачковци",
    "Кермен", "Момин проход", "Алфатар", "Сеново", "Бойчиновци", "Антоново", "Ахтопол", "Бобошево", "Шипка", "Болярово",
    "Димово", "Брусарци", "Китен", "Клисура", "Плиска", "Маджарово", "Мелник", "Грамада", "Сърница"
];

function filterCities() {
    const searchTerm = citySearch.value.toLowerCase();
    citySelect.innerHTML = ''; 
    cities.forEach(city => {
        if (city.toLowerCase().includes(searchTerm)) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        }
    });

    if (citySelect.options.length > 0) {
        fetchWeather(citySelect.options[0].value);
    }
}

async function fetchWeather(city) {
    weatherList.innerHTML = '';

    const baseUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(city)}&days=3&lang=bg`;

    try {
        const forecastResponse = await fetch(baseUrl, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });
        const forecastData = await forecastResponse.json();

        displayWeather(forecastData);
    } catch (error) {
        console.error(error);
        weatherList.innerHTML = '<p class="error">Грешка при получаване на данни за времето.</p>';
    }
}

// Utility functions
function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('bg-BG', options).format(date);
}

function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    const [hours, minutes] = time.split(':');

    let hours24 = parseInt(hours, 10);

    if (modifier === 'PM' && hours24 < 12) {
        hours24 += 12;
    } else if (modifier === 'AM' && hours24 === 12) {
        hours24 = 0; 
    }

    const formattedHours = hours24.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

let currentDate = formatDate(new Date().toJSON().slice(0, 10));

function displayWeather(forecastData) {
    const location = forecastData.location;
    const current = forecastData.current;
    const forecastDays = forecastData.forecast.forecastday;

    // Clear previous weather data
    weatherList.innerHTML = '';
    removeRainyBackground(); 

    const isNight = current.condition.icon.includes('/night/');
    
    if (current.condition.text.includes('Слънчево')) {
        sunElement.style.display = 'block'; 
        starsBg.style.display = 'none'; 
        cloudElement.style.display = 'none';
    } else if (isNight) {
        sunElement.style.display = 'none'; 
        cloudElement.style.display = 'none';
        starsBg.style.display = 'block'; 
    } else if (current.condition.text.includes('облачно')) {
        sunElement.style.display = 'none'; 
        starsBg.style.display = 'none';
        cloudElement.style.display = 'block'; 
    } else {
        sunElement.style.display = 'none'; 
        starsBg.style.display = 'none'; 
    }

    const currentWeatherItem = document.createElement('div');
    currentWeatherItem.className = 'frame';

    let weatherConditionClass = '';
    if (current.condition.text.includes('Слънчево')) {
        weatherConditionClass = 'sunny-weather-condition';
    } else if (current.condition.text.includes('Дъжд') || current.condition.text.includes('дъждове')) {
        weatherConditionClass = 'rainy-weather-condition';
        createRainyBackground(); // Create rainy background
    } else if (current.condition.text.includes('Облачно') || current.condition.text.includes('облачно')) {
        weatherConditionClass = 'cloudy-weather-condition';
    } else if (current.condition.icon.includes('/night/')) {
        weatherConditionClass = 'moon-weather-condition';
    } else {
        weatherConditionClass = 'default-weather-condition';
    }

    currentWeatherItem.innerHTML = `
        <h3 class="heading">В момента в ${location.name}</h3>
        <p class="date element">(${currentDate})</p>
        <p class="element">${current.temp_c}°C</p>
        <p class="element">Усеща се като: ${current.feelslike_c}°C</p>
        <p class="element">${current.condition.text}</p>
        <img class="icon" src="${current.condition.icon}" alt="${current.condition.text}">
    `;
    currentWeatherItem.classList.add(weatherConditionClass);

    weatherList.appendChild(currentWeatherItem);

    forecastDays.forEach((day) => {
        const dayName = getDayName(day.date);
        const forecastItem = document.createElement('div');
        forecastItem.className = 'frame';

        let dayWeatherConditionClass = '';
        if (day.day.condition.text.includes('Слънчево')) {
            dayWeatherConditionClass = 'sunny-weather-condition';
        } else if (day.day.condition.text.includes('Дъжд') || day.day.condition.text.includes('дъждове')) {
            dayWeatherConditionClass = 'rainy-weather-condition';
        } else if (day.day.condition.text.includes('Облачно') || day.day.condition.text.includes('облаци')) {
            dayWeatherConditionClass = 'cloudy-weather-condition';
        } else if (day.day.condition.text.includes('Ясно')) {
            dayWeatherConditionClass = 'moon-weather-condition';
        } else {
            dayWeatherConditionClass = 'default-weather-condition';
        }

        forecastItem.innerHTML = `
            <h3 class="heading">${dayName}</h3>
            <p class="date element">(${formatDate(day.date)})</p>
            <p class="element">${day.day.mintemp_c}°C / ${day.day.maxtemp_c}°C</p>
            <p class="element">${day.day.condition.text}</p>
            <img class="element icon" src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <button class="btn" onclick="showDetails('${day.date}', ${day.day.avgtemp_c}, ${day.day.maxtemp_c}, ${day.day.mintemp_c}, ${day.day.maxwind_kph}, ${day.day.avghumidity}, '${day.day.condition.text}', ${day.day.uv}, ${day.day.daily_chance_of_rain}, ${day.day.daily_chance_of_snow}, '${day.astro.sunrise}', '${day.astro.sunset}')">Виж повече</button>
            <div class="hourly-container">
                ${day.hour.map(hour => `
                    <div class="hourly-item">
                        <img src="${hour.condition.icon}" alt="${hour.condition.text}">
                        <p class="hourly-element">${convertTo24Hour(hour.time.split(' ')[1])}</p>
                        <p class="hourly-element">${hour.temp_c}°C</p>
                    </div>
                `).join('')}
            </div>
        `;
        forecastItem.classList.add(dayWeatherConditionClass);

        weatherList.appendChild(forecastItem);
    });
}


function showDetails(date, tempC, maxTemp, minTemp, maxWind, avgHumidity, condition, uvIndex, precipChance, snowChance, sunrise, sunset) {
    document.getElementById('selectedDate').textContent = formatDate(date);
    document.getElementById('tempC').textContent = tempC + '°C';
    document.getElementById('maxTemp').textContent = maxTemp + '°C';
    document.getElementById('minTemp').textContent = minTemp + '°C';
    document.getElementById('avgTemp').textContent = ((maxTemp + minTemp) / 2).toFixed(1) + '°C';
    document.getElementById('maxWind').textContent = maxWind + ' kph';
    document.getElementById('avgHumidity').textContent = avgHumidity + '%';
    document.getElementById('condition').textContent = condition;
    document.getElementById('uvIndex').textContent = uvIndex;
    document.getElementById('precipChance').textContent = precipChance + '%';
    document.getElementById('snowChance').textContent = snowChance + '%';
    document.getElementById('sunrise').textContent = convertTo24Hour(sunrise);
    document.getElementById('sunset').textContent = convertTo24Hour(sunset);

    detailsTable.style.display = 'block';
    detailsTable.scrollIntoView({ behavior: 'smooth' });
}

function createRainyBackground() {
    let hrElement;
    const counter = 100;
    for (let i = 0; i < counter; i++) {
        hrElement = document.createElement('HR');
        if (i === counter - 1) {
            hrElement.className = 'thunder';
        } else {
            hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
            hrElement.style.animationDuration = (0.2 + Math.random() * 0.3) + 's';
            hrElement.style.animationDelay = Math.random() * 5 + 's';
        }
        document.body.appendChild(hrElement);
    }
}

function removeRainyBackground() {
    const hrElements = document.querySelectorAll('hr');
    hrElements.forEach(hr => hr.remove());
}

async function getCityName(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=bg`);
    const data = await response.json();
    return data.address.city;
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const city = await getCityName(lat, lon);
                citySelect.value = city;
                fetchWeather(city);
            } catch (error) {
                console.error(error);
                weatherList.innerHTML = '<p>Грешка при получаване на данни за местоположението.</p>';
            }
        }, (error) => {
            console.error(error);
            weatherList.innerHTML = '<p>Грешка при получаване на местоположението.</p>';
        });
    } else {
        weatherList.innerHTML = '<p>Геолокацията не се поддържа от този браузър.</p>';
    }
}

citySearch.addEventListener('input', filterCities);
citySelect.addEventListener('change', () => {
    const selectedCity = citySelect.value;
    fetchWeather(selectedCity);
});

filterCities();
fetchWeatherByLocation();


