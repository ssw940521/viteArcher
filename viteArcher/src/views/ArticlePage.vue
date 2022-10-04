<template>
    <el-container
        :direction="vertical"
        class="main"
    >
        <el-aside class="aside">
            <el-row class="tac">
                <el-col>
                    <h5 class="mb-2">文章分类导航</h5>
                    <el-menu
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        style="background-color: var(--part-color);"
                        router="true"
                    >
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <Promotion />
                                </el-icon>
                                <span>游戏</span>
                            </template>
                            <el-menu-item
                                v-for="item in articleIndex"
                                :index="`/article/${item.id}`"
                                :key="item.id"
                            >
                            {{item.title}}
                            </el-menu-item>

                            <!-- <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                            <el-menu-item index="1-3">item three</el-menu-item>
                            <el-menu-item index="1-4-1">item Four</el-menu-item> -->
                        </el-sub-menu>
                        <el-menu-item index="2" disabled>
                            <el-icon>
                                <Reading />
                            </el-icon>
                            <span>前端</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <el-icon>
                                <Shop />
                            </el-icon>
                            <span>杂谈</span>
                        </el-menu-item>
                        <el-menu-item index="4" disabled>
                            <el-icon>
                                <Folder />
                            </el-icon>
                            <span>归档</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-main class="artile">
            <div class="title">
                <h1>文章列表</h1>
            </div>
            <router-link
                :to="`/article/${item.id}`"
                v-for="item in articleIndex"
                :key="item.id"
                class="articleCard"
            >
                <el-card shadow="hover">
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
        </el-main>
        <el-aside class="aside"></el-aside>
    </el-container>
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
    setup() {

    },
    // methods方法
    methods: {
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
        formatedDate(date) {
            let pattern = /\d+-\d+-\d+/
            return date.match(pattern)[0];
        }
    },
    computed: {

    },
    watch: {

    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.main {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.homePage {
    display: flex;
}

.artile {
    /* padding-left: 150px;
    padding-right: 150px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 60%;
    justify-content: left;
}

.articleCard {
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    width: 100%;
    text-decoration: none;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-content {
    /* margin-bottom: 18px; */
    text-align: start;
}

.aside {
    flex-basis: 20%;
    background-color: var(--part-color);
}

.title {
    align-self: start;
}

.info {
    align-self: end;
    text-align: left;
}

.cardTitle {
    position: relative;

    flex-basis: 70%;
    text-align: left;

}

div p {
    margin: 1px;
}
</style>
