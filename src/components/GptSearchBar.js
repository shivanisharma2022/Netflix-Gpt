const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="items-center gap-4 w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-2 rounded-lg border border-gray-300 font-bold text-lg col-span-10 bg-white text-black placeholder:text-gray-500"
          placeholder="What would you like to watch today?"
        />
        <button className="px-4 py-2 bg-red-700 text-white rounded-lg border border-gray-300 font-bold text-lg col-span-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
