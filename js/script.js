/* eslint-disable strict */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const marvelHeroes = () => {
        const container = document.querySelector('.heroes .container'),
            select = document.querySelector('select'),
            moviesList = new Set(),
            cardsQuantity = document.querySelector('.col');


        const createHero = hero => {

            const {
                name,
                species,
                gender,
                birthDay,
                deathDay,
                status,
                actors,
                photo,
                movies
            } = hero;

            const movieList = movies ? movies.join("<br>") : 'No movies';

            const photoPath = './' + photo;
            const div = document.createElement('div');
            div.classList.add('hero-element');
            div.innerHTML = `  
              <div class="wrap">  
              <div class="first">               
              <img class="heroimg" src='${photoPath}'> <br>
              <p> <span class="name">NAME: </span> ${name} <br>
              <span>SPECIES: </span>${species} <br>
              <span>GENDER: </span>${gender} <br>
              <span>BIRTHDAY: </span>${birthDay} <br>
              <span>DEATHDAY: </span>${deathDay} <br>
              <span>STATUS: </span>${status} <br>
              <span>ACTORS: </span> <span class="actor">${actors}</span> <br>            
              </p>
    
              <div class='image'> 
              <br>       
              <div id="im"><img src="img/green.png"/> 
              <span class="foo">ACCEPT</span> 
              </div>        
              </div>          
              </div>
    
              <div class="second">
              <p class="movie">
              <span class="movies">MOVIES: </span><br> <span class="list">${movieList}</span></p>
              <span class="fooo">DECLINE</span>
              <div class='icon'>             
              <div id="ima">             
               <img class="red" src="img/red.png"/> 
              </div>
              </div>
              </div>        
              `;
            container.append(div);
        };


        const renderByMovie = (value = '. . .', heroes) => {

            const heroesMatchesFilter = item =>
            // если в селекте ". . ." то всех героев выводим
                ((item.movies) && (item.movies.includes(value))) || (value === '. . .')
                ;

            const filteredHeroes = heroes.filter(heroesMatchesFilter);
            cardsQuantity.textContent = `Cards: ${filteredHeroes.length}`; //cards quantity

            //clear cards' container/delete cards when filter
            container.textContent = '';

            filteredHeroes.forEach(item => {
                createHero(item);  // create filtered cards
            });

        };


        /*  create  movie list in select & show all cards  */
        const fillSelectAndShowAllCards = heroes => {
            heroes.forEach(item => {
                if (item.movies) {
                    item.movies.forEach(item => {
                        moviesList.add(item); // получаем список всех фильмов в Set
                    });
                }
                createHero(item);  // рендерим на странице начальные 50 карточек
            });


            moviesList.forEach((value, key) => {
                const opt = document.createElement('option');
                opt.innerHTML = key;
                select.append(opt); // в select кидаем список всех фильмов
            });
        };


        // главная функция, рендерит начальный вид страницы и отслеживает изменение фильтра select
        const renderData = heroes => {

            fillSelectAndShowAllCards(heroes);
            select.addEventListener('change', () => {
                renderByMovie(select.value, heroes);
            });

        };

        //получаем данные из json и отправляем в renderData
        const getData = url => {
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => renderData(data))
                .catch(err => console.log(err));
        };

        getData('./dbHeroes.json');

    };

    marvelHeroes();



});
