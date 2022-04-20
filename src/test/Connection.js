import SockJS from "sockjs-client";
import Stomp from "stompjs";

var globalObj = [];

var SUBSCRIBED_ALL_PENDING_TOPIC_URL =
  "/user/queue/dashboard/ticketLiveDashboard/allPending";

var SUBSCRIBED_ALL_PENDING_ASSIGNED_TOPIC_URL =
  "/user/queue/dashboard/ticketLiveDashboard/allPendingAssigned";

export const getAllPendingTickets = (
  filterObj,
  updateCallBack,
  errorCallBack
) => {
  getStompClient(function (client) {
    if (client === "ERROR") {
      errorCallBack();
      disconnectSocket();
    } else {
      let subscribeHeader = createSubscribeHeader(filterObj);
      console.log("client", client);
      client.subscribe(
        SUBSCRIBED_ALL_PENDING_TOPIC_URL,
        function (response) {
          let data = JSON.parse(response.body);
          console.log(data);
          //updated callBack
          updateCallBack(data);
        },
        subscribeHeader
      );
    }
  });
};

export const getAllPendingAssignedTickets = (
  filterObj,
  updatedCallBAck,
  errorCallBack
) => {
  getStompClient(function (client) {
    if (client === "ERROR") {
      errorCallBack();
      disconnectSocket();
    } else {
      let subscribeHeader = createSubscribeHeader(filterObj);
      client.subscribe(
        SUBSCRIBED_ALL_PENDING_ASSIGNED_TOPIC_URL,
        function (response) {
          let data = JSON.parse(response.body);
          console.log(data);
          //updated callBack
          updatedCallBAck(data);
        },
        subscribeHeader
      );
    }
  });
};

function getStompClient(callBack) {
  if (typeof globalObj[0] === "undefined") {
    const url = "/ms/auth/authenticate-user";
    fetch(url)
      .then((response) => {
        console.log(response);
        connectToSocket(response.session, callBack);
      })
      .catch((err) => {
        console.log(err);
        callBack("ERROR");
      });
  } else {
    callBack(globalObj[0]);
  }
}

function connectToSocket(key, callBack) {
  let socket = new SockJS("https://localhost:8089/socket");
  let stompClient = Stomp.over(socket);

  let header = {
    domain: window.location.hostname,
    session_key: key,
    dashboardViewId: generateDashboardViewId(10),
    clientDashType: "MULTISUBS",
  };
  stompClient.connect(
    header,
    function (frame) {
      globalObj[0] = stompClient;
      stompClient.subscribe("/user/queue/active", function (response) {
        stompClient.send("/app/pong", {}, JSON.stringify({ name: "Active" }));
      });
      stompClient.subscribe(
        "/user/queue/dashboard/ticketLiveDashboard",
        function (response) {
          // Default subscription to handle user in backend !!!
        }
      );
      callBack(stompClient);
    },
    function (error) {
      return callBack("ERROR");
    }
  );
}

function createSubscribeHeader(filterObj) {
  const {
    queueKeyList = null,
    employeeList = null,
    sourceType = "ALL",
  } = filterObj;
  let subscribeHeader = {
    queueKeyList: JSON.stringify(queueKeyList),
    employeeList: JSON.stringify(employeeList),
    sourceType: sourceType,
  };
  return subscribeHeader;
}

function generateDashboardViewId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const disconnectSocket = () => {
  if (typeof globalObj[0] !== "undefined") {
    globalObj[0].disconnect(function (frames) {
      delete globalObj[0];
    }, {});
  }
};
