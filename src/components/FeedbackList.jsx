import FeedbackItem from './FeedbackItem';
import {motion, AnimatePresence} from 'framer-motion';
import {useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
	const {feedback} = useContext(FeedbackContext);

	return (
		<div className='feedback-list'>
			<AnimatePresence>
				{feedback.map(item => (
					<motion.div
						key={item.id}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{duration: 0.4}}
					>
						<FeedbackItem key={item.id} item={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

export default FeedbackList;
