import React, {useState, useContext} from "react";
import { signIn } from "../../services/apiCall";
import { b64toBlob } from "../../utils/b64toBlob";
import { Context } from '../../store/Context';
import { USER_INFO } from '../../store/action.types';
import { cookies } from "../../services/apiCall";
import './SignIn.css';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [users, setUsers] = useState({
    number: "",
    password: "",
  });

  const {state, dispatch} = useContext(Context);

  const navigate = useNavigate();

  const onSignIn = async(e) => {
    e.preventDefault(false);
    const signed = await signIn(users);
    if (signed.status == 200) {
      const blob = b64toBlob(signed.data.profilePic, signed.data.imageType);
      const blobUrl = URL.createObjectURL(blob);
      console.log(blobUrl)
      dispatch({
        type: USER_INFO,
        payload: {
          user: { ...signed, profilePic: blobUrl }
        }
      });
      cookies.set('Authorization', signed.data.token)
      navigate('/')
    }
  }

  return (
    <div className="signin-container">
      <div >
      <div className="signin-subcontainer">Login</div>
        <form action="">
          <div className="sign-in-fields">
            <div>Phone Number</div>
            <input type="text" value={users.email} placeholder="Phone number" onChange={(e) => setUsers({...users, number: e.target.value})} />
          </div>
          <div className="sign-in-fields">
            <div>Password</div>
            <input type="password" value={users.password} placeholder="Password" onChange={(e) => setUsers({...users, password: e.target.value})} />
          </div>
          <div className="sign-in-fields">
          <button onClick={onSignIn}>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};
