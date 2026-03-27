import React from "react";
import { Box, Card,  Container, Stack, Typography } from "@mui/joy";
import { CardCover, CssVarsProvider } from "@mui/joy";
import { CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enums";



const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes
}))


export default function NewDishes() {
  
  const {newDishes} = useSelector(newDishesRetriever);
  const dishes = Array.isArray(newDishes) ? newDishes : [];

 return ( <div className="new-dishes-frame"> 
    <Container>
        <Stack className="new-dishes-section">
         <Box className="category-title">Fresh Menu</Box>
         <Stack   className="cards-frame">
           { dishes.length !== 0 ? dishes.map((ele: Product) => {
            const imagePath = `${serverApi}/${ele.productImages[0]}`;
            const sizeVolume = 
            ele.productCollection === ProductCollection.DRINK
            ? ele.productVolume + "l"
            : ele.productVolume + "size";
            return (
                <CssVarsProvider key={ele._id}>
                 <Card sx={{p: 0}} className="card" >
                  {sizeVolume}
                  <img className="product-volume" src="/icons/product-volume.png" alt="" />
                  <CardCover>
                    <img src={imagePath} alt="" />
                  </CardCover>

                    <CardContent sx={{ justifyContent: "flex-end",  mt: '100%', zIndex: 2, background: '#FAFBFB',width: "289px", minHeight: '45px',py:1.5, borderRadius: "0 0 7px 6px"
                    }}>
                       <Stack  flexDirection={"row"}
                       justifyContent={"space-between"}
                       >
                       <Typography display={"flex"} gap={'8px'} level="h3" fontSize="md" textColor={'#25272D'} mb={1}>
                        {ele.productName}
                        <Divider  height="24" width="2" bg="#D9D9D9"/>
                        ${ele.productPrice}
                       </Typography>
                       <Typography sx={{fontWeight: "md", color: "#343434", alignItems: "center", display:"flex"}}> 
                        {ele.productViews}
                        <VisibilityIcon sx={{ fontSize: 20, marginLeft: '5px'}}/>
                       </Typography>
                       </Stack>
                    </CardContent>
                 </Card>
                </CssVarsProvider>
            )
           })
            : (
              <Box>New products are not available!</Box>
            )
           }
         </Stack>
        </Stack>
    </Container>
    </div>)
}