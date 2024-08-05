import type {ColumnOption} from "@/components/right-tool-bar/types";
import type {Ref} from "vue";

export const useColumnOptionHooks = (data: ColumnOption[]): {
    columnOption: ComputedRef<CommonObjValue<boolean>>;
    sourceColumnOption: Ref<ColumnOption[]>
} => {
    const sourceColumnOption = ref<ColumnOption[]>(data || [])
    const columnOption = computed<CommonObjValue<boolean>>(() => {
        return sourceColumnOption.value.reduce((accumulator: CommonObjValue<boolean>, currentValue: ColumnOption) => {
            accumulator[currentValue.value] = currentValue.visible;
            return accumulator;
        }, {});
    })
    return {
        columnOption,
        sourceColumnOption
    }
}
