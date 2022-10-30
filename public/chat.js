// @ts-check

(() => {
  const socket = new WebSocket(`ws://${window.location.host}/chat`);
  const btn = document.getElementById('btn');
  const inputEl = document.querySelector('#input');
  const chatEl = document.querySelector('#chat');

  const adj = [
    '멋진',
    '잘생긴',
    '예쁜',
    '졸린',
    '우아한',
    '힙한',
    '배고픈',
    '집에 가기 싫은',
    '집에 가고 싶은',
    '귀여운',
    '중후한',
    '똑똑한',
    '이게 뭔가 싶은',
    '까리한',
    '프론트가 하고 싶은',
    '백엔드가 재미 있는',
    '몽고 디비 날려 먹은',
    '열심히하는',
    '피곤한',
    '눈빛이 초롱초롱한',
    '치킨이 땡기는',
    '술이 땡기는',
  ];

  const member = [
    '어피치님',
    '프로도님',
    '라이언님',
    '네오님',
    '무지님',
    '튜브님',
    '제이지님',
    '아구몬님',
    '코로몬님',
    '그레이몬님',
    '마자용님',
    '워그레이몬',
    '메타몽님',
    '가루몬님',
    '파피몬님',
    '피카츄님',
    '푸린님',
    '아리님',
    '알리스타님',
    '유미님',
  ];

  const bootColor = [
    { bg: 'bg-primary', text: 'text-white' },
    { bg: 'bg-success', text: 'text-white' },
    { bg: 'bg-warning', text: 'text-black' },
    { bg: 'bg-info', text: 'text-white' },
    { bg: 'alert-primary', text: 'text-black' },
    { bg: 'alert-secondary', text: 'text-black' },
    { bg: 'alert-success', text: 'text-black' },
    { bg: 'alert-danger', text: 'text-black' },
    { bg: 'alert-warning', text: 'text-black' },
    { bg: 'alert-info', text: 'text-black' },
  ];

  function pickRandomArr(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  const nickName = `${pickRandomArr(adj)} ${pickRandomArr(member)}`;
  const thema = pickRandomArr(bootColor);

  btn?.addEventListener('click', () => {
    const msg = inputEl.value;
    const data = {
      name: nickName,
      msg,
      bg: thema.bg,
      text: thema.text,
    };
    socket.send(JSON.stringify(data));
    inputEl.value = '';
  });
  //enter key 누르면 채팅 게시
  inputEl.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      btn.click();
    }
  });

  socket.addEventListener('open', () => {
    // socket.send('안녕하세요 저는 클라이언트에요!');
  });

  const chats = [];

  function drawChats(type, data) {
    if (type === 'sync') {
      chatEl.innerHTML = '';
      chats.forEach(({ name, msg, bg, text }) => {
        const msgEl = document.createElement('p');
        msgEl.classList.add('p-2');
        msgEl.classList.add(bg);
        msgEl.classList.add(text);
        msgEl.classList.add('fw-bold');
        msgEl.innerText = `${name} : ${msg}`;
        chatEl.appendChild(msgEl);
        chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
      });
    } else if (type === 'chat') {
      const msgEl = document.createElement('p');
      msgEl.classList.add('p-2');
      msgEl.classList.add(data.bg);
      msgEl.classList.add(data.text);
      msgEl.classList.add('fw-bold');
      msgEl.innerText = `${data.name} : ${data.msg}`;
      chatEl.appendChild(msgEl);
      chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
    }
  }
  socket.addEventListener('message', (event) => {
    const msgData = JSON.parse(event.data);
    const { type, data } = msgData;

    if (msgData.type === 'sync') {
      const oldChats = data.chatsData;
      chats.push(...oldChats);
      drawChats(msgData.type, data);
    } else if (msgData.type === 'chat') {
      chats.push(data);
      drawChats(msgData.type, data);
    }
  });
})();

/* const adj = [
  '멋진',
  '잘생긴',
  '예쁜',
  '졸린',
  '우아한',
  '힙한',
  '배고픈',
  '집에 가기 싫은',
  '집에 가고 싶은',
  '귀여운',
  '중후한',
  '똑똑한',
  '이게 뭔가 싶은',
  '까리한',
  '프론트가 하고 싶은',
  '백엔드가 재미 있는',
  '몽고 디비 날려 먹은',
  '열심히하는',
  '피곤한',
  '눈빛이 초롱초롱한',
  '치킨이 땡기는',
  '술이 땡기는',
];

const member = [
  '어피치님',
  '프로도님',
  '라이언님',
  '네오님',
  '무지님',
  '튜브님',
  '제이지님',
  '아구몬님',
  '코로몬님',
  '그레이몬님',
  '마자용님',
  '워그레이몬',
  '메타몽님',
  '가루몬님',
  '파피몬님',
  '피카츄님',
  '푸린님',
  '아리님',
  '알리스타님',
  '유미님',
];

const bootColor = [
  { bg: 'bg-primary', text: 'text-white' },
  { bg: 'bg-success', text: 'text-white' },
  { bg: 'bg-warning', text: 'text-black' },
  { bg: 'bg-info', text: 'text-white' },
  { bg: 'alert-primary', text: 'text-black' },
  { bg: 'alert-secondary', text: 'text-black' },
  { bg: 'alert-success', text: 'text-black' },
  { bg: 'alert-danger', text: 'text-black' },
  { bg: 'alert-warning', text: 'text-black' },
  { bg: 'alert-info', text: 'text-black' },
];

// IIFE
(() => {
  const socket = new WebSocket(`ws://${window.location.host}/chat`);
  const btnEl = document.getElementById('btn');
  const inputEl = document.getElementById('input');
  const chatEl = document.getElementById('chat');

  const chats = [];

  function pickRandom(arr) {
    const index = Math.floor(Math.random() * arr.length);
    console.log(index);
    return arr[index];
  }

  function drawChats(type, data) {
    if (type === 'sync') {
      chatEl.innerHTML = '';
      chats.forEach(({ name, msg, bg, textColor }) => {
        const msgEl = document.createElement('p');
        msgEl.innerText = `${name}: ${msg}`;
        msgEl.classList.add('p-2');
        msgEl.classList.add(bg);
        msgEl.classList.add('fw-bold');
        msgEl.classList.add(textColor);
        chatEl?.appendChild(msgEl);
        chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
      });
    } else if (type === 'chat') {
      const msgEl = document.createElement('p');
      msgEl.innerText = `${data.name}: ${data.msg}`;
      msgEl.classList.add('p-2');
      msgEl.classList.add(data.bg);
      msgEl.classList.add('fw-bold');
      msgEl.classList.add(data.textColor);
      chatEl?.appendChild(msgEl);
      chatEl.scrollTop = chatEl.scrollHeight - chatEl.clientHeight;
    }
  }

  const nickName = pickRandom(adj) + ' ' + pickRandom(member);
  const theme = pickRandom(bootColor);

  btnEl?.addEventListener('click', () => {
    const msg = inputEl?.value;
    const data = {
      name: nickName,
      msg: msg,
      bg: theme.bg,
      textColor: theme.text,
    };
    socket.send(JSON.stringify(data));
    inputEl.value = '';
  });

  inputEl?.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) btnEl.click();
  });

  socket.addEventListener('message', (event) => {
    const msgData = JSON.parse(event.data);
    const { type, data } = msgData;

    if (type === 'sync') {
      const oldChats = data.chatsData;
      chats.push(...oldChats);
      drawChats(type, data);
    } else if (type === 'chat') {
      chats.push(data);
      drawChats(type, data);
    }
  });
})(); */
