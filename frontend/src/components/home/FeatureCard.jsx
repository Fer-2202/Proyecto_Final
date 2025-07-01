import React from "react";

function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div
      className={`bg-gray-50 rounded-lg p-6 border-2 border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex-1 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-start">
        {icon && (
          <div className="bg-teal-50/70 p-4 rounded-lg mb-4 text-teal-600 border border-teal-100/50">
            {icon}
          </div>
        )}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-2.5">
            {title}
          </h3>
          <div className="text-gray-600 space-y-2 text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;