import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  getAllPendingTickets,
  getAllPendingAssignedTickets,
  disconnectSocket,
} from "./Connection";

const Test = () => {
  const [ticketList, setTicketList] = useState([]);
  const filterObj = {
    employeeList: [0, 123, 456, 789, 43528, 543, 3115, 3116],
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
    //////////////////////////////////////////////////////
    fetch(
      "https://kapdemo.kapturecrm.com/api/version3/ticket/get-ticket-detail/id=&=&=ticket?id=241255911&ticket_id=6490519052&data_type=ticket",
      {
        method: "POST",
      }
    )
      .then((responseJson) => responseJson.json())
      .then((data) => console.log("datas", data))
      .catch((error) =>
        this.setState({
          isLoading: false,
          message: "Something bad happened " + error,
        })
      );

    /////////////
    ticketList.push(data);
    setTicketList([...ticketList]);
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

export default Test;
