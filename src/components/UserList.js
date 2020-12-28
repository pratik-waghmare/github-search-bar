// import { Card, Button } from "react-bootstrap";

import "./UserList.scss";
import UserCard from "./UserCard";
import SavedUserCard from "./SavedUserCard";

const UserList = (props) => {
  //   console.log(props);
  if (props.savedUsers) {
    return (
      <div className="UserList">
        {props.savedUsers && props.savedUsers.length === 0 && (
          <>
            <div></div>
            <h2
              className="card center  mt-5"
              style={{
                width: "80vw",
                maxWidth: "400px",
                height: "200px",
                justifyContent: "center",
              }}
            >
              No results
            </h2>
          </>
        )}
        {props.savedUsers &&
          props.savedUsers.map((element) => (
            <SavedUserCard
              key={element.id}
              title={element.login}
              html_url={element.html_url}
              image={element.avatar_url}
              repos={element.top_five_repos}
              onAddHandler={props.onDeleteHandler}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="UserList">
      {props.searchResults &&
        props.searchResults.map((element) => (
          <UserCard
            key={element.id}
            title={element.login}
            html_url={element.html_url}
            image={element.avatar_url}
            repos={element.top_five_repos}
            onAddHandler={props.onAddHandler}
          />
        ))}
    </div>
  );
};

export default UserList;
