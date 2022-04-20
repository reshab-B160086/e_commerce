import React from "react";
import { Button } from "@material-ui/core";
import {
  getAllPendingTickets,
  getAllPendingAssignedTickets,
  disconnectSocket,
} from "./Connection";
import { useState } from "react";

const Test1 = () => {
  const [ticketList, setTicketList] = useState([]);
  const filterObj = {
    employeeList: [0, 123, 456, 789, 43528, 543, 3116, 3115],
    // queueKeyList: [
    //   "bangalore",
    //   "CB",
    //   "chatbot",
    //   //"S_TQ",
    //   "C_Q",
    //   "fb",
    //   "E",
    //   "I",
    //   "key",
    //   "MIHUL_TEST_QUEUE",
    // ],
    //sourceType: "A",
  };

  const updatedCallBack = (data) => {
    console.log("updated callback", data);
  };

  const errorCallBack = () => {
    console.log("error callback");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          getAllPendingTickets(
            filterObj,
            (data) => updatedCallBack(data),
            () => errorCallBack()
          )
        }
      >
        Subscribe to All Pending Tickets
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          getAllPendingAssignedTickets(
            filterObj,
            (data) => updatedCallBack(data),
            () => errorCallBack()
          )
        }
      >
        Subscribe to All Pending Assigned Tickets
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => disconnectSocket()}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default Test1;
