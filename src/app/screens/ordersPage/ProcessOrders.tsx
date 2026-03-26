import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";




const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders})
);
interface ProcessOrders {
  setValue: (input: string) => void
}

export default function ProcessOrders (props: ProcessOrders) {
    const {authMember, setOrderBuilder} = useGlobals();
    const {processOrders} = useSelector(processOrdersRetriever);
    const {setValue} = props;

  const finishOrderHandler = async (e: T) => {
    try {
      if(!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue('3');
        setOrderBuilder(new Date());
      }
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  }

    return (
        <TabPanel value="2">
             <Stack>
                    {processOrders?.map((order: Order) => {
                      return (
                        <Box key={order._id} className={"order-main-box"}>
                          <Box className={"order-box-scroll"}>
                            {order?.orderItems.map((item: OrderItem) => {
                              // @ts-ignore
const product = order.productData.find(
  (product: Product) =>
    String(item.productId) === String(product._id)
);
                  const imagePath = product?.productImages?.[0]
  ? `${serverApi}/${product.productImages[0]}`
  : "/images/default.png";
                              return (
                                <Box key={item.id} className={"orders-name-price"}>
                                    <Box className="img-name">
                                  <img
                                    src={imagePath}
                                    className={"order-dish-img"}
                                  />
                                  <p className={"title-dish"}>{product?.productName}</p>
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
                            <Button value={order._id}  sx={{background:'#3A87CB', color:'white', width:'138px', height:'36px',whiteSpace:'nowrap', borderRadius:'10px'}} onClick={finishOrderHandler}>VERIFY TO FULFIL</Button>
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
        </TabPanel>
    )
}