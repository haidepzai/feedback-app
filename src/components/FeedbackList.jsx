import { motion, AnimatePresence } from 'framer-motion'
import React, { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {
    const { feedback, isLoading } = useContext(FeedbackContext)
    //mit useContext kann man auf Global State, die durch Context erzeugt wurden zugreifen. Man erhält Zugriff auf das value Object vom Provider


    if (!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No Feedback yet</p>
    }

    return isLoading ? <Spinner/> : (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItem
                            key={item.id}
                            item={item}
                        //handleDelete={handleDelete}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
    //Animated Version:
    // return (
    //     <div className="feedback-list">
    //         <AnimatePresence>
    //             {feedback.map((item) => (
    //                 <motion.div 
    //                     key={item.id}
    //                     initial={{opacity: 0}}
    //                     animate={{opacity: 1}}
    //                     exit={{opacity: 0}}
    //                 >
    //                     <FeedbackItem
    //                         key={item.id}
    //                         item={item}
    //                         //handleDelete={handleDelete}
    //                     />
    //                 </motion.div>
    //             ))}
    //         </AnimatePresence>
    //     </div>
    // )


    // return (
    //     <div className="feedback-list">
    //         {feedback.map((item) => (
    //             <FeedbackItem
    //                 key={item.id}
    //                 item={item}
    //                 handleDelete={handleDelete}
    //             />
    //         ))}
    //     </div>
    // )
}

export default FeedbackList