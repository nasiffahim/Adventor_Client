import React, { use, useState } from "react";
import RegisterImaege from "../../../public/register.jpg";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Provider/AuthContext";

export default function Register() {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const isLengthValid = pass.length >= 6;

    if (!hasUpperCase) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must include at least one lowercase letter.";
    }
    if (!isLengthValid) {
      return "Password must be at least 6 characters long.";
    }

    return "";
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = form.name.value;
  //   const photo = form.photo.value;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   const validationError = validatePassword(password);
  //   if (validationError) {
  //     setPasswordError(validationError);
  //     return;
  //   }

  //   setPasswordError("");

  //   createUser(email, password)
  //     .then((result) => {
  //       const user = result.user;
  //       updateUser({ displayName: name, photoURL: photo })
  //         .then(() => {
  //           setUser({ ...user, displayName: name, photoURL: photo });
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: "Registered Successfully",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           navigate("/");
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "error",
  //             title: "Something went wrong!",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           setUser(user);
  //         });

  //       navigate(location.state ? location.state : "/");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // };

  const handleRegister = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const photo = form.photo.value;
  const email = form.email.value;
  const password = form.password.value;

  const validationError = validatePassword(password);
  if (validationError) {
    setPasswordError(validationError);
    return;
  }

  setPasswordError("");

  createUser(email, password)
    .then((result) => {
      const user = result.user;

      updateUser({ displayName: name, photoURL: photo })
        .then(() => {
          const savedUser = {
            name,
            email,
            photo,
            role: "tourist",
          };

          fetch("https://tourism-management-system-server-dusky.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(savedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("User saved to DB", data);
              setUser({ ...user, displayName: name, photoURL: photo });
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(user);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};


  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${RegisterImaege})` }}
    >
      <div className="w-10/12 mx-auto">
        <Navbar />
        <div className="flex justify-center items-center mt-10">
          <div className="flex justify-center min-h-screen items-center">
            <div className="card w-[650px] bg-white/10 backdrop-blur-xs z-0 shrink-0 py-5 min-h-[500px] border-1 border-gray-100 rounded-xl font-antor">
              <h2 className="text-2xl text-center text-black font-extrabold">
                Register your account
              </h2>
              <form
                onSubmit={handleRegister}
                className="card-body font-extrabold"
              >
                <fieldset className="fieldset">
                  {/* Name  */}
                  <label className="label text-sm text-black">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input w-full rounded-lg border-2 border-gray-300 text-black"
                    placeholder="Name"
                    required
                  />

                  {/* Photo URl  */}
                  <label className="label text-sm mt-6 text-black">
                    Photo URL
                  </label>
                  <input
                    name="photo"
                    type="text"
                    className="input w-full rounded-lg border-2 border-gray-300 text-black"
                    placeholder="Photo URL"
                    required
                  />

                  {/* Email  */}
                  <label className="label text-sm mt-6 text-black">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input w-full rounded-lg border-2 border-gray-300 text-black"
                    placeholder="Email"
                    required
                  />

                  {/* Password  */}
                  <label className="label text-sm mt-6 text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="input w-full rounded-lg border-2 border-gray-300 text-black"
                      placeholder="Password"
                      required
                    />
                    <button
                      onClick={() => setshowPassword(!showPassword)}
                      className="btn btn-xs absolute top-3 right-3 text-2xl border-none bg-transparent"
                      type="button"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-black text-sm">{passwordError}</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-neutral mt-4 text-lg rounded-lg text-black border-white"
                  >
                    Register
                  </button>

                  <div className="divider text-black text-lg">or</div>

                  <button className="flex items-center justify-center gap-2 cursor-pointer">
                    <FcGoogle size={24} />{" "}
                    <span className="text-lg text-black">
                      Login with Google
                    </span>
                  </button>

                  <p className="font-semibold text-center pt-8 text-lg text-black">
                    Already Have An Account?{" "}
                    <Link className="text-lg text-black font-extrabold" to="/auth/login">
                      Login
                    </Link>
                  </p>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
