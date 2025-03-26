type OrderStatus = import('enums/order').OrderStatusEnum;
type PaymentMethod = import('enums/order').PaymentMethod;
type ShippingMethod = import('enums/order').ShippingMethod;

type Address = {
  street: string;
  city: string;
  country: string;
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: Address;
};

type ProductOrder = {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  images?: string[];
};

type Order = {
  orderId: string;
  customer: Customer;
  products: ProductOrder[];
  totalAmount: number;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
};

type StatusProperties = {
  color: string;
  label: string;
};

type OrderStatusFormData = {
  status: OrderStatus;
};
