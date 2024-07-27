import React, {useEffect, useState} from 'react';
import { storage, database } from './firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';

export const UploadMultipleImage = ({ onImageUrlChange, className, value }) => {
    const [images, setImages] = useState(null);

    const handleChange = (e) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (!images || images.length === 0) return; // Đảm bảo đã chọn ít nhất một ảnh
        const uploadedImageUrls = [];

        try {
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const storageReference = storageRef(storage, `multipleImages/${image.name}`);

                // Tải lên vào Firebase Storage
                const snapshot = await uploadBytes(storageReference, image);
                console.log('Uploaded a blob or file!', snapshot);

                // Lấy URL để hiển thị ảnh
                const url = await getDownloadURL(storageReference);
                console.log('File available at', url);
                uploadedImageUrls.push(url);

                // Lưu URL vào Firebase Realtime Database
                const dbImagesRef = dbRef(database, 'images');
                const newImageRef = push(dbImagesRef);
                await set(newImageRef, {
                    imageUrl: url,
                    imageName: image.name,
                    // Các thông tin ảnh bổ sung nếu cần
                });
                console.log('Image information saved to Realtime Database');
            }

            // Gọi callback để trả về URL của các ảnh đã tải lên thành công
            if (uploadedImageUrls.length > 0) {
                onImageUrlChange(uploadedImageUrls);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    useEffect(() => {
        // Auto upload when images state changes
        if (images && images.length > 0) {
            handleUpload().then().catch();
        }
    }, [images]);

    return (
        <div>
            <input type="file" className={className} multiple onChange={handleChange} value={value} />
        </div>
    );
};

export const UploadOneImage = ({ onImageUrlChange , className}) => {
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if ( e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image) return; // Đảm bảo đã chọn ít nhất một ảnh

        try {
            const storageReference = storageRef(storage, `multipleImages/${image.name}`);

            // Tải lên vào Firebase Storage
            const snapshot = await uploadBytes(storageReference, image);
            console.log('Uploaded a blob or file!', snapshot);

            // Lấy URL để hiển thị ảnh
            const url = await getDownloadURL(storageReference);

            // Lưu URL vào Firebase Realtime Database
            const dbImagesRef = dbRef(database, 'images');
            const newImageRef = push(dbImagesRef);
            await set(newImageRef, {
                imageUrl: url,
                imageName: image.name,
                // Các thông tin ảnh bổ sung nếu cần
            });
            console.log('Image information saved to Realtime Database');

            // Gọi callback để trả về URL của các ảnh đã tải lên thành công
            onImageUrlChange(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    useEffect(() => {
        // Auto upload when image state changes
        if (image) {
            handleUpload().then().catch();
        }
    }, [image]);

    return (
        <>
            <input type="file" accept="image/*"  className={className} onChange={handleChange} />
        </>
    );
};