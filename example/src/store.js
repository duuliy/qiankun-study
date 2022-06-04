import { initGlobalState } from 'qiankun';

const initialState = {
  user: {
    name: 'qiankun' //传用户登陆信息，国际化等
  }
};

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state, prev) => {
  for (const key in state) {
    initialState[key] = state[key];
  }
})

actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState;
}

export default actions;

