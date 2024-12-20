export const getUserId = (): string | null => {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
};