export const PAGES = [
    { name: 'Inici', path: '/', isScroll: false  },
    { name: 'Adoptar', path: '/adopt', isScroll: false  },
    { name: 'Posar en adopció', path: '/put-adoption', isScroll: false  },
    { name: 'Campanyes', path: '/', isScroll: true },
  ] as const;
  
  export const SETTINGS = [
    { name: 'Compte', path: '/account', action: 'none' as const  },
    { name: 'Panell de control', path: '/dashboard', action: 'none' as const  },
    { name: 'Tancar sessió', action: 'logout' as const ,path: '/' },
  ] as const;