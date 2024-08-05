/**
 * 部门查询类型
 */
export interface SysMetadataFileQueryReq extends CrudQueryFrom {
    fileName?: string //文件名称
    fileStatus?: string //文件状态
}


/**
 * 部门返回值
 */
export interface SysMetadataFileResponse extends CrudOptions {
    id: string //主键
    bucket: string // 存储桶名称
    bucketPath: string // 存储桶路径
    fileName: string // 文件名
    fileOriginalName: string // 上传文件名
    fileContentType: string // MIME类型
    fileSuffix: string // 文件后缀
    fileSize: string // 文件大小
    fileStatus: string // 文件状态
}

