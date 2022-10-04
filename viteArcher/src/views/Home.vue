<template>
  <el-container>
      <el-header class="header"> <Header></Header></el-header>
      <el-main class="mainContainer"><router-view></router-view></el-main>
      
    </el-container>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    data() {
       
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
    },
    // methods方法
    methods: {
    },
    components: { Header }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.header{
    padding: 0px;
     background-color:var(--header-color);
}
.mainContainer{
    padding: 0px;
    background-color:var(--theme-color);
    min-height:1600px
}
</style>
