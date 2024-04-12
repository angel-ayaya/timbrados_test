import { refreshToken } from '../utils/refreshToken';

export const useAuth = () => {
    const handleRequest = async (url, options) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (response.status === 401) { // Token possibly expired
                const newToken = await refreshToken();
                if (newToken) {
                    // Retry the request with the new token
                    return fetch(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            'Authorization': `Bearer ${newToken}`
                        }
                    });
                } else {
                    throw new Error("Unable to refresh token");
                }
            }
            return response;
        } catch (error) {
            console.error("Request failed", error);
            throw error;
        }
    };

    return { handleRequest };
};
