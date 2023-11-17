const API_KEY = '236c4b88131b4888ae662754231711';
const API_URL = 'https://api.weatherapi.com/v1/current.json?';
const searchBox = document.querySelector('.searchBox');

searchBox.addEventListener("keypress", async function searchCity(e, city) {
  const card = document.querySelector('.card');
  const errorWrap = document.querySelector('.errorWrap');
  if(e.key === 'Enter' && e.target.value) {
    city = searchBox.value;
    const response = await fetch(API_URL + 'key=' + API_KEY + '&q=' + city);
    const data = await response.json();
    searchBox.disabled=true;
    console.log(data);
    card.style.display = 'block';
    errorWrap.style.display = 'none';
    card.style.display = 'flex';
    searchBox.disabled=false;
    searchBox.value = '';
    let location = document.querySelector('.location');
    location.textContent = data.location.name;
    const date1 = document.querySelector('.date');
    const localtime = data.location.localtime.split(' ')
    const [date, time] = localtime;
    const now = new Date(date)
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    date1.textContent = formattedDate;
    const time2 = document.querySelector('.time');
    time2.textContent = time;
  } else {
    errorWrap.style.display = 'block';
    card.style.display = 'none';
  }
});

