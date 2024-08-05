export interface RegularType {
    label: string
    value: string
    regular: RegExp
}

/**
 * 正则判断
 */

class RegularUtils {
    public regularConstant: RegularType[] = [
        {label: '数字', value: 'number', regular: /^-?\d+(\.\d+)?$/},
        {label: '字母', value: 'letter', regular: /^[A-Za-z]+$/},
        {label: '数字字母', value: 'letterAndNumber', regular: /^[A-Za-z0-9]+$/},
        {label: '手机号码', value: 'mobilePhone', regular: /^[1][3-9][0-9]{9}$/},
        {label: '非中文字符', value: 'noChinese', regular: /^[^\u4e00-\u9fa5]+$/},
        {label: '仅中文字符', value: 'chinese', regular: /^[\u4e00-\u9fa5]+$/},
        {
            label: '邮箱',
            value: 'email',
            regular: /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
        },
        {
            label: '网址',
            value: 'url',
            regular: new RegExp(
                '/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/'
            )
        }
    ]

    public constructor() {
    }

    /**
     * 获取正则
     * @param value
     */
    public getRefExp(value: string): RegularType | null {
        const resultArray = this.regularConstant.filter((item) => item.value === value)
        return resultArray && resultArray.length > 0 ? resultArray[0] : null
    }

    /**
     * 判断是否是正则
     * @param value
     */
    public isRegExp(value: any): boolean {
        return value instanceof RegExp
    }

    /**
     * 判断url是否是http或https
     * @param {string} url
     * @returns {Boolean}
     */
    public isHttp(url: string): boolean {
        return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    }

    public isUrl(path: string): boolean {
        const reg =
            /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
        return reg.test(path)
    }

    /**
     * 判断path是否为外链
     * @param {string} path
     * @returns {Boolean}
     */
    public isExternal = (path: string) => /^(http?:|https?:|mailto:|tel:)/.test(path)

    /**
     * 类型判断
     * @param val 值
     * @param type 类型
     */
    public is = (val: unknown, type: string) => {
        return toString.call(val) === `[object ${type}]`
    }

    /**
     * 类型判断是否是Number
     * @param val 值
     */
    public isNumber = (val: unknown): val is number => {
        return this.is(val, 'Number')
    }

    public isNull(value: any) {
        return value === null || value === undefined
    }

    public isNotNull(value: any) {
        return value !== null && value !== undefined
    }

    public isEmptyStr(str: string | undefined | null) {
        return str === undefined || (!str && str !== '0') || !/[^\s]/.test(str)
    }
}

export default new RegularUtils()
const a = {
    number: '/^[-]?\\d+(\\.\\d+)?$/',
    letter: '/^[A-Za-z]+$/',
    letterAndNumber: '/^[A-Za-z0-9]+$/',
    mobilePhone: '/^[1][3-9][0-9]{9}$/',
    letterStartNumberIncluded: '/^[A-Za-z]+[A-Za-z\\d]*$/',
    noChinese: '/^[^\u4e00-\u9fa5]+$/',
    chinese: '/^[\u4e00-\u9fa5]+$/',
    email: '/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$/',
    url: '/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/'
}
