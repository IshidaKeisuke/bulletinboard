import { useState } from "react";
import { Typography } from "@mui/material";
import { SignIn } from "@/lib/firebase/auth";
import { FormButton } from "../common/Button";
import { Container, StyledBox } from "@/styles/components/form/formStyle";
import { Form } from "../common/Form";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await SignIn(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <StyledBox>
        <Typography variant="h4" component="h1" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleSubmit}>
        <Form
            required={true}
            type="email"
            label="Email"
            placeholder="example@ex.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form
            required={true}
            type="password"
            label="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButton buttonName="ログインする" />
        </form>
      </StyledBox>
    </Container>
  );
};
