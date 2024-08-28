import React, { useEffect, useState } from 'react';

import { IRegistrationRequest } from '../../../types/ICredentails';
import PassStrengthBar from './PassStrengthBar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    onRegistration: (credentials: IRegistrationRequest) => void;
    isLoading: boolean;
    isSuccess: boolean;
};

const registrationSchema = z
    .object({
        firstName: z.string().min(3, 'First name is required'),
        lastName: z.string().min(3, 'Last name is required'),
        email: z.string().min(3, 'Email address is required').email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
        confirmPassword: z.string().min(1, 'Password confirmation is required.')
    })
    .refine(formData => formData.password === formData.confirmPassword, {
        message: "Passwords don't match. Please check again.",
        path: ['confirmPassword']
    });

/**
 * RegistrationForm component handles the input and submission of the registration form.
 * It uses `react-hook-form` with `zod` for schema validation.
 * It also includes a password strength bar to show the strength of the password.
 *
 * @component
 * @param {Props} props - Props including the registration function, loading state, and success state.
 */
const RegistrationForm: React.FC<Props> = ({ onRegistration, isLoading, isSuccess }: Props) => {
    const { register, reset, handleSubmit, formState, getFieldState, watch } =
        useForm<IRegistrationRequest>({
            resolver: zodResolver(registrationSchema),
            mode: 'onTouched'
        });

    const [passwordStrength, setPasswordStrength] = useState(0);

    const isFieldValid = (fieldName: keyof IRegistrationRequest): boolean =>
        getFieldState(fieldName, formState).isTouched &&
        !getFieldState(fieldName, formState).invalid;

    useEffect(() => {
        reset();
    }, [isSuccess, reset]);

    const password = watch('password', '');

    return (
        <form onSubmit={handleSubmit(onRegistration)} className="needs-validation" noValidate>
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                        First name
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-person-vcard"></i>
                        </span>
                        <input
                            type="text"
                            {...register('firstName')}
                            name="firstName"
                            className={`form-control ${
                                formState.errors.firstName ? 'is-invalid' : ''
                            } ${isFieldValid('firstName') ? 'is-valid' : ''}`}
                            id="firstName"
                            placeholder="First name"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">
                            {formState.errors.firstName?.message}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                        Last name
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-person-vcard"></i>
                        </span>
                        <input
                            type="text"
                            {...register('lastName')}
                            name="lastName"
                            className={`form-control ${
                                formState.errors.lastName ? 'is-invalid' : ''
                            } ${isFieldValid('lastName') ? 'is-valid' : ''}`}
                            id="lastName"
                            placeholder="Last Name"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">{formState.errors.lastName?.message}</div>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <input
                            type="text"
                            {...register('email')}
                            name="email"
                            className={`form-control ${
                                formState.errors.email ? 'is-invalid' : ''
                            } ${isFieldValid('email') ? 'is-valid' : ''}`}
                            id="email"
                            placeholder="Email address"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">{formState.errors.email?.message}</div>
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-key"></i>
                        </span>
                        <input
                            type="password"
                            {...register('password')}
                            name="password"
                            className={`form-control ${
                                formState.errors.password ? 'is-invalid' : ''
                            } ${
                                isFieldValid('password') && passwordStrength >= 2 ? 'is-valid' : ''
                            }`}
                            placeholder="Password"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">{formState.errors.password?.message}</div>
                    </div>
                    {password && (
                        <PassStrengthBar
                            password={password}
                            passwordStrength={passwordStrength}
                            setPasswordStrength={setPasswordStrength}
                        />
                    )}
                </div>
                <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm password
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-key"></i>
                        </span>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            name="confirmPassword"
                            className={`form-control ${
                                formState.errors.confirmPassword ? 'is-invalid' : ''
                            } ${isFieldValid('confirmPassword') ? 'is-valid' : ''}`}
                            placeholder="Confirm password"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">
                            {formState.errors.confirmPassword?.message}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="col">
                <button
                    disabled={
                        formState.isSubmitting ||
                        isLoading ||
                        !formState.isValid ||
                        passwordStrength < 3
                    }
                    className="btn btn-primary"
                    type="submit"
                >
                    {(formState.isSubmitting || isLoading) && (
                        <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                        ></span>
                    )}
                    <span role="status">
                        {formState.isSubmitting || isLoading ? 'Loading...' : 'Register'}
                    </span>
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;
