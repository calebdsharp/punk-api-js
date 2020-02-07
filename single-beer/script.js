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

var req = new XMLHttpRequest();
req.open('GET', 'https://api.punkapi.com/v2/beers/' + id, true);
req.onload = function() {
  const beer = JSON.parse(this.response)[0];
  console.log(beer);
  if (req.status >= 200 && req.status < 400) {
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

  } else {
    const errMessage = document.createElement('marquee')
    errMessage.textContent = 'Something isn\'t right...'
    app.appendChild(errMessage)
  }
};
req.send();
