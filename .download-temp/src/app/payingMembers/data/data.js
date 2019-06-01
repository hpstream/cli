import {
  request
} from 'http';

var privilegeJSON = [{
    title: '每日抽奖',
    type: 0,
    describe: '礼物、逗豆...免费拿',
    img: require('../img/privilege/p1.png')
  },
  {
    title: '签到额外奖励',
    type: 1,
    describe: '单月可得1500金币',
    img: require('../img/privilege/p2.png')
  },
  {
    title: '专属气泡',
    type: 2,
    describe: '会员期间永久使用',
    img: require('../img/privilege/p3.png')
  },
  {
    title: '会员徽章',
    type: 3,
    describe: '五款会员专属徽章',
    img: require('../img/privilege/p4.png')
  },
  {
    title: '炫彩铭牌',
    describe: '即将上线',
    img: require('../img/privilege/p5.png')
  },
  {
    title: '语音房标识',
    describe: '即将上线',
    img: require('../img/privilege/p6.png')
  }
]

var dayluckJSON = [{
    name: '环游世界',
    img: require('../img/luck/luck2.png')
  }, {
    name: '金麦克',
    img: require('../img/luck/luck3.png')
  }, {
    name: '么么哒',
    img: require('../img/luck/luck4.png')
  },
  {
    name: '情书',
    img: require('../img/luck/luck5.png')
  }, {
    name: '小玩',
    img: require('../img/luck/luck6.png')
  }, {
    name: '幸运锦鲤',
    img: require('../img/luck/luck7.png')
  }
]

var getRewardJSON = [{
    id: 1,
    des: '222',
    img: require('../img/luck/luck1.png'),
    smallimg: require('../img/luck/sm_luck1.png')
  },
  {
    id: 2,
    des: '222',
    img: require('../img/luck/luck2.png'),
    smallimg: require('../img/luck/sm_luck2.png')
  },
  {
    id: 3,
    des: '222',
    img: require('../img/luck/luck3.png'),
    smallimg: require('../img/luck/sm_luck3.png')
  },
  {
    id: 4,
    des: '222',
    img: require('../img/luck/luck4.png'),
    smallimg: require('../img/luck/sm_luck4.png')
  },
  {
    id: 5,
    des: '222',
    img: require('../img/luck/luck5.png'),
    smallimg: require('../img/luck/sm_luck5.png')
  },
  {
    id: 6,
    des: '222',
    img: require('../img/luck/luck6.png'),
    smallimg: require('../img/luck/sm_luck6.png')
  },
  {
    id: 7,
    des: '222',
    img: require('../img/luck/luck7.png'),
    smallimg: require('../img/luck/sm_luck7.png')
  },
  {
    id: 8,
    des: '222',
    img: require('../img/luck/luck1.png'),
    smallimg: require('../img/luck/sm_luck1.png')
  },
  {
    id: 9,
    des: '222',
    img: require('../img/luck/luck1.png'),
    smallimg: require('../img/luck/sm_luck1.png')
  },
  {
    id: 10,
    des: '222',
    img: require('../img/luck/luck1.png'),
    smallimg: require('../img/luck/sm_luck1.png')
  }
]
var buyTimeJSON = [{
    time: '1个月',
    spend: '150钻',
    des: '150钻/月'
  },
  {
    time: '1个月',
    spend: '150钻',
    des: '150钻/月'
  }, {
    time: '1个月',
    spend: '150钻',
    des: '150钻/月'
  }, {
    time: '1个月',
    spend: '150钻',
    des: '150钻/月'
  }
]

// 每日抽奖弹框
var luckDrawJSON = [{
    icon: require('../img/level/lv1.png'),
    des: "免费",
    count: '1',
    unit: '次'
  },
  {
    icon: require('../img/level/lv2.png'),
    des: "免费",
    count: '2',
    unit: '次'
  }, {
    icon: require('../img/level/lv3.png'),
    des: "免费",
    count: '3',
    unit: '次'
  }, {
    icon: require('../img/level/lv4.png'),
    des: "免费",
    count: '4',
    unit: '次'
  }, {
    icon: require('../img/level/lv5.png'),
    des: "免费",
    count: '5',
    unit: '次'
  }
]
// 签到弹框
var signinJSON = [{
    dayCount: '2',
    day: '天',
    coinCount: '100',
    coinCunit: "金币",
    icon: require('../img/coin/coin1.png')
  },
  {
    dayCount: '7',
    day: '天',
    coinCount: '200',
    coinCunit: "金币",
    icon: require('../img/coin/coin2.png')
  }, {
    dayCount: '12',
    day: '天',
    coinCount: '300',
    coinCunit: "金币",
    icon: require('../img/coin/coin3.png')
  }, {
    dayCount: '21',
    day: '天',
    coinCount: '400',
    coinCunit: "金币",
    icon: require('../img/coin/coin4.png')
  }, {
    dayCount: '28',
    day: '天',
    coinCount: '500',
    coinCunit: "金币",
    icon: require('../img/coin/coin5.png')
  }
]
// 气泡弹框数据
var bubbleJSON = [{
    icon: require('../img/bubble/001.png'),
    level: 'LV1',
    des: '可用'
  },
  {
    icon: require('../img/bubble/002.png'),
    level: 'LV2',
    des: '可用'
  }, {
    icon: require('../img/bubble/003.png'),
    level: 'LV3',
    des: '可用'
  }
]
// 徽章
var badgeJSON = [{
    icon: require('../img/badge/1.png'),
    level: 'LV1',
    des: '徽章'
  },
  {
    icon: require('../img/badge/2.png'),
    level: 'LV2',
    des: '徽章'
  }, {
    icon: require('../img/badge/3.png'),
    level: 'LV3',
    des: '徽章'
  }, {
    icon: require('../img/badge/4.png'),
    level: 'LV4',
    des: '徽章'
  }, {
    icon: require('../img/badge/5.png'),
    level: 'LV5',
    des: '徽章'
  }
]



export {
  getRewardJSON,
  badgeJSON,
  bubbleJSON,
  signinJSON,
  privilegeJSON,
  dayluckJSON,
  buyTimeJSON,
  luckDrawJSON
}