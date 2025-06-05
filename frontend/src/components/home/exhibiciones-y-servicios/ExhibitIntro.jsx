// src/components/ExhibitIntro.jsx

export default function ExhibitIntro({description, title}) {
  return (
    <div className="max-w-3xl mx-auto text-center py-12 px-4">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">{title}</h2>
      <p className="text-gray-700 leading-relaxed text-base">
        {description}
      </p>
    </div>
  );
}
