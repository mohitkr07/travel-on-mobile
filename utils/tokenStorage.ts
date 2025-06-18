import * as SecureStore from 'expo-secure-store';

export const saveTokens = async (accessToken: string, refreshToken: string) =>{
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
}

export const getAccessToken = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    return accessToken;
}

export const getRefreshToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    return refreshToken;
}

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
}