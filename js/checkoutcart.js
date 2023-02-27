apiURL = 'http://localhost:8080/api/';
const checkoutBtn = document.getElementById("checkout");

try {

  checkoutBtn.addEventListener("click", () => {
    fetch(apiURL + "checkout", {
      method:'POST'
    }).then(res=>res.json())
    .then(json=> {
      location = json.url

     })
  })

} catch (e) {

}
