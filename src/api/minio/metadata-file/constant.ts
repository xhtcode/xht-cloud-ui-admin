import type {ColumnOption} from "@/components/right-tool-bar/types";


/**
 * 列表显示配置
 */
export const SysMetadataFileColumnOption: ColumnOption[] = [
    {value: 'bucket', name: '存储桶名称', visible: false, disabled: false},
    {value: 'bucketPath', name: '存储桶路径', visible: false, disabled: false},
    {value: 'fileName', name: '文件名', visible: true, disabled: false},
    {value: 'fileOriginalName', name: '上传文件名', visible: false, disabled: false},
    {value: 'fileContentType', name: 'MIME类型', visible: false, disabled: false},
    {value: 'fileSuffix', name: '文件后缀', visible: false, disabled: false},
    {value: 'fileSize', name: '文件大小', visible: true, disabled: false},
    {value: 'fileStatus', name: '文件状态', visible: true, disabled: false},
    {value: 'createBy', name: '上传用户', visible: false, disabled: false},
    {value: 'createTime', name: '上传时间', visible: true, disabled: false},
]
