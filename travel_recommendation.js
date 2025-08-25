const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const result = document.getElementById('result');

function search() {

  const Input = document.getElementById('searchInput').value.toLowerCase();

   if(Input === 'temples' || Input==='beaches' || Input==='countries')
   {
  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        const recommendations = data[Input];

        result.innerHTML = `<h1>Recommendations</h1>`;

        if (Input === 'countries') {
            const container = document.createElement('div');
            container.className = "recommendations";
          recommendations.forEach(recommended => {
            recommended.cities.forEach(city => {
              const card = document.createElement('div');
              card.className = "card";
              const options= {timeZone: city.TimeZone , hour12: true , hour:'numeric' , minute:'numeric' , second: 'numeric'};
              const localTime = new Date().toLocaleTimeString('en-US' , options);
              card.innerHTML = 
               `<img src="${city.imageUrl}" alt="${city.name}">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
                <button>Visit</button>
                <div class="time">
                <p>${localTime}</p>
                </div>`;
              container.appendChild(card);
            });
          });
          result.appendChild(container);
        } 
        else {
          const container = document.createElement('div');
          container.className = "recommendations";
          recommendations.forEach(recommended => {
            const card = document.createElement('div');
            card.className = "card";
             const options= {timeZone: recommended.TimeZone , hour12: true , hour:'numeric' , minute:'numeric' , second: 'numeric'};
              const localTime = new Date().toLocaleTimeString('en-US' , options);
            card.innerHTML = 
              `<img src="${recommended.imageUrl}" alt="${recommended.name}">
              <h3>${recommended.name}</h3>
              <p>${recommended.description}</p>
              <button>Visit</button>
               <div class="time">
                <p>${localTime}</p>
                </div>`;
              container.appendChild(card);
          });
           result.appendChild(container);
        }
    })
    .catch(error => {
      console.error('Error:', error);
      result.innerHTML = 'An error occurred when fetching data.';
    });
    }
    else 
    {
        result.innerHTML = `<h1>Recommendations not found.</h1>`;
    }
}

searchBtn.addEventListener('click', search);

function clear()
{
  result.innerHTML = "";
  document.getElementById('searchInput').value = "";
}

clearBtn.addEventListener('click' , clear);