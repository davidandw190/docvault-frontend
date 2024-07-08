import { useEffect } from "react";
import zxcvbn from "zxcvbn";

type Props = {
  password: string;
  passwordStrength: number;
  setPasswordStrength: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * PassStrengthBar component displays a password strength bar based on the
 * password strength score.
 * 
 * @component
 * @param {Props} props - Props including the password, password strength score,
 * and the setter function for the password strength score.
 */
const PassStrengthBar = ({ password, passwordStrength, setPasswordStrength }: Props) => {
  useEffect(() => {
    const strength = zxcvbn(password).score;
    setPasswordStrength(strength);
  }, [password, setPasswordStrength]);

  const passwordStrengthClass = () => {
    switch (passwordStrength) {
      case 0:
        return 'text-danger';
      case 1:
        return 'text-warning';
      case 2:
        return 'text-info';
      case 3:
        return 'text-primary';
      case 4:
        return 'text-success';
      default:
        return '';
    }
  };

  const progressBarClass = () => {
    switch (passwordStrength) {
      case 0:
        return 'bg-danger';
      case 1:
        return 'bg-warning';
      case 2:
        return 'bg-info';
      case 3:
        return 'bg-primary';
      case 4:
        return 'bg-success';
      default:
        return '';
    }
  };

  const passwordStrengthMessage = () => {
    switch (passwordStrength) {
      case 0:
        return 'Weak';
      case 1:
        return 'Almost There';
      case 2:
        return 'Good';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="progress mt-2" style={{ height: '5px' }}>
        <div
          className={`progress-bar ${progressBarClass()}`}
          role="progressbar"
          style={{ width: `${(passwordStrength + 1) * 20}%` }}
          aria-valuenow={(passwordStrength + 1) * 20}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <small className={`form-text ${passwordStrengthClass()}`}>
        Strength: {passwordStrengthMessage()}
      </small>
    </>
  );

}

export default PassStrengthBar;