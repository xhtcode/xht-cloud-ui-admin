<template>
	<div class="login-container">
		<switch-dark class="login-dark" />
		<div class="login-main">
			<div class="login-item-left">
			</div>
			<div class="login-item-right">
				<div class="login-box-content">
					<div class="login-box-header">
						<img alt="" class="login-box-header-image" src="@/assets/images/vue.svg" />
						<h1 class="login-box-header-title">{{ $t('project.name') }}</h1>
					</div>
					<el-form ref="ruleFormRef" v-loading="loading" :label-width="0" :model="ruleForm" :rules="rules"
						class="login-box-main w100" size="large">
						<el-form-item prop="username">
							<el-input v-model="ruleForm.username" :placeholder="$t('login.username')" autofocus
								prefix-icon="User" />
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="ruleForm.password" :placeholder="$t('login.password')" autoComplete="on"
								prefix-icon="Lock" show-password type="password" />
						</el-form-item>
						<el-row>
							<el-col :span="16" :xs="16">
								<el-form-item prop="code">
									<el-input v-model="ruleForm.code" :placeholder="$t('login.verificationCode')"
										class="login-code-input" type="text">
										<template #prefix>
											<svg-icon name="captcha" />
										</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8" :xs="8" class="login-code-image">
								<img :src="captchaBase64" alt="验证码" @click="getCaptcha" />
							</el-col>
						</el-row>
						<el-form-item>
							<el-button class="w100" type="primary" @click="submitForm">
								{{
									$t('login.name')
								}}
							</el-button>
						</el-form-item>
						<el-divider><span class="hover-text-color">{{ $t('login.otherLogin') }}</span></el-divider>
						<div class="flex-center login-other">
							<el-tooltip :content="$t('login.qq')" placement="top">
								<el-image :src="QQUrl" alt="qq" class="login-other-image" fit="contain" loading="lazy"
									@click="error" />
							</el-tooltip>
							<el-tooltip :content="$t('login.wx')" placement="top">
								<el-image :src="WeChatUrl" alt="WeChat" class="login-other-image" fit="contain"
									loading="lazy" @click="error" />
							</el-tooltip>
						</div>
					</el-form>
					<div class="login-box-footer">
						<el-link class="hover-text-color" @click="error">{{ $t('login.register') }}</el-link>
						<el-divider direction="vertical" />
						<el-link class="hover-text-color" @click="error">{{ $t('login.forgotPassword') }}</el-link>
						<el-divider direction="vertical" />
						<div style="text-align: center">
							<lang-select class="w100 h100" style="display: block" />
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="login-footer">
			<div class="hover-text-color">© 2001-2099 小糊涂公司 版权所有</div>
			<div class="login-footer-right">
				<div class="mr-5">
					<el-link class="hover-text-color" target="_blank">{{ $t('login.privacyPolicy') }}</el-link>
				</div>
				<div class="mr-5">
					<el-link class="hover-text-color" target="_blank">{{ $t('login.serviceAgreement') }}</el-link>
				</div>
				<div class="mr-5">
					<el-link class="hover-text-color" target="_blank">{{ $t('login.legalStatement') }}</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { validateCode } from '@/api/login/api';
import { CaptchaResponseType, LoginRequestType } from '@/api/login/type';
import QQUrl from '@/assets/images/QQ.png'
import WeChatUrl from '@/assets/images/WeChat.png'
import { useMessage } from "@/hooks/use-message";
import { useUserInfoStore } from '@/store/modules/user';
import { AxiosResponse } from 'axios';
import type { FormInstance } from 'element-plus';
import { useI18n } from "vue-i18n";
import { LocationQuery, useRoute, useRouter } from 'vue-router';
import { useThemeStore } from "@/store/modules/theme";

defineOptions({ name: 'LoginViewIndex' })
const { t } = useI18n()
const userInfoStore = useUserInfoStore()
const router = useRouter()
const route = useRoute()
/**
 * 表单数据
 */
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginRequestType>({
	username: 'admin',
	password: '123456',
	code: '',
	uuid: '',
	timeout: 30000
})
const rules = reactive({
	username: [{ required: true, message: t('login.message.username.required'), trigger: ['blur', 'change'] }],
	password: [{ required: true, message: t('login.message.password.required'), trigger: ['blur', 'change'] }],
	code: [{ required: true, message: t('login.message.verificationCode.required'), trigger: ['blur', 'change'] }]
})
/**
 * 验证码图片Base64字符串
 */
const captchaBase64 = ref<string>()

const loading = ref(false)
/**
 * 获取验证码
 */
const getCaptcha = async () => {
	loading.value = true
	await validateCode(ruleForm.uuid).then((response: AxiosResponse<CaptchaResponseType>) => {
		const { img, uuid, timeout } = response.data
		ruleForm.uuid = uuid
		ruleForm.timeout = timeout
		captchaBase64.value = img
		loading.value = false
	})
}
/**
 * 登录事件
 */
const submitForm = () => {
	ruleFormRef.value?.validate(async (valid) => {
		loading.value = true // 正在登录中
		if (valid) {
			await userInfoStore.login(ruleForm).then(() => {
				const { path, queryParams } = parseRedirect();
				router.push({ path: path, query: queryParams });
				useMessage().success(t('登录成功'))
				useThemeStore().watermarkContent = userInfoStore.userAccount || ''
				loading.value = false
			}).catch(() => {
				getCaptcha()
			})
		} else {
			useMessage().error(t('message.form.error'))
			loading.value = false
		}
	})
}
const error = () => {
	useMessage().error('该功能暂未实现!')
}
/**
 * 解析 redirect 字符串 为 path 和  queryParams
 */
const parseRedirect = (): {
	path: string
	queryParams: Record<string, string>
} => {
	const query: LocationQuery = route.query
	const redirect = (query.redirect as string) ?? "/";

	const url = new URL(redirect, window.location.origin);
	const path = url.pathname;
	const queryParams: Record<string, string> = {};
	url.searchParams.forEach((value, key) => {
		queryParams[key] = value;
	});
	return { path, queryParams };
}
onMounted(() => {
	getCaptcha()
})
</script>

<style lang="scss">
@import "@/styles/theme/login";
</style>
