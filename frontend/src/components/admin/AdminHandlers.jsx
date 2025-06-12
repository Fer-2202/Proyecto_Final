import React, { useCallback } from 'react';
import * as api from './../../api/api';
import { toast } from 'react-toastify';

function AdminHandlers() {
  const handleCreateAnimal = useCallback((animalData) => {
    api.createAnimal(animalData)
      .then(response => {
        console.log('Animal created successfully:', response);
        toast.success('Animal created successfully');
      })
      .catch(error => {
        console.error('Error creating animal:', error);
        toast.error(`Error creating animal: ${error.message}`);
      });
  }, []);

  // Define other handlers here...
  const handleCreateHabitat = useCallback((habitatData) => {
    api.createHabitat(habitatData)
      .then(response => {
        console.log('Habitat created successfully:', response);
        toast.success('Habitat created successfully!');
      })
      .catch(error => {
        console.error('Error creating habitat:', error);
        toast.error(`Error creating habitat: ${error.message}`);
      });
  }, []);

  const handleCreateTicket = useCallback((ticketData) => {
    api.createTicket(ticketData)
      .then(response => {
        console.log('Ticket created successfully:', response);
        toast.success('Ticket created successfully!');
      })
      .catch(error => {
        console.error('Error creating ticket:', error);
        toast.error(`Error creating ticket: ${error.message}`);
      });
  }, []);

  const handleCreateSection = useCallback((sectionData) => {
    api.createSection(sectionData)
      .then(response => {
        console.log('Section created successfully:', response);
        toast.success('Section created successfully!');
      })
      .catch(error => {
        console.error('Error creating section:', error);
        toast.error(`Error creating section: ${error.message}`);
      });
  }, []);

  const handleCreateVisit = useCallback((visitData) => {
    api.createVisit(visitData)
      .then(response => {
        console.log('Visit created successfully:', response);
        toast.success('Visit created successfully!');
      })
      .catch(error => {
        console.error('Error creating visit:', error);
        toast.error(`Error creating visit: ${error.message}`);
      });
  }, []);

  const handleCreatePurchaseOrder = useCallback((purchaseOrderData) => {
    api.createPurchaseOrder(purchaseOrderData)
      .then(response => {
        console.log('Purchase order created successfully:', response);
        toast.success('Purchase order created successfully!');
      })
      .catch(error => {
        console.error('Error creating purchase order:', error);
        toast.error(`Error creating purchase order: ${error.message}`);
      });
  }, []);

  const handleCreateSpecies = useCallback((speciesData) => {
    api.createSpecies(speciesData)
      .then(response => {
        console.log('Species created successfully:', response);
        toast.success('Species created successfully!');
      })
      .catch(error => {
        console.error('Error creating species:', error);
        toast.error(`Error creating species: ${error.message}`);
      });
  }, []);

  const handleCreateConservationStatus = useCallback((conservationStatusData) => {
    api.createConservationStatus(conservationStatusData)
      .then(response => {
        console.log('Conservation status created successfully:', response);
        toast.success('Conservation status created successfully!');
      })
      .catch(error => {
        console.error('Error creating conservation status:', error);
        toast.error(`Error creating conservation status: ${error.message}`);
      });
  }, []);

  const handleCreateProvince = useCallback((provinceData) => {
    api.createProvince(provinceData)
      .then(response => {
        console.log('Province created successfully:', response);
        toast.success('Province created successfully!');
      })
      .catch(error => {
        console.error('Error creating province:', error);
        toast.error(`Error creating province: ${error.message}`);
      });
  }, []);

  const handleCreateUserProfile = useCallback((userProfileData) => {
    api.createUserProfile(userProfileData)
      .then(response => {
        console.log('User profile created successfully:', response);
        toast.success('User profile created successfully!');
      })
      .catch(error => {
        console.error('Error creating user profile:', error);
        toast.error(`Error creating user profile: ${error.message}`);
      });
  }, []);

  return {
    handleCreateAnimal,
    handleCreateHabitat,
    handleCreateTicket,
    handleCreateSection,
    handleCreateVisit,
    handleCreatePurchaseOrder,
    handleCreateSpecies,
    handleCreateConservationStatus,
    handleCreateProvince,
    handleCreateUserProfile
  };
}

export default AdminHandlers;