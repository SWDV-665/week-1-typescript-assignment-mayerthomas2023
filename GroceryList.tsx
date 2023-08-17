import React, { useState } from 'react';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
//import { RNCamera } from 'react-native-camera';

import Geolocation from 'react-native-geolocation-service';
import './GroceryList.css';
import { addCircleOutline, navigateCircleOutline } from 'ionicons/icons';



const GroceryList: React.FC = () => {
  
  const [groceryItems, setGroceryItems] = useState([
    { name: 'Milk' },
    { name: 'Bread' },
    { name: 'Eggs' },
    { name: 'Butter' },
    { name: 'Waffles' },
  ]);

  //add
  const addItem = () => {
    const newItem = { name: 'New Item' }; 
    setGroceryItems([...groceryItems, newItem]);
  };

  //remove
  const removeItem = (indexToRemove: number) => {
    const updatedItems = groceryItems.filter((_, index) => index !== indexToRemove);
    setGroceryItems(updatedItems);
  };
  //updating
const updateItem = (indexToUpdate: number, newName: string) => {
  const updatedItems = [...groceryItems];
  updatedItems[indexToUpdate].name = newName;
  setGroceryItems(updatedItems);
};
//const takePicture = async () => {
  //try {
    //const data = await RNCamera.takephoto();
    //console.log(data.uri); // Use the data.uri to display the image or save it as needed.
  //} catch (error) {
    //console.log('Error taking picture:', error);
  //}
//};
const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
    },
    (error) => {
      console.log('Error getting location:', error);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GroceryList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">GroceryList</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {groceryItems.map((item, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonLabel>{item.name}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => removeItem(index)}>
                  Remove
                </IonItemOption>
                <IonItemOption onClick={() => {
                  const newName = prompt('Enter the new name for the item:');
                  if (newName !== null && newName !== '') {
                    updateItem(index, newName);
                  }
                }}>
                  Update
    </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonFab slot="fixed" horizontal="center" vertical="center">
          <IonFabButton onClick={addItem}>
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFab>
     

        {/* Added Geolocation Button */}
        <IonFab slot="fixed" horizontal="end" vertical="center">
          <IonFabButton onClick={getCurrentLocation}>
          <IonIcon icon={navigateCircleOutline} />
            
          </IonFabButton>
        </IonFab>
        
      </IonContent>
    </IonPage>
  );
};

export default GroceryList;
