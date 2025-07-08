const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] px-24  text-white  w-full h-screen bg-gradient-to-r from-black ">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg font-medium w-1/4 mb-6 text-gray-200">{overview}</p>

      <div className="space-x-4">
        <button className=" cursor-pointer hover:border-2 border-white bg-white text-black py-2 px-6 rounded-md text-lg font-bold hover:bg-gray-300 transition">
          ▷ Play
        </button>
        <button className="cursor-pointer hover:border-2 border-white bg-gray-700 bg-opacity-70  text-white py-2 px-6 rounded-md text-lg font-bold hover:bg-gray-600 transition">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
