import { createContext, useEffect, useState } from "react";
//Create Global Context (mit useContext, kann man dann darauf zugreifen)
//Um Props Drilling zu vermeiden. Derzeit:
////App -> FeedbackList -> FeedbackItem
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {}, //Actual Item to be edited
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })
        const data = await response.json()

        setFeedback([data, ...feedback]) // Update UI
    }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })

            setFeedback(feedback.filter((item) => item.id !== id)) // Update UI
        }
    }

    // Set item to be edited
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ?
            data : item))

        setFeedbackEdit({
            item: {},
            edit: false,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback, //function
        feedbackEdit, //state (Object with Boolean)
        updateFeedback,
        isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext