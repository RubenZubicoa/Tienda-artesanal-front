export type Section = {
  title: string;
  icon: string;
  route: string;
  badge?: number;
  menu?: boolean;
  disabled?: boolean;
};

export const SIDENAV_SECTIONS: Section[] = [
  {
    title: 'layout.home',
    icon: 'home',
    route: '/home',
  },
  {
    title: 'layout.manufacturers',
    icon: 'store',
    route: '/manufacturers',
  },
  {
    title: 'layout.products',
    icon: 'category',
    route: '/products',
  },
];

export const HEADER_SECTIONS: Section[] = [
  {
    title: 'layout.profile',
    icon: 'person',
    route: '#',
    menu: true,
  },
  {
    title: 'layout.cart',
    icon: 'shopping_cart',
    route: '/carrito',
  },
]

export const MANUFACTURERS_SECTIONS: Section[] = [
  {
    title: 'layout.orders',
    icon: 'list',
    route: '/orders',
  },
  {
    title: 'layout.my-products',
    icon: 'inventory',
    route: '/my-products',
  },
  {
    title: 'layout.meeting-points',
    icon: 'location_on',
    route: '/meeting-points',
  },
  {
    title: 'layout.analysis',
    icon: 'analytics',
    route: '/analysis',
    disabled: true,
  }
]