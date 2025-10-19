import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login"; //true OR false
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl hover:border-[#d4af37]/30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
              {isLogin ? "Login" : "Create New Account"}
            </h1>
            <p className="text-gray-400 mt-2">
              {isLogin ? "Welcome back!" : "Join our platform today"}
            </p>
          </div>

          {/* Form */}
          <Form method="post">
            {/* Error Messages */}
            {data && data.errors && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-xl mb-6">
                <ul className="list-disc list-inside space-y-1">
                  {Object.values(data.errors).map((error) => (
                    <li key={error} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data && data.message && (
              <div className="bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f4d03f] px-4 py-3 rounded-xl mb-6 text-sm">
                {data.message}
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300 placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Link
                to={`?mode=${isLogin ? "signup" : "login"}`}
                className="text-[#d4af37] hover:text-[#f4d03f] font-medium text-sm transition-colors duration-300 flex-1 text-center"
              >
                {isLogin ? "Create new account" : "Login"}
              </Link>

              <button
                disabled={isSubmitting}
                className="cursor-pointer bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold py-3 px-6 rounded-xl hover:from-[#f4d03f] hover:to-[#d4af37] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </Form>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="w-16 h-1 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
