import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
import { login, logout } from "../../redux/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../../services/authService.js";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputData = { email, password };

    const logged = await authService.login(inputData);
    if (!logged) alert("User Login Failed");

    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
          navigate("/");
        } else {
          dispatch(logout());
          alert("Getting user details failed!");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));

    setIsSubmitting(false);
  };

  return (
    <div className="mt-20 w-full max-w-md mx-auto">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">
            Sign in to your account or{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              signup
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <Button type="submit" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
