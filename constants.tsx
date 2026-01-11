
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '午夜丝绸长袍',
    description: '极其奢华的桑蚕丝长袍，配有手工完成的蕾丝细节，轻盈如肤。',
    price: 1380.00,
    category: 'Apparel',
    image: 'https://picsum.photos/seed/robe/600/800',
    rating: 4.9
  },
  {
    id: '2',
    name: '宁静律动仪',
    description: '人体工程学硅胶康养设备，采用静音技术，内置 12 种律动模式。',
    price: 920.00,
    category: 'Wellness',
    image: 'https://picsum.photos/seed/wellness1/600/800',
    rating: 4.8,
    isDiscrete: true
  },
  {
    id: '3',
    name: '丝绒玫瑰按摩蜡烛',
    description: '大豆基底按摩蜡烛，融化后可化作温暖、滋养肌肤的润体油。',
    price: 320.00,
    category: 'Atmosphere',
    image: 'https://picsum.photos/seed/candle/600/800',
    rating: 4.7
  },
  {
    id: '4',
    name: '阿芙罗狄蒂灵药',
    description: '含有芦荟和维生素 E 的天然植物润滑精华，温和纯净。',
    price: 228.00,
    category: 'Essentials',
    image: 'https://picsum.photos/seed/elixir/600/800',
    rating: 4.6
  },
  {
    id: '5',
    name: '星辰蕾丝套装',
    description: '精致的翡翠绿蕾丝内衣套装，配有定制金色金属件。',
    price: 540.00,
    category: 'Apparel',
    image: 'https://picsum.photos/seed/lace/600/800',
    rating: 5.0
  },
  {
    id: '6',
    name: '灵动香薰机',
    description: '超声波香薰加湿器，配备环境氛围灯，营造完美私密空间。',
    price: 628.00,
    category: 'Atmosphere',
    image: 'https://picsum.photos/seed/diffuser/600/800',
    rating: 4.5
  },
  {
    id: '7',
    name: '暗影魔杖',
    description: '高端加重型康养魔杖，带来深度共振与极致放松。',
    price: 1150.00,
    category: 'Wellness',
    image: 'https://picsum.photos/seed/wand/600/800',
    rating: 4.9,
    isDiscrete: true
  },
  {
    id: '8',
    name: '绸缎睡眠眼罩',
    description: '衬垫绸缎眼罩，提供完全的感官隔离，享受极致安眠。',
    price: 168.00,
    category: 'Essentials',
    image: 'https://picsum.photos/seed/mask/600/800',
    rating: 4.4
  }
];
