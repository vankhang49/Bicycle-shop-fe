import spinner from "../../assets/icons/Spinner.gif";
import "./LoadingPage.scss";

export default function LoadingPage() {

    return (
        <div id="loadingPage">
            <p>Đang tải trang....</p>
            <h1>Vui lòng đợi trong giây lát</h1>
            <img src={spinner} alt="spinner"/>
        </div>
    );
}