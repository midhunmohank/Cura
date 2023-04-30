
// import '../../css/admin.css';
// import e from "cors";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import useToken from "./admin/useToken";
import Header from "./Header";


const Login = ({ setToken }) => {

	const history = useHistory();
	const token = useToken();

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
	
			localStorage.setItem('currentUser', JSON.stringify(response.data));
			setToken(response.data);
			if (response.data.data.user_role === 'patient') {
				history.push('/doctors');
			}
			else if (response.data.data.user_role === 'admin') {
				history.push('/view-hospitals');
			}
			else if (response.data.data.user_role === 'doctor') {
				history.push('/appointments');
			}else if (response.data.data.user_role === 'staff' && response.data.staff.role == 'nurse') {
				history.push('/written-prescriptions');
			}else if (response.data.data.user_role === 'staff' && response.data.data.role === 'pathologist') {
				history.push('/test-reports');
			}else if (response.data.data.user_role === 'staff' && response.data.staff.role == 'inventory_manager') {
				history.push('/view-medicines');
			}
		}).catch(e => {
			console.log(e);
		})
	}

	return (
		<div className="">
			<Header />
			<Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>

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