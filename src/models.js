const getDataLS = (key) => {
    const data = localStorage.getItem(key);

    if (data) {
        return JSON.parse(data);
    } else {
        return false;
    }
}

const sendDataLS = (key, stdData) => {
    const data = localStorage.getItem(key);

    let lsData;
    if (data) {
        lsData = JSON.parse(data);
    } else {
        lsData = [];
    }

    lsData.push(stdData);
    localStorage.setItem(key, JSON.stringify(lsData));
 }