import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import BackEnd from './BackEnd';
class Message extends React.Component {
    state = {
        messages: [],
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => {
                    BackEnd.sendMessage(messages);
                }}
                user={{
                    _id: this.props.user.id,
                    name: this.props.user,
                }}

            />
        );
    }
    componentDidMount() {
        BackEnd.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
    }

    componentWillMount() {
        if(this.props.user == null){
            alert('Please login to chat');
        }
        BackEnd.closeChat();
    }
}

export default Message;