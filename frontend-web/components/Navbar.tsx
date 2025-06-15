'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-3">
      <Link href="/" className="flex items-center space-x-2">
        <img
            src="https://swarmtech.xyz/wp-content/uploads/2023/11/bokri-01-150x150.png"
            alt="Quanqua Logo"
            width={40}
            height={40}
            className="rounded-full"
        />
        <span className="text-2xl font-bold cursor-pointer hover:text-blue-300">Quanqua Dictionary</span>
      </Link>
      </div>
      <div className="space-x-6 text-lg">
        <Link href="/">Home</Link>
        <Link href="/submit">Submit Word</Link>
        <Link href="/submissions">Submissions</Link>
        <Link href="/about">About</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}