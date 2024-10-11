const menuKeyAndLaber = (lists) => {
    //首先进行深拷贝
    const list = JSON.parse(JSON.stringify(lists))
    let newObj = {}
    const degui = (list) => {
        //先遍历数组
        list.forEach(item => {
            //遍历数组项的对象
            for (const key in item) {
                //将需要的值添加到新对象中
                if (key === "key") newObj[item.key] = item.label
                //如果有子项,需要用到递归
                if (key === 'children') degui(item[key])
            }
        });
    }
    //调用一下递归函数
    degui(list)
    //返回新数组
    return newObj
}
export default menuKeyAndLaber