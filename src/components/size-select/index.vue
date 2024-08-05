<template>
	<el-dropdown trigger="click" @command="handleSizeChange">
		<div class="button-hover no-border" size="default">
			<svg-icon name="size"/>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in langOptions" :key="item.value"
				                  :command="item" :disabled="item.value === themeStore.sizeType">
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script lang="ts" setup>
import {UI_SIZE_TYPE_CONSTANT} from "@/constants";
import {useMessage} from "@/hooks/use-message"
import {useThemeStore} from "@/store/modules/theme";
import {useI18n} from "vue-i18n";

defineOptions({name: 'SizeSelectComponent'})

const themeStore = useThemeStore()
const {t} = useI18n()
/**
 * 尺寸大小类型
 */
const langOptions = UI_SIZE_TYPE_CONSTANT

/**
 * 尺寸切换
 * @param type 尺寸大小类型
 */
const handleSizeChange = (type: CommonKeyValue<string, UI_SIZE_TYPE>) => {
	useMessage().success(t('theme.changeSizeType'));
	themeStore.changeSizeType(type.value)
}
</script>
