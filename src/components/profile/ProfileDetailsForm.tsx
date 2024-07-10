import { IUpdateProfileDetailsRequest, IUser } from '../../models/IUser';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  user: IUser | undefined;
  onUpdateProfileDetails: (request: IUpdateProfileDetailsRequest) => void;
  isUpdateLoading: boolean;
};

const schema = z.object({
  userId: z.string().min(3, 'User ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
  bio: z.string().min(5, 'Bio is required'),
  phone: z.string().min(5, 'Phone is required'),
});

const ProfileDetailsForm: React.FC<Props> = ({
  user,
  onUpdateProfileDetails,
  isUpdateLoading,
}: Props) => {
  const { register, handleSubmit, formState, getFieldState } =
    useForm<IUpdateProfileDetailsRequest>({
      resolver: zodResolver(schema),
      mode: 'onTouched',
    });

  const isFieldValid = (
    fieldName: keyof IUpdateProfileDetailsRequest
  ): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  return (
    <form
      onSubmit={handleSubmit(onUpdateProfileDetails)}
      className="needs-validation"
      noValidate
    >
      <div className="row g-3">
        <div className="col-sm-6">
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
              className={`form-control ' ${
                formState.errors.firstName ? 'is-invalid' : ''
              } ${isFieldValid('firstName') ? 'is-valid' : ''}`}
              placeholder="First name"
              defaultValue={user?.firstName}
              disabled={user?.role === 'USER'}
              required
            />
            <div className="invalid-feedback">
              {formState.errors.firstName?.message}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
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
              className={`form-control ' ${
                formState.errors.lastName ? 'is-invalid' : ''
              } ${isFieldValid('lastName') ? 'is-valid' : ''}`}
              placeholder="Last name"
              defaultValue={user?.lastName}
              disabled={user?.role === 'USER'}
              required
            />
            <div className="invalid-feedback">
              {formState.errors.lastName?.message}
            </div>
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
              className={`form-control ' ${
                formState.errors.email ? 'is-invalid' : ''
              } ${isFieldValid('email') ? 'is-valid' : ''}`}
              placeholder="Email"
              defaultValue={user?.email}
              disabled={user?.role === 'USER'}
              required
            />
            <div className="invalid-feedback">
              {formState.errors.email?.message}
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text">
              <i className="bi bi-telephone"></i>
            </span>
            <input
              type="text"
              {...register('phone')}
              className={`form-control ' ${
                formState.errors.phone ? 'is-invalid' : ''
              } ${isFieldValid('phone') ? 'is-valid' : ''}`}
              placeholder="123-456-7890"
              defaultValue={user?.phone}
              disabled={user?.role === 'USER'}
              required
            />
            <div className="invalid-feedback">
              {formState.errors.phone?.message}
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            className={`form-control ' ${
              formState.errors.bio ? 'is-invalid' : ''
            } ${isFieldValid('bio') ? 'is-valid' : ''}`}
            {...register('bio')}
            placeholder="Something about yourself here"
            defaultValue={user?.bio}
            disabled={user?.role === 'USER'}
            rows={3}
            required
          ></textarea>
          <div className="invalid-feedback">
            {formState.errors.bio?.message}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="col">
        <button
          disabled={
            !formState.isValid || formState.isSubmitting || isUpdateLoading
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

export default ProfileDetailsForm;
