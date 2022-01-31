import React, { useState } from "react";
import { Upload } from "react-bootstrap-icons";
import { uploadImage, signUp, signIn } from "../../services/apiCall";
import "./SignUp.css";

export const SignUp = () => {
  const [users, setUsers] = useState({
    number: "",
    password: "",
    name: "",
    profilePic: "",
    confirmPassword: "",
    about: ""
  });

  const [uploadedData, setUplodedData] = useState("");

  const [formData, setFormData] = useState("");

  function openFileDialog(accept, callback) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", callback);
    inputElement.dispatchEvent(new MouseEvent("click"));
  }

  const onFileChange = (e) => {
    let file = e.path[0].files[0];
    setUplodedData(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    setFormData(formData);
  };

  const onUploadedImageClose = () => {
    setUplodedData("");
    setFormData("");
  };

  const signUpUser = async(e) => {
    e.preventDefault(false)
    const upload = await uploadImage(formData);
    if (upload.status == 200) {
      setUsers({...users, profilePic: upload.data.image});
      const userInfo = {...users, profilePic: upload.data.image}
      const signup = await signUp(userInfo);
    }
    // console.log(signup)
  }

  return (
    <div className="signin-container">
      <div>
        <div className="signin-subcontainer">Register</div>
        <form action="">
          <div>
          {uploadedData && (<div
              onClick={onUploadedImageClose}
              style={{ marginLeft: "30%", cursor: "pointer" }}
            >
              X
            </div>)}
            <div
              className={"iconContainer"}
              onClick={() =>
                openFileDialog(".svg,.png,.jpg,.jpeg", onFileChange)
              }
            >
              {uploadedData && (
                <img
                  src={uploadedData}
                  alt="Click to Upload Image"
                  width={"100px"}
                  height={"100px"}
                  style={{ borderRadius: "50%" }}
                />
              )}
            </div>
          </div>
          <div className="sign-in-fields">
            <div>Name</div>
            <input
              type="text"
              value={users.email}
              placeholder="Your Name"
              onChange={(e) => setUsers({ ...users, name: e.target.value })}
            />
          </div>
          <div className="sign-in-fields">
            <div>Phone Number</div>
            <input
              type="text"
              value={users.email}
              placeholder="Phone number"
              onChange={(e) => setUsers({ ...users, number: e.target.value })}
            />
          </div>
          <div className="sign-in-fields">
            <div>Password</div>
            <input
              type="password"
              value={users.password}
              placeholder="Password"
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
            />
          </div>
          <div className="sign-in-fields">
            <div>Confirm Password</div>
            <input
              type="password"
              value={users.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setUsers({ ...users, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="sign-in-fields">
            <div>About</div>
            <input
              type="text"
              value={users.about}
              placeholder="Tell me about yourself"
              onChange={(e) =>
                setUsers({ ...users, about: e.target.value })
              }
            />
          </div>
          <div className="sign-in-fields">
            <button onClick={signUpUser} >Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
