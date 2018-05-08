let utilites = (function(){
    let formatDate = function (date) {

        let dd = date.getDate();
        if (dd < 10) {
            dd = `0${dd}`;
        }

        let mm = date.getMonth() + 1;
        if (mm < 10) {
            mm = `0${mm}`;
        }

        let yy = date.getFullYear();
        if (yy < 10) {
            yy = `0${yy}`;
        }

        return dd + '.' + mm + '.' + yy;
    };

    let parseDate = function(key, value) {
        if (key === 'createdAt' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    };

    return {
        formatDate,
        parseDate
    }
}());