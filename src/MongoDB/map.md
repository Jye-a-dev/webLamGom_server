📦 Database
│
├── 👤 Users
│   ├── _id : ObjectId
│   ├── name : string
│   ├── email : string (unique)
│   ├── password : string (bcrypt)
│   ├── role : string (user | admin)
│   ├── phone : string
│   ├── avatar : string
│   ├── isVerified : boolean
│   ├── createdAt : date
│   │
│   ├── 📍 Addresses
│   │   ├── _id : ObjectId
│   │   ├── userId : ObjectId
│   │   ├── name : string
│   │   ├── phone : string
│   │   ├── province : string
│   │   ├── district : string
│   │   ├── ward : string
│   │   └── detail : string
│   │
│   ├── 🛒 Carts
│   │   ├── _id : ObjectId
│   │   ├── userId : ObjectId
│   │   └── items[]
│   │        ├── productId : ObjectId
│   │        ├── quantity : number
│   │        └── price : number
│   │
│   ├── 📦 Orders
│   │   ├── _id : ObjectId
│   │   ├── userId : ObjectId
│   │   ├── addressId : ObjectId
│   │   ├── totalPrice : number
│   │   ├── status : string
│   │   ├── paymentStatus : string
│   │   ├── createdAt : date
│   │   │
│   │   ├── items[]
│   │   │   ├── productId : ObjectId
│   │   │   ├── quantity : number
│   │   │   └── price : number
│   │   │
│   │   └── 💳 Payments
│   │       ├── _id : ObjectId
│   │       ├── orderId : ObjectId
│   │       ├── method : string
│   │       ├── status : string
│   │       ├── transactionId : string
│   │       └── paidAt : date
│   │
│   └── ⭐ Reviews
│       ├── _id : ObjectId
│       ├── userId : ObjectId
│       ├── productId : ObjectId
│       ├── rating : number
│       ├── comment : string
│       └── createdAt : date
│
├── 🛍 Products
│   ├── _id : ObjectId
│   ├── name : string
│   ├── slug : string
│   ├── description : string
│   ├── price : number
│   ├── stock : number
│   ├── categoryId : ObjectId
│   ├── images : string[]
│   ├── isFeatured : boolean
│   └── createdAt : date
│
│   ├── 📂 Categories
│   │   ├── _id : ObjectId
│   │   ├── name : string
│   │   ├── slug : string
│   │   └── description : string
│   │
│   ├── ⭐ Reviews
│   │   └── (tham chiếu users.reviews)
│   │
│   └── 🛒 Carts.items
│       └── (tham chiếu productId)
│
└── 📦 Orders
    ├── items[]
    │   ├── productId
    │   ├── quantity
    │   └── price
    │
    └── 💳 Payments