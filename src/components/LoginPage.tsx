import React, { useEffect, useState } from "react";
import { RootState } from "../index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../services/UserService";
import { setUser, removeUser } from "../reducers/UserReducer";
import "../styles/card.css"

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const LoginPage = (props: Props) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	let history = useHistory();

	useEffect(() => {
		props.removeUser()
	}, []);

	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
	}

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const res = await login({
			username,
			password
		});
		console.log(res)
		if (res.status === 200) {
			props.setUser(res.data);
			history.push(`/`);
		}
	};

	return (
		<div className="card" style={{ "margin": "8px auto", "display": "block", "width": "fit-content" }}>
			<div className="header">
				<h2>Log in</h2>
			</div>
			<div className="content">
				<form onSubmit={handleSubmit} style={{ "display": "block" }}>
					<table>
						<tr>
							<td>Username:</td>
							<td><input type="text" onChange={onUsernameChange} /></td>
						</tr>
						<tr>
							<td>Password:</td>
							<td><input type="password" onChange={onPasswordChange} /></td>
						</tr>
						<tr>
							<td colSpan={2} >
								<input type="submit" className="btn-green" value="Log in" />
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	return { user: state.user };
};
const mapDispatchToProps = { setUser, removeUser };

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default ConnectedLoginPage;
