import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link to={"/"} className="flex items-center gap-4 text-2xl font-bold">
        <Image
        src='logo.png'
        alt="logo"
        w={32}
        h={32} />

        <span>BlogSpot</span>
      </Link>
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
       <Link to="/"  >Home</Link>
        <Link to="/" >Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/" >About</Link>
        <Link to="/">
        <button className="px-4 py-2 rounded-3xl bg-blue-800 text-white">Login </button></Link>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/"  >Home</Link>
        <Link to="/" >Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/" >About</Link>
        
        <SignedOut>
        <Link to="/login">
        <button className="px-4 py-2 rounded-3xl bg-blue-800 text-white">Login </button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
