<template>
	<div class="main-container-scrollbar">
		<div class="main-container-auto main-container-view">
			{{showSearch}}
			<right-tool-bar search
			                refresh
			                v-model:showSearch="showSearch"
			                export
			                column
			                :column-data="data"
			/>
			<p v-for="item in data">{{ item }}</p>
		</div>
	</div>
</template>

<script lang='ts' setup>
import type {ColumnOption} from "@/components/right-tool-bar/types";

defineOptions({name: 'HomeViewComponentIndex'})
const showSearch = ref<boolean>(false)

const generateData = () => {
	const data: ColumnOption[] = []
	for (let i = 1; i <= 15; i++) {
		data.push({
			name: `英文字段 ${i}`,
			visible: true,
			value: '中文字段' + i,
			disabled: false,
		})
	}
	return data
}

const data = ref<ColumnOption[]>(generateData())
</script>

<style lang='scss' scoped>
</style>
