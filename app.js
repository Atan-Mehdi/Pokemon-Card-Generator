const categories = ['Normal', 'Fighting', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy', 'Stellar', 'Unknown'];

const inputField = document.getElementById('category');
const dropdownList = document.getElementById('dropdownList');


categories.forEach(category => {
    let option = document.createElement('div');
    option.textContent = category;
    option.onclick = function () {
        inputField.value = category;
        dropdownList.classList.remove('show');
    };
    dropdownList.appendChild(option);
});


inputField.addEventListener('click', function () {
    dropdownList.classList.toggle('show');
});


window.onclick = function (event) {
    if (!event.target.matches('#category')) {
        dropdownList.classList.remove('show');
    }
}


function getUniqueRandomNumbers(min, max, limit) {
    let uniqueNumbers = new Set();

    while (uniqueNumbers.size < limit) {
        let randomNumber = getRandomNumber(min, max);
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



async function displayCards() {
    document.querySelector('.cards-container').innerHTML = '';
    let categoryName = document.querySelector('#category').value;
    let categoryNumber = 0;

    for (let i = 0; i < categories.length; i++) {
        if (categories[i] == categoryName) {
            categoryNumber = i + 1;
        }
    }


    let number = document.querySelector('#numberofcards').value;

    if (categoryNumber == '' || number == '') {
        alert('Please the input fields');
    }

    if (number > 100) {
        alert('Please enter number of below 100');
    }

    const response = await axios.get('https://pokeapi.co/api/v2/type/' + categoryNumber + '/');
    const allCards = response.data.pokemon;

    let randomNumbers = getUniqueRandomNumbers(0, allCards.length - 1, number);
    console.log(randomNumbers.length);

    for (let i = 0; i < randomNumbers.length; i++) {
        let image = await axios.get('https://pokeapi.co/api/v2/pokemon/' + randomNumbers[i] + '/');
        let img = document.createElement('img');
        let url = image.data.sprites.other.home.front_default
        img.setAttribute('src', url);
        img.setAttribute('class', 'avatar');

        let name = document.createElement('div');
        name.setAttribute('class', 'cardName');
        name.innerHTML = allCards[randomNumbers[i]].pokemon.name;

        let div = document.createElement('div');
        div.setAttribute('class', 'cards');
        div.appendChild(img);
        div.appendChild(name);

        document.querySelector('.cards-container').appendChild(div);
        // console.log(allCards[randomNumbers[i]].pokemon.name);


    }
}