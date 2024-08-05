import i18n from '@/lang';


const {t} = i18n.global;

interface MessageImplements {
    info(title: string): void

    wraning(title: string): void

    success(title: string): void

    error(title: string): void
}

export function useMessage() {
    class MessageClass implements MessageImplements {
        // 普通提示
        info(title: string): void {
            ElMessage.info(title)
        }

        // 警告提示
        wraning(title: string): void {
            ElMessage.warning(title)
        }

        // 成功提示
        success(title: string): void {
            ElMessage.success(title)
        }

        // 错误提示
        error(title: string): void {
            ElMessage.error(title)
        }

        // 通知提示
        notify(content: string) {
            ElNotification.info(content)
        }

        // 错误通知
        notifyError(content: string) {
            ElNotification.error(content)
        }

        // 成功通知
        notifySuccess(content: string) {
            ElNotification.success(content)
        }

        // 警告通知
        notifyWarning(content: string) {
            ElNotification.warning(content)
        }
    }

    return new MessageClass()
}

export function useMessageBox() {
    class MessageBoxClass implements MessageImplements {
        // 普通提示
        info(msg: string): void {
            ElMessageBox.alert(msg, t('common.message.box.title'), {type: 'info'}).then()
        }

        // 警告提示
        wraning(msg: string): void {
            ElMessageBox.alert(msg, t('common.message.box.title'), {type: 'warning'}).then()
        }

        // 成功提示
        success(msg: string): void {
            ElMessageBox.alert(msg, t('common.message.box.title'), {type: 'success'}).then()
        }

        // 错误提示
        error(msg: string): void {
            ElMessageBox.alert(msg, t('common.message.box.title'), {type: 'error'}).then()
        }

        // 确认窗体
        confirm(msg: string) {
            return ElMessageBox.confirm(msg, t('common.message.box.title'), {
                confirmButtonText: t('common.button.confirmSuccess'),
                cancelButtonText: t('common.button.confirmError'),
                type: 'warning'
            })
        }

        // 提交内容
        prompt(msg: string) {
            return ElMessageBox.prompt(msg, t('common.message.box.title'), {
                confirmButtonText: t('common.button.confirmSuccess'),
                cancelButtonText: t('common.button.confirmError'),
                type: 'warning'
            })
        }
    }

    return new MessageBoxClass()
}
