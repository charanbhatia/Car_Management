# Car Management Application

A full-stack web application for managing car inventories with user authentication, image handling, and search functionality.

## 🚀 Features

- User Authentication (Signup/Login)
- Car Management (Create, Read, Update, Delete)
- Multiple Image Upload (up to 10 images per car)
- Tag-based Organization
- Search Functionality
- Responsive Design

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)

### Frontend
- React.js
- React Router v6
- Axios
- Tailwind CSS
- Context API for State Management

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Cloudinary Account

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/car-management.git
cd car-management/backend

2. Install dependencies


```shellscript
 npm installnpm install

```

3. Create a .env file in the backend directory


```plaintext
 PORT=5000PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

4. Start the server


```shellscript
 npm startnpm start

```

### Frontend Setup

1. Navigate to the frontend directory


```shellscript
 cd ../frontendcd ../frontend

```

2. Install dependencies


```shellscript
 npm installnpm install

```

3. Create a .env file in the frontend directory


```plaintext
 REACT_APP_API_URL=http://localhost:5000/apiREACT_APP_API_URL=http://localhost:5000/api

```

4. Start the development server


```shellscript
 npm startnpm start

```

## 🚀 Deployment

### Backend Deployment

1. Set up your server (Heroku, DigitalOcean, etc.)
2. Configure environment variables
3. Deploy the backend code
4. Update CORS configuration with your frontend URL


### Frontend Deployment

1. Update the API URL in environment variables
2. Deploy to Vercel:

1. Connect your GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy





## 📝 API Documentation
https://scythe-columnist-019.notion.site/Car-Management-Application-Documentation-13fcfc8a0c6d80a98740f60c9f6b5439

### Authentication Endpoints

```
POST /api/auth/signup
POST /api/auth/login
```

### Car Endpoints

```
GET    /api/cars         - Get all cars
GET    /api/cars/:id     - Get specific car
POST   /api/cars         - Create new car
PUT    /api/cars/:id     - Update car
DELETE /api/cars/:id     - Delete car
```

## 🔒 Security

- JWT for secure authentication
- Password hashing using bcrypt
- Protected API endpoints
- Secure file upload handling
- Input validation and sanitization


## 🧪 Testing

```shellscript
 # Run backend tests# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

```

## 📁 Project Structure

```plaintext
 car-management/car-management/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── utils/

```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🐛 Known Issues

- Image upload size is limited to 5MB per image
- Maximum of 10 images per car
- Search functionality is case-sensitive

