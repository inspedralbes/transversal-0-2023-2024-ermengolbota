

/**
 * Afegeix la funcionalitat de jugar. 
 * És a dir, afegeix listener als botons per que quan es cliqui detectar el valor de l'any i 
 * guardar-lo al Local storage juntament amb el títol de la peli.
 * @param {HTMLDivElement}  card  - La targeta de que té els 4 butons de respostes
 */
function addPlayability(card ) {
    //Guardem totes les targetes en un array per mostrar i treure a voluntat

    // Afegim un event listener al div "respostes" que està dins de la card
   // const divRespostes = document.getElementById('respostes');
    const divRespostes = card.querySelector('#respostes');
    divRespostes.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            let selectedYear = event.target.innerText;

            // we look for the parent with the atribute data-title
            let parent = event.target.parentElement;
            while (!parent.hasAttribute('data-title')) {
                parent = parent.parentElement;
            }

            // we have the title of the current card, and we have the selected valur
            //so, we save it in the local storage
            const title = parent.getAttribute('data-title');
            localStorage.setItem(title, selectedYear);

            const cards = document.querySelectorAll('.movie-card');
            let currentCard = 0;
            cards.forEach((tmpCard, index) => {
                if (!tmpCard.classList.contains('ocult')) {
                    tmpCard.classList.add('ocult');
                    currentCard = index;
                }
            });
            //we show the next card
            if (cards[currentCard + 1]) {
                cards[currentCard + 1].classList.remove('ocult');
            }else {
                //game is finished
                //we show the results
                const results = document.getElementById('resultats');
                results.classList.remove('ocult');
                let ul= document.createElement('ul');
                //get all the elements from local storage and an add to llistatRespostes 
                //TODO: sort the list by the order user has played
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key);
                
                    // Crea un element de llista (<li>) per a cada clau i valor
                    const li = document.createElement('li');
                    li.innerHTML = `${key}: <span>${value}</span>`;
                    // Afegeix l'element de llista a la llista no ordenada
                    ul.appendChild(li);
                }   
                results.appendChild(ul);
           }
            
        }
    });

    const cards = document.querySelectorAll('.movie-card');
    //Once everything is done, we show the first card and hide the rest
    cards.forEach(card => card.classList.add('ocult'));
    cards[0].classList.remove('ocult');
}