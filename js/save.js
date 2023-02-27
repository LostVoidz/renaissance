const productCardTemplate = document.querySelector("[data-save-template]");
const productCardContainer = document.querySelector("[data-save-container]");
apiURL = 'http://localhost:8080/api/';

try {

  fetch(apiURL + 'my/wish/')
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
                        const artist = card.querySelector("[data-artist]");
                        const seller = card.querySelector("[data-seller]");
                        const href = card.querySelector("[data-link]");
                        const del = card.querySelector("[data-del]")
                        const cart = card.querySelector("[data-cart]");
                        href.href = "/product.html?productid=" + product.id;
                        title.textContent = product.title;
                        price.textContent = '$' + product.price.toFixed(2);
                        img.src = product.image;
                        cart.setAttribute('onclick', "AddCart(" + product.id + ")")
                        del.setAttribute('onclick', "DeleteWish(" + product.id + ")")
                        productCardContainer.append(card);

                })
              }
      })
} catch (e) {

}
