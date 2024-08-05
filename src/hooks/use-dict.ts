import {useDictStore} from "@/store/modules/dict";
import type {SysDictItemResponse, SysDictResponse} from "@/api/system/dict/type";

export const useDictHooks = (code: string) => {
    const dictStore = useDictStore();
    const dictType = ref<SysDictResponse>()
    const dictInfo = ref<SysDictItemResponse[]>()

    const getDictInfo = () => {
        if (dictType) {
            dictStore.getDictInfo(code).then(res => {
                dictType.value = res
                dictInfo.value = res.children
            })
        }
    }
    onMounted(() => {
        getDictInfo()
    })
    return {
        dictType,
        dictInfo
    }
}
