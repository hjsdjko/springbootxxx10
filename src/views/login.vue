<template>
	<div>
		<div class="login_view">
			<el-form :model="loginForm" class="login_form">
				<div class="title_view">基于Java的校园二手商品交易系统设计与实现登录</div>
				<div class="list_item" v-if="loginType==1">
					<input class="list_inp" v-model="loginForm.username" placeholder="请输入账号" />
				</div>
				<div class="list_item" v-if="loginType==1">
					<input class="list_inp" v-model="loginForm.password" type="password" placeholder="请输入密码"  />
				</div>
				<div class="list_type" v-if="userList.length>1">
				  <el-select v-model="loginForm.role" placeholder="请选择用户类型">
				    <el-option v-for="(item,index) in userList" :label="item.roleName" :value="item.roleName"></el-option>
				  </el-select>
				</div>
				<div class="listCode_view" v-if="loginType==1">
					<input class="listCode_inp" placeholder="请输入验证码" type="text" v-model="loginForm.code" @keydown.enter.native="handleLogin">
					<div class="listCode_btn" @click="getRandCode(4)">
						<span
							:style="{color:item.color,transform:item.rotate,fontSize:item.size,padding: '0 3px',display:'inline-block'}"
							v-for="(item, index) in codes" :key="index">{{ item.num }}</span>
					</div>
				</div>
				<div class="btn_view">
					<el-button class="login" v-if="loginType==1" type="success" @click="handleLogin">登录</el-button>
					<el-button class="register" type="primary" @click="handleRegister('maijia')">注册卖家</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
	} from "vue";
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//图形验证码
	const codes = ref([{
		num: 1,
		color: '#000',
		rotate: '10deg',
		size: '16px'
	}, {
		num: 2,
		color: '#000',
		rotate: '10deg',
		size: '16px'
	}, {
		num: 3,
		color: '#000',
		rotate: '10deg',
		size: '16px'
	}, {
		num: 4,
		color: '#000',
		rotate: '10deg',
		size: '16px'
	}])
	
	//获取验证码
	const getRandCode = (len = 4) => {
		randomString(len)
	}
	const randomString = (len = 4) => {
		let chars = [
			"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
			"l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
			"w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",
			"H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
			"S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",
			"3", "4", "5", "6", "7", "8", "9"
		]
		let colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
		let sizes = ['14', '15', '16', '17', '18']
	
		// let output = [];
		for (let i = 0; i < len; i++) {
			// 随机验证码
			let key = Math.floor(Math.random() * chars.length)
			codes.value[i].num = chars[key]
			// 随机验证码颜色
			let code = '#'
			for (let j = 0; j < 6; j++) {
				let key = Math.floor(Math.random() * colors.length)
				code += colors[key]
			}
			codes.value[i].color = code
			// 随机验证码方向
			let rotate = Math.floor(Math.random() * 60)
			let plus = Math.floor(Math.random() * 2)
			if (plus == 1) rotate = '-' + rotate
			codes.value[i].rotate = 'rotate(' + rotate + 'deg)'
			// 随机验证码字体大小
			let size = Math.floor(Math.random() * sizes.length)
			codes.value[i].size = sizes[size] + 'px'
		}
	}
	//注册
    const handleRegister = (tableName) => {
    	context?.$router.push(`/${tableName}Register`)
    	
    }
	const handleLogin = () => {
		if (!loginForm.value.username) {
			context?.$toolUtil.message('请输入用户名', 'error')
			
			return;
		}
		if (!loginForm.value.password) {
			context?.$toolUtil.message('请输入密码', 'error')
			
			return;
		}
		if (userList.value.length > 1) {
			if (!loginForm.value.role) {
				context?.$toolUtil.message('请选择角色', 'error')
				verifySlider.value.reset()
				return;
			}
			for (let i = 0; i < menus.value.length; i++) {
				if (menus.value[i].roleName == loginForm.value.role) {
					tableName.value = menus.value[i].tableName;
				}
			}
		} else {
			tableName.value = userList.value[0].tableName;
			loginForm.value.role = userList.value[0].roleName;
		}
		let code = ''
		for (let i in codes.value) {
			code += codes.value[i].num
		}
		if (!loginForm.value.code) {
			context?.$toolUtil.message('请输入验证码', 'error')
			
			return;
		}
		if (loginForm.value.code.toLowerCase() != code.toLowerCase()) {
			context?.$toolUtil.message('验证码输入有误', 'error')
			getRandCode()
			return;
		}
		login()
	}
	const login = () => {
		context?.$http({
			url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
			method: 'post'
		}).then(res => {
			context?.$toolUtil.storageSet("Token", res.data.token);
			context?.$toolUtil.storageSet("role", loginForm.value.role);
			context?.$toolUtil.storageSet("sessionTable", tableName.value);
			context?.$toolUtil.storageSet("adminName", loginForm.value.username);
			context?.$router.push('/')
		}, err => {
		})
	}
	//获取菜单
	const getMenu=()=> {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id',
      }

      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
          menus.value = JSON.parse(res.data.data.list[0].menujson)
          for (let i = 0; i < menus.value.length; i++) {
            if (menus.value[i].hasBackLogin=='是') {
              userList.value.push(menus.value[i])
            }
          }
			loginForm.value.role = userList.value[0].roleName
          context?.$toolUtil.storageSet("menus", JSON.stringify(menus.value));
      })
    }
	//初始化
	const init = () => {
		getMenu();
		getRandCode()
	}
	onMounted(()=>{
		init()
		
	})
</script>

<style lang="scss" scoped>
	.login_view {
		background-repeat: no-repeat;
		flex-direction: column;
		background-size: cover;
		background: url(http://clfile.zggen.cn/20231005/cf2f71e200cf4a3193ec63d046a70ef7.png);
		display: flex;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
		position: relative;
		background-position: center center;
		// 表单盒子
		.login_form {
			border-radius: 0;
			padding: 60px  0 30px;
			box-shadow: 4px 0 6px rgba(0,0,0,0.5);
			background: #fff;
			display: flex;
			width: 500px;
			flex-wrap: wrap;
		}
		.title_view {
			padding: 30px 0 30px 40px;
			margin: 0 0 20px -20px;
			color: #fff;
			background: rgba(75,137,243,1);
			font-weight: bold;
			width: 94%;
			font-size: 20px;
			text-align: left;
		}
		// item盒子
		.list_item {
			margin: 10px auto;
			display: flex;
			width: 80%;
			justify-content: center;
			align-items: center;
			// 输入框
			.list_inp {
				border: 1px solid #ddd;
				padding: 0 10px;
				width: 100%;
				line-height: 40px;
				height: 40px;
			}
		}
		// 验证码
		.listCode_view {
			border: 1px solid #ddd;
			margin: 10px auto;
			display: flex;
			width: 80%;
			justify-content: center;
			align-items: center;
			// 验证码输入框
			.listCode_inp {
				border: 0px solid #ddd;
				border-radius: 0;
				padding: 0 10px;
				width: calc(100% - 100px);
				line-height: 40px;
				height: 40px;
			}
			// 验证码按钮
			.listCode_btn {
				border: 0px solid #ddd;
				width: 100px;
				line-height: 36px;
				border-width: 0 0 0 1px;
				text-align: center;
				height: 36px;
			}
		}
		.list_type {
			margin: 10px auto;
			display: flex;
			width: 80%;
			justify-content: center;
			align-items: center;
			.list_label {
				width: 90px;
				font-size: 14px;
				text-align: right;
			}
			// 下拉框样式
			:deep(.el-select) {
				border: 1px solid #ddd;
				border-radius: 0;
				padding: 0 10px;
				width: 100%;
				line-height: 40px;
				box-sizing: border-box;
				height: 40px;
				//去掉默认样式
				.select-trigger{
					height: 100%;
					.el-input{
						height: 100%;
						.el-input__wrapper{
							border: none;
							box-shadow: none;
							background: none;
							border-radius: 0;
							height: 100%;
							padding: 0;
						}
						.is-focus {
							box-shadow: none !important;
						}
					}
				}
			}
		}
		// 按钮盒子
		.btn_view {
			padding: 20px 0 0;
			margin: 0 auto;
			display: flex;
			width: 80%;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			// 登录
			.login {
				border: 0;
				cursor: pointer;
				border-radius: 0;
				padding: 0 24px;
				margin: 0 0 10px;
				outline: none;
				color: #fff;
				background: rgba(75,137,243,1);
				letter-spacing: 6px;
				width: 100%;
				font-size: 18px;
				height: 44px;
			}
			// 注册
			.register {
				border: 0;
				cursor: pointer;
				border-radius: 0;
				padding: 0 24px;
				margin: 0 0 10px;
				outline: none;
				color: #fff;
				background: rgba(75,137,243,.7);
				width: 100%;
				font-size: 18px;
				height: 44px;
			}
		}
	}

</style>