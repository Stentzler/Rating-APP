import FeedbackItem from './FeedbackItem';
import ReactLoading from 'react-loading';
import {motion, AnimatePresence} from 'framer-motion';
import {useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
	const {feedback} = useContext(FeedbackContext);
	const {isLoading} = useContext(FeedbackContext);

	return (
		<div className='feedback-list'>
			<AnimatePresence>
				{isLoading ? (
					<ReactLoading
						className='loading'
						type={'bubbles'}
						color={'#f3f3f3'}
						height={'15%'}
						width={'15%'}
					/>
				) : (
					feedback.map(item => (
						<motion.div
							key={item.id}
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{duration: 0.4}}
						>
							<FeedbackItem key={item.id} item={item} />
						</motion.div>
					))
				)}
			</AnimatePresence>
		</div>
	);
}

export default FeedbackList;
