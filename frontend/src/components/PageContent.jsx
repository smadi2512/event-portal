function PageContent({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl shadow-2xl p-8 my-8 mx-auto max-w-4xl transition-all duration-500 hover:shadow-3xl hover:border-[#d4af37]/30">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent text-center mb-6">
        {title}
      </h1>
      <div className="text-gray-300">{children}</div>
    </div>
  );
}

export default PageContent;
