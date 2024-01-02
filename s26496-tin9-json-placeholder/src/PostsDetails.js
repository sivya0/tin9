import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostsDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch the data.");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setPost(data);

        fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
          .then((res) => {
            if (!res.ok) {
              throw Error("Couldn't fetch the user data.");
            } else {
              return res.json();
            }
          })
          .then((userData) => {
            setUser(userData);
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't delete the post.");
        } else {
          console.log("DELETE request successful.");
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error during DELETE request:", err.message);
        setError(err.message);
      });
  };

  return (
    <div className="list-item">
      {error && <p>{error}</p>}
      {loaded ? (
        post &&
        user && (
          <>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
            <p>User: {user.username}</p>
            <button onClick={() => navigate(-1)}>Back</button>
            <br />
            <button onClick={handleDelete}>Delete post</button>
          </>
        )
      ) : (
        <p>Loading data...</p>
      )}

      {/* {post && user &&
                <>
                <p>Title: {post.title}</p>
                <p>Body: {post.body}</p>
                <p>User: {user.username}</p>
                <button onClick={() => navigate(-1)}>Back</button>
                <br />
                <button onClick={handleDelete}>Delete post</button>
                </>} */}
    </div>
  );
};

export default PostsDetails;
