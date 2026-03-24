src/
├── admin/ # Admin-specific pages + layout
│ ├── pages/
│ │ ├── Dashboard.tsx
│ │ ├── Products.tsx
│ │ ├── Orders.tsx
│ │ └── Users.tsx
│ ├── components/
│ │ ├── Sidebar.tsx
│ │ ├── Navbar.tsx
│ │ └── Card.tsx
│ └── routes.tsx # Admin routes
│
├── components/ # Shared components
│ ├── Button.tsx
│ ├── Input.tsx
│ └── Table.tsx
│
├── hooks/ # Custom hooks (ex: useProducts, useAuth)
│
├── pages/ # Public pages (frontend store)
│ ├── Home.tsx
│ ├── ProductDetails.tsx
│ ├── Cart.tsx
│ └── Checkout.tsx
│
├── store/ # Zustand / Redux store
│ ├── productStore.ts
│ └── authStore.ts
│
├── types/ # TS types/interfaces
│ ├── product.ts
│ └── order.ts
│
├── utils/ # Helpers (API clients, formatters)
│
├── App.tsx
└── main.tsx
