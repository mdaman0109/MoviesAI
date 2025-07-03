const LogoutError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Logout Failed</h1>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Something went wrong while signing you out. Please try again or refresh the page.
      </p>
      <button
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded font-semibold"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default LogoutError;
