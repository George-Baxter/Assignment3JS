const button = document.getElementById('getCharacter');
const characterInfo = document.getElementById('characterInfo');
const characterName = document.getElementById('characterName');
const characterImg = document.getElementById('characterImg');

const apiUrl = 'https://rickandmortyapi.com/api/character';
/* This function gets a random character from the Rick and Morty API
    and updates the character card for display */
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

        // Updating character card
        characterImg.src = characterData.image;
        characterName.textContent = characterData.name;
        characterInfo.innerHTML = `Status: ${characterData.status} <br>
        Species: ${characterData.species} <br>
        Gender: ${characterData.gender} <br>
        Location: ${characterData.location.name} <br>
        Number of Episodes appeared in: ${characterData.episode.length}`;
    } catch (error) {
        console.error('Error fetching character data:', error);
        characterInfo.innerHTML = 'Could not receive character data.';
    }
}
// Displaying a character on page load
getRandCharacter();
// Button click handler
button.addEventListener('click', getRandCharacter);