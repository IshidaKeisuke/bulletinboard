import { NextPage } from 'next';
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

const AfterSignUp: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2" align="center" gutterBottom>
            会員登録ありがとうございます！
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            認証メールを送信したので、認証を完了してからログインしてください
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" href="/auth/signin">
              ログイン画面へ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AfterSignUp;
