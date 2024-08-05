<template>
	<div class="main-container-none">
		<xht-card>
			<el-row>
				<el-col :span="12">
					<el-form :rules="rules" :model="state" ref="queryFormRef"
					         :disabled="state.loadingStatus">
						<el-form-item prop="bucketName">
							<el-input v-model="state.bucketName" placeholder="请输入需要添加的或者查询的桶名称"/>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12" class="text-center">
					<el-button type="info" icon="Search" @click="handlerExists">查询桶是否存在</el-button>
					<el-button type="primary" icon="Plus" @click="handlerAdd">添加</el-button>
					<el-tooltip class="item" content="刷新" placement="top">
						<el-button icon="Refresh" @click="handlerQuery" circle/>
					</el-tooltip>
				</el-col>
			</el-row>
		</xht-card>
		<div class="main-container-view main-container-auto mt-20">
			<div class="minio-container">
				<el-card shadow="always" class="mt-20" v-for="(item,index) in state.tableList" :key="index"
				         :body-style="{minWidth:'25vw'}">
					<template #header>
						<div class="flex flex-center">
							<div class="text-left flex-1 user-select-none">
								<el-tag effect="dark" type="primary">{{ item.bucketName }}</el-tag>
							</div>
							<div class="text-right">
								<ep-circle-close class="button-hover" @click="handlerRemove(item.bucketName)"/>
							</div>
						</div>
					</template>
					<el-descriptions
							:column="1"
							border
					>
						<el-descriptions-item label="文件数量">{{ item.fileCount }}</el-descriptions-item>
						<el-descriptions-item label="文件总大小">
							<el-tag type="primary">{{ item.fileSizeCount }}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="拥有者">
							{{ item.displayName }}
						</el-descriptions-item>
						<el-descriptions-item label="创建时间">
							{{ item.createTime }}
						</el-descriptions-item>
					</el-descriptions>
				</el-card>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import {ossMinioBucketCreate, ossMinioBucketExists, ossMinioBucketList, ossMinioBucketRemove} from "@/api/minio/bucket";
import {useMessage, useMessageBox} from "@/hooks/use-message";
import type {FormInstance, FormRules} from "element-plus";

defineOptions({name: ''})
const queryFormRef = ref<FormInstance>()
const state = reactive<any>({
	bucketName: '',
	loadingStatus: false,
	tableList: []
})
const handlerQuery = () => {
	state.loadingStatus = true
	ossMinioBucketList().then(res => {
		state.tableList = res.data
	}).finally(() => {
		state.loadingStatus = false
	})
}
const rules: FormRules = {
	bucketName: [
		{required: true, message: '存储桶名称不能为空', trigger: ['blur', 'change']},
		{
			pattern: /^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]$/,
			message: '存储桶名称错误!',
			trigger: ['blur', 'change']
		}]
}
const handlerAdd = () => {
	queryFormRef.value?.validate(async (valid) => {
		if (valid) {
			state.loadingStatus = true
			ossMinioBucketCreate({
				bucketName: state.bucketName
			}).then((res: any) => {
				if (res.data) {
					useMessage().success(`${state.bucketName}添加成功!`)
					handlerQuery()
				} else {
					useMessage().error(`${state.bucketName}添加失败!`)
				}
			}).finally(() => {
				state.loadingStatus = false
			})
		} else {
			useMessage().error(`请检查输入添加的桶名称的格式!`)
		}
	})


}
const handlerExists = () => {
	queryFormRef.value?.validate(async (valid) => {
		if (valid) {
			state.loadingStatus = true
			ossMinioBucketExists(state.bucketName).then(res => {
				if (res.data) {
					useMessage().success(`${state.bucketName}存在!`)
				} else {
					useMessage().error(`${state.bucketName}不存在存在!`)
				}
			}).finally(() => {
				state.loadingStatus = false
			})
		} else {
			useMessage().error(`请检查输入查询桶名称的格式!`)
		}
	})
}
const handlerRemove = async (bucketName: string) => {
	state.loadingStatus = true
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(async () => {
				await ossMinioBucketRemove(bucketName).then(async () => {
					useMessage().success('删除成功!')
					handlerQuery()
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
onMounted(() => {
	handlerQuery()
})
</script>

<style lang="scss" scoped>
.minio-container {
	padding: 20px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	overflow: auto;

	:deep(.el-card__header) {
		padding: 10px;
	}
}
</style>
