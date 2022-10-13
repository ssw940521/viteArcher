<template>
    <div class="articleContent">
        <div>
            <slot name="title"></slot>
        </div>
        <div class="info">
            <el-tag
                class="tag"
                type="info"
                size="small"
                effect="dark"
                v-for="tag in tags"
            >
              {{tag}}
            </el-tag>
            <span>
                <slot name="author"></slot>
            </span>
        </div>
        <div class="article">
            <br>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['tags'],
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

    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.article {
    margin-bottom: 24px;
}

.articleContent {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    text-align: start;
}
.info{
    display: flex;
    justify-content: center;
    align-items: center;
}
.info>* {
    padding: 10px;
    align-items: center;
} 
.tag{
    margin-left: 2px;
    margin-right: 2px;
}
</style>
