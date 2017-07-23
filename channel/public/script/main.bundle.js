/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _autoSetRem = __webpack_require__(1);

var _autoSetRem2 = _interopRequireDefault(_autoSetRem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _autoSetRem2.default)();
document.querySelector('a').style.display = 'none';
Vue.http.options.emulateJSON = true;
var loadingPage = new Vue({
    el: '#loading-page',
    data: {
        button: false,
        isUp: false,
        overflow: 'hidden',
        phoneTitle: '请输入正确的手机号',
        passwordTitle: '请输入正确格式的密码',
        checkWordTitle: '请输入正确的验证码',
        getCheckWordButton: '获取验证码',
        phoneNumber: '', //手机号码
        phoneNumShow: false, //号码弹框提醒判断
        passwordText: '', //密码
        passwordShow: false, //密码弹框提醒判断
        checkNumberText: '', //验证码
        checkShow: false, //验证码弹框提醒判断
        isClick: false, //防止获取验证码按钮多次点击
        clickColor: '#ffc000', //点击按钮的颜色,
        baseUrl: 'https://test.qtz360.com/api/rest/', //url根路径
        phoneDisplay: 'none',
        checkDisplay: 'none',
        // sn: window.location.href.slice(window.location.href.indexOf('sn=') + 3),
        sn: '2152121', //渠道码
        channelId: '', //渠道id
        channelCookie: '' //渠道cookie

    },
    mounted: function mounted() {
        this.$nextTick(function () {
            this.submitClick();
        });
    },
    created: function created() {},
    methods: {
        //首页红包按钮的点击页面上弹的判断
        buttonClick: function buttonClick() {
            var _this2 = this;

            this.button = true;
            document.querySelector('body').style.overflow = 'scroll';
            setTimeout(function () {
                _this2.isUp = true;
            }, 1100);
            _czc.push(["_trackEvent", 'page1_button', '点击', '首页按钮']);
        },
        //手机号码格式验证
        checkPhone: function checkPhone(text) {
            var filter = /^1[3456789]\d{9}$/;
            if (filter.test(text)) {
                this.phoneNumShow = false;
            }
            _czc.push(["_trackEvent", 'phone', '点击', '手机号']);
            return (/^1[34578]\d{9}$/.test(text)
            );
        },
        //8-20位数字和字母的密码格式验证
        checkPassword: function checkPassword(text) {
            var filter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if (filter.test(text)) {
                this.passwordShow = false;
            }
            _czc.push(["_trackEvent", 'password', '点击', '密码']);
            return filter.test(text);
        },
        //6位验证码的格式验证
        checkWord: function checkWord(text) {
            var filter = /^\d{6}$/;
            if (filter.test(text)) {
                this.checkShow = false;
            }
            _czc.push(["_trackEvent", 'verification code', '点击', '输入验证码']);
            return filter.test(text);
        },
        //获取验证码后样式改变
        checkWordChange: function checkWordChange() {
            var _this3 = this;

            if (!this.isClick) {
                var i = 10;
                var id = setInterval(function () {
                    _this3.clickColor = '#adadad';
                    _this3.isClick = true;
                    i--;
                    _this3.getCheckWordButton = i + 's';
                    if (i <= 0) {
                        i = 0;
                        _this3.clickColor = '#ffc000';
                        _this3.isClick = false;
                        _this3.getCheckWordButton = '再次获取';
                        clearInterval(id);
                    }
                }, 1000);
            }
        },
        //注册按钮点击事件
        submitClick: function submitClick() {
            var _this4 = this;

            //输入手机号码
            if (!this.checkPhone(this.phoneNumber) && this.phoneNumber !== '') {
                this.phoneNumShow = true;
                setTimeout(function () {
                    _this4.phoneNumShow = false;
                }, 1000);
            }
            //输入密码
            if (!this.checkPassword(this.passwordText) && this.passwordText !== '') {
                this.passwordShow = true;
                setTimeout(function () {
                    _this4.passwordShow = false;
                }, 1200);
            }
            //输入验证码
            if (!this.checkWord(this.checkNumberText) && this.checkNumberText !== '') {
                this.checkShow = true;
                setTimeout(function () {
                    _this4.checkShow = false;
                }, 1400);
            }
            //输入校验全部正确,点击提交
            if (this.checkPhone(this.phoneNumber) && this.checkPassword(this.passwordText) && this.checkWord(this.checkNumberText)) {
                // window.location.href = '/getRed.html';
                this.getChannelMessage();
            }
            //没有输入点击
            if (this.phoneNumber === '' && this.passwordText === '' && this.checkNumberText === '') {
                this.checkShow = true;
                this.phoneNumShow = true;
                this.passwordShow = true;
                setTimeout(function () {
                    _this4.phoneNumShow = false;
                    setTimeout(function () {
                        _this4.passwordShow = false;
                        setTimeout(function () {
                            _this4.checkShow = false;
                        }, 200);
                    }, 200);
                }, 1000);
            }
            _czc.push(["_trackEvent", 'register', '点击', '注册']);
        },
        //验证手机号是否注册
        isPhoneExistence: function isPhoneExistence() {
            var _this5 = this;

            if (this.checkPhone(this.phoneNumber)) {
                var _this = this;
                this.$http.get(this.baseUrl + 'isPhoneUsed', { phoneReg: this.phoneNumber }).then(function (res) {
                    if (res.data.rcd === 'A0001' || res.data.rcd === 'M0008_23') {
                        _this.phoneTitle = '手机号已注册！';
                        _this.phoneNumShow = true;
                        _this.phoneDisplay = 'block';
                        console.log('已注册！');
                        setTimeout(function () {
                            _this.phoneNumShow = false;
                            _this.phoneDisplay = "none";
                            _this.phoneTitle = '请输入正确的手机格式';
                        }, 1000);
                    } else if (res.data.rcd === 'A0002' && _this.checkPhone(_this.phoneNumber)) {
                        //获取验证码
                        _this.getPhoneCheckCode();
                        console.log('验证码发送成功');
                    }
                });
            } else {
                this.phoneNumShow = true;
                setTimeout(function () {
                    _this5.phoneNumShow = false;
                }, 1000);
            }

            _czc.push(["_trackEvent", 'words', '点击', '验证码']);
        },
        //获取验证码
        getPhoneCheckCode: function getPhoneCheckCode() {
            var _this = this;
            if (!_this.isClick) {
                //防止多次点击
                _this.$http.get(_this.baseUrl + 'sendPCode', { phoneReg: _this.phoneNumber }).then(function (res) {
                    console.log(res.data);
                    if (res.data.rcd === 'R0001' || res.data.rcd === 'M0008_23') {
                        _this.checkWordChange();
                    }
                });
            }
        },
        //获取渠道分享人的信息
        getChannelMessage: function getChannelMessage() {
            this.$http.get(this.baseUrl + 'channel/' + this.sn).then(function (res) {
                if (res.data.rcd === 'R0001') {
                    this.channelId = res.data.id;
                    this.channelCookie = res.data.cookie;
                    this.register(); //注册
                } else {
                    console.log('渠道获取成功' + res.data.rmg);
                }
            }).catch(function (res) {
                console.log(res);
            });
        },
        //注册
        register: function register() {
            this.$http.post(this.baseUrl + 'reg', {
                'user.phone': this.phoneNumber,
                'user.password': this.passwordText,
                codeReg: this.checkNumberText,
                inviteuserid: this.channelId,
                cr: this.channelCookie,
                invitePhone: 'null',
                sourceFrom: 2
            }).then(function (res) {
                var _this6 = this;

                switch (res.data.rcd) {
                    case 'R0001':
                        window.location.href = "getRed.html";
                        break;
                    case 'M0008_2':
                        this.phoneDisplay = 'block';
                        this.phoneTitle = '手机号已注册！';
                        setTimeout(function () {
                            _this6.phoneDisplay = 'none';
                            _this6.phoneTitle = '请输入正确的手机格式！';
                        }, 1000);
                        break;
                    default:
                        //验证码错误
                        this.checkDisplay = 'block';
                        setTimeout(function () {
                            _this6.checkDisplay = 'none';
                        }, 1000);
                        break;
                }
            }).catch(function (res) {
                alert(res + '请求失败');
            });
        },
        serviceAgreement: function serviceAgreement() {
            _czc.push(["_trackEvent", 'agreement', '点击', '协议']);
        },
        login: function login() {
            _czc.push(["_trackEvent", 'login', '点击', '登录']);
        }

    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.autoRem = autoRem;
/**
 * Created by Yy on 2017/7/10.
 */

function autoRem() {
    var autoSetRem = function (doc, win) {
        var docEl = doc.documentElement,
            done = false,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            set = function set(paper) {
            if (paper == null) {
                paper = 750;
            }
            var clientWidth = docEl.clientWidth || win.innerWidth || screen.width;
            if (clientWidth <= 320) {
                clientWidth = 320;
            }
            console.log(clientWidth);
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / paper) + 'px';
            console.log(100 * (clientWidth / paper) + 'px');
            done = true;
            return done;
        };
        return {
            set: set
        };
        //AbortifbrowserdoesnotsupportaddEventListener
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, set, false);
        doc.addEventListener('DOMContentLoaded', set, false);
    }(document, window);

    return autoSetRem.set(750);
}

/***/ })
/******/ ]);