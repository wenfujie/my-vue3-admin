/** 模拟异步请求，实用性不高，主要用于demo模拟请求 */
export const waitTime = <T>(time = 100, data: any = true): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};
