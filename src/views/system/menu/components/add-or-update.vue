<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:title="addUpdatePageInit.title"
			append-to-body
			class="menu-dialog-container"
			width="55vw"
			@close="close">
		<el-form
				ref="addOrUpdateForm"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="100px"
				status-icon>
			<el-row justify="space-between">
				<el-col :span="24">
					<el-form-item label="上级菜单" prop="parentId">
						<menu-select-tree
								ref="menuSelectTreeRef"
								v-model="addUpdateForm.parentId"
								:menu-type="ignoreMenuTypes"
								clearable
								@change="handleChange"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row justify="space-between">
				<el-col :span="12">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="addUpdateForm.menuType">
							<el-radio-button label="M" value="M">目录</el-radio-button>
							<el-radio-button label="C" value="C">菜单</el-radio-button>
							<el-radio-button label="B" value="B">按钮</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单状态" prop="menuStatus">
						<static-dict-radio-button v-model="addUpdateForm.menuStatus" :dict-list="DictMenuStatus"
						                          placeholder="请选择菜单状态"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row justify="space-between">
				<el-col v-if="isButton" :span="12">
					<el-form-item label="菜单图标" prop="menuIcon">
						<icon-select v-model="addUpdateForm.menuIcon"/>
					</el-form-item>
				</el-col>
				<el-col :span="isButton ? 12 : 24">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input
								v-model="addUpdateForm.menuName"
								maxlength="50" placeholder="请输入菜单名称"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="isButton" justify="space-between">
				<el-col :span="12">
					<el-form-item label="组件名称" prop="menuViewName">
						<el-input
								v-model="addUpdateForm.menuViewName"
								:disabled="!isCaiDan && addUpdateForm.menuLink === '1'"
								maxlength="50" placeholder="请输入组件名称"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item
							:rules="addUpdateForm.menuLink === '1' ? {} : menuViewPath"
							label="组件路径"
							prop="menuViewPath">
						<el-input
								v-model="addUpdateForm.menuViewPath"
								:disabled="!isMuLu"
								:readonly="!isMuLu"
								maxlength="200" placeholder="请输入组件路径"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="isButton" justify="space-between">
				<el-col :span="12">
					<el-form-item label="路由地址" prop="menuPath">
						<el-input
								v-model="addUpdateForm.menuPath"
								maxlength="100" placeholder="请输入路由地址"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col v-if="!isMuLu" :span="12">
					<el-form-item label="面包屑" prop="menuRedirect">
						<el-input
								v-model="addUpdateForm.menuRedirect"
								:disabled="!isCaiDan"
								:readonly="!isCaiDan"
								maxlength="100" placeholder="请输入路由面包屑地址"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col v-if="!isCaiDan" :span="12">
					<el-form-item
							:rules="
							addUpdateForm.menuHidden === '0'
								? {
										required: true,
										message: '请输入面包屑导航地址，noRedirect不可点击',
										trigger: ['blur', 'change']
									}
								: {}
						"
							label="高亮菜单"
							prop="menuActive">
						<el-input
								v-model="addUpdateForm.menuActive" :disabled="addUpdateForm.menuHidden !== '0'"
								maxlength="100"
								placeholder="请输入高亮侧边栏"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row justify="space-between">
				<el-col v-if="!isButton" :span="12">
					<el-form-item label="权限标识" prop="menuAuthority">
						<el-input v-model="addUpdateForm.menuAuthority" maxlength="100" placeholder="请输入权限标识"
						          show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col v-if="!isCaiDan" :span="12">
					<el-form-item label="菜单隐藏" prop="menuHidden">
						<el-radio-group v-model="addUpdateForm.menuHidden" @change="hidden">
							<el-radio-button value="1">显示</el-radio-button>
							<el-radio-button value="0">隐藏</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单排序" prop="menuSort">
						<el-input-number
								v-model="addUpdateForm.menuSort"
								:max="999"
								:min="1"
								placeholder="请输入菜单排序"
								style="width: 100%"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="isButton ? isMuLu : isButton" justify="space-between">
				<el-col :span="8">
					<el-form-item label="路由缓存" label-width="100px" prop="menuCache">
						<el-radio-group v-model="addUpdateForm.menuCache">
							<el-radio-button value="1">是</el-radio-button>
							<el-radio-button value="0">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="是否外链" label-width="100px" prop="menuLink">
						<el-radio-group v-model="addUpdateForm.menuLink">
							<el-radio-button value="1">是</el-radio-button>
							<el-radio-button value="0">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="tabs固定" label-width="100px" prop="menuAffix">
						<el-radio-group v-model="addUpdateForm.menuAffix">
							<el-radio-button value="1">是</el-radio-button>
							<el-radio-button value="0">否</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button
						:disabled="addUpdatePageInit.loadingStatus"
						type="primary"
						@click="submit">
					{{ addUpdatePageInit.submitTitle }}
				</el-button>
				<el-button type="info" @click="close">关闭</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {useMessage} from '@/hooks/use-message'
import type {MenuType} from '@/components/system/types'
import type {SysMenuOperationReq} from "@/api/system/menu/type";
import {
	DictMenuStatus,
	SysMenuOperationForm,
	SysMenuOperationPageInit,
	SysMenuOperationRules
} from "@/api/system/menu/constant";
import {getSysMenuById, saveSysMenu, updateSysMenu} from "@/api/system/menu";

defineOptions({name: 'SysMenuViewAddUpdate'})

const emit = defineEmits(['close', 'success', 'error'])
const state = reactive<BasicOperationPageInit<SysMenuOperationReq>>({
	addUpdatePageInit: {
		...SysMenuOperationPageInit
	},
	addUpdateForm: {...SysMenuOperationForm}
})
const addOrUpdateForm = ref<FormInstance>()
const menuSelectTreeRef = ref<any>()
const rules = reactive<FormRules>(SysMenuOperationRules)
const {addUpdateForm, addUpdatePageInit} = toRefs(state)
const ignoreMenuTypes = ref<MenuType[]>(['C', 'B'])
const menuViewPath = ref([
	{required: true, message: '请输入组件路径', trigger: ['blur', 'change']},
	{
		pattern: /^\/([a-zA-Z](\s)*)/,
		message: '组件路径格式不正确(以/开始)',
		trigger: ['blur', 'change']
	}
])
/**
 * 是否是目录 false 是
 */
const isMuLu = computed(() => {
	return addUpdateForm.value.menuType !== 'M'
})
/**
 * 是否是菜单 false 是
 */
const isCaiDan = computed(() => {
	return addUpdateForm.value.menuType !== 'C'
})
/**
 * 是否是按钮 false 是
 */
const isButton = computed(() => {
	return addUpdateForm.value.menuType !== 'B'
})

const hidden = () => {
	if (addUpdateForm.value.menuHidden === '1') {
		addUpdateForm.value.menuActive = ''
	}
}

watch(
		() => {
			return addUpdateForm.value
		},
		(newVal) => {
			switch (newVal.menuType) {
				case 'M':
					ignoreMenuTypes.value = ['C', 'B']
					addUpdateForm.value.menuViewPath = '/layout/index'
					if (!addUpdateForm.value.menuRedirect) {
						addUpdateForm.value.menuRedirect = '/'
					}
					break
				case 'C':
					ignoreMenuTypes.value = ['C', 'B']
					if (addUpdateForm.value.menuLink === '1') {
						addUpdateForm.value.menuViewName = 'Layout'
					}
					break
				case 'B':
					ignoreMenuTypes.value = ['M', 'B']
					break
			}
		},
		{
			deep: true,
			immediate: true
		}
)

const handleChange = (result: any) => {
	if (result.menuId === addUpdateForm.value.id) {
		menuSelectTreeRef.value.clear()
		useMessage().error('不能选择相同菜单作为上级菜单')
		return
	}
	if (!addUpdateForm.value.menuPath) {
		addUpdateForm.value.menuPath = result.menuPath
	}
}
/**
 * 打开页面
 */
const show = (id: string | null) => {
	addUpdatePageInit.value.visibleStatus = true
	getInfoById(id)
}
const submit = async () => {
	await addOrUpdateForm.value?.validate(async (valid) => {
		addUpdatePageInit.value.loadingStatus = true
		if (valid) {
			if (addUpdatePageInit.value.operationStatus === 'save') {
				//增加
				await saveSysMenu({...addUpdateForm.value})
						.then((response) => {
							if (response.data) {
								useMessage().success(`新增菜单\`${addUpdateForm.value.menuName}\`权限成功`)
								emit('success')
								close()
							} else {
								addUpdatePageInit.value.loadingStatus = false
								useMessage().info('新增菜单权限失败')
							}
						})
						.finally(() => {
							addUpdatePageInit.value.loadingStatus = false
						})
			} else {
				//修改
				await updateSysMenu({...addUpdateForm.value})
						.then((response) => {
							if (response.data) {
								useMessage().success(`修改菜单\`${addUpdateForm.value.menuName}\`权限成功`)
								emit('success')
								close()
							} else {
								addUpdatePageInit.value.loadingStatus = false
								useMessage().info('修改菜单权限失败')
							}
						})
						.finally(() => {
							addUpdatePageInit.value.loadingStatus = false
						})
			}
		} else {
			closeLoading()
			useMessage().info('表单校验未通过，请重新检查提交内容！')
		}
	})
}

/**
 * 关闭页面
 */
const close = () => {
	addOrUpdateForm.value?.resetFields()
	addUpdatePageInit.value = {
		...SysMenuOperationPageInit
	}
	addUpdateForm.value = {...SysMenuOperationForm}
	emit('close')
}

const closeLoading = () => {
	addUpdatePageInit.value.loadingStatus = false
}

/**
 * 根据id 获取 菜单 信息
 * @param id
 */
const getInfoById = async (id: string | null) => {
	if (!id) return
	addUpdatePageInit.value.loadingStatus = true
	addUpdatePageInit.value.operationStatus = 'update'
	await getSysMenuById(id)
			.then((res) => {
				const {data} = JSON.parse(JSON.stringify(res))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改菜单'
				addUpdatePageInit.value.submitTitle = '修改'
				closeLoading()
			})
			.finally(() => {
				closeLoading()
			})
}

defineExpose({
	show
})
</script>

