import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Box } from './Box';
import { AppContainer } from './App.styled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;
    const fetchData = async () => {
      setLoading(true);
      const images = await getImages(query, page);
      if (images.total === 0) {
        toast.info('No images found. Try another request.');
      }
      setImages(state => [...state, ...images.hits]);
      setLoading(false);
    };
    fetchData();
  }, [query, page]);


  const onSubmit = async e => {
    const searchQuery = e.target.input.value.trim();
    if (query === searchQuery) {
      return;
    }

    setImages([]);
    setQuery(searchQuery);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={onSubmit} />

      {images.length > 0 && <ImageGallery data={images} />}

      {images.length > 0 && !loading && (
        <Button onClick={onLoadMore}>Load More</Button>
      )}

      {loading && (
        <Box ml="auto" mr="auto" width="80px">
          <Loader />
        </Box>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      <GlobalStyle />
    </AppContainer>
  );
};
