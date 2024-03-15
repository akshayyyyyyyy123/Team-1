import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../SearchBar.css"
const SearchBar = ({passImage}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    id: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [employeeNamesData, setEmployeeNamesData] = useState([]);
  const navigate = useNavigate();
  //function to handle input change
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    //filter suggestions based on search term
    const filteredSuggestions = employeeNamesData.filter(e => e.name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/employeeNames');
        const employeeNames = response.data;
        setEmployeeNamesData(employeeNames);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    fetchSuggestions();
  }, []);
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSearchValue(suggestion.name);
    setSuggestions([]);
  };
  const handleSearchClick = () => {
    // Navigate to profile with search term id
   // navigate(`/profile/${searchTerm.id}`);
      navigate(`/searchProfile/${searchTerm.id}`); //--> 1
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: `url(${passImage})`,
      opacity:0.5,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px',width: '100%',margin: 'auto' }}>
      <TextField
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
        sx={{ width: '100%', marginTop: 1 }}
      />
      <Paper elevation={3} style={{ width: '100%', marginTop: 1, borderRadius: '10px', overflow: 'hidden' }}>
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              <ListItemAvatar>
                <Avatar src={suggestion.image} alt="Avatar" />
              </ListItemAvatar>
              <ListItemText primary={suggestion.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick}
        sx={{ backgroundColor: '#8BC34A', color: '#fff', marginTop: 1 }}
      >
        Search
      </Button> */}
      <Button
  variant="contained"
  sx={{
    backgroundColor: '#8BC34A',
    color: '#fff',
    marginTop: 1,
    '&:hover': {
      backgroundColor: '#8BC34A', // Set the hover background color to the same as the default background color
    }
  }}
  onClick={handleSearchClick}
>
  Search
</Button>
    </div>
    </div>
  );
};
export default SearchBar;
