import axios from 'axios';

import cookie from '../static/js/cookie'
let host = '/api';

//获取工作
export const getJobs = params => { return axios.get(`${host}/jobs/`,{ params: params  })};

//获取公司
export const getCompanies = params => { return axios.get(`${host}/company/`,{ params: params  })};

//获取收藏岗位
export const getCollectJobs = params => { return axios.get(`${host}/usercollectjob/`,{ params: params  })};

// 添加收藏岗位
export const addCollectJob = params => { return axios.post(`${host}/usercollectjob/`,params),{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
}};

//取消收藏岗位
export const delCollectJob = collectjobId => {return axios.delete(`${host}/usercollectjob/`+collectjobId+'/')};

//获取关注公司
export const getFocusCompanies = params => { return axios.get(`${host}/userfocuscompany/`,{ params: params  })};

// 添加关注公司
export const addFocusCompany = params => { return axios.post(`${host}/userfocuscompany/`,params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//取消关注公司
export const delFocusCompany = focuscompanyId => {return axios.delete(`${host}/userfocuscompany/`+focuscompanyId+'/',{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//获取JobMap
export const getJobsMap = params => { return axios.get(`${host}/jobsmap/`,{ params: params  })};

//获取JobPoint
export const getJobsPoint = params => { return axios.get(`${host}/jobspoint/`,{ params: params  })};

//获取FareCloud
export const getFaresCloud = params => { return axios.get(`${host}/farecloud/`,{ params: params  })};

//获取FareCloud
export const getRessCloud = params => { return axios.get(`${host}/responsecloud/`,{ params: params  })};

//获取FareCloud
export const getReqsCloud = params => { return axios.get(`${host}/requestcloud/`,{ params: params  })};

//获取CompaniesHot
export const getCompaniesHot = params => { return axios.get(`${host}/companyhot/`,{ params: params  })};

//获取CompaniesHot
export const getCompaniesParalle = params => { return axios.get(`${host}/companyparalle/`,{ params: params  })};

//获取CompaniesMap
export const getCompaniesMap = params => { return axios.get(`${host}/companymap/`,{ params: params  })};

//获取JobsBar
export const getJobsBar = params => { return axios.get(`${host}/jobbar/`,{ params: params  })};

//获取Industriesburst
export const getIndustriesburst = params => { return axios.get(`${host}/industrysun/`,{ params: params  })};

//获取Jobfunctionsburst
export const getJobfunctionsburst = params => { return axios.get(`${host}/functionsun/`,{ params: params  })};

//获取Citiesburst
export const getCitiesburst = params => { return axios.get(`${host}/citysun/`,{ params: params  })};

//获取个人信息
export const getUserProfile = params => { return axios.get(`${host}/userprofile/`,{ params: params  })};
//上传头像
export const uploadAvatar = (userId, params) => {return axios.patch(`${host}/userprofile/`+userId+'/', params,{
  headers:{'Content-Type':'multipart/form-data'}
})};
//更新个人信息
export const updateUserProfile = (userprofileId, params) => {return axios.patch(`${host}/userprofile/`+userprofileId+'/', params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//获取期望工作
export const getUserWantJob = params => { return axios.get(`${host}/userwantjob/`,{ params: params  })};
//更新期望工作
export const updateUserWantJob = (userwantjobId, params) => {return axios.patch(`${host}/userwantjob/`+userwantjobId+'/', params,{
  headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
})};

//登录
export const login = params => {
  return axios.post(`${host}/login/`, params,{
    headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
  })
};
//注册
export const register = params => {
  return axios.post(`${host}/register/`, params,{
    headers:{'X-CSRFToken': cookie.getCookie('csrftoken')}
  })
};


export const getUser = params => {
  return axios.get(`${host}/users/`, { params: params })
};


