import React from "react";
import { FiChevronRight } from "react-icons/fi";

function Footer() {
  return (
    <>
      <div className=" py-10 px-10 ">
        <div className="">
          <p className="flex justify-center">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="flex flex-col justify-center md:flex-row items-center w-full max-w-xl gap-3 px-4 mt-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full md:flex-1 px-6 py-3 rounded  text-white  bg-black placeholder-white focus:outline-none opacity-50 border"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            />
            <button
              type="button"
              className="flex items-center justify-center gap-2 font-bold text-white bg-red-600 hover:bg-red-500  rounded text-lg px-6 py-3 transition"
            >
              Get Started
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
