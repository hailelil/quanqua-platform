'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/words', {
        params: {
          search: searchTerm
        }
      });
      setWords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Quanqua Dictionary</h1>

      <div className="max-w-xl mx-auto flex space-x-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter word..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        {words.map((word: any) => (
          <div key={word.id} className="border-b py-2">
            <p className="text-xl font-semibold">{word.word}</p>
            <p className="text-gray-700">{word.meaning}</p>
            <p className="text-sm text-gray-500">
              {word.source_language} → {word.target_language}
            </p>
          </div>
        ))}
        {words.length === 0 && <p className="text-center text-gray-500">No results</p>}
      </div>
    </main>
  );
}
