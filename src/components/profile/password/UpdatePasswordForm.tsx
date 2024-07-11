import { useEffect, useState } from 'react';

import { IUpdateUserPasswordRequest } from '../../../models/IUser';
import PassStrengthBar from '../../auth/PassStrengthBar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  userId: string;
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  onUpdatePassword: (data: IUpdateUserPasswordRequest) => void;
};

const schema = z
  .object({
    userId: z.string().min(3, { message: 'User ID is required' }),
    currentPassword: z
      .string()
      .min(5, { message: 'Current password is required' }),
    newPassword: z.string().min(5, { message: 'New password is required' }),
    confirmNewPassword: z
      .string()
      .min(5, { message: 'Confirmation of new password is required' }),
    password: z.string().min(5, { message: 'Password is required' }),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmNewPassword'],
        message: 'New password and confirmation do not match',
      });
    }
  });

const UpdatePasswordForm: React.FC<Props> = ({
  userId,
  isUpdateLoading,
  isUpdateSuccess,
  onUpdatePassword,
}: Props) => {
  const { register, handleSubmit, formState, getFieldState, reset, watch } =
    useForm<IUpdateUserPasswordRequest>({
      resolver: zodResolver(schema),
      mode: 'onTouched',
    });

  const isFieldValid = (fieldName: keyof IUpdateUserPasswordRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;
  useEffect(() => {
    reset();
  }, [isUpdateSuccess, userId, isUpdateLoading, reset]);

  const [newPasswordStrength, setNewPasswordStrength] = useState(0);
  const newPassword = watch('newPassword');

  return (
    <form
      onSubmit={handleSubmit(onUpdatePassword)}
      className="needs-validation"
      noValidate
    >
      <div className="row g-3">
        <input
          type="hidden"
          {...register('userId')}
          disabled={true}
          name="userId"
          value={userId}
          required
        />
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Current Password
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text">
              <i className="bi bi-key"></i>
            </span>
            <input
              type="password"
              {...register('currentPassword')}
              className={`form-control ' ${
                formState.errors.currentPassword ? 'is-invalid' : ''
              } ${isFieldValid('currentPassword') ? 'is-valid' : ''}`}
              name="password"
              placeholder="Current password"
              required
            />
            <div className="invalid-feedback">
              {formState.errors.currentPassword?.message}
            </div>
          </div>
        </div>
        <hr className="my-4" />
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
              className={`form-control ' ${
                formState.errors.newPassword ? 'is-invalid' : ''
              } ${
                isFieldValid('newPassword') && newPasswordStrength > 1
                  ? 'is-valid'
                  : ''
              }`}
              name="newPassword"
              placeholder="New password"
              required
            />
            <div className="invalid-feedback">
              {formState.errors.newPassword?.message}
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
          <label htmlFor="address" className="form-label">
            Confirm New Password
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text">
              <i className="bi bi-key"></i>
            </span>
            <input
              type="password"
              {...register('confirmNewPassword')}
              className={`form-control ' ${
                formState.errors.confirmNewPassword ? 'is-invalid' : ''
              } ${isFieldValid('confirmNewPassword') ? 'is-valid' : ''}`}
              name="confirmNewPassword"
              placeholder="Confirm new password"
              required
            />
            <div className="invalid-feedback">
              {formState.errors.confirmNewPassword?.message}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="col">
        <button
          disabled={
            !formState.isValid ||
            formState.isSubmitting ||
            isUpdateLoading ||
            newPasswordStrength < 2
          }
          className="btn btn-primary btn-block"
          type="submit"
        >
          {(formState.isSubmitting || isUpdateLoading || isUpdateLoading) && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span role="status">
            {formState.isSubmitting || isUpdateLoading
              ? 'Loading...'
              : 'Update'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
