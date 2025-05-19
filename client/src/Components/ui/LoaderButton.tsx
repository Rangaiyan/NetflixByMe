import React from "react";

interface LoaderButtonProps {
  isLoading: boolean;
  buttonText: string;
  loadingText?: string;
  type?: "submit" | "button";
}

const LoaderButton: React.FC<LoaderButtonProps> = ({
  isLoading,
  buttonText,
  loadingText = "Submitting...",
  type = "submit",
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700 transition-colors"
      }`}
    >
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default LoaderButton;
