import { useState } from "react";
import { Card, Button } from "react-bootstrap";

import "./UserCard.scss";

const UserCard = (props) => {
  const [isUserAdded, setIsUserAdded] = useState(false);

  const userAdded = (
    <Button variant="success" style={{ width: "100%" }}>
      User
    </Button>
  );

  return (
    <Card className="UserCard">
      <Card.Img className="UserCard__avatar" variant="top" src={props.image} />
      <Card.Body className="UserCard__body">
        <Card.Title className="UserCard__heading">
          <a href={props.html_url} target="_blank" rel="noreferrer">
            {props.title}
          </a>
        </Card.Title>
        <Card.Text className="UserCard__text">
          <h6>Top 5 repositories</h6>
          {props.repos.length >= 1 && (
            <ul>
              {props.repos.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {props.repos.length === 0 && <p>No repository found</p>}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="UserCard__footer">
        {!isUserAdded && (
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={() => {
              setIsUserAdded(true);
              props.onAddHandler(props.title);
            }}
          >
            Add
          </Button>
        )}
        {isUserAdded && userAdded}
      </Card.Footer>
    </Card>
  );
};

export default UserCard;
