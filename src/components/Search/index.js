import React, { useContext, useState } from "react";
import { Search, ArrowLeft } from "react-bootstrap-icons";
import { getUsersList } from "../../services/apiCall";
import { Context } from "../../store/Context";
import { SET_TEMP_CONTACT, SET_CONTACT } from "../../store/action.types";
import "./search.css";

export const SearchBar = () => {
  const [isSearch, setIsSearch] = useState(false);

  const {state, dispatch} = useContext(Context);

  const [user, setUser] = useState('')

  const onSearch = (status) => {
    setIsSearch(status);
  };

  const onSearchUser = (e) => {
    const user = e.target.value;
    setUser(user);
    let newUser = [];
    if (user) {
      newUser = state.userContacts.map(item => {
        if (item.number.toLowerCase().includes(user.toLowerCase()) || item.name.toLowerCase().includes(user.toLowerCase())) {
          return item;
        }
      })
      console.log(newUser)
      dispatch({
        type: SET_CONTACT,
        payload: {
          userContacts: newUser[0] ? newUser : []
        }
      })
    }
    else {
      dispatch({
        type: SET_CONTACT,
        payload: {
          userContacts: state.userContactsTemp
        }
      })
    }
    const searchUsers = getUsersList(user);
  }

  return (
    <div className="search-container">
      {isSearch ? (
        <ArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => onSearch(false)}
        />
      ) : (
        <label htmlFor='searchUser'>
        <Search style={{ cursor: "pointer" }} onClick={() => onSearch(true)} />
        </label>
      )}
      <input
        type="text"
        className="search-text"
        id="searchUser"
        value={user}
        placeholder="Search or Start a new chat"
        onFocus={() => onSearch(true)}
        onBlur={() => onSearch(false)}
        onChange={onSearchUser}
      />
    </div>
  );
};
