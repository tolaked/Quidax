import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import contact from "../assets/contact.svg";
import like from "../assets/like.svg";
import Cart from "../assets/white-cart.svg";
import Back from "../assets/Back.svg";

const DetailsPage = ({bookInfo, book, setView, setSidebar, addToCart }) => {
  const {
    image_url,
    release_date,
    publisher,
    subtitle,
    tags,
    title,
    genres,
    full_description,
    rating,
    likes,
    number_of_purchases,
    available_copies,
  } = bookInfo;
  const [copiesAvail,setCopiesAvail] = useState(book?.available_copies )

  // useEffect(()=>{
  //   if(book?.available_copies){
  //   setCopiesAvail(book?.available_copies)}
  // },[])

  const allGenres = genres?.map(({ name }) => name).join(",");
  const allTags = tags?.map(({ name }) => name).join(",");
  const date = release_date && moment(new Date(release_date)).format("LL");

  return (
    <div className="full-description-section">
      <div className="left-fixed">
        <p onClick={() => setView("home")}>
          <img src={Back} style={{ marginRight: "13px" }} />
          Back
        </p>
        <img src={image_url} alt="book image" style={{width:'220px',height:'250px'}}/>

        <p style={{ color: available_copies > 0 ? "#65C100" : "" }}>
          {" "}
          {available_copies < 1
            ? "Out of stock"
            : available_copies === 1
            ? "1 copies available"
            : `${available_copies} copies available`}
        </p>
        <button className="add-button" onClick={(e)=>{
           e.stopPropagation()
          addToCart(bookInfo)
          setSidebar(true)}}><img src={Cart} alt="cart"/>Add to Cart</button>
      </div>
      <div className="full-description">
        <h3>
          {title} {subtitle?.length ? `: ${subtitle}` : ""}
        </h3>

        <div className="likes">
          <div className="like-rating">
            <img src={contact} alt="like" />
            <p>{likes}</p>
          </div>
          <div className="like-rating">
            <img src={like} alt="like" />
            <p>{number_of_purchases}</p>
          </div>
          <div className="divide"></div>

          <div className="genres-tags">
            <div className="rating">
              <h5 style={{ margin: "0" }}>
                Rating<span style={{ fontWeight: "normal" }}>: {rating}</span>
              </h5>

              <div className="stars" style={{ marginTop: "5px" }}>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    color: rating >= 1 ? "#EBA430" : "#DDDDDD",
                    marginRight: "5px",
                  }}
                />
                <FontAwesomeIcon
                  icon={rating > 1 && rating < 2 ? faStarHalfAlt : faStar}
                  style={{
                    color: rating >= 1 ? "#EBA430" : "#DDDDDD",
                    marginRight: "3px",
                  }}
                />
                <FontAwesomeIcon
                  icon={rating > 2 && rating < 3 ? faStarHalfAlt : faStar}
                  style={{
                    color: rating >= 2 ? "#EBA430" : "#DDDDDD",
                    marginRight: "3px",
                  }}
                />
                <FontAwesomeIcon
                  icon={rating > 3 && rating < 4 ? faStarHalfAlt : faStar}
                  style={{
                    color: rating > 3 ? "#EBA430" : "#DDDDDD",
                    marginRight: "3px",
                  }}
                />
                <FontAwesomeIcon
                  icon={rating > 4 && rating < 5 ? faStarHalfAlt : faStar}
                  style={{
                    color: rating > 4 ? "#EBA430" : "#DDDDDD",
                    marginRight: "3px",
                  }}
                />
              </div>
            </div>

            <div className="genres">
              <h5>Genre</h5>
              <p>{allGenres}</p>
            </div>
            <div className="genres">
              <h5>Tags</h5>
              <p>{allTags}</p>
            </div>
            <div className="genres">
              <h5>Publisher</h5>
              <p>{publisher}</p>
            </div>

            <div className="genres">
              <h5>Released</h5>
              <p>{date}</p>
            </div>
          </div>
        </div>
        <p className="full-text">{full_description}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
