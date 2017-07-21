
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
        phoneNumber: '',     //手机号码
        phoneNumShow: false,   //号码弹框提醒判断
        passwordText: '',    //密码
        passwordShow: false,  //密码弹框提醒判断
        checkNumberText: '',     //验证码
        checkShow: false,   //验证码弹框提醒判断
        isClick: false,  //防止获取验证码按钮多次点击
        clickColor: '#ffc000',   //点击按钮的颜色,
        baseUrl: 'https://test.qtz360.com/api/rest/',   //url根路径
        phoneDisplay: 'none',
        checkDisplay: 'none',
        // sn: window.location.href.slice(window.location.href.indexOf('sn=') + 3),
        sn: '2152121',  //渠道码
        channelId: '',  //渠道id
        channelCookie: ''  //渠道cookie

    },
    mounted: function () {
        this.$nextTick(function () {
            this.submitClick();
        })
    },
    created: function () {

    },
    methods: {
        //首页红包按钮的点击页面上弹的判断
        buttonClick: function () {
            this.button = true;
            document.querySelector('body').style.overflow = 'scroll';
            setTimeout(() => {
                this.isUp = true;
            }, 1100);
        },
        //手机号码格式验证
        checkPhone: function (text) {
            let filter = /^1[3456789]\d{9}$/;
            if((filter.test(text))) {
                this.phoneNumShow = false;
            }
            return (/^1[34578]\d{9}$/.test(text));
        },
        //8-20位数字和字母的密码格式验证
        checkPassword: function (text) {
            let filter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if(filter.test(text)){
                this.passwordShow = false;
            }
            return (filter.test(text));
        },
        //6位验证码的格式验证
        checkWord: function (text) {
            let filter = (/^\d{6}$/);
            if(filter.test(text)){
                this.checkShow = false;
            }
            return filter.test(text);
        },
        //获取验证码后样式改变
        checkWordChange: function () {
            if(!this.isClick){
                let i = 10;
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
                        clearInterval(id);
                    }
                },1000)
            }
        },
        //注册按钮点击事件
        submitClick: function () {
            //输入手机号码
            if (!this.checkPhone(this.phoneNumber) && this.phoneNumber !== '') {
                this.phoneNumShow = true;
                setTimeout(() => {
                    this.phoneNumShow = false;
                }, 1000)
            }
            //输入密码
            if (!this.checkPassword(this.passwordText) && this.passwordText !== ''){
                this.passwordShow = true;
                setTimeout(() => {
                    this.passwordShow = false;
                }, 1200)
            }
            //输入验证码
            if (!this.checkWord(this.checkNumberText) && this.checkNumberText !== ''){
                this.checkShow = true;
                setTimeout(() => {
                    this.checkShow = false;
                }, 1400)
            }
            //输入校验全部正确,点击提交
            if(this.checkPhone(this.phoneNumber) && this.checkPassword(this.passwordText) && this.checkWord(this.checkNumberText)){
                // window.location.href = '/getRed.html';
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
        },
        //验证手机号是否注册
        isPhoneExistence: function () {
            if(this.checkPhone(this.phoneNumber)){
                let _this = this;
                this.$http.get(this.baseUrl+'isPhoneUsed',{phoneReg:this.phoneNumber})
                    .then(function (res) {
                        if(res.data.rcd === 'A0001' || res.data.rcd === 'M0008_23'){
                            _this.phoneTitle = '手机号已注册！';
                            _this.phoneNumShow = true;
                            _this.phoneDisplay = 'block';
                            console.log('已注册！');
                            setTimeout(()=>{
                                _this.phoneNumShow = false;
                                _this.phoneDisplay = "none";
                                _this.phoneTitle = '请输入正确的手机格式';
                            },1000);
                        }else if(res.data.rcd === 'A0002' && _this.checkPhone(_this.phoneNumber)){
                            //获取验证码
                            _this.getPhoneCheckCode();
                            console.log('验证码发送成功');
                        }
                    })
            }else{
                this.phoneNumShow = true;
                setTimeout(()=>{
                    this.phoneNumShow = false;
                },1000)
            }
        },
        //获取验证码
        getPhoneCheckCode: function () {
            if(!this.isClick){   //防止多次点击
                this.$http.get(this.baseUrl + 'sendPCode',{phoneReg: this.phoneNumber})
                    .then(function (res) {
                        console.log(res.data);
                        if(res.data.rcd === 'R0001' || res.data.rcd === 'M0008_23'){
                            this.checkWordChange();
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
                        console.log('渠道获取成功'+ res.data.rmg);
                    }
                }).catch(function (res) {
                    console.log(res);
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
                if(res.data.rcd === 'R0001'){
                    window.location.href = "getRed.html";
                }else if(res.data.rcd === 'M0008_1'){
                    this.checkDisplay = 'block';
                    setTimeout(()=>{
                        this.checkDisplay = 'none';
                    },1000)
                }
                else{
                    this.phoneDisplay = 'block';
                    this.phoneTitle = '手机号已注册！';
                    setTimeout(()=>{
                        this.phoneDisplay = 'none';
                        this.phoneTitle = '请输入正确的手机格式！'
                    },1000)
                }
            }).catch(function (res) {
                alert(res + '请求失败');
            })
        }

    }
});

