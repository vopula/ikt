import React, { useState, useEffect } from "react";
import * as Components from "../Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [signIn, toggle] = useState(true);
  const [step, setStep] = useState(null); // Track current step
  const [progress, setProgress] = useState(16); // Track progress percentage (25% for step 1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    laptopName: "",
    handphoneName: "",
    documents: [],
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const verificationCode = code.join("");
  const [adminVerificationStatus, setAdminVerificationStatus] = useState(false);
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

  // Filling code to box from user
  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus ke input berikutnya
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // focus to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 3) {
      setStep(4); // Move to the email verification step
      setProgress(((step + 1) / 6) * 100);
      setTimeout(() => {
        setStep((prevStep) => {
          const newStep = prevStep + 1; // Ensure correct step
          setProgress((newStep / 6) * 100); // Update progress based on new step
          return newStep;
        });
      }, 100);
        // SubmitRegistration(formData, toggle);
    } else if (step === 5) {
      setStep(6);
      setProgress(((step + 1) / 6) * 100);
      // SubmitRegistration(formData, toggle);
    } else if (step === 6) {
      setStep(7)
    }
    else {
      // Move to the next step
      setStep(step + 1);
      setProgress(((step + 1) / 6) * 100); // Update progress based on 4 steps
    }
  };

  const handleVerification = () => {
    setAdminVerificationStatus(true); // Show verification status page
  };
  
  // Handle "Previous" button click
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 1) / 6) * 100); // Update progress based on 4 steps
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
    // Tidak perlu alert di sini, langsung tampilkan pesan verifikasi email di langkah 4
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
          
          {step !== 4 && step !== 5 && step !== 6 && step !== 7 && step !== 8 && (
            <Components.Title style={{ marginTop: "30px" }}>Create Account</Components.Title>
          )}

          {step !== 1 && step !== 2 && step !== 3 && step !== 4 && step !== 5 && step !== 6 && (
            <Components.Title style={{ marginTop: "30px" }}>Cek Status Verifikasi</Components.Title>
          )}

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
              <p style={{ 
                marginBottom: "15px",
                fontSize: "16px", 
                lineHeight: "1.5", 
                fontWeight: "500" 
              }}>
                Drag and drop a document here, or click to upload
              </p>

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
                      borderRadius: "10px", 
                    }}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById(`file-upload-${index}`).click()}
                  >
                    {formData.documents?.[index] ? (
                      <div style={{ width: "100%", height: "100%" }}>
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
                            boxShadow: "0px 0px 3px rgba(0,0,0,0.2)", 
                          }}
                        >
                          ×
                        </div>

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

          {step === 4 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Components.Title>Verifikasi Email Anda</Components.Title>
              <Components.Paragraph>
                Kami telah mengirimkan kode verifikasi ke alamat email Anda. Silakan periksa inbox Anda dan klik tautan tersebut untuk memverifikasi akun Anda.
              </Components.Paragraph>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">Masukkan kode verifikasi yang telah dikirim ke email</h2>
              <div>
                {code.map((num, index) => { return (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={num}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      display: "inline-block", // Forces inputs to stay inline
                      width: "45px", // Adjust width
                      height: "45px", // Adjust height
                      textAlign: "center",
                      border: "1px solid #ccc",
                      marginRight: "5px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}/>
                )})}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Components.Button 
                  type="button" a
                  onClick={handleSubmit} 
                  style={{ width: "auto", paddingLeft: "20px", paddingRight: "20px" }}
                >
                  Verifikasi Kode
                </Components.Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2>Verifikasi Email Selesai, Menunggu Verifikasi Kedua</h2>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Components.Button 
                  type="button" a
                  onClick={handleSubmit} 
                  style={{ width: "auto", paddingLeft: "20px", paddingRight: "20px" }}>
                  Cek status verifikasi
                </Components.Button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="flex flex-col items-center mt-10">
              <Components.Paragraph>Silahkan isi alamat gmail untuk pengecekan pada kotak di bawah</Components.Paragraph>
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Components.Button 
                  type="button" a
                  onClick={handleVerification} 
                  style={{ width: "auto", paddingLeft: "20px", paddingRight: "20px" }}>
                  Lihat status
                </Components.Button>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="flex flex-col items-center mt-10">
              <h2 className="text-2xl font-bold mb-6">Status Verifikasi</h2>

              {/* Email Verification - Verified */}
              <div className="flex items-center space-x-4 mb-6">
                <img src="/verified-icon.png" alt="Verified Email" className="w-12 h-12" />
                <p className="text-lg">Email Anda telah diverifikasi ✅</p>
              </div>

              {/* Admin Verification - Pending */}
              <div className="flex items-center space-x-4 mb-6">
                <img src="/pending-icon.png" alt="Admin Not Verified" className="w-12 h-12" />
                <p className="text-lg">Verifikasi Admin masih dalam proses ⏳</p>
              </div>

            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {step > 1 && step < 4 && (
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Components.Button 
                  type="button" a
                  onClick={handlePrevious} 
                  style={{ width: "auto", paddingLeft: "20px", paddingRight: "20px" }}
                >
                  Previous
                </Components.Button>
              </div>
            )}
            {step < 4 && (
              <Components.Button type="submit" style={{ width: "auto", paddingLeft: "30px", paddingRight: "30px", marginLeft: "10px" }}>
                {step === 3 ? "Submit" : "Next"}
              </Components.Button>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: "20px", marginBottom: "20px", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px", display: (step === 7 || step === 8) ? "none" : "block" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "10px",
                backgroundColor: "#76c7c0",
                borderRadius: "5px",
                transition: "width 0.3s ease",
              }}>
              </div>
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
            <Components.GhostButton onClick={() => {setStep(1); toggle(false); }}>
              Sign Up
            </Components.GhostButton>
            <Components.GhostButton onClick={() => {setStep(7); toggle(false); }}
              style={{ marginTop: "20px", backgroundColor: "transparent", color: "#fff" }}>
              Cek Verifikasi
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
        // Tidak perlu alert di sini, karena pesan verifikasi sudah ditampilkan di langkah 4
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