import  SearchIcon  from "@mui/icons-material/Search";
import { AspectRatio, Card, CardOverflow, CssVarsProvider } from "@mui/joy";
import { Box, Button, CardContent, Container, Pagination, PaginationItem, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];



export default function Products (){
 return (
    <div className="products">
        <Container>
            <Stack flexDirection={'column'} alignItems={'center'}>
              <Stack className="avatar-big-box">
               <Typography className="main-text">Burak Restaurant</Typography>
  <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: "40px",
        padding: "4px",
        width: "366px",
      }}
    >
      <TextField
        placeholder="Type here"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          paddingLeft: "16px",
        }}
      />

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#343434",
          borderRadius: "40px",
          padding: "10px 20px",
          textTransform: "none",
          boxShadow: "none",

        }}
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
              </Stack>
              <Stack className="dishes-filter-section">
               <Button variant="contained"
               color="primary"
               className="order"
               >New</Button>
               <Button variant="contained"
               color="secondary"
               className="order"
               >Price</Button>               
               <Button variant="contained"
               color="secondary"
               className="order"
               >Views</Button>
              </Stack>

              <Stack className="list-category-section">
                <Stack className="buttons" flexDirection={'column'} rowGap={'10px'}>
               <Button variant="contained"
               color="primary"
               className="order"
               >DISH</Button>
               <Button variant="contained"
               color="secondary"
               className="order"
               >SALAD</Button>               
               <Button variant="contained"
               color="secondary"
               className="order"
               >DRINK</Button>
               <Button variant="contained"
               color="secondary"
               className="order"
               >DESSERT</Button>               
                <Button variant="contained"
               color="secondary"
               className="order"
               >OTHER</Button>
               </Stack>
                <Stack className="cards">
                 {products.length !== 0 ? products.map((e, i) => {
                    return (
                        <CssVarsProvider key={i}>
                    <Card className= "card" sx={{width: '273px', height: "361px"}}>
                        <Box className='hover'>
                            <img style={{cursor:'pointer'}} src="/icons/fullcart.png" alt="" />
                            <img src="/icons/views.png" alt="" />
                        </Box>
                        <img className="product-volume" src="/icons/product-volume.png" alt="" />
                       <CardOverflow >
                        <AspectRatio ratio={"1"}>
                            <img className="card-img" src={e.imagePath} alt="" />
                        </AspectRatio>
                       </CardOverflow>
                        <CardContent>
                            <Typography textAlign={'center'} className="product-name">{e.productName}</Typography>
                            <Typography  marginTop={'4px'} className="price" display={'flex'} alignItems={'center'} justifyContent={'center'} > <img src="/icons/dollar.png" alt="" /> 9</Typography>
                        </CardContent>
                    </Card>
                    </CssVarsProvider>
                    )
                 }) : <Box>No products</Box> }
                </Stack>
              </Stack>
              <Stack className="pagination-section">
                   <Pagination
    count={3}
    page={1}
    renderItem={(item) => (
      <PaginationItem
        components={{
          previous: ArrowBackIcon,
          next: ArrowForwardIcon,
        }}
        {...item}
        color={"secondary"}
      />
    )}
  />
   
              </Stack>
            </Stack>
</Container>
<div className="brands-logo">
            <Stack className="family-brand">
               <Typography color="secondary" className="brand">Our Family Brands</Typography>
               <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <CssVarsProvider> 
                <Card className='card'><img className="img" src="/img/gurme.webp" alt="" /></Card>
                <Card className='card'><img className="img" src="/img/seafood.webp" alt="" /></Card>
                <Card className='card'><img className="img" src="/img/sweets.webp" alt="" /></Card>
                <Card className='card'><img className="img" src="/img/doner.webp" alt="" /></Card>
                </CssVarsProvider>
               </Stack>
            </Stack>
          </div>
       
       <div className="address"> 
        <Container>
  <Stack className={"address-area"}>
    <Box className={"title"}>Our address</Box>

    <iframe
      title="Google Maps location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253.37832306574802!2d72.24622371692256!3d40.89663828027965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcbe8f229e70e7%3A0x525666fca1e4b69f!2z0J_QsNC50YLRg9CzLCDQkNC90LTQuNC20LDQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e1!3m2!1sru!2skr!4v1771683023842!5m2!1sru!2skr" 
      width="1320"
      height="500"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

  </Stack>
</Container>
       </div>

    </div>
 )
}