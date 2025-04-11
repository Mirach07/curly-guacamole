import React, { useState } from "react";
import MyButton from "./UI/Button/MyButton";
import { motion, AnimatePresence } from "motion/react";

const PostItem = (props) => {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.div
                    initial = {{opacity: 0, translateX: "-250px"}}
                    animate = {{opacity: 1, translateX: "0px"}}
                    exit = {{opacity: 0, translateX: "250px"}}
                    // transition = {{
                    //     duration: 0.3, 
                    //     ease: [0.1, 0.5, 0.7, 1], 
                    //     easings: ["circInOut"]
                    // }}
                >

                    <div className="post">

                        <div className="post__content">

                            <strong>
                                {props.post.id}. {props.post.title}
                            </strong>

                            <div>
                                {props.post.body}
                            </div>

                        </div>

                        <div className="post__buttons">

                            <MyButton onClick = {(e) => {
                                setIsVisible(false);
                                setTimeout(() => props.remove(props.post), 300);
                            }}>
                                Удалить пост
                            </MyButton>

                        </div>

                    </div>

                </motion.div>)
                : null}
        </AnimatePresence>
    )
}

export default PostItem;