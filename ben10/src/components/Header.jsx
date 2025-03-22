import React, { useState, useEffect } from "react";
import logo from "../assets/ben10.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState(logo);
  const version = useSelector((state) => state.version);

  useEffect(() => {
    setLogoUrl(version?.header || logo);
  }, [version]);

  return (
    <nav className="flex justify-center items-center p-5 shadow-md">
      <div onClick={() => navigate("/")} className="h-[10vh] ">
        <img className=" object-contain h-[100px]" src={logoUrl} alt="Logo" loading="eager"/>
      </div>
    </nav>
  );
};
