(function () {
  'use strict';

  // 选择所有要排序的 div（根据你的 XPath 路径修改）
  const containerXPath = '/html/body/section/div/div[6]';
  const itemSelector = './div'; // 每个 div 是 container 的直接子节点

  const xpathToContainer = document.evaluate(containerXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!xpathToContainer) {
    console.error('找不到容器元素');
    return;
  }

  // 获取所有子 div
  const items = Array.from(xpathToContainer.querySelectorAll(':scope > div'));

  if (items.length === 0) {
    console.log('没有找到可以排序的 div');
    return;
  }

  // 提取分数并排序
  items.sort((a, b) => {
    function getScore(el) {
      // 根据你的 XPath：el -> a -> div[3] -> span
      const a = el.querySelector('a');
      if (!a) return 0;

      const targetDiv = a.querySelector('div:nth-child(3)'); // 第3个 div
      const span = targetDiv?.querySelector('span');
      if (!span) return 0;

      const text = span.textContent.trim();
      const match = text.match(/([\d.]+)分/);
      return match ? parseFloat(match[1]) : 0;
    }

    return getScore(b) - getScore(a); // 降序排序
  });

  // 清空原容器，并重新插入排序后的元素
  while (xpathToContainer.firstChild) {
    xpathToContainer.removeChild(xpathToContainer.firstChild);
  }

  items.forEach(item => xpathToContainer.appendChild(item));
})();