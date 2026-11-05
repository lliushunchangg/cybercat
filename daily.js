(()=>{'use strict';
const $=id=>document.getElementById(id),button=document.createElement('button');button.id='dailyChat';button.textContent='♡ 日常小聊';$('history').before(button);
const topics=[
 {label:'今天有点累',you:'今天有一点累，想和你坐一会儿。',mood:'smile',lines:['那先把肩膀放松一点。这里给你靠，今天不着急说话。','我把毯子暖好了。你陪了我那么多次，这次换我陪你呀。','要不要先喝一口水？杯子给你拿来了……然后，我能牵一下你的手吗？']},
 {label:'想抱抱你',you:'小狸，可以抱抱你吗？',mood:'shy',lines:['可以呀……你先张开手，我自己过来。今天想抱久一点。','耳朵红了吗？那、那是屋里太暖和。你不要松手嘛。','嗯，抱到了。刚才想说的话忘记了……等我想起来，再告诉你。']},
 {label:'明天吃什么',you:'明天的早餐，一起决定吧。',mood:'smile',lines:['烤面包、煎蛋，还有热乎乎的牛奶！你的那片我会少烤一点，边边太硬你不喜欢。','如果我起晚了，你就轻轻叫我的名字。不能用逗猫棒叫醒我，那样我会先追羽毛的。','小饼干能算早餐吗？只能一小块也行……我把大的那半给你。']},
 {label:'和你说晚安',you:'晚安，小狸。今天有你在真好。',mood:'shy',lines:['晚安。你的那半条毯子盖好了吗？我检查一下……嗯，现在可以安心睡了。','明天醒来，也要跟我说早安哦。我会认真回答的，睡迷糊了也算。','今天最后一个抱抱，要留给我。好啦，闭眼睛……我也最喜欢这样普通的一天。']}
];const counts=topics.map(()=>0);
button.onclick=()=>{
 $('dialogTitle').textContent='小狸的日常小窝';$('dialogBody').replaceChildren();$('dialog').classList.add('daily-dialog');
 const intro=document.createElement('p');intro.className='daily-note';intro.textContent='不赶剧情，只陪你聊一小会儿。';
 const messages=document.createElement('div');messages.className='daily-messages';messages.setAttribute('aria-live','polite');
 const greeting=document.createElement('p');greeting.className='chat-cat';greeting.textContent='小狸：过来坐呀。今天想和我说什么？';messages.append(greeting);
 const choices=document.createElement('div');choices.className='daily-topics';
 topics.forEach((topic,i)=>{const b=document.createElement('button');b.textContent=topic.label;b.onclick=()=>{const user=document.createElement('p'),cat=document.createElement('p');user.className='chat-you';cat.className='chat-cat';user.textContent='你：'+topic.you;cat.textContent='小狸：'+topic.lines[counts[i]++%topic.lines.length];messages.replaceChildren(user,cat);$('portrait').dataset.mood=topic.mood};choices.append(b)});
 $('dialogBody').append(intro,messages,choices);$('dialog').showModal();
};
 $('dialog').addEventListener('close',()=>$('dialog').classList.remove('daily-dialog'));
})();
