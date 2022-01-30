import React, {useState} from "react";
import './SignIn.css';

export const SignIn = () => {
  const [users, setUsers] = useState({
    phone: "",
    password: "",
  });

  return (
    <div className="signin-container">
      <div >
      <div className="signin-subcontainer">Login</div>
        <form action="">
          <div className="sign-in-fields">
            <div>Phone Number</div>
            <input type="text" value={users.email} placeholder="Phone number" onChange={(e) => setUsers({...users, phone: e.target.value})} />
          </div>
          <div className="sign-in-fields">
            <div>Password</div>
            <input type="password" value={users.password} placeholder="Password" onChange={(e) => setUsers({...users, password: e.target.value})} />
          </div>
          <div className="sign-in-fields">
          <button>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};
