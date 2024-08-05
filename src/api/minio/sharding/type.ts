export interface ShardingUploadInitRequest {
    originalFileName: string //文件上传的名称
    fileSizeCount: number  //文件总大小
    contentType: string //文件类型
    fileMd5: string //文件的总MD5
}
