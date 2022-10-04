import router from "@/router/router";

const jumpUtils = {
    goHome(){
        console.log("jumped")
        router.push({path:'/'});
    }
}

export default jumpUtils