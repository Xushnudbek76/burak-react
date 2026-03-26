import { TabContext } from "@mui/lab";
import { Box, Container,  Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrder, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/orders.css"
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";


    const actionDispatch = (dispatch: Dispatch) => ({
        setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
        setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
        setFinishedOrder: (data: Order[]) => dispatch(setFinishedOrder(data)),
    });




export default function OrdersPage() {
    const dispatch = useDispatch();
    const { setPausedOrders, setProcessOrders, setFinishedOrder} = actionDispatch(dispatch)
    
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE
    });
    const { orderBuilder, authMember } = useGlobals();
    const history = useHistory();
    useEffect(() => {
        const order = new OrderService();
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
        .then((data) =>{ console.log("PAUSE DATA:", data); setPausedOrders(data)})
        .catch((err) => console.log(err))
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
        .then((data) => setProcessOrders(data))
        .catch((err) => console.log(err))
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
        .then((data) => setFinishedOrder(data))
        .catch((err) => console.log(err))
    }, [orderInquiry, orderBuilder]);

    const [value, setValue] = useState('1');
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
      if(!authMember) history.push("/");

    return (
        <div className="order-page">
            <Container className="cont">
                <Stack className="order-left">
        <TabContext value={value}>
          <Box className={"order-nav-frame"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className={"table_list"}
              >
                <Tab label="PAUSED ORDERS" value={"1"} />
                <Tab label="PROCESS ORDERS" value={"2"} />
                <Tab label="FINISHED ORDERS" value={"3"} />
              </Tabs>
            </Box>
          </Box>

          <Stack className={"order-main-content"}>
            <PausedOrders setValue={setValue} />
            <ProcessOrders setValue={setValue} />
            <FinishedOrders />
          </Stack>
        </TabContext>
                </Stack>
                <Stack className="order-right">
                    <Box className='user-info'>
                        <Box  className='user-detail'>

                        
                        <Box textAlign={'center'}>
                            <img className="badge" src={
                                                  authMember?.memberType === MemberType.RESTAURANT 
                                                  ? "/icons/restaurant.svg"
                                                  : "/icons/user-badge.svg"} alt="" />
                            <img className="user" src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "icons/default-user.svg"} alt="" /> 
                        <Typography className="user-name">{authMember?.memberNick}</Typography>
                        <p className="user-type">{authMember?.memberType}</p>
                        </Box>
                        <Box>
                            <Divider height="1" width="332" bg="#A1A1A1"/>
                            <Box display={'flex'} columnGap={'8px'}>
                            <img src="/icons/location.svg" alt="" />
                            <p>{authMember?.memberAddress ?? "Do not exist"}</p>
                            </Box>
                        </Box>
                        </Box>

                        <Box className='card-info'>
                            <TextField className="card-input" fullWidth placeholder="Card number : 5243 4090 2002 7495"/>
                            <Box display={'flex'} columnGap={'8px'}>
                                <TextField placeholder="07/24"/>
                                <TextField placeholder="CVV:010"/>
                            </Box>
                            <TextField fullWidth placeholder="Martin"/>
                            <Box display={'flex'} marginTop={'28px'}  columnGap={'20px'} justifyContent={'center'} flexDirection={'row'}>
                                <img src="/icons/western-card.svg" alt="" />
                                <img src="/icons/master-card.svg" alt="" />
                                <img src="/icons/paypal-card.svg" alt="" />
                                <img src="/icons/visa-card.svg" alt="" />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        
                    </Box>                    
                </Stack>
            </Container>
        </div>
    )
}