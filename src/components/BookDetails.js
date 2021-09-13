import React,{useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import contact from "../assets/contact.svg";
import like from "../assets/like.svg";
import Cart from "../assets/cart.svg";

const BookDetails = ({setBookInfo, details, view, setView, addToCart, setSidebar }) => {
  const {
    image_url,
    genres,
    available_copies,
    rating,
    likes,
    number_of_purchases,
    price,
    authors,
    title,
  } = details;


  const allGenres = genres.map(({ name }) => name).join(",");
  const allAuthuors = authors.map(({ name }) => name).join(",");
  return (
    <div className="book-detail" style={{display:view !== "home" ? "none" : ""}} onClick={()=>{
      setBookInfo(details)
        setView("details")
        }}>
      <img src={image_url} alt="logo" className="book-cover" />
      
      <div className="further-details">
        <h5>{title}</h5>
        <div style={{ margin: "0  0 10px 0" }}>
          <p>{allAuthuors}</p>
          <p>{allGenres}</p>
        </div>
        <div className="likes-ratings">
          <div className="likes">
            <img
              src={contact}
              alt="contact"
              style={{ width: "20px", height: "20px" }}
            />
            <p>{number_of_purchases}</p>
          </div>
          <div className="likes">
            <img
              src={like}
              alt="Likes"
              style={{ width: "20px", height: "20px" }}
            />
            <p>{likes}</p>
          </div>
          <div className="divide"></div>
          <div className="rating">
            <p>Rating: {rating}</p>
            <div className="stars">
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
        </div>
        <div className="price-copies">
          <p style={{ marginRight: "10px" }}>${price}</p>
          <p style={{ color: available_copies > 0 ? "#65C100" : "#C12300" }}>
            {available_copies < 1
              ? "Out of stock"
              : available_copies === 1
              ? "1 copy available"
              : `${available_copies} copies available`}
          </p>
        </div>
        <div className="add-to-cart" onClick={(e)=>{
           e.stopPropagation()
          if(available_copies > 0){
          addToCart(details)
          setSidebar(true)}}}>
          <img src={Cart} alt="cart" />
          <p>Add to cart</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
