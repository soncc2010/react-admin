export enum StatusCodeEnum {
  Unauthorized = 401,
  Forbidden = 403,
  ValidationFailed = 422,
  InternalServerError = 500,
  PageNotFound = 404,
  AccessTokenExpired = 440,
}

export enum RoutePathEnum {
  Dashboard = '/',
  Login = '/login',
  Users = '/users',
  Categories = '/categories',
  Category = '/category',
  Products = '/products',
  Orders = '/orders',
  Customers = '/customers',
  Profile = '/profile',
  Password = '/password',
  NotFound = '/404',
}
