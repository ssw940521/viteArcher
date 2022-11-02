<template>
    <div>
        <div style="text-align: center;">编辑器</div>
        <div
            style="border: 1px solid #ccc"
            class="edit"
        >
            <div>
                <span>标题：</span>
                <el-input
                    v-model="articleTitle"
                    placeholder="输入标题"
                    clearable
                    @change=""
                    class="input"
                ></el-input>
            </div>

            <div>
                <span>作者：</span>
                <el-input
                    v-model="articleAuthor"
                    placeholder="输入作者"
                    clearable
                    @change=""
                    class="input"
                ></el-input>
            </div>

            <div>
                <span>分类：</span>
                <el-cascader
                    :options="options"
                    v-model="optionValue"
                    clearable
                    filterable
                    :props="{ expandTrigger: 'hover'}"
                    @change="showTag"
                >
                </el-cascader>
            </div>
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
            <el-button
                type="primary"
                size="default"
                @click="saveArticle"
            >保存文章</el-button>

        </div>

    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import instance from '../utils/http'
import { ElNotification } from 'element-plus'

export default {
    data() {
        return {
            options: null
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        instance.get('articleApi/article/getArticleClass')
            .then((response) => {
                this.options = this.formattClassTag(response.data);
                console.log(this.formattClassTag(response.data));
            }).catch((error) => {
                console.log(error);
            })
    },
    // methods方法
    methods: {
        tagName2Value(name) {
            return { value: name, label: name }
        },
        formattClassTag(tagList) {
            let primaryOptions = new Array();
            for (var tag of tagList) {
                let primaryTag = this.tagName2Value(tag.name);
                if (tag.subTags != null) {
                    let secondOptions = new Array()
                    for (var second of tag.subTags) {
                        let secondTag = this.tagName2Value(second.name);
                        if (second.subTags != null) {
                            let thirdOptions = new Array();
                            for (var third of second.subTags) {
                                let thirdTag = this.tagName2Value(third.name)
                                thirdOptions.push(thirdTag)
                            }
                            secondTag.children = thirdOptions;
                        }
                        secondOptions.push(secondTag)
                    }
                    primaryTag.children = secondOptions;
                }
                primaryOptions.push(primaryTag)
            }

            return primaryOptions;
        },
        showTag() {
            console.log(this.optionValue);
        }
    },
    components: { Editor, Toolbar },
    setup() {
        let articleTitle = ref('');
        let articleAuthor = ref('');
        let optionValue = ref([]);
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef();

        // 内容 HTML
        const valueHtml = ref('<p>hello</p>')
        // 模拟 ajax 异步获取内容
        onMounted(() => {
            setTimeout(() => {
                valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
            }, 1500)
        })

        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
            console.log("销毁！")
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }
        const saveArticle = () => {
            const editor = editorRef.value
            if (editor == null) {
                console.log('空的');
                return;
            }
            let tags = ""
            for (var tag of optionValue.value) {
                tags += tag
                tags += '|'
            }
            tags = tags.substring(0, tags.length - 1)
            console.log(articleAuthor.value)
            instance.post('articleApi/article/addArticle', {
                title: articleTitle.value,
                author: articleAuthor.value,
                tag: tags,
                content: editor.getHtml()
            }).then((response) => {
                console.log(response);
                ElNotification({
                    title: "保存文章",
                    message:"成功！"
                })
            }).catch((error) => {
                console.log(error);
                ElNotification({
                    title: "保存文章",
                    message: error
                })
            })

        }
        editorConfig.MENU_CONF['uploadImage'] = {
            server: 'articleApi/picture/getPicture',
            fieldName: 'file',
            base64LimitSize: 5 * 1024
            // 上传图片的配置
        }
        return {
            editorRef,
            valueHtml,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            articleTitle,
            articleAuthor,
            optionValue,
            saveArticle
        };
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.input {
    width: 300px;
}

.edit {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 200px;
    margin-right: 200px;
}
</style>
