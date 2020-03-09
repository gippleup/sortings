Array.prototype.popNth = function (index) {
    let result = this[index];
    this.splice(index, 1);
    return result;
}

Array.prototype.indexArr = function () {
    let result = []
    for (let i = 0; i < this.length; i++) {
        result.push(i);
    }
    return result;
}

Array.prototype.shuffle = function () {
    let indexArr = Array(this.length).indexArr();
    let result = [];
    while (indexArr.length > 0) {
        let randomNum = Math.floor(Math.random() * indexArr.length);
        let randomIndex = indexArr.popNth(randomNum);
        result.push(this[randomIndex])
    }
    return result;
}


Array.prototype.toNodes = function () {
    let fragment = document.createDocumentFragment();
    this.forEach ((ele) => {
        fragment.appendChild(document.importNode(ele, true));
    })
    return fragment;
}


NodeList.prototype.addEventListenerToAll = function (event, callback) {
    Array.prototype.forEach.call(this, (ele) => {
        ele.addEventListener(event, callback);
    })
}