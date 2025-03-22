import React, { useEffect } from "react";
import {
  clearVersion,
  useGetAllVersionsQuery,
} from "../redux/apis/versionSlice";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import "animate.css";
import { useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: versions, isLoading } = useGetAllVersionsQuery();
  useEffect(() => {
    dispatch(clearVersion());
  });

  if (isLoading) return <Loader />;

  return (
    <>
      {versions && versions.length > 0 ? (
        <section className="md:flex-row flex-col flex justify-around items-center h-[80vh] p-10 gap-2">
          {versions.map((version) => (
            <div
              key={version.name}
              className="animate__animated animate__bounceInLeft flex flex-col justify-evenly items-center rounded-3xl m-2 md:w-[15%] w-[60%]  md:h-[75%]   md:p-1 p-3 border-2 border-green-600  hover:shadow-[10px_10px_70px_rgba(5,_245,_75,_0.3)] transition-transform transform hover:scale-105 gap-2 "
              onClick={() => navigate(`version/${version.name}`)}
            >
              <img
                className="object-cover h-[130px] md:h-[220px] transition-transform transform hover:scale-110  "
                src={version.logo}
                alt={version.name}
              />
              <h3 className="text-[20px] text-center font-customNudge text-green-600 mt-3">
                {version.name}
              </h3>
            </div>
          ))}
        </section>
      ) : (
        <p>No versions found.</p>
      )}
    </>
  );
};

export default Home;
