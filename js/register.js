apiURL = 'http://localhost:8080/api/';
var firstName = document.getElementById('firstName')
var middleName = document.getElementById('middleName')
var lastName = document.getElementById('lastName')
var email = document.getElementById('email')
var emailConf = document.getElementById('emailConf')
var password = document.getElementById('password')
var passwordConf = document.getElementById('passwordConf')
var username = document.getElementById('username')
var type = document.getElementById('type')
var address = document.getElementById('address')
var city = document.getElementById('city')
var country = document.getElementById('country')
var zip = document.getElementById('zip')
var image = document.getElementById('image')
var register = document.getElementById('register')

register.addEventListener("click", () => {

  try {

      var emailC
      var passwordC

      if (email.value == emailConf.value) {
        emailC = emailConf


        if (password.value == passwordConf.value) {
          passwordC = passwordConf
        } else {
          $(".error").html(
          '<div class="alert alert-danger" role="alert">Error Registering: Passwords Do Not Match</div>'
          );
        }

        const body = new URLSearchParams({
          username:username.value,
          email:emailC.value,
          password:passwordC.value,
          firstName:firstName.value,
          middleName:middleName.value,
          lastName:lastName.value,
          type:type.value,
          address:address.value,
          city:city.value,
          country:country.value,
          zip:zip.value,
          image:image.value
        })

        fetch(apiURL + "register/", { method:'POST', body: body }).then(location = "index.html")


      } else {
        $(".error").html(
        '<div class="alert alert-danger" role="alert">Error Registering: Emails Do Not Match</div>'
        );
      }
  } catch (e) {

  }

})
