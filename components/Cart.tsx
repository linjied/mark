
import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag, Truck, CreditCard, CheckCircle2, ChevronLeft, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

type CartView = 'cart' | 'checkout' | 'success';

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const [view, setView] = useState<CartView>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => setView('checkout');
  const handleBack = () => setView('cart');
  
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // 模拟支付处理延迟
    setTimeout(() => {
      setIsProcessing(false);
      setView('success');
    }, 2000);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => setView('cart'), 500); // 侧边栏关闭后再重置状态
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 shadow-2xl z-[60] transform transition-transform duration-500 border-l border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {view === 'checkout' && (
              <button onClick={handleBack} className="p-1 -ml-2 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-serif font-bold">
              {view === 'cart' && '您的购物袋'}
              {view === 'checkout' && '结算信息'}
              {view === 'success' && '订购成功'}
            </h2>
          </div>
          <button onClick={resetAndClose} className="p-2 text-zinc-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-6">
          {view === 'cart' && (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-20 space-y-4 text-center">
                  <ShoppingBag size={48} className="opacity-20 mx-auto" />
                  <p>您的购物袋目前为空。</p>
                  <button 
                    onClick={onClose}
                    className="text-rose-500 hover:text-rose-400 font-medium transition-colors"
                  >
                    开始探索系列
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="w-20 h-24 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-zinc-200">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">数量: {item.quantity}</p>
                      <p className="text-sm font-medium text-zinc-300 mt-2">¥{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {view === 'checkout' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Truck size={14} /> 收货信息
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="收货姓名" className="col-span-1 bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50" />
                  <input type="text" placeholder="联系电话" className="col-span-1 bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50" />
                </div>
                <input type="text" placeholder="详细配送地址" className="w-full bg-zinc-900 border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50" />
                <div className="flex items-center gap-2 px-1">
                  <input type="checkbox" checked readOnly id="discrete" className="accent-rose-500" />
                  <label htmlFor="discrete" className="text-[11px] text-zinc-400">开启 100% 私密配送（包裹面单将不包含任何敏感信息）</label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard size={14} /> 支付方式
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-rose-500/50 bg-rose-500/5">
                    <div className="w-6 h-6 bg-blue-500 rounded-full mb-1" />
                    <span className="text-[10px] font-medium">支付宝</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-zinc-900 hover:border-white/20 transition-colors">
                    <div className="w-6 h-6 bg-green-500 rounded-full mb-1" />
                    <span className="text-[10px] font-medium">微信支付</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-zinc-900 hover:border-white/20 transition-colors">
                    <CreditCard size={18} className="mb-1 text-zinc-400" />
                    <span className="text-[10px] font-medium">信用卡</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-600/20 blur-2xl rounded-full" />
                <CheckCircle2 size={80} className="text-rose-500 relative" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">感谢您的信任</h3>
                <p className="text-zinc-500 text-sm">您的订单 #LM{Math.floor(Math.random() * 1000000)} 已收到</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 max-w-xs">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  您的包裹预计于 2-3 个工作日内送达。
                  <br /><br />
                  <span className="text-rose-500 font-bold uppercase tracking-wider">私密提醒</span>
                  <br />
                  账单中将以“精品百货”或“文化用品”显示。
                </p>
              </div>
              <button 
                onClick={resetAndClose}
                className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-rose-500 hover:text-white transition-all"
              >
                继续探索
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && view !== 'success' && (
          <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-4">
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>商品小计</span>
              <span>¥{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-sm">
              <span>运费预估</span>
              <span className="text-rose-500 uppercase tracking-tighter font-bold italic">全场包邮 & 私密配送</span>
            </div>
            <div className="flex justify-between text-white font-medium text-lg pt-2">
              <span>应付总计</span>
              <span>¥{subtotal.toFixed(2)}</span>
            </div>
            
            {view === 'cart' ? (
              <button 
                onClick={handleCheckout}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-[0.98]"
              >
                前往结账
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    正在安全加密支付...
                  </div>
                ) : (
                  <>
                    确认支付 ¥{subtotal.toFixed(2)}
                    <Lock size={16} />
                  </>
                )}
              </button>
            )}
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest pt-2">
              <ShieldCheck size={12} />
              全站 SSL 256位加密交易保障
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
