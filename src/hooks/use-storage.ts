import {UnwrapRef} from "vue";

interface StorageType<T> {
    value: UnwrapRef<T>
    setItem: (newValue: any) => void
}

/**
 * 数据值存储在会话存储或本地存储中并将该值绑定到视图来持久保存数据
 * @description 在代码中，使用 JSON.parse 和 JSON.stringify 来格式化数据。
 * 如果不想格式化它，可以将其删除。 这是如何使用此hook的示例。
 * @param key string
 * @param type 'session' | 'local'
 */
export const useStorage = <T>(key: string, type: 'session' | 'local' = 'local'): StorageType<T> => {
    let storage: any = null;
    switch (type) {
        case 'session':
            storage = window.sessionStorage;
            break;
        case 'local':
            storage = window.localStorage;
            break;
    }
    const catchValue = ref<T>(getItem(key, storage));
    const setItem = (newValue: any) => {
        catchValue.value = newValue;
        storage.setItem(key, JSON.stringify(newValue));
    }
    return {
        value: catchValue.value,
        setItem
    }
}

const getItem = (key: string, storage: any) => {
    let value = storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value)
    } catch (error) {
        return value;
    }
}
