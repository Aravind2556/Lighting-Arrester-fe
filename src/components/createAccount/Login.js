import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PowermangeUser from "../../assets/WhatsApp Image 2025-03-14 at 22.33.21_faddef39.jpg";
import { DContext } from "../../context/Datacontext";

export const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { setAuth } = useContext(DContext);
  const [display, setDisplay] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${apiurl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setDisplay(data.message);
        if (data.success) {
          setAuth(data.user);
          window.location.reload();
        }
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-5xl">
        {/* Image Section */}
        {/* <div className="bg-gradient-to-tr from-blue-200 to-purple-200 flex justify-center items-center p-8"> */}
        <div className=" w-2/3 flex justify-center items-center p-8 login-bg" >
          {/* <img src={PowermangeUser} alt="Login Illustration" className="w-full max-w-md object-cover rounded-2xl shadow-md" /> */}
        </div>

        {/* Form Section */}
        <div className="md:w-1/3 p-8 flex flex-col justify-center w-full bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="name@example.com"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/create-account" className="text-blue-500 hover:underline text-sm">
              Create Account
            </a>
          </div>

          {display && (
            <p className={`mt-4 text-center font-medium ${display === "Login successfully" ? "text-green-500" : "text-red-500"}`}>
              {display}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
