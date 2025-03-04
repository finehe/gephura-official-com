// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行以确保Vue组件已渲染
  setTimeout(() => {
    // 查找所有含有data-v-9cca3a4a属性的span元素
    const spans = document.querySelectorAll('span[data-v-9cca3a4a]');
    spans.forEach(span => {
      // 设置强制样式
      span.style.color = 'black';
      span.style.fontWeight = 'bold';
      span.style.opacity = '1';
      span.style.visibility = 'visible';
    });
  }, 500);
}); 