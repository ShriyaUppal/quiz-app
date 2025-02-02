const Welcome = ({ onStart }) => {
  return (
    <>
      <div className="justify-center text-center bg-white p-6 rounded-lg shadow-lg border border-green-700 w-1/2 hover:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the Quiz!
        </h1>
        <p className="text-lg text-gray-600 mt-2">Are you ready to begin?</p>
        <button
          onClick={onStart}
          className="mt-4 px-6 py-2 bg-green-700 text-white text-lg rounded hover:bg-green-800 hover:cursor-pointer"
        >
          Start Quiz 🚀
        </button>
      </div>
    </>
  );
};

export default Welcome;
