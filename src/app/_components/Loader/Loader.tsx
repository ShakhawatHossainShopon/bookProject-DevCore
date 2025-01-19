// components/Loader.tsx
const Loader = () => {
  return (
    <div className="my-8 flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
