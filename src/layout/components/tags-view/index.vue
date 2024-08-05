<template>
	<div class="header-container-tags">
		<div class="tags-container">
			<span class="tags-container-view-tool tags-container-view-tool-first" @click="move(-100)">
				<el-icon class="tags-view-tool-icon-hover">
					<d-arrow-left/>
				</el-icon>
			</span>
			<div style="overflow: hidden;flex: 1">
				<el-scrollbar ref="scrollbarRef" class="h100" view-class="h100" @scroll="elScrollbarScroll">
					<div class="h100 flex" style="align-items: center">
						<ContextMenu v-for="item in visitedViews" :key="item.path" :ref="itemRefs.set" :class="[
							`tags-view-item`,
							item.affixStatus ? `tags-view-item-affix` : '',
							{
								'is-active': isActive(item)
							}
						]"

						             :menu-list="[
							{
								icon: 'ep-refresh',
								label: '重新加载',
								disabled: selectedTag?.fullPath !== item.path,
								command: 'refresh'
							},
							{
								icon: 'ep-full-screen',
								label: '此页全屏',
								command: 'fullScreen'
							},
							{
								icon: 'ep-close',
								label: '关闭此项',
								disabled: !!visitedViews.length && selectedTag?.meta.affixStatus,
								command: 'close'
							},
							{
								divided: true,
								icon: 'ep-d-arrow-left',
								label: '关闭左侧',
								disabled:
									!!visitedViews.length &&
									(item.path === visitedViews[0].path ||
										selectedTag?.fullPath !== item.path),
								command: 'closeLeft'
							},
							{
								icon: 'ep-d-arrow-right',
								label: '关闭右侧',
								disabled:
									!!visitedViews?.length &&
									(item.path === visitedViews[visitedViews.length - 1].path ||
										selectedTag?.fullPath !== item.path),
								command: 'closeRight'
							},
							{
								divided: true,
								icon: 'ep-discount',
								label: '关闭其他',
								disabled: selectedTag?.fullPath !== item.path,
								command: 'closeOther'
							},
							{
								icon: 'ep-minus',
								label: '关闭全部',
								command: 'closeAll'
							}
						]" :tag-item="item" @change="commandTrigger" @visible-change="visibleChange">
							<div>
								<router-link :ref="tagLinksRefs.set" v-slot="{ navigate }"
								             :key="item.path"
								             :to="{path:item.path,query:item.query}"
								             custom>
									<div style="
										display: flex;
										place-items: center center;
										height: 100%;
										padding-left: 15px;
										white-space: nowrap;
									" @click="navigate">
										<svg-icon v-if="item.icon && tagsViewIcon"
										          :name="item.icon" size="12" class="mr-5"/>
										{{ item.title }}
										<el-icon :size="13" class="tags-view-item-close"
										         @click.prevent.stop="closeSelectedTag(item)">
											<close/>
										</el-icon>
									</div>
								</router-link>
							</div>
						</ContextMenu>
					</div>
				</el-scrollbar>
			</div>
			<span class="tags-container-view-tool" @click="move(100)">
				<el-icon class="tags-view-tool-icon-hover">
					<d-arrow-right/>
				</el-icon>
			</span>
			<span class="tags-container-view-tool" @click="refreshSelectedTag(selectedTag)">
				<el-icon class="tags-view-tool-icon-hover">
					<refresh-right/>
				</el-icon>
			</span>
			<ContextMenu :menuList="defaultMenuList" trigger="click" @change="commandTrigger">
				<span class="tags-container-view-tool flex-center">
					<svg-icon class="tags-view-tool-icon-hover" name="ep-Menu"></svg-icon>
				</span>
			</ContextMenu>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded, RouterLinkProps} from 'vue-router'
import {useRoute, useRouter} from 'vue-router'
import {filterAffixTagsView, formatRoute} from './helper'
import {useTemplateRefsList} from '@vueuse/core'
import {useRouterListStore} from '@/store/modules/routesList'
import {useThemeStore} from '@/store/modules/theme'
import {Close, DArrowLeft, DArrowRight, RefreshRight} from "@element-plus/icons-vue";
import {useTagsViewStore} from "@/store/modules/tags-view";
import {useScrollTo} from "@/utils/scroll-to";

defineOptions({name: 'TagsViewComponent'})
const router = useRouter()
const route = useRoute();
const permissionStore = useRouterListStore()
const themeStore = useThemeStore()
const tagsViewPlusStore = useTagsViewStore();

/**
 * 所有右键菜单组件的元素
 */
const itemRefs = useTemplateRefsList<any>()
const affixTagArr = ref<TagsViewType[]>([])
const tagLinksRefs = useTemplateRefsList<RouterLinkProps>()
const scrollbarRef = ref<any>()
const tagsViewIcon = computed(() => themeStore.tagsViewIcon)
const routers = computed(() => permissionStore.routerOldList)
const visitedViews = computed(() => tagsViewPlusStore.visitedViews)
const scrollLeftNumber = ref(0)

const selectedTag = ref<RouteLocationNormalizedLoaded>()
const defaultMenuList = [
	{
		icon: 'ep-refresh',
		label: '重新加载',
		command: 'refresh'
	},
	{
		icon: 'ep-full-screen',
		label: '当前页全屏',
		command: 'fullScreen'
	},
	{
		icon: 'ep-minus',
		label: '关闭全部',
		command: 'closeAll'
	}
]
const commandTrigger = (command: string, tagItem: any) => {
	switch (command) {
		case 'refresh':
			refreshSelectedTag(selectedTag.value)
			break
		case 'fullScreen':
			break
		case 'close':
			closeSelectedTag(tagItem)
			break
		case 'closeLeft':
			tagsViewPlusStore.removeLeftVisitedViews(tagItem)
			break
		case 'closeRight':
			tagsViewPlusStore.removeRightVisitedViews(tagItem)
			break
		case 'closeOther':
			tagsViewPlusStore.removeOtherVisitedViews(tagItem)
			break
		case 'closeAll':
			tagsViewPlusStore.removeAllVisitedViews()
			toLastView()
			break
	}
}
/**
 * 初始化tag
 */
const initTags = () => {
	affixTagArr.value = filterAffixTagsView(unref(routers))
	for (const tag of unref(affixTagArr)) {
		if (tag.name) {
			tagsViewPlusStore.addVisitedViews(tag)
		}
	}
}

/**
 * 新增tag
 */
const addTags = () => {
	const currentRoute = router.currentRoute.value
	if (currentRoute.name && !currentRoute.meta.breadCrumbStatus) {
		selectedTag.value = router.currentRoute.value
		tagsViewPlusStore.addVisitedViews(formatRoute(router.currentRoute.value))
	}
	return false
}

/**
 * 关闭选中的tag
 */
const closeSelectedTag = (view: TagsViewType) => {
	if (view.affixStatus) return
	tagsViewPlusStore.removeVisitedView(view)
	if (isActive(view)) {
		toLastView()
	}
}
/**
 * 重新加载
 */
const refreshSelectedTag = async (view?: RouteLocationNormalizedLoaded) => {
	if (!view) return
	const {path, query} = view
	await nextTick(() => {
		router.replace({
			path: '/redirect' + path,
			query: query
		}).then()
	})
}


/**
 * 跳转到最后一个
 */
const toLastView = () => {
	const visitedViews = tagsViewPlusStore.visitedViews
	const latestView = visitedViews.slice(-1)[0]
	if (latestView) {
		router.push({path: latestView.path})
	} else {
		router.replace({path: '/redirect/home'})
	}
}

/**
 * 是否是当前tag
 */
const isActive = (route: TagsViewType): boolean => {
	return route.path === unref(router.currentRoute).fullPath
}
/**
 * 滚动到选中的tag
 */
const moveToCurrentTag = async () => {
	await nextTick(() => {
		for (const v of unref(visitedViews)) {
			if (v.path === unref(router.currentRoute).path) {
				moveToTarget(v)
				break
			}
		}
	})
}
const moveToTarget = (currentTag: TagsViewType) => {
	const wrap$ = unref(scrollbarRef)?.wrapRef
	let firstTag: RouterLinkProps | null = null
	let lastTag: RouterLinkProps | null = null
	const tagList = unref(tagLinksRefs)
	if (tagList.length > 0) {
		firstTag = tagList[0]
		lastTag = tagList[tagList.length - 1]
	}
	if ((firstTag?.to as RouteLocationNormalized).path === currentTag.path) {
		// 直接滚动到0的位置
		useScrollTo({
			el: wrap$!,
			position: 'scrollLeft',
			to: 0,
			duration: 500
		}).start()
	} else if ((lastTag?.to as RouteLocationNormalized).path === currentTag.path) {
		// 滚动到最后的位置
		useScrollTo({
			el: wrap$!,
			position: 'scrollLeft',
			to: wrap$!.scrollWidth - wrap$!.offsetWidth,
			duration: 500
		}).start()
	} else {
		const currentIndex: number = tagList.findIndex(
				(item) => (item?.to as RouteLocationNormalized).path === currentTag.path
		)
		const tgsRefs = document.getElementsByClassName(`tags-view-item`)
		const prevTag = tgsRefs[currentIndex - 1] as HTMLElement
		const nextTag = tgsRefs[currentIndex + 1] as HTMLElement
		// 标签的左偏移量在nextTag之后
		const afterNextTagOffsetLeft = (nextTag?.offsetLeft || 0) + (nextTag?.offsetWidth || 0) + 4
		// 标签在prevTag之前的偏移
		const beforePrevTagOffsetLeft = (prevTag?.offsetLeft || 0) - 4
		if (afterNextTagOffsetLeft > unref(scrollLeftNumber) + wrap$!.offsetWidth) {
			useScrollTo({
				el: wrap$!,
				position: 'scrollLeft',
				to: afterNextTagOffsetLeft - wrap$!.offsetWidth,
				duration: 500
			}).start()
		} else if (beforePrevTagOffsetLeft < unref(scrollLeftNumber)) {
			useScrollTo({
				el: wrap$!,
				position: 'scrollLeft',
				to: beforePrevTagOffsetLeft,
				duration: 500
			}).start()
		}
	}
}

const elScrollbarScroll = ({scrollLeft}: any) => {
	scrollLeftNumber.value = scrollLeft as number
}
/**
 * 右键菜单装填改变的时候
 */
const visibleChange = (visible: boolean, tagItem: RouteLocationNormalizedLoaded) => {
	if (visible) {
		for (const v of unref(itemRefs)) {
			const elDropdownMenuRef = v.elDropdownMenuRef
			if (tagItem?.fullPath !== v.tagItem?.path) {
				elDropdownMenuRef?.handleClose()
			}
		}
	}
}
/**
 * 移动到某个位置
 */
const move = (to: number) => {
	const wrap$ = unref(scrollbarRef)?.wrapRef
	const {start} = useScrollTo({
		el: wrap$!,
		position: 'scrollLeft',
		to: unref(scrollLeftNumber) + to,
		duration: 500
	})
	start()
}
onMounted(() => {
	initTags()
})

watch(
		() => route.name,
		(newVal) => {
			if (newVal) {
				addTags()
			}
			moveToCurrentTag()
		}, {
			immediate: true
		}
)
</script>
