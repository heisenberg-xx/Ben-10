import React, { useState, useEffect } from "react";
import logo from "../assets/ben10.png";
import { useGetVersionQuery } from "../redux/apis/versionSlice";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { name } = useParams();
  const location = useLocation();
  const { data: versionName } = useGetVersionQuery(name);
  const [logoUrl, setLogoUrl] = useState(logo);
  const version = useSelector((state) => state.version);

  useEffect(() => {
    if (location.pathname === "/") {
      setLogoUrl(logo);
    } else if (name && versionName) {
      setLogoUrl(versionName.header);
    } else if(version){
      setLogoUrl(version.header);
    }
  }, [name, versionName, location.pathname, version]);



  return (
    <nav className="flex justify-center items-center p-5 shadow-md">
      <div className="h-[10vh]">
        <img className=" object-contain h-[100px]" src={logoUrl} alt="Logo" />
      </div>
    </nav>
  );
};
