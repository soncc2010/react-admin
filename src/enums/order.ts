export enum OrderStatusEnum {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
  Refunded = 'REFUNDED',
}

export enum PaymentMethod {
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  PayPal = 'PAYPAL',
  BankTransfer = 'BANK_TRANSFER',
  CashOnDelivery = 'CASH_ON_DELIVERY',
}

export enum ShippingMethod {
  Standard = 'Standard',
  Express = 'Express',
  Overnight = 'Overnight',
}
