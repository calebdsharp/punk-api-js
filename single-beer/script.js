const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');

const header = document.createElement('div');
header.setAttribute('class', 'header');

app.appendChild(header);
app.appendChild(container);



let params = (new URL(document.location)).searchParams;
let id = params.get("id");

console.log(id);

fetch('https://api.punkapi.com/v2/beers/' + id)
.then(
  function(response) {
    if(response.status != 200) {
      console.log('Something went wrong. Status code ' + response.status);
      return;
    }

    response.json().then(function(beer) {
      beer = beer[0];
      document.title = beer.name;

      const beerName = document.createElement('h1');
      beerName.setAttribute('class', 'beerName');
      beerName.textContent = beer.name;

      header.appendChild(beerName);

      const beerTagline = document.createElement('h3')
      beerTagline.setAttribute('class', 'beerTagline')
      beerTagline.textContent = `"${beer.tagline}"`;

      header.appendChild(beerTagline)

      const beerDate = document.createElement('p')
      beerDate.setAttribute('class', 'beerDate')
      beerDate.textContent = `First Brewed: ${beer.first_brewed}`;

      container.appendChild(beerDate)


      const beerDescription = document.createElement('p');
      beerDescription.setAttribute('class', 'beerDescription');
      beerDescription.textContent = `Description: ${beer.description}`;

      beerDate.appendChild(beerDescription);

      const beerPairing = document.createElement('p')
      beerPairing.setAttribute('class', 'beerPairing')
      beerPairing.textContent = `Food Pairing: ${beer.food_pairing}`;

      beerDescription.appendChild(beerPairing)

      const beerPic = document.createElement('img')
      beerPic.setAttribute('class', 'beerPic')
      beerPic.src = beer.image_url;

      container.appendChild(beerPic)

    });
  })
.catch(function(err) {
  console.log('Fetch error', err);
});
