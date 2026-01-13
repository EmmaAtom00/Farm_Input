export const API_CONFIG = {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://farminput-capstone-project.onrender.com',
    endpoints: {
        auth: {
            login: '/auth/login/',
            signup: '/auth/signup/',
        },
    },
};
