<template>
	<component :is="linkType" v-bind="linkProps(to)">
		<slot></slot>
	</component>
</template>

<script lang="ts" setup>
import RegularUtils from "@/utils/moudle/RegularUtils";

defineOptions({ name: 'AppLinkComponent'})

interface PropsType {
	to: any
}

const props = withDefaults(defineProps<PropsType>(), {})

const isExternalLink = computed(() => {
	return RegularUtils.isExternal(props.to.path || "");
});

const linkType = computed(() => (isExternalLink.value ? "a" : "router-link"));

const linkProps = (to: any) => {
	if (isExternalLink.value) {
		return {
			href: to.path,
			target: "_blank",
			rel: "noopener noreferrer",
		};
	}
	return {to: to};
};
</script>

<style lang="scss" scoped></style>
