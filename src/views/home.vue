<template>
  <div class="context">
    <header>
      <span><p>←</p></span>
      <h3>加班/休假</h3>
      <span>
        <p>📅</p>
        <p>🔍</p>
      </span>
    </header>
    <nav>
      <span :class="{active:state_tab[0]}" @click="stateTab(0)">待处理</span>
      <span :class="{active:state_tab[1]}" @click="stateTab(1)">已发起</span>
      <span :class="{active:state_tab[2]}" @click="stateTab(2)">已处理</span>
    </nav>
    <div class="tab">
      <span>
        <p :class="{active:type_tab[0]}" @click="typeTab(0)">加班</p>
        <p :class="{active:type_tab[1]}" @click="typeTab(1)">休假</p>
      </span>
    </div>
      <div class="evey" v-for="(task,index) in list" :key="index"> 
        <div class="top">
          <span>{{task.applicationNumber}}</span><span> 待审批</span>
        </div>
        <div class="name">
          <span>
            <p>申请人</p>
            <h5>{{task.nickname}}</h5>
          </span>
          <span v-if="task.type == 1"><p>加班类型</p><h5>工作日加班</h5></span>
          <span v-else-if="task.type == 2"><p>加班类型</p><h5>双休日加班</h5></span>
          <span v-else><p>加班类型</p><h5>假期加班</h5></span>
          <span>
            <p>加班日期</p>
            <h5>{{new Date(task.startTime).toLocaleDateString()}}</h5>
          </span>
          <span>
            <p>加班时数</p>
            <h5>{{ ( ( new Date(task.endTime)-new Date(task.startTime) ) / 3600000 ).toFixed(1) }}</h5>
          </span>
        </div>
      </div>
    <div class="release" v-if="release" @click="chang()">
      <span>
        <p @click="rout()">加班</p>
        <p @click="routs()">休假</p>
      </span>
    </div>
    <footer v-if="bool" @click="relea()"> 
      +发起任务
    </footer>
  </div>
</template>
<script>
export default {
  data(){
    
    return {
      state_tab:[true,false,false],
      type_tab:[true,false],
      task_ind:0,
      task_type:"overtime",
      list:[],
      release:false,
      bool:true
    }
  },
  methods:{
    rout(){
      this.$router.push("/vacation")
    },
    routs(){
      this.$router.push("/overtime")
    },
    //点击隐藏遮罩层
    chang(){
      this.release=false
      this.bool=true
    },
    //点击遮罩层显示
    relea(){
      this.release=true
      this.bool=false
    },
    stateTab(ind){
      this.state_tab.map((item,index)=>{
        if(ind==index){
          this.$set(this.state_tab,index,true)
        }else{
          this.$set(this.state_tab,index,false)
        }
      })
      this.task_ind=ind
      this.taskList(this.task_ind,this.task_type)
    },
    typeTab(ind){
      this.type_tab.map((item,index)=>{
        if(ind==index){
          this.$set(this.type_tab,index,true)
        }else{
          this.$set(this.type_tab,index,false)
        }
      })
      this.task_type=ind==0?"overtime":"vacation";
      this.taskList(this.task_ind,this.task_type)
    },
    taskList(status,type){
       this.axios.defaults.headers.common['token'] = localStorage.getItem('token');
            this.axios.defaults.headers.common['token'] = localStorage.getItem('token');
            this.axios.get('http://localhost:3000/api/task/list',{ params:{status,type,create_at:0} }).then((res)=>{
                console.log(res.data);
                //将获取到的任务列表,,存入当前组件实例
                this.list = res.data.data;
            })
    }
  },
  mounted() {
    this.taskList(this.task_ind,this.task_type)
  },
}
</script>
<style scoped lang="less">
.context{
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ccc;
  overflow: auto;
  .release{
    width: 100%;
    height: 100%;
    position: absolute;
    background:rgba(0,0,0,0.2);
    span{
      width: 100%;
      height: 100px;
      display: flex;
      p{
        flex: 1;
        display: flex;
      justify-content: center;
      }
      align-items: center;
      background: #fff;
      position: fixed;
      bottom: 0;
    }
  }
  footer{
    width: 30%;
    height: 44px;
    background: rgb(37, 224, 115);
    color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom:10px;
    right: 10px;
  }
    .evey{
      margin:2% 0;
      width: 100%;
      height: 140px;
      display:flex;
      flex-direction: column;
      background: #fff;
      color: #666666;
      .name{
        width: 100%;
        display:flex;
        flex-wrap: wrap;
        span{
          width: 42%;
          height: 44px;
          display: flex;
          align-items: center;
          margin: 0 4%;
          h5{
            color: #000;
          }
          p{
            width: 75px;
          }
        }
      }
      .top{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          margin: 0 4%;
        }
      }
    }
  .tab{
    width: 100%;
    height: 70px;
    display:flex;
    align-items: center;
    justify-content: center;
    span{
      display: flex;
      align-items: center;
      overflow: hidden;
      border:1px solid rgb(37, 224, 115);
      color: rgb(37, 224, 115);
      width: 50%;
      height: 50%;
      border-radius: 20px;
      p{
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active{
        background: rgb(37, 224, 115);
        color: #fff;
      }
    }
  }
  nav{
    width: 100%;
    height: 100px;
    display: flex;
    background: #fff;
    color: #9c9c9c;
    span{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active{
      color: rgb(37, 224, 115);
    }
  }
  header{
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    background: #fff;
    h3{
      flex: 1;
      display: flex;
      justify-content: center;
    }
    span{
      width: 70px;
      display: flex;
      
      p{
        margin: 0 6px;
      }
      
    }
  }
}
</style>