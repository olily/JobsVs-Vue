// 当state中的某些状态在各个组件中都被频繁使用，如果在每个组件中都声明一次，将会变得非常繁琐。
// export const nav = state => {
// 	return state.userInfo.nav;
// }
export const userInfo = state => {
	return state.userInfo;
};
export const userCollectJobs = state => {
  return state.userCollectJobs;
};
export const userFocusCompanies = state => {
  return state.userFocusCompanies;
};
