import { IResetPasswordExternallyRequest } from '../../../types/ICredentails';
import PassStrengthBar from './PassStrengthBar';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    onSubmit: (payload: IResetPasswordExternallyRequest) => void;
    isLoading: boolean;
    userId: string;
};

const schema = z
    .object({
        newPassword: z.string().min(5, 'New password is required'),
        confirmPassword: z.string().min(5, 'New password confirmation is required'),
        userId: z.string().min(1, { message: 'User ID is required' })
    })
    .superRefine(({ newPassword, confirmPassword }, ctx) => {
        if (newPassword !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['confirmNewPassword'],
                message: "Passwords don't match. Please check again."
            });
        }
    });

/**
 * ResetPasswordForm component handles the input and submission of the reset password form.
 * It uses `react-hook-form` with `zod` for schema validation.
 * It also includes a password strength bar to show the strength of the password.
 **
 * @component
 * @param {Props} props - Props including the reset password function, loading state, and userId.
 */
const ResetPasswordForm: React.FC<Props> = ({ onSubmit, isLoading, userId }) => {
    const { register, handleSubmit, formState, getFieldState, reset, watch } =
        useForm<IResetPasswordExternallyRequest>({
            resolver: zodResolver(schema),
            mode: 'onTouched'
        });

    const isFieldValid = (fieldName: keyof IResetPasswordExternallyRequest): boolean =>
        getFieldState(fieldName, formState).isTouched &&
        !getFieldState(fieldName, formState).invalid;

    const onResetPassword = (payload: IResetPasswordExternallyRequest) => {
        onSubmit(payload);
        reset();
    };

    const [newPasswordStrength, setNewPasswordStrength] = useState(0);

    const newPassword = watch('newPassword', '');

    return (
        <form onSubmit={handleSubmit(onResetPassword)} className="needs-validation" noValidate>
            <input
                type="hidden"
                {...register('userId')}
                defaultValue={userId}
                name="userId"
                id="userId"
                required
            />
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="newPassword" className="form-label">
                        New Password
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-key"></i>
                        </span>
                        <input
                            type="password"
                            {...register('newPassword')}
                            name="newPassword"
                            className={`form-control ${
                                formState.errors.newPassword ? 'is-invalid' : ''
                            } ${
                                isFieldValid('newPassword') && newPasswordStrength >= 2
                                    ? 'is-valid'
                                    : ''
                            }`}
                            id="newPassword"
                            placeholder="New password"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">
                            {formState.errors?.newPassword?.message}
                        </div>
                    </div>
                    {newPassword && (
                        <PassStrengthBar
                            password={newPassword}
                            passwordStrength={newPasswordStrength}
                            setPasswordStrength={setNewPasswordStrength}
                        />
                    )}
                </div>
                <div className="col-12">
                    <label htmlFor="confirmNewPassword" className="form-label">
                        Confirm New Password
                    </label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">
                            <i className="bi bi-key"></i>
                        </span>
                        <input
                            type="password"
                            {...register('confirmNewPassword')}
                            name="confirmNewPassword"
                            className={`form-control ${
                                formState.errors.confirmNewPassword ? 'is-invalid' : ''
                            } ${isFieldValid('confirmNewPassword') ? 'is-valid' : ''}`}
                            id="confirmNewPassword"
                            placeholder="Confirm new password"
                            disabled={isLoading}
                            required
                        />
                        <div className="invalid-feedback">
                            {formState.errors?.confirmNewPassword?.message}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col mt-3">
                <button
                    disabled={
                        formState.isSubmitting ||
                        isLoading ||
                        !formState.isValid ||
                        newPasswordStrength < 3
                    }
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
                        {formState.isSubmitting || isLoading ? 'Loading...' : 'Update'}
                    </span>
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
