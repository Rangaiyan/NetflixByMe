import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.",
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.",
  },
  {
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
  },
];

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto text-white px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-left">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-2 bg-neutral-800 rounded">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full flex justify-between items-center px-6 py-5 text-lg font-medium focus:outline-none"
          >
            {item.question}
            {activeIndex === index ? <X size={28} /> : <Plus size={28} />}
          </button>

          {activeIndex === index && (
            <div className="px-6 py-5 text-xl leading-relaxed border-t-2 border-t-black text-neutral-200 ">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
