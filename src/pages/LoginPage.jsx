import { useContext, useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { UserContext } from "../context/userContext";

export const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const {setIsLoggedIn, user, setUser, isLoggedIn, saveUserData} = useContext(UserContext)

  // Function til at slette userdata i localstorage og sætte isloggedIn til false
  const handleLogout = () => {
    localStorage.clear("user");
    setIsLoggedIn(false);
    setUser()
  };

  // Funktion der sender email og password til server og forsøger at logge ind. 
  const handleLogin = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    if (!password) {
      setErrorMsg("Du skal udfylde password");
    }
    if (!email) {
      setErrorMsg("Du skal udfylde email");
    }
    if (!email && !password) {
      setErrorMsg("Du skal udfylde begge felter");
    }
    if (email && password) {
      setErrorMsg("");
      let url = `http://localhost:4000/login`;
      let body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);
      let options = { body: body, method: "POST" };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => saveUserData(data));
    }
  };

  return (
    <>
      <h1>LoginPage</h1>
      {!isLoggedIn ? (
        <div>
          <form
            onSubmit={(event) => {
              handleLogin(event);
            }}
          >
            <InputField
              name="email"
              placeholder="Please enter your email"
              type="email"
            />
            <InputField
              name="password"
              placeholder="Please enter your password"
              type="password"
            />
            <input type="submit" value="Login" />
          </form>
          <b>{errorMsg}</b>
        </div>
      ) : (
        <div>
          <p>
            Velkommen {user.firstname} {user.lastname}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};
