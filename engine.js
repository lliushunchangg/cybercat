(function(root){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,Number.isFinite(n)?n:a));
const fresh=()=>({v:1,aff:35,unlocked:false,energy:80,full:25,last:'',repeat:0,visits:1,date:'',memories:[],vn:null,endings:[]});
const newStory=()=>({node:'awakening',line:0,trust:0,openness:0,flags:{},log:[],ending:null});
const say=(who,text,mood='neutral')=>({who,text,mood});
const story={
 "awakening": {
  "chapter": "序章 · 第一个会说话的夜晚",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "沙发上的小毯子动了动。一双毛茸茸的耳朵，从毯子后面悄悄冒出来。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "你回来啦……我听见钥匙响了。",
    "mood": "smile"
   },
   {
    "who": "小狸",
    "text": "先别看我，头发有一点乱。就、一点点。",
    "mood": "shy"
   },
   {
    "who": "你",
    "text": "要不要过来坐？你的位子一直留着。",
    "mood": "neutral"
   },
   {
    "who": "旁白",
    "text": "她抱着抱枕挪过来，尾巴却比本人更诚实，轻轻搭在你手边。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "今天还能像以前一样，陪你待一会儿吗？",
    "mood": "shy"
   },
   {
    "who": "小狸",
    "text": "还有……我现在会说话了，零食能申请两份吗？",
    "mood": "smile"
   },
   {
    "who": "旁白",
    "text": "她伸出两根手指，想了想，又悄悄收回一根。",
    "mood": "neutral"
   }
  ],
  "choices": [
   {
    "text": "分她半条毯子：「过来，给你留了暖和的地方。」",
    "next": "blanket",
    "trust": 2,
    "flag": "blanket"
   },
   {
    "text": "「以前我说想你，你是不是也听见了？」",
    "next": "question",
    "openness": 2
   },
   {
    "text": "「可以摸摸头吗？今天也很可爱。」",
    "next": "reach",
    "trust": 1
   }
  ]
 },
 "blanket": {
  "chapter": "序章 · 第一个会说话的夜晚",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "你把毯子展开。她马上捏住一角，给你也留了半边。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "喏，一人一半。你的手怎么这么凉……往里面放一点。",
    "mood": "smile"
   },
   {
    "who": "小狸",
    "text": "我没有特意把这里捂热哦。只是刚好，等了你一小会儿。",
    "mood": "shy"
   }
  ],
  "next": "name"
 },
 "question": {
  "chapter": "序章 · 第一个会说话的夜晚",
  "light": "night",
  "lines": [
   {
    "who": "小狸",
    "text": "嗯，听得懂一点。比如你说“好累”的时候，我就想靠过来。",
    "mood": "neutral"
   },
   {
    "who": "你",
    "text": "原来那时候，你是在陪我。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "不然呢？总不能让你一个人对着杯子发呆吧。",
    "mood": "shy"
   },
   {
    "who": "小狸",
    "text": "下次可以叫我的名字。我会过来的……洗脸的时候除外！",
    "mood": "smile"
   }
  ],
  "next": "name"
 },
 "reach": {
  "chapter": "序章 · 第一个会说话的夜晚",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "你停在她面前，问了一声：“可以摸摸头吗？”",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "可以……轻一点。耳朵那里有点痒。",
    "mood": "shy"
   },
   {
    "who": "旁白",
    "text": "她低下头，把额头慢慢贴进你的掌心。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "刚刚不是说摸一下嘛。那……再一下，也可以。",
    "mood": "smile"
   }
  ],
  "next": "name"
 },
 "name": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "旁白",
    "text": "早上，厨房传来很轻的瓷器声。你的杯子旁，多了一个画着小猫的杯子。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "这个是我的。画歪的那只耳朵，不算。",
    "mood": "shy"
   },
   {
    "who": "你",
    "text": "要不要在杯子上写名字？",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "要！你写，我扶着。我的字还会在纸上摔跤。",
    "mood": "smile"
   },
   {
    "who": "旁白",
    "text": "她站得近了一点，发梢轻轻扫过你的手背。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "还是叫我小狸，好不好？你这样叫的时候，我最容易听见。",
    "mood": "shy"
   }
  ],
  "choices": [
   {
    "text": "「当然。除非你有一个更喜欢的名字。」",
    "next": "ownname",
    "trust": 2,
    "openness": 1,
    "flag": "name"
   },
   {
    "text": "「我给你想一个新名字吧。」",
    "next": "newname",
    "trust": -1,
    "openness": 1
   },
   {
    "text": "「你想让我怎么称呼你？」",
    "next": "ownname",
    "trust": 1,
    "openness": 2,
    "flag": "name"
   }
  ]
 },
 "ownname": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "小狸",
    "text": "那就说定啦。以后回家，也要先叫一声小狸。",
    "mood": "smile"
   },
   {
    "who": "小狸",
    "text": "我不一定每次都在门口……但会回答你的。",
    "mood": "shy"
   },
   {
    "who": "旁白",
    "text": "她把两个杯子并排摆好，又把自己的杯柄转向你。",
    "mood": "neutral"
   }
  ],
  "next": "cup"
 },
 "newname": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "小狸",
    "text": "唔……可是小狸这个名字，我已经很喜欢了。",
    "mood": "worried"
   },
   {
    "who": "你",
    "text": "那就不换。刚刚是我没想周全。",
    "mood": "neutral"
   },
   {
    "who": "旁白",
    "text": "她松开攥着你衣角的手，又用指尖勾住一点点。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "那再叫一次？我听听。",
    "mood": "shy"
   }
  ],
  "next": "cup"
 },
 "cup": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "旁白",
    "text": "水壶咕嘟一声，小狸的耳朵也跟着抖了一下。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "我没有吓到！只是……耳朵比我先反应了。",
    "mood": "shy"
   },
   {
    "who": "旁白",
    "text": "你忍住笑，给她拿来早餐和一只小碟子。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "今天想学给你泡茶。总让你照顾我，好像有点不公平。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "你站在旁边教我嘛。离太远的话，我会偷偷紧张。",
    "mood": "shy"
   }
  ],
  "choices": [
   {
    "text": "站在旁边，让她自己试着按开关。",
    "next": "lesson",
    "trust": 1,
    "openness": 2,
    "flag": "lesson"
   },
   {
    "text": "替她倒好水：「这些交给我就好了。」",
    "next": "help",
    "trust": 1,
    "openness": -1
   }
  ]
 },
 "lesson": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "旁白",
    "text": "你扶着壶柄，她认真地倒了半杯水。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "没有洒！你看见了吗？我很厉害吧？",
    "mood": "smile"
   },
   {
    "who": "旁白",
    "text": "得到你的点头后，她把杯子推到你手边，眼睛亮了一点。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "明天也想给你泡。你喜欢的温度，我会慢慢记住的。",
    "mood": "shy"
   }
  ],
  "next": "window"
 },
 "help": {
  "chapter": "第一章 · 名字是留给谁的",
  "light": "warm",
  "lines": [
   {
    "who": "小狸",
    "text": "谢谢。那今天先让我负责把早餐端过去。",
    "mood": "smile"
   },
   {
    "who": "旁白",
    "text": "她端起碟子走了两步，又回头看你。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "不过明天要教我哦。我也想有“交给小狸就好”的时候。",
    "mood": "shy"
   }
  ],
  "next": "window"
 },
 "window": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "旁白",
    "text": "傍晚，小狸在门边来回走了两圈，最后抱着一把伞停下来。",
    "mood": "neutral"
   },
   {
    "who": "你",
    "text": "准备去哪儿？",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "街角的小店。想买明天的早餐。",
    "mood": "smile"
   },
   {
    "who": "小狸",
    "text": "我知道你喜欢哪一种……上次你多看了一眼。",
    "mood": "shy"
   },
   {
    "who": "旁白",
    "text": "她低头检查口袋，钥匙、零钱，还有一张写了两遍的购物清单。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "你想一起去吗？走慢一点的话，还能看看路边的花。",
    "mood": "smile"
   },
   {
    "who": "小狸",
    "text": "要是你累了，在家等我也可以。回来要帮我开灯哦。",
    "mood": "shy"
   }
  ],
  "choices": [
   {
    "text": "「一起去吧，我想牵着你慢慢走。」",
    "next": "together",
    "trust": 2,
    "openness": 1,
    "flag": "door"
   },
   {
    "text": "「今天有点累，可以先陪我坐一会儿吗？」",
    "next": "stay",
    "trust": 0,
    "openness": 0
   },
   {
    "text": "给她备用钥匙：「等你回来，一起吃宵夜。」",
    "next": "key",
    "trust": 1,
    "openness": 2,
    "flag": "key"
   }
  ]
 },
 "together": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "小狸",
    "text": "那我拿伞，你拿袋子。手呢……还有一只空着吧？",
    "mood": "shy"
   },
   {
    "who": "你",
    "text": "有。要牵吗？",
    "mood": "neutral"
   },
   {
    "who": "旁白",
    "text": "她把手递过来，指尖轻轻勾住你。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "嗯。今天就不假装是怕走丢了。",
    "mood": "smile"
   }
  ],
  "next": "return"
 },
 "stay": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "旁白",
    "text": "她放下伞，先看了看你的脸色。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "今天很累吗？我可以先陪你坐十分钟，再去买早餐。",
    "mood": "worried"
   },
   {
    "who": "旁白",
    "text": "她拍拍身边的位子，等你把没说完的话说出来。",
    "mood": "neutral"
   }
  ],
  "choices": [
   {
    "text": "「其实是想你了。休息一下，我们一起去。」",
    "next": "repair",
    "trust": 2,
    "openness": 1,
    "flag": "repair"
   },
   {
    "text": "暂时不想说话，轻轻握住她的手。",
    "next": "quiet"
   }
  ]
 },
 "repair": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "小狸",
    "text": "想让我陪你，就直接说嘛。",
    "mood": "shy"
   },
   {
    "who": "小狸",
    "text": "我会开心的。但是早餐也要买……我们可以一起慢慢走。",
    "mood": "smile"
   },
   {
    "who": "你",
    "text": "好，今天想和你待在一起。",
    "mood": "neutral"
   },
   {
    "who": "旁白",
    "text": "她重新拿起伞，这次空出来的手一直牵着你。",
    "mood": "neutral"
   }
  ],
  "next": "return"
 },
 "quiet": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "旁白",
    "text": "你摇摇头，暂时还不想说话。她便陪你坐下，把热茶放近一点。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "没关系，今天先不说。等你想说了，我再听。",
    "mood": "neutral"
   },
   {
    "who": "旁白",
    "text": "她在你身边蜷起腿，给你留着半条毯子。",
    "mood": "neutral"
   }
  ],
  "end": "window"
 },
 "key": {
  "chapter": "第二章 · 门外的雨",
  "light": "rain",
  "lines": [
   {
    "who": "旁白",
    "text": "你把备用钥匙放进她手里，顺手替她扣好钥匙环。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "那我也有一把了。可以给它挂一只小猫吗？",
    "mood": "smile"
   },
   {
    "who": "你",
    "text": "可以。回来一起吃点热的。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "嗯！那你记得等我……我会想你的，就出去这么一会儿也会。",
    "mood": "shy"
   }
  ],
  "next": "return"
 },
 "return": {
  "chapter": "终章 · 留一盏灯",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "门一开，小狸先探进一双耳朵，然后才是抱着纸袋的她。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "我回来啦。买到了！还给你带了一块小饼干。",
    "mood": "smile"
   },
   {
    "who": "旁白",
    "text": "她把袋子放好，走过来牵了牵你的袖口。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "路上有一点冷。现在想申请一个暖乎乎的抱抱。",
    "mood": "shy"
   },
   {
    "who": "旁白",
    "text": "她把碍事的靠垫抱到另一边，给自己腾出紧挨着你的位置。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "可以吗？今天想多靠一会儿……这句是认真的。",
    "mood": "shy"
   }
  ],
  "choices": [
   {
    "text": "张开手：「当然，今天的抱抱不限时。」",
    "next": "close",
    "trust": 2,
    "flag": "close"
   },
   {
    "text": "牵她坐下：「先暖暖手，再一起吃点东西。」",
    "next": "tomorrow",
    "trust": 1,
    "openness": 1
   }
  ]
 },
 "close": {
  "chapter": "终章 · 留一盏灯",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "你张开手。她慢慢靠进来，把额头抵在你的肩上。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "嗯……就是这里。这个位子最舒服。",
    "mood": "smile"
   },
   {
    "who": "你",
    "text": "今天辛苦了，小狸。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "你也是。明天也让我陪你吧。现在先抱好，不许偷偷松手。",
    "mood": "shy"
   }
  ],
  "end": "dynamic"
 },
 "tomorrow": {
  "chapter": "终章 · 留一盏灯",
  "light": "night",
  "lines": [
   {
    "who": "旁白",
    "text": "你握住她的手，用毯子盖好两个人的膝盖。",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "那明早叫你起床的工作，交给我。",
    "mood": "smile"
   },
   {
    "who": "你",
    "text": "会不会自己先睡过头？",
    "mood": "neutral"
   },
   {
    "who": "小狸",
    "text": "才不会……如果真的睡过头，就一起多睡五分钟嘛。",
    "mood": "shy"
   }
  ],
  "end": "dynamic"
 }
};
const endings={"home":{"title":"你的身边，刚刚好","tag":"结局 01 · 今天也想黏着你","text":"两只杯子，一条毯子。明天的早餐和晚安，都想分你一半。"},"tomorrow":{"title":"明早，再多睡五分钟","tag":"结局 02 · 小小的日常约定","text":"她认真记下了你的口味，也悄悄把自己的闹钟调早了一点。"},"window":{"title":"我陪你坐一会儿","tag":"结局 03 · 安静也是一种陪伴","text":"今晚不用勉强说话。她把热茶推近，给你留着半条毯子。"}};
function read(raw){const s=fresh();if(!raw||raw.v!==1)return s;for(const k of ['aff','energy','full'])s[k]=clamp(raw[k],0,k==='aff'?120:100);s.unlocked=raw.unlocked===true||s.aff>=120;s.last=['pet','sniff','play','feed','rest'].includes(raw.last)?raw.last:'';s.repeat=clamp(raw.repeat,0,100);s.visits=clamp(raw.visits,1,99999);s.date=typeof raw.date==='string'?raw.date:'';s.memories=Array.isArray(raw.memories)?raw.memories.filter(x=>['pet','sniff','play','feed','rest'].includes(x)):[];s.endings=Array.isArray(raw.endings)?raw.endings.filter(x=>endings[x]):[];if(raw.vn&&story[raw.vn.node]){const n=raw.vn;s.vn={...newStory(),node:n.node,line:Math.floor(clamp(n.line,0,story[n.node].lines.length)),trust:clamp(n.trust,-20,30),openness:clamp(n.openness,-20,30),flags:{},log:[],ending:endings[n.ending]?n.ending:null};for(const k of ['blanket','name','lesson','door','key','repair','close'])s.vn.flags[k]=n.flags?.[k]===true;s.vn.log=Array.isArray(n.log)?n.log.filter(x=>x&&typeof x.text==='string'&&typeof x.who==='string').slice(-160).map(x=>({who:x.who.slice(0,20),text:x.text.slice(0,600)})):[]}return s}
function act(s,key){if(!['pet','sniff','play','feed','rest'].includes(key))return null;const old=s.aff;let d=0,mood='neutral',text='';s.repeat=s.last===key?s.repeat+1:0;s.last=key;
 if(key==='sniff'){d=5;text='它先闻了闻，鼻尖轻轻碰到了你的手。';mood='sniff'}
 if(key==='pet'){if(s.aff<20){d=-4;text='哈——！它躲开了。先把手停远一点。';mood='hiss'}else{d=6;text='它把额头贴过来，跟着你的手轻轻蹭。';mood='rub';s.energy-=3}}
 if(key==='play'){if(s.energy<25){d=-3;text='它没有再追。该把玩具放下，歇一会儿了。';mood='retreat'}else{d=7;s.energy-=18;text='它认真盯住羽毛，抬起爪子轻轻拍了一下。';mood='play'}}
 if(key==='feed'){if(s.full>75){d=-4;text='它已经吃饱，扭开头拒绝了零食。';mood='retreat'}else{d=5;s.full+=30;text='它低头吃了一口，又抬眼看了看你。';mood='eat'}}
 if(key==='rest'){d=5;s.energy+=22;text='你安静地陪着。它慢慢把身体靠近你。';mood='rest'}
 if(d>0&&s.repeat>=3){d=-2;text='它有点不耐烦了。换一种相处方式，给它一点空间。';mood='retreat'}
 else if(d>0&&s.repeat>0)d=Math.max(1,d-s.repeat*2);
 s.energy=clamp(s.energy,0,100);s.full=clamp(s.full-2,0,100);s.aff=clamp(s.aff+d,0,120);if(d>0&&!s.memories.includes(key))s.memories.push(key);const reveal=!s.unlocked&&s.aff>=120;if(reveal)s.unlocked=true;
 return{delta:s.aff-old,visibleDelta:Math.min(100,s.aff)-Math.min(100,old),text,mood,reveal};}
function start(s){if(!s.unlocked)return false;if(!s.vn)s.vn=newStory();return true}
function current(s){if(!s.vn)return null;const n=story[s.vn.node];if(s.vn.ending)return{ending:endings[s.vn.ending],chapter:n.chapter,light:n.light};if(s.vn.line<n.lines.length){const l=n.lines[s.vn.line];return{...l,text:typeof l.text==='function'?l.text(s):l.text,chapter:n.chapter,light:n.light}}return{choices:n.choices||null,chapter:n.chapter,light:n.light}}
function settle(s){const n=story[s.vn.node];if(s.vn.line<n.lines.length)return;if(n.next){s.vn.node=n.next;s.vn.line=0}else if(n.end){const e=n.end==='dynamic'?(s.vn.trust>=7&&s.vn.openness>=3?'home':'tomorrow'):n.end;s.vn.ending=e;if(!s.endings.includes(e))s.endings.push(e)}}
function advance(s){const l=current(s);if(!l||l.ending||l.choices)return false;if(l.text)s.vn.log.push({who:l.who,text:l.text});s.vn.log=s.vn.log.slice(-160);s.vn.line++;settle(s);return true}
function choose(s,index){const c=current(s)?.choices?.[index];if(!c)return false;s.vn.log.push({who:'你的选择',text:c.text});s.vn.trust+=c.trust||0;s.vn.openness+=c.openness||0;if(c.flag)s.vn.flags[c.flag]=true;s.vn.node=c.next;s.vn.line=0;return true}
const api={fresh,read,act,start,current,advance,choose,newStory,story,endings,visible:s=>Math.min(100,Math.floor(s.aff))};if(typeof module!=='undefined')module.exports=api;else root.MoonCat=api;
})(typeof window==='undefined'?{}:window);
