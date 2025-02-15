import { useState } from "react";
import { IKImage } from 'imagekitio-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img src="/logo.png" alt="logo image" className="w-8 h-8" />
        <span>BlogSpot</span>
      </div>
      {/* mobile menu */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="text-4xl cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg justify-center absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
       <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">
        <button className="px-4 py-2 rounded-3xl bg-blue-800 text-white">Login </button></a>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">
        <button className="px-4 py-2 rounded-3xl bg-blue-800 text-white">Login </button></a>
      </div>
    </nav>
  );
};

export default Navbar;
