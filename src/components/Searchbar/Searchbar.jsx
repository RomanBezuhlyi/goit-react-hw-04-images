import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchButton,
  SearchForm,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { query: '' };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;

    if (!query.trim()) {
      toast.error('please, fill in at least one symbol to start search.');
      this.setState({ query: '' });
      return;
    }
    this.props.onSubmit(query);
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
