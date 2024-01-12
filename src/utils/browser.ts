/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise((resolve) => {
    const copyInput = document.createElement('input'); //创建一个input框获取需要复制的文本内容
    copyInput.value = text;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  });
};
