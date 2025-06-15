import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">About Quanqua Dictionary</h1>
        <p className="text-center max-w-2xl text-lg text-gray-700">
          This project aims to build an open dictionary for Tigrigna and other Ethiopian languages.
          Users can search, submit words, and contribute to expanding the language resources.
        </p>
      </main>
      <Footer />
    </>
  );
}