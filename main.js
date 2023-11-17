const API_KEY = '236c4b88131b4888ae662754231711';
const API_URL = 'https://api.weatherapi.com/v1/current.json?';
const searchBox = document.querySelector('.searchBox');
const loader = document.querySelector('.dot-pulse ');

//Event with callback function
searchBox.addEventListener("keypress", async function searchCity(e, city) {
  const card = document.querySelector('.card');
  const errorWrap = document.querySelector('.errorWrap');
  if(e.key === 'Enter' && e.target.value) {
    city = searchBox.value;
    //catch response from server
    const response = await fetch(API_URL + 'key=' + API_KEY + '&q=' + city);
    //The end of catch response from server
    //Checking for errors with status code
    //Page was not found Block
    if(response.status === 404) {
       errorWrap.style.display = 'block';
       errorWrap.textContent = 'Server can\'t find requested resource';
       card.style.display = 'none';
      loader.style.display = 'block';
      searchBox.value = '';
       return;
      //The end of Page was not found Block
      //Bad request from server checking
    } else if (response.status === 400) {
      errorWrap.style.display = 'block';
      errorWrap.textContent = 'Please enter correct name of city: ';
      card.style.display = 'none';
      loader.style.display = 'block';
      searchBox.value = '';
      return;
    }
    //The end of Bad request from server checking
    //The end of Checking for errors with status code
    //formatting from json into object
    const data = await response.json();
    searchBox.disabled=true;
    console.log(data);
    errorWrap.style.display = 'none';
    card.style.display = 'flex';
    searchBox.disabled=false;
    searchBox.value = '';
    //get data from server and show on the web-page
    let location = document.querySelector('.location');
    location.textContent = data.location.name+', '+data.location.country;
    const date1 = document.querySelector('.date');
    const localtime = data.location.localtime.split(' ')
    const [date, time] = localtime;
    const now = new Date(date)
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    date1.textContent = formattedDate;
    const time2 = document.querySelector('.time');
    time2.textContent = time;
    const mainCondImg = document.querySelector('.main-cond');
    mainCondImg.src =`https:${data.current.condition.icon}`;
    const temp = document.querySelector('.temp');
    temp.textContent = Math.round(data.current.temp_c) + '°c';
    const condition = document.querySelector('.cond');
    condition.textContent = data.current.condition.text;
    const temp_feels = document.querySelector('.temp-feels');
    temp_feels.textContent = data.current.feelslike_c + '°c' ;
    const humidity = document.querySelector('.humid-value');
    humidity.textContent = data.current.humidity + '%';
    const wind = document.querySelector('.wind-value');
    wind.textContent = data.current.wind_kph + 'kph';
    const country = document.querySelector('#country');
    //get data from server and show on the web-page
    //hide data
    country.style.display = 'none';
    loader.style.display = 'none';
    //The end of hide data
  } else {
    //if no data show error
    errorWrap.style.display = 'block';
    errorWrap.textContent = 'Please enter the name of the city and press enter to see the results';
    card.style.display = 'none';
    loader.style.display = 'block';
    return;
    //if no data show error the end
  }
});

//The end of Event with callback function

