import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        // Ensure we're setting an array, even if empty
        setCars(Array.isArray(response.data) ? response.data : response.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load cars. Please try again later.');
        setIsLoading(false);
        // Ensure cars is always an array even on error
        setCars([]);
      }
    };
    fetchCars();
  }, []);

  // Only filter if we have cars and a search term
  const filteredCars = searchTerm
    ? cars.filter(car =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : cars;

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Cars</h1>
        <Link
          to="/cars/create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          Add New Car
        </Link>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No cars found.</p>
          <Link 
            to="/cars/create" 
            className="text-primary hover:underline"
          >
            Add your first car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <div key={car._id} className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={car.images[0] || '/placeholder.svg'} 
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {car.description.length > 100 
                    ? `${car.description.substring(0, 100)}...` 
                    : car.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/cars/${car._id}`}
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 py-2 rounded-md w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}