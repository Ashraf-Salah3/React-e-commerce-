import React, {useState } from "react";
import InputField from "../../component/inputGroup/InputField";
import instance from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("يرجى إدخال جميع البيانات");
      return;
    }

    setIsLoading(true);
    try {
      const response = await instance.post("/Account/login", {
        email,
        password,
      });

      setIsLoading(false);

      if (response.data && response.data.token) {
        const token = response.data.token;

        localStorage.setItem("authToken", token);

        const decodedToken = decodeToken(token);

        if (decodedToken) {
          const role =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          if (role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }

        toast.success("تم تسجيل الدخول بنجاح");
      } else {
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("حدث خطأ أثناء تسجيل الدخول");
      setError("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  const decodeToken = (authToken) => {
    try {
      const decoded = jwtDecode(authToken);
      return decoded;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-container"]}>
        <h1>تسجيل دخول</h1>
        <form onSubmit={handleLogin}>
          <InputField
            label="البريد الالكتروني"
            type="email"
            required
            placeholder="أدخل البريد الإلكتروني"
            onchange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="كلمة المرور"
            type="password"
            required
            placeholder="أدخل كلمة المرور"
            onchange={(e) => setPassword(e.target.value)}
          />
          <button className="--btn" type="submit" disabled={isLoading}>
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
