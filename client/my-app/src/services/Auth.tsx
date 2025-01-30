import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { TextField, Button, Container, Typography } from "@mui/material";

const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [register] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.register.token);
      window.location.reload();
    },
  });

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      window.location.reload();
    },
  });

  const handleSubmit = () => {
    if (isLogin) {
      login({ variables: { username, password } });
    } else {
      register({ variables: { username, password } });
    }
  };

  return (
    <Container>
      <Typography variant="h4">{isLogin ? "Login" : "Register"}</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </Button>
      <Button color="secondary" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </Button>
    </Container>
  );
};

export default Auth;
