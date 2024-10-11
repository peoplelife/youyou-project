import Sildes from "./sildes"
import './index.css'
import Category from "./category"
import ContentWrap from "./content-warp"
const Content=()=>{
    const img=[
        'https://img.alicdn.com/imgextra/i3/O1CN01K2mmkD1ZIMsRociHO_!!6000000003171-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i3/O1CN01QpiiM01vQzsv7XXJS_!!6000000006168-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i3/O1CN01uDsgaK1mQEgg2iWVP_!!6000000004948-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i4/O1CN01ImAXsh1iyLj7ujgQr_!!6000000004481-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i3/O1CN01uldnAD1XCknGWiN8t_!!6000000002888-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i4/O1CN01N4W82q1JWXHA6tMya_!!6000000001036-0-tps-1200-320.jpg'
    ]
    return(
        <div className="content">
            <Sildes></Sildes>
            <Category></Category>
            <ContentWrap></ContentWrap>
        </div>
    )
}
export default Content