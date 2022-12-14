import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
    const {feedback} = useContext(FeedbackContext)
    // Calculate ratings avg
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/, '') //1 decimal e.g. 9.5 (regex = if it is 0, replace it with '')

    return (
        <div className="feedback-stats">
            <h4>{feedback.length} Reviews</h4>
            <h4>Averate Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}

export default FeedbackStats