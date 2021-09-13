import React from 'react'
import Logo from '../assets/quidax-logo.svg'
import BookIcon from '../assets/books-icon.svg'
import Cart from '../assets/cart.svg'
import './Home.scss'

const NavBar = ({input, setInput, cart, NavBar}) => {
    return (
        <div className="nav-bar">
            <div className="brand">
                <img src={Logo} alt="logo"/>
                <div className="sub-text">
                    <h5>Quidax Books</h5>
                    <p>A flimsy book company</p>
                </div>
            </div>

            <input name="input" placeholder="search books,genres,authors" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <div className="right-icons">
                <img src={BookIcon} alt="book icon" style={{width:"40px", height:'40px', marginRight:'15px'}}/>
                <img src={Cart} alt="cart icon" style={{position:'relative'}}/>
               {cart.length ? <div className="green-circle">{cart.length}</div> : ""}
            </div>
            
            
        </div>
    )
}

export default NavBar
