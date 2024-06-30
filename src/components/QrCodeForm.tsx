import { QrCodeRequest } from '../models/ICredentails';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

  const {
    register,
    handleSubmit,
    formState: form,
    getFieldState,
  } = useForm<QrCodeRequest>({
    resolver: zodResolver(qrCodeSchema),
    mode: 'onTouched',
  });

  const isFieldValid = (fieldName: keyof QrCodeRequest): boolean =>
    getFieldState(fieldName, form).isTouched &&
    !getFieldState(fieldName, form).invalid;

  return (
    <div>
      <h1>QRCode Form Here</h1>
    </div>
  );
};

export default QrCodeForm;
