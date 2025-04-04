import React from "react";

const Posts = (props) => {

    return (
        <div className="post">
            <div className="post__content">

                <strong>
                    {props.number}. {props.post.title}
                </strong>

                <div>
                    {props.post.body}
                </div>

            </div>

            <div className="post__buttons">

                <button>Delete post</button>
                
            </div>
            
        </div>
    )
}

export default Posts;