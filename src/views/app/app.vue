<template>
  <el-row :gutter="24" style="margin-top: 20px">
    <el-col :span="4">
      <div class="menu-aside-div">
        <el-row ><img class="logo-aside" src="../../static/images/logo.png"></el-row>
        <!--<div class="logo-aside">招聘信息可视化系统</div>-->

        <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
          <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index">
            <i :class="menu.icon"></i>
            {{menu.name}}
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20" style="padding-right: 0">
      <el-row>
        <div class="menu-header">
        <div style="float: left;margin-left: 20px;">
          <el-row ><div class="heder-title">招聘信息可视化系统</div></el-row>
        </div>
          <span class="userImage">
            <i class="el-icon-message-solid" style="color: #3C5175;margin-right: 30px" aria-hidden="true"></i>
            <el-dropdown @command="handleCommand">
              <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
              <i class="el-icon-s-custom" style="color: #3C5175;" aria-hidden="true"><span>{{username}}</span></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">关注与收藏</el-dropdown-item>
                <el-dropdown-item command="b">
                  求职意向
                </el-dropdown-item>
                <el-dropdown-item command="c">我的主页</el-dropdown-item>
                <el-dropdown-item command="d">资料修改</el-dropdown-item>
                <el-dropdown-item command="e">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <el-dialog
            title="求职意向"
            :visible.sync="dialogVisible"
            width="30%">
            <el-row :gutter="24">
              <el-col :span="8">岗位:</el-col>
              <el-col :span="16">
                <el-cascader
                  v-model="jobfunctionArray"
                  :options="jobfunctionOptions"
                  :show-all-levels="false"
                ></el-cascader>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">工作城市:</el-col>
              <el-col :span="16">
                <el-cascader
                  v-model="cityArray"
                  :options="cityOptions"
                  :show-all-levels="false"
                ></el-cascader>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">行业:</el-col>
              <el-col :span="16">
                <el-cascader
                  v-model="industryArray"
                  :options="industryOptions"
                  :show-all-levels="false"
                ></el-cascader>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">工作经验:</el-col>
              <el-col :span="16">
                <el-select v-model="workyearValue" placeholder="请选择">
                  <el-option
                    v-for="item in workyearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">公司规模:</el-col>
              <el-col :span="16">
                <el-select v-model="companysizeValue" placeholder="请选择">
                  <el-option
                    v-for="item in companysizeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">学历:</el-col>
              <el-col :span="16">
                <el-select v-model="eduValue" placeholder="请选择">
                  <el-option
                    v-for="item in eduOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row gutter="24">
              <el-col :span="8">期望薪资范围:</el-col>
              <el-col :span="7"><el-input v-model="salary_low" placeholder="最低"></el-input></el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="7"><el-input v-model="salary_high" placeholder="最高"></el-input></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveHandler">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-row>
      <div style="height: 100%">
        <component :is="activeComponent"></component>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import JobsVisualization from "@/views/JobsVisualization"
  import CompanyVisualization from "@/views/CompanyVisualization"
  import UserHome from "@/views/UserHome"
  import JobsRecommend from "@/views/JobsRecommend"
  import test from "@/views/test"
  import CollectList from "@/views/users/CollectList"
  import InfoChange from "@/views/users/InfoChange"
  import UserProfile from "@/views/users/UserProfile"
  import {getUserWantJob,updateUserWantJob} from '../../api/api'
  import cookie from '../../static/js/cookie'
  export default {
    name: "profile",
    data() {
      return {
        dialogVisible: false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        username:'Simona',
        vermenuList: [
          {
            name: "岗位推荐",
            index: "1",
            icon: "el-icon-s-promotion",
            component: JobsRecommend,
          },
          {
            name: "总体情况",
            index: "2",
            icon: "el-icon-s-data",
            component: UserHome,
          },
          {
            name: "岗位分析",
            index: "3",
            icon: "el-icon-s-marketing",
            component: JobsVisualization,
          },
          {
            name: "企业分析",
            index: "4",
            icon: "el-icon-s-grid",
            component: CompanyVisualization,
          },
          // {
          //   name: "测试",
          //   index: "5",
          //   icon: "el-icon-s-grid",
          //   component: test,
          // },
        ],
        defaultIndex: '3',
        activeComponent : JobsVisualization,
        input1: '',
        salary_low: '',
        salary_high: '',
        eduOptions: [{
          value: '1',
          label: '无'
        }, {
          value: '2',
          label: '初中及以下'
        }, {
          value: '3',
          label: '高中/中技/中专'
        }, {
          value: '4',
          label: '大专'
        }, {
          value: '5',
          label: '本科'
        }, {
          value: '6',
          label: '硕士'
        }, {
          value: '7',
          label: '博士'
        }],
        eduValue: '1',
        workyearOptions: [{
          value: '1',
          label: '无经验'
        },{
          value: '2',
          label: '1-3年'
        },{
          value: '3',
          label: '3-5年'
        },{
          value: '4',
          label: '5-10年'
        },{
          value: '5',
          label: '10年以上'
        }],
        workyearValue: '1',
        companysizeOptions: [{
          value: '1',
          label: '未知'
        },{
          value: '2',
          label: '少于50人'
        },{
          value: '3',
          label: '50-150人'
        },{
          value: '4',
          label: '150-500人'
        },{
          value: '5',
          label: '500-1000人'
        },{
          value: '6',
          label: '1000-5000人'
        },{
          value: '7',
          label: '5000-10000人'
        },{
          value: '8',
          label: '10000以人'
        }],
        companysizeValue: '1',
        cityOptions: [{'value':1,'label':'无','children':[{'value':1,'label':'无'}]},{'value':2,'label':'北京','children':[{'value':2,'label':'北京'}]},{'value':3,'label':'上海','children':[{'value':3,'label':'上海'}]},{'value':4,'label':'广东省','children':[{'value':4,'label':'广州'},{'value':5,'label':'惠州'},{'value':6,'label':'汕头'},{'value':7,'label':'珠海'},{'value':8,'label':'佛山'},{'value':9,'label':'中山'},{'value':10,'label':'东莞'},{'value':11,'label':'韶关'},{'value':12,'label':'江门'},{'value':13,'label':'湛江'},{'value':14,'label':'肇庆'},{'value':15,'label':'清远'},{'value':16,'label':'潮州'},{'value':17,'label':'河源'},{'value':18,'label':'揭阳'},{'value':19,'label':'茂名'},{'value':20,'label':'汕尾'},{'value':21,'label':'梅州'},{'value':22,'label':'开平'},{'value':23,'label':'阳江'},{'value':24,'label':'云浮'}]},{'value':5,'label':'深圳','children':[{'value':25,'label':'深圳'}]},{'value':6,'label':'天津','children':[{'value':26,'label':'天津'}]},{'value':7,'label':'重庆','children':[{'value':27,'label':'重庆'}]},{'value':8,'label':'江苏省','children':[{'value':28,'label':'南京'},{'value':29,'label':'无锡'},{'value':30,'label':'常州'},{'value':31,'label':'昆山'},{'value':32,'label':'常熟'},{'value':33,'label':'扬州'},{'value':34,'label':'南通'},{'value':35,'label':'镇江'},{'value':36,'label':'徐州'},{'value':37,'label':'连云港'},{'value':38,'label':'盐城'},{'value':39,'label':'张家港'},{'value':40,'label':'太仓'},{'value':41,'label':'泰州'},{'value':42,'label':'淮安'},{'value':43,'label':'宿迁'},{'value':44,'label':'丹阳'},{'value':45,'label':'泰兴'},{'value':46,'label':'靖江'}]},{'value':9,'label':'浙江省','children':[{'value':47,'label':'杭州'},{'value':48,'label':'宁波'},{'value':49,'label':'温州'},{'value':50,'label':'绍兴'},{'value':51,'label':'金华'},{'value':52,'label':'嘉兴'},{'value':53,'label':'台州'},{'value':54,'label':'湖州'},{'value':55,'label':'丽水'},{'value':56,'label':'舟山'},{'value':57,'label':'衢州'},{'value':58,'label':'义乌'},{'value':59,'label':'海宁'}]},{'value':10,'label':'四川省','children':[{'value':60,'label':'成都'},{'value':61,'label':'绵阳'},{'value':62,'label':'乐山'},{'value':63,'label':'泸州'},{'value':64,'label':'德阳'},{'value':65,'label':'宜宾'},{'value':66,'label':'自贡'},{'value':67,'label':'内江'},{'value':68,'label':'攀枝花'},{'value':69,'label':'南充'},{'value':70,'label':'眉山'},{'value':71,'label':'广安'},{'value':72,'label':'资阳'},{'value':73,'label':'遂宁'},{'value':74,'label':'广元'},{'value':75,'label':'达州'},{'value':76,'label':'雅安'},{'value':77,'label':'西昌'},{'value':78,'label':'巴中'},{'value':79,'label':'甘孜'},{'value':80,'label':'阿坝'},{'value':81,'label':'凉山'}]},{'value':11,'label':'海南省','children':[{'value':82,'label':'海口'},{'value':83,'label':'三亚'},{'value':84,'label':'洋浦经济开发区'},{'value':85,'label':'文昌'},{'value':86,'label':'琼海'},{'value':87,'label':'万宁'},{'value':88,'label':'儋州'},{'value':89,'label':'东方'},{'value':90,'label':'五指山'},{'value':91,'label':'定安'},{'value':92,'label':'屯昌'},{'value':93,'label':'澄迈'},{'value':94,'label':'临高'},{'value':95,'label':'三沙'},{'value':96,'label':'琼中'},{'value':97,'label':'保亭'},{'value':98,'label':'白沙'},{'value':99,'label':'昌江'},{'value':100,'label':'乐东'},{'value':101,'label':'陵水'}]},{'value':12,'label':'福建省','children':[{'value':102,'label':'福州'},{'value':103,'label':'厦门'},{'value':104,'label':'泉州'},{'value':105,'label':'漳州'},{'value':106,'label':'莆田'},{'value':107,'label':'三明'},{'value':108,'label':'南平'},{'value':109,'label':'宁德'},{'value':110,'label':'龙岩'}]},{'value':13,'label':'山东省','children':[{'value':111,'label':'济南'},{'value':112,'label':'青岛'},{'value':113,'label':'烟台'},{'value':114,'label':'潍坊'},{'value':115,'label':'威海'},{'value':116,'label':'淄博'},{'value':117,'label':'临沂'},{'value':118,'label':'济宁'},{'value':119,'label':'东营'},{'value':120,'label':'泰安'},{'value':121,'label':'日照'},{'value':122,'label':'德州'},{'value':123,'label':'菏泽'},{'value':124,'label':'滨州'},{'value':125,'label':'枣庄'},{'value':126,'label':'聊城'},{'value':127,'label':'莱芜'}]},{'value':14,'label':'江西省','children':[{'value':128,'label':'南昌'},{'value':129,'label':'九江'},{'value':130,'label':'景德镇'},{'value':131,'label':'萍乡'},{'value':132,'label':'新余'},{'value':133,'label':'鹰潭'},{'value':134,'label':'赣州'},{'value':135,'label':'吉安'},{'value':136,'label':'宜春'},{'value':137,'label':'抚州'},{'value':138,'label':'上饶'}]},{'value':15,'label':'广西','children':[{'value':139,'label':'南宁'},{'value':140,'label':'桂林'},{'value':141,'label':'柳州'},{'value':142,'label':'北海'},{'value':143,'label':'玉林'},{'value':144,'label':'梧州'},{'value':145,'label':'防城港'},{'value':146,'label':'钦州'},{'value':147,'label':'贵港'},{'value':148,'label':'百色'},{'value':149,'label':'河池'},{'value':150,'label':'来宾'},{'value':151,'label':'崇左'},{'value':152,'label':'贺州'}]},{'value':16,'label':'安徽省','children':[{'value':153,'label':'合肥'},{'value':154,'label':'芜湖'},{'value':155,'label':'安庆'},{'value':156,'label':'马鞍山'},{'value':157,'label':'蚌埠'},{'value':158,'label':'阜阳'},{'value':159,'label':'铜陵'},{'value':160,'label':'滁州'},{'value':161,'label':'黄山'},{'value':162,'label':'淮南'},{'value':163,'label':'六安'},{'value':164,'label':'宣城'},{'value':165,'label':'池州'},{'value':166,'label':'宿州'},{'value':167,'label':'淮北'},{'value':168,'label':'亳州'}]},{'value':17,'label':'河北省','children':[{'value':169,'label':'雄安新区'},{'value':170,'label':'石家庄'},{'value':171,'label':'廊坊'},{'value':172,'label':'保定'},{'value':173,'label':'唐山'},{'value':174,'label':'秦皇岛'},{'value':175,'label':'邯郸'},{'value':176,'label':'沧州'},{'value':177,'label':'张家口'},{'value':178,'label':'承德'},{'value':179,'label':'邢台'},{'value':180,'label':'衡水'},{'value':181,'label':'燕郊开发区'}]},{'value':18,'label':'河南省','children':[{'value':182,'label':'郑州'},{'value':183,'label':'洛阳'},{'value':184,'label':'开封'},{'value':185,'label':'焦作'},{'value':186,'label':'南阳'},{'value':187,'label':'新乡'},{'value':188,'label':'周口'},{'value':189,'label':'安阳'},{'value':190,'label':'平顶山'},{'value':191,'label':'许昌'},{'value':192,'label':'信阳'},{'value':193,'label':'商丘'},{'value':194,'label':'驻马店'},{'value':195,'label':'漯河'},{'value':196,'label':'濮阳'},{'value':197,'label':'鹤壁'},{'value':198,'label':'三门峡'},{'value':199,'label':'济源'},{'value':200,'label':'邓州'}]},{'value':19,'label':'湖北省','children':[{'value':201,'label':'武汉'},{'value':202,'label':'宜昌'},{'value':203,'label':'黄石'},{'value':204,'label':'襄阳'},{'value':205,'label':'十堰'},{'value':206,'label':'荆州'},{'value':207,'label':'荆门'},{'value':208,'label':'孝感'},{'value':209,'label':'鄂州'},{'value':210,'label':'黄冈'},{'value':211,'label':'随州'},{'value':212,'label':'咸宁'},{'value':213,'label':'仙桃'},{'value':214,'label':'潜江'},{'value':215,'label':'天门'},{'value':216,'label':'神农架'},{'value':217,'label':'恩施'}]},{'value':20,'label':'湖南省','children':[{'value':218,'label':'长沙'},{'value':219,'label':'株洲'},{'value':220,'label':'湘潭'},{'value':221,'label':'衡阳'},{'value':222,'label':'岳阳'},{'value':223,'label':'常德'},{'value':224,'label':'益阳'},{'value':225,'label':'郴州'},{'value':226,'label':'邵阳'},{'value':227,'label':'怀化'},{'value':228,'label':'娄底'},{'value':229,'label':'永州'},{'value':230,'label':'张家界'},{'value':231,'label':'湘西'}]},{'value':21,'label':'陕西省','children':[{'value':232,'label':'西安'},{'value':233,'label':'咸阳'},{'value':234,'label':'宝鸡'},{'value':235,'label':'铜川'},{'value':236,'label':'延安'},{'value':237,'label':'渭南'},{'value':238,'label':'榆林'},{'value':239,'label':'汉中'},{'value':240,'label':'安康'},{'value':241,'label':'商洛'},{'value':242,'label':'杨凌'}]},{'value':22,'label':'山西省','children':[{'value':243,'label':'太原'},{'value':244,'label':'运城'},{'value':245,'label':'大同'},{'value':246,'label':'临汾'},{'value':247,'label':'长治'},{'value':248,'label':'晋城'},{'value':249,'label':'阳泉'},{'value':250,'label':'朔州'},{'value':251,'label':'晋中'},{'value':252,'label':'忻州'},{'value':253,'label':'吕梁'}]},{'value':23,'label':'黑龙江省','children':[{'value':254,'label':'哈尔滨'},{'value':255,'label':'伊春'},{'value':256,'label':'绥化'},{'value':257,'label':'大庆'},{'value':258,'label':'齐齐哈尔'},{'value':259,'label':'牡丹江'},{'value':260,'label':'佳木斯'},{'value':261,'label':'鸡西'},{'value':262,'label':'鹤岗'},{'value':263,'label':'双鸭山'},{'value':264,'label':'黑河'},{'value':265,'label':'七台河'},{'value':266,'label':'大兴安岭'}]},{'value':24,'label':'辽宁省','children':[{'value':267,'label':'沈阳'},{'value':268,'label':'大连'},{'value':269,'label':'鞍山'},{'value':270,'label':'营口'},{'value':271,'label':'抚顺'},{'value':272,'label':'锦州'},{'value':273,'label':'丹东'},{'value':274,'label':'葫芦岛'},{'value':275,'label':'本溪'},{'value':276,'label':'辽阳'},{'value':277,'label':'铁岭'},{'value':278,'label':'盘锦'},{'value':279,'label':'朝阳'},{'value':280,'label':'阜新'}]},{'value':25,'label':'吉林省','children':[{'value':281,'label':'长春'},{'value':282,'label':'吉林'},{'value':283,'label':'辽源'},{'value':284,'label':'通化'},{'value':285,'label':'四平'},{'value':286,'label':'松原'},{'value':287,'label':'延吉'},{'value':288,'label':'白山'},{'value':289,'label':'白城'},{'value':290,'label':'延边'}]},{'value':26,'label':'云南省','children':[{'value':291,'label':'昆明'},{'value':292,'label':'曲靖'},{'value':293,'label':'玉溪'},{'value':294,'label':'大理'},{'value':295,'label':'丽江'},{'value':296,'label':'红河州'},{'value':297,'label':'普洱'},{'value':298,'label':'保山'},{'value':299,'label':'昭通'},{'value':300,'label':'文山'},{'value':301,'label':'西双版纳'},{'value':302,'label':'德宏'},{'value':303,'label':'楚雄'},{'value':304,'label':'临沧'},{'value':305,'label':'怒江'},{'value':306,'label':'迪庆'}]},{'value':27,'label':'贵州省','children':[{'value':307,'label':'贵阳'},{'value':308,'label':'遵义'},{'value':309,'label':'六盘水'},{'value':310,'label':'安顺'},{'value':311,'label':'铜仁'},{'value':312,'label':'毕节'},{'value':313,'label':'黔西南'},{'value':314,'label':'黔东南'},{'value':315,'label':'黔南'}]},{'value':28,'label':'甘肃省','children':[{'value':316,'label':'兰州'},{'value':317,'label':'金昌'},{'value':318,'label':'嘉峪关'},{'value':319,'label':'酒泉'},{'value':320,'label':'天水'},{'value':321,'label':'武威'},{'value':322,'label':'白银'},{'value':323,'label':'张掖'},{'value':324,'label':'平凉'},{'value':325,'label':'定西'},{'value':326,'label':'陇南'},{'value':327,'label':'庆阳'},{'value':328,'label':'临夏'},{'value':329,'label':'甘南'}]},{'value':29,'label':'内蒙古','children':[{'value':330,'label':'呼和浩特'},{'value':331,'label':'赤峰'},{'value':332,'label':'包头'},{'value':333,'label':'通辽'},{'value':334,'label':'鄂尔多斯'},{'value':335,'label':'巴彦淖尔'},{'value':336,'label':'乌海'},{'value':337,'label':'呼伦贝尔'},{'value':338,'label':'乌兰察布'},{'value':339,'label':'兴安盟'},{'value':340,'label':'锡林郭勒盟'},{'value':341,'label':'阿拉善盟'}]},{'value':30,'label':'宁夏','children':[{'value':342,'label':'银川'},{'value':343,'label':'吴忠'},{'value':344,'label':'中卫'},{'value':345,'label':'石嘴山'},{'value':346,'label':'固原'}]},{'value':31,'label':'西藏','children':[{'value':347,'label':'拉萨'},{'value':348,'label':'日喀则'},{'value':349,'label':'林芝'},{'value':350,'label':'山南'},{'value':351,'label':'昌都'},{'value':352,'label':'那曲'},{'value':353,'label':'阿里'}]},{'value':32,'label':'新疆','children':[{'value':354,'label':'乌鲁木齐'},{'value':355,'label':'克拉玛依'},{'value':356,'label':'喀什地区'},{'value':357,'label':'伊犁'},{'value':358,'label':'阿克苏'},{'value':359,'label':'哈密'},{'value':360,'label':'石河子'},{'value':361,'label':'阿拉尔'},{'value':362,'label':'五家渠'},{'value':363,'label':'图木舒克'},{'value':364,'label':'昌吉'},{'value':365,'label':'阿勒泰'},{'value':366,'label':'吐鲁番'},{'value':367,'label':'塔城'},{'value':368,'label':'和田'},{'value':369,'label':'克孜勒苏柯尔克孜'},{'value':370,'label':'巴音郭楞'},{'value':371,'label':'博尔塔拉'}]},{'value':33,'label':'青海省','children':[{'value':372,'label':'西宁'},{'value':373,'label':'海东'},{'value':374,'label':'海西'},{'value':375,'label':'海北'},{'value':376,'label':'黄南'},{'value':377,'label':'海南'},{'value':378,'label':'果洛'},{'value':379,'label':'玉树'}]},{'value':34,'label':'香港','children':[{'value':380,'label':'香港'}]},{'value':35,'label':'澳门','children':[{'value':381,'label':'澳门'}]},{'value':36,'label':'台湾','children':[{'value':382,'label':'台湾'}]}],
        cityArray: [1,1],
        jobfunctionOptions: [{'value':1,'label':'无','children':[{'value':2,'label':'无'}]},{'value':3,'label':'计算机硬件','children':[{'value':68,'label':'高级硬件工程师'},{'value':69,'label':'硬件工程师'},{'value':70,'label':'其他'}]},{'value':4,'label':'计算机软件','children':[{'value':71,'label':'高级软件工程师'},{'value':72,'label':'软件工程师'},{'value':73,'label':'软件UI设计师/工程师'},{'value':74,'label':'算法工程师'},{'value':75,'label':'仿真应用工程师'},{'value':76,'label':'ERP实施顾问'},{'value':77,'label':'ERP技术开发'},{'value':78,'label':'需求工程师'},{'value':79,'label':'系统集成工程师'},{'value':80,'label':'系统分析员'},{'value':81,'label':'系统工程师'},{'value':82,'label':'系统架构设计师'},{'value':83,'label':'数据库工程师/管理员'},{'value':84,'label':'计算机辅助设计工程师'},{'value':85,'label':'其他'}]},{'value':5,'label':'互联网/电子商务/网游','children':[{'value':86,'label':'互联网软件开发工程师'},{'value':87,'label':'语音/视频/图形开发工程师'},{'value':88,'label':'多媒体/游戏开发工程师'},{'value':89,'label':'手机应用开发工程师'},{'value':90,'label':'网站运营总监'},{'value':91,'label':'网站运营经理/主管'},{'value':92,'label':'网站运营专员'},{'value':93,'label':'产品总监'},{'value':94,'label':'产品经理/主管'},{'value':95,'label':'产品专员'},{'value':96,'label':'SEO/SEM'},{'value':97,'label':'网络推广总监'},{'value':98,'label':'网络推广经理/主管'},{'value':99,'label':'网络推广专员'},{'value':100,'label':'新媒体运营'},{'value':101,'label':'电子商务总监'},{'value':102,'label':'电子商务经理/主管'},{'value':103,'label':'电子商务专员'},{'value':104,'label':'网络工程师'},{'value':105,'label':'UI设计师/顾问'},{'value':106,'label':'用户体验（UE/UX）设计师'},{'value':107,'label':'大数据开发/分析'},{'value':108,'label':'Web前端开发'},{'value':109,'label':'网站架构设计师'},{'value':110,'label':'网站维护工程师'},{'value':111,'label':'系统管理员/网络管理员'},{'value':112,'label':'网站策划'},{'value':113,'label':'网站编辑'},{'value':114,'label':'网页设计/制作/美工'},{'value':115,'label':'脚本开发工程师'},{'value':116,'label':'游戏策划师'},{'value':117,'label':'游戏界面设计师'},{'value':118,'label':'Flash设计/开发'},{'value':119,'label':'特效设计师'},{'value':120,'label':'视觉设计师'},{'value':121,'label':'音效设计师'},{'value':122,'label':'网络信息安全工程师'},{'value':123,'label':'其他'}]},{'value':6,'label':'IT-管理','children':[{'value':124,'label':'首席技术执行官CTO/首席信息官CIO'},{'value':125,'label':'技术总监/经理'},{'value':126,'label':'信息技术经理/主管'},{'value':127,'label':'信息技术专员'},{'value':128,'label':'项目总监'},{'value':129,'label':'项目经理'},{'value':130,'label':'项目主管'},{'value':131,'label':'项目执行/协调人员'},{'value':132,'label':'其他'}]},{'value':7,'label':'IT-品管、技术支持及其它','children':[{'value':133,'label':'技术支持/维护经理'},{'value':134,'label':'技术支持/维护工程师'},{'value':135,'label':'网络管理(Helpdesk)'},{'value':136,'label':'网络维修'},{'value':137,'label':'计量工程师'},{'value':138,'label':'标准化工程师'},{'value':139,'label':'品质经理'},{'value':140,'label':'系统测试'},{'value':141,'label':'软件测试'},{'value':142,'label':'硬件测试'},{'value':143,'label':'测试员'},{'value':144,'label':'文档工程师'},{'value':145,'label':'配置管理工程师'},{'value':146,'label':'技术文员/助理'},{'value':147,'label':'手机维修'},{'value':148,'label':'电脑维修'},{'value':149,'label':'其他'}]},{'value':8,'label':'通信技术开发及应用','children':[{'value':150,'label':'通信技术工程师'},{'value':151,'label':'有线传输工程师'},{'value':152,'label':'无线通信工程师'},{'value':153,'label':'电信交换工程师'},{'value':154,'label':'数据通信工程师'},{'value':155,'label':'移动通信工程师'},{'value':156,'label':'电信网络工程师'},{'value':157,'label':'通信电源工程师'},{'value':158,'label':'增值产品开发工程师'},{'value':159,'label':'手机软件开发工程师'},{'value':160,'label':'其他'}]},{'value':9,'label':'电子/电器/半导体/仪器仪表','children':[{'value':161,'label':'集成电路IC设计/应用工程师'},{'value':162,'label':'IC验证工程师'},{'value':163,'label':'电子工程师/技术员'},{'value':164,'label':'电子技术研发工程师'},{'value':165,'label':'射频工程师'},{'value':166,'label':'电子/电器维修工程师/技师'},{'value':167,'label':'变压器与磁电工程师'},{'value':168,'label':'版图设计工程师'},{'value':169,'label':'电气工程师/技术员'},{'value':170,'label':'电路工程师/技术员(模拟/数字)'},{'value':171,'label':'电声/音响工程师/技术员'},{'value':172,'label':'激光/光电子技术'},{'value':173,'label':'半导体技术'},{'value':174,'label':'自动控制工程师/技术员'},{'value':175,'label':'电子软件开发(ARM/MCU...)'},{'value':176,'label':'嵌入式软件开发(Linux/单片机/PLC/DSP…)'},{'value':177,'label':'嵌入式硬件开发(主板机…)'},{'value':178,'label':'电池/电源开发'},{'value':179,'label':'FAE 现场应用工程师'},{'value':180,'label':'工艺工程师'},{'value':181,'label':'家用电器/数码产品研发'},{'value':182,'label':'仪器/仪表/计量分析师'},{'value':183,'label':'测试工程师'},{'value':184,'label':'安防系统工程师'},{'value':185,'label':'其他'}]},{'value':10,'label':'销售管理','children':[{'value':186,'label':'销售总监'},{'value':187,'label':'销售经理'},{'value':188,'label':'销售主管'},{'value':189,'label':'业务拓展主管/经理'},{'value':190,'label':'渠道/分销总监'},{'value':191,'label':'渠道/分销经理'},{'value':192,'label':'渠道/分销主管'},{'value':193,'label':'大客户管理'},{'value':194,'label':'客户经理/主管'},{'value':195,'label':'区域销售总监'},{'value':196,'label':'区域销售经理'},{'value':197,'label':'团购经理/主管'},{'value':198,'label':'其他'}]},{'value':11,'label':'销售人员','children':[{'value':199,'label':'大客户销售'},{'value':200,'label':'销售代表'},{'value':201,'label':'渠道/分销专员'},{'value':202,'label':'客户代表'},{'value':203,'label':'销售工程师'},{'value':204,'label':'电话销售'},{'value':205,'label':'网络/在线销售'},{'value':206,'label':'团购业务员'},{'value':207,'label':'经销商'},{'value':208,'label':'会籍顾问'},{'value':209,'label':'销售助理'},{'value':210,'label':'其他'}]},{'value':12,'label':'销售行政及商务','children':[{'value':211,'label':'销售行政经理/主管'},{'value':212,'label':'销售行政专员'},{'value':213,'label':'业务分析经理/主管'},{'value':214,'label':'业务分析专员/助理'},{'value':215,'label':'商务经理'},{'value':216,'label':'商务主管/专员'},{'value':217,'label':'商务助理'},{'value':218,'label':'销售行政助理'},{'value':219,'label':'其他'}]},{'value':13,'label':'客服及支持','children':[{'value':220,'label':'客服总监'},{'value':221,'label':'客服经理'},{'value':222,'label':'客服主管'},{'value':223,'label':'客服专员/助理'},{'value':224,'label':'客户关系经理/主管'},{'value':225,'label':'售前/售后技术支持经理'},{'value':226,'label':'售前/售后技术支持主管'},{'value':227,'label':'售前/售后技术支持工程师'},{'value':228,'label':'咨询热线/呼叫中心服务人员'},{'value':229,'label':'网络/在线客服'},{'value':230,'label':'投诉专员'},{'value':231,'label':'VIP专员'},{'value':232,'label':'其他'}]},{'value':14,'label':'财务/审计/税务','children':[{'value':233,'label':'首席财务官 CFO'},{'value':234,'label':'财务总监'},{'value':235,'label':'财务经理'},{'value':236,'label':'财务顾问'},{'value':237,'label':'财务主管/总账主管'},{'value':238,'label':'会计经理/会计主管'},{'value':239,'label':'会计'},{'value':240,'label':'出纳员'},{'value':241,'label':'财务助理/文员'},{'value':242,'label':'固定资产会计'},{'value':243,'label':'财务分析经理/主管'},{'value':244,'label':'财务分析员'},{'value':245,'label':'成本经理/成本主管'},{'value':246,'label':'成本管理员'},{'value':247,'label':'资金经理/主管'},{'value':248,'label':'资金专员'},{'value':249,'label':'审计经理/主管'},{'value':250,'label':'审计专员/助理'},{'value':251,'label':'税务经理/税务主管'},{'value':252,'label':'税务专员/助理'},{'value':253,'label':'统计员'},{'value':254,'label':'其他'}]},{'value':15,'label':'金融/证券/期货/投资','children':[{'value':255,'label':'证券/期货/外汇经纪人'},{'value':256,'label':'证券分析师'},{'value':257,'label':'股票/期货操盘手'},{'value':258,'label':'金融/经济研究员'},{'value':259,'label':'金融产品经理'},{'value':260,'label':'金融产品销售'},{'value':261,'label':'投资/基金项目经理'},{'value':262,'label':'投资/理财顾问'},{'value':263,'label':'投资银行业务'},{'value':264,'label':'投资银行财务分析'},{'value':265,'label':'融资经理/融资主管'},{'value':266,'label':'融资专员'},{'value':267,'label':'风险管理/控制'},{'value':268,'label':'拍卖/担保/典当业务'},{'value':269,'label':'其他'}]},{'value':16,'label':'银行','children':[{'value':270,'label':'行长/副行长'},{'value':271,'label':'银行客户总监'},{'value':272,'label':'个人业务部门经理/主管'},{'value':273,'label':'个人业务客户经理'},{'value':274,'label':'公司业务部门经理/主管'},{'value':275,'label':'公司业务客户经理'},{'value':276,'label':'综合业务经理/主管'},{'value':277,'label':'综合业务专员'},{'value':278,'label':'资产评估/分析'},{'value':279,'label':'风险控制'},{'value':280,'label':'信贷管理'},{'value':281,'label':'信审核查'},{'value':282,'label':'进出口/信用证结算'},{'value':283,'label':'外汇交易'},{'value':284,'label':'清算人员'},{'value':285,'label':'高级客户经理/客户经理'},{'value':286,'label':'客户主管/专员'},{'value':287,'label':'营业部大堂经理'},{'value':288,'label':'信用卡销售'},{'value':289,'label':'呼叫中心客服'},{'value':290,'label':'银行柜员'},{'value':291,'label':'其他'}]},{'value':17,'label':'保险','children':[{'value':292,'label':'保险精算师'},{'value':293,'label':'保险产品开发/项目策划'},{'value':294,'label':'保险业务经理/主管'},{'value':295,'label':'保险经纪人/保险代理'},{'value':296,'label':'理财顾问/财务规划师'},{'value':297,'label':'储备经理人'},{'value':298,'label':'保险电销'},{'value':299,'label':'保险核保'},{'value':300,'label':'保险理赔'},{'value':301,'label':'保险客户服务/续期管理'},{'value':302,'label':'保险培训师'},{'value':303,'label':'保险内勤'},{'value':304,'label':'契约管理'},{'value':305,'label':'其他'}]},{'value':18,'label':'生产/营运','children':[{'value':306,'label':'工厂经理/厂长'},{'value':307,'label':'总工程师/副总工程师'},{'value':308,'label':'项目总监'},{'value':309,'label':'项目经理/主管'},{'value':310,'label':'项目工程师'},{'value':311,'label':'营运经理'},{'value':312,'label':'营运主管'},{'value':313,'label':'生产总监'},{'value':314,'label':'生产经理/车间主任'},{'value':315,'label':'生产主管'},{'value':316,'label':'生产领班/组长'},{'value':317,'label':'生产计划/物料管理(PMC)'},{'value':318,'label':'生产文员'},{'value':319,'label':'设备主管'},{'value':320,'label':'化验员'},{'value':321,'label':'其他'}]},{'value':19,'label':'质量安全','children':[{'value':322,'label':'质量管理/测试经理(QA/QC经理)'},{'value':323,'label':'质量管理/测试主管(QA/QC主管)'},{'value':324,'label':'质量管理/测试工程师(QA/QC工程师)'},{'value':325,'label':'质量检验员/测试员'},{'value':326,'label':'可靠度工程师'},{'value':327,'label':'故障分析工程师'},{'value':328,'label':'认证工程师'},{'value':329,'label':'体系工程师'},{'value':330,'label':'审核员'},{'value':331,'label':'环境/健康/安全经理/主管（EHS）'},{'value':332,'label':'环境/健康/安全工程师（EHS）'},{'value':333,'label':'安全员'},{'value':334,'label':'供应商管理'},{'value':335,'label':'采购材料、设备质量管理'},{'value':336,'label':'其他'}]},{'value':20,'label':'工程/机械/能源','children':[{'value':337,'label':'技术研发经理/主管'},{'value':338,'label':'技术研发工程师'},{'value':339,'label':'产品工艺/制程工程师'},{'value':340,'label':'产品规划工程师'},{'value':341,'label':'项目管理'},{'value':342,'label':'实验室负责人/工程师'},{'value':343,'label':'工程/设备经理'},{'value':344,'label':'工程/设备主管'},{'value':345,'label':'工程/设备工程师'},{'value':346,'label':'工程/机械绘图员'},{'value':347,'label':'工业工程师'},{'value':348,'label':'材料工程师'},{'value':349,'label':'机械工程师'},{'value':350,'label':'结构工程师'},{'value':351,'label':'模具工程师'},{'value':352,'label':'机电工程师'},{'value':353,'label':'维修经理/主管'},{'value':354,'label':'维修工程师'},{'value':355,'label':'装配工程师/技师'},{'value':356,'label':'铸造/锻造工程师/技师'},{'value':357,'label':'注塑工程师/技师'},{'value':358,'label':'焊接工程师/技师'},{'value':359,'label':'夹具工程师/技师'},{'value':360,'label':'CNC工程师'},{'value':361,'label':'冲压工程师/技师'},{'value':362,'label':'锅炉工程师/技师'},{'value':363,'label':'电力工程师/技术员'},{'value':364,'label':'光源与照明工程'},{'value':365,'label':'光伏系统工程师'},{'value':366,'label':'汽车/摩托车工程师'},{'value':367,'label':'船舶工程师'},{'value':368,'label':'轨道交通工程师/技术员'},{'value':369,'label':'飞机维修机械师'},{'value':370,'label':'飞行器设计与制造'},{'value':371,'label':'水利/水电工程师'},{'value':372,'label':'空调/热能工程师'},{'value':373,'label':'石油天然气技术人员'},{'value':374,'label':'矿产勘探/地质勘测工程师'},{'value':375,'label':'其他'}]},{'value':21,'label':'汽车制造','children':[{'value':376,'label':'研发总监/部长/专家'},{'value':377,'label':'汽车机构工程师'},{'value':378,'label':'汽车设计工程师'},{'value':379,'label':'汽车电子工程师'},{'value':380,'label':'发动机/总装工程师'},{'value':381,'label':'动力总成工程师'},{'value':382,'label':'底盘工程师'},{'value':383,'label':'汽车项目管理'},{'value':384,'label':'汽车质量管理'},{'value':385,'label':'汽车安全性能工程师'},{'value':386,'label':'汽车装配工艺工程师'},{'value':387,'label':'电气/电器工程师'},{'value':388,'label':'附件系统工程师'},{'value':389,'label':'内外饰工程师'},{'value':390,'label':'车身/造型设计'},{'value':391,'label':'车辆质量工程师'},{'value':392,'label':'新能源电池工程师'},{'value':393,'label':'新能源电控工程师'},{'value':394,'label':'新能源电机工程师'},{'value':395,'label':'其他'}]},{'value':22,'label':'汽车销售与服务','children':[{'value':396,'label':'4S店经理/维修站经理'},{'value':397,'label':'汽车销售/经纪人'},{'value':398,'label':'汽车修理工'},{'value':399,'label':'汽车电工'},{'value':400,'label':'汽车钣金'},{'value':401,'label':'汽车喷漆'},{'value':402,'label':'汽车检验/检测'},{'value':403,'label':'汽车装饰美容'},{'value':404,'label':'洗车工'},{'value':405,'label':'售后服务/客户服务'},{'value':406,'label':'二手车评估师'},{'value':407,'label':'加油站工作员'},{'value':408,'label':'其他'}]},{'value':23,'label':'技工普工','children':[{'value':409,'label':'普工/操作工'},{'value':410,'label':'技工'},{'value':411,'label':'叉车/铲车工'},{'value':412,'label':'组装工'},{'value':413,'label':'包装工'},{'value':414,'label':'焊工'},{'value':415,'label':'氩弧焊工'},{'value':416,'label':'电工'},{'value':417,'label':'电力线路工'},{'value':418,'label':'旋压工'},{'value':419,'label':'仪表工'},{'value':420,'label':'电镀工'},{'value':421,'label':'喷塑工'},{'value':422,'label':'水工'},{'value':423,'label':'木工'},{'value':424,'label':'漆工'},{'value':425,'label':'空调工'},{'value':426,'label':'电梯工'},{'value':427,'label':'锅炉工'},{'value':428,'label':'学徒工'},{'value':429,'label':'其他'}]},{'value':24,'label':'服装/纺织/皮革','children':[{'value':430,'label':'服装/纺织设计总监'},{'value':431,'label':'服装/纺织设计'},{'value':432,'label':'服装/纺织/皮革工艺师'},{'value':433,'label':'面料辅料开发'},{'value':434,'label':'面料辅料采购'},{'value':435,'label':'服装/纺织/皮革跟单'},{'value':436,'label':'服装领班'},{'value':437,'label':'质量管理/验货员(QA/QC)'},{'value':438,'label':'板房/楦头/底格出格师'},{'value':439,'label':'电脑放码员'},{'value':440,'label':'纸样师/车板工'},{'value':441,'label':'裁床'},{'value':442,'label':'打样/制版'},{'value':443,'label':'裁剪工'},{'value':444,'label':'缝纫工'},{'value':445,'label':'手缝工'},{'value':446,'label':'烫工'},{'value':447,'label':'样衣工'},{'value':448,'label':'纺织工'},{'value':449,'label':'针织工'},{'value':450,'label':'配色工'},{'value':451,'label':'印染工'},{'value':452,'label':'漂染工'},{'value':453,'label':'挡车工'},{'value':454,'label':'整经工'},{'value':455,'label':'细纱工'},{'value':456,'label':'浆纱工'},{'value':457,'label':'其他'}]},{'value':25,'label':'采购','children':[{'value':458,'label':'采购总监'},{'value':459,'label':'采购经理'},{'value':460,'label':'采购主管'},{'value':461,'label':'采购员'},{'value':462,'label':'采购助理'},{'value':463,'label':'买手'},{'value':464,'label':'供应商开发'},{'value':465,'label':'其他'}]},{'value':26,'label':'贸易','children':[{'value':466,'label':'贸易/外贸经理/主管'},{'value':467,'label':'贸易/外贸专员/助理'},{'value':468,'label':'国内贸易人员'},{'value':469,'label':'业务跟单经理'},{'value':470,'label':'高级业务跟单'},{'value':471,'label':'业务跟单'},{'value':472,'label':'助理业务跟单'},{'value':473,'label':'其他'}]},{'value':27,'label':'物流/仓储','children':[{'value':474,'label':'物流总监'},{'value':475,'label':'物流经理'},{'value':476,'label':'物流主管'},{'value':477,'label':'物流专员/助理'},{'value':478,'label':'供应链总监'},{'value':479,'label':'供应链经理'},{'value':480,'label':'供应链主管/专员'},{'value':481,'label':'物料经理'},{'value':482,'label':'物料主管/专员'},{'value':483,'label':'仓库经理/主管'},{'value':484,'label':'仓库管理员'},{'value':485,'label':'订单处理员'},{'value':486,'label':'运输经理/主管'},{'value':487,'label':'项目经理/主管'},{'value':488,'label':'货运代理'},{'value':489,'label':'集装箱业务'},{'value':490,'label':'海关事务管理'},{'value':491,'label':'报关与报检'},{'value':492,'label':'单证员'},{'value':493,'label':'船务/空运陆运操作'},{'value':494,'label':'快递员'},{'value':495,'label':'调度员'},{'value':496,'label':'安检员'},{'value':497,'label':'理货员'},{'value':498,'label':'搬运工'},{'value':499,'label':'其他'}]},{'value':28,'label':'生物/制药/医疗器械','children':[{'value':500,'label':'生物工程/生物制药'},{'value':501,'label':'化学分析测试员'},{'value':502,'label':'医药技术研发管理人员'},{'value':503,'label':'医药技术研发人员'},{'value':504,'label':'医药学术推广'},{'value':505,'label':'临床研究员'},{'value':506,'label':'临床协调员'},{'value':507,'label':'临床数据分析员'},{'value':508,'label':'药品注册'},{'value':509,'label':'药品生产/质量管理'},{'value':510,'label':'药品市场推广经理'},{'value':511,'label':'药品市场推广主管/专员'},{'value':512,'label':'医药招商'},{'value':513,'label':'政府事务管理'},{'value':514,'label':'招投标管理'},{'value':515,'label':'医药销售经理/主管'},{'value':516,'label':'医药代表'},{'value':517,'label':'医药销售人员'},{'value':518,'label':'医疗器械注册'},{'value':519,'label':'医疗器械研发'},{'value':520,'label':'医疗器械生产/质量管理'},{'value':521,'label':'医疗器械市场推广'},{'value':522,'label':'医疗器械销售经理/主管'},{'value':523,'label':'医疗器械销售代表'},{'value':524,'label':'医疗器械维修人员'},{'value':525,'label':'其他'}]},{'value':29,'label':'化工','children':[{'value':526,'label':'化工技术应用/化工工程师'},{'value':527,'label':'化工实验室研究员/技术员'},{'value':528,'label':'涂料研发工程师'},{'value':529,'label':'配色技术员'},{'value':530,'label':'塑料工程师'},{'value':531,'label':'化妆品研发'},{'value':532,'label':'食品/饮料研发'},{'value':533,'label':'造纸研发'},{'value':534,'label':'其他'}]},{'value':30,'label':'医院/医疗/护理','children':[{'value':535,'label':'医院管理人员'},{'value':536,'label':'综合门诊/全科医生'},{'value':537,'label':'内科医生'},{'value':538,'label':'外科医生'},{'value':539,'label':'专科医生'},{'value':540,'label':'牙科医生'},{'value':541,'label':'美容整形师'},{'value':542,'label':'麻醉医生'},{'value':543,'label':'放射科医师'},{'value':544,'label':'理疗师'},{'value':545,'label':'中医科医生'},{'value':546,'label':'针灸/推拿'},{'value':547,'label':'儿科医生'},{'value':548,'label':'心理医生'},{'value':549,'label':'营养师'},{'value':550,'label':'药库主任/药剂师'},{'value':551,'label':'医药学检验'},{'value':552,'label':'公共卫生/疾病控制'},{'value':553,'label':'护理主任/护士长'},{'value':554,'label':'护士/护理人员'},{'value':555,'label':'兽医'},{'value':556,'label':'验光师'},{'value':557,'label':'其他'}]},{'value':31,'label':'广告','children':[{'value':558,'label':'广告客户总监/副总监'},{'value':559,'label':'广告客户经理'},{'value':560,'label':'广告客户主管/专员'},{'value':561,'label':'广告创意/设计经理'},{'value':562,'label':'广告创意总监'},{'value':563,'label':'广告创意/设计主管/专员'},{'value':564,'label':'广告制作执行'},{'value':565,'label':'美术指导'},{'value':566,'label':'文案/策划'},{'value':567,'label':'企业/业务发展经理'},{'value':568,'label':'企业策划人员'},{'value':569,'label':'其他'}]},{'value':32,'label':'公关/媒介','children':[{'value':570,'label':'公关总监'},{'value':571,'label':'公关经理'},{'value':572,'label':'公关主管'},{'value':573,'label':'公关专员'},{'value':574,'label':'会务/会展经理'},{'value':575,'label':'会务/会展主管'},{'value':576,'label':'会务/会展专员'},{'value':577,'label':'媒介经理'},{'value':578,'label':'媒介主管'},{'value':579,'label':'媒介专员'},{'value':580,'label':'公关/媒介助理'},{'value':581,'label':'媒介销售'},{'value':582,'label':'活动策划'},{'value':583,'label':'活动执行'},{'value':584,'label':'其他'}]},{'value':33,'label':'市场/营销','children':[{'value':585,'label':'市场/营销/拓展总监'},{'value':586,'label':'市场/营销/拓展经理'},{'value':587,'label':'市场/营销/拓展主管'},{'value':588,'label':'市场/营销/拓展专员'},{'value':589,'label':'市场助理'},{'value':590,'label':'市场分析/调研人员'},{'value':591,'label':'产品/品牌经理'},{'value':592,'label':'产品/品牌主管'},{'value':593,'label':'产品/品牌专员'},{'value':594,'label':'市场通路经理/主管'},{'value':595,'label':'市场通路专员'},{'value':596,'label':'市场企划经理/主管'},{'value':597,'label':'市场企划专员'},{'value':598,'label':'促销经理'},{'value':599,'label':'促销主管/督导'},{'value':600,'label':'促销员/导购'},{'value':601,'label':'选址拓展/新店开发'},{'value':602,'label':'其他'}]},{'value':34,'label':'影视/媒体','children':[{'value':603,'label':'影视策划/制作人员'},{'value':604,'label':'导演/编导'},{'value':605,'label':'艺术/设计总监'},{'value':606,'label':'艺术指导/舞台美术设计'},{'value':607,'label':'经纪人/星探'},{'value':608,'label':'主播/主持人'},{'value':609,'label':'摄影师/摄像师'},{'value':610,'label':'后期制作'},{'value':611,'label':'音效师'},{'value':612,'label':'配音员'},{'value':613,'label':'灯光师'},{'value':614,'label':'放映经理/主管'},{'value':615,'label':'放映员'},{'value':616,'label':'其他'}]},{'value':35,'label':'编辑出版','children':[{'value':617,'label':'总编/副总编'},{'value':618,'label':'编辑'},{'value':619,'label':'作家/撰稿人'},{'value':620,'label':'记者'},{'value':621,'label':'电话采编'},{'value':622,'label':'美术编辑'},{'value':623,'label':'排版设计'},{'value':624,'label':'出版/发行'},{'value':625,'label':'其他'}]},{'value':36,'label':'艺术/设计','children':[{'value':626,'label':'平面设计总监'},{'value':627,'label':'平面设计经理/主管'},{'value':628,'label':'平面设计师'},{'value':629,'label':'绘画'},{'value':630,'label':'动画/3D设计'},{'value':631,'label':'原画师'},{'value':632,'label':'展览/展示/店面设计'},{'value':633,'label':'多媒体设计'},{'value':634,'label':'包装设计'},{'value':635,'label':'工业/产品设计'},{'value':636,'label':'工艺品/珠宝设计鉴定'},{'value':637,'label':'家具/家居用品设计'},{'value':638,'label':'玩具设计'},{'value':639,'label':'其他'}]},{'value':37,'label':'建筑工程与装潢','children':[{'value':640,'label':'高级建筑工程师/总工'},{'value':641,'label':'建筑工程师'},{'value':642,'label':'建筑设计师'},{'value':643,'label':'市政工程师'},{'value':644,'label':'结构/土木/土建工程师'},{'value':645,'label':'公路/桥梁/港口/隧道工程'},{'value':646,'label':'岩土工程'},{'value':647,'label':'楼宇自动化'},{'value':648,'label':'建筑机电工程师'},{'value':649,'label':'智能大厦/综合布线/安防/弱电'},{'value':650,'label':'给排水/暖通工程'},{'value':651,'label':'幕墙工程师'},{'value':652,'label':'规划与设计'},{'value':653,'label':'室内设计'},{'value':654,'label':'园艺/园林/景观设计'},{'value':655,'label':'测绘/测量'},{'value':656,'label':'建筑制图/模型/渲染'},{'value':657,'label':'开发报建'},{'value':658,'label':'工程造价师/预结算经理'},{'value':659,'label':'预结算员'},{'value':660,'label':'建筑工程管理/项目经理'},{'value':661,'label':'建筑项目助理'},{'value':662,'label':'建筑工程验收'},{'value':663,'label':'工程监理'},{'value':664,'label':'合同管理'},{'value':665,'label':'安全员'},{'value':666,'label':'资料员'},{'value':667,'label':'建筑安装施工员'},{'value':668,'label':'砌筑工'},{'value':669,'label':'瓦工'},{'value':670,'label':'混凝土工'},{'value':671,'label':'浇注工'},{'value':672,'label':'钢筋工'},{'value':673,'label':'木工'},{'value':674,'label':'油漆工'},{'value':675,'label':'电梯工'},{'value':676,'label':'抹灰工'},{'value':677,'label':'施工开料工'},{'value':678,'label':'管道/暖通'},{'value':679,'label':'工长'},{'value':680,'label':'其他'}]},{'value':38,'label':'房地产开发','children':[{'value':681,'label':'房地产项目/策划经理'},{'value':682,'label':'房地产项目/策划主管/专员'},{'value':683,'label':'房地产投资管理'},{'value':684,'label':'房产项目配套工程师'},{'value':685,'label':'房地产项目招投标'},{'value':686,'label':'房地产投资分析'},{'value':687,'label':'房地产资产管理'},{'value':688,'label':'监察人员'},{'value':689,'label':'其他'}]},{'value':39,'label':'房地产销售与中介','children':[{'value':690,'label':'房地产销售经理/主管'},{'value':691,'label':'房地产销售'},{'value':692,'label':'房地产中介/置业顾问'},{'value':693,'label':'房地产评估'},{'value':694,'label':'房地产店长/经理'},{'value':695,'label':'房地产内勤'},{'value':696,'label':'房地产客服'},{'value':697,'label':'其他'}]},{'value':40,'label':'物业管理','children':[{'value':698,'label':'物业管理经理'},{'value':699,'label':'物业管理主管'},{'value':700,'label':'物业管理专员/助理'},{'value':701,'label':'前介工程师'},{'value':702,'label':'物业设施管理人员'},{'value':703,'label':'物业机电维修工'},{'value':704,'label':'物业维修员'},{'value':705,'label':'高级物业顾问/物业顾问'},{'value':706,'label':'物业招商/租赁/租售'},{'value':707,'label':'停车管理员'},{'value':708,'label':'保安经理'},{'value':709,'label':'保安人员'},{'value':710,'label':'物业机电工程师'},{'value':711,'label':'保洁'},{'value':712,'label':'绿化工'},{'value':713,'label':'其他'}]},{'value':41,'label':'人力资源','children':[{'value':714,'label':'人事总监'},{'value':715,'label':'人事经理'},{'value':716,'label':'人事主管'},{'value':717,'label':'人事专员'},{'value':718,'label':'人事助理'},{'value':719,'label':'招聘经理/主管'},{'value':720,'label':'招聘专员/助理'},{'value':721,'label':'薪资福利经理/主管'},{'value':722,'label':'薪资福利专员/助理'},{'value':723,'label':'绩效考核经理/主管'},{'value':724,'label':'绩效考核专员/助理'},{'value':725,'label':'培训经理/主管'},{'value':726,'label':'培训专员/助理/培训师'},{'value':727,'label':'企业文化/员工关系/工会管理'},{'value':728,'label':'人力资源信息系统专员'},{'value':729,'label':'其他'}]},{'value':42,'label':'高级管理','children':[{'value':730,'label':'首席执行官CEO/总裁/总经理'},{'value':731,'label':'首席运营官COO'},{'value':732,'label':'副总经理/副总裁'},{'value':733,'label':'合伙人'},{'value':734,'label':'总监/部门经理'},{'value':735,'label':'策略发展总监'},{'value':736,'label':'企业秘书/董事会秘书'},{'value':737,'label':'投资者关系'},{'value':738,'label':'办事处首席代表'},{'value':739,'label':'办事处/分公司/分支机构经理'},{'value':740,'label':'总裁助理/总经理助理'},{'value':741,'label':'其他'}]},{'value':43,'label':'行政/后勤','children':[{'value':742,'label':'行政总监'},{'value':743,'label':'行政经理/主管/办公室主任'},{'value':744,'label':'行政专员/助理'},{'value':745,'label':'经理助理/秘书'},{'value':746,'label':'党工团干事'},{'value':747,'label':'前台接待/总机/接待生'},{'value':748,'label':'图书管理员/资料管理员'},{'value':749,'label':'电脑操作员/打字员'},{'value':750,'label':'后勤'},{'value':751,'label':'其他'}]},{'value':44,'label':'咨询/顾问','children':[{'value':752,'label':'专业顾问'},{'value':753,'label':'咨询总监'},{'value':754,'label':'咨询经理'},{'value':755,'label':'专业培训师'},{'value':756,'label':'咨询员'},{'value':757,'label':'调研员'},{'value':758,'label':'猎头/人才中介'},{'value':759,'label':'情报信息分析人员'},{'value':760,'label':'其他'}]},{'value':45,'label':'律师/法务/合规','children':[{'value':761,'label':'律师/法律顾问'},{'value':762,'label':'律师助理'},{'value':763,'label':'法务经理'},{'value':764,'label':'法务主管/专员'},{'value':765,'label':'法务助理'},{'value':766,'label':'合规经理'},{'value':767,'label':'合规主管/专员'},{'value':768,'label':'知识产权/专利/商标'},{'value':769,'label':'其他'}]},{'value':46,'label':'教师','children':[{'value':770,'label':'校长'},{'value':771,'label':'大学教授'},{'value':772,'label':'讲师/助教'},{'value':773,'label':'中学教师'},{'value':774,'label':'小学教师'},{'value':775,'label':'幼教'},{'value':776,'label':'外语培训师'},{'value':777,'label':'院校教务管理人员'},{'value':778,'label':'兼职教师'},{'value':779,'label':'家教'},{'value':780,'label':'音乐/美术教师'},{'value':781,'label':'体育教师'},{'value':782,'label':'职业技术教师'},{'value':783,'label':'其他'}]},{'value':47,'label':'培训','children':[{'value':784,'label':'培训督导'},{'value':785,'label':'培训讲师'},{'value':786,'label':'培训策划'},{'value':787,'label':'培训产品开发'},{'value':788,'label':'培训/课程顾问'},{'value':789,'label':'培训助理'},{'value':790,'label':'其他'}]},{'value':48,'label':'科研','children':[{'value':791,'label':'科研管理人员'},{'value':792,'label':'科研人员'}]},{'value':49,'label':'餐饮服务','children':[{'value':793,'label':'店长/经理'},{'value':794,'label':'大堂经理'},{'value':795,'label':'餐厅领班'},{'value':796,'label':'餐饮服务员'},{'value':797,'label':'行政主厨/厨师长'},{'value':798,'label':'中餐厨师'},{'value':799,'label':'西餐厨师'},{'value':800,'label':'日式厨师'},{'value':801,'label':'面点师'},{'value':802,'label':'西点师'},{'value':803,'label':'厨师助理/学徒'},{'value':804,'label':'茶艺师'},{'value':805,'label':'咖啡师'},{'value':806,'label':'调酒师/侍酒师/吧台员'},{'value':807,'label':'礼仪/迎宾'},{'value':808,'label':'预订员'},{'value':809,'label':'收银员'},{'value':810,'label':'配菜/打荷'},{'value':811,'label':'传菜主管'},{'value':812,'label':'传菜员'},{'value':813,'label':'洗碗工'},{'value':814,'label':'送餐员'},{'value':815,'label':'杂工'},{'value':816,'label':'其他'}]},{'value':50,'label':'酒店旅游','children':[{'value':817,'label':'酒店/宾馆经理'},{'value':818,'label':'酒店/宾馆销售'},{'value':819,'label':'预定部主管'},{'value':820,'label':'预定员'},{'value':821,'label':'大堂经理'},{'value':822,'label':'酒店前台'},{'value':823,'label':'宴会管理'},{'value':824,'label':'宾客服务经理'},{'value':825,'label':'楼面经理'},{'value':826,'label':'客房服务员/楼面服务员'},{'value':827,'label':'健身房服务'},{'value':828,'label':'行李员'},{'value':829,'label':'管家部经理/主管'},{'value':830,'label':'清洁服务人员'},{'value':831,'label':'旅游产品销售'},{'value':832,'label':'行程管理/计调'},{'value':833,'label':'签证专员'},{'value':834,'label':'导游/旅行顾问'},{'value':835,'label':'票务'},{'value':836,'label':'机场代表'},{'value':837,'label':'其他'}]},{'value':51,'label':'美容保健','children':[{'value':838,'label':'美容店长'},{'value':839,'label':'美容培训师/导师'},{'value':840,'label':'美容顾问'},{'value':841,'label':'美容师'},{'value':842,'label':'美容助理'},{'value':843,'label':'彩妆培训师'},{'value':844,'label':'专柜彩妆顾问(BA)'},{'value':845,'label':'化妆师'},{'value':846,'label':'造型师'},{'value':847,'label':'美发店长'},{'value':848,'label':'发型师'},{'value':849,'label':'发型助理/学徒'},{'value':850,'label':'美甲师'},{'value':851,'label':'美体师'},{'value':852,'label':'瘦身顾问'},{'value':853,'label':'SPA 技师'},{'value':854,'label':'按摩'},{'value':855,'label':'足疗'},{'value':856,'label':'宠物护理/美容'},{'value':857,'label':'其他'}]},{'value':52,'label':'百货零售','children':[{'value':858,'label':'卖场经理/店长'},{'value':859,'label':'品类经理'},{'value':860,'label':'品牌/连锁招商管理'},{'value':861,'label':'奢侈品业务'},{'value':862,'label':'店员/营业员'},{'value':863,'label':'珠宝销售顾问'},{'value':864,'label':'督导/巡店'},{'value':865,'label':'导购员'},{'value':866,'label':'促销员'},{'value':867,'label':'收银主管'},{'value':868,'label':'收银员'},{'value':869,'label':'陈列员'},{'value':870,'label':'收货员'},{'value':871,'label':'理货员'},{'value':872,'label':'安防主管'},{'value':873,'label':'防损员/内保'},{'value':874,'label':'西点师/面包糕点加工'},{'value':875,'label':'生鲜食品加工/处理'},{'value':876,'label':'熟食加工'},{'value':877,'label':'兼职店员'},{'value':878,'label':'其他'}]},{'value':53,'label':'交通运输服务','children':[{'value':879,'label':'飞机机长/副机长'},{'value':880,'label':'空乘人员'},{'value':881,'label':'列车/地铁车长'},{'value':882,'label':'船长/副船长'},{'value':883,'label':'商务司机'},{'value':884,'label':'客运司机'},{'value':885,'label':'货运司机'},{'value':886,'label':'出租车司机'},{'value':887,'label':'班车司机'},{'value':888,'label':'列车/地铁司机'},{'value':889,'label':'特种车司机'},{'value':890,'label':'叉车司机'},{'value':891,'label':'铲车司机'},{'value':892,'label':'吊车司机'},{'value':893,'label':'驾校教练'},{'value':894,'label':'代驾'},{'value':895,'label':'地勤人员'},{'value':896,'label':'乘务员'},{'value':897,'label':'船员'},{'value':898,'label':'其他'}]},{'value':54,'label':'家政保洁','children':[{'value':899,'label':'家政服务/保姆'},{'value':900,'label':'月嫂'},{'value':901,'label':'育婴师/保育员'},{'value':902,'label':'护工'},{'value':903,'label':'清洁工'},{'value':904,'label':'钟点工'},{'value':905,'label':'洗衣工'},{'value':906,'label':'送水工'},{'value':907,'label':'保镖'},{'value':908,'label':'空调维修'},{'value':909,'label':'家电维修'},{'value':910,'label':'寻呼员/话务员'},{'value':911,'label':'其他'}]},{'value':55,'label':'公务员','children':[{'value':912,'label':'公务员'}]},{'value':56,'label':'翻译','children':[{'value':913,'label':'英语翻译'},{'value':914,'label':'日语翻译'},{'value':915,'label':'德语翻译'},{'value':916,'label':'法语翻译'},{'value':917,'label':'俄语翻译'},{'value':918,'label':'意大利语翻译'},{'value':919,'label':'西班牙语翻译'},{'value':920,'label':'葡萄牙语翻译'},{'value':921,'label':'阿拉伯语翻译'},{'value':922,'label':'韩语/朝鲜语翻译'},{'value':923,'label':'泰语翻译'},{'value':924,'label':'中国方言翻译'},{'value':925,'label':'其他语种翻译'}]},{'value':57,'label':'在校学生','children':[{'value':926,'label':'研究生'},{'value':927,'label':'大学/大专应届毕业生'},{'value':928,'label':'中专/职校生'},{'value':929,'label':'其他'}]},{'value':58,'label':'储备干部/培训生/实习生','children':[{'value':930,'label':'储备干部'},{'value':931,'label':'培训生'},{'value':932,'label':'实习生'}]},{'value':59,'label':'兼职','children':[{'value':933,'label':'兼职'}]},{'value':60,'label':'环保','children':[{'value':934,'label':'环保工程师'},{'value':935,'label':'环境影响评价工程师'},{'value':936,'label':'生态治理/规划'},{'value':937,'label':'环保检测'},{'value':938,'label':'水质检测员'},{'value':939,'label':'水处理工程师'},{'value':940,'label':'固废工程师'},{'value':941,'label':'废气处理工程师'},{'value':942,'label':'其它'}]},{'value':61,'label':'农/林/牧/渔','children':[{'value':943,'label':'养殖部主管'},{'value':944,'label':'场长(农/林/牧/渔业)'},{'value':945,'label':'农艺师'},{'value':946,'label':'畜牧师'},{'value':947,'label':'饲养员'},{'value':948,'label':'农业技术员'},{'value':949,'label':'动物营养/饲料研发'},{'value':950,'label':'其他'}]},{'value':62,'label':'网店淘宝','children':[{'value':951,'label':'网店/淘宝店长'},{'value':952,'label':'网店/淘宝运营'},{'value':953,'label':'网店店铺管理员'},{'value':954,'label':'网店/淘宝客服'},{'value':955,'label':'店铺推广'},{'value':956,'label':'网店美工'},{'value':957,'label':'网店模特'},{'value':958,'label':'其他'}]},{'value':63,'label':'机械机床','children':[{'value':959,'label':'数控操机'},{'value':960,'label':'数控编程'},{'value':961,'label':'机修工'},{'value':962,'label':'折弯工'},{'value':963,'label':'车工'},{'value':964,'label':'磨工'},{'value':965,'label':'铣工'},{'value':966,'label':'冲压工'},{'value':967,'label':'刨工'},{'value':968,'label':'钳工'},{'value':969,'label':'钻工'},{'value':970,'label':'镗工'},{'value':971,'label':'铆工'},{'value':972,'label':'钣金工'},{'value':973,'label':'抛光工'},{'value':974,'label':'切割技工'},{'value':975,'label':'模具工'},{'value':976,'label':'炼胶工'},{'value':977,'label':'硫化工'},{'value':978,'label':'吹膜工'},{'value':979,'label':'注塑工'},{'value':980,'label':'其他'}]},{'value':64,'label':'印刷包装','children':[{'value':981,'label':'印刷工'},{'value':982,'label':'校对/录入'},{'value':983,'label':'调色员'},{'value':984,'label':'烫金工'},{'value':985,'label':'晒版员'},{'value':986,'label':'印刷排版/制版'},{'value':987,'label':'装订工'},{'value':988,'label':'印刷机械机长'},{'value':989,'label':'数码直印/菲林输出'},{'value':990,'label':'调墨技师'},{'value':991,'label':'电分操作员'},{'value':992,'label':'打稿机操作员'},{'value':993,'label':'切纸机操作工'},{'value':994,'label':'裱胶工'},{'value':995,'label':'压痕工'},{'value':996,'label':'复卷工'},{'value':997,'label':'其他'}]},{'value':65,'label':'运动健身','children':[{'value':998,'label':'健身顾问/教练'},{'value':999,'label':'瑜伽老师'},{'value':1000,'label':'舞蹈老师'},{'value':1001,'label':'游泳教练'},{'value':1002,'label':'救生员'},{'value':1003,'label':'高尔夫教练'},{'value':1004,'label':'体育运动教练'},{'value':1005,'label':'其他'}]},{'value':66,'label':'休闲娱乐','children':[{'value':1006,'label':'司仪'},{'value':1007,'label':'婚礼/庆典策划服务'},{'value':1008,'label':'DJ'},{'value':1009,'label':'驻唱/歌手'},{'value':1010,'label':'舞蹈演员'},{'value':1011,'label':'模特'},{'value':1012,'label':'演员/群众演员'},{'value':1013,'label':'娱乐领班'},{'value':1014,'label':'娱乐服务员'},{'value':1015,'label':'前台迎宾'},{'value':1016,'label':'其他'}]},{'value':67,'label':'其他','children':[{'value':1017,'label':'驯兽师/助理驯兽师'},{'value':1018,'label':'志愿者/社会工作者'},{'value':1019,'label':'其他'}]}],
        jobfunctionArray: [1,2],
        industryOptions: [{'value':1,'label':'无','children':[{'value':2,'label':'无'}]},{'value':3,'label':'计算机/互联网/通信/电子','children':[{'value':14,'label':'计算机软件'},{'value':15,'label':'计算机硬件'},{'value':16,'label':'计算机服务(系统、数据服务、维修)'},{'value':17,'label':'通信/电信/网络设备'},{'value':18,'label':'通信/电信运营、增值服务'},{'value':19,'label':'互联网/电子商务'},{'value':20,'label':'网络游戏'},{'value':21,'label':'电子技术/半导体/集成电路'},{'value':22,'label':'仪器仪表/工业自动化'}]},{'value':4,'label':'会计/金融/银行/保险','children':[{'value':23,'label':'会计/审计'},{'value':24,'label':'金融/投资/证券'},{'value':25,'label':'银行'},{'value':26,'label':'保险'},{'value':27,'label':'信托/担保/拍卖/典当'}]},{'value':5,'label':'贸易/消费/制造/营运','children':[{'value':28,'label':'贸易/进出口'},{'value':29,'label':'批发/零售'},{'value':30,'label':'快速消费品(食品、饮料、化妆品)'},{'value':31,'label':'服装/纺织/皮革'},{'value':32,'label':'家具/家电/玩具/礼品'},{'value':33,'label':'办公用品及设备'},{'value':34,'label':'机械/设备/重工'},{'value':35,'label':'汽车及零配件'},{'value':36,'label':'奢侈品/收藏品/工艺品/珠宝'}]},{'value':6,'label':'制药/医疗','children':[{'value':37,'label':'制药/生物工程'},{'value':38,'label':'医疗/护理/卫生'},{'value':39,'label':'医疗设备/器械'}]},{'value':7,'label':'广告/媒体','children':[{'value':40,'label':'广告'},{'value':41,'label':'公关/市场推广/会展'},{'value':42,'label':'影视/媒体/艺术/文化传播'},{'value':43,'label':'文字媒体/出版'},{'value':44,'label':'印刷/包装/造纸'}]},{'value':8,'label':'房地产/建筑','children':[{'value':45,'label':'房地产'},{'value':46,'label':'建筑/建材/工程'},{'value':47,'label':'家居/室内设计/装潢'},{'value':48,'label':'物业管理/商业中心'}]},{'value':9,'label':'专业服务/教育/培训','children':[{'value':49,'label':'中介服务'},{'value':50,'label':'租赁服务'},{'value':51,'label':'专业服务(咨询、人力资源、财会)'},{'value':52,'label':'外包服务'},{'value':53,'label':'检测，认证'},{'value':54,'label':'法律'},{'value':55,'label':'教育/培训/院校'},{'value':56,'label':'学术/科研'}]},{'value':10,'label':'服务业','children':[{'value':57,'label':'餐饮业'},{'value':58,'label':'酒店/旅游'},{'value':59,'label':'娱乐/休闲/体育'},{'value':60,'label':'美容/保健'},{'value':61,'label':'生活服务'}]},{'value':11,'label':'物流/运输','children':[{'value':62,'label':'交通/运输/物流'},{'value':63,'label':'航天/航空'}]},{'value':12,'label':'能源/原材料','children':[{'value':64,'label':'石油/化工/矿产/地质'},{'value':65,'label':'采掘业/冶炼'},{'value':66,'label':'电气/电力/水利'},{'value':67,'label':'原材料和加工'},{'value':68,'label':'新能源'}]},{'value':13,'label':'政府/非营利组织/其他','children':[{'value':69,'label':'政府/公共事业'},{'value':70,'label':'非营利组织'},{'value':71,'label':'环保'},{'value':72,'label':'农/林/牧/渔'},{'value':73,'label':'多元化业务集团公司'}]}],
        industryArray: [1,2],
        wantjobId: '',
      };
    },
    components:
      {
        JobsVisualization,
        UserHome,
        JobsRecommend,
        CollectList,
        InfoChange,
        UserProfile,
        CompanyVisualization
      },
    created(){
      let userInfo = this.$store.state.userInfo;
      if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
        this.username = userInfo['name'];
      }
    },
    methods: {
      verselectHandler(key, keyPath) {
        this.activeComponent = this.vermenuList[key-1].component;
      },
      handleCommand(command) {
        switch (command) {
          case 'a':{this.activeComponent = CollectList;}break;
          case 'b':{
            this.getUserWantJobId();
            this.dialogVisible = true;
            }break;
          case 'c':{this.activeComponent = UserProfile;}break;
          case 'd':{this.activeComponent = InfoChange;}break;
          case 'e':{
            cookie.delCookie('id');
            cookie.delCookie('token');
            cookie.delCookie('name');
            this.$store.dispatch('setInfo');
            this.$router.push("/Login");
          }break;
        }
      },
      getUserWantJobId(){
        getUserWantJob({
          user: this.$store.state.userInfo['id']
        }).then((response)=> {
          let data = response.data;
          if (data.length>0){
            let result = data[0];
            this.wantjobId = result['id'];
            this.salary_low = result['want_salary_low'];
            this.salary_high = result['want_salary_high'];
            this.workyearValue = result['want_workyear'].toString();
            this.companysizeValue = result['want_companysize'].toString();
            this.eduValue = result['want_education'].toString();
            this.cityArray = [result['province'],result['want_city']];
            this.industryArray = [result['industry_parent'],result['want_industry']];
            this.jobfunctionArray = [result['jobfunction_parent'],result['want_jobfunction']];
          }
        }).catch(function (error)
        {
          console.log(error);
        })
      },
      saveHandler(){
        this.dialogVisible = false;
        updateUserWantJob(this.wantjobId,{
          want_salary_low: this.salary_low,
          want_salary_high: this.salary_high,
          want_education: this.eduValue,
          want_workyear: this.workyearValue,
          want_city: this.cityArray[1],
          want_industry: this.industryArray[1],
          want_jobfunction: this.jobfunctionArray[1],
          want_companysize: this.companysizeValue
        }).then((response)=> {
          if(response.status === 200){
            this.$message.success("修改成功");
          }else{
            console.log("你没有权限");
          }
        }).catch(function (error) {
          console.log("error",error);
        });
      },
      open() {
        this.$prompt('请输入邮箱', '求职意向', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
  }
</script>
<style>
  .menu-header{
    height: 40px;
    background: #FFFFFF;
    box-shadow:2px 0px 5px 0px rgba(172,200,219,0.46);
    margin-left: -22px;
  }
  .heder-title{
    font-size: 24px;
    margin-top: 10px;
    color: #7EA0FE;
  }
  .logo-aside{
    height: 180px;
    width:250px;
    /*font-size: 20px;*/
    margin-top: -30px;
    margin-left: -50px;
    color: #7EA0FE;
  }
  .el-menu-vertical-demo{
    border: none;
  }
  .menu-aside-div{
    box-shadow:1px 0px 0px 0px rgba(116,116,116,0.07);
    height:600px;
    background: rgb(57,59,106);
  }
  .el-menu-vertical-demo{
    background: rgb(57,59,106);
    color: #FFFFFF;
  }
  .userImage{
    float: right;
    margin-right: 3%;
    margin-top: 10px;
  }
  .el-menu-item{
    color: rgb(114,117,186);
    padding:0 40px;
    font-size: 16px;
    font-weight: bold;
  }
  .el-menu-item.is-active{
    color: #FFFFFF;
  }
  .el-icon-s-promotion .el-icon-s-data .el-icon-s-marking .el-icon-s-grid {
    color: rgb(114,117,186);
    background:rgb(114,117,186);
  }

  /*.el-input-style{*/
    /*height: 20px;*/
    /*font-size: 13px;*/
    /*box-shadow: none;*/
    /*border: 1px solid #e9e9e9;*/
  /*}*/
</style>
