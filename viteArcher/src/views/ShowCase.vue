<template>
    <div>
        <iframe
            :src="url"
            frameborder="0"
            width="1024px"
            height= "600px"
            scrolling="no"
        ></iframe>
    </div>
</template>

<script>
import gameUrl from '../assets/game/pong.html?url'

export default {
    data() {
        return {
            url: gameUrl
        }
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {
      console.log(gameUrl)
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
</style>
