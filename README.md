### Homepage Depot Back-End API

Homepage Depot is a full stack E-Commerce application integrated with the Stripe API to allow users to authenticate, add products to a shopping cart, and make secure purchases with a credit card.

## Repositories
Client: [Client](https://github.com/The-Da-Vinci-Coders/E-Commerce-Client)
API: [API](https://github.com/The-Da-Vinci-Coders/E-Commerce-API)


## Deployed Sites
Client: [Client](https://the-da-vinci-coders.github.io/E-Commerce-Client/)
API: [API](https://warm-beyond-78319.herokuapp.com/)


## List of technologies used
HTML, CSS, MongoDB, Mongoose, Express, React, Node, Stripe, Lodash, Axios, Bootstrap


## List unsolved problems which would be fixed in future iterations.

### Interactivity Component
In a version two it would be great to add more interactivity to the application. This could be accomplished through a chat feature where a user could interact with a bot to help guide their trip in the right direction, or to communicate directly with a seller.

### Expanded details
Additionally, it would be great to expand the product page to include more details on each item. Further, with an expanded set of products there’s great potential to track and add inventory to the page allowing new users to be both buyers and sellers.

### Search by category
We'd like to have implemented a search by category, where a user could select a category and only have products of that category appear as well.

## Document your planning, process and problem-solving strategy
After solidifying our idea for a project, our development team discussed our individual visions for the app and features that were important to include in an E-Commerce site. After setting up both repos, we began looking at user functionality for a new customer and setting up corresponding routes on our database. Our group's first notable issue emerged when dealing with nested routes, when defining the path from the shopping cart to checkout. This was a learning experience highlighting the complexities of nested routes. Another notably complex issue emerged when attempting to set up purchase history as an array, eventually though debugging we updated our code to include a .map method instead of a .forEach to correctly display the data. Generally our group worked together to develop and debug code, which proved to be an efficient workflow. As a group we communicated efficiently and periodically recalibrated our ways of attacking problems as our working relationship progressed. Collectively our group did well in defining our goals and adapting over the course of the project to ensure that we put forward our best effort.

## API Routes

### Products
| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Get      | /products      | Get all available products (index) |
| Get   | /products/:id     | Get one product by ID (show) |
| Post   |  /products | Post one product |
| Patch  | /products/:id  | Update a product |
| Delete   |  /products/:id | Delete a product |

### User

| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Post      | /sign-up      | Sign up a new user |
| Post   | /sign-in     | Sign in an existing user |
| Patch   |  /change-password | Change password of existing user |
| Delete   |  /sign-out | Sign out existing user |

### Shopping cart

| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Get      | /shopping-cart      | Get shopping carts associated with current user (index) |
| Get   | /shopping-cart/:id     | Get one shopping cart by ID associated with current user (show) |
| Patch   |  /shopping-cart | Add a shopping cart to the current user |
| Patch  | /shopping-cart/:id  | Add a product to one shopping cart associated with current user |
| Patch  | /shopping-cart/:id/products  | Remove one product from one shopping cart associated with current user |
| Patch   |  /shopping-cart/:id/active | Change 'active' status of one shopping cart associated with current user|

### Stripe

| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Post      | /stripe/charge      | Complete a purchase through Stripe |
| Post   | /stripe/customer  | Add a customer to Stripe |
| Post   |  /stripe/card-token | Create a token for a credit card through Stripe |
| Patch  | /customer/:id  | Add a card token to a customer on Stripe |
