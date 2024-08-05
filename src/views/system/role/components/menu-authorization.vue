<template>
	<el-dialog
			v-model="pageInit.visible"
			:before-close="close"
			:close-on-click-modal="false"
			:title="title"
			append-to-body
			center
			width="35vw">
		<div v-loading="pageInit.loadingStatus" class="menu-authorization-container">
			<menu-check-tree ref="menuCheckTreeRef" @change-node="handleChangeNode"/>
		</div>

		<template #footer>
			<el-button :disabled="pageInit.loadingStatus" type="primary" @click="submitForm">授权</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import type {CheckedInfo} from 'element-plus/es/components/tree-v2/src/types'
import type MenuCheckTreeRefType from '@/components/Select/MenuCheckTree.vue'
import {useMessage} from '@/hooks/use-message'
import type {SysRoleResponse} from "@/api/system/role/type";
import {roleAuthorizationMenu, selectMenuIdByRoleId} from "@/api/system/permissions";

defineOptions({name: 'MenuAuthorizationView'})
const pageInit = ref({
	visible: false,
	loadingStatus: false
})
const roleData = ref<SysRoleResponse>()
const menuIds = ref<string[]>([])
const title = ref<string>('')
const menuCheckTreeRef = ref<InstanceType<typeof MenuCheckTreeRefType>>()
/**
 * 打开显示
 */
const show = (item: SysRoleResponse) => {
	if (!item) return
	roleData.value = item
	title.value = `【${item.roleName}】权限分配`
	pageInit.value.visible = true
	pageInit.value.loadingStatus = true
	nextTick(async () => {
		await selectMenuIdByRoleId(item.id)
				.then((res) => {
					menuCheckTreeRef.value?.setCheckNode(res.data, true)
					menuIds.value = res.data
					pageInit.value.loadingStatus = false
				})
				.catch((_) => {
					pageInit.value.visible = false
				})
	})
}
/**
 * 菜单选择
 @param data 该节点所对应的对象
 @param checkedInfo 树目前的选中状态对象，包含 checkedNodes 选中的节点数据、checkedKeys 选中的节点数据的id 、halfCheckedNodes 返回当前半选中的节点组成的数组、halfCheckedKeys返回目前半选中的节点的 key 所组成的数组
 */
const handleChangeNode = (data: SysRoleResponse, checkedInfo: CheckedInfo) => {
	if (!data) return
	menuIds.value = checkedInfo.checkedKeys.concat(checkedInfo.halfCheckedKeys) as string[]
}
/**
 * 提交表单
 */
const submitForm = () => {
	pageInit.value.loadingStatus = true
	if (menuIds.value.length < 1) {
		menuIds.value = []
	}
	const roleId: string = roleData.value?.id || ''
	if (!roleId || roleId === '') {
		useMessage().wraning('角色数据查询不到')
		pageInit.value.loadingStatus = false
		return
	}
	roleAuthorizationMenu(roleId, menuIds.value)
			.then((_) => {
				useMessage().success(`${roleData.value?.roleName}授权成功`)
				close()
			})
			.finally(() => {
				pageInit.value.loadingStatus = false
			})
}

/**
 * 关闭
 */
const close = () => {
	pageInit.value = {
		visible: false,
		loadingStatus: false
	}
	roleData.value = undefined
	title.value = ''
	menuIds.value = []
	menuCheckTreeRef.value?.setCheckNode([])
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
