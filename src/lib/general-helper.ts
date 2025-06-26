import { postImageAsync } from '@/app/actions/cloudinary-actions';

// Helper function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (file: File | null) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
    );

    const imageResponse = await postImageAsync(formData);

    return imageResponse;
};
