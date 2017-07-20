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
        clickColor: '#ffc000'   //点击按钮的颜色
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
            let filter = /^1[34578]\d{9}$/;
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

        //获取验证码
        getCheckWord: function () {
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
            if (!this.checkPhone(this.phoneNumber) && this.phoneNumber !== '') {
                this.phoneNumShow = true;
                setTimeout(() => {
                    this.phoneNumShow = false;
                }, 1000)
            }
            if (!this.checkPassword(this.passwordText) && this.passwordText !== ''){
                this.passwordShow = true;
                setTimeout(() => {
                    this.passwordShow = false;
                }, 1200)
            }
            if (!this.checkWord(this.checkNumberText) && this.checkNumberText !== ''){
                this.checkShow = true;
                setTimeout(() => {
                    this.checkShow = false;
                }, 1400)
            }
        }
    }
});

