import { useNavigate } from "react-router";

const AppLogo = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    if (window.location.pathname !== "/") {
      navigate("/browse");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Navigate to home page"
      onClick={navigateToHome}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToHome();
        }
      }}
      className="flex items-center justify-center sm:justify-start px-4 py-2 cursor-pointer select-none focus:outline-none"
    >
      <div className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-black tracking-wide leading-none">
        <span className="text-red-600 drop-shadow-sm">Movies</span>
        <span className="text-white drop-shadow-sm">AI</span>
      </div>
    </div>
  );
};

export default AppLogo;
