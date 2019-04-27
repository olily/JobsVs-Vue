// 当state中的某些状态在各个组件中都被频繁使用，如果在每个组件中都声明一次，将会变得非常繁琐。
// export const nav = state => {
// 	return state.userInfo.nav;
// }
export const userInfo = state => {
	return state.userInfo;
};
export const userAcceptedProblems = state => {
  return state.userAcceptedProblems;
};
export const userChallengingProblems = state => {
  return state.userChallengingProblems;
};
export const userCollections = state => {
  return state.userCollections;
};

export const goods_list = state => {
  console.log(state.goods_list)
  return state.goods_list;
}
