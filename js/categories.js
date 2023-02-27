class Categories {
  constructor() {
    this.apiURL = 'http://localhost:8080/api/';
  }

  async getSingleCategory(slug) {

    let response = await fetch(this.apiURL + "category?category=" + slug);
    let data = await response.json();

      $(data).each(function (index, product) {
        $('.products').append(

          '<div class="col"><div class="card shadow-sm container-fluid"><img class="img-fluid thumbnail-img" src="' +
          product.image + '" class="img-fluid">' + '<div class="card-body"><h1>' + product.title + '</h1><p class="card-text description">' +
          product.description + '</p><div class="d-flex justify-content-between align-items-center"' +
          '><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-dark"><a class="dropdown-item" href="/product.html?productid='
          + product.id + '">View</a></button></div><small class="text-muted">' + product.artist + ', ' + product.year + '</small></div></div></div></div>'

        )
      });
    }
}
