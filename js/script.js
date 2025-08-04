const button = document.getElementById('getCharacter');
const characterInfo = document.getElementById('characterInfo');
const characterName = document.getElementById('characterName');
const characterImg = document.getElementById('characterImg');

const apiUrl = 'https://rickandmortyapi.com/api/character';
/* This function gets a random character from the Rick and Morty API
    and updates the character card for display */
// API key for OpenWeatherMap
const weatherApi = `0735caea811b5cd9ce6a530e8faa946e`;

async function getRandCharacter() {
    try {
        // Getting total number of characters from API and generating random ID (API IDs start from 1)
        const response = await fetch(apiUrl);
        const data = await response.json();
        const totalCharacters = data.info.count;
        const randomId = Math.floor(Math.random() * totalCharacters) + 1;

        // Getting character data
        const characterResponse = await fetch(`${apiUrl}/${randomId}`);
        const characterData = await characterResponse.json();

        let earthWeather = '';
        if (characterData.location.name.includes(`Earth`)) {
            earthWeather = await fetchWeather();
        } else {
            earthWeather = `Character is not on Earth... Weather unknown.`;
        }

        // Updating character card
        characterImg.src = characterData.image;
        characterName.textContent = characterData.name;
        characterInfo.innerHTML = `Status: ${characterData.status} <br>
        Species: ${characterData.species} <br>
        Gender: ${characterData.gender} <br>
        Location: ${characterData.location.name} <br>
        Number of Episodes appeared in: ${characterData.episode.length} <br>
        Weather: ${earthWeather}`;
    } catch (error) {
        console.error('Error fetching character data:', error);
        characterInfo.innerHTML = 'Could not receive character data.';
    }

}

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barrie,ON,CA&appid=${weatherApi}&units=metric`);
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            return `${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
        } else {
            return `Weather data not found`;
        }
    } catch (error) {
        console.error('Weather api error:', error);
        return 'Could not fetch weather data.';
    }
}
// Displaying a character on page load
getRandCharacter();
// Button click handler
button.addEventListener('click', getRandCharacter);