<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="订单编号" prop="orderid">
							<el-input class="list_inp" v-model="form.orderid" :readonly="true" placeholder="订单编号" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="商品表名" prop="tablename">
							<el-input class="list_inp" v-model="form.tablename" placeholder="商品表名"
								 type="text" 								:readonly="!isAdd||disabledForm.tablename?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="商品id" prop="goodid">
							<el-input class="list_inp" v-model="form.goodid" placeholder="商品id"
								 type="text" 								:readonly="!isAdd||disabledForm.goodid?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="商品名称" prop="goodname">
							<el-input class="list_inp" v-model="form.goodname" placeholder="商品名称"
								 type="text" 								:readonly="!isAdd||disabledForm.goodname?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="图片" prop="picture">
							<uploads
								:disabled="!isAdd||disabledForm.picture?true:false"
								action="file/upload" 
								tip="请上传图片" 
								:limit="3" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.picture?form.picture:''" 
								@change="pictureUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="购买数量" prop="buynumber">
							<el-input class="list_inp" v-model.number="form.buynumber" placeholder="购买数量"
								 type="text" 								:readonly="!isAdd||disabledForm.buynumber?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="单价" prop="price">
							<el-input class="list_inp" v-model.number="form.price" placeholder="单价"
								 type="number" 								:readonly="!isAdd||disabledForm.price?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="折扣价" prop="discountprice">
							<el-input class="list_inp" v-model.number="form.discountprice" placeholder="折扣价"
								 type="number" 								:readonly="!isAdd||disabledForm.discountprice?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="总价" prop="total">
							<el-input class="list_inp" v-model.number="form.total" placeholder="总价"
								 type="number" 								:readonly="!isAdd||disabledForm.total?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="折扣总价格" prop="discounttotal">
							<el-input class="list_inp" v-model.number="form.discounttotal" placeholder="折扣总价格"
								 type="number" 								:readonly="!isAdd||disabledForm.discounttotal?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="支付类型" prop="type">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.type?true:false"
								v-model="form.type" 
								placeholder="请选择支付类型"
								>
								<el-option v-for="(item,index) in typeLists" :label="item"
									:value="index + 1"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="订单状态" prop="status">
							<el-input class="list_inp" v-model="form.status" placeholder="订单状态"
								 type="text" 								:readonly="!isAdd||disabledForm.status?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="地址" prop="address">
							<el-input class="list_inp" v-model="form.address" placeholder="地址"
								 type="text" 								:readonly="!isAdd||disabledForm.address?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="电话" prop="tel">
							<el-input class="list_inp" v-model="form.tel" placeholder="电话"
								 type="text" 								:readonly="!isAdd||disabledForm.tel?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="收货人" prop="consignee">
							<el-input class="list_inp" v-model="form.consignee" placeholder="收货人"
								 type="text" 								:readonly="!isAdd||disabledForm.consignee?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="备注" prop="remark">
							<el-input class="list_inp" v-model="form.remark" placeholder="备注"
								 type="text" 								:readonly="!isAdd||disabledForm.remark?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="创建时间" prop="addtime">
							<el-date-picker
								class="list_date"
								v-model="form.addtime"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.addtime?true:false"
								placeholder="请选择创建时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="商户名称" prop="maijiazhanghao">
							<el-input class="list_inp" v-model="form.maijiazhanghao" placeholder="商户名称"
								 type="text" 								:readonly="!isAdd||disabledForm.maijiazhanghao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="商品类型" prop="goodtype">
							<el-input class="list_inp" v-model="form.goodtype" placeholder="商品类型"
								 type="text" 								:readonly="!isAdd||disabledForm.goodtype?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="下单时间" prop="addtime">
							<el-input class="list_inp" v-model="form.addtime" placeholder="下单时间"
							readonly />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="物流" prop="logistics">
							<editor :value="form.logistics" placeholder="请输入物流" :readonly="type == 'logistics'?false:true"
								class="list_editor" @change="(e)=>editorChange(e,'logistics')"></editor>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'orders'
	const formName = '商品订单'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		orderid : false,
		tablename : false,
		goodid : false,
		goodname : false,
		picture : false,
		buynumber : false,
		price : false,
		discountprice : false,
		total : false,
		discounttotal : false,
		type : false,
		status : false,
		address : false,
		tel : false,
		consignee : false,
		remark : false,
		logistics : false,
		addtime : false,
		userid : false,
		maijiazhanghao : false,
		goodtype : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		orderid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		tablename: [
		],
		goodid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		goodname: [
		],
		picture: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		buynumber: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		price: [
			{ validator: validateNumber, trigger: 'blur' },
		],
		discountprice: [
			{ validator: validateNumber, trigger: 'blur' },
		],
		total: [
			{ validator: validateNumber, trigger: 'blur' },
		],
		discounttotal: [
			{ validator: validateNumber, trigger: 'blur' },
		],
		type: [
		],
		status: [
		],
		address: [
		],
		tel: [
		],
		consignee: [
		],
		remark: [
		],
		logistics: [
		],
		addtime: [
		],
		userid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		maijiazhanghao: [
		],
		goodtype: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//图片上传回调
	const pictureUploadSuccess=(e)=>{
		form.value.picture = e
	}
	//支付类型列表
	const typeLists = ref([])
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			orderid: getUUID(),
			tablename: 'ershoushangpin',
			goodid: '',
			goodname: '',
			picture: '',
			buynumber: '',
			price: '',
			discountprice: '',
			total: '',
			discounttotal: '',
			type: '',
			status: '',
			address: '',
			tel: '',
			consignee: '',
			remark: '',
			logistics: '',
			addtime: '',
			userid: '',
			maijiazhanghao: '',
			goodtype: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.logistics = res.data.data.logistics?(res.data.data.logistics.replace(reg,'../../../cl4259233/file')):'';
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'logistics'){
			isAdd.value = false
			formTitle.value = '修改物流信息'
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='orderid'){
					form.value.orderid = row[x];
					disabledForm.value.orderid = true;
					continue;
				}
				if(x=='tablename'){
					form.value.tablename = row[x];
					disabledForm.value.tablename = true;
					continue;
				}
				if(x=='goodid'){
					form.value.goodid = row[x];
					disabledForm.value.goodid = true;
					continue;
				}
				if(x=='goodname'){
					form.value.goodname = row[x];
					disabledForm.value.goodname = true;
					continue;
				}
				if(x=='picture'){
					form.value.picture = row[x];
					disabledForm.value.picture = true;
					continue;
				}
				if(x=='buynumber'){
					form.value.buynumber = row[x];
					disabledForm.value.buynumber = true;
					continue;
				}
				if(x=='price'){
					form.value.price = row[x];
					disabledForm.value.price = true;
					continue;
				}
				if(x=='discountprice'){
					form.value.discountprice = row[x];
					disabledForm.value.discountprice = true;
					continue;
				}
				if(x=='total'){
					form.value.total = row[x];
					disabledForm.value.total = true;
					continue;
				}
				if(x=='discounttotal'){
					form.value.discounttotal = row[x];
					disabledForm.value.discounttotal = true;
					continue;
				}
				if(x=='type'){
					form.value.type = row[x];
					disabledForm.value.type = true;
					continue;
				}
				if(x=='status'){
					form.value.status = row[x];
					disabledForm.value.status = true;
					continue;
				}
				if(x=='address'){
					form.value.address = row[x];
					disabledForm.value.address = true;
					continue;
				}
				if(x=='tel'){
					form.value.tel = row[x];
					disabledForm.value.tel = true;
					continue;
				}
				if(x=='consignee'){
					form.value.consignee = row[x];
					disabledForm.value.consignee = true;
					continue;
				}
				if(x=='remark'){
					form.value.remark = row[x];
					disabledForm.value.remark = true;
					continue;
				}
				if(x=='logistics'){
					form.value.logistics = row[x];
					disabledForm.value.logistics = true;
					continue;
				}
				if(x=='addtime'){
					form.value.addtime = row[x];
					disabledForm.value.addtime = true;
					continue;
				}
				if(x=='userid'){
					form.value.userid = row[x];
					disabledForm.value.userid = true;
					continue;
				}
				if(x=='maijiazhanghao'){
					form.value.maijiazhanghao = row[x];
					disabledForm.value.maijiazhanghao = true;
					continue;
				}
				if(x=='goodtype'){
					form.value.goodtype = row[x];
					disabledForm.value.goodtype = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.tablename='ershoushangpin'
			formVisible.value = true
		}

		typeLists.value = "现金,积分".split(',')
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		if(form.value.picture!=null) {
			form.value.picture = form.value.picture.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border-radius: 6px;
		padding: 30px;
		background: #fff;
		// form item
		:deep(.el-form-item) {
			margin: 0 0 20px 0;
			display: flex;
			justify-content: space-between;
			//label
			.el-form-item__label {
			 background: transparent;
			 display: block;
			 width: 90px;
			 text-align: right;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 160px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 1px solid #ddd;
					padding: 0 10px;
					width: 300px;
					line-height: 36px;
					box-sizing: border-box;
					height: 36px;
					//去掉默认样式
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
				//日期选择器
				.list_date {
					border: 1px solid #ddd;
					border-radius: 0;
					width: 400px;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 下拉框
				.list_sel {
					border: 1px solid #ddd;
					border-radius: 0;
					padding: 0 10px;
					width: 400px;
					line-height: 36px;
					box-sizing: border-box;
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
				// 富文本
				.list_editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					margin: 0;
					width: 100%;
					border-color: #ddd;
					border-width: 0;
					border-style: solid;
					height: auto;
				}
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
						margin: 7px 0 0;
						color: #999;
						display: flex;
						font-size: 12px;
						justify-content: flex-start;
						align-items: center;
					}
					//外部盒子
					.el-upload--picture-card {
						border: 1px dashed rgba(75,137,243,1);
						cursor: pointer;
						background-color: #fff;
						border-radius: 8px;
						width: 100px;
						line-height: 110px;
						text-align: center;
						height: 100px;
						//图标
						.el-icon{
							color: rgba(75,137,243,1);
							font-size: 32px;
						}
					}
					.el-upload-list__item {
						border: 1px dashed rgba(75,137,243,1);
						cursor: pointer;
						background-color: #fff;
						border-radius: 8px;
						width: 100px;
						line-height: 110px;
						text-align: center;
						height: 100px;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.30);
			margin: 0 10px 0 0;
			outline: none;
			color: #333;
			background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(227,225,224,1) 100%, rgba(255,255,255,1) 100%);
			width: auto;
			font-size: 14px;
			height: 32px;
		}
		.formModel_cancel:hover {
			background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(227,225,224,1) 100%, rgba(255,255,255,1) 100%);
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			box-shadow: inset 0 4px 10px 0 rgba(0,0,0,.3);
			margin: 0 10px 0 0;
			outline: none;
			color: #fff;
			background: linear-gradient(0deg, rgba(67,125,205,1) 0%, rgba(30,103,183,1) 100%, rgba(227,225,224,1) 100%);
			width: auto;
			font-size: 14px;
			height: 32px;
		}
		.formModel_confirm:hover {
			background: linear-gradient(180deg, rgba(67,125,205,1) 0%, rgba(30,103,183,1) 100%, rgba(227,225,224,1) 100%);
		}
	}
</style>