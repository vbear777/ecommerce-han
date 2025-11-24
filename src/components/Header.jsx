import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './header.css';

export function Header({ cart = [] }){
    const [searchText, setSearchText] = useState(""); 
    const navigate = useNavigate();
    
    const onSearch = () => {
        if (searchText.trim === "") return;
        navigate(`/search?q=${encodeURIComponent(searchText)}`);
    };

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })
    return (
        <>
           <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                <img className="logo"
                    src="images/hclogo.png" />
                <img className="mobile-logo"
                    src="images/hclogo.png" />
                </Link>
           </div>
            <div className="middle-section">
                <input 
                className="search-bar" 
                type="text" 
                placeholder="Search"
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && onSearch() } />
                <button className="search-button" onClick={onSearch} >
                <img className="search-icon" src="images/icons/searchlogo.png" />
                </button>
            </div>

            <div className="right-section">
                 <Link className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                <img className="cart-icon" src="images/icons/cart-icon.png" />
                <div className="cart-quantity">{totalQuantity}</div>
                <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div> 
        </>
    );
}