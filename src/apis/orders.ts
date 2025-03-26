import { mockOrders } from 'pages/OrdersPage/mock-data';

export const getOrders = (): Promise<Order[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });

export const getOrderDetail = (id: string): Promise<Order> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders.find((order) => order.orderId === id) as Order);
    }, 1000);
  });

export const updateOrderStatus = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
