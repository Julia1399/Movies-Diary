function serializeForm(formNode) {
  // массив обьектов с именем и значением из поле формы
    const { elements } = formNode
    const data = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
        const { name, value } = element;
        return { name, value }
        })
    // запись колличества просмотренных фильмов и жанров в personalMovieDB
    if (iteration === 0){
        numberOfFilms = data[0].value;
        for (i = 0; i < 3; i++){
          personalMovieDB.genres[i] = data[i+1].value;
      }
    } 
    personalMovieDB.count = numberOfFilms;
    // вызов функции всплывающего окна
    if (iteration === 0){
    countStatus(numberOfFilms)
    }
    // запись фмльма и его оценки в personalMovieDB
    if (iteration === 1){
        personalMovieDB.movies[data[4].value] = data[5].value;
        //проверка checkbox
        if (document.querySelector('.checkbox').checked){
          console.log('Добавляем любимый фильм');
          arrFav.push(data[4].value);
        }
        // сортировка фильмов по алфавиту
        personalMovieDB.movies = Object.keys(personalMovieDB.movies).sort().reduce((r, k) => (r[k] = personalMovieDB.movies[k], r), {});
        btn.disabled = true;
        // удаление фильмов из списка для новой записи
        let items = document.querySelectorAll('.film-item');
        items.forEach(element => {
          element.remove();
        });
        let count = 0;
        // вставка в список фильмов
        for (key in personalMovieDB.movies){
          const filmHTML = `
            <li class="film-item">
              <div class="text">
                  <span class="filmName-${count}">${key}</span>
                  <span class="rate">${personalMovieDB.movies[key]}</span>
              </div>
              <button class="delete-btn">
                  <img class="del-img" src="img/del.png" alt="delete">
              </button>
            </li>`;
          document.querySelector('.list').insertAdjacentHTML('beforeend', filmHTML);
          arrFav.forEach(element => {
            // добавления класса к любимому фильму
            if (key === element){
              document.querySelector(`.filmName-${count}`).classList.add('fav-film');
            }
          });
          count++;
        }
        // добавления иконки к любимому фильму
      document.querySelectorAll('.fav-film').forEach(element => {
        element.insertAdjacentHTML('afterend', '<img class="fav-img" src = "img/fav.png" alt = "icon">');
      }); 
      // проверка статуса доступа
      if (personalMovieDB.privat === false){
        console.log(personalMovieDB);
      } 
      // удаление фильма по нажатию
      const deleteBtn = document.getElementsByClassName('delete-btn');
      for (i = 0; i<deleteBtn.length; i++){
        deleteBtn[i].addEventListener('click', (e) =>{
          const perent = e.target.parentElement.parentElement;
          perent.remove();
          const delFilm = perent.querySelector('span').textContent
          delete personalMovieDB.movies[delFilm];
          console.log(personalMovieDB)
        });
      }
    }
    // очистка формы
    applicantForm.reset() 
  }
  // фунуция всплывающего окна и блокировки фона
  function countStatus(num){
    document.querySelector(".popup").style.display = 'block';
    document.querySelector(".block").style.display = 'block';
    text = document.querySelector(".status")
    if (num < 10) {
        text.textContent = 'Просмотрено довольно мало фильмов';
    } else if (num >= 10 && num < 30) {
        text.textContent = 'Вы классический зритель';
    } else if (num >= 30) {
        text.textContent = 'Вы киноман';
    } else {
        text.textContent = 'Произошла ошибка';
    }
  }
  // функция закрытия всплывающего окна
  function closeFunc(){
    let question2 = document.querySelector(".question-2").style.display = 'contents';
    let list = document.querySelector(".list").style.display = 'flex';
    let question1 = document.querySelector(".question-1").style.display = 'none';
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".block").style.display = 'none';
    btn.setAttribute('disabled', true);
    iteration = 1;
  }
  
  // функция запрета отправки формы
  function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(applicantForm)
  }

  // функция, проверяющая заполненность полей
  function valueCheck(){
    if (inputFilm.value !== '' && inputRate.value !== ''){
        btn.disabled = false;
    }
    if (inputCount.value !== '' && inputGenre_1.value !== '' && inputGenre_2.value  !== '' && inputGenre_3.value  !== ''){
      btn.disabled = false;
  }
  }

  const applicantForm = document.getElementById('movies')
  var btn = document.querySelector('.btn');
  btn.disabled = true;
  let closeBtn = document.querySelector('.close');
  const inputCount = document.getElementById('1')
  const inputFilm = document.getElementById('2');
  const inputRate = document.getElementById('3');
  const inputGenre_1 = document.getElementById('4');
  const inputGenre_2 = document.getElementById('5');
  const inputGenre_3 = document.getElementById('6');
  applicantForm.addEventListener('mousemove', valueCheck);
  var numberOfFilms = '';
  var personalMovieDB = {
      count: numberOfFilms,
      movies: {},
      actors: {}, 
      genres: [], 
      privat: false
  }
  let arrFav = [];
  let iteration = 0;
  closeBtn.addEventListener('click', closeFunc);
  applicantForm.addEventListener('submit', handleFormSubmit);
  const deleteBtn = document.getElementsByClassName('delete-btn');
  