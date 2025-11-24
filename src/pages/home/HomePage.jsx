import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]); 
/*
    useEffect(() => {
    const reset = async () => {
        await axios.post('/api/reset');
        console.log("Database reset!");
    };

    reset();
    }, []);

*/
    useEffect(() => {
        const getHomeData = async () => {
        const response = await axios.get('/api/products');
            setProducts(response.data);
        };

        getHomeData();
    }, []);

    return (
     <>
        <title>Home | Haeco</title>
        <Header cart={cart} />

        <div className="home-page">
            <ProductsGrid products={products} loadCart={loadCart} />            
        </div>
    </>
    );
}