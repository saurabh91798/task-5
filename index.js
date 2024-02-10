const services = [
  {
    id: 1,
    name: "Dry Clean",
    price: 200,
  },
  {
    id: 2,
    name: "Wash & Fold",
    price: 100,
  },
  {
    id: 3,
    name: "Ironing",
    price: 30,
  },
  {
    id: 4,
    name: "Stain Removal",
    price: 500,
  },
  {
    id: 5,
    name: "Leather & Suede Cleaning",
    price: 999,
  },
  {
    id: 6,
    name: "Wedding Dress Cleaning",
    price: 2800,
  },
]

const cart = []

const addOrRemoveItem = (id) => {
  const cartItemIndex = cart.findIndex(cartItemId => cartItemId === id)
  const itemIsInCart = cartItemIndex > -1

  if (itemIsInCart) {
    cart.splice(cartItemIndex, 1)
  } else {
    cart.push(id)
  }

  renderServicesList()
  renderCartItemsList()
}
          
const renderServicesList = () => {
  const servicesList = document.getElementById("services-list")
  let servicesListHTML = ``

  services.forEach(item => {
    const itemIsInCart = cart.includes(item.id)
    const buttonText = itemIsInCart ? "Remove Item" : "Add Item"
    const icon = itemIsInCart ? "remove_circle" : "add_circle"

    servicesListHTML += `
      <div class="service">
        <div>
          <h3>${item.name}</h3>
          <p>Rs ${item.price}</p>
        </div>
        <div class="service-btn">
          <button type="button" onclick="addOrRemoveItem(${item.id})">
            ${buttonText}
            <span class="material-symbols-outlined">${icon}</span>
          </button>
        </div>
      </div>
    `
  })
  servicesList.innerHTML = servicesListHTML
}

const renderCartItemsList = () => {
  const rightSection = document.getElementById("right-section")
  if (cart.length > 0) {
    let cartItemsListInnerHTML = ``

    let totalAmount = 0

    cart.forEach((id, index) => {
      const service = services.find(service => service.id === id)
      
      totalAmount += service.price

      cartItemsListInnerHTML += (`
        <tr>
          <td>${index + 1}</td>
          <td>${service.name}</td>
          <td>Rs ${service.price}</td>
        </tr>
      `)
    })

    rightSection.innerHTML = (`
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody id="cart-items-list"></tbody>
      </table>
      <hr />
      <div id="totalAmount" class="totalAmount">
        <h2>Total Amount</h2>
        <p>Rs ${totalAmount}</p>
      </div>
    `)

    const cartItemsList = document.getElementById("cart-items-list")
    cartItemsList.innerHTML = cartItemsListInnerHTML
  } else {
    rightSection.innerHTML = (`
      <div id="itemsAdded" class="itemsAdded">
        <span class="material-symbols-outlined">error</span>
        <h2>No Items Added</h2>
        <p>Add Items to the card from services</p>
      </div>
    `)
  }
}

renderServicesList()
renderCartItemsList()