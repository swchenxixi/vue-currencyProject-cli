export default class BasicWebsocket {
  constructor(url, callback) {
    this.callback = callback;
    this.url = url;
    this.websocketReconnectCount = 0;
    this.webSocketReconnectMaxCount = 5;
    this.websocketIsOpen = false;
    this.connectable = true;
    this.websocketInit();
  }
  websocketInit() {
    let userId = JSON.parse(localStorage.getItem('user')).userId;
    this.websocket = new WebSocket(this.url + userId);
    this.websocket.onopen = () => {
      this.websocketHandleOpen();
    };
    this.websocket.onclose = () => {
      this.websocketHandleClose();
    };
    this.websocket.onerror = error => {
      this.websocketHandleError(error);
    };
    //监听websocket消息
    this.websocket.onmessage = event => {
      this.websocketHandleMesssage(event);
    };
  }
  websocketHandleOpen() {
    console.log('连接打开');
    // 清空重连的次数
    this.websocketReconnectCount = 0;
    this.websocketIsOpen = true;
    this.websocketSend('初始化连接');
    this.websocketPing();
  }
  websocketHandleClose() {
    console.log('连接断开');
    this.websocketClose();
  }
  websocketHandleError(error) {
    console.log('连接报错：', error);
    // 关闭心跳
    this.websocketClose();
  }
  websocketHandleMesssage(event) {
    let { data } = event;
    let _data = JSON.parse(data);
    this.callback(_data);
  }
  websocketSend(params) {
    this.websocket.send(params);
  }
  websocketPing() {
    this.websocketPingTimer = setTimeout(() => {
      if (!this.websocketIsOpen) {
        return false;
      }
      this.websocketSend('心跳');
      clearTimeout(this.websocketPingTimer);
      //重新执行
      this.websocketPing();
    }, 10000);
  }
  websocketReconnect() {
    if (this.websocketIsOpen) {
      return false;
    }
    if (!this.connectable) {
      return false;
    }

    this.websocketReconnectCount += 1;
    // 判断是否到了最大重连次数
    if (this.websocketReconnectCount >= this.webSocketReconnectMaxCount) {
      console.log(
        '重连次数：' + this.websocketReconnectCount,
        this.webSocketReconnectMaxCount
      );
      return false;
    }
    this.websocketInit();
    // 每5秒尝试一次，检查是否连接成功
    let timer = setTimeout(() => {
      this.websocketReconnect();
      clearTimeout(timer);
    }, 5000);
  }
  websocketClose() {
    // 修改状态为未连接
    this.websocketIsOpen = false;
    this.websocket = null;
    this.websocketReconnect();
  }
}
