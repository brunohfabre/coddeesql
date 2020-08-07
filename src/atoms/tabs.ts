import { atom } from 'recoil';

export const currentTabSelectedState = atom({
  key: 'currentTabSelected',
  default: 0,
});
