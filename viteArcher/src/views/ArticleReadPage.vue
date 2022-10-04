<template>
    <el-container
        :direction="vertical"
        class="article"
    >
        <ArticleComponent class="content">
            <template v-slot:tag>
                {{ currentArticle.tag }}
            </template>
            <template v-slot:title>
                <h1>{{ currentArticle.title }}</h1>
            </template>
            <template v-slot:author>
                {{ currentArticle.author }}
            </template>
            <template v-slot:content>
                {{ currentArticle.content }}
            </template>
        </ArticleComponent>
    </el-container>


</template>

<script>
import ArticleComponent from '@/components/ArticleComponent.vue'
import instance from '../utils/http';
export default {
    data() {
        return {
            currentArticle: {}
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        console.log(this.$route.params.id);
        this.getArticleContentById(this.$route.params.id)
    },
    // methods方法
    methods: {
        getArticleContentById(articleId) {
            instance.get('/articleApi/article/getArticleById/'+articleId)
                .then(
                    (response) => { this.currentArticle = response.data;
                    console.log(response.data) }
                )
                .catch(
                    function (error) {
                        console.log(error);
                    }
                )
        }
    },
    components: { ArticleComponent }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.article {
    justify-content: center;

}

.content {
    margin: auto;
}
</style>
