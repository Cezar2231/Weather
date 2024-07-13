const citySearch = document.getElementById('citySearch');
const citySelect = document.getElementById('citySelect');
const weatherList = document.getElementById('divElement');
const detailsTable = document.getElementById('detailsTable');

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


// Function to filter and display cities in the select element
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

// Function to fetch and display weather data
async function fetchWeather(city) {
    weatherList.innerHTML = '';

    const baseUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(city)}&days=3&lang=bg`;

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

    function formatDate(inputDate) {
        const parts = inputDate.split('-');
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }

    let currentDate = formatDate(new Date().toJSON().slice(0, 10));

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
            <p class="date element">(${formatDate(day.date)})</p>
            <p class="element">${day.day.mintemp_c}°C</p>
            <p class="element">${day.day.maxtemp_c}°C</p>
            <p class="element">${day.day.condition.text}</p>
            <img class="element icon" src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <button class="btn" onclick="showDetails('${day.date}', ${day.day.avgtemp_c}, ${day.day.maxtemp_c}, ${day.day.mintemp_c}, ${day.day.maxwind_kph}, ${day.day.avghumidity}, '${day.day.condition.text}', ${day.day.uv}, ${day.day.daily_chance_of_rain}, ${day.day.daily_chance_of_snow}, '${day.astro.sunrise}', '${day.astro.sunset}')">Виж повече</button>
        `;
        weatherList.appendChild(forecastItem);
    });
}

 // Function that convers AM and PM into 24 hours
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

function showDetails(date, tempC, maxTemp, minTemp, maxWind, avgHumidity, condition, uvIndex, precipChance, snowChance, sunrise, sunset) {
    document.getElementById('selectedDate').textContent = date;
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

    detailsTable.style.display = 'flex';
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
