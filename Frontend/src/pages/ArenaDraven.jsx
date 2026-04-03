import React from "react";
import artemisBg from "../assets/artemis_bg.png";

const ArenaArtemis = () => {
  return (
    <div
      className="w-screen h-screen relative font-mono overflow-hidden"
      style={{
        backgroundImage: `url(${artemisBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    >
      {/* INIMIGO */}
      <div className="absolute top-6 right-6 text-white font-black">
        ARTEMIS Lv12
      </div>

      {/* PLAYER */}
      <div className="absolute bottom-6 left-6 text-white font-black">
        PLAYER Lv6
      </div>

      {/* MENU */}
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

export default ArenaArtemis;
