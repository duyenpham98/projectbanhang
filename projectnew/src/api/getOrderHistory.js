const getOrderHistory = (token) => (
    fetch('http://192.168.100.8/react-native/app/order_history.php',
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

module.exports = getOrderHistory;
