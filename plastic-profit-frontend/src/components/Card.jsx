import React from "react";

export default function Card({ title, description, children }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-gray-500 text-sm mb-3">{description}</p>
      )}
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
