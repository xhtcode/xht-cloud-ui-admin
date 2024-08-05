<template>
	<div class="not-container">
		<img alt="403" class="not-img" src="@/assets/images/vue.svg"/>
		<div class="not-detail">
			<h2>401</h2>
			<h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
			<el-button type="primary" @click="router.back"> 返回上一页</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineOptions({ name: '401ViewIndex'})
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped></style>
