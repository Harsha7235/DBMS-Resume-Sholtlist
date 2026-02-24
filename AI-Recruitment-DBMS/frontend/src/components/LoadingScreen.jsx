export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold animate-pulse">
          Initializing AI Recruitment Engine...
        </h2>
      </div>
    </div>
  );
}