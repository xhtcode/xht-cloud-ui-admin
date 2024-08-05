import type {AxiosResponse} from "axios";
import type {FormInstance} from "element-plus";
import type {Ref} from "vue";


/**
 * 表格分页参数处理
 */
export const pageParams = (queryParams: CrudQueryFrom, queryData?: CrudQueryFrom) => {
    if (queryData?.order === 'ascending') {
        queryParams.ascName = queryData?.prop
        queryParams.descName = ''
    } else if (queryData?.order === 'descending') {
        queryParams.ascName = ''
        queryParams.descName = queryData?.prop
    } else if (queryData?.order === null) {
        queryParams.ascName = ''
        queryParams.descName = ''
    }
}

/**
 * 表单错误参数处理
 */
export const errorFormParams = (
    response: AxiosResponse<any>,
    addUpdateFormRef: Ref<any | FormInstance>,
    addUpdateForm: Ref<any>
) => {
    if (response?.data) {
        for (const errKey in response.data) {
            const emp = addUpdateForm.value[`${errKey}`]
            addUpdateForm.value[`${errKey}`] = undefined
            addUpdateFormRef.value?.validateField(errKey)
            addUpdateForm.value[`${errKey}`] = emp
        }
    }
}
/**
 * Element 时间选择组件-时间禁用 只能选择今天以及今天以前的时间
 * @param time 选择框时间
 */
export const disabledNowBeforeDate = (time: Date): boolean => {
    return time.getTime() > Date.now()
}

/**
 * Element 时间选择组件-时间禁用 只能选择今天以及今天以后的时间
 * @param time 选择框时间
 */
export const disabledNowAfterDate = (time: Date): boolean => {
    return time.getTime() < Date.now() - 8.64e7
}

/**
 * Element 时间选择组件-时间禁用 只能选择今天以前的时间 不包含今天
 * @param time 选择框时间
 */
export const disabledBeforeDate = (time: Date): boolean => {
    return time.getTime() > Date.now() - 8.64e7
}

/**
 * Element 时间选择组件-时间禁用 只能选择今天以后的时间 不包含今天
 * @param time 选择框时间
 */
export const disabledAfterDate = (time: Date): boolean => {
    return time.getTime() <= Date.now()
}
