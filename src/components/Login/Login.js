import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../authContext/AuthContext';

const emailreducerFn = (state, action) => {
  if (action.type == "emailUser_Input") { return { value: action.val, isValid: action.val.includes("@") }; }
  else if (action.type == "emailBlur_effect") {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  else
    return { value: "", isValid: false };
}

const passwrdreducerFn = (state, action) => {
  if (action.type == "pwdUser_Input") { return { value: action.val, isValid: action.val.trim().length > 6 }; }
  else if (action.type == "pwdBlur_effect") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  else
    return { value: "", isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const pswrdRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailreducerFn, { value: "", isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwrdreducerFn, { value: "", isValid: null });

  const { isValid: emailValidState } = emailState;
  const { isValid: passwordValidState } = passwordState;

  useEffect(() => {
    const timeinterval = setTimeout(() => {
      console.log("validation");
      setFormIsValid(
        emailValidState && passwordValidState)
    }
      , 500)

    return () => {
      console.log("clear effect");
      clearTimeout(timeinterval);
    }
  }, [emailValidState, passwordValidState])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "emailUser_Input", val: event.target.value });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    // setFormIsValid(emailValidState && passwordValidState) 

    //  when we try to change state value based on some other states which may not be contain latest values
    //  so for this cases emailValidState and passwordValidSate is not latest one to avoid this cases will use useEffect which ensures
    //  latest values.

    dispatchPassword({ type: "pwdUser_Input", val: event.target.value });

  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: "emailBlur_effect" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "pwdBlur_effect" });

  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value,passwordState.value);
    if (formIsValid)
      ctx.onLogin(emailState.value, passwordState.value);
    else if (!emailValidState)
      emailRef.current.focusInput();
    else if(!passwordValidState)
       pswrdRef.current.focusInput();
    // else {
    //   emailRef.current.focusInput(); //defined in Input bind to activate() to focus input field.
    //   pswrdRef.current.focusInput();
    // }
      
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input ref={emailRef} isValid={emailState.isValid} label="E-Mail" id="email" type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}>
        </Input>
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
         */}
        <Input ref={pswrdRef} isValid={passwordState.isValid} label="Password" id="password" type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}>
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            {/* removed disabled property from Login btn and now focus on invalid values - disabled={!formIsValid} */}
            Login
          </Button>
          {/* Now we will create ref to input fields and based on validity of input field we will focus on input fields */}
          {/* we will pass ref to Input Component */}
        </div>
      </form>
    </Card>
  );
};

export default Login;
