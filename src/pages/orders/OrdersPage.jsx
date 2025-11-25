import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';
import './OrdersPage.css';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersResp = await axios.get('/data/orders.json');
      const productsResp = await axios.get('/data/products.json');

      const ordersWithProduct = ordersResp.data.map(order => ({
        ...order,
        products: order.products.map(p => ({
          ...p,
          product: productsResp.data.find(prod => prod.id === p.productId)
        }))
      }));

      setOrders(ordersWithProduct);
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="page-text">
          <h5>
            <i>
              Disclaimer: There is no transaction at all on this web, all pictures was used under
              Pixabay license permit, tell me anything you want on my email:
              hanifwalian@gmail.com, have a nice day.
            </i>
          </h5>
        </div>

        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map(orderProduct => (
                  <Fragment key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">{orderProduct.product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on:{' '}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderProduct.quantity}
                      </div>

                      <button className="buy-again-button button-primary">
                        <img
                          className="buy-again-icon"
                          src="images/icons/buy-again.png"
                        />
                        <span className="buy-again-message">Your Trolley</span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
