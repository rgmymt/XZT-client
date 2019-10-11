<template>
	<div id="bg">
        <x-header :left-options="{backText: ''}">
            <span style="margin-top:5px;font-size:17px;">委培课程</span>
        </x-header>
        <div id="company_label1">
            <div id="company_information1">
                <h3 v-html=value.companyName></h3>
                <p v-html=value.tuitionOriginal></p>
                <p v-html=value.place></p>
                <p v-html=value.scale></p>
                <textarea v-html=value.content></textarea>
            </div>
            <div id="company_synopsis">
                <textarea v-html=value.introduction></textarea>
            </div>
        </div>
        <div id="Button_div">
            <button>立即报名</button>
        </div>
	</div>
</template>

<script>
import {
    XHeader,
    Flexbox,
    FlexboxItem,
    XInput,
    Group,
} from 'vux'

var D_idx = '';

export default {
    components: {
        XHeader,
        Flexbox,
        FlexboxItem,
        XInput,
        Group,
    },
    data() {
        return {
            value:{}
            }
    },
    methods:{
        begindo(){
            D_idx = this.$route.query.D_id;
            console.log(D_idx);
            var UrL = this.yuming + '/msg/commissionedTrain/detail' +'?ID='+ D_idx + '&loginId=' + localStorage.getItem('loginid') +'&token=' +  localStorage.getItem('Authorization');
            this.axios({
                method: 'GET' ,
                url: UrL,
                data: {
                    ID: '1'
                }
            }).then(res =>{
                console.log(res.data);
                this.value = res.data.data;
            }).catch(error =>{
                console.log('ERROR');
            });
        }
    },
    mounted: function(){
        this.begindo();
	}
}
</script>

<style>
html,body {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
}

#bg {
  margin: 0;             
  padding: 0;
  width: 100%;
  height: 100%;
}
.vux-header {
        background-color: #7AB9F6 !important;
        height: 45px;
        text-align: center;
        line-height: 60px;
        color: #FFFFFF;
        width: 100%;
    }
.left-arrow:before {
    border: 2px solid #FFFFFF !important;
    border-width: 2px 0px 0px 2px !important;
}

#company_label1 {
    height: 75%;
}

#company_label1 h3 {
    margin: 0px auto 0.5em ;
    padding-top: 1.1em;
}

#company_label1 p {
    margin: 0.8em auto 0.8em ;
}


#company_information1 {
    height: 50%;
    border-bottom: 2px #6473c8 solid ;
    padding-left: 7%;
}

#company_synopsis {
    height: 50%;
    padding-left: 7%;padding-top: 7%;
}

#company_information1 textarea {
    width: 80%;
    background-color: rgba(0,0,0,0);
    border: none;
    height: 30%;
}

#company_synopsis textarea {
    width: 86%;
    background-color: rgba(0,0,0,0);
    border: none;
    height: 80%;
}

#Button_div {
    margin-top:10%;
    text-align: center;
}

#Button_div button {
    background-color: #7AB9F6 ;
    color: #FFFFFF;
    width: 40%;
    height: 3.5em;
    border: none;
    border-radius: 5px;
}

#Button_div button:active {
    background-color: rgb(107, 163, 219) ;
    transform: translateY(-1px);
}

</style>
