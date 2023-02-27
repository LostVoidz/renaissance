apiURL = 'http://localhost:8080/api/';
var btn = document.getElementById('login-btn')
var form = document.getElementById('loginForm')
var emailF = document.getElementById('inputEmail')
var passwordF = document.getElementById('inputPassword')

async function Login(e, p) {

  try {

    localStorage.clear()

    const body = new URLSearchParams({
      "email":e,
      "password":p
    })

    const response = await fetch(apiURL + "login/", {
                method:'POST',
                body: body
            })

            if (response.ok) {
              location = "index.html"
            } else {
              $(".loginMsg").html(
              '<div class="alert alert-danger" role="alert">Error Logging In: Please Check Your Email and Password.</div>'
            );
            }

  } catch (e) {

  }
}


btn.addEventListener("click", () => {

  try {
  email = emailF.value
  pswd = passwordF.value
  Login(email, pswd)

  } catch (e) {

  }
})

try {

  function handleForm (event) { event.preventDefault(); }
  form.addEventListener('submit', handleForm);
  
} catch (e) {

}
