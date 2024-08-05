<template>
	<el-tree
			ref="areaTreeRef"
			v-loading="state.loading"
			:data="state.options"
			:expand-on-click-node="false"
			:load="loadNode"
			:props="{ label: 'name', children: 'children', isLeaf: 'leaf' }"
			highlight-current
			lazy
			node-key="id"
			@node-click="handleClick">
		<template #default="{ data }">{{ data.name }}</template>
	</el-tree>
</template>

<script lang="ts" setup>
import type {AxiosResponse} from 'axios'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type {SysAreaInfoResponse} from "@/api/system/area/type";
import {getSysAreaInfoList} from "@/api/system/area";

defineOptions({ name: 'AreaTreeComponent'})

const emits = defineEmits(['clickNode'])
const state = reactive({
	options: [] as SysAreaInfoResponse[],
	loading: false
})
const areaTreeRef = ref<any>()
/**
 * 获取列表信息
 */
const loadNode = async (node: Node, resolve: (data: SysAreaInfoResponse[]) => void) => {
	state.loading = true
	await getSysAreaInfoList({parentId: node.data.id || '-1'})
			.then((res: AxiosResponse<SysAreaInfoResponse[]>) => {
				resolve(res.data)
			})
			.finally(() => {
				state.loading = false
			})
}
const reset = async (areaNo?: string) => {
	await getSysAreaInfoList(areaNo ? {areaNo: areaNo} : {parentId: '-1'})
			.then((res: AxiosResponse<SysAreaInfoResponse[]>) => {
				state.options = res.data
			})
			.finally(() => {
				state.loading = false
			})
}
const setCurrentKey = async (id?: string) => {
	areaTreeRef.value.setCurrentKey(id!)
}
/**
 * 点击时数据回显
 * @param data
 */
const handleClick = (data: SysAreaInfoResponse) => {
	emits('clickNode', data)
}
defineExpose({
	reset,
	setCurrentKey
})
</script>
