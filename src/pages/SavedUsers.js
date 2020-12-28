import UserList from "../components/UserList";

const SavedUsers = ({ savedUsers, onDeleteHandler }) => {
  return (
    <section>
      {savedUsers && (
        <UserList
          showSavedUsers={true}
          onDeleteHandler={onDeleteHandler}
          savedUsers={savedUsers}
        />
      )}
    </section>
  );
};

export default SavedUsers;
