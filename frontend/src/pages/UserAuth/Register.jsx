import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../images/interview.png";
import {
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	CardText,
	CardTitle,
} from "reactstrap";
import "./styles.scss";

export const Register = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		passwordConf: "",
	});

	const handleChange = (key, value) => {
		setUser({ ...user, [key]: value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		console.log("************** HANDLE REGISTER ", user);
		AuthService.register(user);
		navigate("/");
	};

	return (
		<div className="auth-wrapper">
			<Row className="auth-inner m-0">
				<h2 className="brand-text text-primary ml-1">Fast Track</h2>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={Logo} alt="logo" />
					</div>
				</Col>
				<Col
					className="d-flex align-items-center register p-2 p-lg-5"
					lg="4"
					sm="12"
				>
					<Col className="px-xl-2 mx-auto auth-bg" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold">
							Welcome to Fast Track!
						</CardTitle>
						<CardText className="mb-2 card-text">
							Registering your account is easy.
						</CardText>

						<Form className="auth-login-form mt-2" onSubmit={handleRegister}>
							<FormGroup>
								<Label className="form-label" for="firstName">
									First Name:
								</Label>
								<Input
									autoFocus
									type="text"
									value={user.firstName}
									placeholder="Enter your first name here ..."
									id="firstName"
									name="firstName"
									className="auth-username"
									onChange={(e) => handleChange("firstName", e.target.value)}
									required
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="username">
									Last Name:
								</Label>
								<Input
									autoFocus
									type="text"
									value={user.lastName}
									placeholder="Enter your last name here ..."
									id="lastName"
									name="lastName"
									className="auth-username"
									onChange={(e) => handleChange("lastName", e.target.value)}
									required
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="username">
									Username:
								</Label>
								<Input
									autoFocus
									type="text"
									value={user.username}
									placeholder="Enter your username here ..."
									id="username"
									name="username"
									className="auth-username"
									onChange={(e) => handleChange("username", e.target.value)}
									required
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="email" className="form-label-email">
									Email:{" "}
								</Label>
								<Input
									type="email"
									value={user.email}
									id="email"
									name="email"
									className="auth-email"
									placeholder="Enter your email"
									onChange={(e) => handleChange("email", e.target.value)}
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password: </Label>
								<Input
									type="password"
									value={user.password}
									id="password"
									name="password"
									className="auth-password"
									placeholder="Enter your password"
									minLength="5"
									onChange={(e) => handleChange("password", e.target.value)}
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="conf" for="passwordConf">
									Password
								</Label>
								<Input
									type="password"
									value={user.passwordConf}
									id="passwordConf"
									name="passwordConf"
									className="auth-passwordConf"
									placeholder="Confirm your password"
									minLength="5"
									onChange={(e) => handleChange("passwordConf", e.target.value)}
									innerRef={{
										required: true,
										validate: (value) => value !== "",
									}}
								/>
							</FormGroup>
							<Button
								type="submit"
								className="btn-reg mt-4"
								disabled={
									user.password &&
									user.password.length >= 5 &&
									user.password === user.passwordConf &&
									user.firstName &&
									user.lastName &&
									user.email
										? false
										: true
								}
							>
								Register
							</Button>
						</Form>
						<p className="reg text-center mt-2">
							<span className="reg-text mr-25">Already have an account?</span>
							<br />
							<Link to="/">
								<span className="text-warning reg-link">Login!</span>
							</Link>
						</p>
					</Col>
				</Col>
			</Row>
		</div>
	);
};
