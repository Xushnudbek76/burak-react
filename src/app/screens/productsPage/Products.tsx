import SearchIcon from "@mui/icons-material/Search";
import { AspectRatio, Card, CardOverflow, CssVarsProvider, Button as JoyButton } from "@mui/joy";
import {
  Box,
  Button,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
import { CartItem } from "../../../lib/types/search";
import type { SelectChangeEvent } from "@mui/material/Select";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
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
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
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
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    onAdd({
      _id: product._id,
      quantity: 1,
      name: product.productName,
      // @ts-ignore
      price: product.productPrice,
      image: product.productImages[0],
    });
    sweetTopSmallSuccessAlert(
      `${product.productName} added to basket`,
      900
    ).then();
  };

  const handleSortSelect = (e: SelectChangeEvent<string>) => {
    searchOrderHandler(e.target.value);
  };

  const handleCategorySelect = (e: SelectChangeEvent<string>) => {
    searchCollectionHandler(e.target.value as ProductCollection);
  };

  const amazonFormControlSx = {
    width: { xs: "100%", sm: "auto" },
    minWidth: { xs: "100%", sm: 200 },
    maxWidth: { xs: "100%", sm: 280 },
    flex: { xs: "1 1 100%", sm: "0 0 auto" },
  };

  const amazonSelectFieldSx = {
    borderRadius: "8px",
    backgroundColor: "#f0f2f2",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d5d9d9" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#a2a6a8" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e77600",
      borderWidth: "2px",
    },
    "& .MuiSelect-select": { py: 1.25, fontSize: "0.875rem" },
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>

          {/* HEADER */}
          <Stack
            className="avatar-big-box"
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Typography
              className="main-text"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Burak Restaurant
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: "40px",
                padding: "4px",
                width: "100%",
                maxWidth: "366px",
              }}
            >
              <TextField
                placeholder="Type here"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                sx={{ paddingLeft: "16px" }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
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

          {/* TOOLBAR */}
          <Stack
            className="dishes-filter-section products-toolbar"
            direction={{ xs: "column", sm: "row" }}
            flexWrap="wrap"
            alignItems="stretch"
            justifyContent="flex-end"
            gap={2}
            sx={{ width: "100%", maxWidth: 900 }}
          >
            <FormControl size="small" sx={amazonFormControlSx}>
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                value={productSearch.order}
                label="Sort by"
                onChange={handleSortSelect}
                sx={amazonSelectFieldSx}
              >
                <MenuItem value="createdAt">Newest arrivals</MenuItem>
                <MenuItem value="productPrice">Price: low to high</MenuItem>
                <MenuItem value="productPriceDesc">Price: high to low</MenuItem>
                <MenuItem value="productViews">Most viewed</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={amazonFormControlSx}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={productSearch.productCollection}
                label="Category"
                onChange={handleCategorySelect}
                sx={amazonSelectFieldSx}
              >
                <MenuItem value={ProductCollection.DISH}>Main dishes</MenuItem>
                <MenuItem value={ProductCollection.SALAD}>Salads</MenuItem>
                <MenuItem value={ProductCollection.DRINK}>Drinks</MenuItem>
                <MenuItem value={ProductCollection.DESERT}>Desserts</MenuItem>
                <MenuItem value={ProductCollection.OTHER}>Other</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* CARDS */}
          <Stack className="list-category-section">
            <Stack className="cards">
              {products.length !== 0 ? (
                products.map((e: Product) => {
                  const imagePath = `${serverApi}/${e.productImages[0]}`;
                  const sizeText =
                      e.productCollection === ProductCollection.DRINK
                        ? `${e.productVolume}L`
                        : `${e.productSize} size`;

                  return (
<CssVarsProvider key={e._id}>
  <Card
    onClick={() => chooseDishHandler(e._id)}
    className="card"
    sx={{ "--Card-radius": "20px" }}
  >
    {/* HOVER OVERLAY */}
    <Box className="hover">
      <img
        style={{ cursor: "pointer" }}
        src="/icons/fullcart.png"
        alt=""
        onClick={(a) => {
          handleAddToCart(e);
          a.stopPropagation();
        }}
      />
      <Box className="hover-view">
        <VisibilityIcon sx={{ fontSize: 20, color: "#ffffff" }} />
        <span>{e.productViews}</span>
      </Box>
    </Box>

    {/* VOLUME CHIP */}
    <Box className="product-volume-chip">{sizeText}</Box>

    {/* IMAGE — no CardOverflow/AspectRatio, just a raw img */}
    <img
      className="card-img"
      src={imagePath}
      alt={e.productName}
      
    />

    {/* CONTENT */}
    <CardContent className="card-content-area">
      <Typography className="product-name">
        {e.productName}
      </Typography>
      <Box className="price-row">
        <Typography className="price" marginLeft={"38%"}>
          <img src="/icons/dollar.png" alt="" />
          {e.productPrice}
        </Typography>
        <JoyButton
          className="mobile-add-btn"
          size="sm"
          onClick={(a) => {
            handleAddToCart(e);
            a.stopPropagation();
          }}
          startDecorator={<AddShoppingCartIcon sx={{ fontSize: 16 }} />}
          sx={{
            background: "linear-gradient(135deg, #822fff, #a45fff)",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            padding: "6px 14px",
            border: "none",
            color: "#fff",
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": {
              background: "linear-gradient(135deg, #6a1fe0, #9040f0)",
            },
          }}
        >
          Add
        </JoyButton>
      </Box>
    </CardContent>
  </Card>
</CssVarsProvider>
                  );
                })
              ) : (
                <Box>No products</Box>
              )}
            </Stack>
          </Stack>

          {/* PAGINATION */}
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
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

      {/* FAMILY BRANDS */}
      <div className="brands-logo">
        <Stack className="family-brand">
          <Typography color="secondary" className="brand">
            Our Family Brands
          </Typography>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-around"}
            flexWrap="wrap"
            gap={2}
          >
            <CssVarsProvider>
              <Card className="card">
                <img className="img" src="/img/gurme.webp" alt="" />
              </Card>
              <Card className="card">
                <img className="img" src="/img/seafood.webp" alt="" />
              </Card>
              <Card className="card">
                <img className="img" src="/img/sweets.webp" alt="" />
              </Card>
              <Card className="card">
                <img className="img" src="/img/doner.webp" alt="" />
              </Card>
            </CssVarsProvider>
          </Stack>
        </Stack>
      </div>

      {/* ADDRESS */}
      <div className="address">
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              title="Google Maps location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253.37832306574802!2d72.24622371692256!3d40.89663828027965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcbe8f229e70e7%3A0x525666fca1e4b69f!2z0J_QsNC50YLRg9CzLCDQkNC90LTQuNC20LDQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e1!3m2!1sru!2skr!4v1771683023842!5m2!1sru!2skr"
              style={{
                width: "100%",
                maxWidth: "1320px",
                height: "min(50vh, 420px)",
                border: 0,
                display: "block",
                margin: "0 auto",
              }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
