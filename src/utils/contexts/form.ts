import { createContext } from 'react';

type CTX = {
    isOpen: boolean;
    files: {
        name: string;
        progress?: number;
        error?: string;
    }[];
}
