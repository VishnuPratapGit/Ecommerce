import { useState } from "react";
import { Mail, Lock, IdCard } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/authSlice";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = { name, email, password };

    const register = await authService.signup(data);

    if (!register) {
      setIsSubmitting(false);
      return;
    }

    const logged = await authService.login({ email, password });

    if (logged) {
      authService.getCurrentUser().then((data) => {
        if (data) {
          dispatch(login(data));
          navigate("/");
        } else {
          dispatch(logout());
          alert("Getting user details failed!");
          navigate("/login");
        }
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-20 w-full max-w-md mx-auto">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-500 mt-2">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Your name"
            icon={IdCard}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />

          <Button type="submit" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
