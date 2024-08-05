<template>
	<el-switch v-model="fpsStatus" active-icon="Open" inactive-icon="TurnOff" @change="toggle"/>
</template>

<script lang="ts" setup>
import {useThemeStore} from '@/store/modules/theme'

defineOptions({ name: 'SwitchFpsComponent'})

/**
 * 主题设置
 */
const themeStore = useThemeStore()

const fpsStatus = computed(() => themeStore.fpsStatus)

/**
 * 切换颜色模式
 */
const toggle = () => {
	themeStore.changeFpsStatus()
}
</script>

<style lang="scss" scoped></style>
