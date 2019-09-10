<template>
  <div class="home">
      <input type="text" v-model="phone" placeholder="手机号码">
      <input type="password" v-model="password" placeholder="密码">
      <button @click="logo()">登入</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      phone:"",
      password:""
    }
  },
  methods:{
    logo(){
      this.axios.post("http://localhost:3000/api/login",{phone:this.phone,password:this.password}).then((res)=>{
        if(res.data.code==1){
          localStorage.setItem("token",res.data.token);
          this.$router.push("/home")
        }
      })
    }
  }
}
</script>
<style lang="less">
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
      width: 96%;
      height: 44px;
      border:0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      margin-top: 20px;
      color: #fff;
      font-size: 18px;
      outline: none;
    }
    input{
      width: 96%;
      height: 44px;
      border:0;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      outline: none;
    }
  }
</style>