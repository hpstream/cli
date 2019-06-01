require('../css/index.less');
var {
  privilegeJSON,
  dayluckJSON,
  buyTimeJSON,
  luckDrawJSON,
  signinJSON,
  bubbleJSON,
  badgeJSON,
  getRewardJSON
} = require('../data/data.js');
var {
  wb,
  sa,
  ticketCsrf,
  wbComponent
} = require('front-common')(window, document, $);
var commonUrl = "/web/webApi/";
// -----------处理t票和__cf------------
ticketCsrf && new ticketCsrf(454042482); // 454042482
var msg_title = '会员中心';
Vue.use(wbComponent);
var {
  luckDraw
} = require('../lib/luckDraw.js');
var memberInfo = commonUrl + "member/memberInfo";
var memberPriceList = commonUrl + "member/memberPriceList";
var purchaseMember = commonUrl + "member/purchaseMember";
var getPrizeList = commonUrl + "member/getPrizeList";
var prizeDraw = commonUrl + "member/prizeDraw";
var app = new Vue({
  el: '#app',
  data: {
    // == 模拟数据
    privilegeJSON,
    dayluckJSON,
    buyTimeJSON,
    luckDrawJSON,
    signinJSON,
    bubbleJSON,
    badgeJSON,
    getRewardJSON,
    // ==============
    luckdrawfn: null,
    getRewardId: -1,
    mygift: {},
    luckDrawing: false,
    memberInfo: {
      member: 0
    },
    controller: {
      isMask: false,
      showTypeMask: 3, //  0.购买时长，1,弹框内容, 3.抽奖展示奖品弹框
      showTypeAlert: 0, // 0,每日抽奖 1.打开签到，2.专属气泡，3徽章，4会员等级说明,
      choosePayTyle: 0 // 推荐付款类型
    }
  },
  methods: {
    getTagOwnerInfo() {
      var _this = this;
      wb.request({
        url: memberInfo,
        data: {},
        success: res => {
          if (res.code == 0) {
            var memberInfo = res.data.memberInfo;
            _this.memberInfo = res.data.memberInfo;
            //  _this.memberInfo.member= 0;
            _this.memberInfo.groupWidth = 2 + (memberInfo.sorce - memberInfo.currLevelNeedScore) / (memberInfo.sorce - memberInfo.currLevelNeedScore + memberInfo.upLevelNeedScore) * 98;
            //  console.log(memberInfo);
          } else {
            this.$refs.toast.toastFun(res.msg);
          }
        }
      })
    },
    memberPriceList() {
      var _this = this;
      wb.request({
        url: memberPriceList,
        data: {},
        success: res => {
          if (res.code == 0) {
            //  console.log(memberInfo);
            var memberPriceList = res.data.memberPriceList;
            _this.buyTimeJSON = memberPriceList;

            for (var i = 0; i < memberPriceList.length; i++) {
              if (memberPriceList[i].isDefault == '1') {
                this.controller.choosePayTyle = memberPriceList[i].id
              }
            }
          } else {
            this.$refs.toast.toastFun(res.msg);
          }
        }
      })
    },
    purchaseMember() {
      var _this = this;
        sa.h5TrackClick({
          button_name: "h5_popup",
          button_detail: 'goto_exchange',
          url: location.href,
          source: "buy_membership"
        });
      wb.request({
        url: purchaseMember,
        data: {
          id: this.controller.choosePayTyle,
        },
        success: res => {
          if (res.code == 3) {
            //  console.log(memberInfo);
            //调用
            this.$refs.popup.popupFun({
              type: 1, //弹窗形式。1：confirm（第2个截图），2：alert（第1个截图）（必传）
              title: "提示", //标题（必传）
              desc: res.msg, //描述（必传）
              confirmColor: "#FF5A27", //“确认”按钮字的颜色，不传默认"#F5A623"（黄色）
              cancel: "取消", //“取消”按钮文案，不传默认“取消”
              confirm: "去商城" //“确定”按钮文案，不传默认“确定”
            });
          } else {
            this.getTagOwnerInfo();
            this.$refs.toast.toastFun(res.msg);
          }
        }
      })
    },
    getPrizeList() {
      var _this = this;
      wb.request({
        url: getPrizeList,
        data: {},
        success: res => {
          if (res.code == 0) {
            _this.getRewardJSON = res.data.memberPrizeList.list;
            // 确认旋转方向
            var rotateDir = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            // 初始化抽奖模块
            this.luckdrawfn = new luckDraw(_this.getRewardJSON, rotateDir, 3, 8);
          } else {
            this.$refs.toast.toastFun(res.msg);
          }
        }
      })
    },
    // 开始抽奖
    prizeDraw() {
      var _this = this;
      sa.h5TrackClick({
        button_name: "h5_popup",
        button_detail: "lottery",
        url: location.href,
        source: "membership_center"
      });
      if (this.luckDrawing) {
        return;
      }
      this.luckDrawing = true;
      wb.request({
        url: prizeDraw,
        data: {},
        success: res => {
          if (res.code == 0) {
            // 抽奖动画
            _this.mygift = res.data.memberPrice;
            // console.log(_this.mygift)
            _this.getgift(res.data.memberPrice.id);
            _this.getTagOwnerInfo();
          } else {
            this.$refs.toast.toastFun(res.msg);
             this.luckDrawing = false;
          }
        }
      })
    },
    growthinfoFn() {
      this.controller.isMask = true;
      this.controller.showTypeMask = 1;
      this.controller.showTypeAlert = 4;
    },
    closeMask() {
      this.controller.isMask = false;
    },
    purchase() {
      this.controller.isMask = true;
      this.controller.showTypeMask = 0;
        sa.h5TrackClick({
          button_name: "h5_link",
          button_detail: 'goto_charge',
          url: location.href,
          source: "membership_center"
        });
    },
    choosePayTyleFn(item) {
      this.controller.choosePayTyle = item.id;
    },
    privilegeFn(item) {
      if (item.type != undefined) {
        this.controller.isMask = true;
        this.controller.showTypeMask = 1;
        this.controller.showTypeAlert = item.type;
        sa.h5TrackClick({
          button_name: "h5_popup",
          button_detail: item.type + 1,
          url: location.href,
          source: "membership_center"
        });
      }
    },
    //获奖
    getgift(id) {
      var _this = this;
      this.luckdrawfn.run(id, function (params) {
          _this.getRewardId = params.id;
        },
        function (params) {
          _this.getRewardId = params.id;
          setTimeout(() => {
            _this.controller.isMask = true;
            _this.controller.showTypeMask = 3;
            _this.getRewardId = -1;
            _this.luckDrawing = false;
          }, 200);
        })
    },
    clickPopupConfirm() {
      wb.universalJump("wanba://shopcenter/enter?_info=", "{\"autoClose\":1,\"tradeType\":0}")
      // wb.universalJump("wanba://shopcenter/enter?_info=", "{\"autoClose\":1,\"tradeType\":1}")
    },
    clickPopupCancel() {
      console.log("点击了“确定“按钮");
    },
    gouse(jumpUrl) {
      wb.universalJump(jumpUrl);
      console.log(jumpUrl);
    }
  },
  mounted() {
    $('#app').show();
    this.getTagOwnerInfo();
    this.memberPriceList();
    this.getPrizeList();
  }
})


	wb.webNativeJumpRegisterHandler("appStateCallBack", function (res) {
	  var res = (wb.ua.isAndroid) ? JSON.parse(res) : res;
	  if (res.state == 0) {
      // alert("app在前台！");
       app.getTagOwnerInfo();
	  }
	})
