import React from "react";
import { Link } from "react-router-dom";

const cardsData = [
  {
    title: "Adopta",
    icon: "🐾",
    buttonText: "Vull adoptar",
    link: "/adopt", 
  },
  {
    title: "Dona",
    icon: "💖",
    buttonText: "Fer una donació",
    link: "/adopt", 
  },
  {
    title: "Vull posar en adopció",
    icon: "🏠",
    buttonText: "Mes informació",
    link: "/put-adoption", 
  },
];

const HomeCards: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 flex-col md:flex-row">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between bg-white shadow-lg rounded-lg p-4 w-full md:w-60 h-80"
        >
          <h3 className="text-xl font-bold text-center">{card.title}</h3>
          <div className="text-5xl">{card.icon}</div>

          <Link to={card.link}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              {card.buttonText}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeCards;
