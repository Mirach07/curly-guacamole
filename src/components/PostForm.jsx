import React, { useState } from "react";
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: "", body: ""});
    // const bodyInputRef = useRef();

    const addNewPost = (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(), ...post
        }
        create({...newPost});
        setPost({title: "", body: ""});
      };
    
    return (
        
        <form>
            {/* управляемые компоненты */}
            <MyInput
                type = "text"
                placeholder = "Название поста"
                value = {post.title}
                onChange = {event => setPost({...post, title: event.target.value})}
            />

            <MyInput 
                type = "text" 
                placeholder = "Описание"
                value = {post.body}
                onChange = {event => setPost({...post, body: event.target.value})}
            />


                {/* неуправляемый компонент */}
            {/* <MyInput 
                type = "text" 
                placeholder = "Описание"
                ref = {bodyInputRef}
            /> */}

        
            <MyButton onClick = {addNewPost}>Опубликовать</MyButton>

      </form>

    )

}

export default PostForm;