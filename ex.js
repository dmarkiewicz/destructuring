const orders = [
  {
    id: 1,
    user: "John Doe",
    contact: {
      email: "john.doe@example.com"
    },
    shippingAddress: ["571  Peaceful Lane", "Cleveland", "Ohio"],
    items: [
      {
        name: "Chocolate",
        price: 20
      },
      {
        name: "Book",
        price: 80
      },
      {
        name: "Pizza",
        price: 50
      }
    ]
  },
  {
    id: 2,
    user: "Sara Johnson",
    contact: {
      email: "sara.johnson@example.com"
    },
    shippingAddress: ["4451  Bottom Lane", "Buffalo", "New York"],
    discountAmount: 20,
    items: [
      {
        name: "Coffee",
        price: 50
      },
      {
        name: "Coffee Maker",
        price: 500
      }
    ]
  }
];

const createField = (fieldName, fieldValue) => `
  <div class="order__field">
    <span class="order__field-name">
      ${fieldName}
    </span>
    <span>
      ${fieldValue}
    </span>
  </div>
`;

const createProductsTable = products => `
  <table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        ${products
          .map(
            product => `
          <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
          </tr>
        `
          )
          .join("")}
    </tbody>
  </table>
`;

const createOrderElement = order => {
  const id = order.id;
  const user = order.user;
  const email = order.contact.email;
  const street = order.shippingAddress[0];
  const city = order.shippingAddress[1];
  const state = order.shippingAddress[2];
  const discount =
    order.discountAmount === undefined ? 0 : order.discountAmount;
  const totalPrice = order.items.reduce((total, item) => total + item.price, 0);

  return `
    <div class="order">
      <div class="order__details">
        ${createField("Order number", id)}
        ${createField("User", user)}
        ${createField("Email", email)}
        ${createField("Shipping address", `${city}, ${street}`)}
        ${createField("State", state)}
        ${createProductsTable(order.items)}
      </div>
      ${createField("Price", totalPrice)}
      ${createField("Discount", -discount)}
      ${createField("Total price", totalPrice - discount)}
    </div>
  `;
};

const ordersList = document.querySelector(".orders");
ordersList.innerHTML = orders.map(createOrderElement).join("");
