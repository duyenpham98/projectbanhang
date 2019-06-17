import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import BackEnd from './BackEnd';
import {Alert} from 'react-native';

class Message extends React.Component {
    state = {
        messages: [],
    }

    componentWillMount() {
    }
    onSend(messages = []) {
        if (this.props.user != null) {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }))
        }
        else {
            Alert.alert(
                'Notification',
                'please login',
                [
                    { text: 'OK' },
                ],
            );
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => {
                    BackEnd.sendMessage(messages);
                }}
                user={{
                    _id: 1,
                    name: 'React Native',
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
        BackEnd.closeChat();
    }
}

export default Message;