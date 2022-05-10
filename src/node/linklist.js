// 数据结构的核心： 存储数据
// 栈： 先进后出  
// 队列：先进先出
// 链表： 单向链表 循环链表 双向链表
/**
 * 链表中的一个节点
 */
class Node{
    constructor(element, next){
        this.element = element;
        this.next = next;
    }
}
class LinkList{
    constructor(){
        this.head = null;
        this.size = 0;// 链表的总长度
    }
    add(index,element){//可以传递索引 也可以不传索引
        if(arguments.length==1){
            element = index;
        }
        if(index==0){
            let oldHead = this.head;
            this.head = new Node(element,oldHead);
        }
        this.size++;
    }
}