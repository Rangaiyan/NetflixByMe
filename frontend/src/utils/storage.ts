export function saveTokens(data: any) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId);
  }
  
  export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  