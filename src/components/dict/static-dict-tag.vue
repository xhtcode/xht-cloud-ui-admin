<template>
	<el-tag v-for="(item, index) in dictListData" :key="index" :closable="closable" :effect="effect" :round="round"
	        :size="size" :color="item.color" :type="item.tagType">
		{{ item.label }}
	</el-tag>
</template>

<script lang="ts" setup>
import type {StaticDictTagPropsType} from "@/components/dict/types";

defineOptions({name: 'StaticDictTagComponent'})
const props = withDefaults(
		defineProps<StaticDictTagPropsType>(),
		{
			view: false,
			hit: false, // 是否有边框描边
			round: false, // Tag 是否为圆形
			closable: false, // 是否显示关闭
			disableTransitions: false, //	是否禁用渐变动画
		}
)

const dictListData = computed<StaticDictType[]>(() => {
	if (props.view) {
		return props.dictList.filter(item => props.initValue!.includes(item.value))
	}
	return props.dictList || []
})
</script>

<style lang="scss" scoped></style>
