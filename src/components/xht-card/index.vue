<template>
	<div class="xht-card-container">
		<div v-if="$slots.header && state.topStatus" class="xht-card-header">
			<slot name="header"/>
		</div>
		<div class="xht-card-default">
			<slot/>
		</div>
		<div v-if="$slots.footer && state.footerStatus" class="xht-card-footer">
			<slot name="footer"/>
		</div>
		<div v-if="tool" class="xht-card-tool">
			<div v-if="$slots.header && state.foldStatus" :class="topClassName" class="xht-card-tool-item mr-5"
			     @click="handlerToolChange('top')">
				<ep-top/>
			</div>
			<div v-if="$slots.footer && state.foldStatus" :class="footerClassName" class="xht-card-tool-item mr-5"
			     @click="handlerToolChange('footer')">
				<ep-bottom/>
			</div>
			<div :class="foldClassName" class="xht-card-tool-item" @click="handlerToolChange('fold')">
				<svg-icon name="ep-tools"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

defineOptions({name: 'ViewCardComponent'})

interface PropsType {
	tool?: boolean
	top?: boolean
	footer?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
	tool: false,
	top: false,
	footer: false
})
const state = reactive({
	foldStatus: false,
	topStatus: props.top,
	footerStatus: props.footer
})

const handlerToolChange = (type: 'top' | 'fold' | 'footer') => {
	switch (type) {
		case "top":
			state.topStatus = !state.topStatus
			break
		case "fold":
			state.foldStatus = !state.foldStatus
			break
		case "footer":
			state.footerStatus = !state.footerStatus
			break
	}
}
const topClassName = computed(() => {
	return {'xht-card-tool-active': state.topStatus}
})
const foldClassName = computed(() => {
	return {'xht-card-tool-active': state.foldStatus}
})
const footerClassName = computed(() => {
	return {'xht-card-tool-active': state.footerStatus}
})
</script>

<style lang="scss" scoped>
.xht-card-container {
	--xht-card-padding: 20px;
	--xht-card-radius-base: 8px;
	--xht-card-tool-hover: var(--xht-button-hover-bg-color);
	background-color: var(--xht-card-bg-color);
	border: 1px solid var(--xht-card-border-color);
	border-radius: var(--xht-card-radius-base);
	color: var(--xht-text-color);
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;

	.xht-card-tool {
		min-width: calc(var(--xht-card-padding) * 1.5);
		height: calc(var(--xht-card-padding) * 1.5);
		position: absolute;
		top: calc(var(--xht-card-padding) / 2);
		right: var(--xht-card-padding);
		@extend .flex-center, .pt-5;
		user-select: none;

		.xht-card-tool-item {
			width: calc(var(--xht-card-padding) * 1.5);
			border-radius: var(--xht-border-radius-circle);
			height: calc(var(--xht-card-padding) * 1.5);
			@extend .flex-center;
			@extend .cursor-pointer;
			border: 1px solid var(--xht-card-border-color);

			&:hover {
				background: var(--xht-card-tool-hover);
			}
		}

		.xht-card-tool-active {
			color: var(--el-color-primary);
		}
	}

	.xht-card-header {
		border-bottom: 1px solid var(--xht-card-border-color);
		box-sizing: border-box;
		padding: calc(var(--xht-card-padding) - 2px) var(--xht-card-padding);
		user-select: none;
	}

	.xht-card-default {
		padding: var(--xht-card-padding);
		overflow-y: auto;
		overflow-x: hidden;
		flex: 1;
	}

	.xht-card-footer {
		border-top: 1px solid var(--xht-card-border-color);
		box-sizing: border-box;
		padding: calc(var(--xht-card-padding) - 2px) var(--xht-card-padding);
		user-select: none;
	}
}
</style>
