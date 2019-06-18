const paycar = (token, cardnumber) => {
    const data = { token, cardnumber };
    console.log(data);
    return fetch('http://192.168.100.9/react-native/app/paycard.php',
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

module.exports = paycar;