import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';
import AboutLink from './components/AboutLink';
import {FeedbackProvider} from './context/FeedbackContext';

const App = () => {
	return (
		<FeedbackProvider>
			<Router>
				<Header />
				<Routes>
					<Route
						exact
						path='/'
						element={
							<>
								<div className='container'>
									<FeedbackForm />
									<FeedbackStats />
									<FeedbackList />
								</div>
								<AboutLink />
							</>
						}
					/>
					<Route
						path='/about'
						element={
							<div className='container'>
								<AboutPage />
							</div>
						}
					/>
				</Routes>
			</Router>
		</FeedbackProvider>
	);
};

export default App;
