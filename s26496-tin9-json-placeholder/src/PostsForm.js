import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostsForm = ({ setPosts }) => {
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postUser, setPostUser] = useState(1);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setPostTitle(title);
  };

  const handleBodyChange = (e) => {
    const body = e.target.value;
    setPostBody(body);
  };

  const handleUserChange = (e) => {
    const user = e.target.value;
    setPostUser(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitle,
      body: postBody,
      userId: postUser,
    };
    fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't make the POST request.");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("POST request successful. Response data:", data);
      })
      .catch((err) => {
        console.error("Error during POST request:", err.message);
        setError(err.message);
      })
      .then(() => {
        // navigate("/");
        return Promise.all([navigate("/")]);
      });

    setPostTitle("");
    setPostBody("");
    setPostUser(1);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch the users.");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(data);
        // console.log(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  });

  return (
    <div className="item-form">
      <p>Create new post:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Post title: </label>
        <input
          type="text"
          id="post-title"
          name="post-title"
          value={postTitle}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="post-body">Post body: </label>
        <textarea
          type="text"
          id="post-body"
          name="post-body"
          value={postBody}
          onChange={handleBodyChange}
        />
        <br />
        <label htmlFor="users">User: </label>
        <select
          name="users"
          id="users"
          value={postUser}
          onChange={handleUserChange}
        >
          {users &&
            users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
        </select>
        {error && <p>{error}</p>}
        <button>Add post</button>
      </form>
    </div>
  );
};

export default PostsForm;
