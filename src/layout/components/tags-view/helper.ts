import type {RouteLocationNormalizedLoaded} from 'vue-router'

export const filterAffixTagsView = (routes: any[]) => {
    let tagsResult: TagsViewType[] = []
    routes.forEach((route: any) => {
        const meta: any = route.meta || {}
        if (meta.affixStatus && !meta.breadCrumbStatus) {
            tagsResult.push(formatRoute(route))
        }
        if (route.children) {
            const tempTags: TagsViewType[] = filterAffixTagsView(route.children)
            if (tempTags.length >= 1) {
                tagsResult = [...tagsResult, ...tempTags]
            }
        }
    })
    return tagsResult
}

export const formatRoute = (routeView: RouteLocationNormalizedLoaded): TagsViewType => {
    const meta: any = routeView.meta || {}
    return {
        affixStatus: meta.affixStatus,
        cacheStatus: meta.keepAliveStatus,
        icon: meta.icon,
        name: routeView.name as string,
        path: routeView.fullPath || routeView.path || '/',
        title: routeView.query?.tagName || meta.title,
        query: routeView.query
    }
}
