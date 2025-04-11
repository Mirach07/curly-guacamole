import React, { useEffect, useState } from "react";
import "./styles/App.css";  
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/Modal/MyModal";
import MyButton from "./components/UI/Button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import MyLoader from "./components/UI/Loader/MyLoader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";


function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: "", query: ""});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);

    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
    console.log(posts);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
    console.log("компонент удалён");
  };

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">

      <MyButton style = {{margin: "15px auto"}} onClick = {() => setModal(true)}>Добавить пост </MyButton>

      <MyModal
        visible = {modal}
        setVisible={setModal}
      >
        <PostForm create = {createPost}/>
      </MyModal>

      <hr style={{margin: "15px 0"}}/>

        <PostFilter
          filter = {filter}
          setFilter = {setFilter}
        />

      {postError && 
        <h1>Произошла ошибка: ${postError}</h1>
      }  

      {isPostsLoading
        ? <MyLoader/>
        : <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "Список постов 1"/>
      }
      
      <div className="page__wrapper">
        {pagesArray.map(p =>
          <span 
            onClick={() => {
              changePage(p);
            }} 
            key={p} 
            className={page === p ? "page page__current" : "page"}
          >
            {p}
          </span>
        )}
      </div>
    </div>
  );
}

export default App;