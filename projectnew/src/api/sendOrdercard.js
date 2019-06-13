const sendOrdercard = (token, arrayDetail) => {
    const data = { token, arrayDetail };
    console.log(data);
    return fetch('http://192.168.100.8/react-native/app/cartbycar.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
};

module.exports = sendOrdercard;
