<template>
	<el-dropdown trigger="click" @command="handleLanguageChange">
		<div class="button-hover no-border " size="default">
			<svg-icon v-if="props.icon" name="language" size="16px"/>
			<el-text v-if="!props.icon" class="user-select-none">{{ langType }}</el-text>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in langOptions" :key="item.value" :command="item.value"
				                  :disabled="item.value === themeStore.langType" class="user-select-none">
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script lang="ts" setup>
import {LANG_CONSTANT} from "@/constants";
import {useMessage} from "@/hooks/use-message";
import {useThemeStore} from "@/store/modules/theme";
import {useI18n} from "vue-i18n";

const {locale} = useI18n();
defineOptions({ name: 'LangSelectComponent'})

const themeStore = useThemeStore()

interface PropsType {
	icon?: boolean //icon Name

}

const props = withDefaults(defineProps<PropsType>(), {
	icon: false,
})
/**
 * 语言类型数组
 *
 */
const langOptions = LANG_CONSTANT

const langType = computed<string>(() => themeStore.langType === 'zh-cn' ? '简体中文' : 'English')
/**
 * 语言切换
 * @param lang 语言类型
 */
const handleLanguageChange = (lang: LANG_TYPE) => {
	const loading = ElLoading.service({
		lock: true,
	})
	locale.value = lang;
	themeStore.changeLangType(lang)
	setTimeout(() => {
		if (lang == 'en') {
			useMessage().success("Language switch successful!");
		} else {
			useMessage().success("语言切换成功！");
		}
		loading.close()
	}, 500)
}
</script>
