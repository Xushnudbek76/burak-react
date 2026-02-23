import { TabContext } from "@mui/lab";
import { Box, Container,  Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css"
import Divider from "../../components/divider";

export default function OrdersPage() {
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