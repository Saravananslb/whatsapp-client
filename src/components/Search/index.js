import React, { useState } from "react";
import { Search, ArrowLeft } from "react-bootstrap-icons";
import { getUsersList } from "../../services/apiCall";
import "./search.css";

export const SearchBar = () => {
  const [isSearch, setIsSearch] = useState(false);

  const [user, setUser] = useState('')

  const onSearch = (status) => {
    setIsSearch(status);
  };

  const onSearchUser = (e) => {
    const user = e.target.value;
    setUser(user);
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
