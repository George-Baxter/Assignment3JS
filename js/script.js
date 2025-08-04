const button = document.getElementById('getCharacter');
const characterInfo = document.getElementById('characterInfo');
const characterName = document.getElementById('characterName');
const characterImg = document.getElementById('characterImg');
const jokeText = document.getElementById('jokeText');

const apiUrl = 'https://rickandmortyapi.com/api/character';
/* This function gets a random character from the Rick and Morty API
    and updates the character card for display */
// API key for OpenWeatherMap
const weatherApi = `0735caea811b5cd9ce6a530e8faa946e`;
// URL for Dad Joke API
const dadJokeURL = `https://icanhazdadjoke.com/`;
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
        // Getting random dad joke
        const randomJoke = await getDadJoke(); 

        // Updating character card
        characterImg.src = characterData.image;
        characterName.textContent = characterData.name;
        characterInfo.innerHTML = `Status: ${characterData.status} <br>
        Species: ${characterData.species} <br>
        Gender: ${characterData.gender} <br>
        Location: ${characterData.location.name} <br>
        Number of Episodes appeared in: ${characterData.episode.length} <br>
        Weather: ${earthWeather}`;
        // Updating joke section
        jokeText.innerHTML = ''; // Clear previous joke
        jokeText.textContent = randomJoke;
        
    } catch (error) {
        console.error('Error fetching character data:', error);
        characterInfo.innerHTML = 'Could not receive character data.';
        jokeText.textContent = `Joke could not be loaded.`;
    }

}

// Function to get a random dad joke
async function getDadJoke() {
    try {
        const jokeResponse = await fetch(dadJokeURL, {
            headers: {
                'Accept': 'application/json', 
                'User-Agent': 'Rick and Morty JS Assignment (https://github.com/George-Baxter/Assignment3JS)' // Adding User-Agent header
            }
        });
        const jokeData = await jokeResponse.json();
        return jokeData.joke;
    } catch (error) {
        console.error('Error fetching dad joke:', error);
        return 'Could not fetch dad joke.';
    }
}
// Function to get weather data from Barrie
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