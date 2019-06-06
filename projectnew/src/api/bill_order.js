const bill_order = (id_bill) => {
    const url = `http://192.168.100.6/react-native/app/bill_detail_product.php?id_bill=${id_bill}`;
    return fetch(url)
        .then(res => res.json());
};

export default bill_order;
