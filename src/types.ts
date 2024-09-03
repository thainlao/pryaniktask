import { ReactNode } from "react";

export interface DataItem {
    id: number;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export interface EditRecordProps {
    item: DataItem;
    onCancel: () => void;
    onSave: (updatedItem: DataItem) => void;
}

export interface AddRecordProps {
    onSave: (newItem: DataItem) => void;
    onCancel: () => void;
}

export interface DeleteConfirmProps {
    id: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}
  
export interface AuthProviderProps {
    children: ReactNode;
}