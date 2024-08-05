<template>
	<div class="pagination-container">
		<el-pagination
				:background="pageInfo.background"
				:currentPage="currentPage"
				:default-current-page="pageInfo.defaultCurrentPage"
				:default-page-size="pageInfo.defaultPageSize"
				:disabled="pageInfo.disabled"
				:hideOnSinglePage="pageInfo.hideOnSinglePage"
				:layout="pageInfo.layout"
				:nextIcon="pageInfo.nextIcon"
				:nextText="pageInfo.nextText"
				:page-count="pageInfo.pageCount"
				:page-size="pageSize"
				:pageSizes="pageInfo.pageSizes"
				:pager-count="pageInfo.pagerCount"
				:prevIcon="pageInfo.prevIcon"
				:prevText="pageInfo.prevText"
				:teleported="pageInfo.teleported"
				:total="pageInfo.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"/>
	</div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useVModels} from '@vueuse/core'

defineOptions({ name: 'PaginationComponent'})

interface PropsType {
	background?: boolean //是否为分页按钮添加背景色
	pageSize: number | undefined //	每页显示条目个数
	defaultPageSize?: number //每页默认的条目个数，不设置时默认为10
	total: number | undefined  //:	总条目数
	pageCount?: number | undefined //总页数， total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
	pagerCount?: number //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
	currentPage: number | undefined  //当前页数
	defaultCurrentPage?: number //当前页数的默认初始值，不设置时默认为 1
	layout?: string //组件布局，子组件名用逗号分隔
	pageSizes?: number[] //每页显示个数选择器的选项设置
	prevText?: string //	替代图标显示的上一页文字
	prevIcon?: string // Component	上一页的图标， 比 prev-text 优先级更高
	nextText?: string //替代图标显示的下一页文字
	nextIcon?: string // Component	下一页的图标， 比 next-text 优先级更低
	disabled?: boolean //是否禁用分页
	teleported?: boolean //是否将下拉菜单teleport至 body
	hideOnSinglePage?: boolean //只有一页时是否隐藏
}

const props = withDefaults(defineProps<PropsType>(), {
	background: true, //是否为分页按钮添加背景色
	defaultPageSize: 10, //每页默认的条目个数，不设置时默认为10
	pagerCount: () => {
		return document.body.clientWidth < 992 ? 5 : 7
	}, //设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
	defaultCurrentPage: 1, //当前页数的默认初始值，不设置时默认为 1
	layout: 'total, sizes, prev, pager, ->, next, jumper', //组件布局，子组件名用逗号分隔
	pageSizes: () => [10, 20, 30, 50, 100, 500], //每页显示个数选择器的选项设置
	disabled: false, //是否禁用分页
	teleported: true, //是否将下拉菜单teleport至 body
	hideOnSinglePage: false //只有一页时是否隐藏
})

const emits = defineEmits(['update:pageSize', 'update:currentPage', 'pagination'])
const pageInfo = computed<PropsType>(() => props)

const {pageSize, currentPage} = useVModels(props, emits)
/**
 *  page-size 改变时触发
 */
const handleSizeChange = (val: number) => {
	// 如果修改后超过最大页面，强制跳转到第 1 页
	pageSize.value = val
	emits('pagination')
}

/**
 * current-page 改变时触发
 */
const handleCurrentChange = (val: number) => {
	currentPage.value = val
	emits('pagination')
}
</script>

<style lang="scss" scoped>
.pagination-container {
	display: flex;
	flex-direction: row-reverse;
	padding: 12px;
	user-select: none;
}
</style>
