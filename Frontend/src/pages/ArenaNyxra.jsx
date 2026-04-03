import React from "react";
import nyxraBg from "../assets/nyxra_bg.png";

const ArenaNyxra = () => {
  return (
    <div
      className="w-screen h-screen relative font-mono overflow-hidden"
      style={{
        backgroundImage: `url(${nyxraBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    >
      <div className="absolute top-6 right-6 text-white font-black">
        NYXRA Lv20
      </div>

      <div className="absolute bottom-6 left-6 text-white font-black">
        PLAYER Lv6
      </div>

      <div className="absolute bottom-6 right-6 grid grid-cols-2 gap-2">
        {["Atacar", "Skill", "Item", "Fugir"].map((btn) => (
          <button key={btn} className="bg-white px-4 py-2 text-black font-bold">
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArenaNyxra;
