import "./modal.scss"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            id="modal-container"
        >
            <div
                className="modal-background"
            >
                <div
                    className="modal"
                    style={{
                        background: "white",
                        maxWidth: "90%", /* Thay đổi max-width để phù hợp với thiết bị nhỏ hơn */
                        width: 550, /* Kích thước mặc định cho modal */
                        height: 300,
                        margin: "auto",
                        padding: "2%",
                        border: "2px solid #000",
                        borderRadius: "10px",
                        boxShadow: "2px solid black",
                        fontSize: "14px"
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;