import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import AuthService from "../../services/auth.service";
import Logo from "../../images/interview.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
	Col,
	Row,
	Form,
	Input,
	Label,
	Button,
	CardText,
	CardTitle,
	FormGroup,
} from "reactstrap";
import "./styles.scss";

export const Login = () => {
	let navigate = useNavigate();
	const [state, dispatch] = useGlobalState();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { handleSubmit } = useForm();

	const onSubmit = (e) => {
		AuthService.login(username, password).then(async (resp) => {
			let data = jwtDecode(resp.access);
			await dispatch({
				currentUserToken: resp.access,
				currentUser: data,
			});
			navigate("home");
		});
	}; // end of onSubmit

	return (
		<div className="auth_wrapper">
			<Row className="auth_inner m-0">
				<h2 className="brand-text text-primary ml-1">Fast Track</h2>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={Logo} alt="Interview Image" />
					</div>
				</Col>
				<Col
					className="d-flex align-items-center p-2 p-lg-5 user-auth"
					lg="4"
					sm="12"
				>
					<Col className="px-xl-2 mx-auto auth-bg" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold">
							Welcome to Fast Track!
						</CardTitle>
						<CardText className="mb-2 card-text">
							Login to start tracking job applications.
						</CardText>

						<Form
							className="auth-login-form mt-2"
							onSubmit={handleSubmit(onSubmit)}
						>
							<FormGroup>
								<Label for="username">Username: </Label>
								<Input
									autoFocus
									type="text"
									value={username}
									id="username"
									name="username"
									className="auth-username"
									placeholder="Enter your username"
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password: </Label>
								<Input
									autoFocus
									type="password"
									value={password}
									id="password"
									name="password"
									className="auth-password"
									placeholder="Enter your password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<div className="d-flex justify-content-between auth-forgot">
									<Link to="/forgot-password">
										<small className="f-text">Forgot Password?</small>
									</Link>
								</div>
							</FormGroup>
							<Button className="auth-login-btn" color="primary" type="submit">
								Login
							</Button>
						</Form>
						<p className="reg text-center mt-2">
							<span className="reg-text mr-25">New to the site?</span>
							<br />
							<Link to="/register">
								<span className="text-danger reg-link pt-5">
									Register Today!
								</span>
							</Link>
						</p>
					</Col>
				</Col>
			</Row>
		</div>
	);
};
