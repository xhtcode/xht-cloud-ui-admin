import {convertFileSizeUnit, createThreadFileChunks} from "@/utils/file-util";
import {stringArrayMD5} from "@/utils/md5";
import {shardingUploadFile, shardingUploadInit, shardingUploadMerge} from "@/api/minio/sharding";
import type {AxiosResponse} from "axios";

export type UploadStatus = 'stop' | 'start' | 'pause' | 'init'

export interface ShardingUploadTypes {
    uploadId: string | null //上传id
    uploadFileName: string | null //上传文件名称
    uploadStatus: UploadStatus //上传状态
    checkFileProgress: number //文件解析进度
    checkFileSize: string //文件解析大小进度
    uploadFileSize: string //文件上传大小进度
    fileMD5: string // 文件md5
    fileChunks: any[] //文件分块详细
    shardingLength: number //分片总数
}

/**
 * 分片大小
 */
export const useShardingUpload = () => {
    const uploadState = reactive<ShardingUploadTypes>({
        uploadId: null,
        uploadFileName: null,
        uploadStatus: 'stop',
        checkFileProgress: 0,
        checkFileSize: '',
        uploadFileSize: '',
        fileMD5: '',
        fileChunks: [],
        shardingLength: 0 //分片总数
    })
    const empUploadChunkCount = ref<number[]>([])
    const uploadFileProgress = computed(() => {
        return parseFloat((empUploadChunkCount.value.length / uploadState.fileChunks.length * 100).toFixed(2)) || 0
    })
    const resetStatus = (success?: () => void) => {
        if (success) {
            success()
        } else {
            uploadState.checkFileProgress = 0
            uploadState.checkFileSize = ''
            uploadState.uploadFileSize = ''
            uploadState.fileMD5 = ''
            uploadState.fileChunks = []
            uploadState.shardingLength = 0
            empUploadChunkCount.value = []
        }
    }

    /**
     * 初始化上传信息
     * @param file 上传文件信息
     */
    const initUploadFile = async (file: File) => {
        resetStatus()
        uploadState.uploadStatus = 'init'
        const md5: any = await createThreadFileChunks(file, (schedule, size) => {
            uploadState.checkFileProgress = schedule - 0.5
            uploadState.checkFileSize = convertFileSizeUnit(size)
        })
        uploadState.fileChunks = md5
        uploadState.shardingLength = md5.length
        uploadState.fileMD5 = stringArrayMD5(md5.map((item: any) => item.hash))
        uploadState.checkFileProgress = 100
        const {data} = await shardingUploadInit({
            contentType: file.type || 'application/octet-stream',
            fileSizeCount: file.size,
            originalFileName: file.name,
            fileMd5: uploadState.fileMD5
        })
        uploadState.uploadId = data.uploadId
        uploadState.uploadFileName = data.fileName
        if (!empUploadChunkCount.value || empUploadChunkCount.value.length > 0) {
            empUploadChunkCount.value = data.completeIndex
        }
    }
    /**
     * 开始上传文件
     * @param file 文件
     */
    const startUploadFile = async (file: File | null) => {
        if (file) {
            uploadState.uploadStatus = 'start'
            const completeIndex: number[] = empUploadChunkCount.value || []
            for (let i: number = 0; i < uploadState.fileChunks.length; i++) {
                if (uploadState.uploadStatus !== 'start') {
                    return
                }
                if (completeIndex.includes(uploadState.fileChunks[i].index)) {
                    continue
                }
                const formData: FormData = new FormData();
                formData.append('file', uploadState.fileChunks[i].blob);
                formData.append('uploadId', uploadState.uploadId!);
                formData.append('fileName', uploadState.uploadFileName!);
                formData.append('shardingIndex', uploadState.fileChunks[i].index);
                formData.append('shardingLength', `${uploadState.shardingLength}`);
                formData.append('originalFileName', file.name);
                formData.append('contentType', file.type || 'application/octet-stream');
                formData.append('fileSizeCount', `${file.size}`);
                formData.append('shardingMD5', uploadState.fileChunks[i].hash);
                await uploadFile(formData)
            }
            await uploadMerge()
        }
    }
    /**
     * 分片上传文件
     * @param formData
     */
    const uploadFile = async (formData: FormData) => {
        if (uploadState.uploadStatus === 'start') {
            await shardingUploadFile(formData, (e) => {
                uploadState.uploadFileSize = convertFileSizeUnit(e.bytes)
            }).then((res: AxiosResponse<any>) => {
                empUploadChunkCount.value.push(res.shardingIndex)
            })
        }
    }

    /**
     * 文件合并
     */
    const uploadMerge = async () => {
        if (uploadState.uploadStatus === 'start' && uploadState.uploadFileName && uploadState.uploadId) {
            await shardingUploadMerge({
                objectName: uploadState.uploadFileName,
                uploadId: uploadState.uploadId
            }).then(_ => {
                uploadState.uploadStatus = 'stop'
            })
        }
    }

    /**
     * 更改状态
     * @param status 上传状态
     */
    const changeUploadStatus = (status: UploadStatus) => {
        uploadState.uploadStatus = status
    }

    return {
        uploadState,
        uploadFileProgress,
        resetStatus,
        initUploadFile,
        startUploadFile,
        changeUploadStatus
    }
}
