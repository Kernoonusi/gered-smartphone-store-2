import { OrderForm } from '@/components/order-form';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/layouts/app-layout';
import { Order, OrderItem, SmartphoneFull, User } from '@/types';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { Deferred, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Minus, Plus, Trash, ShoppingBag, Heart, ArrowRight, Sparkles } from 'lucide-react';

import './index.css';

interface PageProps {
  cart: Order;
  user: User;
  totalPrice: number;
  [key: string]: unknown;
}

function ProductList() {
  const { products } = usePage<{ products: SmartphoneFull[] | undefined; [key: string]: unknown }>().props;
  return (
    <>
      {products && (
        <article className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </article>
      )}
    </>
  );
}

function EmptyCartState() {
  const { t } = useLaravelReactI18n();
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative max-w-2xl w-full">
        {/* Floating background elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-fuchsia-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-cyan-300/10 to-fuchsia-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Main empty state card */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="text-center space-y-8">
            {/* Icon with glassmorphic background */}
            <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-inner">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl"></div>
              <ShoppingBag className="w-16 h-16 text-white/80 relative z-10" strokeWidth={1.5} />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-400/60 to-cyan-400/60 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
            </div>
            
            {/* Title with enhanced gradient */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent drop-shadow-lg">
                {t('cart.empty')}
              </h1>
              <p className="text-xl text-white/60 max-w-md mx-auto leading-relaxed">
                Откройте для себя удивительные смартфоны и добавьте их в корзину
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                onClick={() => router.visit('/')}
                className="group relative overflow-hidden bg-gradient-to-r from-fuchsia-500/80 to-cyan-500/80 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/25 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Начать покупки
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartIndex() {
  const { cart, user, totalPrice } = usePage<PageProps>().props;
  const { t } = useLaravelReactI18n();

  const increaseCount = (item: OrderItem) => {
    router.patch(route('cart.update', { id: item.id }), { count: item.count + 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  const decreaseCount = (item: OrderItem) => {
    if (item.count <= 1) {
      removeItem(item);
      return;
    }
    router.patch(route('cart.update', { id: item.id }), { count: item.count - 1 }, { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  const removeItem = (item: OrderItem) => {
    router.delete(route('cart.remove', { id: item.id }), { only: ['cart', 'totalPrice'], preserveScroll: true });
  };

  // Show empty state if no items
  if (cart.items.length === 0) {
    return (
      <Layout>
        <EmptyCartState />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Floating Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-fuchsia-400/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-6">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80 font-medium">
                {cart.items.reduce((acc, item) => acc + item.count, 0)} товаров в корзине
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent mb-6">
              {t('cart.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Ваши выбранные товары готовы к оформлению заказа
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-6">
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/8 hover:to-white/15"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Floating gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 p-4 shadow-inner">
                      <img
                        src={item.product.images[0].image_path}
                        // srcSet={'/phone.webp'}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-400/80 to-cyan-400/80 backdrop-blur-sm border border-white/40"></div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                      {item.product.brand} {item.product.model}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                      {currencyFormatter.format(item.price)}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => decreaseCount(item)}
                        className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 transition-all duration-200 hover:scale-110"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="min-w-[3rem] text-center text-xl font-bold text-white px-2">
                        {item.count}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => increaseCount(item)}
                        className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 transition-all duration-200 hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item)}
                      className="h-12 w-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/20 hover:border-red-500/40 transition-all duration-200 hover:scale-110"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/15 border border-white/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5"></div>
                
                <CardHeader className="relative z-10 border-b border-white/20 p-8">
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-400/30 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    {t('cart.to_pay')}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-white/80">
                      <span className="text-lg">Товаров:</span>
                      <span className="font-medium">{cart.items.reduce((acc, item) => acc + item.count, 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white/80">{t('cart.items_total')}:</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                        {currencyFormatter.format(totalPrice)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{t('cart.total')}:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
                      {currencyFormatter.format(totalPrice)}
                    </span>
                  </div>
                </CardContent>
                
                <CardFooter className="relative z-10 border-t border-white/20 p-8">
                  {user.email ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full group relative overflow-hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white font-bold py-4 px-8 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/25 hover:scale-105 text-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center justify-center gap-3">
                            {t('cart.checkout')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/15 border border-white/30 shadow-2xl max-w-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 rounded-3xl"></div>
                        <div className="relative z-10">
                          <OrderForm />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button disabled className="w-full cursor-not-allowed rounded-2xl bg-white/5 py-4 px-8 font-bold text-white/40 border border-white/10 backdrop-blur-sm text-lg">
                      {t('cart.need_auth')}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-20">
          <div className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent mb-4">
                  {t('cart.recommend')}
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Откройте для себя еще больше потрясающих устройств
                </p>
              </div>
              <Deferred 
                data="products" 
                fallback={
                  <div className="py-16 text-center">
                    <div className="inline-flex items-center gap-3 text-white/60 text-lg">
                      <div className="w-6 h-6 border-2 border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin"></div>
                      {t('cart.loading')}
                    </div>
                  </div>
                }
              >
                <ProductList />
              </Deferred>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}