<template>
	<div class="p-20">
		<div class="text-center mt-10">
			{{ uploadState.uploadStatus }}
			<el-button type="success" @click="submitUpload"
			           :disabled="uploadState.uploadStatus!=='init'">开始上传
			</el-button>
			<el-button type="danger" :disabled="uploadState.uploadStatus!=='start'"
			           @click="changeUploadStatus('pause')">
				暂停上传{{ uploadFileProgress }}
			</el-button>
			<el-button type="success" @click="startUploadFile(file)"
			           :disabled="uploadState.uploadStatus!=='pause'">继续上传
			</el-button>
		</div>
		<el-upload
				:limit="1"
				:auto-upload="false"
				:multiple="false"
				:on-change="handlerChange"
				:on-exceed="handleExceed"
				:http-request="shardingUpload"
				drag
				name="file"
				ref="uploadRef"
		>
			<el-icon class="el-icon--upload">
				<ep-upload-filled/>
			</el-icon>
			<div class="el-upload__text">
				将文件放到这里或 <em>点击上传</em>
				<el-progress
						v-if="uploadState.uploadStatus === 'init'"
						show-text
						type="line"
						:percentage="uploadState.checkFileProgress"
						:color="colors"
						:duration="10"
				>
					<template #default="{ percentage }">
						<span class="percentage-value">{{ percentage }}%</span>
						<span class="percentage-value">{{ uploadState.checkFileSize }}</span>
						<span class="percentage-label">{{ percentage >= 100 ? '文件解析成功' : '正在解析文件' }}</span>
					</template>
				</el-progress>
				<el-progress
						v-if="uploadState.uploadStatus !== 'stop'"
						show-text
						type="dashboard"
						:percentage="uploadFileProgress"
						:color="colors"
						:duration="10"
				>
					<template #default>
						<div class="flex-center">
							<ep-upload-filled/>
							上传速度
						</div>
						<div>{{ uploadState.uploadFileSize }}</div>
					</template>
				</el-progress>
			</div>
			<template #tip>
				<div class="el-upload__tip">
					文件类型、大小不做限制
					<div>文件MD5:{{ uploadState.fileMD5 }}</div>
					<div>文件分块详细:{{ uploadState.fileChunks.length }}</div>
				</div>
			</template>
		</el-upload>
	</div>
</template>
<script setup lang="ts">
import type {UploadFile, UploadFiles} from "element-plus";
import {genFileId, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions} from "element-plus";
import {useMessage} from "@/hooks/use-message";
import {useShardingUpload} from "@/hooks/use-sharding-upload";

const colors = [
	{color: '#f56c6c', percentage: 20},
	{color: '#e6a23c', percentage: 40},
	{color: '#6f7ad3', percentage: 60},
	{color: '#1989fa', percentage: 80},
	{color: '#5cb87a', percentage: 100},
]
const uploadRef = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
	uploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	uploadRef.value!.handleStart(file)
}
const {
	uploadState,
	uploadFileProgress,
	initUploadFile,
	startUploadFile,
	changeUploadStatus,
	resetStatus
} = useShardingUpload()
const file = ref<File | null>(null)
/**
 * 上传文件校验
 * @param uploadFile
 * @param _
 */
const handlerChange = async (uploadFile: UploadFile, _: UploadFiles) => {
	if (uploadFile && uploadFile.raw && "ready" === uploadFile.status) {
		const {raw} = uploadFile
		console.time('md5计算:')
		file.value = raw
		await initUploadFile(file.value)
		console.timeEnd('md5计算:')
	}
}
const submitUpload = async () => {
	uploadRef.value!.submit()
}
const shardingUpload = async (uploadRequestOptions: UploadRequestOptions) => {
	const file = uploadRequestOptions.file
	if (file) {
		await startUploadFile(file)
		uploadRef.value?.clearFiles()
		resetStatus()
	} else {
		useMessage().error('请选择文件!')
	}
}
</script>
