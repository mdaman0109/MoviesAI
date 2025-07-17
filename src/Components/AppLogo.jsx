import { useNavigate } from "react-router";
const AppLogo=()=>
{
  const navigate = useNavigate()
    const navigatetohome =()=>
  {
    navigate("/browse")
  }
    return(
       
  
        <svg onClick={navigatetohome} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" className="w-80 h-[50px] mt-6 cursor-pointer">
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
    

)}
export default AppLogo;