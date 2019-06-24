import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
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
            Alert.alert(
                'Notification',
                'Please login to chat!',
                [
                    { text: 'OK' },
                ],
            );
        }
        BackEnd.closeChat();
    }
}

export default Message;