'use server';

import axios from 'axios';

export async function postImageAsync(formData: FormData): Promise<any> {
    try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        if (!uploadUrl) {
            throw new Error('Cloudinary upload URL is missing.');
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        const record = await axios.post(uploadUrl, formData, { headers });

        return record.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
