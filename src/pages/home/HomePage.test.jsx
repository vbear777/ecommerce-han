import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage Component', () => {
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/casiogbd200.jpg",
                        name: "Casio G-Shock 200BDR 1DR",
                        rating: {
                        stars: 4.5,
                        count: 89
                        },
                        priceCents: 11876,
                        keywords: ["watch", "handwatch"]
                    },
                    {
                        "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        "image": "images/products/garmin.jpg",
                        "name": "Garmin Instinct 2",
                        "rating": {
                        "stars": 3.5,
                        "count": 127
                        },
                        "priceCents": 34784,
                        "keywords": ["watch", "handwatch"]
                    }]
                };
            }
        });
    })

    it('displays the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container')

        expect(productContainers.length).toBe(2);

        expect(
            within(productContainers[0])
                .getByText('Casio G-Shock 200BDR 1DR')
        ).toBeInTheDocument();

        expect(
            within(productContainers[1])
                .getByText('Garmin Instinct 2')
        ).toBeInTheDocument();
    });
});