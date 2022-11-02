<template>
    <el-container
        :direction="vertical"
        class="main"
    >
        <el-aside class="aside">
            <div class="sideBar">
                <h5 class="menuHeader">文章分类导航</h5>
                <el-menu
                    class="menu"
                    @open="handleOpen"
                    @close="handleClose"
                    router="true"
                >
                    <el-sub-menu
                        v-for="(primary,index) in indexTree"
                        :index="index"
                    >
                        <template #title>
                            <el-icon>
                                <component
                                    :is="getIcon(primary.name)"
                                    style="width: 1em; height:1em;"
                                />
                            </el-icon>
                            <span>{{primary.name}}</span>
                        </template>
                        <el-menu-item
                            v-for="article in articleIndexTree[primary.name]"
                            :index="`/article/${article.id}`"
                            :key="article.id"
                        >
                            {{article.title}}
                        </el-menu-item>
                        <el-sub-menu
                            v-for="(secondary,subIndex) in primary.subTags"
                            :index="index+'-'+subIndex"
                        >
                            <template #title>
                                <span>{{secondary.name}}</span>
                            </template>
                            <el-menu-item
                                v-for="article in articleIndexTree[secondary.name]"
                                :index="`/article/${article.id}`"
                                :key="article.id"
                            >
                                {{article.title}}
                            </el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </div>

        </el-aside>
        <el-main class="artile">
            <router-view></router-view>
        </el-main>
        <!-- <el-aside class="aside"></el-aside> -->
    </el-container>
</template>

<script>
import instance from '../utils/http';

const iconMap = {
    游戏: 'SwitchFilled',
    前端: 'ElementPlus',
    杂谈: 'GoodsFilled',
    default: 'Folder'
}

export default {
    data() {
        return {
            icon: 'Promotion',
            articleIndexTree: null,
            indexTree: null
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {

        this.getArticleIndexTree();
        this.getIndexTree();

    },
    setup() {

    },
    // methods方法
    methods: {

        processIndex() {
            for (var article of this.articleIndex) {
                let tags = article.tag.split('|');
                for (var tag of tags) {
                    if (this.indexTree[tag] != undefined) {

                    }
                }
            }
        },
        getArticleIndexTree() {
            instance.get('/articleApi/article/getArticleIndexTree')
                .then((response) => {
                    this.articleIndexTree = response.data
                    console.log(this.articleIndexTree["基础"][0].id)
                }).catch((error) => {
                    console.log(error);
                })
        },
        getIndexTree() {
            instance.get('/articleApi/article/getArticleClass')
                .then((response) => {
                    this.indexTree = response.data;
                }).catch((error) => {
                    console.log(error);
                })
        },
        getIcon(indexName) {
            if (iconMap[indexName] !== undefined) {
                return iconMap[indexName];
            } else {
                return iconMap.default;
            }

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
.artile {
    /* padding-left: 150px;
    padding-right: 150px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 60%;
    justify-content: left;
    overflow-x: hidden;

}

.main {
    width: auto;
    margin-left: auto;
    margin-right: auto;
}

.homePage {
    display: flex;
}

.aside {
    height: auto;
    --el-menu-bg-color: var(--el-color-primary-light-3);
    --el-menu-text-color: white;
    --el-menu-hover-bg-color: var(--el-color-primary-light-5);
    --el-menu-active-color : rgb(69, 81, 17);
}

.menuHeader {
    background-color: var(--el-color-primary-light-3);
    margin: auto;
    padding: 16px;
    color: white;
    text-align: start;
    font-size: large;
}

.menu {
    border: 0px;
}
.sideBar{
    min-height: 800px;
    background-color: var(--el-color-primary-light-3);
}
</style>
