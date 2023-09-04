export interface StateType {
    loading: boolean;
    userInfo: { _id: string; name: string; email: string } | null;
    error: string;
  }
  
export  interface registerPayload {
    name: string
    email: string;
    password: string;
  }
export  interface SignInPayload {
    email: string;
    password: string;
  }
  
 export interface ApiResponse {
    _id: string;
    name: string;
    email: string;
  }