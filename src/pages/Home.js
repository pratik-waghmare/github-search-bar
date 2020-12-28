import UserList from "../components/UserList";

const Home = ({ isLoading, searchResults, onAddHandler }) => {
  return (
    <section>
      {isLoading && (
        <h2
          className="card center mt-5"
          style={{
            width: "80vw",
            maxWidth: "400px",
            height: "200px",
            justifyContent: "center",
          }}
        >
          Loading...
        </h2>
      )}
      {!isLoading && searchResults.length === 0 && (
        <h2
          className="card center mt-5"
          style={{
            width: "80vw",
            maxWidth: "400px",
            height: "200px",
            justifyContent: "center",
          }}
        >
          No results
        </h2>
      )}
      {!isLoading && searchResults && (
        <UserList searchResults={searchResults} onAddHandler={onAddHandler} />
      )}
    </section>
  );
};

export default Home;
