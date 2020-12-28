import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SearchBar.scss";

const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <Link to="/" className="btn btn-info">
        Home
      </Link>
      <Form className="SearchBar__form">
        <Form.Control
          type="text"
          placeholder="Search User"
          onChange={props.onChange}
        />
      </Form>

      <Link to="/saved-users" className="btn btn-primary">
        Saved Users
      </Link>
    </div>
  );
};

export default SearchBar;
