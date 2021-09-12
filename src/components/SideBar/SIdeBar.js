import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cart from "../../assets/cart.svg";
import whitecart from "../../assets/white-cart.svg";
import Back from "../../assets/Back.svg";
import Book from "../../assets/effectiveEngineer.svg";
import "./Sidebar.scss";

const SidebarNav = styled.nav`
  background: #fefefe;
  width: 480px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  border: 1px solid #eeeeee;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  top: 80px;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  @media only screen and (max-width: 400px) {
    right: ${({ sidebar }) => (sidebar ? "0" : "-2%")};
    display: ${({sidebar})=>!sidebar ? "none" : ""};
    width: 380px;
  }
  @media only screen and (max-width: 600px) {
    right: ${({ sidebar }) => (sidebar ? "0" : "-2%")};
    display: ${({sidebar})=>!sidebar ? "none" : ""};
    width: 380px;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
`;

const Sidebar = ({
  sidebar,
  setSidebar,
  cart,
  incrementDecrement,
  removeFromCart,
  subTotal,
}) => {
  return (
    <SidebarNav sidebar={sidebar}>
      <SidebarWrap>
        <div className="heading">
          <p onClick={() => setSidebar(false)}>
            <img
              src={Back}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            Back
          </p>
          <p>
            Your Cart <img src={Cart} style={{ marginLeft: "10px" }} />
          </p>
        </div>
        {cart?.map((item) => (
          <div className="item-in-cart" key={item.id}>
            <div className="book-info">
              <img
                src={item?.image_url}
                style={{ width: "50px", height: "70px" }}
              />
              <div className="book-name">
                <div className="title">
                  <h6>{item?.title}</h6>
                  <p>{item?.publisher}</p>
                </div>
                <p
                  onClick={() => removeFromCart(item)}
                  style={{ cursor: "pointer" }}
                >
                  Remove
                </p>
              </div>
            </div>
            <div className="amount-quantity">
              <p className="amount">{item?.price}</p>
              <p className="increment">
                <span
                  onClick={() => {
                    if (item.quantity >= 0) {
                      return incrementDecrement(item, "decrement");
                    } else {
                      return;
                    }
                  }}
                >
                  -
                </span>
                <span>{item?.quantity}</span>
                <span
                  onClick={() => {
                    if (item.available_copies >= 1) {
                      return incrementDecrement(item, "increment");
                    } else {
                      return;
                    }
                  }}
                >
                  +
                </span>
              </p>
              <p className="unit-cost">${item.cost}</p>
            </div>
          </div>
        ))}
      </SidebarWrap>
      <div className="subtotal">
        <p>Subtotal</p>
        <p className="total">${subTotal}</p>
      </div>
      <button>
        <img src={whitecart} style={{ margin: "0 50px" }} />
        Proceed to Checkout
      </button>
    </SidebarNav>
  );
};

export default Sidebar;
