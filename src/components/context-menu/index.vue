<template>
	<ElDropdown
			ref="elDropdownMenuRef"
			:trigger="trigger"
			class="context-menu"
			placement="bottom-start"
			popper-class="v-context-menu-popper"
			@command="commandTrigger">
		<slot></slot>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
						v-for="(item, index) in menuList"
						:key="index"
						:command="item"
						:disabled="item.disabled"
						:divided="item.divided">
					<div class="user-select-none flex-center">
						<svg-icon :name="item.icon"/>
						<span>{{ item.label }}</span>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</ElDropdown>
</template>
<script lang="ts" setup>
import type {ElDropdown} from 'element-plus'
import type {ContextMenuSchemaType} from "@/components/context-menu/types";

defineOptions({name: 'ContextMenuComponent'})

interface PropsTypes {
	menuList: ContextMenuSchemaType[]
	trigger?: 'click' | 'hover' | 'focus' | 'contextmenu'
	tagItem?: any
	disabled?: boolean
}

const emits = defineEmits<{
	(e: 'change', type: OperationType | string, tagItem: any): void
}>()
const props = withDefaults(defineProps<PropsTypes>(), {
	menuList: () => [],
	trigger: 'contextmenu',
	disabled: false,
	tagItem: null
})
const menuList = computed(() => props.menuList)
const commandTrigger = (menuItem: ContextMenuSchemaType) => {
	emits('change', menuItem.command as string, props.tagItem)
}
</script>
