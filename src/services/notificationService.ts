export enum NotificationType {
    Information = "Information",
    Success = "Success",
    Warning = "Warning",
    Error = "Error"
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
}

export interface NotificationObserver {
    handle: (allNotification: Notification[]) => void
}

export interface NotificationService {
    subscribe: (observer: NotificationObserver) => void;
    unsubscribe: (observer: NotificationObserver) => void;
    information: (title: string, message: string) => void;
    success: (title: string, message: string) => void;
    warning: (title: string, message: string) => void;
    error: (title: string, message: string) => void;
}

export const notificationService = ((): NotificationService => {
    const notifications: Notification[] = [];
    const observers: NotificationObserver[] = [];

    const notifyAll = () => {
        for (let i = 0; i < observers.length; i++) {
            const observer = observers[i];
            try {
                observer.handle([...notifications]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const subscribe = (observer: NotificationObserver) => {
        observers.push(observer);
        try {
            observer.handle([...notifications]);
        } catch (error) {
            console.error(error);
        }
    }

    const unsubscribe = (observer: NotificationObserver) => {
        const index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    };

    const addNotification = (title: string, message: string, type: NotificationType) => {
        const notification = {
            id: `${title}-${new Date().getTime()}`,
            title: title,
            message: message,
            type: type
        };
        notifications.push(notification);
        notifyAll();
        setTimeout(() => {
            const index = notifications.findIndex(n => n.id === notification.id);
            if (index > -1) {
                notifications.splice(index, 1);
                notifyAll();
            }
        }, 10000);
    };

    const information = (title: string, message: string) => {
        addNotification(title, message, NotificationType.Information);
    };

    const success = (title: string, message: string) => {
        addNotification(title, message, NotificationType.Success);
    };

    const warning = (title: string, message: string) => {
        addNotification(title, message, NotificationType.Warning);
    };

    const error = (title: string, message: string) => {
        addNotification(title, message, NotificationType.Error);
    };

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        information: information,
        success: success,
        warning: warning,
        error: error
    };
})();