import firebase from 'firebase';
class BackEnd {
    uid = '';
    messagesRef = null;
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDZBwq1Wa10Z1aVcty2yUc5NBvtDkHV3QE",
            authDomain: "banhang-1557992514240.firebaseapp.com",
            databaseURL: "https://banhang-1557992514240.firebaseio.com",
            storageBucket: "banhang-1557992514240.appspot.com",
            messagingSenderId: "731795877247",
        });
        firebase.auth().onAuthStateChanged((user) => 
        {
            if(user){
                this.setUid(user.uid);
            } else
            {
                firebase.auth().signInAnonymously().catch((error)=>
                {
                    console.log(error.message);
                });
            }
        });
    }

    setUid(value){
        this.uid = value;
    }

    getUid(){
        return this.uid;
    }

    loadMessages(callback){
        this.messagesRef = firebase.database().ref('message');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }
    sendMessage(message) {
        for(let i =0 ; i < message.length ; i++){
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    closeChat(){
        if(this.messagesRef){
            this.messagesRef.off();
        }
    }
}

export default new BackEnd();