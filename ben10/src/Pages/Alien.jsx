import { useGetAlienQuery } from "../redux/apis/alienApiSlice";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Typewriter from "react-typewriter-effect";
import { skipToken } from "@reduxjs/toolkit/query";
import Loader from "../components/Loader";

const Alien = () => {
  const version = useSelector((state) => state.version);
  const { name: encodedName } = useParams();
  const alienname = decodeURIComponent(encodedName);
  const {
    data: alien,
    isLoading,
    error,
  } = useGetAlienQuery(
    version?._id ? { alienname, versionid: version._id } : skipToken
  );

  if (isLoading) return <Loader />;
  if (error) return <p className="text-green">Error: {error.message}</p>;

  return (
    <>
      {alien ? (
        <section className="flex md:flex-row items-center flex-col h-[80vh] md:mt-0 mt-10">
          <div className="md:w-[30%] h-[50vh] w-full flex flex-col justify-around items-center rounded-2xl gap-[20px]">
            <img
              className="animate__animated animate__bounceIn md:object-contain  md:h-[400px] md:w-full w-[200px] h-[full] transition-transform transform hover:scale-105 drop-shadow-[0_7px_15px_rgb(5,245,75,0.5)]"
              src={alien.image}
              alt={alien.name}
              loading="lazy"
            />
            <h1 className="mb-5 md:text-[35px] text-[25px] text-center font-customNudge text-green-600 ">
              {alien.name}
            </h1>
          </div>
          <div className="flex flex-col justify-around gap-5 md:h-full  items-center w-[70%]  p-2">
            <div className="md:h-[50%] flex-col justify-center items-center  w-full">
              <h1 className="text-green-600 font-customNudgeRegular text-[20px] mt-5 drop-shadow-[0_9px_15px_rgb(5,245,75,0.9)]">
                Wiki :
              </h1>
              <div className="  text-green-600 mt-[35px] font-para p-3 md:text-[15px] text-[13px]">
                <Typewriter text={alien.description} typeSpeed={15} />
              </div>
            </div>
            <div className="md:h-[50%] flex flex-col items-center   text-green-600  md:px-10 md:py-8 px-5 py-3 border-2 border-green-600 rounded-xl">
              <h2 className="text-[20px]  mb-4 font-customNudgeRegular drop-shadow-[0_9px_15px_rgb(5,245,75,0.9)]">
                Powers :
              </h2>
              <ul className="flex flex-col justify-around items-center ">
                {alien?.powers?.split(",").map((power, index) => (
                  <li
                    className="m-3 font-para text-[15px] text-left"
                    key={index}
                  >
                    {power.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        <p>Alien not found</p>
      )}
    </>
  );
};

export default Alien;
