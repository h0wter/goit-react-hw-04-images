import { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
  };

  componentDidUpdate = async (_, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const images = await getImages(this.state.query, this.state.page);
      if (images.total === 0) {
        toast.info('No images found. Try another request.');
      }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images.hits],
          loading: false,
        };
      });
    }
  };

  onSubmit = async e => {
    const query = e.target.input.value.trim();
    if (this.state.query === query) {
      return;
    }
    this.setState({ images: [], query, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, loading } = this.state;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.onSubmit} />

        {images.length > 0 && <ImageGallery data={images} />}

        {images.length > 0 && !loading && (
          <Button onClick={this.onLoadMore}>Load More</Button>
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
  }
}
