(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-demo-icons-icons"],{"1e6c":function(e,i,l){var a=l("24fb");i=a(!1),i.push([e.i,"\n.icons[data-v-cf814aec]{display:flex;flex-direction:row;flex-wrap:wrap}.icon-item[data-v-cf814aec]{display:flex;width:16.6%;height:120px;font-size:30px;text-align:center;justify-content:center;align-items:center;flex-direction:column}.icon-item[data-v-cf814aec]:hover,\n.icon-item:hover .icon-text[data-v-cf814aec]{color:#007aff}.icon-text[data-v-cf814aec]{color:#99a9bf;font-size:12px;text-align:center;height:1em;line-height:1em;margin-top:15px}\n@media only screen and (max-width:500px){.icon-item[data-v-cf814aec]{width:33.3%}}\n",""]),e.exports=i},"2d9a":function(e,i,l){var a=l("1e6c");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var t=l("4f06").default;t("4d0cd39a",a,!0,{sourceMap:!1,shadowMode:!1})},"823f":function(e,i,l){"use strict";var a=l("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var t=a(l("bdc9")),n={data:function(){return{icons:t.default}},props:{tag:{type:Boolean,default:!0},fixWindow:{type:Boolean,default:!0}},methods:{setClipboardData:function(e,i){var l="uni-icons-"+i;this.tag&&"tag"===e&&(l='<view class="'+l+'"></view>'),uni.setClipboardData({data:l,success:function(e){uni.showToast({icon:"none",title:"复制 "+l+" 成功！"})},fail:function(e){uni.showModal({content:"复制 "+l+" 失败！",showCancel:!1})}})}}};i.default=n},a525:function(e,i,l){"use strict";var a=l("2d9a"),t=l.n(a);t.a},bd8b:function(e,i,l){"use strict";l.r(i);var a=l("823f"),t=l.n(a);for(var n in a)"default"!==n&&function(e){l.d(i,e,(function(){return a[e]}))}(n);i["default"]=t.a},bdc9:function(e,i,l){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=["pulldown","refreshempty","back","forward","more","more-filled","scan","qq","weibo","weixin","pengyouquan","loop","refresh","refresh-filled","arrowthindown","arrowthinleft","arrowthinright","arrowthinup","undo-filled","undo","redo","redo-filled","bars","chatboxes","camera","chatboxes-filled","camera-filled","cart-filled","cart","checkbox-filled","checkbox","arrowleft","arrowdown","arrowright","smallcircle-filled","arrowup","circle","eye-filled","eye-slash-filled","eye-slash","eye","flag-filled","flag","gear-filled","reload","gear","hand-thumbsdown-filled","hand-thumbsdown","hand-thumbsup-filled","heart-filled","hand-thumbsup","heart","home","info","home-filled","info-filled","circle-filled","chat-filled","chat","mail-open-filled","email-filled","mail-open","email","checkmarkempty","list","locked-filled","locked","map-filled","map-pin","map-pin-ellipse","map","minus-filled","mic-filled","minus","micoff","mic","clear","smallcircle","close","closeempty","paperclip","paperplane","paperplane-filled","person-filled","contact-filled","person","contact","images-filled","phone","images","image","image-filled","location-filled","location","plus-filled","plus","plusempty","help-filled","help","navigate-filled","navigate","mic-slash-filled","search","settings","sound","sound-filled","spinner-cycle","download-filled","personadd-filled","videocam-filled","personadd","upload","upload-filled","starhalf","star-filled","star","trash","phone-filled","compose","videocam","trash-filled","download","chatbubble-filled","chatbubble","cloud-download","cloud-upload-filled","cloud-upload","cloud-download-filled","headphones","shop"];i.default=a},c468:function(e,i,l){"use strict";var a;l.d(i,"b",(function(){return t})),l.d(i,"c",(function(){return n})),l.d(i,"a",(function(){return a}));var t=function(){var e=this,i=e.$createElement,l=e._self._c||i;return l("v-uni-view",[l("v-uni-view",{staticClass:"uni-header"},[l("v-uni-view",{staticClass:"uni-group"},[l("v-uni-view",{staticClass:"uni-title"},[e._v(e._s(e.$t("demo.icons.title"))+"（uni-icons）")]),l("v-uni-view",{staticClass:"uni-sub-title"},[e._v(e._s(e.$t("demo.icons.describle")))])],1)],1),l("v-uni-view",{staticClass:"uni-container"},[l("v-uni-view",{staticClass:"icons"},e._l(e.icons,(function(i){return l("v-uni-view",{key:i,staticClass:"icon-item pointer"},[l("v-uni-view",{class:"uni-icons-"+i,on:{click:function(l){arguments[0]=l=e.$handleEvent(l),e.setClipboardData("tag",i)}}}),l("v-uni-text",{staticClass:"icon-text",on:{click:function(l){arguments[0]=l=e.$handleEvent(l),e.setClipboardData("class",i)}}},[e._v("uni-icons-"+e._s(i))])],1)})),1)],1)],1)},n=[]},d37c:function(e,i,l){"use strict";l.r(i);var a=l("c468"),t=l("bd8b");for(var n in t)"default"!==n&&function(e){l.d(i,e,(function(){return t[e]}))}(n);l("a525");var o,c=l("f0c5"),d=Object(c["a"])(t["default"],a["b"],a["c"],!1,null,"cf814aec",null,!1,a["a"],o);i["default"]=d.exports}}]);