import React, { Component } from 'react';
import Request from '../common/Request'
import { UPDATE_FRIEND_LIST } from '../../Events'
const uuidv4 = require('uuid/v4')


export default class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		}
		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollDown() {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}
	componentDidMount = () => {
	//	this.setClickEvent()
	}
	setClickEvent = () => {
		document.addEventListener('click', (event) => {
			var iconContainer = document.getElementsByClassName('openOverlay')
			if (iconContainer.length != 0) {
				var isclickIconArray = []
				for (var index = 0; index < iconContainer.length; index++) {
					isclickIconArray.push(iconContainer[index].contains(event.target));
				}

				var listItems = document.getElementById('listItems');
				if (!isclickIconArray.includes(true) && this.state.isOpen && listItems) {
					var isClickInside = listItems.contains(event.target);

					if (!isClickInside) {
						//the click was outside the listItems, do something
						this.setState({ isOpen: false });
					}
				}
			}
		});
	}
	componentDidMount() {
		this.scrollDown()
	}
	toggleOverlay = (e) => {
		//this.setClickEvent()
		this.setState({ isOpen: !this.state.isOpen });
		e.stopPropagation()
		e.preventDefault();
	}
	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	requestAccepted = () => {
		console.log('accepted')
		const { socket, user, activeChat } = this.props
		socket.emit(UPDATE_FRIEND_LIST, user.name, activeChat.name, this.props.resetChat)
		//this.props.setActiveChat(activeChat)
	}


	render() {
		const { activeChat, user, typingUsers, socket } = this.props
		let messages = []
		messages = activeChat.messages
		return <div ref="container" className="thread-container">
			<div className="thread">
				{activeChat.friendRequest == "receiver" ? <Request user={user} requestAccepted={this.requestAccepted} handler={this.props.handler} activeChat={activeChat} socket={socket} sender={true} /> : ""}
				{activeChat.friendRequest == "sender" ? <Request user={user} handler={this.props.handler} activeChat={activeChat} socket={socket} sender={false} /> : ""}
				{user && messages && (activeChat.friendRequest == true || !activeChat.friendRequest) && messages.map(
					mes => {
						return (
							<div
								key={uuidv4()}
								className={`message-container ${mes.sender ===
									user.name && "right"} ${mes.sender !== user.name &&
									"left"}`}
							>

								<div className="data">


									<div className="message">
										{mes.replyTo ? <div className="replyToMsg">{mes.replyTo}</div> : ''}
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>{mes.message}
											<div className="time">{mes.time}</div>
											{/* <div className="openOverlay">
												<a href="#">
													<span className="cust-icon glyphicon glyphicon-chevron-down" onClick={(e) => this.toggleOverlay(e)}></span>
												</a>
											</div> */}
										</div>
										{/* {this.state.isOpen
										? <ul id="listItems" className="chat-list-items">
											<li className="list-item" onClick={(e) => this.clearChat()}>Clear chat</li>
											{/* <li className="list-item" onClick={(e) => this.deleteChat()}>Delete chat</li> 
										</ul> : ''
									} */}
									</div>
									
									{activeChat.isCommunity ? (
										<div className="name">{mes.sender}</div>
									) : (
											""
										)}
								</div>
							</div>
						);
					}
				)}
				{typingUsers && typingUsers.map(name => {
					return <div key={uuidv4()} className="typing-user">
						{`${name} is typing . . .`}
					</div>;
				})}
			</div>
		</div>;
	}
}
