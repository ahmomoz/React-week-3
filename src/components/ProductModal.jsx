import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import * as bootstrap from "bootstrap";

export default function ProductModal({
  myModal,
  modalType,
  temProduct,
  hideModal,
  handleProductInputChange,
  handleImageChange,
  handleRemoveImg,
  addProductsData,
  editProductsData,
  imgUpload,
}) {
  const productModalRef = useRef(null);

  useEffect(() => {
    myModal.current = new bootstrap.Modal(productModalRef.current);
  }, []);

  return (
    <div
      id="productModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      ref={productModalRef}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 id="productModalLabel" className="modal-title">
              {modalType === "add" ? (
                <span>新增產品</span>
              ) : (
                <span>編輯產品</span>
              )}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-2">
                  <div className="mb-3">
                    <img
                      className="img-fluid mb-5"
                      src={temProduct.imageUrl}
                      alt={temProduct.title}
                    />
                    <label htmlFor="imageUrl" className="form-label">
                      輸入圖片網址
                    </label>
                    <input
                      id="imageUrl"
                      type="text"
                      className="form-control mb-3"
                      placeholder="請輸入主圖連結"
                      value={temProduct.imageUrl}
                      onChange={handleProductInputChange}
                    />
                    {temProduct.imagesUrl.map((item, index) => (
                      <div className="mb-3" key={index}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="請輸入副圖連結"
                          value={item}
                          onChange={(e) =>
                            handleImageChange(e.target.value, index)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  {temProduct.imagesUrl.length >= 1 && (
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={handleRemoveImg}
                    >
                      取消圖片
                    </button>
                  )}
                </div>
                <div>
                  <label htmlFor="fileInput" className="form-label">
                    上傳圖片
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="form-control"
                    id="fileInput"
                    onChange={imgUpload} 
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <div className="mb-3 text-start">
                  <label htmlFor="title" className="form-label">
                    標題
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入標題"
                    value={temProduct.title}
                    onChange={handleProductInputChange}
                  />
                </div>

                <div className="mb-3 text-start">
                  <label htmlFor="feature" className="form-label">
                    特色標語
                  </label>
                  <input
                    id="feature"
                    type="text"
                    className="form-control"
                    placeholder="請輸入特色標語"
                    value={temProduct.feature}
                    onChange={handleProductInputChange}
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="nation" className="form-label">
                      地區
                    </label>
                    <input
                      id="nation"
                      type="text"
                      className="form-control"
                      placeholder="請輸入地區"
                      value={temProduct.nation}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="area" className="form-label">
                      縣市
                    </label>
                    <input
                      id="area"
                      type="text"
                      className="form-control"
                      placeholder="請輸入縣市"
                      value={temProduct.area}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="address" className="form-label">
                      地址
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="form-control"
                      placeholder="請輸入地址"
                      value={temProduct.address}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="addressEmbedCode" className="form-label">
                      地址嵌入碼
                    </label>
                    <input
                      id="addressEmbedCode"
                      type="text"
                      className="form-control"
                      placeholder="請輸入地址嵌入碼"
                      value={temProduct.addressEmbedCode}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="category" className="form-label">
                      分類
                    </label>
                    <input
                      id="category"
                      type="text"
                      className="form-control"
                      placeholder="請輸入分類"
                      value={temProduct.category}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="unit" className="form-label">
                      單位
                    </label>
                    <input
                      id="unit"
                      type="text"
                      className="form-control"
                      placeholder="請輸入單位"
                      value={temProduct.unit}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="origin_price" className="form-label">
                      原價
                    </label>
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="請輸入原價"
                      value={temProduct.origin_price}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 text-start">
                    <label htmlFor="price" className="form-label">
                      售價
                    </label>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="請輸入售價"
                      value={temProduct.price}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>
                <hr />

                <div className="mb-3 text-start">
                  <label htmlFor="description" className="form-label">
                    產品描述
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="請輸入產品描述"
                    value={temProduct.description}
                    onChange={handleProductInputChange}
                  ></textarea>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="content" className="form-label">
                    說明內容
                  </label>
                  <textarea
                    id="content"
                    className="form-control"
                    placeholder="請輸入說明內容"
                    value={temProduct.content}
                    onChange={handleProductInputChange}
                  ></textarea>
                </div>
                <div className="mb-3 text-start">
                  <div className="form-check">
                    <input
                      id="is_enabled"
                      className="form-check-input"
                      type="checkbox"
                      checked={temProduct.is_enabled}
                      onChange={handleProductInputChange}
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={hideModal}
            >
              取消
            </button>
            {modalType === "add" ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProductsData}
              >
                確認新增
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editProductsData(temProduct.id)}
              >
                確認修改
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  myModal: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  temProduct: PropTypes.object.isRequired,
  handleProductInputChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleRemoveImg: PropTypes.func.isRequired,
  addProductsData: PropTypes.func.isRequired,
  editProductsData: PropTypes.func.isRequired,
  imgUpload: PropTypes.func.isRequired,
};
