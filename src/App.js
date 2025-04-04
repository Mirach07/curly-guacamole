import React, { /*useRef*/ useMemo, useState } from "react";
import "./styles/App.css";  
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/Modal/MyModal";
import MyButton from "./components/UI/Button/MyButton";


function App() {
          // ПОСТЫ

  const [posts, setPosts] = useState([
    {id: 1, title: "Js", body: "Description"},
    {id: 2, title: "Java", body: "Ascription"},
    {id: 3, title: "Python", body: "Demolition"}
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
    console.log("компонент удалён");
  }

          // СОРТИРОВКА ПОСТОВ

  const [filter, setFilter] = useState({sort: "", query: ""})
  const sortedPosts = useMemo(() => {
    console.log("функция отработала");

    if(filter.sort)
      return [...posts.sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))]
    
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const [modal, setModal] = useState(false);

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

      <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "Список постов 1"/>
      
    </div>
  );
}

export default App;