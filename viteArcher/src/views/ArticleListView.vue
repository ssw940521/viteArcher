<template>
    <div class="title">
        <h1>文章列表</h1>
    </div>
    <router-link
        :to="`/article/${item.id}`"
        v-for="item in articleIndex"
        :key="item.id"
        class="articleCard"
    >
        <el-card shadow="hover" >
            <template #header>
                <div class="card-header">
                    <span class="cardTitle">{{ item.title }}</span>
                    <div class="info">
                        <p>作者:{{ item.author }} </p>
                        <p>时间:{{ formatedDate(item.created) }}</p>
                    </div>
                </div>
            </template>
            <div class="card-content">
                {{ item.intro }}...
            </div>
        </el-card>
    </router-link>
</template>

<script>
import instance from '../utils/http';
export default {
    data() {
        return {
            articleIndex: null
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        this.getArticleList();
    },
    // methods方法
    methods: {
        formatedDate(date) {
            let pattern = /\d+-\d+-\d+/
            return date.match(pattern)[0];
        },
        getArticleList() {
            instance.post('/articleApi/article/getArticleList', {
                currentPage: "1",
                totalPage: "10"
            })
                .then((response) => {
                    this.articleIndex = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
        },
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */


.articleCard {
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    width: 100%;
    text-decoration: none;
    max-width: 1200px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    height: auto;
}

.card-content {
    /* margin-bottom: 18px; */
    text-align: start;
}

.title {
    text-align: center;
    align-self: center;
}

.info {
    align-self: end;
    text-align: start;
    margin: 0px;
}

.cardTitle {
    flex-basis: 70%;
    text-align: left;

}
div p {
    margin: 1px;
}
</style>
