import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "auto",
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  input: {
    marginBottom: "1rem",
  },
  submitButton: {
    marginTop: "1rem",
  },
}));
