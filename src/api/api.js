import axios from 'axios';

import cookie from '../static/js/cookie'
let host = '/api';

//获取工作
export const getJobs = params => { return axios.get(`${host}/jobs/`,{ params: params  })};

//获取题目信息
export const getProblemDetail = problemId => { return axios.get(`${host}/problems/${problemId}`+'/')};

//获取公司
export const getCompanies = params => { return axios.get(`${host}/company/`,{ params: params  })};

//获取收藏岗位
export const getCollectJobs = params => { return axios.get(`${host}/usercollectjob/`,{ params: params  })};

// 添加收藏岗位
export const addCollectJob = params => { return axios.post(`${host}/usercollectjob/`,params)};

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

//获取CompaniesHot
export const getCompaniesHot = params => { return axios.get(`${host}/companyhot/`,{ params: params  })};

//获取CompaniesHot
export const getCompaniesParalle = params => { return axios.get(`${host}/companyparalle/`,{ params: params  })};

//获取CompaniesMap
export const getCompaniesMap = params => { return axios.get(`${host}/companymap/`,{ params: params  })};

//获取JobBar
export const getJobsBar = params => { return axios.get(`${host}/jobbar/`,{ params: params  })};

//获取提交信息
export const getSubmissionDetail = submissionId => { return axios.get(`${host}/submissions/${submissionId}`+'/')};

// 添加提交记录
export const addSubmission = params => { return axios.post(`${host}/submissions/`,params)};

//获取Accept列表
export const getAcceptedProblems = params => { return axios.get(`${host}/useracceptedproblems/`,{ params: params  })};

//获取Challenge列表
export const getChallengingProblems = params => { return axios.get(`${host}/userchallengingproblems/`,{ params: params  })};

//获取收藏列表
export const getCollections = params => { return axios.get(`${host}/usercollect/`,{ params: params  })};

// 添加收藏
export const addCollection = params => { return axios.post(`${host}/usercollect/`,params)};

//取消收藏
export const delCollection = collectionId => {return axios.delete(`${host}/usercollect/`+collectionId+'/')};

//获取比赛列表
export const getContests = params => { return axios.get(`${host}/contests/`,{ params: params  })};

//获取比赛排名列表
export const getContestRankList = params => { return axios.get(`${host}/contestrank/`,{ params: params  })};

//获取比赛信息
export const getContestDetail = contestId => { return axios.get(`${host}/contests/${contestId}`+'/')};

//获取个人信息
export const getUserProfile = params => { return axios.get(`${host}/userprofile/`,{ params: params  })};
//上传头像
export const uploadAvatar = (userId, params) => {return axios.patch(`${host}/userprofile/`+userId+'/', params,{
  headers:{'Content-Type':'multipart/form-data'}
})};
//更新个人信息
export const updateUserProfile = (userprofileId, params) => {return axios.patch(`${host}/userprofile/`+userprofileId+'/', params)};

//获取期望工作
export const getUserWantJob = params => { return axios.get(`${host}/userwantjob/`,{ params: params  })};
//更新期望工作
export const updateUserWantJob = (userwantjobId, params) => {return axios.patch(`${host}/userwantjob/`+userwantjobId+'/', params)};

//登录
export const login = params => {
  return axios.post(`${host}/login/`, params)
};
//注册
export const register = params => {
  return axios.post(`${host}/register/`, params)
};


export const getUser = params => {
  return axios.get(`${host}/users/`, { params: params })
};


