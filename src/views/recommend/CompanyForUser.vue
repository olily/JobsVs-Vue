<template>
  <div id="content">
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="2"><div>
          <el-cascader
            v-model="cityArray"
            :options="cityOptions"
            :show-all-levels="false"
          ></el-cascader>
        </div></el-col>
        <el-col :span="4"><div>
          <el-select v-model="companysizeValue" placeholder="公司规模">
            <el-option
              v-for="item in companysizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div>
          <el-select v-model="companyqualityValue" placeholder="学历">
            <el-option
              v-for="item in companyqualityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="companyname" placeholder="公司名"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        class="table_div"
        :data="companies"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          label="企业"
        >
        </el-table-column>
        <el-table-column
          prop="city_name"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="size_name"
          label="规模">
        </el-table-column>
        <el-table-column
          prop="quality_name"
          label="性质">
        </el-table-column>
        <el-table-column
          prop="count_jobs"
          label="新增岗位数">
          10
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              v-if="that.$store.state.userFocusCompanies!==null&&that.$store.state.userFocusCompanies.hasOwnProperty(companies[scope.$index].id)"
              size="mini"
              @click.native.prevent="delFocusCompanyHandler(scope.$index)">删除</el-button>
            <el-button v-else
              size="mini"
              type="danger"
              @click.native.prevent="addFocusCompanyHandler(scope.$index)">关注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination background layout="prev, pager, next"
                       @current-change="currentChangeHandler"
                       @prev-click="currentChangeHandler"
                       @next-click="currentChangeHandler"
                       :total="total"
                       :page-size="pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {delFocusCompany, getCompanies, addFocusCompany, getFocusCompanies} from '../../api/api'
  export default {
    name: "CompanyForUser",
    data(){
      return{
        search: '',
        companyname: '',
        companies: [],
        curPage: 1,
        pageSize: 5,
        total: 10000,
        cityOptions: [{'value':'','label':'省份','children':[{'value':'','label':'城市'}]},{'value':1,'label':'无','children':[{'value':1,'label':'无'}]},{'value':2,'label':'北京','children':[{'value':2,'label':'北京'}]},{'value':3,'label':'上海','children':[{'value':3,'label':'上海'}]},{'value':4,'label':'广东省','children':[{'value':4,'label':'广州'},{'value':5,'label':'惠州'},{'value':6,'label':'汕头'},{'value':7,'label':'珠海'},{'value':8,'label':'佛山'},{'value':9,'label':'中山'},{'value':10,'label':'东莞'},{'value':11,'label':'韶关'},{'value':12,'label':'江门'},{'value':13,'label':'湛江'},{'value':14,'label':'肇庆'},{'value':15,'label':'清远'},{'value':16,'label':'潮州'},{'value':17,'label':'河源'},{'value':18,'label':'揭阳'},{'value':19,'label':'茂名'},{'value':20,'label':'汕尾'},{'value':21,'label':'梅州'},{'value':22,'label':'开平'},{'value':23,'label':'阳江'},{'value':24,'label':'云浮'}]},{'value':5,'label':'深圳','children':[{'value':25,'label':'深圳'}]},{'value':6,'label':'天津','children':[{'value':26,'label':'天津'}]},{'value':7,'label':'重庆','children':[{'value':27,'label':'重庆'}]},{'value':8,'label':'江苏省','children':[{'value':28,'label':'南京'},{'value':29,'label':'无锡'},{'value':30,'label':'常州'},{'value':31,'label':'昆山'},{'value':32,'label':'常熟'},{'value':33,'label':'扬州'},{'value':34,'label':'南通'},{'value':35,'label':'镇江'},{'value':36,'label':'徐州'},{'value':37,'label':'连云港'},{'value':38,'label':'盐城'},{'value':39,'label':'张家港'},{'value':40,'label':'太仓'},{'value':41,'label':'泰州'},{'value':42,'label':'淮安'},{'value':43,'label':'宿迁'},{'value':44,'label':'丹阳'},{'value':45,'label':'泰兴'},{'value':46,'label':'靖江'}]},{'value':9,'label':'浙江省','children':[{'value':47,'label':'杭州'},{'value':48,'label':'宁波'},{'value':49,'label':'温州'},{'value':50,'label':'绍兴'},{'value':51,'label':'金华'},{'value':52,'label':'嘉兴'},{'value':53,'label':'台州'},{'value':54,'label':'湖州'},{'value':55,'label':'丽水'},{'value':56,'label':'舟山'},{'value':57,'label':'衢州'},{'value':58,'label':'义乌'},{'value':59,'label':'海宁'}]},{'value':10,'label':'四川省','children':[{'value':60,'label':'成都'},{'value':61,'label':'绵阳'},{'value':62,'label':'乐山'},{'value':63,'label':'泸州'},{'value':64,'label':'德阳'},{'value':65,'label':'宜宾'},{'value':66,'label':'自贡'},{'value':67,'label':'内江'},{'value':68,'label':'攀枝花'},{'value':69,'label':'南充'},{'value':70,'label':'眉山'},{'value':71,'label':'广安'},{'value':72,'label':'资阳'},{'value':73,'label':'遂宁'},{'value':74,'label':'广元'},{'value':75,'label':'达州'},{'value':76,'label':'雅安'},{'value':77,'label':'西昌'},{'value':78,'label':'巴中'},{'value':79,'label':'甘孜'},{'value':80,'label':'阿坝'},{'value':81,'label':'凉山'}]},{'value':11,'label':'海南省','children':[{'value':82,'label':'海口'},{'value':83,'label':'三亚'},{'value':84,'label':'洋浦经济开发区'},{'value':85,'label':'文昌'},{'value':86,'label':'琼海'},{'value':87,'label':'万宁'},{'value':88,'label':'儋州'},{'value':89,'label':'东方'},{'value':90,'label':'五指山'},{'value':91,'label':'定安'},{'value':92,'label':'屯昌'},{'value':93,'label':'澄迈'},{'value':94,'label':'临高'},{'value':95,'label':'三沙'},{'value':96,'label':'琼中'},{'value':97,'label':'保亭'},{'value':98,'label':'白沙'},{'value':99,'label':'昌江'},{'value':100,'label':'乐东'},{'value':101,'label':'陵水'}]},{'value':12,'label':'福建省','children':[{'value':102,'label':'福州'},{'value':103,'label':'厦门'},{'value':104,'label':'泉州'},{'value':105,'label':'漳州'},{'value':106,'label':'莆田'},{'value':107,'label':'三明'},{'value':108,'label':'南平'},{'value':109,'label':'宁德'},{'value':110,'label':'龙岩'}]},{'value':13,'label':'山东省','children':[{'value':111,'label':'济南'},{'value':112,'label':'青岛'},{'value':113,'label':'烟台'},{'value':114,'label':'潍坊'},{'value':115,'label':'威海'},{'value':116,'label':'淄博'},{'value':117,'label':'临沂'},{'value':118,'label':'济宁'},{'value':119,'label':'东营'},{'value':120,'label':'泰安'},{'value':121,'label':'日照'},{'value':122,'label':'德州'},{'value':123,'label':'菏泽'},{'value':124,'label':'滨州'},{'value':125,'label':'枣庄'},{'value':126,'label':'聊城'},{'value':127,'label':'莱芜'}]},{'value':14,'label':'江西省','children':[{'value':128,'label':'南昌'},{'value':129,'label':'九江'},{'value':130,'label':'景德镇'},{'value':131,'label':'萍乡'},{'value':132,'label':'新余'},{'value':133,'label':'鹰潭'},{'value':134,'label':'赣州'},{'value':135,'label':'吉安'},{'value':136,'label':'宜春'},{'value':137,'label':'抚州'},{'value':138,'label':'上饶'}]},{'value':15,'label':'广西','children':[{'value':139,'label':'南宁'},{'value':140,'label':'桂林'},{'value':141,'label':'柳州'},{'value':142,'label':'北海'},{'value':143,'label':'玉林'},{'value':144,'label':'梧州'},{'value':145,'label':'防城港'},{'value':146,'label':'钦州'},{'value':147,'label':'贵港'},{'value':148,'label':'百色'},{'value':149,'label':'河池'},{'value':150,'label':'来宾'},{'value':151,'label':'崇左'},{'value':152,'label':'贺州'}]},{'value':16,'label':'安徽省','children':[{'value':153,'label':'合肥'},{'value':154,'label':'芜湖'},{'value':155,'label':'安庆'},{'value':156,'label':'马鞍山'},{'value':157,'label':'蚌埠'},{'value':158,'label':'阜阳'},{'value':159,'label':'铜陵'},{'value':160,'label':'滁州'},{'value':161,'label':'黄山'},{'value':162,'label':'淮南'},{'value':163,'label':'六安'},{'value':164,'label':'宣城'},{'value':165,'label':'池州'},{'value':166,'label':'宿州'},{'value':167,'label':'淮北'},{'value':168,'label':'亳州'}]},{'value':17,'label':'河北省','children':[{'value':169,'label':'雄安新区'},{'value':170,'label':'石家庄'},{'value':171,'label':'廊坊'},{'value':172,'label':'保定'},{'value':173,'label':'唐山'},{'value':174,'label':'秦皇岛'},{'value':175,'label':'邯郸'},{'value':176,'label':'沧州'},{'value':177,'label':'张家口'},{'value':178,'label':'承德'},{'value':179,'label':'邢台'},{'value':180,'label':'衡水'},{'value':181,'label':'燕郊开发区'}]},{'value':18,'label':'河南省','children':[{'value':182,'label':'郑州'},{'value':183,'label':'洛阳'},{'value':184,'label':'开封'},{'value':185,'label':'焦作'},{'value':186,'label':'南阳'},{'value':187,'label':'新乡'},{'value':188,'label':'周口'},{'value':189,'label':'安阳'},{'value':190,'label':'平顶山'},{'value':191,'label':'许昌'},{'value':192,'label':'信阳'},{'value':193,'label':'商丘'},{'value':194,'label':'驻马店'},{'value':195,'label':'漯河'},{'value':196,'label':'濮阳'},{'value':197,'label':'鹤壁'},{'value':198,'label':'三门峡'},{'value':199,'label':'济源'},{'value':200,'label':'邓州'}]},{'value':19,'label':'湖北省','children':[{'value':201,'label':'武汉'},{'value':202,'label':'宜昌'},{'value':203,'label':'黄石'},{'value':204,'label':'襄阳'},{'value':205,'label':'十堰'},{'value':206,'label':'荆州'},{'value':207,'label':'荆门'},{'value':208,'label':'孝感'},{'value':209,'label':'鄂州'},{'value':210,'label':'黄冈'},{'value':211,'label':'随州'},{'value':212,'label':'咸宁'},{'value':213,'label':'仙桃'},{'value':214,'label':'潜江'},{'value':215,'label':'天门'},{'value':216,'label':'神农架'},{'value':217,'label':'恩施'}]},{'value':20,'label':'湖南省','children':[{'value':218,'label':'长沙'},{'value':219,'label':'株洲'},{'value':220,'label':'湘潭'},{'value':221,'label':'衡阳'},{'value':222,'label':'岳阳'},{'value':223,'label':'常德'},{'value':224,'label':'益阳'},{'value':225,'label':'郴州'},{'value':226,'label':'邵阳'},{'value':227,'label':'怀化'},{'value':228,'label':'娄底'},{'value':229,'label':'永州'},{'value':230,'label':'张家界'},{'value':231,'label':'湘西'}]},{'value':21,'label':'陕西省','children':[{'value':232,'label':'西安'},{'value':233,'label':'咸阳'},{'value':234,'label':'宝鸡'},{'value':235,'label':'铜川'},{'value':236,'label':'延安'},{'value':237,'label':'渭南'},{'value':238,'label':'榆林'},{'value':239,'label':'汉中'},{'value':240,'label':'安康'},{'value':241,'label':'商洛'},{'value':242,'label':'杨凌'}]},{'value':22,'label':'山西省','children':[{'value':243,'label':'太原'},{'value':244,'label':'运城'},{'value':245,'label':'大同'},{'value':246,'label':'临汾'},{'value':247,'label':'长治'},{'value':248,'label':'晋城'},{'value':249,'label':'阳泉'},{'value':250,'label':'朔州'},{'value':251,'label':'晋中'},{'value':252,'label':'忻州'},{'value':253,'label':'吕梁'}]},{'value':23,'label':'黑龙江省','children':[{'value':254,'label':'哈尔滨'},{'value':255,'label':'伊春'},{'value':256,'label':'绥化'},{'value':257,'label':'大庆'},{'value':258,'label':'齐齐哈尔'},{'value':259,'label':'牡丹江'},{'value':260,'label':'佳木斯'},{'value':261,'label':'鸡西'},{'value':262,'label':'鹤岗'},{'value':263,'label':'双鸭山'},{'value':264,'label':'黑河'},{'value':265,'label':'七台河'},{'value':266,'label':'大兴安岭'}]},{'value':24,'label':'辽宁省','children':[{'value':267,'label':'沈阳'},{'value':268,'label':'大连'},{'value':269,'label':'鞍山'},{'value':270,'label':'营口'},{'value':271,'label':'抚顺'},{'value':272,'label':'锦州'},{'value':273,'label':'丹东'},{'value':274,'label':'葫芦岛'},{'value':275,'label':'本溪'},{'value':276,'label':'辽阳'},{'value':277,'label':'铁岭'},{'value':278,'label':'盘锦'},{'value':279,'label':'朝阳'},{'value':280,'label':'阜新'}]},{'value':25,'label':'吉林省','children':[{'value':281,'label':'长春'},{'value':282,'label':'吉林'},{'value':283,'label':'辽源'},{'value':284,'label':'通化'},{'value':285,'label':'四平'},{'value':286,'label':'松原'},{'value':287,'label':'延吉'},{'value':288,'label':'白山'},{'value':289,'label':'白城'},{'value':290,'label':'延边'}]},{'value':26,'label':'云南省','children':[{'value':291,'label':'昆明'},{'value':292,'label':'曲靖'},{'value':293,'label':'玉溪'},{'value':294,'label':'大理'},{'value':295,'label':'丽江'},{'value':296,'label':'红河州'},{'value':297,'label':'普洱'},{'value':298,'label':'保山'},{'value':299,'label':'昭通'},{'value':300,'label':'文山'},{'value':301,'label':'西双版纳'},{'value':302,'label':'德宏'},{'value':303,'label':'楚雄'},{'value':304,'label':'临沧'},{'value':305,'label':'怒江'},{'value':306,'label':'迪庆'}]},{'value':27,'label':'贵州省','children':[{'value':307,'label':'贵阳'},{'value':308,'label':'遵义'},{'value':309,'label':'六盘水'},{'value':310,'label':'安顺'},{'value':311,'label':'铜仁'},{'value':312,'label':'毕节'},{'value':313,'label':'黔西南'},{'value':314,'label':'黔东南'},{'value':315,'label':'黔南'}]},{'value':28,'label':'甘肃省','children':[{'value':316,'label':'兰州'},{'value':317,'label':'金昌'},{'value':318,'label':'嘉峪关'},{'value':319,'label':'酒泉'},{'value':320,'label':'天水'},{'value':321,'label':'武威'},{'value':322,'label':'白银'},{'value':323,'label':'张掖'},{'value':324,'label':'平凉'},{'value':325,'label':'定西'},{'value':326,'label':'陇南'},{'value':327,'label':'庆阳'},{'value':328,'label':'临夏'},{'value':329,'label':'甘南'}]},{'value':29,'label':'内蒙古','children':[{'value':330,'label':'呼和浩特'},{'value':331,'label':'赤峰'},{'value':332,'label':'包头'},{'value':333,'label':'通辽'},{'value':334,'label':'鄂尔多斯'},{'value':335,'label':'巴彦淖尔'},{'value':336,'label':'乌海'},{'value':337,'label':'呼伦贝尔'},{'value':338,'label':'乌兰察布'},{'value':339,'label':'兴安盟'},{'value':340,'label':'锡林郭勒盟'},{'value':341,'label':'阿拉善盟'}]},{'value':30,'label':'宁夏','children':[{'value':342,'label':'银川'},{'value':343,'label':'吴忠'},{'value':344,'label':'中卫'},{'value':345,'label':'石嘴山'},{'value':346,'label':'固原'}]},{'value':31,'label':'西藏','children':[{'value':347,'label':'拉萨'},{'value':348,'label':'日喀则'},{'value':349,'label':'林芝'},{'value':350,'label':'山南'},{'value':351,'label':'昌都'},{'value':352,'label':'那曲'},{'value':353,'label':'阿里'}]},{'value':32,'label':'新疆','children':[{'value':354,'label':'乌鲁木齐'},{'value':355,'label':'克拉玛依'},{'value':356,'label':'喀什地区'},{'value':357,'label':'伊犁'},{'value':358,'label':'阿克苏'},{'value':359,'label':'哈密'},{'value':360,'label':'石河子'},{'value':361,'label':'阿拉尔'},{'value':362,'label':'五家渠'},{'value':363,'label':'图木舒克'},{'value':364,'label':'昌吉'},{'value':365,'label':'阿勒泰'},{'value':366,'label':'吐鲁番'},{'value':367,'label':'塔城'},{'value':368,'label':'和田'},{'value':369,'label':'克孜勒苏柯尔克孜'},{'value':370,'label':'巴音郭楞'},{'value':371,'label':'博尔塔拉'}]},{'value':33,'label':'青海省','children':[{'value':372,'label':'西宁'},{'value':373,'label':'海东'},{'value':374,'label':'海西'},{'value':375,'label':'海北'},{'value':376,'label':'黄南'},{'value':377,'label':'海南'},{'value':378,'label':'果洛'},{'value':379,'label':'玉树'}]},{'value':34,'label':'香港','children':[{'value':380,'label':'香港'}]},{'value':35,'label':'澳门','children':[{'value':381,'label':'澳门'}]},{'value':36,'label':'台湾','children':[{'value':382,'label':'台湾'}]}],
        cityArray: ['',''],
        companysizeOptions: [{
          value: '',
          label: '公司规模'
        },{
          value: '2',
          label: '少于50人'
        }, {
          value: '3',
          label: '50-150人'
        }, {
          value: '4',
          label: '150-500人'
        }, {
          value: '5',
          label: '500-1000人'
        },{
          value: '6',
          label: '1000-5000人'
        }, {
          value: '7',
          label: '5000-10000人'
        }, {
          value: '8',
          label: '10000人以上'
        }],
        companysizeValue: '',
        companyqualityOptions: [{
          value: '',
          label: '工作性质'
        }, {
          value: '2',
          label: '外资（欧美）'
        }, {
          value: '3',
          label: '外资（非欧美）'
        }, {
          value: '4',
          label: '合资'
        }, {
          value: '5',
          label: '国企'
        }, {
          value: '6',
          label: '民营公司'
        }, {
          value: '7',
          label: '外企代表处'
        }, {
          value: '8',
          label: '政府机关'
        }, {
          value: '9',
          label: '事业单位'
        }, {
          value: '10',
          label: '创业公司'
        }, {
          value: '11',
          label: '上市公司'
        }],
        companyqualityValue: '',
        that: this,
      }
    },
    created() {
      let user = this.$store.state.userInfo;
      console.log(user);
      let com = this.$store.state.userFocusCompanies;
      console.log(com);
      this.getCompany(this.curPage);
    },
    methods:{
      getCompany(e) {
        getCompanies({
          name: this.companyname,
          size: this.companysizeValue,
          quality: this.companyqualityValue,
          city: this.cityArray[1],
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      currentChangeHandler(e){
        this.curPage = e;
        getCompanies({
          name: this.companyname,
          size: this.companysizeValue,
          quality: this.companyqualityValue,
          city: this.cityArray[1],
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      searchHandle(){
        getCompanies({
          name: this.companyname,
          size: this.companysizeValue,
          quality: this.companyqualityValue,
          city: this.cityArray[1],
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      delFocusCompanyHandler(index) {
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
          company: this.companies[index].id
        }).then((response)=> {
          let data = response.data;
          if (data.results.length>0){
            let focuscompanyId = data.results[0]['id'];
            delFocusCompany(
              focuscompanyId
            ).then((response)=>{
              delete this.$store.state.userFocusCompanies[this.companies[index].id];
              localStorage.setItem('focuscompanies',JSON.stringify(this.$store.state.userFocusCompanies));
              this.$store.dispatch('setFocusCompanies');
              this.$message.success("取消关注成功");
            }).catch(function (error) {
              console.log(error);
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      addFocusCompanyHandler(index) {
        addFocusCompany({
          user: this.$store.state.userInfo['id'],
          company: this.companies[index].id
        }).then((response)=> {
          let data = response.data;
          if (this.$store.state.userFocusCompanies==null){
            this.$store.state.userFocusCompanies={};
          }
          this.$store.state.userFocusCompanies[this.companies[index].id] = data['create_time'];
          localStorage.setItem('focuscompanies',JSON.stringify(this.$store.state.userFocusCompanies));
          this.$store.dispatch('setFocusCompanies');
          this.$message.success("关注成功");
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped>
  #content{
    margin-top: 10px;
    margin-left: 10px;
  }

</style>

