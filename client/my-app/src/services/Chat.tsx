import React, { useState } from "react";
import { useQuery, useMutation, useSubscription, gql } from "@apollo/client";
import { TextField, Button, List, ListItem, ListItemText, Container } from "@mui/material";

const GET_MESSAGES = gql`
  query GetMessages($receiverId: ID!) {
    messages(receiverId: $receiverId) {
      id
      content
      sender {
        username
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: ID!, $content: String!) {
    sendMessage(receiverId: $receiverId, content: $content) {
      id
      content
      sender {
        username
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageSent($receiverId: ID!) {
    messageSent(receiverId: $receiverId) {
      id
      content
      sender {
        username
      }
    }
  }
`;

const Chat = ({ receiverId }: { receiverId: string }) => {
  const [message, setMessage] = useState("");
  const { data, refetch } = useQuery(GET_MESSAGES, { variables: { receiverId } });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { receiverId },
    onData: ({ client, data }) => {
      client.cache.modify({
        fields: {
          messages(existingMessages = []) {
            return [...existingMessages, data.data.messageSent];
          },
        },
      });
    },
  });

  const handleSend = async () => {
    await sendMessage({ variables: { receiverId, content: message } });
    setMessage("");
    refetch();
  };

  return (
    <Container>
      <List>
        {data?.messages.map((msg: any) => (
          <ListItem key={msg.id}>
            <ListItemText primary={`${msg.sender.username}: ${msg.content}`} />
          </ListItem>
        ))}
      </List>
      <TextField fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
    </Container>
  );
};

export default Chat;
