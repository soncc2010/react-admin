import { OrderStatusEnum, PaymentMethod, ShippingMethod } from 'enums/order';

export const mockOrders: Order[] = [
  {
    orderId: '123456',
    customer: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      address: {
        street: '123 Đường ABC',
        city: 'Hà Nội',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P001',
        title: 'Laptop Dell XPS 13',
        quantity: 1,
        price: 25000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
      {
        productId: 'P002',
        title: 'Chuột không dây Logitech MX Master 3',
        quantity: 2,
        price: 1500000,
      },
    ],
    totalAmount: 28000000,
    orderDate: '2023-10-05T10:30:00Z',
    status: OrderStatusEnum.Pending,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
  {
    orderId: '123457',
    customer: {
      name: 'Tran Thi B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      address: {
        street: '456 Đường XYZ',
        city: 'TP. Hồ Chí Minh',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P003',
        title: 'Tai nghe Sony WH-1000XM4',
        quantity: 100000,
        price: 5000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
      {
        productId: 'P004',
        title: 'Bàn phím cơ Keychron K8',
        quantity: 1,
        price: 2000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
      {
        productId: 'P005',
        title: 'Bàn phím cơ Keychron K8',
        quantity: 1,
        price: 2000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
    ],
    totalAmount: 7000000,
    orderDate: '2023-10-06T14:15:00Z',
    status: OrderStatusEnum.Shipped,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
  {
    orderId: '123458',
    customer: {
      name: 'Le Van C',
      email: 'levanc@example.com',
      phone: '0912345678',
      address: {
        street: '789 Đường QWE',
        city: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P005',
        title: 'Màn hình LG UltraFine 4K',
        quantity: 1,
        price: 10000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
    ],
    totalAmount: 10000000,
    orderDate: '2023-10-07T09:45:00Z',
    status: OrderStatusEnum.Delivered,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
  {
    orderId: '123459',
    customer: {
      name: 'Le Van C',
      email: 'levanc@example.com',
      phone: '0912345678',
      address: {
        street: '789 Đường QWE',
        city: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P005',
        title: 'Màn hình LG UltraFine 4K',
        quantity: 1,
        price: 10000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
    ],
    totalAmount: 10000000,
    orderDate: '2023-10-07T09:45:00Z',
    status: OrderStatusEnum.Processing,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
  {
    orderId: '123411',
    customer: {
      name: 'Le Van C',
      email: 'levanc@example.com',
      phone: '0912345678',
      address: {
        street: '789 Đường QWE',
        city: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P005',
        title: 'Màn hình LG UltraFine 4K',
        quantity: 1,
        price: 10000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
    ],
    totalAmount: 10000000,
    orderDate: '2023-10-07T09:45:00Z',
    status: OrderStatusEnum.Cancelled,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
  {
    orderId: '123411',
    customer: {
      name: 'Le Van C',
      email: 'levanc@example.com',
      phone: '0912345678',
      address: {
        street: '789 Đường QWE',
        city: 'Đà Nẵng',
        country: 'Việt Nam',
      },
    },
    products: [
      {
        productId: 'P005',
        title: 'Màn hình LG UltraFine 4K',
        quantity: 1,
        price: 10000000,
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ],
      },
    ],
    totalAmount: 10000000,
    orderDate: '2023-10-07T09:45:00Z',
    status: OrderStatusEnum.Refunded,
    paymentMethod: PaymentMethod.CashOnDelivery,
    shippingMethod: ShippingMethod.Express,
  },
];
