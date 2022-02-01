import React, { useContext, useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { Context } from '../../store/Context';
import { ENABLE_CONTACT, USER_INFO } from '../../store/action.types';
import { addContactUser, getUsersList } from '../../services/apiCall';
import styles from "./modal.module.css";

export const AddContactModal = () => {

    const [number, setNumber] = useState('')

    const {state, dispatch} = useContext(Context);
  
    const handleClose = () => {
        dispatch({
            type: ENABLE_CONTACT,
            payload: {
                isEnabled: false
            }
        })
    };

    const addContact = async() => {
        const user = await getUsersList(number);
        console.log(user)
        if (user.status == 200) {
            const data = user.data;
            const userContact = [...state.user.contact, data._id];
            const updatedContact = await addContactUser({contact: userContact});
            console.log(updatedContact)
            dispatch({
                type: USER_INFO,
                payload: {
                    user: { ...state.user, contact: updatedContact}
                }
            });

        }
    }
  
    return (
      <>
      {state.contactEnabled ? (
        <div className={styles.modalBody}>
          <div className={styles.modalChild}>
            <div onClick={handleClose} className={styles.modalCloseButton}>
              x
            </div>
            <div style={{padding: '10px'}}>
            <div>Phone Number</div>
            <input type="text" value={number} placeholder="Phone number" onChange={(e) => setNumber(e.target.value)} style={{padding: '10px', width: '350px'}} />
          </div>
          <button onClick={addContact}> Add Contact</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
      
    );
  }


  