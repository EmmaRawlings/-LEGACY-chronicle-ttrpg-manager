import styles from './authentication-bar.module.css'
import React from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import { useSession, getSession, signOut, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

async function createUser(email, username, password, passwordConfirm) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, passwordConfirm }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#101010',
    borderColor: '#202020',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
};

export default function AuthenticationBar({ session }) {
  const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = React.useState(false);

  const emailInputRef = React.useRef();
  const usernameInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const passwordConfirmInputRef = React.useRef();
  const router = useRouter();

  async function performLogin(loginEmail, loginPassword) {
    // optional: Add validation
    const result = await signIn('credentials', {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    });

    if (!result.error) {
      router.reload(window.location.pathname)
    }
  }

  async function loginHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    performLogin(enteredEmail, enteredPassword);
  }

  async function signUpHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

    // optional: Add validation
    try {
      const result = await createUser(enteredEmail, enteredUsername, enteredPassword, enteredPasswordConfirm);
      console.log(result);
      setSignUpModalIsOpen(false);
      performLogin(enteredEmail, enteredPassword);
    } catch (error) {
      console.log(error);
    }
  }

  function logoutHandler() {
    signOut();
  }

  return <div className={styles.authenticationBar}>
    {!session && (<div></div>)}
    {session && (<div><b>{session.user.name}</b></div>)}
    {!session && (<div><a onClick={() => {setLoginModalIsOpen(true);}}>login</a> or <a onClick={() => {setSignUpModalIsOpen(true);}}>sign up</a></div>)}
    {session && (<div><Link href='/profile'>profile</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={logoutHandler}>log out</a></div>)}
    <Modal
      isOpen={loginModalIsOpen}
      onRequestClose={() => {setLoginModalIsOpen(false);}}
      contentLabel="Login Modal"
      style={modalStyles}
    >
      <form onSubmit={loginHandler} className={styles.loginForm}>
        <h3>Login</h3>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" placeholder="Enter Email" required ref={emailInputRef}/>

        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" required ref={passwordInputRef}/>
          
        <button>Login</button>
        {/*<label>
          <input type="checkbox" checked="checked" name="remember"/> Remember me
        </label>
        <span class="psw"><a href="#">Forgot password?</a></span>*/}
      </form>
    </Modal>
    <Modal
      isOpen={signUpModalIsOpen}
      onRequestClose={() => {setSignUpModalIsOpen(false);}}
      contentLabel="Sign Up Modal"
      style={modalStyles}
    >
      <form onSubmit={signUpHandler} className={styles.signUpForm}>
        <h3>Sign up</h3>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" placeholder="Enter Email" required ref={emailInputRef}/>

        <label htmlFor="username"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" required ref={usernameInputRef}/>

        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" required ref={passwordInputRef}/>

        <label htmlFor="passwordConfirm"><b>Confirm Password</b></label>
        <input type="password" placeholder="Enter Password" required ref={passwordConfirmInputRef}/>
          
        <button>Sign up</button>
        {/*<label>
          <input type="checkbox" checked="checked" name="remember"/> Remember me
        </label>*/}
      </form>
    </Modal>
  </div>

  return <div className={styles.authenticationBar}></div>
}