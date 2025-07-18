import { useNavigate } from "react-router";

const AppLogo = () => {
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    if (window.location.pathname !== "/") {
          navigate("/browse");
        }
  };

  return (
    <div className="flex items-center justify-center sm:justify-start p-2 sm:p-4 lg:p-6">
      <svg
        onClick={navigateToHome}
        viewBox="0 0 270 50"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[120px] h-auto 
                   sm:max-w-[160px] 
                   md:max-w-[200px] 
                   lg:max-w-[240px] 
                   xl:max-w-[280px] 
                   2xl:max-w-[320px]
                   cursor-pointer 
                   focus:outline-none

                   
                  
                   rounded-sm"
        role="button"
        tabIndex={0}
        aria-label="Navigate to home page"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToHome();
          }
        }}
      >
        <text
          x="12"
          y="35"
          fontFamily="Arial Black, Helvetica, sans-serif"
          fontSize="48"
          fill="#E50914"
          letterSpacing="2"
          className="select-none"
        >
          Movies
        </text>
        <text
          x="187"
          y="35"
          fontFamily="Arial Black, Helvetica, sans-serif"
          fontSize="48"
          fill="#FFFFFF"
          letterSpacing="2"
          className="select-none"
        >
          AI
        </text>
      </svg>
    </div>
  );
};

export default AppLogo;