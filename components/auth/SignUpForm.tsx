import { useState } from "react";
import { SignUp } from "@/lib/firebase/auth";
import { TextField, Button, Box, Paper, Typography } from "@material-ui/core/styles";
import { useStyles } from "@/styles/components/form/formStyle"

export const SignUpForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const result = await SignUp(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h4" component="h1" className={classes.title}>
        新規登録
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={classes.input}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submitButton}
        >
          登録する
        </Button>
      </form>
    </Paper>
  );
};
