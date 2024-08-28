import { LoginRequest } from '../../../types/credentails.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    password: z.string().min(5, 'Password is required')
});

type Props = {
    loginUser: (credentials: LoginRequest) => void;
    isLoading: boolean;
};

/**
 * It handles user login form rendering and validation.
 * It uses `react-hook-form` with `zod` for schema validation and displays
 * errors accordingly.
 *
 * @component
 * @param {Props} props - Props including loginUser function, error state, and loading state.
 */
const LoginForm = ({ loginUser, isLoading }: Props) => {
    const { register, handleSubmit, formState, getFieldState } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    const isFieldValid = (fieldName: keyof LoginRequest): boolean =>
        getFieldState(fieldName, formState).isTouched &&
        !getFieldState(fieldName, formState).invalid;

    const handleLogin = (credentials: LoginRequest) => loginUser(credentials);

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="needs-validation" noValidate>
            <div className="row g-3">
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
                            autoComplete="on"
                            className={`form-control ' ${
                                formState.errors.email ? 'is-invalid' : ''
                            } 
                        ${isFieldValid('email') ? 'is-valid' : ''}`}
                            id="email"
                            placeholder="Email address"
                            disabled={false}
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
                            autoComplete="on"
                            className={`form-control ' ${
                                formState.errors.password ? 'is-invalid' : ''
                            } ${isFieldValid('password') ? 'is-valid' : ''}`}
                            placeholder="Password"
                            disabled={false}
                            required
                        />
                        <div className="invalid-feedback">{formState.errors.password?.message}</div>
                    </div>
                </div>
            </div>
            <div className="col mt-3">
                <button
                    disabled={formState.isSubmitting || isLoading}
                    className="btn btn-primary btn-block"
                    type="submit"
                >
                    {(formState.isSubmitting || isLoading) && (
                        <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                        ></span>
                    )}
                    <span role="status">
                        {formState.isSubmitting || isLoading ? 'Loading...' : 'Login'}
                    </span>
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
