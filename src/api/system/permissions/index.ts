import request from '@/utils/request'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 角色授权菜单
 * @param roleId 角色id
 * @param menuIds 菜单id
 */
export const roleAuthorizationMenu = (roleId: string, menuIds: string[]) => {
    return request({
        baseURL,
        url: `/sys/permission/role/authorization/${roleId}`,
        method: 'post',
        headers: {},
        data: JSON.stringify(menuIds)
    })
}
/**
 * 根据角色id 查询该角色所拥有的菜单
 * @param roleId 角色id
 */
export const selectMenuIdByRoleId = (roleId: string) => {
    return request({
        baseURL,
        url: `/sys/permission/menuId/${roleId}`,
        method: 'get',
        headers: {}
    })
}
/**
 * 用户授权角色
 * @param userId 用户id
 * @param roleIds 角色id
 */
export const userAuthorizationRole = (userId: string, roleIds: string[]) => {
    return request({
        baseURL,
        url: `/sys/permission/user/authorization/${userId}`,
        method: 'post',
        headers: {},
        data: JSON.stringify(roleIds)
    })
}
/**
 * 根据用户id 查询该用户所拥有的角色
 * @param userId 用户id
 */
export const selectRoleIdByUserId = (userId: string) => {
    return request({
        baseURL,
        url: `/sys/permission/roleId/${userId}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 后端控制路由，
 */
/**
 * 后端控制路由，
 */
export const getRouters = () => {
    return request({
        baseURL: baseURL,
        url: '/sys/user/profile/getRouters',
        method: 'get'
    })
}
