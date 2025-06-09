// src/components/DescriptionSection.jsx

export default function DescriptionSection({ image, title, paragraphs, listTitle, listItems, button }) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 items-center">
        {/* Imagen */}
        <div className="flex-1 w-full rounded-md overflow-hidden shadow">
          {image ? (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
              [Imagen]
            </div>
          )}
        </div>
  
        {/* Texto */}
        <div className="flex-1 w-full space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold text-teal-700">{title}</h2>
  
          {paragraphs?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
  
          {listItems && listItems.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold text-teal-700 mb-2">{listTitle}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {listItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
  
          {button && (
            <div className="mt-4">
              <a
                href={button.link}
                className="bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition-colors inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {button.label}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
  