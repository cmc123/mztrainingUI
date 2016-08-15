/**
 * @license Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Filters
 * @author Neo 2016/7/18
 */

app.filter("trPhoneHide", function(){
    return function(phone) {
        var result = "";
        if (!isEmpty(phone)) {
            var length = phone.length;
            if (length <= 4)
                result = phone;
            else if (length <= 8) {
                result = "****" + phone.substring(length-4);
            }
            else {
                result = phone.substring(0, length-8) + "****" + phone.substring(length-4);
            }
        }
        return result;
    };
});

app.filter("trAge", function(){
    return function(birthYear) {
        var result = "";
        if (!isEmpty(birthYear) && typeof(birthYear) == 'number' ) {
            var year = new Date().getFullYear();
            result = year - birthYear;
        }
        return result;
    };
});