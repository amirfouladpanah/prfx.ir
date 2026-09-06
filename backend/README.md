# PRFX — Laravel + MySQL + Vanilla JavaScript

The React/TypeScript storefront has been removed from this branch. The project now uses a normal Laravel 12 application with Blade for HTML and plain JavaScript for cart, OTP login, checkout and account requests.

## Stack
- PHP 8.2+
- Laravel 12
- MySQL 8+
- Laravel Sanctum
- Blade + Vanilla JavaScript + CSS
- No React, TypeScript, Vite, npm or pnpm

## Run

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Create the MySQL database first:

```sql
CREATE DATABASE prfx CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then set these values in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=prfx
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations and seed products:

```bash
php artisan migrate:fresh --seed
php artisan serve
```

Open `http://127.0.0.1:8000`.

## Pages
- `/` home
- `/shop` products + search
- `/product/{id}` product details
- `/cart` cart + checkout
- `/login` phone/OTP login
- `/account` user + orders

## API
- `POST /api/auth/otp/send`
- `POST /api/auth/otp/verify`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /api/me` (auth)
- `POST /api/auth/logout` (auth)
- `GET /api/orders` (auth)
- `GET /api/orders/{id}` (auth)
- `POST /api/orders` (auth)
- `GET /api/addresses` (auth)
- `POST /api/addresses` (auth)
- `PUT /api/addresses/{id}` (auth)
- `DELETE /api/addresses/{id}` (auth)
- `POST /api/products/{id}/reviews` (auth)
- `DELETE /api/reviews/{id}` (auth)

## Checkout rules
Checkout validates each selected product variant, locks its MySQL row inside a transaction, checks stock, decrements stock, snapshots the product name/price into `order_items`, and creates the order only when all items are valid.

Shipping: subtotal >= 5,000,000 تومان is free; otherwise Post costs 120,000 تومان and Tipax is currently 0 as a placeholder.

OTP is deliberately returned only as `debug_otp` when `APP_ENV=local`. Replace that section with your SMS provider before production.
