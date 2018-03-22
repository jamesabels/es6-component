const Util = {
    deepObjectCompare: function (a, b) {
        let aKeys = Object.keys(a);
        let bKeys = Object.keys(b);
        
        aKeys.forEach(aKey => {
            bKeys.forEach(bKey => {
                if (a[aKey] === b[bKey]) {
                    return true;
                } else {
                    return false;
                }
            })
        });
    }
};

export default Util;