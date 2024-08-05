/**
 * OAuth2 客户端信息查询类型
 */
export interface RegisteredClientQueryReq extends CrudQueryFrom {
    clientId?: string // 暂无
    clientName?: string // 暂无
}

/**
 * OAuth2 客户端信息操作类型
 */
export interface RegisteredClientOperationReq extends OperationReq {
    clientId: string //客户端ID
    clientSecret: string //客户端密钥
    clientSecretExpiresAt: string //客户端过期时间
    autoApprove: string //是否自动放行
    clientName: string //客户端名称
    authorizationGrantTypes: string[] //授权模式
    redirectUris: string //重定向地址
    scopes: string[] //允许客户端请求的范围
    accessTokenValidity: number //token有效期
    refreshTokenValidity: number //刷新令牌有效期
}

/**
 * OAuth2 客户端信息返回值
 */
export interface RegisteredClientResponse extends CrudOptions {
    id: string //id
    clientId: string //客户端ID
    clientSecret: string //客户端密钥
    autoApprove: string //是否自动放行
    clientName: string //客户端名称
    authorizationGrantTypes: string[] //授权模式
    redirectUris: string //重定向地址
    scopes: string[] //允许客户端请求的范围
    accessTokenValidity: number //token有效期
    refreshTokenValidity: number //刷新令牌有效期
}

