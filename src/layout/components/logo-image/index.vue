<template>
	<div class="layout-container-logo">
		<img alt="logo" class="layout-logo-img" src="@/assets/images/vue.svg"/>
		<div v-if="menuStatus" class="layout-logo-text">小糊涂后台管理</div>
	</div>
</template>

<script lang="ts" setup>
import {useThemeHooks} from '@/hooks/use-theme-hooks';

defineOptions({ name: 'LogoImageComponent'})
const {menuStatus} = useThemeHooks()
</script>

<style lang="scss" scoped>
.layout-container-logo {
	@extend .flex-center;
	height: $header-height;
	user-select: none;

	.layout-logo-img {
		height: 18px;
		object-fit: contain;
		margin-right: 6px;
	}

	.layout-logo-text {
		font-family: '华文楷体', sans-serif;
		font-size: 18px;
		font-weight: bold;
		white-space: nowrap;
	}
}
</style>
