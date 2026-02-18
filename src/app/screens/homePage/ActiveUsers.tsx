import React from "react";
import { Container } from "@mui/material";
import { Box, Card, CardContent, CardCover, CssVarsProvider, Stack, Typography } from "@mui/joy";


const list = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];


export default function ActiveUsers() {
 return (<div className="active-users-frame"> 
    <Container>
        <Stack className="active-users-section">
         <Box className="category-title">Active Users</Box>
         <Stack   className="cards-frame">
           { list.length !== 0 ? list.map((e, i) => {
            return (
                <CssVarsProvider key={i}>
                 <Card sx={{p: 0}} className="card" >
                  <CardCover>
                    <img src={e.memberImage} alt="" />
                  </CardCover>

                    <CardContent sx={{ justifyContent: "center",  mt: '100%', zIndex: 2, background: '#FAFBFB',width: "289px", minHeight: '26px',py:1.5, borderRadius: "0 0 7px 6px"
                    }}>
                       <Stack justifyContent={'center'} alignItems={'center'}
                       >
                       <Typography className="member-nick"  textColor={'#25272D'}  mb={1}>
                        {e.memberNick}
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