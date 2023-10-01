// Replace these URLs with your JSON data source
const jsonDataUrl = './pelis.json';

fetch(jsonDataUrl)
    .then(response => response.json())
    .then(data => {
        const movieCardsContainer = document.getElementById('pelis');

        data.forEach(movie => {
            const card = createMovieCard(movie);
            movieCardsContainer.appendChild(card);
            addPlayability(card);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));

    /**
     * Creem la targeta amb la peli. Cada targeta té un atributa "data-title" amb el títol de la peli
     * Ara mateix posem tots els atributs del json a la targeta, però només mostrem el títol i el poster
     * @param {movie} La peli amb els camps title, posterUrl, director, releaseYear i genre
     * @returns 
     */
    function createMovieCard(movie) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('movie-card');
        cardDiv.setAttribute('data-title', movie.title);
    
        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;
        //Adds an atribute with the title of the movie

        const posterImage = document.createElement('img');
        posterImage.src = movie.posterUrl;
        posterImage.alt = `${movie.title} Poster`;
    
        const directorElement = document.createElement('p');
        directorElement.textContent = `Director: ${movie.director}`;
        directorElement.classList.add('ocult'); //ocultem el director
    
        const releaseYearElement = document.createElement('p');
        releaseYearElement.textContent = `Release Year: ${movie.releaseYear}`;
        releaseYearElement.classList.add('ocult'); //ocultem l'any  de la peli
    
        const genreElement = document.createElement('p');
        genreElement.textContent = `Genre: ${movie.genre.join(', ')}`;
        genreElement.classList.add('ocult'); //ocultem el gènere de la peli
    
        const buttonsElement = createButtons(movie.releaseYear);

        cardDiv.appendChild(titleElement);
        cardDiv.appendChild(posterImage);
        cardDiv.appendChild(directorElement);
        cardDiv.appendChild(releaseYearElement);
        cardDiv.appendChild(genreElement);
        cardDiv.appendChild(buttonsElement);
    
        return cardDiv;
}

/**
 * It recive a number (year) and it create 4 buttons, 3 of them are randomly near and 1 is correct
 * @param {int} number - it recives the year of the movie 
 * @returns a div with the buttons 1, 2, 3, 4;
 */
function createButtons(number) {
    //Creates the container
    const buttonsElement = document.createElement('div');
    buttonsElement.id='respostes';
    
    //Creates the 4 buttons
    const b1 = document.createElement('button');
    b1.textContent = number;
    const b2 = document.createElement('button');
    b2.textContent = getRandomYear(number);
    const b3 = document.createElement('button');
    b3.textContent = getRandomYear(number);
    const b4 = document.createElement('button');
    b4.textContent = getRandomYear(number);

    //shuffles the buttons
    const array = [b1, b2, b3, b4]; 
    array.sort(() => Math.random() - 0.5);  

    //Adds the "shufled" buttons to the container and returns it  
    buttonsElement.appendChild(array[0]);
    buttonsElement.appendChild(array[1]);
    buttonsElement.appendChild(array[2]);
    buttonsElement.appendChild(array[3]);

    return buttonsElement;
}



/**
 * Generates a random year within a specified range around a given year.
 *
 * @param {number} releaseYear - The target year around which to generate a random year.
 * @returns {number} A random year within a range of 10 years before and after the releaseYear.
 */
function getRandomYear(releaseYear) {
    const range = 10; // Adjust these value based on your preferences
    const minYear = releaseYear - range; 
    const maxYear = releaseYear + range;
    
    // Generate a random year within the specified range
    return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
}