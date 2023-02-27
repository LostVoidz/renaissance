apiURL = 'http://localhost:8080/api/';
var navBtn = document.getElementById('dropdownUser')
var inBtn = document.getElementById('s-in')
var upBtn = document.getElementById('s-up')
var cartCount = document.getElementById('cart')
var profilePic = document.getElementById('profile')
var img = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
var isLogged = false

try {
  img = sessionStorage.getItem("pfp")
  if (img != null) {
  profilePic.src = img
} else {
    img = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
    profilePic.src = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
}
} catch (e) {
  img = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
  profilePic.src = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
}
dropdownUser.addEventListener("click", async () => {
  user = await fetch(apiURL + "my")
  data = await user.json()

  account = await fetch(apiURL + "account")
  accData = await account.json()

  if (user.ok) {
    inBtn.textContent = accData.username;
    upBtn.textContent = "Sign Out"
    cartCount.textContent = data.cart.length;
    img = accData.image;
    profilePic.src = img
    sessionStorage.setItem("pfp", img)
    isLogged = true
  } else {
    inBtn.textContent = "Sign In"
    upBtn.textContent = "Sign Up"
    isLogged = false
    img = "https://tse1.mm.bing.net/th?id=OIP.Yx98ooldZFFeVjNO4nQY1wAAAA&pid=Api"
    profilePic.src = img
  }
})

async function logIn() {
  if (isLogged) {
    location = "#"
  } else {
    location = "login.html"
  }
}

async function logOut() {
  if (isLogged) {
    fetch(apiURL + "logout", {
      method:'PATCH'
    })
    inBtn.textContent = "Sign In"
    upBtn.textContent = "Sign Up"
    signOutBtn.textContent = ""
    isLogged = false
    localStorage.clear()
  } else {
    location = "register.html"
  }
}
