<template>
<el-empty description="description" />
</template>

<script>
import router from '@/router/router'
export default {
    data() {
        return {

        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },
    // methods方法
    methods: {
        toHome(){
             router.push({path:'/'})
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
