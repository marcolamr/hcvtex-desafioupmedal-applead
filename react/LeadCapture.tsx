import React, { useState } from 'react'
import axios from 'axios';

import styles from './style/form.css';

interface LeadCaptureProps {}

const LeadCapture: StorefrontFunctionComponent<LeadCaptureProps> = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePhoneChange = (event: any) => setPhone(event.target.value);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let client = { name, email, phone };
    axios.post('https://g88zmlbde4.execute-api.us-east-1.amazonaws.com/v3/clients', client)
        .then(() => {
          setSuccess(true);
        })
        .catch(error => {
          setSuccess(false);
          setMessage(error.statusText);
        });

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="flex justify-center pv4 ph3 bg-base--inverted">
      <form onSubmit={handleSubmit} className={styles.leadForm}>
        <div className="measure">
          <input value={name} onChange={handleNameChange} placeholder="Seu nome" id="name" className="input-reset ba b--black-20 pa2 mb5 db w-100" type="text" aria-describedby="name-desc" />
        
          <input value={email} onChange={handleEmailChange} placeholder="Seu melhor e-mail" id="email" className="input-reset ba b--black-20 pa2 mb5 db w-100" type="email" aria-describedby="email-desc" />

          <input value={phone} onChange={handlePhoneChange} placeholder="Seu telefone" id="phone" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="tel" aria-describedby="email-desc" />
        
          <div className="mt5">
          <a className="f6 link dim tc br2 ph5 pv5 mb2 dib white bg-success w-100" href="#" onClick={handleSubmit}>CADASTRAR</a>
          </div>
          
          {success &&
          <p className="white">Cadastro realizado com sucesso!</p>
          }

          {message &&
          <p className="white">{message}</p>
          }
        </div>
      </form>
    </div>
  );
}

LeadCapture.schema = {
  title: '',
  description: '',
  type: '',
  properties: {},
}

export default LeadCapture
