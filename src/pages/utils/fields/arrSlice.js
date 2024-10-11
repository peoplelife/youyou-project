const arrSplit=(arr,page,pageSize)=>{
    const offset=(page-1)*pageSize
    return offset+pageSize>=arr.length?arr.slice(offset,arr.length):arr.slice(offset,offset+pageSize)
}
export default arrSplit