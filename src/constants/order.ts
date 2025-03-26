import { OrderStatusEnum, PaymentMethod, ShippingMethod } from 'enums/order';

export const ORDER_STATUS_PROPERTIES: Record<
  OrderStatusEnum,
  StatusProperties
> = {
  [OrderStatusEnum.Pending]: {
    color: 'var(--color-orange)',
    label: 'pending',
  },
  [OrderStatusEnum.Processing]: {
    color: 'var(--color-yellow)',
    label: 'processing',
  },
  [OrderStatusEnum.Shipped]: {
    color: 'var(--color-blue)',
    label: 'shipped',
  },
  [OrderStatusEnum.Delivered]: {
    color: 'var(--color-green)',
    label: 'delivered',
  },
  [OrderStatusEnum.Cancelled]: {
    color: 'var(--color-red)',
    label: 'cancelled',
  },
  [OrderStatusEnum.Refunded]: {
    color: 'var(--color-pink)',
    label: 'refunded',
  },
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.CreditCard]: 'Credit Card',
  [PaymentMethod.DebitCard]: 'Debit Card',
  [PaymentMethod.PayPal]: 'PayPal',
  [PaymentMethod.BankTransfer]: 'Bank Transfer',
  [PaymentMethod.CashOnDelivery]: 'Cash on Delivery',
};

export const SHIPPING_METHOD_LABELS: Record<ShippingMethod, string> = {
  [ShippingMethod.Standard]: 'standard',
  [ShippingMethod.Express]: 'express',
  [ShippingMethod.Overnight]: 'overnight',
};
