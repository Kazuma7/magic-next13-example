import { useState } from "react";

const EmailForm = ({
  onEmailSubmit,
  disabled,
}: {
  onEmailSubmit: (email: string) => void;
  disabled: boolean;
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <div>
      <h3 className="form-header">Login</h3>
      <div className="input-wrapper">
        <label htmlFor="email-input">Email address</label>
        <input
          id="email-input"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button disabled={disabled} onClick={handleSubmit}>
          Send Magic Link
        </button>
      </div>
      <style jsx>{`
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
        input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
        }
        button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};

export default EmailForm;
