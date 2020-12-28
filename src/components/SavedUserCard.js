import { useState } from "react";
import { Card, Button } from "react-bootstrap";

import "./SavedUserCard.scss";

const SavedUserCard = (props) => {
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  const userDeleted = (
    <Button variant="warning" style={{ width: "100%" }}>
      User Delete
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
        {!isUserDeleted && (
          <Button
            variant="danger"
            style={{ width: "100%" }}
            onClick={() => {
              setIsUserDeleted(true);
              props.onAddHandler(props.title);
            }}
          >
            Delete
          </Button>
        )}
        {isUserDeleted && userDeleted}
      </Card.Footer>
    </Card>
  );
};

export default SavedUserCard;
