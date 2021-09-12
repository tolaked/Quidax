
- Clone the repo by clicking the green clone or download button to copy the url on github
- In your terminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
- `main` is the default branch and contains all full the code`
- cd into `quidax`
- Run `npm install` to install all dependencies
- Run `npm start` to get the development server running

## Required features

- Users should be able to search for books with their title, authors, genre and tags.
- When a user clicks “Add to cart” on a book item, it should open the cart sidebar
and add the book to the cart.
- If the book already exists in the cart, it should only increment the existing cart
item’s quantity.
- Clicking the “+” or “-” buttons should increase or decrease the quantity. If the
book quantity is 1, and the user clicks the “-” button, remove the book from the
cart.
- When a user adds a new book to the cart or any book’s quantity in the cart
changes, recalculate the cart’s subtotal.
- A book’s available quantity should be updated every time the user adds or
removes it from the cart.

## Technologies

- React
- CSS
- styled-components
- GraphQL
- Apollo Client
