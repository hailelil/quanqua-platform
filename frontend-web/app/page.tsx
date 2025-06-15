'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [randomWords, setRandomWords] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/words', {
        params: {
          search: searchTerm
        }
      });
      setWords(response.data);
      setSelectedWord(null);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRandomWords = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/words/random?count=5');
      setRandomWords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
        <h1 className="text-5xl font-bold text-blue-900 mb-8">Quanqua Dictionary</h1>
        
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter word..."
            className="px-4 py-2 w-96 border rounded shadow text-black"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
          {selectedWord ? (
            // Show selected word
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-black">{selectedWord.word}</p>
                <p className="text-sm text-gray-500">
                  {selectedWord.source_language} → {selectedWord.target_language}
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                {selectedWord.meaning.split('\n').map((line: string, index: number) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedWord(null)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to results
              </button>
            </div>
          ) : (
            // Full list with zebra style OR Random words
            <>
              {words.length > 0 ? (
                words.map((word: any, index: number) => (
                  <div
                    key={word.id}
                    className={`border-b py-3 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    } hover:bg-gray-200`}
                    onClick={() => setSelectedWord(word)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xl font-bold text-black">{word.word}</p>
                      <p className="text-sm text-gray-500">
                        {word.source_language} → {word.target_language}
                      </p>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                      {word.meaning.split('\n').slice(0, 3).map((line: string, lineIndex: number) => (
                        <li key={lineIndex}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                // Random words display
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-4">Explore Words</h2>
                  {randomWords.map((word: any) => (
                    <div
                      key={word.id}
                      className="border-b py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedWord(word)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xl font-bold text-black">{word.word}</p>
                        <p className="text-sm text-gray-500">
                          {word.source_language} → {word.target_language}
                        </p>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                        {word.meaning.split('\n').slice(0, 3).map((line: string, index: number) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}