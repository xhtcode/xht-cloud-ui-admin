<template>
	<el-dialog
			v-model="pageInit.visible"
			:before-close="close"
			:close-on-click-modal="false"
			align-center
			append-to-body
			title="角色选择"
			width="35vw">
		<div v-loading="pageInit.loading" class="menu-authorization-container">
			<role-check-tree ref="roleCheckTreeRef" @change-now-node="handleChangeNode"/>
		</div>
		<template #footer>
			<el-button :disabled="pageInit.loading" type="primary" @click="submitForm">授权</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import {useMessage} from '@/hooks/use-message'
import type {SysRoleResponse} from "@/api/system/role/type";

defineOptions({ name: 'RoleSelectComponent'})
const pageInit = ref({
	visible: false,
	loading: false
})
const emits = defineEmits(['success'])
const roles = ref<SysRoleResponse[]>([])
const roleCheckTreeRef = ref<any>()
/**
 * 打开显示
 */
const show = async (item: string[]) => {
	if (!item) return
	pageInit.value.visible = true
	pageInit.value.loading = true
	await roleCheckTreeRef.value?.setCheckNode(item)
	pageInit.value.loading = false
}
/**
 * 菜单选择
 * @param data 该节点所对应的对象
 */
const handleChangeNode = (data: SysRoleResponse) => {
	if (!data) return
	roles.value.push(data)
}
/**
 * 提交表单
 */
const submitForm = () => {
	pageInit.value.loading = true
	if (roles.value.length < 1) {
		useMessage().wraning('角色数据查询不到')
		pageInit.value.loading = false
		return
	}
	emits('success', [...roles.value])
	close()
}

/**
 * 关闭
 */
const close = () => {
	pageInit.value = {
		visible: false,
		loading: false
	}
	roles.value = []
	roleCheckTreeRef.value?.setCheckNode([])
}

defineExpose({
	show
})
</script>

<style scoped>
.menu-authorization-container {
	display: flex;
	height: 50vh;
	padding: 10px;
}
</style>
