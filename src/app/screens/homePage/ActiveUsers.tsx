import React from "react";
import { Container } from "@mui/material";
import { Box, Card, CardContent, CardCover, CssVarsProvider, Stack, Typography } from "@mui/joy";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";


 const topUsersRetriever = createSelector(retrieveTopUsers, (Users) => ({
 topUsers: Users
 }))


export default function ActiveUsers() {
  const {topUsers} = useSelector(topUsersRetriever);
  const users = Array.isArray(topUsers) ? topUsers : [];
 return (<div className="active-users-frame"> 
    <Container>
        <Stack className="active-users-section">
         <Box className="category-title">Active Users</Box>
         <Stack   className="cards-frame">
           { users.length !== 0 ? users.map((e: Member) => {
            const imagePath = `${serverApi}/${e.memberImage}`;
            return (
                <CssVarsProvider key={e._id}>
                 <Card sx={{p: 0}} className="card" >
                  <CardCover>
                    <img src={imagePath} alt="" />
                  </CardCover>

                    <CardContent  width={"100%"}  sx={{ justifyContent: "center",  mt: '100%', zIndex: 2, background: '#FAFBFB', minHeight: '26px',py:1.5, borderRadius: "0 0 7px 6px"
                    }}>
                       <Stack  justifyContent={'center'} alignItems={'center'}
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