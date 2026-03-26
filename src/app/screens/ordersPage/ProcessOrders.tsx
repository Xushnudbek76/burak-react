import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";




const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders})
);

export default function ProcessOrders () {
    const {processOrders} = useSelector(processOrdersRetriever);
  
    return (
        <TabPanel value="2">
             <Stack>
                    {processOrders?.map((order: Order) => {
                      return (
                        <Box key={order._id} className={"order-main-box"}>
                          <Box className={"order-box-scroll"}>
                            {order?.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )
                  const imagePath = `${serverApi}/${product.productImages[0]}`
                              return (
                                <Box key={item.id} className={"orders-name-price"}>
                                    <Box className="img-name">
                                  <img
                                    src={"/img/lavash.webp"}
                                    className={"order-dish-img"}
                                  />
                                  <p className={"title-dish"}>{product.productName}</p>
                                   </Box>
                                  <Box className={"price-box"}>
                                    <p>${item.itemPrice}</p>
                                    <img src={"/icons/close.svg"} />
                                    <p>{item.itemQuantity}</p>
                                    <img src={"/icons/pause.svg"} />
                                    <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                          <Box className='proceed'>
                            <Box className='calc'>
                            <p className="pricing">Product price</p>
                            <p>${order.orderTotal - order.orderDelivery}</p>
                            <img src="/icons/plus.svg" alt="" />
                            <p>Delivery cost</p>
                            <p>${order.orderDelivery}</p>
                            <img src="/icons/pause.svg" alt="" />
                            <p>Total</p>
                            <p>${order.orderTotal}</p>
                           
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