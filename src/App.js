import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Switch, Route, useHistory } from "react-router-dom";

import Home from "./pages/Home";
import SavedUsers from "./pages/SavedUsers";
import SearchBar from "./components/SearchBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedUsers, setSavedUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    setSavedUsers(users);
  }, []);

  const debounceSave = debounce((value) => {
    fetchUsers(value);
  }, 500);

  const fetchUsers = async (user) => {
    setIsLoading(true);
    let data;
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${user}&per_page=6`
      );
      const responseData = await res.json();
      data = responseData.items;
    } catch (err) {
      console.log(err);
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        let repos;
        try {
          const res = await fetch(`${data[i].repos_url}?per_page=5`);
          repos = await res.json();
        } catch (err) {
          console.log(err);
        }

        data[i].top_five_repos = repos;
      }

      if (data.message === "Not Found") {
        console.log("No User");
      } else {
        setSearchResults(data);
      }
    }

    setIsLoading(false);
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    debounceSave(event.target.value);
  };

  const onAddHandler = (name) => {
    let user = searchResults.filter((element) => element.login === name);

    let users = [];

    if (savedUsers) {
      users = savedUsers;
    }

    users.push(user[0]);
    setSavedUsers(users);
    localStorage.setItem("users", JSON.stringify(users));

    let updatedSearchResults = searchResults.filter(
      (element) => element.login !== name
    );

    setSearchResults(updatedSearchResults);

    history.push("/saved-users");
  };

  const onDeleteHandler = (name) => {
    let users = savedUsers.filter((element) => element.login !== name);
    setSavedUsers(users);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const routes = (
    <Switch>
      <Route path="/" exact>
        <Home
          isLoading={isLoading}
          searchResults={searchResults}
          onAddHandler={onAddHandler}
        />
      </Route>
      <Route path="/saved-users" exact>
        <SavedUsers savedUsers={savedUsers} onDeleteHandler={onDeleteHandler} />
      </Route>
    </Switch>
  );

  return (
    <div className="App">
      <SearchBar onChange={onChangeHandler} />
      {routes}
    </div>
  );
}

export default App;
