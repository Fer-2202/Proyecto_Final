import React from 'react'
import { Link } from 'react-router-dom'




function MissionCTA({ textos, links}) {
  return (
    <section className="bg-teal-600 text-white rounded-md p-8 max-w-7xl mx-auto my-10 text-center">
      {textos.map((text, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-bold mb-2">{text.title}</h2>
          <p className="text-sm">{text.text}</p>
        </div>       
      ))}
      
      <div className="flex justify-center gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="bg-white text-teal-600 font-semibold rounded-md px-4 py-2 hover:bg-gray-100 transition duration-300" 
          >
            {link.label}
          </Link> 
        ))}
        
      </div>
    </section>
  )
}

export default MissionCTA