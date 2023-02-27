class Products {
  constructor () {
    this.apiURL = 'http://localhost:8080/api/';
  }

  async getSingleProduct(id) {
    let response = await fetch(this.apiURL + "products/" + id);
    let data = await response.json();

    $('.breadcrumb').html(
      '<a class="breadcrumb-link" href="category.html?category='
      + data.style + '">' + toTitleCase(data.style) + '</a><span class="sep">></span>' + data.title
    );
    $('.product_image').html('<img src="' + data.image + '" class="img-fluid">');
    $('.product_title').html(data.title);
    $('.product_description').html('<p>' + data.description + '</p>');

    $('.product_name').html(data.title);
    $('.product_price').html(data.price);
    $('.product_artist').html(data.artist);
    $('.product_year').html(data.year);
    $('.product_dimensions').html(data.dimensionX + " X " + data.dimensionY);
    $('.product_medium').html(data.medium);
    $('.product_style').html(data.style);
    $('.product_condition').html(data.condition);
    $('.product_seller').html(data.seller);
  }

  async getNewestProducts(limit) {
    let response = await fetch(this.apiURL + "products?limit=" + limit);
    let data = await response.json();

    $(data).each(function (index, product) {
      $('.newest').append(
        '<div class="col"><div class="card shadow-sm container-fluid"><img class="img-fluid thumbnail-img" src="' +
        product.image + '" class="img-fluid">' + '<div class="card-body"><p class="card-text overflow">' +
        product.description + '</p><div class="d-flex justify-content-between align-items-center"' +
        '><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-dark"><a class="dropdown-item" href="/product.html?productid='
        + product.id + '">View</a></button></div><small class="text-muted">' + product.artist + ', ' + product.year + '</small></div></div></div></div>'
      )
    });
  }

}
