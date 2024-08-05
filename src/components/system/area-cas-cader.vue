<template>
	<el-cascader
			ref="areaRefType"
			v-model="modelValue"
			:emitPath="false"
			:options="state.options"
			:props="defaultProps"
			class="w100"
			clearable
			filterable
			@change="handleCurrentChange"/>
</template>

<script lang="ts" setup>
import type {AxiosResponse} from 'axios'
import type {CascaderProps} from 'element-plus'
import {useVModel} from '@vueuse/core'
import type {SysAreaInfoResponse} from "@/api/system/area/type";
import {getStaticSysAreaInfoList} from "@/api/system/area";

defineOptions({ name: 'AreaCasCaderComponent'})

const props = defineProps({
	modelValue: {
		type: String,
		require: true,
		default: '-1'
	},
	parent: {
		type: Boolean,
		require: false,
		default: false
	},
	checkStrictly: {
		type: Boolean,
		require: false,
		default: false
	},
	multiple: {
		type: Boolean,
		require: false,
		default: false
	}
})

const areaRefType = ref()
const emits = defineEmits(['update:modelValue', 'change'])
const modelValue = useVModel(props, 'modelValue', emits)
const defaultProps: CascaderProps = {
	label: 'name',
	value: 'id',
	checkStrictly: props.checkStrictly,
	multiple: props.multiple
}
const state = reactive({
	options: [] as SysAreaInfoResponse[],
	loading: false
})
/**
 * 获取表单信息
 */
const handleQuery = async () => {
	state.loading = true
	await getStaticSysAreaInfoList()
			.then((res: AxiosResponse<SysAreaInfoResponse[]>) => {
				if (props.parent) {
					state.options = [
						{
							id: '-1',
							parentId: '',
							name: '中国',
							level: '0',
							areaNo: '0000000',
							category: '',
							leaf: false,
							hasChildren: true,
							children: res.data,
							msg: ''
						}
					]
				} else {
					state.options = res.data
				}
			})
			.finally(() => {
				state.loading = false
			})
}
const handleCurrentChange = (item: any) => {
	emits(
			'change',
			item,
			areaRefType.value.getCheckedNodes(true),
			areaRefType.value.getCheckedNodes(false)
	)
	emits('update:modelValue', item[item.length - 1])
}
onMounted(() => {
	handleQuery()
})
</script>

