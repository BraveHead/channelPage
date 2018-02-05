//渠道
var inviteuserid = '';
var cr = '';
var imgKey = '';
// var appLink = 'https://test.qtz360.com/api1.1.0/rest/?sn=';  测试
var appLink = 'https://www.qtz360.com/ch/?sn=';   //正式
//接口
// var ajaxUrl = 'https://test.qtz360.com/api1.1.0/rest/';  //测试
var ajaxUrl = window.commonRequestPrefix;  //正式

window.onload = init;
function init() {
    if (!IsPC()) {
        if (window.location.href.indexOf('sn=') === -1 && window.location.href.indexOf('tg=') === -1) {
            window.location.href = 'https://www.qtz360.com/ch/';
        }else if(window.location.href.indexOf('tg=') !== -1) {
            window.location.href = 'https://www.qtz360.com/ch/?tg=' + window.location.href.slice(window.location.href.indexOf('tg=') + 3);
        }else{
            window.location.href = appLink + window.location.href.slice(window.location.href.indexOf('sn=') + 3);
        }
    }else{
        IsPC();
        friendShowHide();
        // document.getElementById('submit-pic-code').addEventListener('click', queryPhone);
        document.getElementById('get-code').addEventListener('click', queryPhone);

    }
}

//是否为pc端入口 返回 true false
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//phone 格式验证
function phoneValidate() {
    var phone = document.getElementById('phone');
    var reg = /^1[3456789]\d{9}$/;
    if (reg.test(phone.value)) {
        if (IsPC()) {
            document.getElementById('phone-error').innerHTML = '';
        }
        return true;
    } else if (IsPC()) {
        document.getElementById('phone-error').innerHTML = '*请输入正确的手机号码';
        return false;
    } else {
        errorToast('*请输入正确的手机号码');
        return false;
    }
}

//code 格式验证
function codeValidate() {
    var code = document.getElementById('code');
    var reg = /^[0-9]{6}$/;
    if (reg.test(code.value)) {
        if (IsPC()) {
            document.getElementById('code-error').innerHTML = '';
        }
        return true;
    } else if (IsPC()) {
        document.getElementById('code-error').innerHTML = '*请输入正确的验证码';
        return false;
    } else {
        errorToast('*请输入正确的验证码');
        return false;
    }
}

//password 格式验证
function passwordValidate() {
    var password = document.getElementById('password').value;
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(password)) {
        if (IsPC()) {
            document.getElementById('password-error').innerHTML = '*请输入8至20位数字和字母组合';
        } else {
            errorToast('*请输入8至20位数字和字母组合');
        }
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(password)) {
        if (IsPC()) {
            document.getElementById('password-error').innerHTML = '';
        }
        return true;
    } else {
        if (IsPC()) {
            document.getElementById('password-error').innerHTML = '*请输入8至20位数字和字母组合';
        } else {
            errorToast('*请输入8至20位数字和字母组合');
        }
        return false;
    }
}

//mobile error toast
function errorToast(text) {
    var html = '<div class="error-toast" id="error-toast"><span>' + text + '</span></div>';
    if (document.getElementById('error-toast')) {
        document.body.removeChild(document.getElementById('error-toast'));
        document.body.insertAdjacentHTML('afterBegin', html);
    } else {
        document.body.insertAdjacentHTML('afterBegin', html);
        setTimeout(function () {
            document.body.removeChild(document.getElementById('error-toast'));
        }, 1000);
    }
}

//phone code输入
function setPhoneCode(dom) {
    dom.value = dom.value.replace(/[^\d]/g, '');
    switch (dom.id) {
        case 'phone':
            if (dom.value.length > 11) {
                dom.value = dom.value.slice(0, 11);
            }
            clearHideShowImg(dom);
            break;
        case 'code':
            if (dom.value.length > 6) {
                dom.value = dom.value.slice(0, 6);
            }
            break;
    }
}

//隐藏显示 clear show hide 图片
function clearHideShowImg(dom) {
    switch (dom.id) {
        case 'phone':
            if (dom.value != '') {
                document.getElementById('clear-phone').style.display = 'block';
            } else {
                document.getElementById('clear-phone').style.display = 'none';
            }
            break;
        case 'password':
            if (dom.value != '') {
                document.getElementById('clear-password').style.display = 'block';
                document.getElementById('hide-show').style.display = 'block';
            } else {
                document.getElementById('clear-password').style.display = 'none';
                document.getElementById('hide-show').style.display = 'none';
            }
            break;
    }
}

//clear input value
function clearInputValue(dom) {
    switch (dom.id) {
        case 'clear-phone':
            document.getElementById('phone').value = '';
            clearHideShowImg(document.getElementById('phone'));
            break;
        case 'clear-password':
            document.getElementById('password').value = '';
            clearHideShowImg(document.getElementById('password'));
            break;
    }
}

//password hide show
function passwordToggleHideShow(dom) {
    var input = document.getElementById('password');
    switch (input.type) {
        case 'password':
            input.type = 'text';
            dom.src = 'assets/show.png';
            break;
        case 'text':
            input.type = 'password';
            dom.src = 'assets/hide.png';
            break;
    }
}

//验证手机号是否可以注册
function queryPhone() {
    var phone = document.getElementById('phone');
    var phoneError = document.getElementById('phone-error');
    var phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(phone.value)) {
        phoneValidate();
    } else {
        ajaxSubmit({
            type: 'GET',
            url: 'isPhoneUsed',
            data: {phoneReg: document.getElementById('phone').value, invitePhone: 'null'},
            success: function (data) {
                if (data.rcd === 'A0001') {
                    if (IsPC()) {
                        phoneError.innerHTML = data.rmg;
                        return false;
                    } else {
                        errorToast(data.rmg);
                        return false;
                    }
                } else if (data.rcd === 'A0002') {
                    if (IsPC()) {
                        phoneError.innerHTML = '';
                    }
                    //弹出弹框
                    alertPicCode();
                    return true;
                } else {
                    if (IsPC()) {
                        phoneError.innerHTML = data.rmg;
                        return false;
                    } else {
                        errorToast(data.rmg);
                        return false;
                    }
                }
            }
        })
    }
}

//点击获取验证码
function sendCode(phone) {
    var getCode = document.getElementById('get-code');
    var codeError = document.getElementById('code-error');
    var timer;
    var i = 60;
    ajaxSubmit({
        type: 'POST',
        url: 'sendPCode',
        data: {
            phoneReg: phone.value,
            imgKey: imgKey,
            imgCode: $('.input-pic-code').val(),
            source: 'pc',
        },
        success: function (data) {
            if (data.rcd === 'R0001') {
                if (IsPC()) {
                    codeError.innerHTML = data.rmg;
                    changeCodeText(i);
                    timer = setInterval(function () {
                        i--;
                        changeCodeText(i);
                    }, 1000);
                    $('.alert-pic-code').hide();
                } else {
                    errorToast(data.rmg);
                }
            } else {
                if (IsPC()) {
                    $('.pic-code-error').html(data.rmg);
                } else {
                    errorToast(data.rmg);
                }
            }
        }
    });

    //获取验证码文本修改
    function changeCodeText(time) {
        var t = time < 10 ? '0' + time : time;
        if (time > 0) {
            getCode.innerHTML = t + 's';
        } else {
            clearInterval(timer);
            getCode.innerHTML = '重新获取';
            // getCode.addEventListener('click', queryPhone);
        }
    }
}

//submit
function formSubmit() {
    if (!phoneValidate()) {
        phoneValidate();
    } else if (!codeValidate()) {
        codeValidate();
    } else if (!passwordValidate()) {
        passwordValidate();
    } else {
        var phone = document.getElementById('phone').value;
        var password = document.getElementById('password').value;
        var code = document.getElementById('code').value;
        var tgName = '';
        var tgvalue = '';
        if(window.location.href.indexOf('tg=')!==-1){
            tgName = 'user.organization';
            tgvalue = window.location.href.slice(window.location.href.indexOf('tg=')+3);
        }else{
            tgName = 'user.organization';
            tgvalue = '';
        }
        var dataObj =  {
            'user.phone': phone,
            'user.password': password,
            codeReg: code,
            inviteuserid: inviteuserid,
            cr: cr,
            invitePhone: 'null',
            sourceFrom: 1,
            im: 'pc',
            deviceName: 'Web版',
            deviceType: 3,
        };
        dataObj[tgName]= tgvalue;
        ajaxSubmit({
            type: 'POST',
            url: 'reg',
            data: IsPC() ?
                dataObj
                : {
                    'user.phone': phone,
                    'user.password': password,
                    codeReg: code,
                    inviteuserid: inviteuserid,
                    cr: cr,
                    invitePhone: 'null',
                    sourceFrom: 2,
                    im: 'pc',
                    deviceName: 'Web版',
                    deviceType: 3,
                },
            success: function (data) {
                if (data.rcd === 'R0001') {
                    window.location.href = 'https://www.qtz360.com/user/login.do';
                } else {
                    if (IsPC()) {
                        if (data.rcd === 'M0008_1') {
                            $('#code-error').html(data.rmg);
                        } else if (data.rcd === 'M0008_4') {
                            $('#password-error').html(data.rmg);
                        }
                    } else {
                        errorToast(data.rmg);
                    }
                }
            }
        });
    }
}

//ajax
function ajaxSubmit(obj_) {
//传入数据为对象
    var obj = obj_ || {};
    //访问类型 get post
    var type = obj.type.toUpperCase() || 'POST';
    //访问地址
    var url = ajaxUrl + obj.url || '';
    //需要传递的参数
    var setData = obj.data || null;
    //请求完成回调函数
    var complete = obj.complete || function () {
    };
    //请求成功回调函数
    var success = obj.success || function () {
    };
    //请求失败回调函数
    var error = obj.error || function () {
    };

    //序列化传递的参数
    var data = [];
    for (var key in setData) {
        data.push(key + '=' + setData[key]);
    }
    data = data.join('&');

    //创建ajax对象
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            complete();
            if (xmlhttp.status == 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
                var text = JSON.parse(xmlhttp.responseText);
                success(text);
            } else {
                error();
            }
        }
    };
    //get方法
    if (type === 'GET') {
        xmlhttp.open(type, data ? url + '?' + data : url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.send();
    } else if (type === 'POST') { //post方法
        xmlhttp.open(type, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.send(data ? data : null);
    }
}

//是否显示邀请人 以及 邀请人手机号码
function friendShowHide() {
    var url = window.location.href.slice(window.location.href.indexOf('sn=') + 3);
    if (window.location.href.indexOf('sn=') != '-1') {
        ajaxSubmit({
            type: 'GET',
            url: 'channel/' + url,
            // url: ajax + 'channel/7016451',
            success: function (data) {
                if (data.rcd === 'R0001') {
                    inviteuserid = data.id;
                    cr = data.cookie;
                }
            },
        })
    }
}

//图片放大
var hoverPic = $('.photo-wall img');
var number = 0;

function imgHover(index) {
    hoverPic.removeClass('hover').eq(index).addClass('hover');
}

imgHover(number);
setInterval(function () {
    number++;
    if (number > hoverPic.length - 1) {
        number = 0;
    }
    imgHover(number);
}, 1900);

//弹出图形验证码弹框
function alertPicCode() {
    $('body').css('overflow', 'hidden');
    $('.alert-pic-code').show().css({
        width: '100%',
        height: document.documentElement.clientHeight + 'px',
        backgroundColor: 'rgba(0,0,0,0.5)',
    });
    imgKey = Math.random().toFixed(6) * 1000000 + 1;
    $('.input-pic-code').val('');
    loadPicCode(imgKey);
    clickChangePicCode();   //点击切换验证码
    var phone = document.getElementById('phone');
    $('.submit-pic-code').on('click', function () {
        sendCode(phone);
        $('body').css('overflow', 'scroll');
    });
    $('.close').on('click', function () {
        $('.alert-pic-code').hide();
        $('body').css('overflow', 'scroll');
    })
}

//加载验证码
function loadPicCode(key) {
    $.get(ajaxUrl + 'CodeOnle?imgKey=' + imgKey, {'imgKey': key}).done(function (res) {
        $('.pic-code').attr('src', ajaxUrl + 'CodeOnle?imgKey=' + key);
    })
}

//点击切换图形验证码
function clickChangePicCode() {
    $('.pic-code').on('click', function () {
        imgKey = Math.random().toFixed(6) * 1000000 + 1;
        loadPicCode(imgKey);
    })
}

