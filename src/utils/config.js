const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/cl4259233/client/index.html'
        }
    },
    getProjectName(){
        return {
            projectName: "基于Java的校园二手商品交易系统设计与实现"
        } 
    }
}
export default config
