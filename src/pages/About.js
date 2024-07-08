import React from 'react';

function About() {
  return (
    <div className="mt-[-18px] flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-600 to-lime-600 p-8">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to BAZISIBURADA, your number one source for all things fashion. We're dedicated to giving you the very best of clothing, with a focus on dependability, customer service, and uniqueness.
        </p>
        <p className="text-gray-700 mb-4">
          Founded in 2024 by Ata Yucel, BAZISIBURADA has come a long way from its beginnings in a home office. When Ata first started out, his passion for eco-friendly fashion drove him to do tons of research so that BAZISIBURADA can offer you the world's most advanced eco-friendly clothing. We now serve customers all over the world, and are thrilled that we're able to turn our passion into our own website.
        </p>
        <p className="text-gray-700 mb-4">
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          Email: atayucel@gmail.com
        </p>
        <p className="text-gray-700 mb-4">
          Phone: +555 555 5555
        </p>
        <p className="text-gray-700 mb-4">
          Address: Giresun Province, Turkey
        </p>
      </div>
    </div>
  );
}

export default About;
