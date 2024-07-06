import { useLocation } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  return (
    <div>
      <h1>External Password Reset</h1>
    </div>
  );
}

export default ResetPassword;