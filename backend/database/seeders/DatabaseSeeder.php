<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name'=>'نویر ابسولو','subtitle'=>'ادو پرفیوم','brand'=>'Maison Noir','price'=>6800000,'image'=>'https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&auto=format','tag'=>'پرفروش','gender'=>'مردانه','is_bestseller'=>true,'family'=>'شرقی','season'=>['پاییز','زمستان'],'concentration'=>'ادو پرفیوم','sku'=>'MN-NA-001','rating'=>4.7,'rating_count'=>284,'description'=>'ترکیبی پیچیده از عود دودی، وتیور خاکی و عنبر گرم.','variants'=>[[25,4500000],[35,6800000],[100,14500000]]],
            ['name'=>'اتر شماره ۷','subtitle'=>'ادو کلن','brand'=>'Éclat Paris','price'=>4600000,'image'=>'https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&auto=format','gender'=>'مردانه','is_bestseller'=>true,'family'=>'تازه چوبی','season'=>['بهار','تابستان'],'concentration'=>'ادو کلن','sku'=>'EP-A7-002','rating'=>4.3,'rating_count'=>156,'description'=>'برگاموت، سدر و مشک با رایحه‌ای سبک و روزمره.','variants'=>[[25,2900000],[35,4600000],[100,9800000]]],
            ['name'=>'سابل دوره','subtitle'=>'ادو پرفیوم','brand'=>'Luna Fragrances','price'=>5740000,'original_price'=>8200000,'discount'=>30,'image'=>'https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&auto=format','tag'=>'تخفیف','gender'=>'یونیسکس','is_autumn'=>true,'is_bestseller'=>true,'family'=>'شرقی وانیلی','season'=>['پاییز','زمستان'],'concentration'=>'ادو پرفیوم','sku'=>'LF-SD-003','rating'=>4.8,'rating_count'=>421,'description'=>'صندل هندی، وانیل مادگاسکار و تونکا.','variants'=>[[25,3730000],[35,5740000],[100,12250000]]],
            ['name'=>'سوندر فرواید','subtitle'=>'اکسترا پرفیوم','brand'=>'Dark House','price'=>10300000,'image'=>'https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&auto=format','tag'=>'محدود','gender'=>'مردانه','family'=>'چوبی دودی','season'=>['پاییز','زمستان'],'concentration'=>'اکسترا پرفیوم','sku'=>'DH-SF-004','rating'=>4.6,'rating_count'=>89,'description'=>'دود، چرم و زنبق برای تجربه‌ای متفاوت.','variants'=>[[25,8500000],[35,10300000],[100,21000000]]],
            ['name'=>'ریواژ','subtitle'=>'ادو توالت','brand'=>'Côte Bleue','price'=>4000000,'image'=>'https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&auto=format','gender'=>'یونیسکس','family'=>'تازه آبی','season'=>['بهار','تابستان'],'concentration'=>'ادو توالت','sku'=>'CB-RV-005','rating'=>4.2,'rating_count'=>203,'description'=>'نمک اقیانوس، نرولی و چوب تازه.','variants'=>[[25,2500000],[35,4000000],[100,8500000]]],
            ['name'=>'انسنس رویال','subtitle'=>'ادو پرفیوم','brand'=>'Oud Royal','price'=>7500000,'image'=>'https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&auto=format','gender'=>'زنانه','is_bestseller'=>true,'family'=>'گلی شرقی','season'=>['پاییز','زمستان'],'concentration'=>'ادو پرفیوم','sku'=>'OR-IR-006','rating'=>4.9,'rating_count'=>512,'description'=>'کندر خالص با گل رز بلغاری و پاچولی.','variants'=>[[25,4800000],[35,7500000],[100,15800000]]],
            ['name'=>'رز نوار','subtitle'=>'ادو پرفیوم','brand'=>'Jardin Fleuri','price'=>5600000,'original_price'=>7000000,'discount'=>20,'image'=>'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&auto=format','tag'=>'تخفیف','gender'=>'زنانه','is_new'=>true,'is_autumn'=>true,'family'=>'گلی','season'=>['بهار','تابستان'],'concentration'=>'ادو پرفیوم','sku'=>'JF-RN-007','rating'=>4.5,'rating_count'=>178,'description'=>'گل رز بلغاری، مشک سفید و چوب صندل.','variants'=>[[25,3640000],[35,5600000],[100,11920000]]],
            ['name'=>'سیدر فورست','subtitle'=>'ادو توالت','brand'=>'Forest & Stone','price'=>3800000,'image'=>'https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&auto=format','gender'=>'مردانه','family'=>'چوبی','season'=>['بهار','پاییز'],'concentration'=>'ادو توالت','sku'=>'FS-CF-008','rating'=>4.4,'rating_count'=>112,'description'=>'سدر، خاک و پاچولی با حس طبیعت.','variants'=>[[25,2400000],[35,3800000],[100,7900000]]],
        ];

        foreach ($products as $data) {
            $variants = $data['variants']; unset($data['variants']);
            $product = Product::updateOrCreate(['sku' => $data['sku']], array_merge($data, ['stock' => 0]));
            $product->variants()->delete();
            foreach ($variants as [$volume, $price]) $product->variants()->create(['volume_ml'=>$volume,'price'=>$price,'stock'=>20]);
            $product->update(['stock' => array_sum(array_column($variants, 1)) > 0 ? 60 : 0]);
        }
    }
}
