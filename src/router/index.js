import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/login/login"
import YycxBox from "../pages/yycxBox"
import Details from "../pages/components/details/details"
import Content from "../pages/components/content"
import Pay from "../pages/components/pay"
import Test from "../pages/test/test"
import AuthRoute from "../pages/utils/AuthRoute"
import Success from "../succes"
import Classify from "../pages/components/classify"
import Myyy from "../pages/components/myyy"
import Orders from "../pages/components/myyy/orders"
import PendingPayment from "../pages/components/myyy/pendingpayment"
import PersonalInformation from "../pages/components/myyy/personalInformation"
import EditingInformation from "../pages/components/myyy/personalInformation/editingInformation"
import Uploads from "../pages/components/myyy/personalInformation/upload"
import Identity from "../pages/components/pay/identity"
import TicketPurchaser from "../pages/components/myyy/ticketPurchaser"
import SearchDetails from "../pages/components/header/search"
const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/',
        element:<YycxBox/>,
        children:[
            {
                path:'/details',
                element:<Details/>
            },
            {
                path:'/',
                element:<Content/>
            },
            {
                path:'/myyy',
                element:<Myyy/>,
                children:[
                    {
                        path:'',
                        element:<Orders/>
                    },
                    {
                        path:'/myyy/ticketPurchaser',
                        element:<TicketPurchaser/>
                    },
                    {
                        path:'/myyy/personalInformation',
                        element:<PersonalInformation/>,
                        children:[
                            {
                                path:'',
                                element:<EditingInformation/>
                            },
                            {
                                path:'/myyy/personalInformation/changeAvater',
                                element:<Uploads/>
                            },
                        ]
                    }
                ]
            },
            {
                path:'/classify',
                element:<Classify/>
            },
            {
                path:'/orderDetails',
                element:<PendingPayment/>
            },
            {
                path:'/SearchDetails',
                element:<SearchDetails/>
            }
        ]
    },
    {
        path:'/pay',
        element:<AuthRoute><Pay/></AuthRoute>
    },
    {
        path:'/identity',
        element:<Identity/>
    }
    ,
    {
        path:'/test',
        element:<Test/>
    },
    {
        path:'/success',
        element:<Success/>
    }
])
export default router