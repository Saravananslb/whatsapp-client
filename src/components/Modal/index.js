import React, { useContext, useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { Context } from '../../store/Context';
import { ENABLE_CONTACT, USER_INFO } from '../../store/action.types';
import { addContactUser, getUsersList } from '../../services/apiCall';

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
  
        <Modal show={state.contactEnabled} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <form action=""> */}
          <div style={{padding: '10px'}}>
            <div>Phone Number</div>
            <input type="text" value={number} placeholder="Phone number" onChange={(e) => setNumber(e.target.value)} style={{padding: '10px', width: '350px'}} />
          </div>
        {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addContact}>
              Add contact
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  