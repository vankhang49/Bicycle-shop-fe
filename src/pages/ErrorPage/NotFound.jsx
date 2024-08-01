import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss'
function NotFound(props) {
    return (
        <main id={styles.main}>
            <div className={styles.box}>
            <h2>Xin lỗi không tìm thấy trang</h2>
            <p>Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã gõ nhầm URL? Hãy chắc chắn để kiểm tra chính tả.</p>

            <Link to="/">Quay lại trang chủ</Link>
            </div>
        </main>
    );
}

export default NotFound;