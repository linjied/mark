
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIConsultant from './components/AIConsultant';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { ChevronRight, ArrowDown, Shield, SearchX, User, Sparkles } from 'lucide-react';

const CategoryMap: Record<string, string> = {
  'All': '全部',
  'Wellness': '亲密康养',
  'Apparel': '精致服饰',
  'Atmosphere': '氛围营造',
  'Essentials': '必备私享'
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
      <Header 
        cartCount={cartCount} 
        onCartToggle={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCategorySelect={(cat) => setActiveCategory(cat as any)}
      />

      <main className="flex-grow">
        {!searchQuery && (
          <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-40"
                alt="Luxury Fabric"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </div>
            
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
              <p className="text-rose-500 font-bold tracking-[0.3em] uppercase animate-pulse">细节之处见优雅</p>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                升华亲密康养的 <br />
                <span className="italic text-zinc-400">生活艺术</span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                为精致人士打造的奢华策划。体验绝对私密的配送服务与顶尖的康养好物。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => {
                    const el = document.getElementById('collection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  探索系列
                  <ChevronRight size={20} />
                </button>
                <button className="px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
                  我们的承诺
                  <Shield size={18} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
              <ArrowDown size={32} />
            </div>
          </section>
        )}

        <section id="collection" className="max-w-7xl mx-auto px-6 py-24 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold">
                {searchQuery ? `关于 "${searchQuery}" 的搜索结果` : "策划精选"}
              </h3>
              <p className="text-zinc-500 max-w-md">
                {searchQuery 
                  ? `为您找到 ${filteredProducts.length} 件匹配的单品。` 
                  : "我们的专家为您精心挑选，重新定义现代奢华与康养。"}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All', ...Object.values(Category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
                    activeCategory === cat 
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
                      : 'bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {CategoryMap[cat].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-700">
                <SearchX size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif font-bold text-zinc-300">未找到匹配项</h4>
                <p className="text-zinc-500">尝试调整您的搜索词或分类筛选来寻找心仪产品。</p>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-rose-500 hover:text-rose-400 font-bold tracking-widest text-xs uppercase underline underline-offset-8"
              >
                清除所有过滤器
              </button>
            </div>
          )}
        </section>

        {!searchQuery && (
          <section className="bg-zinc-950 border-y border-white/5 py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-rose-600/10 rounded-xl flex items-center justify-center text-rose-500 mx-auto">
                  <Shield size={24} />
                </div>
                <h4 className="text-xl font-serif font-bold">绝对私密</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">无标志包装、加密账单和身份保护是每个订单的标准配置。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-rose-600/10 rounded-xl flex items-center justify-center text-rose-500 mx-auto">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-xl font-serif font-bold">卓越品质</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">每件单品在进入目录前都经过严格的安全、耐用和质感测试。</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-rose-600/10 rounded-xl flex items-center justify-center text-rose-500 mx-auto">
                  <User size={24} />
                </div>
                <h4 className="text-xl font-serif font-bold">礼宾服务</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">我们的 AI 导购和人工团队随时为您提供定制化的康养建议。</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-widest">L'AMOUR</h2>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              自 2024 年起重新定义奢华亲密体验。我们的使命是通过高端策划和无与伦比的服务提供精致的康养方案。
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="text-sm font-bold uppercase tracking-widest text-zinc-300">探索</h5>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-rose-500 transition-colors">所有系列</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">康养指南</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">高端服饰</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">会员权益</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-sm font-bold uppercase tracking-widest text-zinc-300">隐私</h5>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-rose-500 transition-colors">私密配送</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">账单政策</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">服务条款</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">数据加密</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 tracking-widest uppercase">
          <p>© 2024 L'AMOUR BOUTIQUE. 保留所有权利。</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-400">INSTAGRAM</a>
            <a href="#" className="hover:text-zinc-400">PINTEREST</a>
            <a href="#" className="hover:text-zinc-400">专刊</a>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
      
      <AIConsultant />
    </div>
  );
};

export default App;
