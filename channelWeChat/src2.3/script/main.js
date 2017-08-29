import './lib/autoSetRem'
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
        checkPicCode: '请输入正确的图形验证码',
        getCheckWordButton: '获取验证码',
        phoneNumber: '',     //手机号码
        phoneNumShow: false,   //号码弹框提醒判断
        passwordText: '',    //密码
        passwordShow: false,  //密码弹框提醒判断
        picCodeText: '',   //图形验证码
        picCodeTitle: false,  //图形验证码弹框提醒
        checkNumberText: '',     //验证码
        checkShow: false,   //验证码弹框提醒判断
        isClick: false,  //点击在验证码
        isDuable: false,  //多次点击验证码
        clickColor: '#ffc000',   //点击按钮的颜色,
        baseUrl: 'https://www.qtz360.com/api2.2.2/rest/',   //正式url根路径
        // baseUrl: 'https://test.qtz360.com/api/rest/',  //url测试
        phoneDisplay: 'none',
        checkDisplay: 'none',
        sn: 5767302,  //渠道码
        // sn:6431961,  //测试渠道码
        channelId: '',  //渠道id
        channelCookie: '',  //渠道cookie
        timeStamp : ''
    },
    mounted: function () {
        // this.$nextTick(function () {
        //     this.submitClick();
        // })
    },
    created: function () {

    },
    methods: {
        //首页红包按钮的点击页面上弹的判断
        buttonClick: function () {
            this.button = true;
            setTimeout(() => {
                this.isUp = true;
                document.querySelector('body').style.height = '100%';
                document.querySelector('body').style.overflowY = 'scroll';
                document.querySelector('body').style.position = 'relative'
            }, 1100);
            _czc.push(﻿["_trackEvent",'page2','点击','page2']);
            _czc.push(﻿["_trackEvent",'page1_button','点击','首页按钮']);
        },
        //图形验证码点击切换
        changePicCodeFun: function () {
            this.timeStamp = Math.random().toFixed(6)*1000000+1;
            this.loadPicCode();   //冲新加载图形验证码
        },
        //手机号码格式验证
        checkPhone: function (text) {
            let filter = /^1[3456789]\d{9}$/;
            if((filter.test(text))) {
                this.phoneNumShow = false;
            }
            _czc.push(﻿["_trackEvent",'phone','点击','手机号']);
            return (/^1[34578]\d{9}$/.test(text));
        },
        //8-20位数字和字母的密码格式验证
        checkPassword: function (text) {
            let filter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if(filter.test(text)){
                this.passwordShow = false;
            }
            _czc.push(﻿["_trackEvent",'password','点击','密码']);
            return (filter.test(text));
        },
        //6位验证码的格式验证
        checkWord: function (text) {
            let filter = (/^\d{6}$/);
            if(filter.test(text)){
                this.checkShow = false;
            }
            _czc.push(﻿["_trackEvent",'verification code','点击','输入验证码']);
            return filter.test(text);
        },
        //初始化加载图片验证码
        loadPicCode: function () {
            this.timestamp = Math.random().toFixed(6)*1000000+1;
            this.$http.get( this.baseUrl + 'CodeOnle?imgKey=' + this.timestamp, {'imgKey': this.timestamp}).then((res)=>{
                $('.picCode').attr('src',this.baseUrl + 'CodeOnle?imgKey=' + this.timestamp);
                // console.log(this.timeStamp);
            });
        },
        //获取验证码后样式改变
        checkWordChange: function () {
            if(!this.isClick){
                let i = 60;
                this.Duable = true;
                let id= setInterval(()=>{
                    this.clickColor = '#adadad';
                    this.isClick = true;
                    i--;
                    this.getCheckWordButton = i + 's';
                    if(i <= 0){
                        i = 0;
                        this.clickColor = '#ffc000';
                        this.isClick = false;
                        this.getCheckWordButton = '再次获取';
                        this.Duable = false;
                        clearInterval(id);
                        this.loadPicCode();  //60s之后重新加载图片验证码   图片验证码接口在验证正确后会自动清除当前缓存的图片验证码
                    }
                    // console.log(this.isClick, '样式改变中..');
                },1000)
            }
        },
        //注册按钮点击事件
        submitClick: function () {
            //输入手机号码
            if (!this.checkPhone(this.phoneNumber) || this.phoneNumber !== '') {
                this.phoneNumShow = true;
                setTimeout(() => {
                    this.phoneNumShow = false;
                }, 1000)
            }
            //输入密码
            if (!this.checkPassword(this.passwordText) || this.passwordText !== ''){
                this.passwordShow = true;
                setTimeout(() => {
                    this.passwordShow = false;
                }, 1200)
            }
            //输入验证码
            if (!this.checkWord(this.checkNumberText) || this.checkNumberText !== ''){
                this.checkShow = true;
                setTimeout(() => {
                    this.checkShow = false;
                }, 1400)
            }
            //输入校验全部正确,点击提交
            if(this.checkPhone(this.phoneNumber) && this.checkPassword(this.passwordText) && this.checkWord(this.checkNumberText)){
                this.getChannelMessage();
            }
            //没有输入点击
            if(this.phoneNumber === '' && this.passwordText === '' && this.checkNumberText === ''){
                this.checkShow = true;
                this.phoneNumShow = true;
                this.passwordShow = true;
                setTimeout(()=>{
                    this.phoneNumShow = false;
                    setTimeout(()=>{
                        this.passwordShow = false;
                        setTimeout(()=>{
                            this.checkShow = false;
                        }, 200)
                    },200)
                },1000)
            }
            _czc.push(﻿["_trackEvent",'register','点击','注册']);
        },
        //验证手机号是否注册
        isPhoneExistence: function () {
            if(this.checkPhone(this.phoneNumber) && !this.Duable){
                let _this = this;
                this.$http.get(this.baseUrl+'isPhoneUsed',{phoneReg:this.phoneNumber})
                    .then(function (res) {
                        if(res.data.rcd === 'A0001' || res.data.rcd === 'M0008_23'){
                            _this.phoneTitle = '手机号已注册！';
                            _this.phoneNumShow = true;
                            _this.phoneDisplay = 'block';
                            setTimeout(()=>{
                                _this.phoneNumShow = false;
                                _this.phoneDisplay = "none";
                                _this.phoneTitle = '请输入正确的手机格式';
                            },1000);
                        }else if(res.data.rcd === 'A0002' && _this.checkPhone(_this.phoneNumber)){
                            //获取验证码
                            _this.isDuable = true;
                            _this.getPhoneCheckCode();
                        }
                    })
            }else{
                this.phoneNumShow = true;
                setTimeout(()=>{
                    this.phoneNumShow = false;
                },1000)
            }

            _czc.push(﻿["_trackEvent",'words','点击','验证码']);
        },
        //获取验证码
        getPhoneCheckCode: function () {
            let _this = this;
            // console.log(this.isClick+ '获取验证码之前判断');
            if(!_this.isClick){   //防止多次点击
                _this.$http.get(_this.baseUrl + 'sendPCode',{
                    phoneReg : _this.phoneNumber,
                    imgKey: _this.timestamp,
                    imgCode: _this.picCodeText,
                    source: 'pc'
                })
                    .then(function (res) {
                        if(res.data.rcd === 'R0001' || res.data.rcd === 'M0008_23'){
                            _this.checkWordChange();
                        }
                        if(res.data.rcd === 'M0008_24' || res.data.rcd === 'M0008_25'){
                            this.picCodeTitle = true;
                            setTimeout(()=>{
                                this.picCodeTitle = false;
                            }, 1000)
                            // alert('图形验证码不正确！');
                        }
                    })
            }
        },
        //获取渠道分享人的信息
        getChannelMessage: function () {
            this.$http.get(this.baseUrl + 'channel/'+ this.sn)
                .then(function (res) {
                    if(res.data.rcd === 'R0001'){
                        this.channelId = res.data.id;
                        this.channelCookie = res.data.cookie;
                        this.register();   //注册
                    }else{
                        // console.log('渠道获取成功'+ res.data.rmg);
                    }
                }).catch(function (res) {
            })
        },
        //注册
        register: function () {
            this.$http.post(this.baseUrl + 'reg', {
                'user.phone': this.phoneNumber,
                'user.password': this.passwordText,
                codeReg: this.checkNumberText,
                inviteuserid: this.channelId,
                cr: this.channelCookie,
                invitePhone: 'null',
                sourceFrom: 2
            }).then(function (res) {
                switch (res.data.rcd){
                    case 'R0001':
                        window.location.href = "https://www.qtz360.com/ch/918-wx/getRed.html";
                        break;
                    case 'M0008_2':
                        this.phoneDisplay = 'block';
                        this.phoneTitle = '手机号已注册！';
                        setTimeout(()=>{
                            this.phoneDisplay = 'none';
                            this.phoneTitle = '请输入正确的手机格式！';
                        },1000);
                        break;
                    default   :
                        //验证码错误
                        this.checkDisplay = 'block';
                        setTimeout(()=>{
                            this.checkDisplay = 'none';
                        },1000);
                        break;
                }
            }).catch(function (res) {
                alert(res + '请求失败');
            })
        },
        serviceAgreement: function () {
            _czc.push(﻿["_trackEvent",'agreement','点击','协议']);
        },
        login: function () {
            _czc.push(﻿["_trackEvent",'login','点击','登录']);
        }
    }
});

Vue.nextTick(function () {
    loadingPage.loadPicCode();
    loadingPage.submitClick();
});
