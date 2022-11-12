import React, {useState, useContext, useEffect} from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './Rating';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
	const {addFeedback, feedbackEdit, updateFeedback} =
		useContext(FeedbackContext);

	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	const handleSubmit = e => {
		e.preventDefault();

		if (text.trim().length >= 10) {
			const newFeedback = {
				text,
				rating,
			};
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}
			setText('');
		}
	};

	const handleTextChange = e => {
		if (e.target.value === '') {
			setBtnDisabled(true);
			setMessage(null);
		} else if (e.target.value.trim().length < 10) {
			setBtnDisabled(true);
			setMessage('Feedback must contain at least 10 characters');
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}
		setText(e.target.value);
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate us?</h2>
				<RatingSelect select={rating => setRating(rating)} />
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
