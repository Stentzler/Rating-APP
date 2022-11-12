import Card from '../components/shared/Card';
import {Link} from 'react-router-dom';

function AboutPage() {
	return (
		<Card>
			<div>
				<h1>About This Project</h1>
				<p>This is a React feedback app for products or services</p>
				<p>Version 1.0.0</p>

				<p>
					<Link to='/'>Back to the App</Link>
				</p>
			</div>
		</Card>
	);
}

export default AboutPage;
