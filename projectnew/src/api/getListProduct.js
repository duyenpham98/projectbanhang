const getListProduct = (idType) => {
    let url;
    if (idType !== 'COLLECTION') {
        url = `http://192.168.100.4/react-native/app/product_by_type.php?id_type=${idType}`;
    } else {
        url = `http://192.168.100.4/react-native/app/get_collection.php`;
    }
    return fetch(url)
    .then(res => res.json());
};

export default getListProduct;
