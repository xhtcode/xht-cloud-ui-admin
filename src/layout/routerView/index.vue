<template>
	<component :is="LayoutComponents[layout]"/>
</template>

<script lang="ts" setup>
import {NextLoading} from '@/utils/loading'

defineOptions({name: 'Layout'})
const LayoutComponents: Record<any, Component> = {
	default: defineAsyncComponent(() => import('@/layout/layout-default/index.vue')),
	columns: defineAsyncComponent(() => import('@/layout/layout-columns/index.vue'))
}
const layout = computed<any>(() => 'default')

// 页面加载前
onMounted(() => {
	NextLoading.done(600)
})
</script>
