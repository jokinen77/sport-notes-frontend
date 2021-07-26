import React, { useEffect, useState } from "react";
import { RootState } from "../index";
import { connect } from "react-redux";
import { WebsocketBuilder, Websocket } from 'websocket-ts';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/card.css"
import Moment from "react-moment";
import "moment-timezone";
import Accordion from "./Accordion"

interface CreateNoteFormProps {
	token: string;
	ws: Websocket | undefined;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = (props) => {
	const [content, setContent] = useState<string>("");

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		event.preventDefault();
		setContent(event.target.value);
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (props.ws) {
			props.ws.send(JSON.stringify({ "token": props.token, "action": "CREATE_NOTE", "content": content }))
			setContent("");
		} else {
			console.log("No websocket!");
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<table>
				<tr>
					<td><label>Create new note:</label></td>
					<td><textarea value={content} onChange={e => onChange(e)} /></td>
				</tr>
				<tr>
					<td colSpan={2} >
						<input type="submit" className="btn-green" value="Create" />
					</td>
				</tr>
			</table>
		</form>
	);
};

const mapStateToProps = (state: RootState) => {
	return { user: state.user };
};
const mapDispatchToProps = {};

const ConnectedCreateNoteForm = connect(mapStateToProps, mapDispatchToProps)(CreateNoteForm);
export default ConnectedCreateNoteForm;
