'use client';

import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SubmitWord() {
  const [formData, setFormData] = useState({
    source_language: 'Tigrigna',
    target_language: 'Tigrigna',
    word: '',
    meaning: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:8001/submissions', formData);
      alert('✅ Word submitted for review!');
      setFormData({
        source_language: 'Tigrigna',
        target_language: 'Tigrigna',
        word: '',
        meaning: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Submit New Word</h1>

        <div className="w-full max-w-xl bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Translation Type:</label>
            <select
              name="target_language"
              value={formData.target_language}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Tigrigna">Tigrigna → Tigrigna</option>
              <option value="English">Tigrigna → English</option>
            </select>
          </div>

          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleChange}
            placeholder="Word in Tigrigna"
            className="w-full px-4 py-2 border rounded"
          />

          <textarea
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            placeholder="Meaning in selected language"
            rows={5}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}