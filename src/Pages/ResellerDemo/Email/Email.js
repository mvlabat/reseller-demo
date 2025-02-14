import React, { useState } from 'react';
import Pointer from '../../../Utilities/Pointer';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import styles from '../../../styles/email.styles';
import SearchIcon from '@material-ui/icons/Search';
import helper from '../../../Utilities/Helpers';

const Email = ({
  classes,
  emailProps,
  email,
  ownerPublicKey,
  setOwnerPublicKey,
  setEmail,
  step,
  showPointer,
  setStep
}) => {
  const [emailError, setEmailError] = useState('');
  const isEmailValid = e => {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e
    );
  };

  const handleEmailChange = e => {
    if (emailError) setEmailError('');
    setEmail(e.target.value);
  };

  const handleOwnerChange = e => {
    if (emailError) setEmailError('');
    setOwnerPublicKey(e.target.value);
  };

  const handleSubmit = () => {

    if (helper.isValidFormat(ownerPublicKey)) {
      if (isEmailValid(email)) {
        setStep(3);
      } else {
        setEmailError('Incorrect email');
      }
    } else {
      setEmailError('Incorrect owner format');
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerDiv}>
        <Typography variant="h5" className={classes.bold}>
          Enter Email
        </Typography>
        <Button
          color="primary"
          className={classes.searchButton}
          onClick={() => {
            setStep(0);
          }}
        >
          <SearchIcon className={classes.searchIcon} />
          Search new
        </Button>
      </div>
      <div className={classes.domainDiv}>
        <div>
          <Typography className={classes.bold}>
            {emailProps.domain.name.split('.')[0]}
            <span className={classes.extension}>
              .{emailProps.domain.name.split('.')[1]}
            </span>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Domain is available
          </Typography>
        </div>
        <Typography color="primary" className={classes.bold}>
          ${emailProps.domain.reselling.price}.00
        </Typography>
      </div>

      {emailError ? (
        <div className={classes.errorDiv}>
          <Typography color="error" className={classes.errorMessage}>
            {emailError}
          </Typography>
        </div>
      ) : null}

      <Typography className={classes.lessBold}>
        Please provide an email address
      </Typography>
      <div className={classes.inputDiv}>
        {step === 2 && showPointer ? (
          <div style={{ position: 'fixed', transform: 'translateX(-40px)' }}>
            <Pointer />
          </div>
        ) : null}
        <InputBase
          placeholder="Your Email"
          className={classes.input}
          value={email}
          onChange={handleEmailChange}
          onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
        />
      </div>

      {emailProps.ownerPublicKey === '' ? (
        <>
          <Typography className={classes.lessBold}>
            Owner crypto address
          </Typography>
          <div className={classes.inputDiv}>
            <InputBase
              placeholder="Your ETH or ZIL public key"
              className={classes.input}
              value={ownerPublicKey}
              onChange={handleOwnerChange}
              onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
            />
          </div>
        </>
      ) : null}
      <Button
        onClick={() => handleSubmit()}
        color="primary"
        variant="contained"
        className={classes.button}
        disabled={!email || !ownerPublicKey}
      >
        Next
      </Button>
    </Paper>
  );
};
export default withStyles(styles)(Email);
