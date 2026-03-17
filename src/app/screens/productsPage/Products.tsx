import  SearchIcon  from "@mui/icons-material/Search";
import { AspectRatio, Card, CardOverflow, CssVarsProvider } from "@mui/joy";
import { Box, Button, CardContent, Container, Pagination, PaginationItem, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));


export default function Products (){

  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: "",
    });
    const [searchText, setSearchText] = useState<string>(""); 
    const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product.getProducts(productSearch)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === ""){
      productSearch.search = "";
      setProductSearch({...productSearch});
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

    const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({...productSearch});
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  }

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
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        onKeyDown={(e) => {
          if(e.key === "Enter") searchProductHandler();
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
        onClick={searchProductHandler}
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Box>
              </Stack>
              <Stack className="dishes-filter-section">
               <Button variant="contained"
               color={productSearch.order === "createdAt" ? "primary" : "secondary"}
               className="order"
               onClick={() => searchOrderHandler("createdAt")}
               >New</Button>
               <Button variant="contained"
               color={productSearch.order === "productPrice" ? "primary" : "secondary"}
               className="order"
               onClick={() => searchOrderHandler("productPrice")}
               >Price</Button>               
               <Button variant="contained"
               color={productSearch.order === "productViews" ? "primary" : "secondary"}
               className="order"
               onClick={() => searchOrderHandler("productViews")}
               >Views</Button>
              </Stack>

              <Stack className="list-category-section">
                <Stack className="buttons" flexDirection={'column'} rowGap={'10px'}>
               <Button variant="contained"
               color={
                productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"
               }
               className="order"
               onClick={() => searchCollectionHandler(ProductCollection.DISH)}
               >DISH</Button>
               <Button variant="contained"
               color={
                productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"
               }
               className="order"
               onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
               >SALAD</Button>               
               <Button variant="contained"
               color={
                productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"
               }
               className="order"
               onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
               >DRINK</Button>
               <Button variant="contained"
               color={
                productSearch.productCollection === ProductCollection.DESERT ? "primary" : "secondary"
               }
               className="order"
               onClick={() => searchCollectionHandler(ProductCollection.DESERT)}
               >DESSERT</Button>               
                <Button variant="contained"
               color={
                productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"
               }
               className="order"
               onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
               >OTHER</Button>
               </Stack>
                <Stack className="cards">
                 {products.length !== 0 ? products.map((e: Product) => {
                  const imagePath = `${serverApi}/${e.productImages[0]}`;
                    return (
                        <CssVarsProvider key={e._id} >
                    <Card onClick={() => chooseDishHandler(e._id)} className= "card" sx={{width: '273px', height: "361px"}}>
                        <Box className='hover'>
                            <img style={{cursor:'pointer'}} src="/icons/fullcart.png" alt="" />
                            <img src="/icons/views.png" alt="" />
                        </Box>
                        <img className="product-volume" src="/icons/product-volume.png" alt="" />
                       <CardOverflow >
                        <AspectRatio ratio={"1"}>
                            <img className="card-img" src={imagePath} alt="" />
                        </AspectRatio>
                       </CardOverflow>
                        <CardContent>
                            <Typography textAlign={'center'} className="product-name">{e.productName}</Typography>
                            <Typography  marginTop={'4px'} className="price" display={'flex'} alignItems={'center'} justifyContent={'center'} > <img src="/icons/dollar.png" alt="" /> {e.productPrice}</Typography>
                        </CardContent>
                    </Card>
                    </CssVarsProvider>
                    )
                 }) : <Box>No products</Box> }
                </Stack>
              </Stack>
              <Stack className="pagination-section">
                   <Pagination
    count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
    page={productSearch.page}
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
    onChange={paginationHandler}
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