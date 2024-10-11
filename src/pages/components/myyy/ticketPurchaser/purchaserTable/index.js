import { Table } from "antd";
import confirm from "../../../../utils/fields/confirm";
import { deleteIdCardAPI } from "../../../../../api/idCard";
const PurchaserTable = (props) => {
    const handleChange=(value)=>{
        props.setIdCardInfo(value)
    }
    const handleDeleteIdCard = async (value) => {
        confirm("操作确认", `确认删除购票人${value.name}？`, () => deleteIdCardAPI(value), ()=> handleChange(props.item.filter(item => item.idcard !== value.idcard)))
    }
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, value, index) => <div>{index + 1}</div>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '证件类型',
            dataIndex: 'idCardType',
            key: 'idCardType',
            render: () => <div>身份证</div>,
        },
        {
            title: '证件号',
            key: 'idcard',
            render: (value) => <div>{`${value.idcard.slice(0, 3)}************${value.idcard.slice(-3)}`}</div>
        },
        {
            title: '操作',
            key: 'action',
            render: (value) => <div style={{ color: "#2f97b4", cursor: "pointer" }} onClick={() => handleDeleteIdCard({ ...value, id: localStorage.getItem("id") })}>删除</div>
        },
    ];
    return (
        <div className="ticketPurchaser-info-table">
            <Table columns={columns} dataSource={props.item} pagination={{
                position: ["none", "none"]
            }} />
        </div>
    )
}
export default PurchaserTable;