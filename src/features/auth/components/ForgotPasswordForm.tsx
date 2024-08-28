import { ForgotPasswordRequest } from '../../../types/ICredentails';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    onSubmit: (request: ForgotPasswordRequest) => void;
    isLoading: boolean;
};

const schema = z.object({
    email: z.string().min(5, 'Email is required').email('Invalid email address')
});

/**
 * It handles user forgot password form rendering and validation.
 * It uses `react-hook-form` with `zod` for schema validation and displays
 * errors accordingly.
 *
 * @component
 * @param {Props} props - Props including onSubmit function and loading state.
 */
const ForgotPasswordForm: React.FC<Props> = ({ onSubmit, isLoading }: Props) => {
    const { register, handleSubmit, formState, getFieldState } = useForm<ForgotPasswordRequest>({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });

    const isFieldValid = (fieldName: keyof ForgotPasswordRequest): boolean =>
        getFieldState(fieldName, formState).isTouched &&
        !getFieldState(fieldName, formState).invalid;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="row g-3">
                <small className="form-text text-muted">
                    Please enter the email address associated with your account. We will send you a
                    link to reset your password.
                </small>
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
                            placeholder="Enter your registered email address"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">{formState.errors.email?.message}</div>
                    </div>
                </div>
            </div>
            <div className="col mt-3">
                <button
                    disabled={!formState.isValid || formState.isSubmitting || isLoading}
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
                        {formState.isSubmitting || isLoading ? 'Loading...' : 'Reset Password'}
                    </span>
                </button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
