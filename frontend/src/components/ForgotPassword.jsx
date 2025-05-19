import React, { useState } from "react";
import Checkbox from "./Checkbox";

const ForgotPassword = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <Checkbox
        id="remember-me"
        label="Remember me"
        className="flex items-center"
        rememberMe={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <div className="text-sm">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
