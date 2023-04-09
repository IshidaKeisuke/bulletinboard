// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Box, Button, Container, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";

// import { checkAuth } from "@/lib/firebase/auth";
// import { initialUserName } from "@/lib/features/user/user";
// import { getUser } from "@/lib/hasura/user";
// import firebase from "../lib/firebase/firebsae_config"

// const MainContainer = styled(Container)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//   height: "calc(100vh - 64px)", // subtract header height
// }));

// const LogoContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   marginBottom: theme.spacing(4),
// }));


// const Tagline = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(4),
//   textAlign: "center",
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(1),
// }));

// export default function HomePage() {
//   const authStatus = checkAuth();
//   const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
//       if (user) {
//         console.log(user);
        
//         // onUserCreated(user)
//       } else {
//         setCurrentUser(null);
//         setUsername("");
//       }
//     });
//     return unsubscribe;
//   }, []);

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
// }

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { checkAuth } from "@/lib/firebase/auth";
import { initialUserName } from "@/lib/features/user/user";
import { getUser } from "@/lib/hasura/user";
import firebase from "../lib/firebase/firebsae_config"

const sendEmail = async (email: string, setEmailForSignIn: (email: string) => void) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/posts",
    handleCodeInApp: true,
  };

  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
  setEmailForSignIn(email);
};

const signUpWithEmailAndPassword = async (email: string, password: string) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

const LoginWithEmailLink = () => {
  const [emailForSignIn, setEmailForSignIn] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [username, setUsername] = useState("");
  const authStatus = checkAuth();

  const MainContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "calc(100vh - 64px)", // subtract header height
  }));

  const LogoContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  }));


  const Tagline = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    textAlign: "center",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

  useEffect(() => {
    const checkAuth = async () => {
      const email = emailForSignIn;
      if (email && firebase.auth().isSignInWithEmailLink(window.location.href)) {
        firebase
          .auth()
          .signInWithEmailLink(window.location.href, email)
          .then((result) => {
            console.log("signed in");
          })
          .catch((error) => {
            console.log("error signing in", error);
          });
        setEmailForSignIn(null);
      }
    };
    checkAuth();
  }, [emailForSignIn]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        setUsername(user.displayName ?? "");
      } else {
        setCurrentUser(null);
        setUsername("");
      }
    });
    return unsubscribe;
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await signUpWithEmailAndPassword(email, password);
    sendEmail(email, setEmailForSignIn);
  };

  if (authStatus === "checking") {
		return <div>Checking Authentication Status...</div>;
	}

  if(authStatus == "notloggedin"){
    return (
      <>
        <header>
          {/* your header code here */}
        </header>
        <MainContainer>
          <LogoContainer>
            <img src="https://s3.amazonaws.com/www-inside-design/uploads/2019/05/woolmarkimagelogo-1024x576.png" alt="My Logo" />
          </LogoContainer>
          <Tagline variant="h4">Introducing My Product</Tagline>
          <Link href="/auth/signup" className="text-inherit no-underline">
              <StyledButton variant="contained" size="large" color="primary">
                Get Started
              </StyledButton>
          </Link>
          <Link href="/about" passHref>
            <StyledButton variant="outlined" size="large" color="primary">
              Learn More
            </StyledButton>
          </Link>
  
        </MainContainer>
      </>
    );
  }
  return(
      <>
        <p>Hello, {username}</p>
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </>
  )

};

export default LoginWithEmailLink;
