import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useDispatch, useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import { addLikedCard } from "../../store/likedCards";
// import { getToken } from "../../service/storageService";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircleLoader } from "react-spinners";

let initialDataFromServer = [];
const cardsPerPage = 12;

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [initialLoadingHomePage, setInitialLoadingHomePage] = useState(true);
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const dispatch = useDispatch();
  // let token = getToken();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initialDataFromServer = data;
        setDataFromServer(data);
        setVisibleCards(data.slice(0, cardsPerPage));
        setInitialLoadingHomePage(false); // Set loading state to false immediately
      })
      .catch((err) => {
        // Handle error and set loading state to false
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setInitialLoadingHomePage(false);
      });
  }, [userData]);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query]);

  const handleDeleteCard = async (_id) => {
    try {
      const { data } = await axios.delete(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + _id
      );
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id !== _id)
      );
    } catch (err) {
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleFavIcon = async (_id, like) => {
    try {
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        {
          like: !like,
        }
        // {
        //   headers: {
        //     "x-auth-token": `${token}`,
        //   },
        // }
      );
      if (response.data.success) {
        dispatch(addLikedCard({ _id, like: !like }));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const fetchMoreData = () => {
    setFetchingMoreData(true);

    const startIndex = visibleCards.length;
    const endIndex = startIndex + cardsPerPage;

    setTimeout(() => {
      const newVisibleCards = dataFromServer.slice(startIndex, endIndex);
      setVisibleCards((prevVisibleCards) => [
        ...prevVisibleCards,
        ...newVisibleCards,
      ]);

      setFetchingMoreData(false);
    }, 2000);
  };

  return (
    <Container sx={{ mt: 12 }}>
      {initialLoadingHomePage ? (
        <CircleLoader color="#36d7b7" size={100} />
      ) : (
        <InfiniteScroll
          dataLength={visibleCards.length}
          next={fetchMoreData}
          hasMore={visibleCards.length < dataFromServer.length}
          loader={fetchingMoreData && <h4>Loading...</h4>}
        >
          <Grid sx={{ mb: 2 }} container spacing={2}>
            {visibleCards.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
                <CardComponent
                  _id={card._id}
                  title={card.title}
                  subTitle={card.subtitle}
                  phone={card.phone}
                  address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
                  img={card.image.url}
                  alt={card.image.alt}
                  description={card.description}
                  web={card.web}
                  email={card.email}
                  state={card.address.state}
                  country={card.address.country}
                  zip={card.address.zip}
                  like={card.likes}
                  cardNumber={card.cardNumber}
                  onDeleteCard={handleDeleteCard}
                  onEditCard={handleEditCard}
                  onFavCard={handleFavIcon}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default HomePage;
