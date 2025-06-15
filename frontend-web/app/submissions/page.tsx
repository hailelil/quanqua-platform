'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8002/submissions/pending');
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">User Submitted Words (Pending)</h1>

        <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
          {submissions.map((submission: any) => (
            <div key={submission.id} className="border-b py-3">
              <p className="text-xl font-semibold mb-2">{submission.word}</p>
              <p className="text-gray-700 whitespace-pre-line">{submission.meaning}</p>
              <p className="text-sm text-gray-500 mt-1">
                Status: {submission.status} | Submitted at: {new Date(submission.created_at).toLocaleString()}
              </p>
            </div>
          ))}
          {submissions.length === 0 && <p className="text-center text-gray-500">No submissions</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}