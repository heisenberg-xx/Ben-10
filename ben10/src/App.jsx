import React from "react";
import { Header } from "./components/Header";
import { Outlet } from "react-router";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <Outlet />
        <div className="absolute bottom-0 left-0" >
          <ChatBot />
        </div>
      </main>
      
      <p className="font-para opacity-60 text-[12px] text-green-600 absolute right-5 bottom-[40%] transform rotate-90 origin-bottom-right">
        A tribute to Ben 10 by Rajesh Ande
      </p>
    </>
  );
};

export default App;
