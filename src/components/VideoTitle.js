const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video px-24 pt-[20%] absolute top-0 z-10 text-white bg-gradient-to-r from-black pointer-events-none">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-lg py-6 text-white w-1/4">{overview}</p>
      <div className="pointer-events-auto">
        <button className="bg-white text-black p-2 px-4 rounded-md font-bold text-xl hover:bg-opacity-80"> ▶️ Play</button>
        <button className="mx-2 bg-gray-500 text-white p-2 px-4 rounded-md font-bold text-xl"> ℹ️ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
