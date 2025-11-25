import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { SearchPage } from './pages/home/SearchPage';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const cartResp = await axios.get('/data/cart.json');
    const productsResp = await axios.get('/data/products.json');

    const merged = cartResp.data.map(item => ({
      ...item,
      product: productsResp.data.find(p => p.id === item.productId)
    }));

    setCart(merged);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="search" element={<SearchPage cart={cart} loadCart={loadCart} />} />
    </Routes>
  );
}

export default App;



/*
function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE || '/api'}/cart-items?_expand=product`);
      setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="/search" element={<SearchPage  cart={cart} loadCart={loadCart} />  } />
      </Routes>
  )
}

export default App;

*/