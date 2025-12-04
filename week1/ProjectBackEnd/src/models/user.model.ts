export interface User {
    username: string;
    password: string;
    token: string;
}

export const users: User[] = [
    {username: 'eko', password: '123456', token:'A01'},
    {username: 'bambang', password: 'qwerty', token:'A02'}
]