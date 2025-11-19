export enum ToastTypes {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    WARNING = "warning"
}

export type ToastData = {
    title: string;
    message: string;
    type: ToastTypes;
    details?: string;
}