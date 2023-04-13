import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
      <div className="modal">
        <h4>remove all items form your shopping cart?</h4>
        <div className="btn-container">
          <button
            onClick={() => {
              dispatch(clearCart())
              dispatch(closeModal())
            }}
            type="button"
            className="btn confirm-btn"
          >
            Confirm
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="btn clear-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
};

export default Modal;