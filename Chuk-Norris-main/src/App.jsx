// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jokes, setJokes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJokes = async (category) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${category}`);
      setJokes(response.data.result);
      setCurrentJokeIndex(0);
      setIsModalOpen(true);
      setSelectedCategory(category);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
  };

  return (
    <div className="bg-blue-300 min-h-screen">
      <div className="bg-blue-300 p-4 sm:p-12">
        <h1 className="text-3xl font-bold text-center mb-6">Chuck Norris</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 sm:mx-12 md:mx-20 lg:mx-32">
          {categories.map((category) => (
            <div
              key={category}
              className="p-4 mt-2 border rounded-lg cursor-pointer border-gray-300 hover:border-blue-500 bg-white"
              onClick={() => fetchJokes(category)}
            >
              <div className="flex flex-col items-center justify-center h-24 sm:h-36">
                <p className="text-lg font-semibold text-center">{category}</p>
                <p className="text-sm text-gray-600 mt-2 text-center">Unlimited Jokes on {category}</p>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && jokes.length > 0 && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-700 bg-opacity-50">
            <div className="bg-white bg-opacity-90 w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 p-6 rounded-lg shadow-md">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  x
                </button>
              </div>
              <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-600 font-semibold">Loading...</p>
                </div>
              ) : (
                <div>
                  <p>{jokes[currentJokeIndex].value}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handleNextJoke}
                      className="bg-blue-500 text-white py-2 px-4 rounded w-1/2 font-semibold text-center mx-auto"
                    >
                      Next Joke
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
