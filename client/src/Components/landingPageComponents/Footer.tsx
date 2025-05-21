import { FiChevronRight } from "react-icons/fi";

function Footer() {
  return (
    <>
      <div className="py-10 px-[10%]">
        <div className="flex flex-col items-center text-center">
          <p className="max-w-xl pb-4">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-3 px-4 w-full max-w-2xl">
              <input
                type="email"
                placeholder="Email address"
                className="w-full md:w-[500px] px-6 py-3 rounded text-white bg-black placeholder-white focus:outline-none opacity-50 border"
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 font-bold text-white bg-red-600 hover:bg-red-500 rounded text-lg px-6 py-3 transition"
              >
                getStarted
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black text-neutral-400 text-sm px-10 pt-10 pb-20 mt-10">
          <p className="mb-6">
            Questions? Call <span className="underline">000-800-919-1743</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <p className="underline cursor-pointer">FAQ</p>
              <p className="underline cursor-pointer">Investor Relations</p>
              <p className="underline cursor-pointer">Privacy</p>
              <p className="underline cursor-pointer">Speed Test</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Help Centre</p>
              <p className="underline cursor-pointer">Jobs</p>
              <p className="underline cursor-pointer">Cookie Preferences</p>
              <p className="underline cursor-pointer">Legal Notices</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Account</p>
              <p className="underline cursor-pointer">Ways to Watch</p>
              <p className="underline cursor-pointer">Corporate Information</p>
              <p className="underline cursor-pointer">Only on Netflix</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Media Centre</p>
              <p className="underline cursor-pointer">Terms of Use</p>
              <p className="underline cursor-pointer">Contact Us</p>
            </div>
          </div>

          <div className="mb-4">
            <select className="bg-transparent border text-grey border-gray-400 text-blue px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                data-icon="LanguagesSmall"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
                  fill="currentColor"
                ></path>
              </svg>
              <option>English</option>
              <option>हिंदी</option>
            </select>
          </div>

          <p>Netflix India</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
