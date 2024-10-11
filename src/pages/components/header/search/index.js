import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './index.css'
import { Pagination } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchInfo, fetchSearchList, setSearchCity, setSearchClass, setSearchList } from '../../../../store/modules/searchStore';
import arrSplit from '../../../utils/fields/arrSlice';
const SearchDetails = () => {
    const dispatch = useDispatch()
    const [cityActive, setCityActive] = useState()
    const [categoryActive, setCateGoryActive] = useState()
    const [allCity, setAllCity] = useState(13)
    const [allCategory, setAllCategory] = useState(13)
    const navigate=useNavigate()
    const [data,setData] = useState({
        page:1,
        pageSize:7
    })
    const searchCity = useSelector(state => state.search.searchCity)
    const searchClass = useSelector(state => state.search.searchClass)
    const searchCityClassList = useSelector(state => state.search.searchCityClassList)
    const searchList = useSelector(state => state.search.searchList)
    const searchRecommend=useSelector(state=>state.search.searchRecommend)
    const searchSum=useSelector(state=>state.search.sum)
    const [searchParams] = useSearchParams()
    const title = searchParams.get('keyWord')
    useEffect(() => {
        dispatch(fetchSearchInfo({ title }))
        // const list1=arrSplit(searchList,1,7)
        // console.log(searchList)
        // dispatch(setSearchList(list1))
    }, [title, dispatch])
    const handlePageChange = (page) => {
        const list=arrSplit(searchSum,page,data.pageSize)
        dispatch(setSearchList(list))
        setData({...data,page})
    }
    const handleChangeCity=(item,index)=>{
        setCityActive(index)
        setAllCity(14)
        dispatch(setSearchCity(item))
        dispatch(fetchSearchList({ title ,city:item,class:searchClass}))
    }
    const handleChangeCategory=(item,index)=>{
        setCateGoryActive(index)
        setAllCategory(14)
        dispatch(setSearchClass(item))
        dispatch(fetchSearchList({ title ,city:searchCity,class:item}))
    }
    const handleAllCity=()=>{
        setAllCity(13)
        setCityActive(15)
        dispatch(setSearchCity(""))
        dispatch(fetchSearchList({ title ,city:"",class:searchClass}))
    }
    const handleAllCategory=()=>{
        setAllCategory(13)
        setCateGoryActive(15)
        dispatch(setSearchClass(""))
        dispatch(fetchSearchList({ title ,city:searchCity,class:""}))
    }
    return (
        <div className="search-details">
            <div className="search-details-box">
                <div className='search-details-box-flex'>
                    <div className='search-details-box-flex-main'>
                        <div className='search-details-box-flex-main-box'>
                            <div className='search-details-item'>
                                <span className='search-details-title'>城 市：</span>
                                <div className='factor-content'>
                                    <div className='factor-selected'>
                                        当前选中城市
                                        <span className='factor-selected-city'>{searchCity || '全国'}</span>
                                    </div>
                                    <div className='factor-content-main'>
                                        <span className={allCity===13?'factor-content-main-item-default factor-content-active':"factor-content-main-item-default"} onClick={handleAllCity}>全部</span>
                                        <div className='factor-content-box'>
                                            {/* 遍历城市 */}
                                            {searchCityClassList.cityList?.map((item, index) => {
                                                return (
                                                    <span className={cityActive === index ? 'factor-content-item factor-content-active' : 'factor-content-item'} key={index} onClick={()=>handleChangeCity(item,index)}>{item}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='search-details-item-classfiy'>
                                <span className='search-details-title'>分类：</span>
                                <div className='factor-content'>
                                    <div className='factor-content-main'>
                                        <span className={allCategory===13?'factor-content-main-item-default factor-content-active':"factor-content-main-item-default"}onClick={handleAllCategory}>全部</span>
                                        <div className='factor-content-box'>
                                            {
                                                searchCityClassList.category?.map((item, index) => {
                                                    return (
                                                        <span className={categoryActive === index ? 'factor-content-item factor-content-active' : 'factor-content-item'} key={index + 2} onClick={() => handleChangeCategory(item, index)}>{item}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='search-details-sort'>
                            <div className='search-sort-fl'>
                                <span className='search-sort-item search-sort-item-active'>相关度排序</span>
                                <span className='search-sort-item'>推荐排序</span>
                                <span className='search-sort-item'>最近开场</span>
                                <span className='search-sort-item'>最新上架</span>
                            </div>
                            <div className='search-sort-fr'>
                                <Pagination simple total={searchSum?.length} size='small' pageSize={data.pageSize} onChange={handlePageChange} current={data.page}/>
                            </div>
                        </div>
                        <div className='search-details-list'>
                            <div className='search-details-item-main'>
                                <div className='item-box'>
                                    {searchList?.map((item, index) => {
                                        return (
                                            <div className='items' key={index + 10}>
                                                <Link className='items_img' to={`/details?id=${item.id}&&Pid=${item.pid}`}>
                                                    <span className='items_img_tag'>{item.pid}</span>
                                                    <img alt='项目图片' src={item.img} className='items_img_img'></img>
                                                </Link>
                                                <div className='items_txt'>
                                                    <div className='items_txt_title'>
                                                        <span className='items_txt_title-content'>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                    <div className='items_txt_place'>
                                                        {item.place}
                                                    </div>
                                                    <div className='items_txt_time'>
                                                        {item.time[0]}
                                                    </div>
                                                    <div className='items_txt_price'>
                                                        <span className='items_txt_price-content'>
                                                            {item.price.join('-')}
                                                            <i className='items_txt_price-i'>元</i>
                                                        </span>
                                                        售票中
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='search-pagination'>

                                <Pagination total={searchSum?.length} pageSize={data.pageSize} onChange={handlePageChange}current={data.page}/>

                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                    </div>
                    <div className='search-details-box-flex-right'>
                        <div className='search-title'>
                            您可能还喜欢
                        </div>
                        <div className='search_box'>
                            {searchRecommend?.map((item, index) => {
                                return (
                                    <div className='search_items' key={index + 11}onClick={()=>navigate(`/details?id=${item.id}&&Pid=${item.pid}`)}>
                                        <Link className='search_items_poster'>
                                            <img src={item.img} alt="项目图片"></img>
                                        </Link>
                                        <div className='search_items_info'>
                                            <Link className='search_items_info_title'>
                                                {item.title}
                                            </Link>
                                            <div className='search_items_info_venu'>
                                                {item.place}
                                            </div>
                                            <div className='search_items_info_venu_time'>
                                                {item.time[0]}
                                            </div>
                                            <div className='search_items_info_price'>
                                                <strong>{item.price[0]}元</strong>
                                                起
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default SearchDetails