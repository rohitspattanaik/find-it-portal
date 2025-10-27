export interface AuthenticationRequest {
    email: string;
}

export interface Session {
    sessionId: string;
    userId: number;
    isAdmin: boolean;
    expiresAt: Date;
}