
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, ShieldCheck, X, ChevronRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onSearchChange: (query: string) => void;
  onCategorySelect: (category: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, onSearchChange, onCategorySelect, searchQuery }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'Wellness', label: '亲密康养' },
    { id: 'Apparel', label: '精致服饰' },
    { id: 'Atmosphere', label: '氛围营造' },
    { id: 'Essentials', label: '必备私享' }
  ];

  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  // 禁用背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (id: string) => {
    onCategorySelect(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              <Menu size={24} />
            </button>
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/60">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="hover:text-white transition-colors tracking-widest uppercase text-xs"
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          <div className={`flex flex-col items-center transition-all duration-300 ${isSearchVisible ? 'opacity-0 scale-95 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}>
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white">L'AMOUR</h1>
            <div className="flex items-center gap-1 text-[8px] md:text-[10px] text-zinc-500 tracking-tight">
              <ShieldCheck size={10} />
              <span className="whitespace-nowrap uppercase tracking-tighter">加密保护 & 私密配送</span>
            </div>
          </div>

          <div className={`flex-grow max-w-xl transition-all duration-500 flex items-center ${isSearchVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none w-0'}`}>
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索我们的奢华系列..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent border-b border-rose-500/50 py-2 px-4 text-white focus:outline-none placeholder:text-zinc-600 font-light"
              />
              <button 
                onClick={() => {
                  setIsSearchVisible(false);
                  onSearchChange('');
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {!isSearchVisible && (
              <button 
                onClick={() => setIsSearchVisible(true)} 
                className="text-white/70 hover:text-white transition-colors"
              >
                <Search size={22} />
              </button>
            )}
            <button className="hidden sm:block text-white/70 hover:text-white transition-colors">
              <User size={22} />
            </button>
            <button 
              onClick={onCartToggle}
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-[101] w-[80%] max-w-sm bg-zinc-950 shadow-2xl transition-transform duration-500 transform lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <div className="text-xl font-serif font-bold tracking-widest text-white">L'AMOUR</div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-1 mb-12">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] mb-4">分类浏览</p>
            <nav className="flex flex-col gap-6">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex items-center justify-between group py-2"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="text-2xl font-serif text-zinc-300 group-hover:text-rose-500 transition-colors">
                    {cat.label}
                  </span>
                  <ChevronRight size={20} className="text-zinc-700 group-hover:text-rose-500 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
              <button
                onClick={() => handleCategoryClick('All')}
                className="flex items-center justify-between group py-2 mt-4"
              >
                <span className="text-lg font-medium text-zinc-500 group-hover:text-white transition-colors">
                  全部系列
                </span>
              </button>
            </nav>
          </div>

          <div className="mt-auto space-y-6 pt-8 border-t border-white/5">
            <div className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors">
              <User size={20} />
              <span className="text-sm">个人账户中心</span>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">L'Amour 隐私保障</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                所有包裹均采用无标志包装，账单加密。您的隐私是我们的首要使命。
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
