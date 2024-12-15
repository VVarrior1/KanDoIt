import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          {/* Logo */}
          <div className="w-16 h-16 bg-[#4169E1] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <span className="text-3xl font-bold text-white">K</span>
          </div>

          {/* Brand Name */}
          <h1 className="text-3xl font-semibold text-gray-900">KanDoIt</h1>

          {/* Tagline */}
          <p className="text-lg text-gray-600">
            Organize. Collaborate. Succeed.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 w-full my-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Project Tracking
            </h3>
            <p className="text-gray-600">
              Visual kanban boards for easy management
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Team Collaboration
            </h3>
            <p className="text-gray-600">Work together seamlessly</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 w-full">
          <Link href="/signup" className="w-full">
            <button
              className="w-full py-4 bg-[#4169E1] text-white font-medium rounded-full
                       transition-all duration-200
                       hover:bg-[#3658c7]"
            >
              Get Started
            </button>
          </Link>

          <Link href="/signin" className="w-full">
            <button
              className="w-full py-4 bg-white text-[#4169E1] font-medium rounded-full
                       border-2 border-[#4169E1]
                       transition-all duration-200
                       hover:bg-gray-50"
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* Free Usage Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <p className="text-gray-600">Always free for personal use</p>
        </div>

        {/* Footer */}
        <footer className="mt-8">
          <p className="text-gray-500 text-sm">© KanDoIt 2024</p>
        </footer>
      </div>
    </div>
  );
}
