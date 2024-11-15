import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../api';

export default function CarFormPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchCar = async () => {
        try {
          // First try to use the car data passed via location state
          if (location.state?.car) {
            const car = location.state.car;
            setTitle(car.title);
            setDescription(car.description);
            setTags(Array.isArray(car.tags) ? car.tags.join(', ') : '');
            setExistingImages(Array.isArray(car.images) ? car.images : []);
            return;
          }

          // If no state data, fetch from API
          const response = await api.get(`/cars/${id}`);
          const carData = response.data.data || response.data;
          
          if (carData) {
            setTitle(carData.title);
            setDescription(carData.description);
            setTags(Array.isArray(carData.tags) ? carData.tags.join(', ') : '');
            setExistingImages(Array.isArray(carData.images) ? carData.images : []);
          } else {
            setError('Failed to load car data');
          }
        } catch (error) {
          console.error('Error fetching car:', error);
          setError('Failed to load car data');
        }
      };

      fetchCar();
    }
  }, [id, isEditing, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      // Split tags by comma and trim whitespace
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      formData.append('tags[]', JSON.stringify(tagArray));
      
      // Append existing images if editing
      if (isEditing && existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }
      
      // Append new images
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      let response;
      if (isEditing) {
        response = await api.put(`/cars/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.post('/cars', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.data.success) {
        navigate('/cars');
      } else {
        setError(response.data.error || `Failed to ${isEditing ? 'update' : 'create'} car`);
      }
    } catch (err) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} car:`, err);
      setError(err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} car`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Car' : 'Add New Car'}</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., sedan, luxury, electric"
            required
          />
        </div>

        {existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Current ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isEditing ? 'Add More Images' : 'Images'} (up to 10)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            You can select up to {10 - existingImages.length} more images
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Car' : 'Create Car')}
        </button>
      </form>
    </div>
  );
}