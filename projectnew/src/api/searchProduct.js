const searchProduct = (key) => {
    const url = `http://192.168.100.8/react-native/app/search.php?key=${key}`;
    return fetch(url)
        .then(res => res.json());
};

export default searchProduct;