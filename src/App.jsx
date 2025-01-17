import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import Login from "./components/Login";
import Pagination from "./components/Pagination";
import ProductModal from "./components/ProductModal";

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Loading = ({ isLoading }) => {
  return (
    <div
      className="loading"
      style={{
        display: isLoading ? "flex" : "none",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // modal
  const [modalType, setModalType] = useState("");
  const myModal = useRef(null);
  const openModal = (product, type) => {
    if (type === "add") {
      setTemProduct(initialProductState);
    } else {
      setTemProduct({
        id: product.id || "",
        imageUrl: product.imageUrl || "",
        imagesUrl: product.imagesUrl || [],
        title: product.title || "",
        feature: product.feature || "",
        nation: product.nation || "",
        area: product.area || "",
        address: product.address || "",
        addressEmbedCode: product.addressEmbedCode || "",
        category: product.category || "",
        unit: product.unit || "",
        origin_price: product.origin_price || 0,
        price: product.price || 0,
        description: product.description || "",
        content: product.content || "",
        is_enabled: product.is_enabled || 0,
      });
    }
    myModal.current.show();
    setModalType(type);
  };
  const hideModal = () => {
    myModal.current.hide();
  };

  // 上傳圖片函式
  const imgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "請選擇檔案",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/upload`,
        formData
      );
      const url = result.data?.imageUrl;
      setTemProduct((preData) => {
        if (!preData.imageUrl) {
          return { ...preData, imageUrl: url };
        } else if (!preData.imagesUrl || preData.imagesUrl.length === 0) {
          return { ...preData, imagesUrl: [url] };
        } else {
          return { ...preData, imagesUrl: [...(preData.imagesUrl || []), url] };
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "圖片上傳失敗，請稍後再試",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 新增產品資料 input 更新狀態
  const handleProductInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTemProduct((preData) => ({
      ...preData,
      [id]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "number"
          ? Number(value)
          : value,
    }));
  };
  // 新增產品資料 圖片更新
  const handleImageChange = (value, index) => {
    setTemProduct((preData) => {
      const images = [...preData.imagesUrl];
      images[index] = value;
      return { ...preData, imagesUrl: images };
    });
  };
  // 移除圖片
  const handleRemoveImg = () => {
    setTemProduct((preData) => {
      const images = [...preData.imagesUrl];
      images.pop();
      return { ...preData, imagesUrl: images };
    });
  };

  // 帳號密碼更新狀態
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // 登入功能與登入驗證
  const [isAuth, setIsAuth] = useState(false);
  const loginCheck = async (token) => {
    try {
      setIsLoading(true);
      axios.defaults.headers.common.Authorization = token;
      await axios.post(`${VITE_API_BASE}/api/user/check`);
      setIsAuth(true);
      await getProductsData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "驗證錯誤",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 產品處理
  // 取得產品資料函式
  const [pagination, setPagination] = useState({});
  const getProductsData = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/products?page=${page}`
      );
      const { products } = result.data;
      setPagination(result.data.pagination);
      setProducts(products);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const initialProductState = {
    imageUrl: "",
    imagesUrl: [],
    title: "",
    feature: "",
    nation: "",
    area: "",
    address: "",
    addressEmbedCode: "",
    category: "",
    unit: "",
    origin_price: 0,
    price: 0,
    description: "",
    content: "",
    is_enabled: 0,
  };
  const [temProduct, setTemProduct] = useState(initialProductState);
  // 新增產品函式
  const addProductsData = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product`, {
        data: temProduct,
      });
      Swal.fire({
        title: "產品新增成功",
        icon: "success",
      });
      hideModal();
      getProductsData();
      setTemProduct(initialProductState); // 清空新增商品欄位 (回到初始值)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // 編輯產品函式
  const editProductsData = async (id) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product/${id}`,
        {
          data: temProduct,
        }
      );
      Swal.fire({
        title: "產品更新成功",
        icon: "success",
      });
      hideModal();
      getProductsData();
      setTemProduct(initialProductState); // 清空新增商品欄位 (回到初始值)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // 刪除產品函式
  const deleteProductsData = (id) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await axios.delete(
            `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/product/${id}`
          );
          Swal.fire({
            title: "產品刪除成功",
            icon: "success",
          });
          getProductsData();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // 首次進入頁面執行
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      loginCheck(token);
    } else {
      Swal.fire({
        icon: "warning",
        title: "未登入",
        text: "請先登入以檢視產品資料。",
      });
    }
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      {isAuth ? (
        <div className="container">
          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openModal(temProduct, "add")}
            >
              建立新的產品
            </button>
          </div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120" className="text-end">
                  原價
                </th>
                <th width="120" className="text-end">
                  售價
                </th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(products).length > 0 ? (
                Object.values(products).map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td className="text-end">
                      <del>{item.origin_price}</del>
                    </td>
                    <td className="text-end">{item.price}</td>
                    <td>
                      {item.is_enabled === 1 ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => openModal(item, "edit")}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteProductsData(item.id)}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">尚無產品資料</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            pagination={pagination}
            getProductsData={getProductsData}
          />
        </div>
      ) : (
        <Login
          setIsLoading={setIsLoading}
          formData={formData}
          setFormData={setFormData}
          getProductsData={getProductsData}
          setIsAuth={setIsAuth}
        />
      )}
      <ProductModal
        myModal={myModal}
        modalType={modalType}
        temProduct={temProduct}
        hideModal={hideModal}
        handleProductInputChange={handleProductInputChange}
        handleImageChange={handleImageChange}
        handleRemoveImg={handleRemoveImg}
        addProductsData={addProductsData}
        editProductsData={editProductsData}
        imgUpload={imgUpload}
      />
    </>
  );
}

export default App;
