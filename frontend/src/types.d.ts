export interface RegisterMutation {
    email: string;
    displayName: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    token: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface IGroup {
    _id: string;
    user: {
        _id: string;
        displayName: string;
    }
    title: string;
    description: string;
    image: File;
    isPublished: boolean;
}

export interface GroupMutation {
    title: string;
    description: string;
    image: File;
}