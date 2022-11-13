import {createContext, useEffect} from 'react';
import {useState} from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetching data
	const fetchFeedback = async () => {
		const response = await fetch('/feedback?_sort=id&_order=desc');
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// DEL http request
	const deleteFeedback = async id => {
		if (window.confirm('Are you sure you wanto to delete this review?')) {
			try {
				await fetch(`/feedback/${id}`, {
					method: 'DELETE',
				});
				setFeedback(feedback.filter(item => item.id !== id));
			} catch (error) {
				console.log(error);
			}
		}
	};

	// POST http request
	const addFeedback = async newFeedback => {
		try {
			const response = await fetch('/feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newFeedback),
			});

			const data = await response.json();
			setFeedback(prev => [data, ...prev]);
		} catch (error) {
			console.log(error);
		}
	};

	const editFeedback = item => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	//PATCH http request
	const updateFeedback = async (id, updItem) => {
		try {
			const response = await fetch(`/feedback/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updItem),
			});

			const data = await response.json();

			setFeedback(
				feedback.map(item => (item.id === id ? {...item, ...data} : item))
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				addFeedback,
				deleteFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
