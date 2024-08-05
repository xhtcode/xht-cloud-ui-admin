<template>
	<div @click="changeVisible">
		<el-icon>
			<Setting/>
		</el-icon>
		<el-drawer v-model="visible" :close-on-click-modal="false" append-to-body size="300" title="主题设置">
			<el-divider>全局主题</el-divider>
			<div class="settings-option">
				<span class="settings-option-text">暗黑模式</span>
				<div class="settings-option-operate">
					<switch-dark/>
				</div>
			</div>
			<div class="settings-option">
				<span class="settings-option-text">FPS</span>
				<div class="settings-option-operate">
					<switch-fps/>
				</div>
			</div>
			<div class="settings-option">
				<span class="settings-option-text">主题颜色</span>
				<div class="settings-option-operate">
					<theme-color-picker/>
				</div>
			</div>
			<div class="settings-option">
				<span class="settings-option-text">组件大小</span>
				<size-select class="settings-option-operate button-hover"/>
			</div>
			<div class="settings-option">
				<span class="settings-option-text">语言设置</span>
				<lang-select class="settings-option-operate button-hover"/>
			</div>
			<div class="settings-option">
				<span class="settings-option-text">水印内容</span>
				<div class="settings-option-operate">
					<el-input v-model="themeStore.watermarkContent"  disabled maxlength="10" show-word-limit placeholder="请输入水印内容"/>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
import {useThemeStore} from "@/store/modules/theme";

defineOptions({name: 'ThemeSettingComponent'})

const visible = ref(false)
const themeStore = useThemeStore()
/**
 * 改变模态框的状态
 */
const changeVisible = () => {
	visible.value = true
}
</script>

<style lang="scss" scoped>
.settings-option {
	@extend .flex;
	@extend .mt-5;
	justify-content: space-between;
	align-items: center;
	padding-left: 1rem;
	min-height: 35px;

	.settings-option-text {
		user-select: none;
		line-height: 1rem;
		display: block;
		flex: 1;
		text-align: left;
	}

	.settings-option-operate {
		flex: 2;
		text-align: center;
		height: 35px;
		line-height: 35px;
		display: inline-block !important;
		border-radius: var(--el-border-radius-base);
	}
}
</style>
