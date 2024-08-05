<template>
	<div class="user-info-container">
		<el-dropdown trigger="click">
            <span class="avatar-container">
                <el-avatar alt="avatar" class="avatar-image" src="userInfoStore.sysUser?.userAvatar"/>
                <span class="user-select-none">
                    小糊涂
                    <el-icon>
                        <CaretBottom/>
                    </el-icon>
                </span>
            </span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="openDialog('infoRef')">
						<el-icon>
							<ep-user/>
						</el-icon>
						<span class="user-select-none">个人信息</span>
					</el-dropdown-item>
					<el-dropdown-item @click="openDialog('passwordRef')">
						<el-icon>
							<ep-Edit/>
						</el-icon>
						<span class="user-select-none">修改密码</span>
					</el-dropdown-item>
					<el-dropdown-item divided>
						<el-icon>
							<ep-List/>
						</el-icon>
						<span class="user-select-none">登录记录</span>
					</el-dropdown-item>
					<el-dropdown-item divided @click="openDialog('logout')">
						<el-icon>
							<ep-SwitchButton/>
						</el-icon>
						<span class="user-select-none"> 退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
defineOptions({name: 'AvatarComponent'})

/**
 * 打开操作
 * @param type
 */
const openDialog = (type: 'infoRef' | 'passwordRef' | 'logout') => {
	switch (type) {
		case 'infoRef':
			break
		case 'passwordRef':
			break
		case 'logout':
			break
	}
}

</script>

<style lang="scss" scoped>
.user-info-container {
	height: $header-height;
	padding: 10px;

	.avatar-container {
		@extend .flex-center;
		height: 100%;
		white-space: nowrap;
		cursor: pointer;

		.avatar-image {
			width: ceil($header-height - 20px);
			height: ceil($header-height - 20px);
			margin-right: 5px !important;
			border-radius: 5px;
		}
	}
}
</style>
