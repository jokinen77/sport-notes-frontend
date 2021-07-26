import React, { useEffect, useState } from "react";
import { RootState } from "../index";
import { connect } from "react-redux";
import { WebsocketBuilder, Websocket, WebsocketEvents } from 'websocket-ts';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/card.css"
import Moment from "react-moment";
import "moment-timezone";
import Accordion from "./Accordion"
import CreateNoteForm from "./CreateNoteForm"

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
interface Note {
	id: number;
	orderno: number;
	content: string;
	modified: string;
	modifier: User;
}
interface User {
	username: string;
	name: string;
	token: string;
}

const Notes = (props: Props) => {
	const user: User = props.user;

	const [ws, setWs] = useState<Websocket>();
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		if (!ws) {
			buildConnection();
		} else {
			updateEventListeners(ws);
		}
	}, [notes]);

	const buildConnection = () => {
		const webSocket = new WebsocketBuilder("ws://" + document.location.hostname + ":" + document.location.port + "/socket/test")
			.onOpen((i, e) => { i.send(JSON.stringify({ "token": user.token, "action": "GET_NOTES" })) })
			.onClose(buildConnection)
			.onError((i, e) => { console.log("error") })
			.onMessage(messageEventListener)
			.onRetry((i, e) => { console.log("retry") })
			.build();
		setWs(webSocket);
	}

	const updateEventListeners = (ws: Websocket) => {
		ws.removeEventListener(WebsocketEvents.message, messageEventListener);
		ws.addEventListener(WebsocketEvents.message, messageEventListener);
	}

	const messageEventListener = (i: Websocket, e: MessageEvent) => {
		e.preventDefault();
		console.log("Message:", e.data)
		const message = JSON.parse(e.data);
		switch (message.action) {
			case 'NOTES':
				setNotes(message.notes);
				break;
			case 'NOTE':
				const newNotes = notes.concat([message.note])
				newNotes.sort((a, b) => (a.orderno > b.orderno) ? -1 : 1)
				setNotes(newNotes);
				break;
			default:
				console.log(`Unregonized action: ${message.action}.`);
		}
	}


	return (
		<div style={{ "margin": "10px auto", "maxWidth": "800px", "width": "fit-content" }}>
			<Accordion children={<CreateNoteForm token={user.token} ws={ws} />} header="Create new note"/>
			<ol style={{ "listStyle": "none" }}>
				{notes.map((note: Note) =>
					<li key={note.id}>
						<div className="card" style={{"width": "calc(100% - 12px)"}}>
							<div className="header" style={{ "textAlign": "left" }}>
								<Moment format="YYYY-MM-DD HH:mm" date={note.modified} /> <label>{note.modifier.name}</label>
							</div>
							<div className="content">
								<span style={{"whiteSpace": "pre-wrap"}}>{note.content}</span>
							</div>
						</div>
					</li>
				)}
			</ol>
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	return { user: state.user };
};
const mapDispatchToProps = {};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default ConnectedNotes;
