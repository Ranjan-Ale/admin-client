import { useState, type FormEvent } from "react";
import { loginUser, setToken } from "../../services/auth.service";
import { useNavigate } from "react-router";

const Login = () => {
	let navigate = useNavigate();

	const [formData, setFormData] = useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: ''
	});

	const onChangeInput = (name: string, value: string): void => {
		setFormData({
			...formData,
			[name]: value
		});
	}

	const onSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginUser(formData.email, formData.password)
			.then(({ success, token }) => {
				if (success && token) {
					setToken(token);
					navigate('/');
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<main className="login-page bg-body-secondary">
			<div className="login-box">
				<h1 className="login-logo">
					<a href="../index2.html"><b>Admin</b>LTE</a>
				</h1>
				{/* <!-- /.login-logo --> */}
				<div className="card">
					<div className="card-body login-card-body">
						<p className="login-box-msg">Sign in to start your session</p>

						<form method="post" onSubmit={onSubmitLoginForm}>
							<label className="visually-hidden" htmlFor="loginEmail">Email</label>
							<div className="input-group mb-3">
								<input id="loginEmail" type="email" className="form-control" placeholder="Email"
								onChange={(e) => onChangeInput('email', e.target.value)}
								 />
								<div className="input-group-text">
									<span className="bi bi-envelope"></span>
								</div>
							</div>
							<label className="visually-hidden" htmlFor="loginPassword">Password</label>
							<div className="input-group mb-3">
								<input
									id="loginPassword"
									type="password"
									className="form-control"
									placeholder="Password"
									onChange={(e) => onChangeInput('password', e.target.value)}
								/>
								<div className="input-group-text">
									<span className="bi bi-lock-fill"></span>
								</div>
							</div>
							{/* <!--begin::Row--> */}
							<div className="row">
								<div className="col-8">
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
										<label className="form-check-label" htmlFor="flexCheckDefault"> Remember Me </label>
									</div>
								</div>
								{/* <!-- /.col --> */}
								<div className="col-4">
									<div className="d-grid gap-2">
										<button type="submit" className="btn btn-primary">Sign In</button>
									</div>
								</div>
								{/* <!-- /.col --> */}
							</div>
							{/* <!--end::Row--> */}
						</form>
					</div>
					{/* <!-- /.login-card-body --> */}
				</div>
			</div>
		</main>
	)
}

export default Login;