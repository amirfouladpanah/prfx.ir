<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Product; use Illuminate\Http\Request;
class ProductController extends Controller {
 public function index(Request $r){$q=Product::with(['variants','images'])->withCount(['reviews as approved_reviews_count'=>fn($x)=>$x->where('status','approved')]); if($r->filled('search')) $q->where(fn($x)=>$x->where('name','like','%'.$r->search.'%')->orWhere('brand','like','%'.$r->search.'%')->orWhere('sku','like','%'.$r->search.'%')); foreach(['brand','gender','family'] as $f) if($r->filled($f)) $q->whereIn($f,(array)$r->$f); if($r->filled('season')) $q->whereJsonContains('season',$r->season); if($r->filled('min_price')) $q->where('price','>=',$r->min_price); if($r->filled('max_price')) $q->where('price','<=',$r->max_price); if($r->sort==='asc') $q->orderBy('price'); elseif($r->sort==='desc') $q->orderByDesc('price'); elseif($r->sort==='newest') $q->orderByDesc('is_new')->orderByDesc('created_at'); return $q->paginate($r->integer('per_page',12)); }
 public function show(Product $product){return $product->load(['variants','images','reviews'=>fn($q)=>$q->where('status','approved')->with('user:id,name')]);}
}
