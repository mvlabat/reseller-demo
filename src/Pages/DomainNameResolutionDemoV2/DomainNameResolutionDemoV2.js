import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header';
import withStyles from '@material-ui/styles/withStyles';
import styles from '../../styles/app.styles';
import SendCrypto from './SendCrypto';
import Namicorn from 'namicorn';

const namicorn = new Namicorn();

const DomainNameResotionDemo = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState('');
  // const [resolvedAddress, setResolvedAddress] = useState('');
  const [availableWallets, setAvailableWallets] = useState();
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    if (domainName && step !== 1) setStep(1);
    if (cryptoAmount) setCryptoAmount('');
    if (dollarAmount) setDollarAmount('');
    if (error) setError('');
    if (domainName) resolve(domainName);
    // eslint-disable-next-line
  }, [domainName]);

  useEffect(() => {
    if (step === 0) {
      if (cryptoAmount) setCryptoAmount('');
      if (dollarAmount) setDollarAmount('');
      if (error) setError('');
      if (availableWallets) setAvailableWallets();
      if (domainName) setDomainName('');
      if (cryptoCurrency) setCryptoCurrency('');
    }
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    setError('');
    setCryptoAmount();
    setDollarAmount();
    if (
      availableWallets &&
      cryptoCurrency &&
      !availableWallets[cryptoCurrency]
    ) {
      setStep(1);
      setError(`Sorry this domain does not have ${cryptoCurrency} wallet`);
      return;
    } else if (
      availableWallets &&
      cryptoCurrency &&
      availableWallets[cryptoCurrency]
    ) {
      setStep(2);
    }
    // eslint-disable-next-line
  }, [availableWallets]);

  useEffect(() => {
    if (cryptoAmount) setStep(3);
  }, [cryptoAmount]);

  const handlePointer = () => {
    setPointer(!pointer);
  };

  const checkForErrors = domain => {
    return (
      domain.indexOf('.') > 0 &&
      /^((?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}\.)*(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/.test(
        domain
      )
    );
  };

  
  const resolve = async domain => {
    if (checkForErrors(domain)) {
      setSpinner(true);
      namicorn.resolve(domain)
        .then((resolution) => {
          setSpinner(false);
          if (resolution.meta.owner) {
            if (!Object.keys(resolution.addresses).length) {
              setError('Domain has no wallets connected to it');
            } else {
              setAvailableWallets(resolution.addresses);
            }
          } else {
            setError('Domain has no owner');
          }
        }
        )
        .catch(e => {
          setSpinner(false);
          setError('Server error, please try again later');
        });
    } else {
      setSpinner(false);
      setError('Invalid domain');
    }
  };

  return (
    <div className={classes.root}>
      <Header
        history={history}
        handlePointer={handlePointer}
        pointer={pointer}
        step={step}
        setDomainName={setDomainName}
        setStep={setStep}
      />
      <div className={classes.layout}>
        <SendCrypto
          domainName={domainName}
          setDomainName={setDomainName}
          step={step}
          setStep={setStep}
          showPointer={pointer}
          availableWallets={availableWallets}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          setCryptoAmount={setCryptoAmount}
          cryptoAmount={cryptoAmount}
          dollarAmount={dollarAmount}
          setDollarAmount={setDollarAmount}
          error={error}
          spinner={spinner}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(DomainNameResotionDemo);
