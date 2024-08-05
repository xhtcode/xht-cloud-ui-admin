import {defineStore} from "pinia";
import type {SysDictResponse} from "@/api/system/dict/type";
import {getSysDictByCode} from "@/api/system/dict";
import type {AxiosResponse} from "axios";


export const useDictStore =
    defineStore('dict_info', {
            state: (): DictInfoState => ({
                dictInfo: new Map<string, SysDictResponse | null | undefined>
            }),
            actions: {
                /**
                 * 获取字典数据
                 * @param dictType
                 */
                async getDictInfo(dictType: string): Promise<SysDictResponse> {
                    const result = this.dictInfo.get(dictType);
                    if (result) {
                        return Promise.resolve(result)
                    }
                    const response: AxiosResponse<SysDictResponse> = await getSysDictByCode(dictType)
                    if (response && response.data) {
                        this.dictInfo.set(response.data.dictType, response.data)
                        return Promise.resolve(response.data)
                    }
                    return Promise.reject({})
                }
            },
            getters: {},
        }
    )
