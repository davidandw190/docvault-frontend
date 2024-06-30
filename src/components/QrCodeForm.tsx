import { Link, useNavigate } from 'react-router-dom';

import { IResponse } from '../models/IResponse';
import { QrCodeRequest } from '../models/ICredentails';
import { useForm } from 'react-hook-form';
import { userAPI } from '../services/UserService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const qrCodeSchema = z.object({
  qrCode1: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  qrCode2: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  qrCode3: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  qrCode4: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  qrCode5: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  qrCode6: z
    .string()
    .min(1, 'QR Code is required')
    .max(1, 'Only one digut per input'),
  userId: z.string().min(5, 'User ID is required'),
});

const QrCodeForm: React.FC = () => {
  const navigate = useNavigate();

  const [verifyQrCode, { data: response, isLoading, error, isSuccess }] =
    userAPI.useVerifyMfaQrCodeMutation();

  const {
    register,
    handleSubmit,
    formState: form,
    getFieldState,
  } = useForm<QrCodeRequest>({
    resolver: zodResolver(qrCodeSchema),
    mode: 'onTouched',
  });

  const onVerifyQrCode = async (qrCode: QrCodeRequest) => {
    qrCode = {
      ...qrCode,
      qrCode: `${qrCode.qrCode1}${qrCode.qrCode2}${qrCode.qrCode3}${qrCode.qrCode4}${qrCode.qrCode5}${qrCode.qrCode6}`,
    };
    await verifyQrCode(qrCode);
  };

  const isFieldValid = (fieldName: keyof QrCodeRequest): boolean =>
    getFieldState(fieldName, form).isTouched &&
    !getFieldState(fieldName, form).invalid;

  return (
    <div className="container mtb">
      <div className="row justify-content-center mt-7">
        <div className="col-lg-5 text-center">
          <a href="index.html">
            <img src="assets/img/svg/logo.svg" alt="" />
          </a>
          <div className="card mt-5">
            <div className="card-body">
              <h4 className="mb-3">2-Step Verification</h4>
            </div>

            {error && (
              <div className="alert alert-dismissible alert-danger">
                {'data' in error
                  ? (error?.data as IResponse<void>).message
                  : 'An error occurred. Please try again later.'}
              </div>
            )}
            <hr />

            <div className="svg-icon svg-icon-xl text-purple">
              <i className="bi bi-lock fs-3 text"></i>
            </div>

            <form
              onSubmit={handleSubmit(onVerifyQrCode)}
              className="needs-validation"
              noValidate
            >
              <label className="form-label">Please enter QR code</label>
              <div className="row mt-4 pt-2">
                <input
                  type="hidden"
                  {...register('userId')}
                  defaultValue={response?.data.user.userId}
                  name="userId"
                  id="userId"
                  disabled={false}
                  required
                />
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode1')}
                    name="qrCode1"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode1 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode1')} ? 'is-valid': ''`}
                    id="qrCode1"
                    disabled={false}
                    required
                    maxLength={1}
                    autoFocus
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode2')}
                    name="qrCode2"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode2 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode2')} ? 'is-valid': ''`}
                    id="qrCode2"
                    disabled={false}
                    required
                    maxLength={1}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode3')}
                    name="qrCode3"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode3 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode3')} ? 'is-valid': ''`}
                    id="qrCode3"
                    disabled={false}
                    required
                    maxLength={1}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode4')}
                    name="qrCode4"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode4 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode4')} ? 'is-valid': ''`}
                    id="qrCode4"
                    disabled={false}
                    required
                    maxLength={1}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode5')}
                    name="qrCode5"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode2 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode5')} ? 'is-valid': ''`}
                    id="qrCode5"
                    disabled={false}
                    required
                    maxLength={1}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    {...register('qrCode6')}
                    name="qrCode6"
                    className={`form-control text-center ' 
                      ${form.errors.qrCode6 ? 'is-invalid' : ''} 
                      ${isFieldValid('qrCode6')} ? 'is-valid': ''`}
                    id="qrCode6"
                    disabled={false}
                    required
                    maxLength={1}
                  />
                </div>
              </div>

              <div className="col mt-3">
                <button
                  disabled={!form.isValid || form.isSubmitting || isLoading}
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  {(form.isSubmitting || isLoading) && (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span role="status">
                    {form.isSubmitting || isLoading ? 'Loading...' : 'Verify'}
                  </span>
                </button>
              </div>
            </form>

            <hr className="my-3" />

            <div className="row mb-3">
              <div className="col d-flex justify-content-start">
                <div className="btn btn-outline-light">
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    Create an Account
                  </Link>
                </div>
              </div>
              <div className="col d-flex justify-content-end">
                <div className="link-dark">
                  <Link to="/resetpassword">Forgot password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeForm;
