import React, { useEffect } from "react";
import { setVersion, useGetVersionQuery } from "../redux/apis/versionSlice";
import { useNavigate, useParams } from "react-router";
import { useGetAliensByversionIdQuery } from "../redux/apis/alienApiSlice";
import { useDispatch } from "react-redux";
import Typewriter from "react-typewriter-effect";
import "../components/scrollbar.css"
import Loader from "../components/Loader";

const VersionDetails = () => {
  const { name } = useParams();
  const {
    data: version,
    error: versionError,
    isLoading: versionLoading,
  } = useGetVersionQuery(name);
  const {
    data: aliens,
    error: aliensError,
    isLoading: aliensLoading,
  } = useGetAliensByversionIdQuery(version?._id || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (version) {
      console.log(version);
      dispatch(setVersion(version));
    }
    if (aliens) {
      console.log(aliens);
    }
  }, [version, aliens, dispatch]);

  if (versionLoading || aliensLoading) {
    return <Loader/>;
  }

  if (versionError || aliensError) {
    return <p>Error loading data.</p>;
  }

  return (
    <>
      {version ? (
        <section className="flex md:flex-row flex-col items-center h-[80vh]">
          <div className="md:w-[30%] w-[full] flex flex-col justify-around items-center rounded-2xl md:mt-0 mt-5">
            <img
              className="animate__animated animate__bounceIn md:object-contain object-fill md:h-[400px] md:w-[400px] w-[300px] h-[full] transition-transform transform hover:scale-105 drop-shadow-[0_7px_15px_rgb(5,245,75,0.5)]"
              src={version.omnitrixLogo}
              alt="Omnitrix Logo"
            />
            <h1 className="mb-5 md:text-[35px] text-[25px] text-center font-customNudge text-green-600">
              {version.omnitrixName}
            </h1>
          </div>
          <div className="flex flex-col justify-center md:h-full items-center w-[70%] p-2">
            <div className="md:h-[50%] flex-col justify-center items-center w-full">
              <h1 className="text-green-600 font-customNudgeRegular text-[20px] mt-5 drop-shadow-[0_9px_15px_rgb(5,245,75,0.9)]">
                Wiki:
              </h1>
              <div className="text-green-600 mt-0 md:mt-[35px] font-para p-3 md:text-[15px] text-[13px]">
                <Typewriter text={version.description} typeSpeed={15} />
              </div>
            </div>
            <div className="md:h-[50%] flex flex-col items-center justify-center w-full text-green-600 md:mt-0 mt-3">
              <h2 className="text-[25px] m-4 font-customNudgeRegular drop-shadow-[0_9px_15px_rgb(5,245,75,0.9)]">
                Aliens
              </h2>
              {aliens ? (
                <ul className="flex md:py-3 md:px-4 px-2 py-2 md:rounded-r-[50px] md:rounded-l-[50px] rounded-r-[35px] rounded-l-[35px] border-[3px] border-green-600 overflow-x-auto md:w-[96%] w-[100%] scrollbar-hide">
                  {aliens.map((alien) => (
                    <li
                      className="animate__animated animate__bounceIn text-center mx-1 min-w-[90px]"
                      key={alien.name}
                      onClick={() => {
                        navigate(`/alien/${alien.name}`);
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          className="object-cover md:h-[80px] md:w-[80px] w-[60px] h-[60px] md:rounded-[35px] rounded-[25px] transition-transform transform hover:scale-110"
                          src={alien.cover}
                          alt={alien.name}
                        />
                        <p className="mt-1 font-customNudgeLight md:text-[15px] text-[13px]">
                          {alien.name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading aliens...</p>
              )}
            </div>
          </div>
        </section>
      ) : (
        "Version not found"
      )}
    </>
  );
};

export default VersionDetails;
