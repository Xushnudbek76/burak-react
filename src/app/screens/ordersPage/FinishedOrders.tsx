import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";




const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders})
);
export default function FinishedOrders () {
  const {finishedOrders} = useSelector(finishedOrdersRetriever)
     return (
        <TabPanel value="3">
             <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                  {order.orderItems.map((item: OrderItem) => {
                    // @ts-ignore
                    const product: Product = order.productData.find(  
                      (ele: Product) => item.productId === ele._id
                    );

                    if (!product) return null; 

                    const imagePath = `${serverApi}/${product.productImages[0]}`;

                    return (
                      <Box key={item.id} className={"orders-name-price"}>
                        <Box className="img-name">
                          <img src={imagePath} className={"order-dish-img"} />
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
              <Box  justifyContent={'center'} className='proceed'>
                <Box  className='calc'>
                <p className="pricing">Product price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src="/icons/plus.svg" alt="" />
                <p>Delivery cost</p>
                <p>${order.orderDelivery}</p>
                <img src="/icons/pause.svg" alt="" />
                <p>Total</p>
                <p>${order.orderTotal}</p>
                </Box>
 </Box>
            </Box>
          );
        })}
      </Stack>
        </TabPanel>
     )
}
