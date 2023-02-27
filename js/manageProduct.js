apiURL = 'http://localhost:8080/api/';
var purchase = document.getElementById('purchase-btn')
var wish = document.getElementById('wish-btn')
var addWish = document.getElementById('wish-text-btn')
var deletePurchase = document.getElementById('delete-purchase-btn')
var deleteWish = document.getElementById('delete-wish-btn')
product = urlParam("productid")

purchase.addEventListener("click", () => {

try {
  if (purchase.textContent != "In Cart") {
    fetch(apiURL + "my/cart/" + product, {
      method:"PATCH"
    })
    purchase.textContent = "In Cart"
  } else {
      fetch(apiURL + "my/delete/cart/" + product, {method:"PATCH"
})
      purchase.textContent = "Purchase"
  }
} catch (e) {

}
})

wish.addEventListener("click", () => {
  try {
    if (wish.textContent != "Saved") {
      fetch(apiURL + "my/wish/" + product, {method:"PATCH"
    })
      wish.textContent = "Saved"
    } else {
        fetch(apiURL + "my/delete/wish/" + product, {method:"PATCH"
    });
        wish.textContent = "Save"
    }
  } catch (e) {

  }
})

async function AddWish(id) {
  try {

    let response = await fetch(apiURL + "my/wish/")
    let data = await response.json()
    if (!(data.includes(id))) {
      fetch(apiURL + "my/delete/cart/" + id, {method:"PATCH"
  }).then(() => {
        fetch(apiURL + "my/wish/" + id, {method:"PATCH"
  }).then(() => {
                window.location.reload();
            })
          })
    } else {
      window.location.reload()
    }
  } catch (e) {

  }
}

async function DeleteCart(id) {
  try {
    fetch(apiURL + "my/delete/cart/" + id, {method:"PATCH"
}).then(() => {
      window.location.reload();
    })
  } catch (e) {

  }
}

async function DeleteWish(id) {
  try {
    fetch(apiURL + "my/delete/wish/" + id, {method:"PATCH"
}).then(() => {
      window.location.reload();
    })
  } catch (e) {

  }
}

async function AddCart(id) {
  try {

    let response = await fetch(apiURL + "my/cart/")
    let data = await response.json()
    if (!(data.includes(id))) {
      fetch(apiURL + "my/delete/wish/" + id, {method:"PATCH"})
      .then(() => {
        fetch(apiURL + "my/cart/" + id, {method:"PATCH"})
  .then(() => {
          window.location.reload();
        })
      })
    }
  } catch (e) {

  }
}

window.onload = async function() {

  try {
    if (product != null) {
      let cartResponse = await fetch(apiURL + "my/cart/")
      let cart = await cartResponse.json();
      let wishResponse = await fetch(apiURL + "my/wish/")
      let wishD = await wishResponse.json();

      if (cart.includes(product)) {
        purchase.textContent = "In Cart"
      }

      if (wishD.includes(product)) {
        wish.textContent = "Saved"
      }
    }  
  } catch (e) {

  }
}
