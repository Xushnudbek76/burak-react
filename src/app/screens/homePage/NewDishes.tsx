import React from "react";
import { Box, Card,  Container, Stack, Typography } from "@mui/joy";
import { CardCover, CssVarsProvider } from "@mui/joy";
import { CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";



const list = [
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];


export default function NewDishes() {
 return ( <div className="new-dishes-frame"> 
    <Container>
        <Stack className="new-dishes-section">
         <Box className="category-title">Fresh Menu</Box>
         <Stack   className="cards-frame">
           { list.length !== 0 ? list.map((e, i) => {
            return (
                <CssVarsProvider key={i}>
                 <Card sx={{p: 0}} className="card" >
                  <img className="product-volume" src="/icons/product-volume.png" alt="" />
                  <CardCover>
                    <img src={e.imagePath} alt="" />
                  </CardCover>

                    <CardContent sx={{ justifyContent: "flex-end",  mt: '100%', zIndex: 2, background: '#FAFBFB',width: "289px", minHeight: '45px',py:1.5, borderRadius: "0 0 7px 6px"
                    }}>
                       <Stack  flexDirection={"row"}
                       justifyContent={"space-between"}
                       >
                       <Typography display={"flex"} gap={'8px'} level="h3" fontSize="md" textColor={'#25272D'} mb={1}>
                        {e.productName}
                        <Divider  height="24" width="2" bg="#D9D9D9"/>
                        $7
                       </Typography>
                       <Typography sx={{fontWeight: "md", color: "#343434", alignItems: "center", display:"flex"}}> 
                        12
                        <VisibilityIcon sx={{ fontSize: 20, marginLeft: '5px'}}/>
                       </Typography>
                       </Stack>
                    </CardContent>
                 </Card>
                </CssVarsProvider>
            )
           })
            : ""
           }
         </Stack>
        </Stack>
    </Container>
    </div>)
}