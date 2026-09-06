# PRFX

PRFX is now a Laravel 12 + MySQL shopping project with Blade and Vanilla JavaScript.

The previous React/TypeScript/Vite frontend has been removed from the `backend/laravel-api` branch.

## Start

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

Open `http://127.0.0.1:8000`.

See `backend/README.md` for API endpoints, MySQL setup and checkout behavior.
