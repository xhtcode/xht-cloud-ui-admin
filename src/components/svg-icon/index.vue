<template>
	<el-icon v-if="isShowIconSvg" :color="color" :size="size">
		<component :is="getElementIconName"/>
	</el-icon>
	<svg v-else :style="{ width: size, height: size }" aria-hidden="true" class="svg-icon">
		<use :fill="color" :href="getSvgIconName"/>
	</svg>
</template>
<script lang="ts" setup>

defineOptions({ name: 'SvgIconComponent'})

interface PropsType {
	name: string | null | undefined //icon Name
	prefix?: string //前缀
	color?: string //颜色
	size?: string | number //大小
}

const props = withDefaults(defineProps<PropsType>(), {
	prefix: 'icon',
	size: '1.2em'
})
/**
 * 用于判断 element plus 自带 svg 图标的显示、隐藏
 * @return element plus true
 */
const isShowIconSvg = computed(() => {
	return props?.name?.startsWith('ep-');
});

/**
 * 'gi' 是正则表达式的标志，g 表示全局搜索（查找所有匹配项而非仅第一个），i 表示不区分大小写
 */
const regex = new RegExp('^ep-', 'gi');
/**
 * 获取 icon 图标名称
 */
const getSvgIconName = computed<string>(() => `#${props.prefix}-${props.name}`);
const getElementIconName = computed<string>(() => props.name ? props.name.replace(regex, '') : '');

</script>
<style scoped>
.svg-icon {
	user-select: none;
	display: inline-block;
	outline: none;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
