import './styles/main.scss';
import { formatInTimeZone } from 'date-fns-tz';
import { cities } from './cities.js';


const app = document.getElementById('app');
const title = document.createElement('h1');
title.textContent = 'City Times';
app.appendChild(title);

const list = document.createElement('ul');
list.className = 'city-list';

const now = new Date();
cities.forEach(city => {
  const formatted = formatInTimeZone(now, city.zone, 'PP pp', { locale: city.locale });
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="city-name">${city.name}</div>
    <div class="city-time">${formatted}</div>
  `;
  list.appendChild(li);
});

app.appendChild(list);