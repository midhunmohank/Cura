
// import '../../css/admin.css';
// import e from "cors";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import ApiFunctions from "../../ApiFunctions";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import useToken from "./useToken";
import Header from "./Header";


const Login = ({ setToken }) => {

	const history = useHistory();
	const token = useToken();
	if (token.token) {

		// if (token.token.data.user_role === 'patient') {
		// 	history.push('/');
		// }
		if (token.token.data.user_role === 'admin') {
			history.push('/dashboard');
		}
		// if (token.token.data.user_role === 'staff') {
		// 	history.push('/organizations');
		// }
	}

	// localStorage.setItem('currentUser', '');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const loginUser = async (e) => {
		e.preventDefault();
		var data = new FormData();
		data.append('username', email);
		data.append('password', password);

		ApiFunctions.login(data, {
			headers: {
				'Content-Type': 'application/form-data'
			}
		}).then(response => {
			console.log("Here Result --");
			console.log(response);
			localStorage.setItem('currentUser', JSON.stringify(response.data));
			setToken(response.data);
			if (response.data.data.user_role === 'patient') {
				history.push('/');
			}
			else if (response.data.data.user_role === 'admin') {
				history.push('/dashboard');
			}
			else if (response.data.data.user_role === 'staff') {
				history.push('/organizations');
			}
			

		}).catch(e => {
			console.log(e);
		})
	}

	return (
		<div className="App">
			<Helmet>
				<link rel="stylesheet" href={require('../../css/admin.css').default} />
				{/* <link rel="stylesheet" href={require('../vendor/fontawesome-free/css/all.min.css').default} /> */}
			</Helmet>
			<Header />

			<section class="page_wrapper page_wrapper_login"  id="login-block">
				<div class="page-heading-title">
					<h3>Login</h3>
				</div>
				<form action="" method="post" className="login-block">
					<div class="form_grid_wrap">
						<div class="form-group-grid-wrap">
							<label for="username">Username</label>
							<input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" className="form-control" required />
						</div>
						<div class="form-group-grid-wrap">
							<label for="password">Password</label>
							<input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" required />
						</div>
					</div>
					<div class="form-btn">
						<button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
					</div>
				</form>
			</section>

		</div>
	);
}

export default Login;