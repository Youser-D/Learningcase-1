let that;
// 第一步，定义teb标签类
class Tab {
  constructor(id) {
    // 获取 最外层id=tab的div元素
    this.main = document.querySelector(id);
    // 标题元素ul
    this.ulTit = this.main.querySelector(".fisrstnav ul");
    // 内容元素
    this.cons = this.main.querySelector(".tabscon");
    // 添加的按钮
    this.add = this.main.querySelector(".tabadd");

    that = this;
    // 初始化
    this.init();

  }
  // 初始化
  init(){
    // 刷新节点
    this.updateNode();
    // 给所有Li绑定点击事件
    for(let i = 0;i < this.lis.length;i++){
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;

      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab
    }
    this.add.onclick = this.addTab;
  }

  // 动态添加元素，需要重新获取对应的元素
  updateNode () {
    // this指向对象，以下元素共用一个索引值
    // 获取所有Li和section
    this.lis = this.ulTit.querySelectorAll('li');
    this.sections = this.cons.querySelectorAll('section');
    // 获取所有删除的字体图标和标题文字
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    this.spans = this.ulTit.querySelectorAll('.fisrstnav li span:first-child')
  }

  // 切换
  toggleTab () {
    // 清空所有样式
    // console.log(this);//li
    for(let i = 0;i < that.lis.length;i++){
      that.lis[i].className = "";
      that.sections[i].className = "";
    }
    this.className = "liactive";
    that.sections[this.index].className = "conactive"
  }

  // 添加
  addTab () {
    //console.log(this);
    //this指向<div class="tabadd"></div>加号按钮
    var newLi = `<li>
                    <span>新选项卡</span>
                    <span class="iconfont icon-guanbi"></span>
                  </li>`;
    that.ulTit.insertAdjacentHTML('beforeend',newLi);
    var newSec = `<section>新选项卡的内容</section>`
    that.cons.insertAdjacentHTML('beforeend',newSec);

    that.init();

    that.toggleTab.call(that.lis[that.lis.length - 1]);
  }

  // 删除
  removeTab (e) {
    // this指向删除按钮
    e.stopPropagation();  //阻止事件冒泡

    var index = this.parentNode.index;
    // alert(index)
    // 根据索引号删除对应的li 和section   remove()方法直接删除指定的元素
    that.lis[index].remove()
    that.sections[index].remove()
    that.init();

    // 当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
    if (document.querySelector('.liactive')) return 
    // console.log(index,that.lis.length);
    if (index == that.lis.length) {
      index--;
      // console.log(index,1);
    }
    // 自动调用我们的点击事件
    that.lis[index] && that.lis[index].click()
    //或者
    // that.toggleTab.call(that.lis[index]);

  }

  // 编辑
  editTab () {
    // this  ===》当前双击的span或者section

    var str = this.innerHTML;
    // 去除双击选中的默认行为（兼容写法），记住就行
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    //将文本换成文本框
    this.innerHTML = "<input type='text'>";
    // 将文本复制到文本框
    var input = this.children[0];
    input.value = str;
    // 文本框里面的文字处于选定状态
    input.select();

    // 当文本框失去聚焦时就把文本框里面的值赋给span/section
    input.onblur = function () {
      //this ==> input，就是span/section里的第一个元素
      this.parentNode.innerHTML = this.value
    }
  }
}

new Tab("#tab")