import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
const { VITE_API_BASE } = import.meta.env;

export default function Login({
  setIsLoading,
  formData,
  setFormData,
  getProductsData,
  setIsAuth,
}) {
  // 登入
  const loginFn = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${VITE_API_BASE}/admin/signin`,
        formData
      );
      const { token, expired } = result.data;
      document.cookie = `hexToken=${token}; expires=${new Date(
        expired
      )}; path=/`;
      axios.defaults.headers.common.Authorization = token;
      setIsAuth(true);
      Swal.fire({
        title: "登入成功",
        icon: "success",
      });
      getProductsData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="container login">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
        <div className="col-8">
          <form id="form" className="form-signin">
            <div className="form-floating mb-3">
              <input
                type="email"
                name="username"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                value={formData.username}
                onChange={handleInputChange}
                required
                autoFocus
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="btn btn-lg btn-primary w-100 mt-3"
              type="button"
              onClick={loginFn}
            >
              登入
            </button>
          </form>
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
}

Login.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  getProductsData: PropTypes.func.isRequired,
  setIsAuth: PropTypes.func.isRequired,
};
