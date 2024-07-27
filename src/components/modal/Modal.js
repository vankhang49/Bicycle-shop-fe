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
                        height: 300,
                        width: 500,
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