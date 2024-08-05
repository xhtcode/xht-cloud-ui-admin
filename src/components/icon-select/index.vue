<template>
	<div class="icon-select-container w100">
		<el-input
				v-model="modelValue"
				:placeholder="placeholder"
				class="icon-select-input"
				readonly
				@click="openDialog"
		>
			<template #prepend @click="openDialog">
				<svg-icon :name="modelValue"/>
			</template>
			<template v-if="clearable" #suffix>
				<el-icon class="button-hover" size="1em" @click="clearableValue">
					<ep-circle-close/>
				</el-icon>
			</template>
		</el-input>
		<el-dialog
				v-model="dialogVisible"
				:before-close="closeDialog"
				:close-on-click-modal="true"
				:title="title"
				modal-class="icon-select-modal"
				top="50px"
				width="66%">
			<el-input
					v-model="inputValue"
					autofocus
					clearable
					placeholder="请输入要搜索图标的提示"
					prefix-icon="Search"
					size="large"/>
			<el-tabs v-model="activeName" @tab-change="handleChangeIconItem">
				<el-tab-pane label="element-plus" name="element-plus">
					<el-scrollbar height="300px">
						<ul class="icon-container">
							<li
									v-for="(item,index) in iconsList"
									:key="index"
									class="icon-item"
									@click="selectIcon(item)"
							>
								<svg-icon :name="`${item.iconName}`"/>
							</li>
						</ul>
						<el-empty v-if="iconsList.length === 0" description="未搜索到您要找的图标~"/>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="本地图标" name="locale">
					<el-scrollbar height="300px">
						<ul class="icon-container">
							<li
									v-for="(item,index) in iconsList"
									:key="index"
									class="icon-item"
									@click="selectIcon(item)"
							>
								<svg-icon :name="`${item.iconName}`"/>
							</li>
						</ul>
						<el-empty v-if="iconsList.length === 0" description="未搜索到您要找的图标~"/>
					</el-scrollbar>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core'
import * as Icons from '@element-plus/icons-vue'
import {TabPaneName} from "element-plus";

defineOptions({ name: 'SelectIconComponent'})

interface IconItemOptions {
	itemType: string
	iconName: any
}

interface PropsType {
	modelValue: string | null | undefined
	title?: string
	prepend?: string // 输入框前置内容
	placeholder?: string // 输入框占位文本
	size?: UI_SIZE_TYPE 	// 输入框大小
	disabled?: boolean // 禁用
	clearable?: boolean // 清空
}

const props = withDefaults(defineProps<PropsType>(), {
	placeholder: '请输入内容搜索图标或者选择图标', // 输入框占位文本
	disabled: false, // 禁用
	clearable: false, // 禁用
})
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const activeName = ref('element-plus')
const dialogVisible = ref(false)
const inputValue = ref<string | null | undefined>(modelValue.value)
const iconItems = ref<IconItemOptions[]>([])
const initElement = () => {
	iconItems.value = []
	for (let item in Icons) {
		iconItems.value?.push({
			itemType: 'element-plus',
			iconName: `ep-${item}`
		})
	}
}
const initSvg = () => {
	iconItems.value = []
	for (const icon in import.meta.glob('../../assets/icons/**/*.svg')) {
		const iconName = icon.split('assets/icons/')[1].split('.svg')[0].replace('/', '-')
		iconItems.value?.push({itemType: 'svg', iconName: iconName})
	}
}


/**
 * 打开
 */
const openDialog = () => {
	if (modelValue.value && !modelValue.value.startsWith('ep-')) {
		activeName.value = 'locale'
		handleChangeIconItem('locale')
	}
	dialogVisible.value = true

}
const clearableValue = () => {
	modelValue.value = ''
}
/**
 * 关闭
 */
const closeDialog = () => {
	dialogVisible.value = false
	inputValue.value = ''
	activeName.value = 'element-plus'
}
/**
 * 选中图标
 * @param item
 */
const selectIcon = (item: IconItemOptions) => {
	modelValue.value = item.iconName
	closeDialog()
}
/**
 * 初始化图标 并且根据搜索值计算图标有多少
 */
const iconsList = computed<IconItemOptions[]>(() => {
	if (!inputValue.value) return iconItems.value
	let result: IconItemOptions[] = []
	iconItems.value.forEach((item: IconItemOptions) => {
		if (item.iconName.toLowerCase().indexOf(inputValue.value!.toLowerCase()) > -1) {
			result.push({...item})
		}
	})
	return result
})

/**
 * 图标类型切换
 */
const handleChangeIconItem = (type: TabPaneName) => {
	if (type === 'element-plus') {
		initElement()
	} else {
		initSvg()
	}
}

onMounted(() => {
	initElement()
})
</script>
