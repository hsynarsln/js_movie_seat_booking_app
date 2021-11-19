const notOccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
// console.log(notOccupiedSeats);
const movieSelectBox = document.querySelector('#movie');
const count = document.getElementById('count');
const film = document.getElementById('film');
const total = document.getElementById('total');
const container = document.querySelector('.container');
let filmPrice;

window.addEventListener('load', () => {
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  //?get last selectedindexes, and last selected movie index and price
  displayUI();
  updateMovieInfo(price);
  //?set last selected movie index and price
  setMovieDataToStorage(movieSelectBox.selectedIndex, price);
});

function setMovieDataToStorage(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//? localstorage'da var olan verilerin ekrana basılması
const displayUI = () => {
  const selectedSeatsFromStorage = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeatsFromStorage);
  if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0) {
    notOccupiedSeats.forEach((seat, index) => {
      if (selectedSeatsFromStorage.indexOf(index) > -1) {
        //? true dönüyor ise
        seat.classList.add('selected');
      }
    });
  }

  // Access movie index
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  // Check if data is in local storage
  if (selectedMovieIndex !== null) {
    movieSelectBox.selectedIndex = selectedMovieIndex;
  }

  // Access ticket price
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  // Check is data is in local storage
  if (selectedMoviePrice !== null) {
    filmPrice = +selectedMoviePrice;
  }

  updateMovieInfo(filmPrice);
};

// movieSelectBox.onchange = () => {} //? daha eski bir kullanım
movieSelectBox.addEventListener('change', e => {
  let price = +e.target.value;
  setMovieDataToStorage(e.target.selectedIndex, e.target.value);
  updateMovieInfo(price, e);
  // console.log(e.target.value);
});

const updateMovieInfo = filmPrice => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected'); //?.class .class matches any elements of class .class that are descendants of another element with the class .class.class matches any element with both classes.

  const seatsIndexArray = [...selectedSeats].map(seat => [...notOccupiedSeats].indexOf(seat)); //? --> seçmiş olduğumuz koltuklar boş olan koltukların içerisinde ise onun index'ini alıyoruz. (occupied olamayanlara göre selected olanların indexini tutan array)
  // console.log(seatsIndexArray);
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexArray));

  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split('(')[0];
  // film.innerText = movieSelectBox[e.target.selectedIndex].innerText.split('(')[0];
  total.innerText = selectedSeatCount * filmPrice;
};

container.addEventListener('click', e => {
  // console.log(e.target);
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});
