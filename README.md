car-management-app/
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── car.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── car.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── car.routes.js
│   │
│   ├── utils/
│   │   ├── jwt.utils.js
│   │   ├── password.utils.js
│   │   └── response.utils.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── swagger.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   │
│   │   │   ├── car/
│   │   │   │   ├── CarCard.jsx
│   │   │   │   ├── CarForm.jsx
│   │   │   │   ├── CarList.jsx
│   │   │   │   ├── CarDetail.jsx
│   │   │   │   └── ImageUpload.jsx
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── MainLayout.jsx
│   │   │       └── AuthLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   │
│   │   │   ├── car/
│   │   │   │   ├── CarListPage.jsx
│   │   │   │   ├── CarCreatePage.jsx
│   │   │   │   ├── CarEditPage.jsx
│   │   │   │   └── CarDetailPage.jsx
│   │   │   │
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── car.service.js
│   │   │   └── api.service.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── LoadingContext.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── axios.js
│   │   │   ├── constants.js
│   │   │   ├── validation.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── assets/
│   │   │   ├── styles/
│   │   │   │   └── index.css
│   │   │   └── images/
│   │   │
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── Routes.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md