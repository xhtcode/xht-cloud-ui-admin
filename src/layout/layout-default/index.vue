<template>
	<div class="layout-container">
		<el-container class="wh-100">
			<el-aside :style="asideStyle" class="layout-aside">
				<logo-image/>
				<el-scrollbar view-class="user-select-none">
					<menu-main/>
				</el-scrollbar>
			</el-aside>
			<el-container>
				<el-header class="layout-header">
					<div class="layout-header-info h100">
						<menu-lock/>
						<bread-crumb/>
					</div>
					<div class="layout-aside-setting h100">
						<full-screen class="layout-aside-setting-item button-hover"/>
						<size-select class="layout-aside-setting-item button-hover"/>
						<user-avatar/>
						<theme-setting class="layout-aside-setting-item button-hover"/>
					</div>
				</el-header>
				<tags-view/>

				<el-main class="layout-main">
					<el-scrollbar class="layout-main-scrollbar"
					              view-class="layout-main-scrollbar"
					              wrap-class="layout-main-scrollbar">
						<div class="layout-main-parent">
							<router-view>
								<template #default="{ Component, route }">
									<keep-alive :include="[...getCaches]">
										<component :is="Component" :key="route.fullPath" class="w100"/>
									</keep-alive>
								</template>
							</router-view>
						</div>
					</el-scrollbar>
				</el-main>
				<el-footer class="layout-footer user-select-none" v-if="footerStatus">Footer</el-footer>
			</el-container>
		</el-container>
		<fps/>
	</div>
</template>

<script lang='ts' setup>
import MenuLock from '@/layout/components/menu-lock/index.vue'
import LogoImage from '@/layout/components/logo-image/index.vue'
import MenuMain from '@/layout/components/menu-main/index.vue'
import TagsView from '@/layout/components/tags-view/index.vue'
import UserAvatar from '@/layout/components/user-avatar/index.vue'
import {useThemeHooks} from '@/hooks/use-theme-hooks';
import BreadCrumb from "@/layout/components/bread-crumb/index.vue";
import {useTagsViewStore} from "@/store/modules/tags-view";

defineOptions({name: 'LayoutDefaultComponent'})

const {asideStyle, footerStatus} = useThemeHooks()
const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
	return tagsViewStore.cachedViews
})
</script>

<style lang='scss' scoped></style>
