import { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

import MockApi from '../apis/mock_api';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Detail() {

  const navigate = useNavigate();
  const params = useParams();

  const [customer, setCustomer] = useState({firstName: '', lastName: '', iAgree: false});

  useEffect(() => {
    if (params.id !== '0') {
      const getCustomer = async () => {
        try {
          const result = await MockApi.getbyid(params.id);
          setCustomer(result.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      getCustomer();
    }
  }, [])

  const saveData = async () => {
    try {
      if (params.id === 0) {
        await MockApi.post(customer);
        navigate('/');
      } else {
        await MockApi.put(customer);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' onChange={(e) => setCustomer({...customer, firstName: e.target.value})} defaultValue={customer.firstName}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' onChange={(e) => setCustomer({...customer, lastName: e.target.value})} defaultValue={customer.lastName}/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' onChange={(e, data) => setCustomer({...customer, iAgree: data.checked})} checked={customer.iAgree}/>
        </Form.Field>
        <Button type='button' onClick={saveData}>
          Submit
          </Button>
      </Form>
    </div>
  )
}
