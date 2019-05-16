import * as types from './mutation-types';
// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
}

export const setInfo = makeAction(types.SET_INFO);
export const setCollectJobs = makeAction(types.SET_COLLECTJOBS);
export const setFocusCompanies = makeAction(types.SET_FOCUSCOMPANIES);
