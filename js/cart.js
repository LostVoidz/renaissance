const productCardTemplate = document.querySelector("[data-cart-template]");
const productCardContainer = document.querySelector("[data-cart-container]");
apiURL = 'http://localhost:8080/api/';
try {
  fetch(apiURL + 'my/cart/')
            .then(response => response.json())
            .then(data => {

              for (var i = 0; i < data.length; i++) {
                fetch(apiURL + 'products/' + data[i])
                .then(response => response.json())
                .then(data => {
                  product = data;
                  card = productCardTemplate.content.cloneNode(true).children[0];
                  const img = card.querySelector("[data-img]");
                  const title = card.querySelector("[data-title]");
                  const price = card.querySelector("[data-price]");
                  const href = card.querySelector("[data-link]");
                  const artist = card.querySelector("[data-artist]");
                  const seller = card.querySelector("[data-seller]");
                  const del = card.querySelector("[data-del]")
                  const wish = card.querySelector("[data-wish]");
                  href.href = "/product.html?productid=" + product.id;
                  title.textContent = product.title;
                  price.textContent = '$' + product.price.toFixed(2);
                  artist.textContent = product.artist;
                  seller.textContent = product.seller;
                  img.src = product.image;
                  wish.setAttribute('onclick', "AddWish(" + product.id + ")")
                  del.setAttribute('onclick', "DeleteCart(" + product.id + ")")
                  productCardContainer.append(card);

                })
              }
})
} catch (e) {

}
