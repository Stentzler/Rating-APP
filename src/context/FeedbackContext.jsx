import {v4 as uuidv4} from 'uuid';
import {createContext} from 'react';
import {useState} from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
	const [feedback, setFeedback] = useState([
		{
			id: uuidv4(),
			text: 'Dummy text',
			rating: 10,
		},
	]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	const deleteFeedback = id => {
		setFeedback(feedback.filter(item => item.id !== id));
	};

	const addFeedback = newFeedback => {
		newFeedback.id = uuidv4();
		setFeedback(prev => [newFeedback, ...prev]);
	};

	const editFeedback = item => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	const updateFeedback = (id, updItem) => {
		setFeedback(
			feedback.map(item => (item.id === id ? {...item, ...updItem} : item))
		);
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
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
