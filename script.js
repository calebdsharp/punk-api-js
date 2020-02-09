const app = document.getElementById('root')

const logo = document.createElement('img')
logo.setAttribute('id', 'bottleImg')
logo.src = 'beer-bottle.png'
logo.style.width = '300px'
logo.style.height = '300px'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo);
app.appendChild(container);

fetch('https://api.punkapi.com/v2/beers/')
  .then(
    function(response) {
      if(response.status != 200) {
        console.log('Something went wrong. Status code: ' + response.status);
        return;
      }

      response.json().then(function(data) {
        data.forEach(beer => {
          const card = document.createElement('div')
          card.setAttribute('class', 'card')

          const h1 = document.createElement('h1')
          h1.textContent = beer.name;

          const beerPic = document.createElement('img');
          beerPic.setAttribute('class', 'beerPic')
          beerPic.src = beer.image_url;


          h1.appendChild(beerPic);

          const p = document.createElement('p')
          beer.description = beer.description.substring(0, 300);
          p.textContent = `${beer.description}...`;

          const a = document.createElement('a');
          a.href = './single-beer?id=' + beer.id;
          container.appendChild(a);
          a.appendChild(card)

          card.appendChild(h1)
          card.appendChild(p)

        });
      });
    })
  .catch(function(err) {
    console.log('Fetch error', err);
  });
