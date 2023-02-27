this.apiURL = 'http://localhost:8080/api/';
var url = window.location.href
var urlsplit = url.split("session=");
var id = urlsplit[1];

try {

  const body = new URLSearchParams({
    session:id
  })

  fetch(apiURL + "finishCheckout", {
    method:'POST',
    body: body
  }).then(res=>res.json())
  .then(json=> { location = json.url })

} catch (e) {

}
