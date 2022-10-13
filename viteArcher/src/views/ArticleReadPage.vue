<template>
    <div
        :direction="vertical"
        class="article"
    >
        <ArticleComponent
            class="content"
            :tags="tags"
        >
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
                <div v-html="currentArticle.content">

                </div>
            </template>
        </ArticleComponent>
    </div>


</template>

<script>
import ArticleComponent from '@/components/ArticleComponent.vue'
import instance from '../utils/http';
export default {
    data() {
        return {
            currentArticle: {},
            tags: []
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    async mounted() {
        await this.getArticleContentById(this.$route.params.id)
        this.getTags()

    },
    // methods方法
    methods: {
        async getArticleContentById(articleId) {
          await instance.get('/articleApi/article/getArticleById/' + articleId)
                .then(
                    (response) => {
                        this.currentArticle = response.data;
                    }
                )
                .catch(
                    function (error) {
                        console.log(error);
                    }
                )
        },
        getTags() {
            this.tags = this.currentArticle.tag.split('|')
        }
    },
    components: { ArticleComponent }

}
</script>
<style scoped>
/* @import url(); 引入css类 */
.article {
    justify-content: center;
    text-align: start;
}

.content {
    margin: auto;
}
</style>
