!function e(t,o,i){function n(c,s){if(!o[c]){if(!t[c]){var r="function"==typeof require&&require;if(!s&&r)return r(c,!0);if(h)return h(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var u=o[c]={exports:{}};t[c][0].call(u.exports,function(e){var o=t[c][1][e];return n(o||e)},u,u.exports,e,t,o,i)}return o[c].exports}for(var h="function"==typeof require&&require,c=0;c<i.length;c++)n(i[c]);return n}({1:[function(e,t,o){"use strict";Vue.http.options.emulateJSON=!0;var i=new Vue({el:"#loading-page",data:{button:!1,isUp:!1,overflow:"hidden",phoneTitle:"请输入正确的手机号",passwordTitle:"请输入正确格式的密码",checkWordTitle:"请输入正确的验证码",checkPicCode:"请输入正确的图形验证码",getCheckWordButton:"获取验证码",phoneNumber:"",phoneNumShow:!1,passwordText:"",passwordShow:!1,picCodeText:"",picCodeTitle:!1,checkNumberText:"",checkShow:!1,isClick:!1,isDuable:!1,clickColor:"#ffc000",baseUrl:"https://www.qtz360.com/api2.2.3/rest/",phoneDisplay:"none",checkDisplay:"none",sn:9758663,channelId:"",channelCookie:"",timeStamp:""},mounted:function(){},created:function(){},methods:{buttonClick:function(){var e=this;this.button=!0,setTimeout(function(){e.isUp=!0,document.querySelector("body").style.height="100%",document.querySelector("body").style.overflowY="scroll",document.querySelector("body").style.position="relative"},1100),_czc.push(["_trackEvent","page2","点击","page2"]),_czc.push(["_trackEvent","page1_button","点击","首页按钮"])},changePicCodeFun:function(){this.timeStamp=1e6*Math.random().toFixed(6)+1,this.loadPicCode()},checkPhone:function(e){return/^1[3456789]\d{9}$/.test(e)&&(this.phoneNumShow=!1),_czc.push(["_trackEvent","phone","点击","手机号"]),/^1[34578]\d{9}$/.test(e)},checkPassword:function(e){var t=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;return t.test(e)&&(this.passwordShow=!1),_czc.push(["_trackEvent","password","点击","密码"]),t.test(e)},checkWord:function(e){var t=/^\d{6}$/;return t.test(e)&&(this.checkShow=!1),_czc.push(["_trackEvent","verification code","点击","输入验证码"]),t.test(e)},loadPicCode:function(){var e=this;this.timestamp=1e6*Math.random().toFixed(6)+1,this.$http.get(this.baseUrl+"CodeOnle?imgKey="+this.timestamp,{imgKey:this.timestamp}).then(function(t){$(".picCode").attr("src",e.baseUrl+"CodeOnle?imgKey="+e.timestamp)})},checkWordChange:function(){var e=this;if(!this.isClick){var t=60;this.Duable=!0;var o=setInterval(function(){e.clickColor="#adadad",e.isClick=!0,t--,e.getCheckWordButton=t+"s",t<=0&&(t=0,e.clickColor="#ffc000",e.isClick=!1,e.getCheckWordButton="再次获取",e.Duable=!1,clearInterval(o),e.loadPicCode())},1e3)}},submitClick:function(){var e=this;this.checkPhone(this.phoneNumber)&&""===this.phoneNumber||(this.phoneNumShow=!0,setTimeout(function(){e.phoneNumShow=!1},1e3)),this.checkPassword(this.passwordText)&&""===this.passwordText||(this.passwordShow=!0,setTimeout(function(){e.passwordShow=!1},1200)),this.checkWord(this.checkNumberText)&&""===this.checkNumberText||(this.checkShow=!0,setTimeout(function(){e.checkShow=!1},1400)),this.checkPhone(this.phoneNumber)&&this.checkPassword(this.passwordText)&&this.checkWord(this.checkNumberText)&&this.getChannelMessage(),""===this.phoneNumber&&""===this.passwordText&&""===this.checkNumberText&&(this.checkShow=!0,this.phoneNumShow=!0,this.passwordShow=!0,setTimeout(function(){e.phoneNumShow=!1,setTimeout(function(){e.passwordShow=!1,setTimeout(function(){e.checkShow=!1},200)},200)},1e3)),_czc.push(["_trackEvent","register","点击","注册"])},isPhoneExistence:function(){var e=this;if(this.checkPhone(this.phoneNumber)&&!this.Duable){var t=this;this.$http.get(this.baseUrl+"isPhoneUsed",{phoneReg:this.phoneNumber}).then(function(e){"A0001"===e.data.rcd||"M0008_23"===e.data.rcd?(t.phoneTitle="手机号已注册！",t.phoneNumShow=!0,t.phoneDisplay="block",setTimeout(function(){t.phoneNumShow=!1,t.phoneDisplay="none",t.phoneTitle="请输入正确的手机格式"},1e3)):"A0002"===e.data.rcd&&t.checkPhone(t.phoneNumber)&&(t.isDuable=!0,t.getPhoneCheckCode())})}else this.phoneNumShow=!0,setTimeout(function(){e.phoneNumShow=!1},1e3);_czc.push(["_trackEvent","words","点击","验证码"])},getPhoneCheckCode:function(){var e=this;e.isClick||e.$http.get(e.baseUrl+"sendPCode",{phoneReg:e.phoneNumber,imgKey:e.timestamp,imgCode:e.picCodeText,source:"pc"}).then(function(t){var o=this;"R0001"!==t.data.rcd&&"M0008_23"!==t.data.rcd||e.checkWordChange(),"M0008_24"!==t.data.rcd&&"M0008_25"!==t.data.rcd||(this.picCodeTitle=!0,setTimeout(function(){o.picCodeTitle=!1},1e3))})},getChannelMessage:function(){this.$http.get(this.baseUrl+"channel/"+this.sn).then(function(e){"R0001"===e.data.rcd&&(this.channelId=e.data.id,this.channelCookie=e.data.cookie,this.register())}).catch(function(e){})},register:function(){this.$http.post(this.baseUrl+"reg",{"user.phone":this.phoneNumber,"user.password":this.passwordText,codeReg:this.checkNumberText,inviteuserid:this.channelId,cr:this.channelCookie,invitePhone:"null",sourceFrom:2}).then(function(e){var t=this;switch(e.data.rcd){case"R0001":window.location.href="https://www.qtz360.com/ch/918/getRed.html";break;case"M0008_2":this.phoneDisplay="block",this.phoneTitle="手机号已注册！",setTimeout(function(){t.phoneDisplay="none",t.phoneTitle="请输入正确的手机格式！"},1e3);break;default:this.checkDisplay="block",setTimeout(function(){t.checkDisplay="none"},1e3)}}).catch(function(e){alert(e+"请求失败")})},serviceAgreement:function(){_czc.push(["_trackEvent","agreement","点击","协议"])},login:function(){_czc.push(["_trackEvent","login","点击","登录"])}}});Vue.nextTick(function(){i.loadPicCode(),i.submitClick()})},{}]},{},[1]);