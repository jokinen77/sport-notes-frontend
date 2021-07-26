import React from "react";
import { connect } from "react-redux";
//import { addMessage } from "../../reducers/MessageReducer";
//import { removeUser } from "../../reducers/UserReducer";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/dropdown-menu.css";

interface MainMenuProps {

}

const MainMenu: React.FC<MainMenuProps> = (props) => {
	//const user = props.user;
	// const logout = () => {
	//   props.removeUser();
	//   props.addMessage({content: "Logged out!", type: "success"});
	//   props.history.push('/')
	// }

	return (
		<>
			<div className="dropdown">
				<button className="dropbtn">
					<img
						src="/images/menu-button.png"
						width="50px"
						height="40px"
						alt="menu_button.png"
					/>
				</button>
				<div className="dropdown-content">
					<Link to="/">Note feed</Link>
					<Link to="/settings">Settings</Link>
					<Link to="/login">Log out</Link>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state: MainMenuProps) => {
	return { ...state };
};
const mapDispatchToProps = {};

const ConnectedMainMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMenu);
export default withRouter(ConnectedMainMenu);
