import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function CarDetailPage() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/cars/${id}`);
        
        if (response.data && response.data.data) {
          setCar(response.data.data);
        } else if (response.data) {
          setCar(response.data);
        } else {
          setError('Invalid car data received');
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        setError(error.response?.data?.message || 'Error loading car details');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const response = await api.delete(`/cars/${id}`);
        if (response.data?.success) {
          navigate('/cars');
        } else {
          setError('Failed to delete car');
        }
      } catch (error) {
        console.error('Error deleting car:', error);
        setError(error.response?.data?.message || 'Error deleting car');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-red-500">{error}</div>
        <Link to="/cars" className="text-blue-500 hover:text-blue-700 underline">
          Back to Cars
        </Link>
      </div>
    );
  }

  if (!car || !car.title) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-lg">Car not found</div>
        <Link to="/cars" className="text-blue-500 hover:text-blue-700 underline">
          Back to Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          {Array.isArray(car.images) && car.images.length > 0 ? (
            <img 
              src={car.images[selectedImageIndex]} 
              alt={`${car.title} - Main View`} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{car.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-4">{car.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(car.tags) && car.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {Array.isArray(car.images) && car.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === index ? 'border-blue-500 scale-105' : 'border-transparent hover:border-blue-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${car.title} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <Link 
              to={`/cars/${id}/edit`}
              state={{ car }} // Pass car data to edit form
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <Link 
              to="/cars" 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}