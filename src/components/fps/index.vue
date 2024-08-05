<script lang="ts" setup>
import {useFps} from "@/hooks/use-fps";
import {useThemeStore} from "@/store/modules/theme";
import {useZIndex} from 'element-plus'

defineOptions({ name: 'FpsComponent'})

const themeStore = useThemeStore()
const fps = useFps()

const zIndex = useZIndex()
const index = computed(() => zIndex.nextZIndex() * 2)
</script>

<template>
	<div>
		<teleport v-if="themeStore.fpsStatus" to="body">
			<div class="text-right fps-container">
				<span class="color-warning">FPS：{{ fps }}</span>
			</div>
		</teleport>
	</div>
</template>

<style lang="scss" scoped>
.fps-container {
	position: absolute;
	top: 3vw;
	right: 3vw;
	user-select: none;
	z-index: v-bind(index);
	pointer-events: none;
}
</style>
