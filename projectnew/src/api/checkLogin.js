const checkLogin = (token) => (
    fetch('http://192.168.100.7/react-native/app/check_login.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ token })
        })
        .then(res => res.json())
);

module.exports = checkLogin;
