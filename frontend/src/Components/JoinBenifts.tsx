import React from "react";
import { Tv2, Download, Globe, Smile } from "lucide-react";

const benefits = [
  {
    title: "Enjoy on your TV",
    description:
      "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: <Tv2 className="w-10 h-10 text-pink-300" />,
  },
  {
    title: "Download your shows to watch offline",
    description:
      "Save your favourites easily and always have something to watch.",
    icon: <Download className="w-10 h-10 text-pink-300" />,
  },
  {
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
    icon: <Globe className="w-10 h-10 text-pink-300" />,
  },
  {
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    icon: <Smile className="w-10 h-10 text-pink-300" />,
  },
];

export default function JoinBenefits() {
  return (
    <div className="px-[10%] py-10 text-white">
      <h2 className="text-2xl font-semibold mb-6">More reasons to join</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#1b1c2e] to-[#151515] p-6 rounded-2xl shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-300">{benefit.description}</p>
            </div>
            <div className="mt-4 flex justify-end">{benefit.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
