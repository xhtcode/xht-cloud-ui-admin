<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'

defineOptions({ name: 'RedirectViewIndex'})
const route = useRoute()
const router = useRouter()

const {params, query} = route
const {path} = params

router.replace({path: '/' + path, query})
</script>
<template></template>
