import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Form>
      <Form.Input
        label="Username"
        placeholder="Username.."
        name="username"
        type="username"
        values={values.username}
        required
      />
      <Form.Input
        label="Email"
        placeholder="Email.."
        name="email"
        type="email"
        values={values.email}
        required
      />
      <Form.Input
        label="Password"
        placeholder="Password.."
        name="Password"
        type="Password"
        values={values.password}
        required
      />
      <Form.Input
        label="Confirm Password"
        placeholder="Confirm Password.."
        name="confirmPassword"
        type="confirmPassword"
        values={values.confirmPassword}
        required
      />
      <Button>Register</Button>
    </Form>
  );
}

export default Register;
