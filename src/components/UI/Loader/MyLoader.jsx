import React from "react";
import cl from "./MyLoader.module.css";
import { motion } from "motion/react";

const MyLoader = ()=> {
    return (
        <motion.div
            className={cl.loader}
            
            
        >
        </motion.div>
    )
}

export default MyLoader;