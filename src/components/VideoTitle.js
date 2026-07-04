const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[12%] sm:pt-[16%] md:pt-[20%] px-4 sm:px-6 md:px-24 absolute text-white bg-gradient-to-r from-black z-10">
      <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold line-clamp-2 sm:line-clamp-none">
        {title}
      </h1>
      <p className="hidden md:inline-block py-4 lg:py-6 text-sm lg:text-lg w-1/2 lg:w-1/4 line-clamp-3">
        {overview}
      </p>
      <div className="mt-2 sm:my-4 md:m-0 flex gap-2 sm:gap-0">
        <button className="bg-white text-black py-1.5 sm:py-2 md:py-4 px-4 sm:px-6 md:px-12 text-sm sm:text-base md:text-xl rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
