<template>
    <nav class="header">
        <div class="logo">
            <a href="/">
                <el-image
                    style="width: 45px; height: 45px"
                    :src="getUrl('dragon.svg')"
                    fit="fill"
                />
            </a>
        </div>

        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            router="true"
            ellipsis="false"
        >
            <el-menu-item
                index="/article"
                class="headbut"
            >文章</el-menu-item>
            <el-menu-item
                index="/show"
                class="headbut"
            >展示</el-menu-item>
            <el-menu-item
                index="/resources"
                class="headbut"
            >相关资源</el-menu-item>
            <el-menu-item
                v-if="isEditor"
                index="/editor"
                class="headbut"
            >编辑器</el-menu-item>


        </el-menu>
        <div class="search">
            <el-input
                v-model="input"
                placeholder="Please input"
                class="searchInput"
            />
            <el-button
                type="primary"
                size="default"
                @click="searchArticle"
            >搜索</el-button>

        </div>

    </nav>
</template>

<script>
import jumpUtils from '@/utils/jump.js'
import imgUrl from '../assets/logo.png'
import { getAssetsFile } from '@/utils/imgUtil.js'
import router from '../router/router'
import EditorPage from '../views/EditorPage.vue'
export default {
    data() {
        return {
            activeIndex: 1,
            userName: 'ssw',
            urlr: imgUrl,
            input:"施工中"
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
       if (import.meta.env.MODE === 'development') {
        router.addRoute( {
        path: '/editor',
        component: EditorPage
      })
       }
    },
    // methods方法
    methods: {
        handleSelect(index, indexPath) {
            console.log(index)
            console.log(indexPath)
        },
        goHome() {
            jumpUtils.goHome();
        },
        searchArticle() {
            console.log(getAssetsFile("a"))
        },
        getUrl(str) {
            return getAssetsFile(str);
        }
    },
    computed: {
        articleUser() {
            return '/article/' + this.userName;
        },
        isEditor() {
            if (import.meta.env.MODE === 'development') {
                return true;
            }
            return false;
        }
    },
    setup() {

    }
}
</script>
<style>
/* @import url(); 引入css类 */
.header {
    margin: 0%;
    padding: 0px;
    width: 100%;
    height: 60px;
    font-size: 22px;
    display: flex;

}

.el-menu-demo {
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--header-color);

}

.headbut {
    position: relative;
    left: 50px;
}

.logo {
    position: relative;
    top: 8px;
    left: 5px;
    width: 50px;
}

.searchInput {
    padding: 10px;
    size: default;
}

.search {
    margin-right: 15px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px var(--el-menu-border-color);
    background-color: var(--header-color);
}
</style>
