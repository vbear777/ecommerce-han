import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import './SearchPage.css'; 

export function SearchPage({ cart, loadCart }) {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get("/api/products");
            const allProducts = res.data;

            const filtered = allProducts.filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );

            setProducts(filtered);
        };

        fetchProducts();
    }, [query]);

    return (
        <>
            <Header cart={cart} />
            <div className="home-page">
                <h3 className="search-title">Search results for: "{query}"</h3>
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}

