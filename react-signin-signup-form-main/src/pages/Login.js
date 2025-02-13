import React, { useState } from "react";
import * as Components from "../Components";
import { useNavigate } from "react-router-dom";

function SubmitRegistration(e, toggle) {
  e.preventDefault();

  const formEle = e.target;
  const name = formEle.name.value.trim();
  const email = formEle.email.value.trim();
  const password = formEle.password.value;

  // Validasi data di sisi klien
  if (!name || name.length < 3) {
    alert("Name must be at least 3 characters long.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycby3oFEa9cUTl015_8gfyl0VtEGq_Yf-xcCTxet2gfnSdWzYe1911BRoHjql5NNoslEe1Q/exec", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "registration",
      name,
      email,
      password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.status === "success") {
        alert(data.message); // Pesan sukses dari server
        formEle.reset();
        toggle(true); // Tampilkan form Sign In setelah registrasi berhasil
      } else {
        alert(`Error: ${data.message}`); // Pesan error dari server
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Oops! Something went wrong. Please try again later or contact support.");
    });
}

function signInVerification(e, navigate) {
  e.preventDefault();

  const formEle = e.target;
  const email = formEle.email.value.trim();
  const password = formEle.password.value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  fetch(
    "https://script.google.com/macros/s/AKfycby3oFEa9cUTl015_8gfyl0VtEGq_Yf-xcCTxet2gfnSdWzYe1911BRoHjql5NNoslEe1Q/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ action: "login", email, password }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message); // Pesan sukses
        localStorage.setItem("isLoggedIn", "true"); // Simpan status login
        localStorage.setItem("userEmail", email); // Simpan email pengguna
        navigate("/dashboard");// Arahkan ke halaman Dashboard
        console.log("Navigating to /dashboard"); // Debugging
      } else {
        alert(data.message); // Pesan error
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Oops! Something went wrong. Please try again later.");
    });
}

function Login() {
  const [signIn, toggle] = useState(true);
  const navigate = useNavigate();

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={(e) => SubmitRegistration(e, toggle)}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" name="name" placeholder="Name" required />
          <Components.Input type="email" name="email" placeholder="Email" required />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={(e) => signInVerification(e, navigate)}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" name="email" placeholder="Email" required />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;