<script lang="ts" setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import {useThemeStore} from "@/store/modules/theme";

defineOptions({ name: 'AppComponentIndex'})

const themeStore = useThemeStore()
const lang = computed(() => themeStore.langType === 'zh-cn' ? zhCn : en)
const content = computed<string>(() => themeStore.watermarkContent)
</script>
<template>
	<el-watermark :content="content" :rotate="-45" class="vwh-100">
		<el-config-provider :locale="lang" :size="themeStore.sizeType">
			<router-view/>
		</el-config-provider>
	</el-watermark>
</template>
