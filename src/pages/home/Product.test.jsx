import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

describe('Product component', () => {
    let product;
    let loadCart;

    beforeEach(() => {
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/casiogbd200.jpg",
            name: "Casio G-Shock 200BDR 1DR",
            rating: {
                stars: 4.5,
                count: 89
            },
            priceCents: 11876,
            keywords: ["watch", "handwatch"]
        };

        loadCart = vi.fn();
    });
    it('displays the product details correctly', () => {
        render(<Product product={product} loadCart={loadCart} />);

        expect(
            screen.getByText('Casio G-Shock 200BDR 1DR')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$118.76')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/casiogbd200.jpg');

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');

        expect(
            screen.getByText('89')
        ).toBeInTheDocument();
    });

    it('adds a product to the cart', async () => {
        render(<Product product={product} loadCart={loadCart} />);
        
        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );
        expect(loadCart).toHaveBeenCalled();
    });
});