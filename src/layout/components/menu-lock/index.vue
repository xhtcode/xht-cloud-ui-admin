<template>
	<div class="collapse-icon button-hover" @click="changeMenuStatus">
		<el-icon>
			<ep-expand v-if="menuStatus"/>
			<ep-fold v-else/>
		</el-icon>
	</div>
</template>

<script lang="ts" setup>
import {useThemeHooks} from '@/hooks/use-theme-hooks';

defineOptions({ name: 'MenuLockComponent'})
const {menuStatus, changeMenuStatus} = useThemeHooks()
</script>

<style lang="scss" scoped>
.collapse-icon {
	@extend .flex-center;
	width: 40px;
	height: 100%;
	font-size: 20px;
}
</style>
