<template>
	<div class="main-container-none">
		<el-form
				ref="queryFormRef"
				:disabled="state.loadingStatus"
				:model="queryParams"
				class="user-select-display"
				label-width="120px"
		>
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="8">
						<el-form-item label="文件名称" prop="fileName">
							<el-input type="text" v-model="queryParams.fileName"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="文件状态" prop="fileStatus">
							<el-select v-model="queryParams.fileStatus" class="w100" placeholder="请选择文件状态">
								<el-option value="0" label="正常"/>
								<el-option value="1" label="分片"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" class="text-center">
						<el-button icon="Search" type="primary" @click="handleQuery()">
							查询
						</el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" class="flex">
						<el-button icon="Upload" type="primary" @click="openUploadPage">上传</el-button>
						<el-button icon="Upload" type="warning" >大文件上传</el-button>
						<el-button icon="Plus" type="success" :disabled="state.singleStatus">修改</el-button>
					</el-col>
					<el-col :span="12">
						<right-tool-bar v-model:column-data="sourceColumnOption" column-status refresh-status search-status
						                v-model:show-search="state.showSearch" @refresh="handleQuery"/>
					</el-col>
				</el-row>
			</xht-card>
		</el-form>
		<div class="main-container-auto main-container-view">
			<el-table
					ref="tableRef"
					v-loading="state.loadingStatus"
					:cell-style="tableStyle.cellStyle"
					:data="state.tableList"
					:header-cell-style="tableStyle.headerCellStyle"
					border
					empty-text="暂无文件"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" fixed width="55"/>
				<el-table-column :index="createTableIndex" fixed label="序号" type="index" width="55"/>
				<el-table-column label="存储桶" prop="bucket" v-if="columnOption.bucket"/>
				<el-table-column label="存储桶路径" prop="bucketPath" v-if="columnOption.bucketPath" min-width="160"/>
				<el-table-column label="文件名" prop="fileName" fixed v-if="columnOption.fileName" min-width="160">
					<template #default="scope">
						{{ scope.row.fileName }}.{{ scope.row.fileSuffix }}
					</template>
				</el-table-column>
				<el-table-column label="上传文件名" prop="fileOriginalName" v-if="columnOption.fileOriginalName"
				                 min-width="160"/>
				<el-table-column label="MIME类型" prop="fileContentType" v-if="columnOption.fileContentType" min-width="160"/>
				<el-table-column label="文件后缀" prop="fileSuffix" v-if="columnOption.fileSuffix" min-width="120"/>
				<el-table-column label="文件大小" prop="fileSize" v-if="columnOption.fileSize" min-width="120">
					<template #default="scope">
						{{ convertFileSizeUnit(scope.row.fileSize) }}
					</template>
				</el-table-column>
				<el-table-column label="文件状态" prop="fileStatus" v-if="columnOption.fileStatus" min-width="120"/>
				<el-table-column label="上传用户" prop="createBy" min-width="120"/>
				<el-table-column label="上传时间" prop="createTime" min-width="160"/>
				<el-table-column fixed="right"
				                 label="操作"
				                 width="220px">
					<template #default="{ row }">
						<el-button icon="view" link type="success"
						           @click="handleView(row)">
							查看
						</el-button>
						<el-button icon="CreditCard" link type="warning">合并</el-button>
					</template>
				</el-table-column>
			</el-table>
			<xht-pagination
					v-model:current-page="queryParams.current"
					v-model:page-size="queryParams.size"
					:page-count="state.pages"
					:total="state.total"
					@pagination="handleQuery"/>
		</div>
		<file-upload ref="fileUploadRef"/>
	</div>
</template>

<script setup lang="ts">
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import {useColumnOptionHooks} from "@/hooks/use-column-option";
import {toReactive} from "@vueuse/core";
import type {ElTable, FormInstance, UploadUserFile} from "element-plus";
import FileUpload from "@/views/minio/file/components/file-upload.vue";
import {getSysMetadataFilePage} from "@/api/minio/metadata-file";
import {SysMetadataFileQueryReq, SysMetadataFileResponse} from "@/api/minio/metadata-file/type";
import {SysMetadataFileColumnOption} from "@/api/minio/metadata-file/constant";
import {convertFileSizeUnit} from "@/utils/file-util";

defineOptions({name: 'SysFileViewIndex'})
const fileList = ref<UploadUserFile[]>()
const state = reactive<BasicTableQueryOptions<SysMetadataFileQueryReq, SysMetadataFileResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<SysMetadataFileQueryReq, SysMetadataFileResponse>(state, getSysMetadataFilePage)
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysMetadataFileColumnOption)
const {queryParams} = toReactive(state)

const queryFormRef = ref<FormInstance>()
const fileUploadRef = ref<any>()
const tableRef = ref<InstanceType<typeof ElTable>>()

/**
 * 重置表单
 */
const resetQuery = () => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	queryParams.ascName = ''
	queryParams.descName = ''
	handleQuery()
}
/**
 * 打开上传页面
 */
const openUploadPage = () => {
	nextTick(() => {
		fileUploadRef.value?.show()
	})
}

/**
 * 查看文件信息
 */
const handleView = (row: any) => {
}
</script>

<style lang="scss" scoped></style>
