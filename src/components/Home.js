import React, { useState, useEffect } from "react";
import { useGetBooks } from "../graphql/hooks/books";
import BookDetails from "./BookDetails";
import DetailsPage from "./DetailsPage";
import NavBar from "./NavBar";
import Sidebar from "./SideBar/SIdeBar";

const Home = () => {
  const { data } = useGetBooks();
  const [input, setInput] = useState("");
  const [view, setView] = useState("home");
  const [book, setBook] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [cart, setCart] = useState([]);
  const [allBooks, setAllBooks] = useState(data?.books || []);
  const [subTotal, setSubTotal] = useState(0);
  const [copies, setCopies] = useState(0);

  const [bookInfo,setBookInfo] = useState({})

  const filteredBooks = allBooks.filter((book) => {
    const allAuthuors = book.authors.map(({ name }) => name).join(",");
    const allGenres = book.genres.map(({ name }) => name).join(",");
    const allTags = book.tags.map(({ name }) => name).join(",");
    return (
      allAuthuors.toLowerCase().includes(input.toLowerCase()) ||
      book.title.toLowerCase().includes(input.toLowerCase()) ||
      allGenres.toLowerCase().includes(input.toLowerCase()) ||
      allTags.toLowerCase().includes(input.toLowerCase())
    );
  });
  useEffect(() => {
    if (data?.books) {
      setAllBooks(data?.books);
    }
  }, [data?.books]);

  const addToCart = (book) => {
    if (cart.length > 0) {
      const bookInCart = cart.findIndex((item) => item.id === book.id);

      if (bookInCart >= 0) {
        const bookFound = cart.find((item) => item.id === book.id);
        const indexToUpdate = allBooks.findIndex(
          (object) => object.id === book.id
        );
        let toUpdate = [...allBooks];
        toUpdate.splice(indexToUpdate, 1, {
          ...book,
          available_copies: book.available_copies - 1,
        });
        setAllBooks(toUpdate);
        setBookInfo(
          {
            ...book,
            available_copies: book.available_copies - 1,
        })

        let allCarts = [...cart];
        allCarts.splice(bookInCart, 1, {
          ...book,
          quantity: bookFound.quantity + 1,
          available_copies: book.available_copies - 1,
          cost: book.price * (bookFound.quantity + 1),
        });

        const total = allCarts.reduce((acc, prev) => {
          return (Number(acc) + Number(prev.cost)).toFixed(2);
        }, 0);

        setSubTotal(total);
        return setCart(allCarts);
      }
      const indexToUpdate = allBooks.findIndex(
        (object) => object.id === book.id
      );
      let toUpdate = [...allBooks];
      toUpdate.splice(indexToUpdate, 1, {
        ...book,
        available_copies: book.available_copies - 1,
      });

      setAllBooks(toUpdate);
      setBookInfo(
        {
          ...book,
          available_copies: book.available_copies - 1,
      })
      setCart([
        ...cart,
        {
          ...book,
          available_copies: book.available_copies - 1,
          quantity: 1,
          cost: book.price,
        },
      ]);

      const updatedCartCopy = [
        ...cart,
        {
          ...book,
          available_copies: book.available_copies - 1,
          quantity: 1,
          cost: book.price,
        },
      ];
      const total = updatedCartCopy.reduce((acc, prev) => {
        return (Number(acc) + Number(prev.cost)).toFixed(2);
      }, 0);

      setSubTotal(total);
    } else {
      const indexToUpdate = allBooks.findIndex(
        (object) => object.id === book.id
      );
      let toUpdate = [...allBooks];
      toUpdate.splice(indexToUpdate, 1, {
        ...book,
        available_copies: book.available_copies - 1,
      });

      setAllBooks(toUpdate);
      setSubTotal(book.price);
      setCart([
        {
          ...book,
          available_copies: book.available_copies - 1,
          quantity: 1,
          cost: book.price,
        },
      ]);
      setBookInfo( {  ...book,
        available_copies: book.available_copies - 1,
        quantity: 1,
        cost: book.price,
      })
    }
  };

  const incrementDecrement = (book, action) => {
    if (book.quantity >= 1) {
      const indexToUpdate = cart.findIndex((item) => item.id === book.id);
      const bookToReduce = cart.find((item) => item.id === book.id);
      let toUpdate = [...cart];
      toUpdate.splice(indexToUpdate, 1, {
        ...bookToReduce,
        available_copies:
          action === "decrement"
            ? bookToReduce.available_copies + 1
            : bookToReduce.available_copies - 1,
        quantity:
          action === "decrement"
            ? bookToReduce.quantity - 1
            : bookToReduce.quantity + 1,
        cost:
          action === "decrement"
            ? (Number(book.cost) - Number(book.price)).toFixed(2)
            : (Number(book.cost) + Number(book.price)).toFixed(2),
      });
      const total = toUpdate.reduce((acc, prev) => {
        return (Number(acc) + Number(prev.cost)).toFixed(2);
      }, 0);
      setSubTotal(total);
      setCart(toUpdate);

      const bookToUpdate = allBooks.findIndex((item) => item.id === book.id);
      const getBook = allBooks.find((item) => item.id === book.id);
      let booksCopy = [...allBooks];
      booksCopy.splice(bookToUpdate, 1, {
        ...getBook,
        available_copies:
          action === "decrement"
            ? bookToReduce.available_copies + 1
            : bookToReduce.available_copies - 1,
      });
      return setAllBooks(booksCopy);
    }
  };
  const removeFromCart = (book) => {
    const indexToRemove = cart.findIndex((item) => item.id === book.id);

    let cartCopy = [...cart];
    cartCopy.splice(indexToRemove, 1);
    const total = cartCopy.reduce((acc, prev) => {
      return (Number(acc) + Number(prev.cost)).toFixed(2);
    }, 0);

    setSubTotal(total);
    setCart(cartCopy);
    if (!cartCopy.length) {
      setSidebar(false);
    }

    const bookRemoved = allBooks.find((item) => item.id === book.id);
    const bookToUpdate = allBooks.findIndex((item) => item.id === book.id);
    let booksCopy = [...allBooks];

    booksCopy.splice(bookToUpdate, 1, {
      ...bookRemoved,
      available_copies: book.quantity + book.available_copies,
      quantity: 0,
    });

    setAllBooks(booksCopy);
  };
  return (
    <div className="home">
      <NavBar input={input} setInput={setInput} cart={cart} setSidebar={setSidebar}/>
      <Sidebar
        removeFromCart={removeFromCart}
        sidebar={sidebar}
        setSidebar={setSidebar}
        cart={cart}
        incrementDecrement={incrementDecrement}
        subTotal={subTotal}
      />

      <div
        className="divider"
        style={{ display: view === "details" ? "none" : "" }}
      >
        <h5>Featured books</h5>
      </div>
      <div
        className="books"
        style={{ display: view === "details" ? "none" : "" }}
      >
        {data?.books.map((book) => (
          <>
            <img src={book.image_url} className="book" />
            {/* <div class="card__overlay">
                  <div class="overlay__text">
                    <h3>Mountain Trips</h3>
                    <p>Plan your next adventure</p>
                    <a href="#" class="button">View Trips</a>
                  </div>
                </div> */}
          </>
        ))}
      </div>

      <div
        className="divider"
        style={{ display: view === "details" ? "none" : "" }}
      >
        <h5>All books</h5>
      </div>
      <div className="all-books">
        {filteredBooks?.map((book) => (
          <BookDetails
            cart={cart}
            copies={copies}
            setCopies={setCopies}
            details={book}
            view={view}
            setBook={setBook}
            setSidebar={setSidebar}
            setView={setView}
            addToCart={addToCart}
            setBookInfo={setBookInfo}
          />
        ))}
      </div>

      {view === "details" ? (
        <DetailsPage
          view={view}
          allBooks={allBooks}
          book={book}
          copies={copies}
          setCopies={setCopies}
          setView={setView}
          setSidebar={setSidebar}
          addToCart={addToCart}
          bookInfo={bookInfo}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
