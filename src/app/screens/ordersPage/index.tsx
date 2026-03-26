import { TabContext } from "@mui/lab";
import { Box, Container,  Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css"
import Divider from "../../components/divider";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrder, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";


    const actionDispatch = (dispatch: Dispatch) => ({
        setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
        setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
        setFinishedOrder: (data: Order[]) => dispatch(setFinishedOrder(data)),
    });




export default function OrdersPage() {
    const { setPausedOrders, setProcessOrders, setFinishedOrder} = actionDispatch(useDispatch)
    
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE
    });

    useEffect(() => {
        const order = new OrderService();
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
        .then((data) => setPausedOrders(data))
        .catch((err) => console.log(err))
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
        .then((data) => setProcessOrders(data))
        .catch((err) => console.log(err))
        order
        .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
        .then((data) => setFinishedOrder(data))
        .catch((err) => console.log(err))
    }, [orderInquiry]);

    const [value, setValue] = useState('1');
    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
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
            <PausedOrders />
            <ProcessOrders />
            <FinishedOrders />
          </Stack>
        </TabContext>
                </Stack>
                <Stack className="order-right">
                    <Box className='user-info'>
                        <Box  className='user-detail'>

                        
                        <Box textAlign={'center'}>
                            <img className="badge" src="/icons/user-badge.svg" alt="" />
                            <img className="user" src="/icons/default-user.svg" alt="" /> 
                        <Typography className="user-name">Martin</Typography>
                        <p className="user-type">User</p>
                        </Box>
                        <Box>
                            <Divider height="1" width="332" bg="#A1A1A1"/>
                            <Box display={'flex'} columnGap={'8px'}>
                            <img src="/icons/location.svg" alt="" />
                            <p>Do not exist</p>
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