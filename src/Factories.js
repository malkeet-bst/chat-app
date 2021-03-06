const uuidv4 = require("uuid/v4");

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object} 
*		name {string}
*/
const createUser = ({
  name = "",
  number = "",
  socketId = null,
  otp = "",
  online=false,
  imgUrl = "",
  chatId=""
} = {}) => ({
  id: chatId|| uuidv4(),
  name,
  number,
  socketId,
  online,
  otp,
  imgUrl
});

/*
*	createMessage
*	Creates a messages object.
* 	@prop id {string}
* 	@prop time {Date} the time in 24hr format i.e. 14:22
* 	@prop message {string} actual string message
* 	@prop sender {string} sender of the message
*	@param {object} 
*		message {string}
*		sender {string}
*/
const createMessage = ({ message = "", sender = "", id="" } = {}) => ({
  //id: uuidv4(),
  time: getTime(new Date(Date.now() + 19800000)),
  message,
  sender
});

/*
*	createChat
*	Creates a Chat object
* 	@prop id {string}
* 	@prop name {string}
* 	@prop messages {Array.Message}
* 	@prop users {Array.string}
*		@prop typingUsers {Array.string}
*		@prop isCommunity {boolean}
*	@param {object} 
*		messages {Array.Message}
*		name {string}
*		users {Array.string}
* 
*/
const createChat = ({
  messages = [],
  name = "Community",
  users = [],
  id="",
  email='',
  online=false,
  friendRequest='',
  isCommunity = false,
} = {}) => ({
  id: id || uuidv4(),
  name: name ? name : createChatNameFromUsers(users),
  messages,
  email,
  online,
  friendRequest,
  users,
  typingUsers: [],
  isCommunity
});

/*
* createChatNameFromUsers
* @param users {Array.string} 
* @param excludedUser {string} user to exclude from list of names
* @return {string} users names concatenated by a '&' or "Empty Chat" if no users
*/
const createChatNameFromUsers = (users, excludedUser = "") => {
  //console.log({users}, {excludedUser})
  let uniqueArray=[]
  if(!users){
    return excludedUser
  }
  uniqueArray = users.filter(function(item, pos) {
    return users.indexOf(item) == pos;
})
  return uniqueArray.filter(u => u !== excludedUser).join(" & ") || "Empty Chat";
};

/*
*	@param date {Date}
*	@return a string represented in 24hr time i.e. '11:30', '19:30'
*/
const getTime = date => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createChat,
  createUser,
  createChatNameFromUsers
};
