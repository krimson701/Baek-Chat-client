import React, { useState } from 'react';
import Modal from '../../components/modals/regular-modal'
import DataTable from './data-table'

function InviteModal(){
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <button onClick={openModal}>Open Modal</button>
            {
                modalVisible && <Modal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}>
                        <DataTable
                        usePaging = {true}
                        pageNo = {1}
                        pageScale = {25} 
                        totalCount = {0}>
                        </DataTable>
                    </Modal>
            }
        </>
    )
}

export default InviteModal;
