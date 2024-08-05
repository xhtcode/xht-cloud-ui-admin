<template>
	<el-tag :class="tagClass" v-for="(item, index) in dictList" :key="index" :closable="closable" :effect="effect"
	        :round="round"
	        :size="size" :type="item.tagType">
		{{ item.dictValue }}
	</el-tag>
</template>

<script lang="ts" setup>
import {useDictHooks} from "@/hooks/use-dict";
import type {DictTagPropsType} from "@/components/dict/types";
import {SysDictItemResponse} from "@/api/system/dict/type";

defineOptions({name: 'DictTagComponent'})
const props = withDefaults(
		defineProps<DictTagPropsType>(),
		{
			view: false,
			hit: false, // 是否有边框描边
			round: false, // Tag 是否为圆形
			closable: false, // 是否显示关闭
			disableTransitions: false, //	是否禁用渐变动画
		}
)
const {dictInfo} = useDictHooks(props.dictCode);
const dictList = computed<SysDictItemResponse[]>(() => {
	if (props.view) {
		return dictInfo.value?.filter(item => props.initValue?.includes(item.dictCode)) || []
	}
	return dictInfo.value || []
})
</script>
