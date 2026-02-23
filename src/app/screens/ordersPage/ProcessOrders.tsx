import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

export default function ProcessOrders () {
    return (
        <TabPanel value="2">
             <Stack>
                    {[1, 2, ].map((ele, index) => {
                      return (
                        <Box key={index} className={"order-main-box"}>
                          <Box className={"order-box-scroll"}>
                            {[1, 2].map((ele2, index2) => {
                              return (
                                <Box key={index2} className={"orders-name-price"}>
                                    <Box className="img-name">
                                  <img
                                    src={"/img/lavash.webp"}
                                    className={"order-dish-img"}
                                  />
                                  <p className={"title-dish"}>Lavash</p>
                                   </Box>
                                  <Box className={"price-box"}>
                                    <p>$9</p>
                                    <img src={"/icons/close.svg"} />
                                    <p>2</p>
                                    <img src={"/icons/pause.svg"} />
                                    <p style={{ marginLeft: "15px" }}>$24</p>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                          <Box className='proceed'>
                            <Box className='calc'>
                            <p className="pricing">Product price</p>
                            <p>$60</p>
                            <img src="/icons/plus.svg" alt="" />
                            <p>Delivery cost</p>
                            <p>$5</p>
                            <img src="/icons/pause.svg" alt="" />
                            <p>Total</p>
                            <p>$20</p>
                           
                            </Box>
            
                                <p> 23-11-04 03:05 </p>
                            <Button  sx={{background:'#3A87CB', color:'white', width:'138px', height:'36px',whiteSpace:'nowrap', borderRadius:'10px'}}>VERIFY TO FULFIL</Button>
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
        </TabPanel>
    )
}