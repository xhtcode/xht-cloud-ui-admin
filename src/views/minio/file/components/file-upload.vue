<template>
	<el-dialog
			v-model="state.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			title="文件上传"
			append-to-body>
		<el-upload
				drag
				name="file"
				ref="uploadRef"
				:limit="1"
				:headers="headers"
				method="post"
				:auto-upload="false"
				:on-exceed="handleExceed"
				:action="uploadUrl"
				:multiple="false"
				:data="{'name':'lisi'}"
				:on-success="uploadSuccess"
				:on-error="uploadError"
		>
			<el-icon class="el-icon--upload">
				<ep-upload-filled/>
			</el-icon>
			<div class="el-upload__text">
				将文件放到这里或 <em>点击上传</em>
			</div>
			<template #tip>
				<div class="el-upload__tip">
					文件类型、大小不做限制
				</div>
			</template>
		</el-upload>

		<template #footer>
			<el-button type="primary" @click="submitUpload">提交</el-button>
			<el-button @click="close">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import {useUserInfoStore} from "@/store/modules/user";
import type {UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {genFileId} from 'element-plus'
import {useMessage} from "@/hooks/use-message";


defineOptions({name: 'FileUploadView'})

const uploadUrl: string = '/api/admin/sys/file/upload';
const userInfoStore = useUserInfoStore();
const headers = ref<any>({
	'Authorization': `Bearer ${userInfoStore.getToken}`
});
const state = reactive<{
	visibleStatus: boolean
}>({
	visibleStatus: false
})
const uploadRef = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
	uploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	uploadRef.value!.handleStart(file)
}
const submitUpload = () => {
	uploadRef.value!.submit()
}
const uploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	console.log(response, uploadFile, uploadFiles)
	useMessage().success('文件上传成功！')
}
const uploadError = (evt: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	console.log(evt, uploadFile, uploadFiles)
	useMessage().success('文件上传失败！')
}
const show = () => {
	state.visibleStatus = true
}

const close = () => {
	state.visibleStatus = false
}
defineExpose({
	show
})
</script>

<style lang="scss" scoped></style>
