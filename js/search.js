const productCardTemplate = document.querySelector("[data-product-template]");
const productCardContainer = document.querySelector("[data-product-card-container]");
const searchInput = document.querySelector("[data-search]");
apiURL = 'http://localhost:8080/api/';

let products = [];

try {
  fetch(apiURL + "products")
  .then(response => response.json())
  .then(data => {
    products = data.map(product => {
      card = productCardTemplate.content.cloneNode(true).children[0];
      const img = card.querySelector("[data-img]");
      const title = card.querySelector("[data-title]");
      const description = card.querySelector("[data-description]");
      const href = card.querySelector("[data-link]")
      const info = card.querySelector("[data-info]")
      href.href = "/product.html?productid=" + product.id;
      title.textContent = product.title;
      description.textContent = product.description;
      info.textContent = product.artist + ", " + product.year;
      img.src = product.image;
      productCardContainer.append(card);
      return {title: product.title, description: product.description, element: card};
    });

    if (searchInput.value != null) {
      const value = searchInput.value.toLowerCase();
      filter(value);
    }

  });
} catch (e) {

}

var url = window.location.href
var urlsplit = url.split("search=");
var slug = urlsplit[1];
searchInput.value = slug;
try {

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    filter(value);
  });

    function filter(fVal) {
      products.forEach(product => {
        const isVisible = product.title.toLowerCase().includes(fVal) || product.description.toLowerCase().includes(fVal);
        product.element.classList.toggle("visually-hidden", !isVisible);
      });
    }
    
} catch (e) {

}
