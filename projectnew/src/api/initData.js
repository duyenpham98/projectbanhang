const initData = () => (
    fetch('http://192.168.100.6/react-native/app/')// eslint-disable-line
        .then(res => res.json())
);

export default initData;
