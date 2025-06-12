import { useCallback } from "react";
import * as api from "../api/api.js"
import { toast } from 'react-toastify';

export const handleCreateAnimal = useCallback((animalData) => {
    api.createAnimal(animalData)
      .then(response => {
        console.log('Animal created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
        toast.success('Animal created successfully:', response);
      })
      .catch(error => {
        console.error('Error creating animal:', error);
        // Handle error (e.g., show an error message)
        toast.error(`Error creating animal: ${error.message}`);
      });
  }, []);

export  const handleCreateHabitat = useCallback((habitatData) => {
    api.createHabitat(habitatData)
      .then(response => {
        console.log('Habitat created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
        
      })
      .catch(error => {
        console.error('Error creating habitat:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

const handleData = {
  handleCreateAnimal,
  handleCreateHabitat
}

export default handleData