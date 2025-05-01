// const role = localStorage.getItem('role');
// let filteredItems = [];

// if (role === 'Super Admin') {
//   filteredItems = [
//     {
//       id: 'navigation',
//       title: 'Navigation',
//       type: 'group',
//       icon: 'icon-navigation',
//       children: [
//         {
//           id: 'dashboard',
//           title: 'Dashboard',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/dashboard'
//         },
//         {
//           id: 'production-orders',
//           title: 'Production Orders',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/production-orders'
//         },
//         {
//           id: 'palletizing',
//           title: 'Palletizing',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/palletizing'
//         },
//         {
//           id: 'shipping-orders',
//           title: 'Shipping Orders',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/shipping-orders'
//         },
//         {
//           id: 'loading-checkpoint',
//           title: 'Loading Checkpoint',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/loading-checkpoint'
//         },
//         {
//           id: 'sales-orders',
//           title: 'Sales Orders',
//           type: 'item',
//           icon: 'feather icon-shopping-cart',
//           url: '/sales-orders'
//         },
//         {
//           id: 'create-sales-orders',
//           title: 'Create Sales Orders',
//           type: 'item',
//           icon: 'feather icon-shopping-cart',
//           url: '/create-sales-order'
//         },
//         {
//           id: 'warehouse-inventory',
//           title: 'Warehouse Inventory',
//           type: 'item',
//           icon: 'feather icon-home',
//           url: '/warehouse-inventory'
//         },
//       ]
//     },
//     {
//       id: 'ui-settings',
//       title: 'Settings',
//       type: 'group',
//       icon: 'icon-ui',
//       children: [
//         {
//           id: 'settings',
//           title: 'Settings',
//           type: 'collapse',
//           icon: 'feather icon-settings',
//           children: [
//             {
//               id: 'users',
//               title: 'Users',
//               type: 'item',
//               url: '/users'
//             },
//             {
//               id: 'roles',
//               title: 'Roles',
//               type: 'item',
//               url: '/roles'
//             },
//             {
//               id: 'customers',
//               title: 'Customers',
//               type: 'item',
//               url: '/customers'
//             },
//             {
//               id: 'warehouses',
//               title: 'Warehouses',
//               type: 'item',
//               url: '/warehouses'
//             },
//             {
//               id: 'line',
//               title: 'Line',
//               type: 'item',
//               url: '/line'
//             },
//             {
//               id: 'products',
//               title: 'Products',
//               type: 'item',
//               url: '/products'
//             },
//             {
//               id: 'sizes',
//               title: 'Size',
//               type: 'item',
//               url: '/size'
//             },
//             {
//               id: 'color',
//               title: 'Color',
//               type: 'item',
//               url: '/color'
//             },
//             {
//               id: 'priority',
//               title: 'Priority',
//               type: 'item',
//               url: '/priority'
//             }
//           ]
//         }
//       ]
//     },
//   ]
// } else if (role === 'sales-order') {
//   // Sales-order gets only sales-orders route
//   filteredItems = [
//     {
//       id: 'navigation',
//       title: 'Navigation',
//       type: 'group',
//       icon: 'icon-navigation',
//       children: [
//         {
//           id: 'sales-orders',
//           title: 'Sales Orders',
//           type: 'item',
//           icon: 'feather icon-shopping-cart',
//           url: '/sales-orders'
//         }
//       ]
//     }
//   ];
// }

const menuItems = {
  items:  [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        },
        {
          id: 'production-orders',
          title: 'Production Orders',
          type: 'item',
          icon: 'feather icon-home',
          url: '/production-orders'
        },
        {
          id: 'palletizing',
          title: 'Palletizing',
          type: 'item',
          icon: 'feather icon-home',
          url: '/palletizing'
        },
        {
          id: 'shipping-orders',
          title: 'Shipping Orders',
          type: 'item',
          icon: 'feather icon-home',
          url: '/shipping-orders'
        },
        {
          id: 'loading-checkpoint',
          title: 'Loading Checkpoint',
          type: 'item',
          icon: 'feather icon-home',
          url: '/loading-checkpoint'
        },
        {
          id: 'sales-orders',
          title: 'Sales Orders',
          type: 'item',
          icon: 'feather icon-shopping-cart',
          url: '/sales-orders'
        },
        {
          id: 'create-sales-orders',
          title: 'Create Sales Orders',
          type: 'item',
          icon: 'feather icon-shopping-cart',
          url: '/create-sales-order'
        },
        {
          id: 'warehouse-inventory',
          title: 'Warehouse Inventory',
          type: 'item',
          icon: 'feather icon-home',
          url: '/warehouse-inventory'
        },
      ]
    },
    {
      id: 'ui-settings',
      title: 'Settings',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'settings',
          title: 'Settings',
          type: 'collapse',
          icon: 'feather icon-settings',
          children: [
            {
              id: 'users',
              title: 'Users',
              type: 'item',
              url: '/users'
            },
            {
              id: 'roles',
              title: 'Roles',
              type: 'item',
              url: '/roles'
            },
            {
              id: 'customers',
              title: 'Customers',
              type: 'item',
              url: '/customers'
            },
            {
              id: 'warehouses',
              title: 'Warehouses',
              type: 'item',
              url: '/warehouses'
            },
            {
              id: 'line',
              title: 'Line',
              type: 'item',
              url: '/line'
            },
            {
              id: 'products',
              title: 'Products',
              type: 'item',
              url: '/products'
            },
            {
              id: 'sizes',
              title: 'Size',
              type: 'item',
              url: '/size'
            },
            {
              id: 'color',
              title: 'Color',
              type: 'item',
              url: '/color'
            },
            {
              id: 'priority',
              title: 'Priority',
              type: 'item',
              url: '/priority'
            }
          ]
        }
      ]
    },
  ]
};

export default menuItems;
