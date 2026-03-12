import React from "react";
// IMPORTANTE: Use as suas imagens reais aqui
import imagemFundo from "../assets/fundo_sombrio.jpg";

const Telainicial = ({ aoEntrar }) => {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black cursor-pointer"
      onClick={aoEntrar}
    >
      {/* 1. FUNDO SOTURNO (Castelo e Floresta) */}
      <img
        src={imagemFundo}
        className="absolute inset-0 w-full h-full object-cover pixelated z-0"
        alt="Dark Kingdom"
      />

      {/* 2. COMPOSIÇÃO CENTRAL (Título principal) */}
      <div className="absolute inset-0 flex items-center justify-start z-10 ml-[15%]">
        <div className="relative text-left">
          {/* TÍTULO PRINCIPAL - COM !important NO TAMANHO */}
          <h1
            className="zelda-title-style uppercase italic z-10 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ fontSize: "100px", lineHeight: "0.9" }}
          >
            CLASS
            <br />
            KOMBAT
          </h1>

          {/* SUBTÍTULO */}
          <p className="zelda-subtitle-style text-[24px] uppercase italic z-10 mt-8 text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            String = "The POO game"
          </p>
        </div>
      </div>

      {/* 3. RODAPÉ */}
      <div className="absolute bottom-6 w-full text-center z-20">
        <p className="zelda-footer-style text-[14px] uppercase text-gray-400 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          © 2026 POO. ALL RIGHTS RESERVED
        </p>
        <p className="zelda-footer-style text-[18px] text-white animate-pulse mt-4 tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          System.out.print("Aperte em qualquer lugar da tela para entrar")
        </p>
      </div>

      {/* 4. EFEITO DE TV ANTIGA */}
      <div className="crt-overlay pointer-events-none z-50"></div>
    </div>
  );
};

export default Telainicial;
