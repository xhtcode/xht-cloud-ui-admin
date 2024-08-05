<template>
	<div class="top-right-btn" :style="style">
		<el-tooltip class="item" :content="showSearch ? '隐藏查询' : '显示查询'" placement="top" v-if="searchStatus">
			<el-button circle icon="Search" @click="toggleSearch"/>
		</el-tooltip>
		<el-tooltip class="item" content="刷新" placement="top" v-if="refreshStatus">
			<el-button type="info" circle icon="Refresh" @click="refresh"/>
		</el-tooltip>
		<el-tooltip class="item" content="导入" placement="top" v-if="importStatus">
			<el-button type="success" circle icon="Upload" @click="importData"/>
		</el-tooltip>
		<el-tooltip class="item" content="导出" placement="top" v-if="exportStatus">
			<el-button type="primary" circle icon="Download" @click="exportData"/>
		</el-tooltip>
		<el-tooltip class="item" content="显隐列" placement="top" v-if="columnStatus">
			<el-button color="#626aef" circle icon="Menu" @click="showColumn"/>
		</el-tooltip>
		<slot/>
		<el-dialog title="显示/隐藏" v-model="state.openStatus" append-to-body>
			<div class="w100 flex-center">
				<el-transfer
						v-loading="state.loadingStatus"
						:titles="[ '隐藏','显示']"
						:props="{
				      key: 'value',
				      label: 'name',
				    }"
						v-model="state.columnValue"
						:data="columnData" @change="dataChange"
				></el-transfer>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import type {EmitsType, RightToolbarPropsType, StateType} from "@/components/right-tool-bar/types";
import {ColumnOption} from "@/components/right-tool-bar/types";
import type {TransferDirection, TransferKey} from "element-plus";
import {useVModel} from "@vueuse/core";

defineOptions({name: 'RightToolbarComponent'})
const props = withDefaults(defineProps<RightToolbarPropsType>(), {
	searchStatus: false,// 是否显示搜索框
	showSearch: false,// 是否显示搜索框提示
	refreshStatus: false,// 是否显示刷新
	importStatus: false,// 是否导入
	exportStatus: false,// 是否导出
	columnStatus: false,// 显隐列
	columnData: () => [],// 显隐数据
	gutter: 0,// 列表项之间的间距
})
const emits = defineEmits<EmitsType>()
const state = reactive<StateType>({
	columnValue: [], // 显隐数据
	openStatus: false,// 是否显示弹出层
	loadingStatus: false // 加载
})
const showSearch = useVModel(props, 'showSearch', emits)

const columnData = computed(() => props.columnData || [])
/**
 * 如果props中有传入gutter属性，则计算出marginRight 返回计算后的样式对象
 */
const style = computed(() => {
	if (props.gutter && props.gutter >= 10) {
		return {
			marginRight: `${props.gutter / 2}px`
		}
	}
	return {marginRight: '0px'};
});

/**
 * 右侧列表元素变化
 * @param _
 * @param direction
 * @param movedKeys
 */
function dataChange(_: any, direction: TransferDirection, movedKeys: TransferKey[]) {
	state.loadingStatus = true
	const result: ColumnOption[] = []
	props.columnData.forEach(item => {
		if (movedKeys.includes(item.value)) {
			result.push({...item, visible: direction === 'right'})
		} else {
			result.push({...item})
		}
	})
	emits('update:columnData', result)
	state.loadingStatus = false
}


/**
 * 搜索切换
 */
const toggleSearch = () => {
	showSearch.value = !showSearch.value
}

/**
 * 导入数据
 */
const importData = () => {
	emits('import')
}

/**
 * 导出数据
 */
const exportData = () => {
	emits('export')
}

/**
 * 刷新
 */
const refresh = () => {
	emits('refresh')
}

/**
 * 打开显隐列dialog
 */
const showColumn = () => {
	state.loadingStatus = true
	state.columnValue = []
	state.openStatus = true
	// 显隐列初始默认隐藏列
	props.columnData.forEach(item => {
		if (item.visible) {
			state.columnValue.push(item.value)
		}
	})
	state.loadingStatus = false
}
</script>

<style lang="scss" scoped>
/* 表格右侧工具栏样式 */
.top-right-btn {
	display: flex;
	justify-content: flex-end;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
