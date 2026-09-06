<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PRFX | فروشگاه عطر</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body data-page="{{ $page }}">
<header class="header">
    <a class="logo" href="{{ route('home') }}">PRFX</a>
    <nav><a href="{{ route('home') }}">خانه</a><a href="{{ route('shop') }}">فروشگاه</a><a href="{{ route('cart') }}">سبد <span id="cart-count">0</span></a><a href="{{ route('account') }}">حساب من</a></nav>
</header>
<main class="container">
@if($page === 'home')
    <section class="hero"><div><small>PERFUME / FRAGRANCE</small><h1>عطرهایی برای ماندن در خاطر</h1><p>انتخابی از رایحه‌های خاص، با ارسال به سراسر ایران.</p><a class="btn" href="{{ route('shop') }}">مشاهده فروشگاه</a></div></section>
    <h2>محبوب‌ترین‌ها</h2><div class="grid">@foreach($products as $p)<x-product-card :product="$p" />@endforeach</div>
@elseif($page === 'shop')
    <div class="title-row"><h1>فروشگاه</h1><input id="search" placeholder="جستجوی عطر یا برند..."></div>
    <div id="shop-products" class="grid">@foreach($products as $p)<x-product-card :product="$p" />@endforeach</div>
@elseif($page === 'product')
    <section class="product-detail"><div><img src="{{ $product->image }}" alt="{{ $product->name }}"></div><div><small>{{ $product->brand }}</small><h1>{{ $product->name }}</h1><p>{{ $product->description }}</p><div class="price">{{ toman($product->price) }}</div><select id="volume">@foreach($product->variants as $v)<option value="{{ $v->volume_ml }}" data-price="{{ $v->price }}">{{ $v->volume_ml }} میلی‌لیتر — {{ toman($v->price) }}</option>@endforeach</select><button class="btn" onclick="addProduct({{ $product->id }}, '{{ addslashes($product->name) }}', '{{ $product->image }}')">افزودن به سبد</button></div></section>
@elseif($page === 'cart')
    <h1>سبد خرید</h1><div id="cart-items"></div><div id="checkout" class="checkout"></div>
@elseif($page === 'login')
    <section class="card narrow"><h1>ورود</h1><p>شماره موبایل خود را وارد کنید.</p><input id="phone" maxlength="11" placeholder="09123456789"><button class="btn" onclick="sendOtp()">دریافت کد</button><div id="otp-box" hidden><input id="otp" maxlength="5" placeholder="کد ۵ رقمی"><button class="btn" onclick="verifyOtp()">ورود</button></div><p id="message"></p></section>
@elseif($page === 'account')
    <section class="card"><h1>حساب کاربری</h1><div id="account-content">در حال بارگذاری...</div></section>
@endif
</main>
<footer>© {{ date('Y') }} PRFX — فروشگاه عطر</footer>
<script>window.PRFX={api:'{{ url('/api') }}',csrf:'{{ csrf_token() }}'};</script>
<script src="{{ asset('js/app.js') }}"></script>
</body></html>
