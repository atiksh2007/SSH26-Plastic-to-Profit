import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("googleBtn"),
    {
      theme: "outline",
      size: "large",
      width: 300,
    }
  );
}, []);

const handleCredentialResponse = (response) => {
  const decoded = JSON.parse(
    atob(response.credential.split(".")[1])
  );

  const userData = {
    name: decoded.name,
    email: decoded.email,
    image: decoded.picture,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  navigate("/dashboard");
};
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }


    const user = {
      email,
      name: email.split('@')[0],
      joinDate: new Date().toISOString(),
      type: isLogin ? 'returning' : 'new'
    };

    localStorage.setItem('plasticProfitUser', JSON.stringify(user));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-olive-50">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-olive-600 opacity-5 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-olive-600 opacity-5 rounded-full"></div>

      <div className="max-w-md w-full space-y-8 relative">
        {/* Logo and Title */}
        <div className="text-center opacity-0 animate-fadeInUp">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-olive-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">♻</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-black mb-2">
            Welcome {isLogin ? 'Back' : 'to PlasticProfit'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to access your dashboard' 
              : 'Create an account to start trading'}
          </p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-3xl shadow-2xl p-8 space-y-6 opacity-0 animate-scaleIn delay-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Password"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-olive-600 focus:ring-olive-600 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-olive-600 hover:text-olive-700 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div id="googleBtn" className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-olive-600 hover:bg-olive-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-olive-600 hover:bg-olive-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-olive-600 hover:text-olive-700 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Demo credentials info
        <div className="bg-olive-50 rounded-2xl p-6 opacity-0 animate-fadeIn delay-400">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-olive-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-olive-900">Demo Access</h3>
              <p className="mt-1 text-xs text-olive-700">
                Use any email and password (min 6 characters) to explore the platform
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;