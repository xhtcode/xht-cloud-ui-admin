<template>
	<div class="wh-100 p-20">LayoutColumnsComponent
		<icon-select v-model="value"/>
		<password-input v-model="value"/>
	</div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'LayoutColumnsComponent'})
const value = ref<string>('language')
</script>

<style lang="scss" scoped>
</style>
