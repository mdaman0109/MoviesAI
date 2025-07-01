const AppLogo=()=>
{
    return(
        <div className="w-[100%] absolute flex items-center justify-start px-5 py-8 rounded-xl bg-gradient-to-b from-black">
  
        <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" className="w-80 h-[50px] ">
          <text
            x="12"
            y="35"
            fontFamily="Arial Black, sans-serif"
            fontSize="48"
            fill="#E50914"
            letterSpacing="2"
          >
            Movies
          </text>
          <text
            x="190"
            y="35"
            fontFamily="Arial Black, sans-serif"
            fontSize="48"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            AI
          </text>
        </svg>
      </div>

)}
export default AppLogo;