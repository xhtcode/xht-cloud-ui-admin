import {createI18n} from "vue-i18n";
import enLocale from "@/lang/package/en/index";
import zhCnLocale from "@/lang/package/zh-cn/index";
import {useStorage} from "@/hooks/use-storage";

const themeStoreHooks = useStorage<ThemeStoreType>('xht_theme', 'local').value
const messages = {
    "zh-cn": {
        ...zhCnLocale,
    },
    en: {
        ...enLocale,
    },
};
const i18n = createI18n({
    legacy: false,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    locale: themeStoreHooks?.langType || 'zh-cn',
    globalInjection: true,
    messages: messages,
});
export default i18n;
