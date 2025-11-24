import axios from 'axios';
import { Header } from '../components/Header';
import './TrackingPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export function TrackingPage(){
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        document.title = "Tracking | Haeco"

        const loadCart = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };

        loadCart();
    }, [orderId]);

    if (!order) return null;
    const orderProduct = order.products.find(
        (p) => p.product.id === productId
    );

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) deliveryPercent = 100;

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <Header />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                    View all orders
                    </a>
                    
                    <div className="delivery-date">
                    Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-contact">
                        Ask on Email: hanifwalian@gmail.com
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                    Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div 
                        className="progress-bar"
                        style={{ width: `${deliveryPercent}%`}}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}