<template>
	<el-switch v-model="darkStatus" active-icon="Moon" inactive-icon="Sunny" @change="toggle"/>
</template>

<script lang="ts" setup>
import {useThemeStore} from '@/store/modules/theme'
import {isDark} from '@/utils/dark';
import {useI18n} from "vue-i18n";

defineOptions({ name: 'SwitchDarkComponent'})

/**
 * 主题设置
 */
const {t} = useI18n();
const themeStore = useThemeStore()
const darkStatus = ref<boolean>(isDark.value)

/**
 * 切换颜色模式
 */
const toggle = () => {
	const loading = ElLoading.service({
		lock: true,
		text: t('theme.changeDarkStatus'),
	})
	themeStore.changeDarkStatus()
	setTimeout(() => {
		loading.close()
	}, 1500)
}
</script>

<style lang="scss" scoped></style>
