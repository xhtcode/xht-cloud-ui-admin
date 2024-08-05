/**
 * 地区信息查询类型
 */
export interface SysAreaInfoQueryReq extends CrudQueryFrom {
    id?: string // 主键
    parentId?: string // 父级区划代码
    name?: string // 名称
    level?: string // 级别1-5,省市县镇村1级：省、直辖市、自治区2级：地级市3级：市辖区、县（旗）、县级市、自治县（自治旗）、特区、林区4级：镇、乡、民族乡、县辖区、街道5级：村、居委会
    areaNo?: string // 区划代码
    category?: string // 城乡分类111表示主城区；112表示城乡接合区；121表示镇中心区；122表示镇乡接合区；123表示特殊区域；210表示乡中心区；220表示村庄
    msg?: string // 描述
}

/**
 * 地区信息操作类型
 */
export interface SysAreaInfoOperationReq extends OperationReq {
    id: string | undefined  // 主键
    parentId: string // 父级区划代码
    name: string // 名称
    level: string // 级别1-5,省市县镇村1级：省、直辖市、自治区 2级：地级市 3级：市辖区、县（旗）、县级市、自治县（自治旗）、特区、林区4级：镇、乡、民族乡、县辖区、街道5级：村、居委会
    areaNo: string // 区划代码
    category: string // 城乡分类 111 表示主城区；112表示城乡接合区；121 表示 镇中心区；122 表示 镇乡接合区；123 表示 特殊区域；210 表示 乡中心区；220表示 村庄
    msg: string // 描述
}

/**
 * 地区信息返回值
 */
export interface SysAreaInfoResponse extends CrudOptions {
    id: string // 主键
    parentId: string // 父级区划代码
    name: string // 名称
    level: string // 级别1-5,省市县镇村1级：省、直辖市、自治区2级：地级市3级：市辖区、县（旗）、县级市、自治县（自治旗）、特区、林区4级：镇、乡、民族乡、县辖区、街道5级：村、居委会
    areaNo: string // 区划代码
    category: string // 城乡分类111表示主城区；112表示城乡接合区；121表示镇中心区；122表示镇乡接合区；123表示特殊区域；210表示乡中心区；220表示村庄
    msg: string // 描述
    hasChildren?: boolean
    leaf?: boolean
    children?: SysAreaInfoResponse[]
}

