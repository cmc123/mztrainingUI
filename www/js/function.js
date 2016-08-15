/**
 * Training Project
 * (c) 2015 美众信息  http://mezeron.cn
 * @description
 * Global function Definition
 * @author Neo 2016/7/18
 */

'use strict'

//信息提示函数
function showAlert(title, message) {
    if (deviceInfo.isDevice) {
        window.plugins.toast.showShortCenter(message);
    } else {
        ons.notification.alert({
            message: message,
            title: title,
            buttonLabel: '确定',
            animation: 'default'
        });
    }
}

//判断当前字符串是否为空
function isEmpty(v) {
    switch (typeof v) {
        case 'undefined' :
            return true;
        case 'string' :
            if (v.trim().length === 0)
                return true;
            break;
        case 'object' :
            if (null === v)
            {
                return true;
            }
            else if (Object.keys(v).length === 0)
            {
                return true;
            }
            else if (undefined !== v.length && v.length === 0)
            {
                return true;
            }
            else {
                return false;
            }
            break;
    }
    return false;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
