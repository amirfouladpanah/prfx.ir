# PRFX Laravel Backend

API backend designed from the existing React storefront. The UI currently exposes shop/catalog filtering, product details, cart/checkout, phone + 5-digit OTP login, dashboard orders and addresses. The frontend currently keeps cart/auth in localStorage/context, so this backend provides the persistent API layer.

## Stack
- Laravel 12 / PHP 8.2+
- Sanctum bearer tokens
- MySQL or PostgreSQL
- Transactional checkout with row locking and stock decrement

## Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Configure `DB_*` in `.env`. For OTP delivery, replace the local/debug response in `AuthController@sendOtp` with your SMS provider. Never expose `debug_otp` outside local development.

## API
- `POST /api/auth/otp/send` `{phone}`
- `POST /api/auth/otp/verify` `{phone,otp}` -> Sanctum token
- `GET /api/products` supports `search`, `brand[]`, `gender[]`, `family[]`, `season`, `min_price`, `max_price`, `sort`, `per_page`
- `GET /api/products/{id}`
- `GET /api/orders` authenticated
- `GET /api/orders/{id}` authenticated
- `POST /api/orders` authenticated
- `GET /api/me` authenticated
- `POST /api/auth/logout` authenticated

## Checkout payload
```json
{
  "items":[{"product_id":1,"volume_ml":35,"quantity":1}],
  "shipping_method":"post",
  "receiver":"نام و نام خانوادگی",
  "phone":"09123456789",
  "province":"تهران",
  "city":"تهران",
  "postal_code":"1234567890",
  "address":"آدرس کامل",
  "note":""
}
```

Shipping follows the UI rule: orders >= 5,000,000 تومان are free; Post is 120,000 تومان below that threshold; Tipax is currently 0 and can be replaced by a real carrier quote.
