import { atom, selector } from 'recoil';

export const userAtom = atom({
  key: 'user',
  default: null,
});

export const userAuthSelector = selector({
  key: 'userAuth',
  get: ({ get }) => {
    const user = get(userAtom);
    return user !== null;
  },
});