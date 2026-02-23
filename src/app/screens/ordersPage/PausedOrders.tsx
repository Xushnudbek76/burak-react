import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

export default function PausedOrders()  {
    return (
        <TabPanel value="1">
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

                <Button className="order-btn" color="secondary" variant="contained"
                > CANCEL</Button>
                <Button className="order-btn" sx={{background:'#70B45B', color:'white'}}>PAYMENT</Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
        </TabPanel>
    )
}