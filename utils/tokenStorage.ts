import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (accessToken: string, refreshToken: string) =>{
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
}

export const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
}

export const getRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return refreshToken;
}

export const clearTokens = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
}