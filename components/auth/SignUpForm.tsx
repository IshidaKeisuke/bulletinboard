import { useState, useEffect } from "react";
import { SignUp } from "@/lib/firebase/auth";
import { Typography } from "@mui/material";
import { Container, StyledBox } from "@/styles/components/form/formStyle";
import { Form } from "../common/Form";
import { FormButton } from "../common/Button";
import Link from "next/link";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    SignUp(email, password)
  };

  return (
    <>
        <Container>
          <StyledBox>
          <Typography variant="h4" component="h1">
            新規登録
          </Typography>
          <form onSubmit={handleSubmit}>
            <Form
              required={true}
              type="email"
              label="メールアドレス"
              placeholder="example@ex.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form
              required={true}
              type="password"
              label="パスワード"
              placeholder="example"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
              <FormButton buttonName="登録する"></FormButton>
            </form>
          </StyledBox>
        </Container>
    </>
  );
};

//   if (authStatus === "checking") {
// 		return <div>Checking Authentication Status...</div>;
// 	}

//   if(authStatus == "notloggedin"){
//     return (
//       <>
//         <header>
//           {/* your header code here */}
//         </header>
//         <MainContainer>
//           <LogoContainer>
//             <img src="https://s3.amazonaws.com/www-inside-design/uploads/2019/05/woolmarkimagelogo-1024x576.png" alt="My Logo" />
//           </LogoContainer>
//           <Tagline variant="h4">Introducing My Product</Tagline>
//           <Link href="/auth/signup" className="text-inherit no-underline">
//               <StyledButton variant="contained" size="large" color="primary">
//                 Get Started
//               </StyledButton>
//           </Link>
//           <Link href="/about" passHref>
//             <StyledButton variant="outlined" size="large" color="primary">
//               Learn More
//             </StyledButton>
//           </Link>
  
//         </MainContainer>
//       </>
//     );
//   }
//   return(
//       <>
//         <p>Hello, {username}</p>
//         <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
//       </>
//   )
//   // return (
//   //   <div>
//   //     {currentUser ? (

//   //     ) : (
//   //       <>
//   //         <p>Please sign in.</p>
//   //         <button onClick={() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())}>Sign In with Google</button>
//   //       </>
//   //     )}
//   //   </div>
//   // );

