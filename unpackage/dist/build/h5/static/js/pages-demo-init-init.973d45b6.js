(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-demo-init-init"],{"5d7d":function(n,t,e){"use strict";var i=e("4ea4");e("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(e("5530")),s=e("26cb"),o=i(e("69eb")),r={data:function(){return{showPassword:!0,showPasswordAgain:!0,loading:!1,errorMessage:"",formData:{username:"admin",password:""},passwordConfirmation:"",rules:{username:{rules:[{required:!0,errorMessage:"请输入账户"},{minLength:3,maxLength:30,errorMessage:"账户长度在{minLength}到{maxLength}个字符"}]},password:{rules:[{required:!0,errorMessage:"请输入密码"},{minLength:6,errorMessage:"密码长度大于{minLength}个字符"}]},passwordConfirmation:{rules:[{required:!0,errorMessage:"请输入确认密码"},{minLength:6,errorMessage:"密码长度最小{minLength}个字符"}]}}}},mounted:function(){this.focus()},computed:(0,a.default)({},(0,s.mapState)("app",["appName","appid"])),methods:(0,a.default)((0,a.default)({},(0,s.mapMutations)({setToken:function(n,t){n("user/SET_TOKEN",t)}})),{},{register:function(n){var t=this;this.$refs.passwordInput.$refs.input.blur(),this.loading=!0,this.$request("registerAdmin",n,{functionName:"uni-id-cf"}).then((function(n){uni.showModal({title:"提示",content:n.code?n.message:"创建成功",showCancel:!1,success:function(n){n.confirm&&uni.navigateTo({url:"/pages/login/login"})}})})).catch((function(n){})).finally((function(n){t.loading=!1}))},submit:function(n){if(!this.loading){var t=n.detail,e=t.errors,i=t.value;e||(i.password===i.passwordConfirmation?(i.appName=this.appName,i.appid=this.appid,this.register(i)):this.errorMessage="两次输入密码不相同")}},confirmForm:function(n,t){this.binddata(n,t),this.submitForm()},submitForm:function(){this.errorMessage="",this.$refs.form.submit()},back:function(){uni.redirectTo({url:o.default.login.url})},changePassword:function(){this.showPassword=!this.showPassword},changePasswordAgain:function(){this.showPasswordAgain=!this.showPasswordAgain},focus:function(){this.$refs.usernameInput.$refs.input.focus()}})};t.default=r},"674f":function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return i}));var i={uniForms:e("5f92").default,uniFormsItem:e("8995").default},a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"login-box"},[e("v-uni-view",{staticClass:"uni-header"},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-view",{staticClass:"uni-title"},[n._v("创建超级管理员")])],1)],1),e("v-uni-view",{staticClass:"uni-container"},[e("uni-forms",{ref:"form",attrs:{validateTrigger:"bind",rules:n.rules},on:{submit:function(t){arguments[0]=t=n.$handleEvent(t),n.submit.apply(void 0,arguments)}}},[e("uni-forms-item",{attrs:{"left-icon":"person",name:"username",labelWidth:"35"}},[e("v-uni-input",{ref:"usernameInput",staticClass:"uni-input-border",attrs:{type:"text",placeholder:"账户"},on:{blur:function(t){arguments[0]=t=n.$handleEvent(t),n.binddata("username",t.detail.value)}}})],1),e("uni-forms-item",{attrs:{"left-icon":"locked",name:"password",labelWidth:"35"}},[e("v-uni-input",{staticClass:"uni-input-border",attrs:{password:n.showPassword,placeholder:"密码"},on:{blur:function(t){arguments[0]=t=n.$handleEvent(t),n.binddata("password",t.detail.value)}}}),e("v-uni-text",{staticClass:"uni-icon-password-eye pointer",class:[n.showPassword?"":"uni-eye-active"],on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.changePassword.apply(void 0,arguments)}}},[n._v("")])],1),e("uni-forms-item",{attrs:{"left-icon":"locked",name:"passwordConfirmation",labelWidth:"35",errorMessage:n.errorMessage}},[e("v-uni-input",{ref:"passwordInput",staticClass:"uni-input-border",attrs:{password:n.showPasswordAgain,placeholder:"确认密码"},on:{confirm:function(t){arguments[0]=t=n.$handleEvent(t),n.confirmForm("passwordConfirmation",t.detail.value)},blur:function(t){arguments[0]=t=n.$handleEvent(t),n.binddata("passwordConfirmation",t.detail.value)}}}),e("v-uni-text",{staticClass:"uni-icon-password-eye pointer",class:[n.showPasswordAgain?"":"uni-eye-active"],on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.changePasswordAgain.apply(void 0,arguments)}}},[n._v("")])],1),e("v-uni-view",{staticClass:"uni-group",staticStyle:{"margin-top":"30px"}},[e("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",loading:n.loading,disabled:n.loading},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.submitForm.apply(void 0,arguments)}}},[n._v("创建")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.back.apply(void 0,arguments)}}},[n._v("返回")])],1)],1)],1)],1)},s=[]},"863e":function(n,t,e){var i=e("9a0e");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("41143d1b",i,!0,{sourceMap:!1,shadowMode:!1})},"9a0e":function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,"uni-page-body[data-v-2b127825]{width:100%;height:100%;display:flex;\n\t/* align-items: center; */justify-content:center;background-color:#fff;\n}.login-box[data-v-2b127825]{position:relative;max-width:420px;flex:1;padding:140px 35px 0;margin:0 auto;overflow:hidden}.uni-button[data-v-2b127825]{width:184px}body.?%PAGE?%[data-v-2b127825]{background-color:#fff}",""]),n.exports=t},eb28:function(n,t,e){"use strict";var i=e("863e"),a=e.n(i);a.a},f5e7:function(n,t,e){"use strict";e.r(t);var i=e("5d7d"),a=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,(function(){return i[n]}))}(s);t["default"]=a.a},f732:function(n,t,e){"use strict";e.r(t);var i=e("674f"),a=e("f5e7");for(var s in a)"default"!==s&&function(n){e.d(t,n,(function(){return a[n]}))}(s);e("eb28");var o,r=e("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"2b127825",null,!1,i["a"],o);t["default"]=u.exports}}]);