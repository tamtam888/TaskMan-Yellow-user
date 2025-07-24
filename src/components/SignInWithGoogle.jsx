import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const SignInWithGoogle = ({ onSignIn }) => {
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // פענוח ה-JWT כדי להוציא את השם והמייל
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));

      const user = {
        name: decodedPayload.name,
        email: decodedPayload.email,
      };

      onSignIn(user);
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Welcome to TaskMan 👋</h2>
      <p>Please sign in with Google</p>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => alert("Login Failed")}
        useOneTap
      />
    </div>
  );
};

export default SignInWithGoogle;
