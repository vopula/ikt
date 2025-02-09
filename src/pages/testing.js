import React, { useState, useEffect } from "react";
import * as Components from "../Components";
import { useNavigate } from "react-router-dom";


function Login() {
  const [signIn, toggle] = useState(true);
  const [step, setStep] = useState(1); // Track current step
  const [progress, setProgress] = useState(33); // Track progress percentage
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    laptopName: "",
    handphoneName: "",
    documents: [],
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => {
        const updatedDocuments = [...prevState.documents]; // Pastikan array ada
        updatedDocuments[index] = file; // Simpan file pada index yang sesuai
        return { ...prevState, documents: updatedDocuments };
      });
    }
  };  
  
  const [previewURLs, setPreviewURLs] = useState([]);
  useEffect(() => {
    const urls = (formData.documents || []).map(file => file ? URL.createObjectURL(file) : null);
    setPreviewURLs(urls);

    return () => urls.forEach(url => url && URL.revokeObjectURL(url));
  }, [formData.documents]);


  // Handle drag-and-drop file upload
  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prevState) => {
        const updatedDocuments = [...(prevState.documents || [])];
        updatedDocuments[index] = file;
        return { ...prevState, documents: updatedDocuments };
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 3) {
      // Final submission
      SubmitRegistration(formData, toggle);
    } else {
      // Move to the next step
      setStep(step + 1);
      setProgress(((step + 1) / 3) * 100);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 1) / 3) * 100);
    }
  };
  
  const removeFile = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      documents: prevState.documents.filter((_, i) => i !== index),
    }));
  };
    

  const SubmitRegistration = (data, toggle) => {
    console.log("Submitting:", data);
    alert("Registration Successful!");
    toggle(true);
  };  

  function signInVerification(e, navigate) {
    e.preventDefault();
  
    // You can replace this logic with your actual sign-in verification logic
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (email && password) {
      // Simulate a successful sign-in, navigate to the home page or dashboard
      alert("Successfully signed in!");
      navigate("/home");  // Replace with the appropriate route
    } else {
      alert("Please enter both email and password.");
    }
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title style={{ marginTop: "30px" }}>Create Account</Components.Title>

          {/* Step 1: Name, Email, Password */}
          {step === 1 && (
            <>
              <Components.Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {/* Step 2: Laptop Name, Handphone Name */}
          {step === 2 && (
            <>
              <Components.Input
                type="text"
                name="laptopName"
                placeholder="Laptop Name"
                value={formData.laptopName}
                onChange={handleInputChange}
                required
              />
              <Components.Input
                type="text"
                name="handphoneName"
                placeholder="Handphone Name"
                value={formData.handphoneName}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
    }}
  >
    {/* Teks Instruksi */}
    <p style={{ 
      marginBottom: "15px",
      fontSize: "16px", 
      lineHeight: "1.5", 
      fontWeight: "500" 
    }}>
      Drag and drop a document here, or click to upload
    </p>

    {/* Container Kotak */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            border: formData.documents?.[index] ? "none" : "2px dashed #ccc",
            width: "70px",
            height: "70px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "10px", // Memberikan sudut sedikit membulat agar lebih estetik
          }}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById(`file-upload-${index}`).click()}
        >
          {formData.documents?.[index] ? (
            <div style={{ width: "100%", height: "100%" }}>
              {/* Tombol silang untuk menghapus file */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  fontSize: "16px",
                  color: "red",
                  cursor: "pointer",
                  background: "white",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  boxShadow: "0px 0px 3px rgba(0,0,0,0.2)", // Memberikan efek bayangan agar lebih terlihat
                }}
              >
                ×
              </div>

              {/* Preview gambar */}
              <img
                src={previewURLs[index]}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <span style={{ fontSize: "24px", color: "#ccc" }}>+</span>
          )}
        </div>
      ))}
    </div>

    {/* Input untuk upload file */}
    {[0, 1, 2, 3].map((index) => (
      <input
        key={index}
        type="file"
        onChange={(e) => handleFileUpload(e, index)}
        style={{ display: "none" }}
        id={`file-upload-${index}`}
      />
    ))}
  </div>
)}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {step > 1 && (
              <div style={{ display: "flex", justifyContent: "center"}}>
              <Components.Button 
                type="button" 
                onClick={handlePrevious} 
                style={{ width: "auto", paddingLeft: "20px", paddingRight: "20px" }}
              >
                Previous
              </Components.Button>
            </div>
          )}
            <Components.Button type="submit" style={{ width: "auto", paddingLeft: "30px", paddingRight: "30px", marginLeft: "10px" }}>
              {step === 3 ? "Submit" : "Next"}
            </Components.Button>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: "20px", marginBottom: "20px", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "10px",
                backgroundColor: "#76c7c0",
                borderRadius: "5px",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        </Components.Form>
      </Components.SignUpContainer>

      {/* Rest of the code remains the same */}
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={(e) => signInVerification(e, navigate)}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" name="email" placeholder="Email" />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
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

// SubmitRegistration function (unchanged)
function SubmitRegistration(formData, toggle) {
  fetch("https://script.google.com/macros/s/AKfycby3oFEa9cUTl015_8gfyl0VtEGq_Yf-xcCTxet2gfnSdWzYe1911BRoHjql5NNoslEe1Q/exec", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "registration",
      ...formData,
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
        toggle(true);
      } else {
        alert(`Error: ${data.message}`); // Pesan error dari server
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Oops! Something went wrong. Please try again later or contact support.");
    });
}

export default Login;