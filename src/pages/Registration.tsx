import { IRegistrationRequest } from '../models/ICredentails';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userAPI } from '../services/UserService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
  password: z.string().min(5, 'Password is required'),
  confirmPassword: z.string().min(5, 'Password is required'),
});

const Registration: React.FC = () => {
  const [registerUser, { data: response, isLoading, error, isSuccess }] =
    userAPI.useRegisterUserMutation;

  const { register, reset, handleSubmit, formState, getFieldState } =
    useForm<IRegistrationRequest>({
      resolver: zodResolver(registrationSchema),
      mode: 'onTouched',
    });

  const isFieldValid = (fieldName: keyof IRegistrationRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  const handleRegistration = async (credentials: IRegistrationRequest) =>
    await registerUser(credentials);

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

  return <p>Registration</p>;
};

export default Registration;
