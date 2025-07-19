import { Link } from "react-router";
const VideoTitle = ({ title, overview,movieId }) => {
  return (
    <div className="absolute inset-0 z-10 px-6 sm:px-16  md:px-24 sm:pt-[13vh] pt-[8vh]  md:pt-[12vh] lg:pt-[10vh] xl:pt-[25vh] text-white bg-gradient-to-r from-black-100">
  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">{title}</h1>
  <p className="text-xs  sm:text-sm md:text-md lg:text-lg font-medium w-full sm:w-3/4 md:1/2 lg:w-1/3 sm:mb-6 mb-3 text-gray-200">{overview}</p>

  <div className="space-x-4">
  <Link to={"/movieinfo/" + movieId}>
    <button className="cursor-pointer hover:border-2 border-white bg-white text-black sm:py-2 sm:px-6 px-2 py-2 rounded-3xl sm:rounded-md text-lg font-bold hover:bg-gray-300 transition">
      <span className="sm:hidden">▷</span>
      <span className="hidden sm:inline">▷ Play</span>
    </button>
  </Link>
  <Link to={"/movieinfo/" + movieId}>
    <button className="cursor-pointer hover:border-2 border-white bg-gray-700 bg-opacity-70 text-white sm:py-2 sm:px-6 px-2 py-2 rounded-3xl sm:rounded-md text-lg font-bold hover:bg-gray-600 transition">
      <span className="sm:hidden">ⓘ</span>
      <span className="hidden sm:inline">ⓘ More Info</span>
    </button>
  </Link>
</div>
</div>

  );
};

export default VideoTitle;
