import React, { useState, useEffect } from "react";
import "./Chats.css";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import Sidebar from "./sidebar";
import { Send } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import ChatMessage from "./ChatMessage";

const Chats = ({ setSelectedLink, link }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentChatType, setCurrentChatType] = useState("text");
  const [isLoading, setIsLoading] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatLog, setChatLog] = useState([]);
  const [currentResult, setCurrentResult] = useState("");
  const [responseFailed, setResponseFailed] = useState(false);

  useEffect(() => {
    setSelectedLink(link);
  });

  function handleChatInput(event) {
    const { target } = event;
    const { value } = target;
    setInputValue(value);
  }

  function clearInput() {
    setInputValue("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //set the current query in messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        query: inputValue,
        result: "",
        type: currentChatType,
        id: !messages.length ? 1 : messages.length + 1,
      },
    ]);
    let chatLogNew = [...chatLog, { user: "me", message: `${inputValue}` }];

    clearInput(); // Clear the input field
    setChatLog(chatLogNew); // Set the new chat log with user's input
    setIsLoading(true);

    const lastSix = chatLogNew.slice(Math.max(chatLogNew.length - 6, 0));
    const messages = lastSix.map((message) => message.message).join("\n");

    //call our api
    const apiResponse = await fetch(
      currentChatType === "text"
        ? "http://localhost:5500"
        : "http://localhost:5500/createimage",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: messages,
        }),
      }
    ).catch((error) => {
      // Show response failed error
      setResponseFailed(true);
      setIsLoading(false);
      throw new Error("API response was not okay");
    });

    setResponseFailed(false);

    const apiResponseResult = await apiResponse.json();
    if (apiResponseResult && apiResponseResult.data) {
      setChatLog([
        ...chatLogNew,
        { user: "gpt", message: `${apiResponseResult.data}` },
      ]);
      setCurrentResult(apiResponseResult.data);
      setIsLoading(false);
    }

    console.log(apiResponseResult);
  }

  useEffect(() => {
    if (currentResult) {
      let cpyMessages = [...messages];
      const findLatestId = Math.max(...messages.map((item) => item.id));
      const findLastMessage = cpyMessages.findIndex(
        (item) => item.id === findLatestId
      );

      cpyMessages[findLastMessage] = {
        ...cpyMessages[findLastMessage],
        result: currentResult,
      };

      setMessages(cpyMessages);
      setInputValue("");
      setCurrentResult("");
    }
  }, [currentResult]);

  console.log(currentChatType);

  return (
    <Stack
      direction={"row"}
      height="95vh"
      sx={{
        padding: "5px 2px",
      }}
    >
      <Box
        sx={{
          // overflowY: "auto",
          flex: "1",
          position: "relative",
          padding: "0",
        }}
      >
        <Box
          sx={{
            height: "calc(100% - 100px)",
            overflow: "auto",
          }}
        >
          {messages && messages.length > 0
            ? chatLog.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isLastMessage={index === chatLog.length - 1}
                />
              ))
            : // messages.map((item) => (
              //     <Box>
              //       <Box
              //         sx={{
              //           padding: "20px 120px",
              //         }}
              //       >
              //         <Typography
              //           sx={{
              //             color: "#000",
              //           }}
              //         >
              //           {item.query}
              //         </Typography>
              //       </Box>
              //       {item.result !== "" ? (
              //         <Box
              //           sx={{
              //             padding: "20px 120px",
              //             border: "1px solid rgba(0,0,0,.1)",
              //           }}
              //         >
              //           {item.type === "text" ? (
              //             <Typography
              //               sx={{
              //                 color: "",
              //               }}
              //             >
              //               {item.result}
              //             </Typography>
              //           ) : (
              //             <img
              //               style={{
              //                 width: "200px",
              //               }}
              //               src={item.result}
              //               alt="Image"
              //             />
              //           )}
              //         </Box>
              //       ) : null}
              //     </Box>
              //   ))
              null}
          {isLoading === true && (
            <div className="circular-progress">
              <CircularProgress style={{ color: "#b3befe" }} />
            </div>
          )}
        </Box>
        <Paper
          component={"form"}
          sx={{
            // position: "relative",
            zIndex: 2,
            borderRadius: "8px",
            border: "1px solid #e3e3e3",
            position: "absolute",
            overflow: "hidden",
            bottom: "5px",
            width: { xs: "100%", sm: "80%", md: "80%", lg: "80%" },
            marginLeft: "auto",
            marginRight: "auto",
            left: "0px",
            right: "0px",
            display: "flex",
            boxShadow:
              "0 0  transparent, 0 0 transparent, 0 0 10px rgba(0,0,0,.1)",
            padding: "8px 12px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{
              "& fieldset": { border: "none" },
            }}
            inputProps={{ style: { fontSize: 16 } }}
            id="chat-input"
            label="Type Something"
            fullWidth
            value={inputValue}
            onChange={handleChatInput}
          />
          {/* <input
            name="chat-input"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#000",
            }}
            value={inputValue}
            onChange={handleChatInput}
          /> */}
          <IconButton
            type="submit"
            sx={{
              p: "10px",
            }}
          >
            <Send />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Chats;
