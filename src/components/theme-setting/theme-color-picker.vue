<template>
	<el-color-picker v-model="colorType" :predefine="colorPresets" @change="changeColorType"/>
</template>

<script lang="ts" setup>
import {PREDEFINE_COLORS} from '@/constants/index'
import {useThemeStore} from '@/store/modules/theme'
import {useI18n} from "vue-i18n";


defineOptions({ name: 'ThemeColorComponent'})

const {t} = useI18n();
/**
 * 定义颜色预设
 */
const colorPresets = PREDEFINE_COLORS;

/**
 * 主题设置
 */
const themeStore = useThemeStore()
const colorType = ref<string>(themeStore.colorType)

const changeColorType = (newValue: string | null) => {
	const loading = ElLoading.service({
		lock: true,
		text: t('theme.changeColorType'),
	})
	if (newValue) {
		themeStore.changeColorType(newValue)
	}
	themeStore.changeColorType('#1E90FF')
	colorType.value = '#1E90FF'
	setTimeout(() => {
		loading.close()
	}, 1500)
}

</script>
