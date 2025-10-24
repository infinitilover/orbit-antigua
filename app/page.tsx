export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#40E0D0] to-[#001F3F] rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold text-[#001F3F]">Orbit</h1>
                <p className="text-xs text-gray-600">Where Business Revolves</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-[#40E0D0]">Home</a>
              <a href="#" className="text-gray-700 hover:text-[#40E0D0]">Listings</a>
              <a href="#" className="text-gray-700 hover:text-[#40E0D0]">About</a>
              <a href="#" className="text-gray-700 hover:text-[#40E0D0]">Contact</a>
            </div>
            <button className="bg-[#40E0D0] text-white px-6 py-2 rounded-lg hover:bg-[#35c5b5] transition">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-[#001F3F] mb-6">
            Discover Antigua's Best Businesses
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            From real estate to car rentals, find everything you need in one place
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for businesses, services, or categories..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40E0D0]"
              />
              <button className="bg-[#40E0D0] text-white px-8 py-3 rounded-lg hover:bg-[#35c5b5] transition font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-[#001F3F] mb-12">
          Explore Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Real Estate */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#40E0D0] to-[#001F3F] rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
              🏠
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Real Estate</h4>
            <p className="text-gray-600">Find your dream property in Antigua</p>
          </div>

          {/* Car Rentals */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#40E0D0] to-[#001F3F] rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
              🚗
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Car Rentals</h4>
            <p className="text-gray-600">Rent a car for your island adventure</p>
          </div>

          {/* Health & Wellness */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#40E0D0] to-[#001F3F] rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
              💪
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Health & Wellness</h4>
            <p className="text-gray-600">Personal trainers and wellness services</p>
          </div>

          {/* Business Listings */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#40E0D0] to-[#001F3F] rounded-lg mb-4 flex items-center justify-center text-white text-2xl">
              🏪
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Business Listings</h4>
            <p className="text-gray-600">Discover local businesses and services</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-[#001F3F] mb-12">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#40E0D0] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Search</h4>
            <p className="text-gray-600">Find what you're looking for</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#40E0D0] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Connect</h4>
            <p className="text-gray-600">Reach out to businesses</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#40E0D0] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="text-xl font-bold text-[#001F3F] mb-2">Book</h4>
            <p className="text-gray-600">Schedule and pay securely</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001F3F] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Orbit - Where Business Revolves</p>
          <p className="text-gray-400">© 2025 Orbit Antigua. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

