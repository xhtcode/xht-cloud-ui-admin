<template>
	<div @click="toggleFullScreen">
		<svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"/>
	</div>
</template>

<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core'

defineOptions({ name: 'FullScreenComponent'})
const {toggle: toggleFullScreen, isFullscreen} = useFullscreen()
</script>

<style scoped></style>
