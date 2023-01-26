export const userRole = {
  USER: 'USER',
  MOD: 'MOD',
  ADMIN: 'ADMIN'
};

export const userStatus = {
  ACTIVE: 'ACTIVE',
  WARNING: 'WARNING',
  BANNED: 'BANNED'
};

export const commentStatus = {
  APPROVED: 'APPROVED',
  WARNING: 'WARNING',
  BANNED: 'BANNED'
};

export const IMAGE_SIZE = {
  banner: {
    width: 1240,
    height: 450
  },
  movieCard: {
    width: 190,
    height: 266
  },
  newCard: {
    width: 500,
    height: 282
  }
};

export const STALE_TIME = {
  ONE_HOUR: 3600000
};

export const REVALIDATE_TIME = {
  success: 60 * 60 * 60 /** 1 day */,
  fail: 60 * 5 /** 5 minutes */
};

export const defaultAvatar =
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

export const resizeImageLokLok = (url: string, width: number = 0, height: number = 0) => {
  return `${url}?imageView2/1/w/${width}/h/${height}/format/webp/interlace/1/ignore-error/1/q/90!/format/webp`;
};

export const MOVIES_CONSTANTS = {
  NUMBER_OF_MOVIES_LIST: 6
};
