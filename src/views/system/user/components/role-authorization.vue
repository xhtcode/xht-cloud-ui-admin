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
			<role-check-tree ref="roleCheckTreeRef" @change-node="handleChangeNode"/>
		</div>

		<template #footer>
			<el-button :disabled="pageInit.loadingStatus" type="primary" @click="submitForm">授权</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import type {CheckedInfo} from 'element-plus/es/components/tree-v2/src/types'
import type RoleCheckTreeType from '@/components/Select/RoleCheckTree.vue'
import {useMessage} from '@/hooks/use-message'
import {selectRoleIdByUserId, userAuthorizationRole} from "@/api/system/permissions";
import type {SysUserResponse} from "@/api/system/user/type";

defineOptions({name: 'RoleAuthorizationView'})
const pageInit = ref<any>({
	visible: false,
	loadingStatus: false
})
const userData = ref<SysUserResponse>()
const roleIds = ref<string[]>([])
const title = ref<string>('')
const roleCheckTreeRef = ref<InstanceType<typeof RoleCheckTreeType>>()
/**
 * 打开显示
 */
const show = (item: SysUserResponse) => {
	if (!item) return
	userData.value = item
	title.value = `${item.userName}(${item.userAccount})权限分配`
	pageInit.value.visible = true
	pageInit.value.loading = true
	nextTick(async () => {
		await selectRoleIdByUserId(item.id)
				.then((res) => {
					roleCheckTreeRef.value?.setCheckNode(res.data)
					roleIds.value = res.data
					pageInit.value.loading = false
				})
				.catch((_) => {
					pageInit.value.visible = false
				})
	})
}
/**
 * 菜单选择
 @param checkedInfo 树目前的选中状态对象，包含 checkedNodes 选中的节点数据、checkedKeys 选中的节点数据的id 、halfCheckedNodes 返回当前半选中的节点组成的数组、halfCheckedKeys返回目前半选中的节点的 key 所组成的数组
 */
const handleChangeNode = (checkedInfo: CheckedInfo) => {
	if (!checkedInfo) return
	roleIds.value = checkedInfo.checkedKeys.concat(checkedInfo.halfCheckedKeys) as string[]
}
/**
 * 提交表单
 */
const submitForm = () => {
	pageInit.value.loading = true
	if (roleIds.value.length < 1) {
		roleIds.value = []
	}
	const roleId: string = userData.value?.id || ''
	if (!roleId || roleId === '') {
		useMessage().wraning('角色数据查询不到')
		pageInit.value.loading = false
		return
	}
	userAuthorizationRole(roleId, roleIds.value)
			.then((_) => {
				useMessage().success(`${userData.value?.userName}(${userData.value?.userAccount})授权成功`)
				close()
			})
			.finally(() => {
				pageInit.value.loading = false
			})
}

/**
 * 关闭
 */
const close = () => {
	pageInit.value = {
		visible: false,
		loading: false
	}
	userData.value = undefined
	title.value = ''
	roleIds.value = []
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
