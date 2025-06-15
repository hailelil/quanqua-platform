'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const fetchPendingSubmissions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8002/submissions/pending');
      setSubmissions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      setLoadingIds((prev) => [...prev, id]);
      await axios.post(`http://127.0.0.1:8002/submissions/${id}/approve`);
      setMessage(`✅ Word ID ${id} approved and added to Dictionary.`);
      fetchPendingSubmissions();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleReject = async (id: number) => {
    try {
      setLoadingIds((prev) => [...prev, id]);
      await axios.post(`http://127.0.0.1:8002/submissions/${id}/reject`);
      setMessage(`⚠️ Word ID ${id} rejected.`);
      fetchPendingSubmissions();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  useEffect(() => {
    fetchPendingSubmissions();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Admin Panel - Pending Submissions</h1>

        {message && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded shadow w-full max-w-3xl text-center">
            {message}
          </div>
        )}

        <div className="w-full max-w-3xl bg-white p-6 rounded shadow space-y-4">
          {submissions.map((submission: any) => (
            <div key={submission.id} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-bold text-black">{submission.word}</p>
                <p className="text-sm text-gray-500">
                  {submission.source_language} → {submission.target_language}
                </p>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4 mb-2">
                {submission.meaning.split('\n').map((line: string, index: number) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <p className="text-sm text-gray-400 mb-2">
                Submitted at: {new Date(submission.created_at).toLocaleString()}
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleApprove(submission.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
                  disabled={loadingIds.includes(submission.id)}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(submission.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
                  disabled={loadingIds.includes(submission.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {submissions.length === 0 && (
            <p className="text-center text-gray-500">No pending submissions</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}