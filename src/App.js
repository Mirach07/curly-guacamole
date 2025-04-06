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


function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: "", query: ""});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 500)
    
  }

  useEffect(() => {
    fetchPosts();
  }, [filter])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
    console.log(posts)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
    console.log("компонент удалён");
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

      {isPostsLoading
        ? <MyLoader/>
        : <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "Список постов 1"/>
      }
      
      
    </div>
  );
}

export default App;