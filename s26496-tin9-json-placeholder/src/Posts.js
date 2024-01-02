import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostsDetails from "./PostsDetails";
import ReactPaginate from "react-paginate";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  //
  const postsPerPage = 12;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * postsPerPage;
  const pageCount = posts ? Math.ceil(posts.length / postsPerPage) : 0;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  //

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch the data.");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const displayedPosts =
    posts &&
    posts.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => {
      return (
        <div key={post.id} className="post">
          <li>
            <Link
              className={"go-to-post"}
              to={`/posts/${post.id}`}
              element={<PostsDetails />}
            >
              {post.title}
            </Link>
          </li>
        </div>
      );
    });

  return (
    <div className="list-wrap">
      <h1>Posts</h1>
      <ul>
        {!posts && <p>Currently there are no posts.</p>}
        {error && <p>{error}</p>}
        {posts && displayedPosts}
        {/* {posts && posts.map(post => <li><Link to={`/posts/${post.id}`} element={<PostsDetails/>}>{post.title}</Link></li>)} */}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        containerClassName="pagination"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        disabledClassName="pagination-disabled"
        activeClassName="pagination-active"
      />
    </div>
  );
};

export default Posts;
